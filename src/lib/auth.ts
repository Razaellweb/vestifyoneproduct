import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getServiceClient } from "./supabase-server";

export async function getBearerToken() {
  const hdrs = await headers();
  const auth = hdrs.get("authorization") || hdrs.get("Authorization");
  if (!auth) return null;
  const [scheme, token] = auth.split(" ");
  if (scheme?.toLowerCase() !== "bearer") return null;
  return token || null;
}

export async function getUserFromRequest() {
  const token = await getBearerToken();
  if (!token) return { user: null } as const;
  const supabase = getServiceClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return { user: null } as const;
  return { user: data.user } as const;
}

export async function requireUser() {
  const { user } = await getUserFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return user;
}
