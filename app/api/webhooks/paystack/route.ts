import { NextRequest } from 'next/server'
import { json } from '@/app/api/_utils/api'
import { createServerSupabase } from '@/lib/supabase/client'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY
  if (!secret) return json({ code: 'config_missing', message: 'Paystack not configured' }, 500)

  const raw = await req.text().catch(() => null)
  if (!raw) return json({ code: 'bad_request', message: 'No payload' }, 400)

  const signature = req.headers.get('x-paystack-signature') || ''
  const hash = crypto.createHmac('sha512', secret).update(raw).digest('hex')
  if (hash !== signature) return json({ code: 'invalid_signature' }, 401)

  const event = JSON.parse(raw)

  try {
    const supabase = createServerSupabase()
    if (event?.event === 'charge.success') {
      const ref: string | undefined = event?.data?.reference
      const metadata = event?.data?.metadata
      const type = metadata?.type
      if (type === 'investment') {
        const txId = metadata?.txId
        if (txId) {
          await supabase.from('investment_transactions').update({ status: 'completed', provider_reference: ref, metadata }).eq('id', txId)
        }
      }
      if (type === 'savings_contribution') {
        const planId = metadata?.planId
        const amountKobo = event?.data?.amount || 0
        const amount = Number(amountKobo) / 100
        if (planId) {
          await supabase.rpc('increment_savings_balance', { p_plan_id: planId, p_amount: amount })
        }
      }
    }

    return json({ ok: true })
  } catch (e) {
    console.error('Webhook error', e)
    return json({ code: 'internal_error', message: 'Unexpected error' }, 500)
  }
}
