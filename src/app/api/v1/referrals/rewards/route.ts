import { NextRequest } from "next/server";
import { ok, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  try {
    const { data } = await supabaseAdmin
      .from("referral_rewards")
      .select("id, status, amount, referred_user_id, created_at")
      .eq("referrer_id", auth.userId);

    const total = (data || []).reduce((s, r) => s + Number(r.amount), 0);
    return ok({ rewards: data, total });
  } catch (e: any) {
    return serverError("rewards_fetch_failed", e?.message);
  }
}
