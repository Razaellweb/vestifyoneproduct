import { NextRequest } from 'next/server'
import { json, getIp } from '@/app/api/_utils/api'
import { bvnSchema } from '@/lib/validators'
import { rateLimit } from '@/lib/rate-limit'
import { createServerSupabase } from '@/lib/supabase/client'
import { encrypt } from '@/lib/crypto'
import { BaseClient } from '@/lib/web3/base'

class QoreIdAuthClient extends BaseClient {
  constructor() {
    super({ baseURL: 'https://api.qoreid.com', headers: { 'Content-Type': 'application/json' }, debug: process.env.NODE_ENV !== 'production' })
  }
  async token(clientId: string, secret: string) {
    return this.request<{ accessToken: string; expiresIn: number; tokenType: string }>('POST', '/token', { payload: { clientId, secret } })
  }
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const rl = rateLimit(`bvn:${ip}`, 5, 60_000)
  if (!rl.allowed) return json({ code: 'rate_limited', message: 'Too many requests' }, 429)

  const body = await req.json().catch(() => null)
  const parsed = bvnSchema.safeParse(body)
  if (!parsed.success) return json({ code: 'invalid_input', details: parsed.error.flatten() }, 400)

  const { bvn, firstname, lastname, dob, phone, email } = parsed.data

  try {
    // guard
    const clientId = process.env.QOREID_CLIENT_ID
    const secret = process.env.QOREID_CLIENT_SECRET
    if (!clientId || !secret) return json({ code: 'provider_missing', message: 'BVN provider not configured' }, 500)

    const auth = new QoreIdAuthClient()
    const tokenResp = await auth.token(clientId, secret)
    const accessToken = tokenResp.accessToken

    const api = new BaseClient({ baseURL: 'https://api.qoreid.com', headers: { Authorization: `Bearer ${accessToken}` }, debug: process.env.NODE_ENV !== 'production' })
    // Perform boolean match (recommended)
    const payload = { firstname, lastname, dob, phone, email }
    const result = await api.request<any>('POST', `/ng/identities/bvn-match/${encodeURIComponent(bvn)}`, { payload })

    const status = result?.status?.status || result?.status || 'unknown'
    const matched = result?.summary?.bvn_check?.status === 'match' || result?.bvn_match?.fieldMatches?.firstname

    // Mask BVN in logs
    const bvnMasked = `${bvn.slice(0,2)}******${bvn.slice(-3)}`
    console.log('[BVN VERIFY] status=%s bvn=%s', status, bvnMasked)

    if (!matched) {
      return json({ code: 'bvn_not_matched', message: 'BVN details did not match' }, 400)
    }

    // Link to user by email or phone if available via auth
    const supabase = createServerSupabase()
    // find user by phone
    const { data: userRows, error: userErr } = await supabase.from('users').select('id').eq('phone', phone || '').limit(1)
    if (userErr) return json({ code: 'db_error', message: userErr.message }, 500)
    const uid = userRows?.[0]?.id

    const encrypted = encrypt(bvn)
    const last4 = bvn.slice(-4)

    if (uid) {
      const { error } = await supabase.from('users').update({ bvn_encrypted: encrypted, bvn_last4: last4, kyc_status: 'verified' }).eq('id', uid)
      if (error) return json({ code: 'db_error', message: error.message }, 500)
    }

    return json({ status: 'verified', last4 })
  } catch (e: any) {
    // Never log raw BVN
    console.error('[BVN VERIFY ERROR]', e?.message)
    return json({ code: 'provider_error', message: 'BVN verification failed' }, 502)
  }
}
