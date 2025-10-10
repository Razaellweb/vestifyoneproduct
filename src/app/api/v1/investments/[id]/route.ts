import { NextRequest } from "next/server";
import { ok, notFound, serverError } from "@/lib/response";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data } = await supabaseAdmin
      .from("investment_products")
      .select("id, title, description, rate, tenor_days, min_amount, max_amount, status")
      .eq("id", params.id)
      .maybeSingle();
    if (!data) return notFound("product_not_found");
    return ok(data);
  } catch (e: any) {
    return serverError("investment_detail_failed", e?.message);
  }
}
