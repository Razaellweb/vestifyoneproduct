import { NextRequest } from "next/server";
import { ok, serverError } from "@/lib/response";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { data } = await supabaseAdmin
      .from("investment_products")
      .select("id, title, description, rate, tenor_days, min_amount, max_amount, status")
      .eq("status", "ACTIVE");
    return ok({ items: data });
  } catch (e: any) {
    return serverError("investment_list_failed", e?.message);
  }
}
