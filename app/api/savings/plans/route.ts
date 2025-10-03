import { NextRequest } from 'next/server'
import { json, getIp } from '@/app/api/_utils/api'
import { rateLimit } from '@/lib/rate-limit'
import { savingsPlanSchema } from '@/lib/validators'
import { createServerSupabase } from '@/lib/supabase/client'
import { getSession } from '@/app/api/_utils/auth'

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const rl = rateLimit(`create-plan:${ip}`, 10, 60_000)
  if (!rl.allowed) return json({ code: 'rate_limited', message: 'Too many requests' }, 429)

  const body = await req.json().catch(() => null)
  const parsed = savingsPlanSchema.safeParse(body)
  if (!parsed.success) return json({ code: 'invalid_input', details: parsed.error.flatten() }, 400)
  const { name, amount, frequency, startDate, autoDebit } = parsed.data

  const session = getSession()
  if (!session.valid || !session.sub) return json({ code: 'unauthorized', message: 'Authentication required' }, 401)
  const userId = session.sub

  try {
    const supabase = createServerSupabase()
    const idempotencyKey = req.headers.get('Idempotency-Key') || undefined
    const { data, error } = await supabase.from('savings_plans').insert({ user_id: userId, name, amount, frequency, start_date: startDate, status: 'pending_setup', auto_debit: autoDebit, idempotency_key: idempotencyKey }).select('*').single()
    if (error) {
      if ((error as any).code === '23505') return json({ code: 'idempotent_replay', message: 'Duplicate request' }, 200)
      return json({ code: 'db_error', message: error.message }, 500)
    }

    return json({ plan: data, next: autoDebit ? 'authorize_payment' : 'active' }, 201)
  } catch (e) {
    console.error('Create plan error', e)
    return json({ code: 'internal_error', message: 'Unexpected error' }, 500)
  }
}
