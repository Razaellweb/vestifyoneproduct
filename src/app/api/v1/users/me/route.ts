import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { ok, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("id, email, phone, full_name, role, kyc_status")
    .eq("id", auth.userId)
    .single();
  return ok(user);
}

const updateSchema = z.object({
  fullName: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  notificationPrefs: z.any().optional(),
});

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  const parsed = await parseBody(req, updateSchema);
  if (parsed instanceof Response) return parsed;
  const { fullName, phone } = parsed;
  try {
    const { data } = await supabaseAdmin
      .from("users")
      .update({ full_name: fullName, phone })
      .eq("id", auth.userId)
      .select("id, email, phone, full_name, role, kyc_status")
      .single();
    return ok(data);
  } catch (e: any) {
    return serverError("profile_update_failed", e?.message);
  }
}
