import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/features/projects/types";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    // Top padding is reduced because it stacks with the About section's
    // bottom padding; the pair is tuned together, not in isolation.
    <section id="projects" className="pt-10 pb-20 md:pt-14 md:pb-28">
      <Container>
        <div data-reveal>
          <SectionHeading>Projects</SectionHeading>
        </div>

        {projects.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted">
            Projects coming soon.
          </p>
        ) : (
          <div className="mt-10 flex flex-col gap-24">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                reversed={index % 2 === 1}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
