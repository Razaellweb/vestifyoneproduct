import { NextRequest } from 'next/server'
import { json, getIp } from '@/app/api/_utils/api'
import { loanRequestSchema } from '@/lib/validators'
import { rateLimit } from '@/lib/rate-limit'
import { createServerSupabase } from '@/lib/supabase/client'
import { createTransferRecipient, initiateTransfer } from '@/lib/payment/transfer'
import { getSession } from '@/app/api/_utils/auth'

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const rl = rateLimit(`loan:${ip}`, 5, 60_000)
  if (!rl.allowed) return json({ code: 'rate_limited', message: 'Too many requests' }, 429)

  const session = getSession()
  if (!session.valid || !session.sub) return json({ code: 'unauthorized', message: 'Authentication required' }, 401)
  const userId = session.sub

  const body = await req.json().catch(() => null)
  const parsed = loanRequestSchema.safeParse(body)
  if (!parsed.success) return json({ code: 'invalid_input', details: parsed.error.flatten() }, 400)
  const { amount, bankCode, accountNumber, accountName } = parsed.data

  try {
    const supabase = createServerSupabase()
    const { data: plans, error: pErr } = await supabase.from('savings_plans').select('balance').eq('user_id', userId)
    if (pErr) return json({ code: 'db_error', message: pErr.message }, 500)
    const total = (plans || []).reduce((sum, p: any) => sum + Number(p.balance || 0), 0)
    const maxAmount = Math.floor(total * 0.8 * 100) / 100
    if (amount > maxAmount) return json({ code: 'ineligible', message: 'Requested amount exceeds eligibility' }, 400)

    const { data: loan, error: lErr } = await supabase.from('loans').insert({ user_id: userId, amount, status: 'approved' }).select('*').single()
    if (lErr) return json({ code: 'db_error', message: lErr.message }, 500)

    try {
      const recipient = await createTransferRecipient(accountName, accountNumber, bankCode)
      const reference = `loan_${userId}_${loan.id}`
      const transfer = await initiateTransfer(amount, recipient, 'Vestify Loan Disbursement', reference)
      await supabase.from('loans').update({ status: transfer.status === 'success' ? 'disbursed' : 'disbursing', disbursement_reference: reference }).eq('id', loan.id)
      return json({ loanId: loan.id, status: transfer.status })
    } catch (e: any) {
      await supabase.from('loans').update({ status: 'failed' }).eq('id', loan.id)
      return json({ code: 'disbursement_failed', message: e?.message || 'Disbursement failed' }, 502)
    }
  } catch (e) {
    console.error('Loan request error', e)
    return json({ code: 'internal_error', message: 'Unexpected error' }, 500)
  }
}
