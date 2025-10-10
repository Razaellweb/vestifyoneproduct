import { NextRequest } from "next/server";
import { ok, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;

  try {
    const { data: credits } = await supabaseAdmin
      .from("wallet_ledger")
      .select("amount")
      .eq("user_id", auth.userId)
      .eq("type", "CREDIT");
    const { data: debits } = await supabaseAdmin
      .from("wallet_ledger")
      .select("amount")
      .eq("user_id", auth.userId)
      .eq("type", "DEBIT");
    const creditSum = (credits || []).reduce((s, r) => s + Number(r.amount), 0);
    const debitSum = (debits || []).reduce((s, r) => s + Number(r.amount), 0);
    const balance = creditSum - debitSum;
    return ok({ balance, currency: "NGN" });
  } catch (e: any) {
    return serverError("balance_fetch_failed", e?.message);
  }
}
