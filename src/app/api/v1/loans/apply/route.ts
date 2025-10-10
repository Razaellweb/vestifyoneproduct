import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { badRequest, ok, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const schema = z.object({ amount: z.number().positive(), interestRate: z.number().min(0).max(1) });

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  const parsed = await parseBody(req, schema);
  if (parsed instanceof Response) return parsed;
  const { amount, interestRate } = parsed;
  const idem = req.headers.get("Idempotency-Key") || `LOAN_${auth.userId}_${Date.now()}`;

  try {
    const { data: existing } = await supabaseAdmin
      .from("idempotency_keys").select("id").eq("key", idem).maybeSingle();
    if (existing) return ok({ status: "duplicate" });

    const { data: credits } = await supabaseAdmin
      .from("wallet_ledger").select("amount").eq("user_id", auth.userId).eq("type", "CREDIT");
    const { data: debits } = await supabaseAdmin
      .from("wallet_ledger").select("amount").eq("user_id", auth.userId).eq("type", "DEBIT");
    const balance = (credits || []).reduce((s, r) => s + Number(r.amount), 0) - (debits || []).reduce((s, r) => s + Number(r.amount), 0);

    const limit = Math.floor(balance * 0.8);
    if (amount > limit) return badRequest("amount_exceeds_limit");

    await supabaseAdmin.from("idempotency_keys").insert({ key: idem, actor_id: auth.userId, action: "loan_apply" });

    const { data: loan } = await supabaseAdmin
      .from("loans")
      .insert({ user_id: auth.userId, principal: amount, interest_rate: interestRate, status: "ACTIVE", collateral_locked: Math.ceil(amount / 0.8 - amount) })
      .select("id")
      .single();

    // credit wallet with loan amount
    await supabaseAdmin.from("wallet_ledger").insert({ user_id: auth.userId, type: "CREDIT", amount, currency: "NGN", reference: `LOAN_${loan.id}` });

    return ok({ loanId: loan.id, status: "ACTIVE" });
  } catch (e: any) {
    return serverError("loan_apply_failed", e?.message);
  }
}
