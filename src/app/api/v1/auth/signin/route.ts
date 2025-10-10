import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { badRequest, serverError, unauthorized, ok } from "@/lib/response";
import { comparePassword } from "@/lib/auth/password";
import { supabaseAdmin } from "@/lib/supabase";
import { signAccessToken, signRefreshToken } from "@/lib/auth/jwt";
import { auditLog } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  emailOrPhone: z.string(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  const rl = rateLimit(`auth:signin:${ip}`, 10, 60_000);
  if (!rl.ok) return badRequest("rate_limited");

  const parsed = await parseBody(req, schema);
  if (parsed instanceof Response) return parsed;
  const { emailOrPhone, password } = parsed;

  try {
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("id, email, phone, password_hash, role, kyc_status, full_name")
      .or(`email.eq.${emailOrPhone},phone.eq.${emailOrPhone}`)
      .maybeSingle();

    if (!user) return unauthorized("invalid_credentials");

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) return unauthorized("invalid_credentials");

    const accessToken = await signAccessToken({ sub: user.id, role: user.role, email: user.email });
    const refreshToken = await signRefreshToken({ sub: user.id, role: user.role, email: user.email });

    await auditLog(user.id, "auth.signin", {});

    return ok({ accessToken, refreshToken, user: { id: user.id, email: user.email, phone: user.phone, role: user.role, kyc_status: user.kyc_status, full_name: user.full_name } });
  } catch (e: any) {
    await auditLog(null, "auth.signin.failed", { error: e?.message });
    return serverError("signin_failed", e?.message);
  }
}
