import { supabaseAdmin } from "./supabase";

export async function auditLog(actorId: string | null, action: string, details?: unknown) {
  await supabaseAdmin.from("audit_logs").insert({ actor_id: actorId, action, details });
}
