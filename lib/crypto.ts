import crypto from 'crypto'

const getKey = () => {
  const key = process.env.ENCRYPTION_KEY
  if (!key || key.length < 32) throw new Error('ENCRYPTION_KEY must be at least 32 chars')
  return crypto.createHash('sha256').update(key).digest()
}

export const encrypt = (plain: string): string => {
  const iv = crypto.randomBytes(12)
  const key = getKey()
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return Buffer.concat([iv, tag, enc]).toString('base64')
}

export const decrypt = (blob: string): string => {
  const buf = Buffer.from(blob, 'base64')
  const iv = buf.subarray(0, 12)
  const tag = buf.subarray(12, 28)
  const data = buf.subarray(28)
  const key = getKey()
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  const dec = Buffer.concat([decipher.update(data), decipher.final()])
  return dec.toString('utf8')
}
