import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { requireUser } from "@/lib/auth";
import { depositSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const userOrRes = await requireUser();
  // @ts-ignore
  if (userOrRes instanceof Response) return userOrRes;
  const user = userOrRes;
  const json = await req.json().catch(() => ({}));
  const parsed = depositSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { accountId, amount } = parsed.data;
  const supabase = getServiceClient();
  const { data: acct, error: acctErr } = await supabase.from("savings_accounts").select("id,user_id").eq("id", accountId).single();
  if (acctErr || !acct || acct.user_id !== user.id) return NextResponse.json({ error: "Account not found" }, { status: 404 });
  const { data, error } = await supabase.from("savings_transactions").insert({ account_id: accountId, type: "deposit", amount }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ transaction: data }, { status: 201 });
}
