import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { requireUser } from "@/lib/auth";
import { savingsAccountCreateSchema } from "@/lib/validation";

export async function GET() {
  const userOrRes = await requireUser();
  // @ts-ignore
  if (userOrRes instanceof Response) return userOrRes;
  const user = userOrRes;
  const supabase = getServiceClient();
  const { data, error } = await supabase.from("savings_accounts").select("*").eq("user_id", user.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ accounts: data });
}

export async function POST(req: Request) {
  const userOrRes = await requireUser();
  // @ts-ignore
  if (userOrRes instanceof Response) return userOrRes;
  const user = userOrRes;
  const json = await req.json().catch(() => ({}));
  const parsed = savingsAccountCreateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const supabase = getServiceClient();
  const { data, error } = await supabase.from("savings_accounts").insert({ user_id: user.id, ...parsed.data }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ account: data }, { status: 201 });
}
