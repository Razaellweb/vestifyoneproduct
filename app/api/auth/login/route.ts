import { NextRequest, NextResponse } from 'next/server'
import { createAnonSupabase } from '@/lib/supabase/client'
import { loginSchema } from '@/lib/validators'
import { json, getIp } from '@/app/api/_utils/api'
import { rateLimit } from '@/lib/rate-limit'
import { signSession } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const rl = rateLimit(`login:${ip}`, 10, 60_000)
  if (!rl.allowed) return json({ code: 'rate_limited', message: 'Too many requests' }, 429)

  const body = await req.json().catch(() => null)
  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) return json({ code: 'invalid_input', details: parsed.error.flatten() }, 400)
  const { email, password } = parsed.data

  try {
    const supabase = createAnonSupabase()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.session || !data.user) return json({ code: 'auth_failed', message: error?.message || 'Invalid credentials' }, 401)

    // Issue application session JWT (wrapper around supabase user id)
    const token = signSession({ sub: data.user.id, email: data.user.email ?? undefined, role: 'user' }, '2h')

    const res = NextResponse.json({ success: true, data: { access_token: data.session.access_token, refresh_token: data.session.refresh_token, app_token: token } })
    res.cookies.set('vestify_session', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 2, path: '/' })
    return res
  } catch (e) {
    console.error('Login error', e)
    return json({ code: 'internal_error', message: 'Unexpected error' }, 500)
  }
}
