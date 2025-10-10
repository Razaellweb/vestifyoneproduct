import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { badRequest, conflict, created, serverError } from "@/lib/response";
import { hashPassword } from "@/lib/auth/password";
import { supabaseAdmin } from "@/lib/supabase";
import { auditLog } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  acceptTerms: z.boolean().refine((v) => v === true, "Terms must be accepted"),
  referralCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  const rl = rateLimit(`auth:signup:${ip}`, 10, 60_000);
  if (!rl.ok) return badRequest("rate_limited");

  const parsed = await parseBody(req, schema);
  if (parsed instanceof Response) return parsed;
  const { email, phone, password, fullName, referralCode } = parsed;

  if (!email && !phone) return badRequest("email_or_phone_required");

  try {
    const password_hash = await hashPassword(password);
    const { data: existingEmail } = email
      ? await supabaseAdmin.from("users").select("id").eq("email", email).maybeSingle()
      : { data: null };
    if (existingEmail) return conflict("email_exists");

    const { data: existingPhone } = phone
      ? await supabaseAdmin.from("users").select("id").eq("phone", phone).maybeSingle()
      : { data: null };
    if (existingPhone) return conflict("phone_exists");

    const { data: user, error } = await supabaseAdmin
      .from("users")
      .insert({ email, phone, password_hash, full_name: fullName })
      .select("id, email, phone, full_name, role, kyc_status")
      .single();
    if (error) throw error;

    // Handle referral link
    if (referralCode) {
      await supabaseAdmin.from("referrals").upsert({ user_id: user.id, code: referralCode }).select("id");
    }

    await auditLog(user.id, "auth.signup", { via: email ? "email" : "phone" });

    return created({ user });
  } catch (e: any) {
    await auditLog(null, "auth.signup.failed", { error: e?.message });
    return serverError("signup_failed", e?.message);
  }
}
