import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase-server";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const userOrRes = await requireUser();
  // If requireUser returned a response, it's an error response
  // @ts-ignore
  if (userOrRes instanceof Response) return userOrRes;
  const user = userOrRes;

  const supabase = getServiceClient();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ user, profile: data || null });
}
