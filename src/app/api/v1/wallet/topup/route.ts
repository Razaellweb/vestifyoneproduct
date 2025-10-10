import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { badRequest, created, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { getPaymentService } from "@/lib/payment";
import { supabaseAdmin } from "@/lib/supabase";
import { Env } from "@/lib/env";
import { auditLog } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({ amount: z.number().positive().max(10_000_000) });

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;

  const ip = req.headers.get("x-forwarded-for") || "local";
  const rl = rateLimit(`wallet:topup:${auth.userId}:${ip}`, 10, 60_000);
  if (!rl.ok) return badRequest("rate_limited");

  const parsed = await parseBody(req, schema);
  if (parsed instanceof Response) return parsed;
  const { amount } = parsed;

  const idempotencyKey = req.headers.get("Idempotency-Key") || undefined;

  try {
    const reference = `TOPUP_${auth.userId}_${Date.now()}`;
    const payment = getPaymentService();

    // Record intent
    await supabaseAdmin.from("transactions_ledger").insert({
      user_id: auth.userId,
      category: "topup",
      status: "PENDING",
      amount,
      currency: "NGN",
      reference,
    });

    const { paymentUrl } = await payment.checkout({
      email: auth.email || "user@example.com",
      amount,
      reference,
      callback_url: Env.PAYSTACK_CALLBACK_URL,
      currency: "NGN",
      metadata: { userId: auth.userId, idempotencyKey },
    });

    await auditLog(auth.userId, "wallet.topup_initiate", { reference, amount });

    return created({ paymentUrl, reference });
  } catch (e: any) {
    await auditLog(auth.userId, "wallet.topup_initiate_failed", { error: e?.message });
    return serverError("topup_failed", e?.message);
  }
}
