import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { requireUser } from "@/lib/auth";
import { loanApplySchema } from "@/lib/validation";

export async function POST(req: Request) {
  const userOrRes = await requireUser();
  // @ts-ignore
  if (userOrRes instanceof Response) return userOrRes;
  const user = userOrRes;
  const json = await req.json().catch(() => ({}));
  const parsed = loanApplySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const supabase = getServiceClient();

  // Compute simple eligibility: up to 80% of total savings balance
  const { data: totalRes, error: totalErr } = await supabase.rpc("total_savings_balance", { p_user_id: user.id });
  if (totalErr) return NextResponse.json({ error: totalErr.message }, { status: 500 });
  const max = Math.floor((Number(totalRes || 0)) * 0.8);
  if (parsed.data.amount > max) return NextResponse.json({ error: `Amount exceeds max eligible ${max}` }, { status: 400 });

  const { data, error } = await supabase.from("loans").insert({ user_id: user.id, amount: parsed.data.amount, term_months: parsed.data.termMonths, status: "approved" }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ loan: data, maxEligible: max }, { status: 201 });
}
