import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { requireUser } from "@/lib/auth";
import { groupCreateSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const userOrRes = await requireUser();
  // @ts-ignore
  if (userOrRes instanceof Response) return userOrRes;
  const user = userOrRes;
  const json = await req.json().catch(() => ({}));
  const parsed = groupCreateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const supabase = getServiceClient();
  const { data: group, error } = await supabase.from("groups").insert({ owner_id: user.id, ...parsed.data }).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await supabase.from("group_members").insert({ group_id: group.id, user_id: user.id, role: "owner" });
  return NextResponse.json({ group }, { status: 201 });
}
