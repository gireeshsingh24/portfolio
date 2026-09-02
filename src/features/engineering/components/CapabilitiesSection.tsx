import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Capability } from "@/features/about/types";
import type { Project } from "@/features/projects/types";

/**
 * §50 — engineering capabilities, each linked to the work that proves it.
 *
 * Capabilities carry `evidence` slugs rather than free text so a claim cannot
 * drift away from the project that backs it (§60). Only projects that have a
 * case study become links; the rest render as plain labels.
 */
export function CapabilitiesSection({
  capabilities,
  projects,
}: {
  capabilities: Capability[];
  projects: Project[];
}) {
  const bySlug = new Map(projects.map((project) => [project.slug, project]));

  return (
    <section id="engineering" className="py-20 md:py-28">
      <Container>
        <div data-reveal>
          <SectionHeading>Engineering Capabilities</SectionHeading>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {capabilities.map((capability, index) => (
            <article
              key={capability.id}
              data-reveal
              style={
                {
                  "--reveal-delay": `${(index % 2) * 100}ms`,
                } as React.CSSProperties
              }
              className="border-l-2 border-line pl-6 transition-colors duration-300 hover:border-accent"
            >
              <h3 className="text-lg font-semibold text-heading">
                {capability.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-body">
                {capability.body}
              </p>

              {/* Without a case study on this site, say where the experience
                  comes from rather than rendering nothing — a blank space
                  reads as an unfinished card. */}
              {capability.evidence.length === 0 && capability.context && (
                <p className="mt-4 text-xs italic text-muted">
                  {capability.context}
                </p>
              )}

              {capability.evidence.length > 0 && (
                <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span>Proven in:</span>
                  {capability.evidence.map((slug) => {
                    const project = bySlug.get(slug);
                    if (!project) return null;

                    return project.caseStudy ? (
                      <Link
                        key={slug}
                        href={`/projects/${slug}`}
                        className="text-accent underline-offset-4 transition-colors hover:underline"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      <span key={slug} className="text-body">
                        {project.title}
                      </span>
                    );
                  })}
                </p>
              )}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
