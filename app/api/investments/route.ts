import { NextRequest } from 'next/server'
import { json } from '@/app/api/_utils/api'
import { createServerSupabase } from '@/lib/supabase/client'

export async function GET(_req: NextRequest) {
  try {
    const supabase = createServerSupabase()
    const { data, error } = await supabase.from('investment_products').select('*').eq('status','approved').order('created_at', { ascending: false })
    if (error) return json({ code: 'db_error', message: error.message }, 500)
    return json({ items: data || [] })
  } catch (e) {
    console.error('List investments error', e)
    return json({ code: 'internal_error', message: 'Unexpected error' }, 500)
  }
}
