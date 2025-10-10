import { NextRequest } from "next/server";
import { ok, notFound, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  try {
    const { data } = await supabaseAdmin
      .from("loans")
      .select("id, principal, interest_rate, status, collateral_locked, created_at")
      .eq("id", params.id)
      .eq("user_id", auth.userId)
      .maybeSingle();
    if (!data) return notFound("loan_not_found");
    return ok(data);
  } catch (e: any) {
    return serverError("loan_status_failed", e?.message);
  }
}
