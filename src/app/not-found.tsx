import Link from "next/link";
import { Container } from "@/components/ui/Container";

/** §56 — a real 404 rather than the framework default. */
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-1 items-center">
      <Container className="text-center">
        <p className="font-mono text-sm text-accent">404</p>

        <h1 className="mt-4 text-3xl font-bold text-heading sm:text-4xl">
          This page doesn&apos;t exist
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          The link may be out of date, or the page may have moved.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="btn-shine relative inline-flex items-center justify-center overflow-hidden rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover"
          >
            Back to home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center rounded-md border border-white/70 px-6 py-3 text-sm font-medium text-heading transition-colors hover:border-accent hover:text-accent"
          >
            View my work
          </Link>
        </div>
      </Container>
    </main>
  );
}
