import jwt from 'jsonwebtoken'

const getSecret = () => {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('JWT_SECRET missing')
  return s
}

export type SessionPayload = { sub: string; email?: string; role?: 'user'|'admin' }

export const signSession = (payload: SessionPayload, expiresIn = '2h') => {
  return jwt.sign(payload, getSecret(), { expiresIn, algorithm: 'HS256' })
}

export const verifySession = (token: string): SessionPayload => {
  return jwt.verify(token, getSecret()) as SessionPayload
}
