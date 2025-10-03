import { NextRequest } from 'next/server'
import { json } from '@/app/api/_utils/api'
import { createServerSupabase } from '@/lib/supabase/client'
import { getSession } from '@/app/api/_utils/auth'

export async function GET(_req: NextRequest) {
  const session = getSession()
  if (!session.valid || !session.sub) return json({ code: 'unauthorized', message: 'Authentication required' }, 401)
  const userId = session.sub

  try {
    const supabase = createServerSupabase()
    const { data: plans, error } = await supabase.from('savings_plans').select('balance').eq('user_id', userId)
    if (error) return json({ code: 'db_error', message: error.message }, 500)
    const total = (plans || []).reduce((sum, p: any) => sum + Number(p.balance || 0), 0)
    const maxAmount = Math.floor(total * 0.8 * 100) / 100
    return json({ eligible: maxAmount > 0, maxAmount, basis: '80% of total savings balance' })
  } catch (e) {
    console.error('Eligibility error', e)
    return json({ code: 'internal_error', message: 'Unexpected error' }, 500)
  }
}
