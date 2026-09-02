import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProcessStep } from "@/features/about/types";

/** §52 — how I work, as an ordered process. */
export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  return (
    <section id="process" className="py-20 md:py-28">
      <Container>
        <div data-reveal>
          <SectionHeading>How I Work</SectionHeading>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li
              key={step.id}
              data-reveal
              style={
                { "--reveal-delay": `${index * 90}ms` } as React.CSSProperties
              }
              className="group relative"
            >
              {/* Rule between steps, hidden on the last one and on stacked layouts. */}
              <span
                aria-hidden
                className="absolute left-0 top-4 hidden h-px w-full bg-line lg:block"
              />

              <span className="relative inline-block bg-bg pr-3 font-mono text-sm text-accent">
                {step.number}
              </span>

              <h3 className="mt-4 font-semibold text-heading">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
