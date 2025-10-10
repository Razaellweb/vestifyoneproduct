import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { badRequest, ok, serverError, notFound } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const schema = z.object({ amount: z.number().positive() });

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  const parsed = await parseBody(req, schema);
  if (parsed instanceof Response) return parsed;
  const { amount } = parsed;

  const idem = req.headers.get("Idempotency-Key") || `INV_${auth.userId}_${Date.now()}`;

  try {
    const { data: product } = await supabaseAdmin
      .from("investment_products")
      .select("id, min_amount, max_amount, status, tenor_days, rate")
      .eq("id", params.id)
      .maybeSingle();
    if (!product || product.status !== "ACTIVE") return notFound("product_not_available");

    if (amount < Number(product.min_amount) || (product.max_amount && amount > Number(product.max_amount))) {
      return badRequest("amount_out_of_range");
    }

    // compute wallet balance
    const { data: credits } = await supabaseAdmin
      .from("wallet_ledger").select("amount").eq("user_id", auth.userId).eq("type", "CREDIT");
    const { data: debits } = await supabaseAdmin
      .from("wallet_ledger").select("amount").eq("user_id", auth.userId).eq("type", "DEBIT");
    const balance = (credits || []).reduce((s, r) => s + Number(r.amount), 0) - (debits || []).reduce((s, r) => s + Number(r.amount), 0);
    if (amount > balance) return badRequest("insufficient_funds");

    // idempotency check
    const { data: existing } = await supabaseAdmin
      .from("idempotency_keys").select("id").eq("key", idem).maybeSingle();
    if (existing) {
      return ok({ status: "duplicate" });
    }
    await supabaseAdmin.from("idempotency_keys").insert({ key: idem, actor_id: auth.userId, action: "invest" });

    // create investment record
    const now = new Date();
    const matures_at = new Date(now.getTime() + Number(product.tenor_days) * 24 * 3600 * 1000);

    const { data: inv } = await supabaseAdmin
      .from("user_investments")
      .insert({ user_id: auth.userId, product_id: product.id, amount, status: "ACTIVE", started_at: now, matures_at })
      .select("id")
      .single();

    // debit wallet
    await supabaseAdmin.from("wallet_ledger").insert({ user_id: auth.userId, type: "DEBIT", amount, currency: "NGN", reference: `INV_${inv.id}` });

    return ok({ investmentId: inv.id, status: "ACTIVE" });
  } catch (e: any) {
    return serverError("investment_failed", e?.message);
  }
}
