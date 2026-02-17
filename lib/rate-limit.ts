// lib/rate-limit.ts
// Simple in-memory rate limiter for API routes

const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  limit: number = 20,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  // Clean up old entries periodically (every 100 checks)
  if (Math.random() < 0.01) {
    for (const [key, val] of rateLimit.entries()) {
      if (now > val.resetTime) rateLimit.delete(key);
    }
  }

  if (!record || now > record.resetTime) {
    rateLimit.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetIn: windowMs };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return { allowed: true, remaining: limit - record.count, resetIn: record.resetTime - now };
}
