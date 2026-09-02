import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceIcons } from "@/components/ui/icons";
import type { ServiceOffering } from "@/features/about/types";

/**
 * §45 — what I build, framed as problems a client recognises.
 *
 * Server Component. Uses the existing [data-reveal] mechanism and theme tokens
 * so it matches the rest of the site exactly.
 */
export function ServicesSection({
  services,
}: {
  services: ServiceOffering[];
}) {
  return (
    <section id="services" className="py-20 md:py-28">
      <Container>
        <div data-reveal>
          <SectionHeading>What I Build</SectionHeading>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article
                key={service.id}
                data-reveal
                style={
                  {
                    "--reveal-delay": `${(index % 3) * 100}ms`,
                  } as React.CSSProperties
                }
                className="group rounded-lg border border-line bg-surface/60 p-6 transition-colors duration-300 hover:border-accent/60"
              >
                <Icon className="h-8 w-8 text-accent" />

                <h3 className="mt-5 text-lg font-semibold text-heading">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-body">
                  {service.summary}
                </p>

                <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
                  {service.problems.map((problem) => (
                    <li
                      key={problem}
                      className="flex gap-2.5 text-xs leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {problem}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
