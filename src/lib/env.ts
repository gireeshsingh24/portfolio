import { z } from "zod";

/**
 * Environment validation.
 *
 * Parsed once at module load so a misconfigured deployment fails at boot with a
 * clear message, rather than at the first request that happens to need a value.
 *
 * Only NEXT_PUBLIC_SITE_URL exists today. Add server-only secrets here as they
 * appear (email provider key, database URL, admin credentials) — never read
 * process.env directly from a component.
 */
const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid environment variables:\n${details}`);
}

export const env = parsed.data;

/** Canonical origin, without a trailing slash. */
export const siteUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
