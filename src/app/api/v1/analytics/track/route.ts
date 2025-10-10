import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { ok, badRequest, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { auditLog } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  event: z.string().min(2),
  properties: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;

  const ip = req.headers.get("x-forwarded-for") || "local";
  const rl = rateLimit(`analytics:${auth.userId}:${ip}`, 60, 60_000);
  if (!rl.ok) return badRequest("rate_limited");

  const parsed = await parseBody(req, schema);
  if (parsed instanceof Response) return parsed;
  const { event, properties } = parsed;

  try {
    await auditLog(auth.userId, `analytics.${event}`, properties || {});
    return ok({ logged: true });
  } catch (e: any) {
    return serverError("analytics_failed", e?.message);
  }
}
