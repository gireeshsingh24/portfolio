/**
 * Minimal fixed-window rate limiter, in memory.
 *
 * LIMITATION — read before relying on this: the counter lives in the process
 * memory of a single instance. On serverless or multi-instance deployments each
 * instance keeps its own counter, and counters reset on cold start. It raises
 * the cost of casual abuse; it is not a guarantee.
 *
 * If the contact form starts receiving real spam, replace this with a shared
 * store (the platform's rate limiting, or Redis) rather than tuning the numbers
 * here. That is a change to make when there is evidence, not before.
 */

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

type Entry = { count: number; expiresAt: number };

const buckets = new Map<string, Entry>();

/** Returns true when the request is allowed. */
export function checkRateLimit(
  key: string,
  max: number = MAX_REQUESTS,
  windowMs: number = WINDOW_MS,
): boolean {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.expiresAt <= now) {
    buckets.set(key, { count: 1, expiresAt: now + windowMs });
    pruneExpired(now);
    return true;
  }

  if (entry.count >= max) return false;

  entry.count += 1;
  return true;
}

/** Bounds memory growth — without this the map keeps every key it ever saw. */
function pruneExpired(now: number): void {
  for (const [key, entry] of buckets) {
    if (entry.expiresAt <= now) buckets.delete(key);
  }
}
