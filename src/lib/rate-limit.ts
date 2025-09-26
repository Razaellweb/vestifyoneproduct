type Key = string;

const BUCKET: Record<Key, { count: number; resetAt: number }> = {};

export function rateLimit({ key, limit = 30, windowMs = 60_000 }: { key: Key; limit?: number; windowMs?: number }) {
  const now = Date.now();
  const entry = BUCKET[key] || { count: 0, resetAt: now + windowMs };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }
  entry.count += 1;
  BUCKET[key] = entry;
  const remaining = Math.max(0, limit - entry.count);
  const limited = entry.count > limit;
  return { limited, remaining, resetAt: entry.resetAt };
}
