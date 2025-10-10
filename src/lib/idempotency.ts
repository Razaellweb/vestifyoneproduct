import { supabaseAdmin } from "./supabase";

export async function useIdempotency(key: string, actorId: string, action: string) {
  const { data, error } = await supabaseAdmin
    .from("idempotency_keys")
    .select("id, key, actor_id, action, created_at")
    .eq("key", key)
    .single();

  if (data) return { used: true as const };
  if (error && error.code !== "PGRST116") {
    // Not Found code in PostgREST can vary; ignore not found
    throw error;
  }
  const insert = await supabaseAdmin
    .from("idempotency_keys")
    .insert({ key, actor_id: actorId, action })
    .select("id")
    .single();
  if (insert.error) throw insert.error;
  return { used: false as const };
}
