import { ok } from "@/lib/response";
export const runtime = "nodejs";
export async function POST() {
  // Stateless JWT: client should discard tokens. Optionally add to denylist.
  return ok({});
}
