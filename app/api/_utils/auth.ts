import { cookies, headers } from 'next/headers'
import { verifySession, SessionPayload } from '@/lib/jwt'

export type Session = SessionPayload & { valid: boolean }

export function getSession(): Session {
  // Try cookie first
  const jar = cookies()
  const token = jar.get('vestify_session')?.value || headers().get('authorization')?.replace(/^Bearer\s+/i, '') || ''
  if (!token) return { valid: false, sub: '' }
  try {
    const payload = verifySession(token)
    return { ...payload, valid: true }
  } catch {
    return { valid: false, sub: '' }
  }
}

export function requireUserId() {
  const session = getSession()
  if (!session.valid || !session.sub) throw new Error('unauthorized')
  return session.sub
}
