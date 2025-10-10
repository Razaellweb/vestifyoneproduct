import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { badRequest, ok, serverError } from "@/lib/response";
import { supabaseAdmin } from "@/lib/supabase";
import { Mailer } from "@/lib/email";
import { sendSms } from "@/lib/notify/sms";

export const runtime = "nodejs";

const schema = z.object({
  emailOrPhone: z.string(),
});

export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, schema);
  if (parsed instanceof Response) return parsed;
  const { emailOrPhone } = parsed;

  try {
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("id, email, phone")
      .or(`email.eq.${emailOrPhone},phone.eq.${emailOrPhone}`)
      .maybeSingle();

    if (!user) return ok({}); // Don't reveal existence

    const code = String(Math.floor(100000 + Math.random() * 900000));

    await supabaseAdmin
      .from("idempotency_keys")
      .insert({ key: `pwd_reset:${user.id}:${code}`, actor_id: user.id, action: "password_reset" });

    if (user.email) {
      try {
        const mailer = new Mailer();
        await mailer.sendEmail({
          to: user.email,
          subject: "Password Reset Code",
          template: "password-reset",
          context: { code },
          from: undefined,
        });
      } catch (e) {
        if (user.phone) {
          await sendSms(user.phone, `Your Vestify One reset code is ${code}`);
        }
      }
    } else if (user.phone) {
      await sendSms(user.phone, `Your Vestify One reset code is ${code}`);
    }

    return ok({});
  } catch (e: any) {
    return serverError("forgot_failed", e?.message);
  }
}
