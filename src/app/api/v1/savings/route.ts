import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { created, ok, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { supabaseAdmin } from "@/lib/supabase";
import dayjs from "dayjs";

export const runtime = "nodejs";

const createSchema = z.object({
  name: z.string().min(2),
  amount: z.number().positive(),
  interval: z.enum(["daily", "weekly", "monthly"]),
});

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  const parsed = await parseBody(req, createSchema);
  if (parsed instanceof Response) return parsed;
  const { name, amount, interval } = parsed;
  try {
    const next_run_date =
      interval === "daily"
        ? dayjs().add(1, "day").toDate()
        : interval === "weekly"
        ? dayjs().add(1, "week").toDate()
        : dayjs().add(1, "month").toDate();

    const { data, error } = await supabaseAdmin
      .from("savings_plans")
      .insert({ user_id: auth.userId, name, amount, interval, next_run_date })
      .select("id, name, amount, interval, status, next_run_date")
      .single();
    if (error) throw error;
    return created({ plan: data });
  } catch (e: any) {
    return serverError("savings_create_failed", e?.message);
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;
  const { data } = await supabaseAdmin
    .from("savings_plans")
    .select("id, name, amount, interval, status, next_run_date")
    .eq("user_id", auth.userId);
  return ok({ plans: data });
}
