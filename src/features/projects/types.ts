/**
 * Domain type for a portfolio project.
 *
 * `slug` is the stable identity — it becomes the primary key if this moves to a
 * database, so it must not change once a project is published.
 */
export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: readonly string[];
  /**
   * null for client or employer work with no public repository. The UI hides
   * the button rather than rendering a link that goes nowhere.
   */
  githubUrl: string | null;
  /** null when there is no deployed demo — the "View project" link is hidden. */
  liveUrl: string | null;
  image: {
    src: string;
    alt: string;
  };
  featured: boolean;
  /** Ascending display order. Also drives the alternating left/right layout. */
  order: number;
  /**
   * Long-form case study. Optional: a project without one renders as a card
   * only, with no "Read case study" link and no detail route generated.
   */
  caseStudy?: CaseStudy;
};

export type CaseStudy = {
  /** One-line positioning shown under the title on the detail page. */
  tagline: string;
  overview: string;
  challenge: {
    summary: string;
    /** The specific hard problems — rendered as a list. */
    points: readonly string[];
  };
  role: {
    title: string;
    summary: string;
    responsibilities: readonly string[];
  };
  /** Deeper technical sections; each is a heading plus prose. */
  highlights: readonly { title: string; body: string }[];
  /** Grouped stack, e.g. "Frontend" -> [React, TypeScript]. */
  stack: readonly { group: string; items: readonly string[] }[];
  /** Headline figures. Omitted when a project has none worth stating. */
  scale?: readonly { value: string; label: string }[];
  outcome: string;
};
