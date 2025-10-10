import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { ok, notFound, serverError, badRequest } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const contributeSchema = z.object({ amount: z.number().positive() });

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  try {
    const { data: group } = await supabaseAdmin
      .from("groups")
      .select("id, name, contribution_amount, cycle_days, status")
      .eq("id", params.id)
      .maybeSingle();
    if (!group) return notFound("group_not_found");

    const { data: contributions } = await supabaseAdmin
      .from("group_contributions")
      .select("id, user_id, amount, status, created_at")
      .eq("group_id", params.id)
      .order("created_at", { ascending: false })
      .limit(20);

    return ok({ group, contributions });
  } catch (e: any) {
    return serverError("group_fetch_failed", e?.message);
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  const parsed = await parseBody(req, contributeSchema);
  if (parsed instanceof Response) return parsed;
  const { amount } = parsed;
  const idem = req.headers.get("Idempotency-Key") || `GROUP_CONTRIB_${auth.userId}_${Date.now()}`;

  try {
    const { data: existing } = await supabaseAdmin.from("idempotency_keys").select("id").eq("key", idem).maybeSingle();
    if (existing) return ok({ status: "duplicate" });
    await supabaseAdmin.from("idempotency_keys").insert({ key: idem, actor_id: auth.userId, action: "group_contribute" });

    // balance
    const { data: credits } = await supabaseAdmin
      .from("wallet_ledger").select("amount").eq("user_id", auth.userId).eq("type", "CREDIT");
    const { data: debits } = await supabaseAdmin
      .from("wallet_ledger").select("amount").eq("user_id", auth.userId).eq("type", "DEBIT");
    const balance = (credits || []).reduce((s, r) => s + Number(r.amount), 0) - (debits || []).reduce((s, r) => s + Number(r.amount), 0);
    if (amount > balance) return badRequest("insufficient_funds");

    await supabaseAdmin.from("wallet_ledger").insert({ user_id: auth.userId, type: "DEBIT", amount, currency: "NGN", reference: `GROUP_${params.id}` });
    await supabaseAdmin.from("group_contributions").insert({ group_id: params.id, user_id: auth.userId, amount, status: "SUCCESS" });

    return ok({ status: "SUCCESS" });
  } catch (e: any) {
    return serverError("group_contribute_failed", e?.message);
  }
}
