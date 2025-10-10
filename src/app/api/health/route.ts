import { ok } from "@/lib/response";

export const runtime = "nodejs";

export async function GET() {
  return ok({ status: "healthy", time: new Date().toISOString() });
}
