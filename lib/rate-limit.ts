type Bucket = { tokens: number; last: number }

const buckets = new Map<string, Bucket>()

export const rateLimit = (key: string, limit = 10, windowMs = 60_000) => {
  const now = Date.now()
  const b = buckets.get(key) ?? { tokens: limit, last: now }
  const elapsed = now - b.last
  const refill = Math.floor(elapsed / windowMs) * limit
  b.tokens = Math.min(limit, b.tokens + (refill > 0 ? refill : 0))
  b.last = now

  if (b.tokens <= 0) {
    buckets.set(key, b)
    return { allowed: false, remaining: 0 }
  }

  b.tokens -= 1
  buckets.set(key, b)
  return { allowed: true, remaining: b.tokens }
}
