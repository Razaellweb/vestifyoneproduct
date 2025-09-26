import { createClient, SupabaseClient } from "@supabase/supabase-js";

export let supabase: SupabaseClient | null = null;

if (
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
} else {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[Supabase] URL or anon key not provided — client not initialized."
    );
  }
}
