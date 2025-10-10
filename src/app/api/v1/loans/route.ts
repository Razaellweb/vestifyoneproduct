import { NextRequest } from "next/server";
import { ok, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  try {
    const { data: loans } = await supabaseAdmin
      .from("loans")
      .select("id, principal, interest_rate, status, collateral_locked, created_at")
      .eq("user_id", auth.userId);

    const { data: credits } = await supabaseAdmin
      .from("wallet_ledger").select("amount").eq("user_id", auth.userId).eq("type", "CREDIT");
    const { data: debits } = await supabaseAdmin
      .from("wallet_ledger").select("amount").eq("user_id", auth.userId).eq("type", "DEBIT");
    const balance = (credits || []).reduce((s, r) => s + Number(r.amount), 0) - (debits || []).reduce((s, r) => s + Number(r.amount), 0);

    const eligibility = Math.floor(balance * 0.8);

    return ok({ loans, eligibility, limit: eligibility });
  } catch (e: any) {
    return serverError("loans_fetch_failed", e?.message);
  }
}
