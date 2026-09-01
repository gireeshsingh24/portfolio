import type { Profile } from "@/features/about/types";
import type { Project } from "@/features/projects/types";
import { profile } from "./profile";
import { projects } from "./projects";

/**
 * The data access seam.
 *
 * Components and sections MUST import from this module and never from
 * `./projects` or `./profile` directly. That single rule is what lets the
 * backing store change (static file -> database) without touching any UI.
 *
 * These functions are async even though the current implementation is
 * synchronous. That is deliberate: a database-backed implementation is async,
 * and keeping the signature stable now means no caller changes later.
 */

export async function getProjects(): Promise<Project[]> {
  return [...projects].sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((project) => project.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((project) => project.slug === slug) ?? null;
}

/**
 * Projects that have a written case study — the only ones with a detail route.
 * Used by generateStaticParams so no page is built for a project that has
 * nothing to show.
 */
export async function getProjectsWithCaseStudy(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((project) => project.caseStudy !== undefined);
}

export async function getProfile(): Promise<Profile> {
  return profile;
}
