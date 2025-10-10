import { NextRequest } from "next/server";
import { ok, badRequest, serverError } from "@/lib/response";
import { getPaymentService } from "@/lib/payment";
import { supabaseAdmin } from "@/lib/supabase";
import { auditLog } from "@/lib/audit";

export const runtime = "nodejs";

// Paystack webhook handler (generic verification via provider verify)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const reference = body?.data?.reference || body?.reference || req.nextUrl.searchParams.get("reference");
    if (!reference) return badRequest("missing_reference");

    const payment = getPaymentService();
    const result = await payment.confirm(reference);

    if (result.status !== "success") {
      await supabaseAdmin
        .from("transactions_ledger")
        .update({ status: "FAILED", metadata: result })
        .eq("reference", reference);
      await auditLog(null, "payments.webhook_failed", { reference, result });
      return ok({ received: true });
    }

    // Fetch transaction intent
    const { data: tx } = await supabaseAdmin
      .from("transactions_ledger")
      .select("id, user_id, amount, status")
      .eq("reference", reference)
      .maybeSingle();

    if (!tx) {
      await auditLog(null, "payments.webhook_unknown_reference", { reference });
      return ok({ received: true });
    }

    if (tx.status === "SUCCESS") {
      // Idempotent
      return ok({ received: true });
    }

    // Credit wallet
    const { data: credits } = await supabaseAdmin
      .from("wallet_ledger")
      .select("amount")
      .eq("user_id", tx.user_id)
      .eq("type", "CREDIT");
    const { data: debits } = await supabaseAdmin
      .from("wallet_ledger")
      .select("amount")
      .eq("user_id", tx.user_id)
      .eq("type", "DEBIT");
    const balance = (credits || []).reduce((s, r) => s + Number(r.amount), 0) - (debits || []).reduce((s, r) => s + Number(r.amount), 0);

    const newBalance = balance + Number(tx.amount);

    await supabaseAdmin.from("wallet_ledger").insert({
      user_id: tx.user_id,
      type: "CREDIT",
      amount: tx.amount,
      currency: "NGN",
      balance_after: newBalance,
      reference,
      metadata: result,
    });

    await supabaseAdmin
      .from("transactions_ledger")
      .update({ status: "SUCCESS", metadata: result })
      .eq("reference", reference);

    await auditLog(tx.user_id, "wallet.topup_confirmed", { reference, amount: tx.amount });

    return ok({ received: true });
  } catch (e: any) {
    return serverError("webhook_error", e?.message);
  }
}
