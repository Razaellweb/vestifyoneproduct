import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { created, ok, serverError, badRequest } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";
import { customAlphabet } from "nanoid";

export const runtime = "nodejs";

const nano = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

const createSchema = z.object({ name: z.string().min(2), contributionAmount: z.number().positive(), cycleDays: z.number().int().min(1) });
const joinSchema = z.object({ inviteCode: z.string().length(6) });

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;

  const body = await req.json().catch(() => ({}));

  try {
    if (body.inviteCode) {
      const parsed = joinSchema.parse(body);
      const { data: group } = await supabaseAdmin
        .from("groups")
        .select("id")
        .eq("invite_code", parsed.inviteCode)
        .maybeSingle();
      if (!group) return badRequest("invalid_invite_code");
      await supabaseAdmin.from("group_memberships").upsert({ group_id: group.id, user_id: auth.userId });
      return ok({ groupId: group.id });
    }

    const parsed = createSchema.parse(body);
    const invite_code = nano();
    const { data: grp } = await supabaseAdmin
      .from("groups")
      .insert({ owner_id: auth.userId, name: parsed.name, contribution_amount: parsed.contributionAmount, cycle_days: parsed.cycleDays, invite_code })
      .select("id")
      .single();

    await supabaseAdmin.from("group_memberships").insert({ group_id: grp.id, user_id: auth.userId, role: "OWNER" });

    return created({ groupId: grp.id, invite_code });
  } catch (e: any) {
    return serverError("group_create_or_join_failed", e?.message);
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  const { data: memberships } = await supabaseAdmin
    .from("group_memberships")
    .select("group_id")
    .eq("user_id", auth.userId);
  return ok({ groups: memberships });
}
