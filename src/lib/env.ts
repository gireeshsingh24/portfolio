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

/**
 * Resolves the canonical origin.
 *
 * The default below is a DEVELOPMENT fallback, and it used to be what
 * production actually shipped: with NEXT_PUBLIC_SITE_URL unset on the host,
 * the live sitemap and robots.txt advertised http://localhost:3000, which is
 * worse than having no sitemap at all — and a canonical tag pointing at
 * localhost would tell search engines to drop the real pages.
 *
 * Nothing about that failure is visible: the build succeeds, the pages render,
 * and only the URLs inside them are wrong. So the host's own value is used as
 * a second source before falling back to localhost.
 *
 * `VERCEL_PROJECT_PRODUCTION_URL` is the project's production domain and is
 * present at build time, which is when these static pages are generated. It
 * carries no protocol, so one is added. It is deliberately preferred over
 * `VERCEL_URL`, which is unique per deployment — using that would make every
 * preview claim a different canonical URL.
 */
function resolveSiteUrl(): string | undefined {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelDomain) return `https://${vercelDomain}`;

  return undefined;
}

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: resolveSiteUrl(),
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
