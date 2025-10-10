import { createClient } from "@supabase/supabase-js";
import { Env } from "./env";

export const supabaseAdmin = createClient(
  Env.SUPABASE_URL,
  Env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false },
  }
);

export const supabaseAnon = createClient(Env.SUPABASE_URL, Env.SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
