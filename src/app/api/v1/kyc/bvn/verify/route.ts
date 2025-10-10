import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { badRequest, ok, serverError } from "@/lib/response";
import { requireAuth } from "@/lib/auth/guard";
import { getQoreId } from "@/lib/kyc";
import { supabaseAdmin } from "@/lib/supabase";
import { auditLog } from "@/lib/audit";
import { encryptString } from "@/lib/crypto";

export const runtime = "nodejs";

const schema = z.object({
  bvn: z.string().length(11),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().min(10),
  dob: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof Response) return auth;

  const parsed = await parseBody(req, schema);
  if (parsed instanceof Response) return parsed;
  const { bvn, firstName, lastName, phone } = parsed;

  try {
    const qore = getQoreId();
    // Use BVN match endpoint (boolean match)
    const resp = await qore.matchBvn(bvn, { firstName, lastName, phoneNumber: phone } as any);
    const isMatch = (resp as any)?.status === "success" || (resp as any)?.matched === true;

    const bvnEncrypted = encryptString(bvn);

    await supabaseAdmin
      .from("users")
      .update({ kyc_status: isMatch ? "VERIFIED" : "FAILED", bvn: bvnEncrypted })
      .eq("id", auth.userId);

    await auditLog(auth.userId, "kyc.bvn_verify", { isMatch });

    return ok({ verified: isMatch });
  } catch (e: any) {
    await auditLog(auth.userId, "kyc.bvn_verify_failed", { error: e?.message });
    return serverError("bvn_verify_failed", e?.message);
  }
}
