import { NextRequest } from "next/server";
import { ok, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";
import { customAlphabet } from "nanoid";

export const runtime = "nodejs";

const nano = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 8);

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  try {
    const { data: existing } = await supabaseAdmin
      .from("referrals")
      .select("code")
      .eq("user_id", auth.userId)
      .maybeSingle();
    if (existing?.code) {
      return ok({ code: existing.code, link: `${process.env.NEXT_PUBLIC_APP_URL}/signup?ref=${existing.code}` });
    }
    const code = nano();
    await supabaseAdmin.from("referrals").insert({ user_id: auth.userId, code });
    return ok({ code, link: `${process.env.NEXT_PUBLIC_APP_URL}/signup?ref=${code}` });
  } catch (e: any) {
    return serverError("referral_generate_failed", e?.message);
  }
}
