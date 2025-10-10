import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { badRequest, ok, serverError, unauthorized } from "@/lib/response";
import { supabaseAdmin } from "@/lib/supabase";
import { hashPassword } from "@/lib/auth/password";

export const runtime = "nodejs";

const schema = z.object({
  emailOrPhone: z.string(),
  code: z.string().length(6),
  newPassword: z.string().min(8),
});

export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, schema);
  if (parsed instanceof Response) return parsed;
  const { emailOrPhone, code, newPassword } = parsed;

  try {
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("id")
      .or(`email.eq.${emailOrPhone},phone.eq.${emailOrPhone}`)
      .maybeSingle();
    if (!user) return unauthorized("invalid_code");

    const { data: record } = await supabaseAdmin
      .from("idempotency_keys")
      .select("id")
      .eq("key", `pwd_reset:${user.id}:${code}`)
      .maybeSingle();
    if (!record) return unauthorized("invalid_code");

    const password_hash = await hashPassword(newPassword);
    const { error } = await supabaseAdmin
      .from("users")
      .update({ password_hash })
      .eq("id", user.id);
    if (error) throw error;

    return ok({});
  } catch (e: any) {
    return serverError("reset_failed", e?.message);
  }
}
