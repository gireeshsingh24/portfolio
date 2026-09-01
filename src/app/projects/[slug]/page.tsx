import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { ScrollRevealProvider } from "@/components/layout/ScrollRevealProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import {
  getProfile,
  getProjectBySlug,
  getProjectsWithCaseStudy,
} from "@/data/repository";


export async function generateStaticParams() {
  const projects = await getProjectsWithCaseStudy();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project?.caseStudy) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.caseStudy.tagline,
    openGraph: {
      title: project.title,
      description: project.caseStudy.tagline,
    },
  };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const [project, profile] = await Promise.all([
    getProjectBySlug(slug),
    getProfile(),
  ]);

  // A project with no case study has no detail page, even though the slug exists.
  if (!project?.caseStudy) notFound();

  const study = project.caseStudy;

  return (
    <>
      <AmbientBackground />
      <ScrollRevealProvider />
      <SiteHeader name={profile.name} />

      <main className="flex-1">
        <Container className="py-16 md:py-24">
          <Link
            href="/#projects"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            ← Back to projects
          </Link>

          <header className="mt-8" data-reveal>
            <p className="text-sm text-accent">{study.tagline}</p>
            <h1 className="mt-3 text-3xl font-bold text-heading sm:text-5xl">
              {project.title}
            </h1>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Tag label={tag} />
                </li>
              ))}
            </ul>
          </header>

          <div
            data-reveal
            className="relative mt-12 aspect-[2/1] w-full overflow-hidden rounded-lg border border-line bg-surface"
          >
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
            />
          </div>

          {study.scale && (
            <dl
              data-reveal
              className="mt-12 grid grid-cols-2 gap-8 border-y border-line py-8 sm:grid-cols-3"
            >
              {study.scale.map((item) => (
                <div key={item.label}>
                  <dd className="text-3xl font-bold text-accent">
                    {item.value}
                  </dd>
                  <dt className="mt-2 text-xs text-muted">{item.label}</dt>
                </div>
              ))}
            </dl>
          )}

          <Section title="Overview">
            <p className="leading-relaxed text-body">{study.overview}</p>
          </Section>

          <Section title="The challenge">
            <p className="leading-relaxed text-body">{study.challenge.summary}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {study.challenge.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-body">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="My role">
            <p className="text-sm font-medium text-heading">
              {study.role.title}
            </p>
            <p className="mt-3 leading-relaxed text-body">
              {study.role.summary}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {study.role.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-body">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {study.highlights.map((highlight) => (
            <Section key={highlight.title} title={highlight.title}>
              <p className="leading-relaxed text-body">{highlight.body}</p>
            </Section>
          ))}

          <Section title="Technology">
            <div className="grid gap-8 sm:grid-cols-2">
              {study.stack.map((group) => (
                <div key={group.group}>
                  <h3 className="text-sm font-medium text-heading">
                    {group.group}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Tag label={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Outcome">
            <p className="leading-relaxed text-body">{study.outcome}</p>
          </Section>

          <div data-reveal className="mt-16 border-t border-line pt-8">
            <Link
              href="/#contacts"
              className="text-sm text-heading transition-colors hover:text-accent"
            >
              Want the detail behind this build? Get in touch →
            </Link>
          </div>
        </Container>
      </main>

      <SiteFooter profile={profile} />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section data-reveal className="mt-14 max-w-3xl">
      <h2 className="text-xl font-semibold text-heading">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
