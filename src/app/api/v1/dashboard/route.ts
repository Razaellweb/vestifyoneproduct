import { NextRequest } from "next/server";
import { ok, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;

  try {
    // Wallet balance
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
    const balance = (credits || []).reduce((s, r) => s + Number(r.amount), 0) - (debits || []).reduce((s, r) => s + Number(r.amount), 0);

    const { data: savings } = await supabaseAdmin
      .from("savings_plans")
      .select("id, name, amount, interval, status, next_run_date")
      .eq("user_id", auth.userId)
      .limit(5);

    const { data: investments } = await supabaseAdmin
      .from("user_investments")
      .select("id, amount, status, started_at, matures_at, product_id")
      .eq("user_id", auth.userId)
      .limit(5);

    const { data: loans } = await supabaseAdmin
      .from("loans")
      .select("id, principal, interest_rate, status, collateral_locked")
      .eq("user_id", auth.userId)
      .limit(5);

    const { data: groups } = await supabaseAdmin
      .from("group_memberships")
      .select("group_id")
      .eq("user_id", auth.userId);

    return ok({ balance, savings, investments, loans, groups });
  } catch (e: any) {
    return serverError("dashboard_failed", e?.message);
  }
}
