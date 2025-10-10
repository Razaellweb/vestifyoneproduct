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
      .from("user_investments")
      .select("id, amount, status, started_at, matures_at, product_id")
      .eq("id", params.id)
      .eq("user_id", auth.userId)
      .maybeSingle();
    if (!data) return notFound("investment_not_found");
    return ok(data);
  } catch (e: any) {
    return serverError("investment_status_failed", e?.message);
  }
}
