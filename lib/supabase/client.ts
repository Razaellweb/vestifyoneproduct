import { createClient } from '@supabase/supabase-js'

export type SupabaseServer = ReturnType<typeof createClient>

export const createServerSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase URL or service role key missing')
  }
  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: true,
    },
  })
}

export const createAnonSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    throw new Error('Supabase URL or anon key missing')
  }
  return createClient(url, anon, { auth: { persistSession: false } })
}
