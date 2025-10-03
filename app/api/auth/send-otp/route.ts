import { NextRequest } from 'next/server'
import { otpSchema } from '@/lib/validators'
import { json, getIp } from '@/app/api/_utils/api'
import { rateLimit } from '@/lib/rate-limit'
import bcrypt from 'bcryptjs'
import { SMSService } from '@/lib/sms/service'
import { createServerSupabase } from '@/lib/supabase/client'

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const rl = rateLimit(`send-otp:${ip}`, 5, 60_000)
  if (!rl.allowed) return json({ code: 'rate_limited', message: 'Too many requests' }, 429)

  const body = await req.json().catch(() => null)
  const parsed = otpSchema.safeParse(body)
  if (!parsed.success) return json({ code: 'invalid_input', details: parsed.error.flatten() }, 400)
  const { phone, purpose } = parsed.data

  try {
    const supabase = createServerSupabase()
    const code = String(Math.floor(100000 + Math.random() * 900000))
    const codeHash = await bcrypt.hash(code, 10)
    const expiresAt = new Date(Date.now() + 10 * 60_000).toISOString()

    // delete existing non-expired for same purpose to prevent spam
    await supabase.from('otps').delete().eq('phone', phone).eq('purpose', purpose)

    const { error } = await supabase.from('otps').insert({ phone, code_hash: codeHash, purpose, expires_at: expiresAt, sent_via: 'sms' })
    if (error) return json({ code: 'otp_create_failed', message: error.message }, 500)

    try {
      const sms = new SMSService()
      await sms.send(phone, `Vestify One: your ${purpose.replace('_',' ')} code is ${code}. Expires in 10 minutes.`)
    } catch (e) {
      console.error('SMS send error', (e as Error).message)
    }

    return json({ message: 'OTP sent' }, 200)
  } catch (e) {
    console.error('Send OTP error', e)
    return json({ code: 'internal_error', message: 'Unexpected error' }, 500)
  }
}
