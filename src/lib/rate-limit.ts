/**
 * Simple in-memory rate limiter for API routes.
 * 
 * In production with multiple instances, consider using Redis-based rate limiting.
 * This is sufficient for single-instance deployments (Vercel serverless, single VPS).
 */

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export type RateLimitConfig = {
  /** Maximum number of requests allowed in the window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
};

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
};

/**
 * Check if a request should be rate limited.
 * 
 * @param identifier - Unique identifier for the client (e.g., IP address, route+IP)
 * @param config - Rate limit configuration
 * @returns Object with `allowed` boolean and `remaining` count
 */
export function checkRateLimit(
  identifier: string,
  config: Partial<RateLimitConfig> = {}
): { allowed: boolean; remaining: number; resetAt: number } {
  const { maxRequests, windowMs } = { ...DEFAULT_CONFIG, ...config };
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No entry or expired → create new window
  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  // Within window
  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
}

/**
 * Extract client IP from request headers.
 * Works with Vercel, Cloudflare, Nginx, and direct connections.
 */
export function getClientIp(request: Request): string {
  const headers = new Headers(request.headers);
  
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
