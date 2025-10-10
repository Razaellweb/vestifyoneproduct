import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";
import { unauthorized } from "@/lib/response";
import { supabaseAdmin } from "@/lib/supabase";

export type AuthContext = {
  userId: string;
  role: "ADMIN" | "USER";
  email?: string;
};

export async function requireAuth(req: NextRequest): Promise<AuthContext | Response> {
  const auth = req.headers.get("authorization");
  if (!auth) return unauthorized("missing_authorization");
  const token = auth.replace(/^Bearer\s+/i, "");
  try {
    const payload = await verifyToken(token);
    if ((payload as any).typ !== "access") return unauthorized("invalid_token");
    const userId = (payload as any).sub as string;
    // Ensure user exists and active
    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("id, role, email")
      .eq("id", userId)
      .single();
    if (error || !user) return unauthorized("user_not_found");
    return { userId: user.id, role: user.role as any, email: user.email };
  } catch {
    return unauthorized("invalid_token");
  }
}
