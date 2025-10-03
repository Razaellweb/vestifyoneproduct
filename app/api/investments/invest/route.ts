import { NextRequest } from 'next/server'
import { json, getIp } from '@/app/api/_utils/api'
import { investSchema } from '@/lib/validators'
import { rateLimit } from '@/lib/rate-limit'
import { createServerSupabase } from '@/lib/supabase/client'
import { PaystackProvider } from '@/lib/payment/paystack'
import { getSession } from '@/app/api/_utils/auth'

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const rl = rateLimit(`invest:${ip}`, 10, 60_000)
  if (!rl.allowed) return json({ code: 'rate_limited', message: 'Too many requests' }, 429)

  const body = await req.json().catch(() => null)
  const parsed = investSchema.safeParse(body)
  if (!parsed.success) return json({ code: 'invalid_input', details: parsed.error.flatten() }, 400)
  const { productId, amount } = parsed.data

  const session = getSession()
  if (!session.valid || !session.sub) return json({ code: 'unauthorized', message: 'Authentication required' }, 401)
  const userId = session.sub
  const email = session.email || 'user@example.com'

  try {
    const supabase = createServerSupabase()

    // validate product
    const { data: product, error: pErr } = await supabase.from('investment_products').select('*').eq('id', productId).eq('status','approved').single()
    if (pErr || !product) return json({ code: 'invalid_product', message: 'Product not found or not approved' }, 404)
    if (Number(amount) < Number(product.min_amount)) return json({ code: 'amount_too_small', message: `Minimum amount is ${product.min_amount}` }, 400)

    // create tx record
    const reference = `inv_${userId}_${Date.now()}`
    const { data: tx, error: txErr } = await supabase.from('investment_transactions').insert({ user_id: userId, product_id: productId, amount, status: 'initiated', provider: 'paystack', provider_reference: reference }).select('*').single()
    if (txErr) return json({ code: 'db_error', message: txErr.message }, 500)

    // init payment
    const paystack = new PaystackProvider()
    const init = await paystack.initializePayment({ email, amount, reference, metadata: { userId, productId, txId: tx.id, type: 'investment' }, callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/investments/callback` })

    return json({ paymentUrl: init.paymentUrl, reference: init.reference, transactionId: tx.id })
  } catch (e) {
    console.error('Invest error', e)
    return json({ code: 'internal_error', message: 'Unexpected error' }, 500)
  }
}
