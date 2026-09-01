import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Tag } from "@/components/ui/Tag";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/features/projects/types";

/**
 * `reversed` flips the image to the left. The parent derives it from the
 * project's order so the alternating rhythm stays data-driven.
 */
export function ProjectCard({
  project,
  reversed,
}: {
  project: Project;
  reversed: boolean;
}) {
  return (
    <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <div
        data-reveal
        className={cn(reversed && "md:order-2")}
      >
        <h3 className="text-xl font-semibold text-heading">{project.title}</h3>

        {/* No data-reveal on the tags: they sit inside a revealed parent, so
            they cannot intersect independently and would rely on the hook's
            descendant fallback. The parent's reveal covers them. */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag label={tag} />
            </li>
          ))}
        </ul>

        <p className="mt-5 max-w-prose text-sm leading-relaxed text-body">
          {project.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-6">
          {project.githubUrl && (
            <ButtonLink
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              View Github
            </ButtonLink>
          )}

          {project.caseStudy && (
            <ButtonLink href={`/projects/${project.slug}`}>
              Read case study
            </ButtonLink>
          )}

          {/* Client work is usually closed-source. Saying so is better than
              showing no affordance at all, which reads as an unfinished card. */}
          {!project.githubUrl && !project.liveUrl && !project.caseStudy && (
            <span className="text-sm text-muted">
              Private client work — happy to discuss the architecture.
            </span>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group/link inline-flex items-center gap-1 border-b border-white/70 pb-1 text-sm text-heading transition-colors hover:border-accent hover:text-accent"
            >
              View project
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>

      {/* aspect-[2/1] matches the source banners exactly, so object-contain
          shows the whole design — these are composed graphics with logos and
          stat bars at the edges, which object-cover would crop off. */}
      <TiltCard
        className={cn(
          "relative aspect-[2/1] w-full overflow-hidden rounded-md border border-line bg-surface",
          reversed && "md:order-1",
        )}
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain transition-transform duration-700 ease-out group-hover/tilt:scale-105"
        />
      </TiltCard>
    </article>
  );
}
