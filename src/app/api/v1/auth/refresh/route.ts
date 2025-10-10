import { NextRequest } from "next/server";
import { z } from "zod";
import { parseBody } from "@/lib/validate";
import { badRequest, ok, unauthorized } from "@/lib/response";
import { verifyToken, signAccessToken } from "@/lib/auth/jwt";

export const runtime = "nodejs";

const schema = z.object({ refreshToken: z.string().min(10) });

export async function POST(req: NextRequest) {
  const parsed = await parseBody(req, schema);
  if (parsed instanceof Response) return parsed;
  const { refreshToken } = parsed;

  try {
    const payload = await verifyToken(refreshToken);
    if ((payload as any).typ !== "refresh") return unauthorized("invalid_token");
    const accessToken = await signAccessToken({ sub: (payload as any).sub as string, role: (payload as any).role as any, email: (payload as any).email as string });
    return ok({ accessToken });
  } catch {
    return unauthorized("invalid_token");
  }
}
