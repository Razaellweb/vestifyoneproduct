import { NextRequest } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/client'
import { signupSchema } from '@/lib/validators'
import { json, getIp } from '@/app/api/_utils/api'
import { rateLimit } from '@/lib/rate-limit'
import bcrypt from 'bcryptjs'
import { SMSService } from '@/lib/sms/service'

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const rl = rateLimit(`signup:${ip}`, 5, 60_000)
  if (!rl.allowed) return json({ code: 'rate_limited', message: 'Too many requests' }, 429)

  const body = await req.json().catch(() => null)
  const parsed = signupSchema.safeParse(body)
  if (!parsed.success) return json({ code: 'invalid_input', details: parsed.error.flatten() }, 400)
  const { email, phone, password } = parsed.data

  try {
    const supabase = createServerSupabase()

    // 1) Create auth user
    const { data: signUp, error: signUpErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: { phone }
    })
    if (signUpErr || !signUp?.user) return json({ code: 'signup_failed', message: signUpErr?.message }, 400)

    // 2) Create profile row
    const { error: profileErr } = await supabase.from('users').insert({ id: signUp.user.id, phone })
    if (profileErr) return json({ code: 'profile_create_failed', message: profileErr.message }, 500)

    // 3) Generate OTP for phone verification
    const code = String(Math.floor(100000 + Math.random() * 900000)) // 6-digit
    const codeHash = await bcrypt.hash(code, 10)
    const expiresAt = new Date(Date.now() + 10 * 60_000).toISOString()
    const { error: otpErr } = await supabase.from('otps').insert({ phone, code_hash: codeHash, purpose: 'signup', expires_at: expiresAt, sent_via: 'sms' })
    if (otpErr) return json({ code: 'otp_create_failed', message: otpErr.message }, 500)

    // 4) Send SMS
    try {
      const sms = new SMSService()
      await sms.send(phone, `Vestify One: your verification code is ${code}. Expires in 10 minutes.`)
    } catch (e) {
      console.error('SMS send error', (e as Error).message)
      // non-fatal
    }

    return json({ userId: signUp.user.id, email, phone, next: 'verify_phone' }, 201)
  } catch (e) {
    console.error('Signup error', e)
    return json({ code: 'internal_error', message: 'Unexpected error' }, 500)
  }
}
