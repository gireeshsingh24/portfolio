export type Service = {
  id: string;
  title: string;
  /** Icon key resolved by the UI layer; keeps data free of JSX. */
  icon: "code" | "mobile" | "cloud";
};

export type Stat = {
  id: string;
  value: string;
  /** Rendered in the accent color next to the value, e.g. "+" or "%". */
  suffix: string;
  label: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: "mail" | "github" | "linkedin";
};

export type Profile = {
  name: string;
  role: string;
  /** Small line above the headline. Positions seniority + years (§44). */
  eyebrow: string;
  /** The one-sentence claim the whole site rests on (§44). */
  headline: string;
  /** Rotating specialisation line under the headline; drives the typing effect. */
  specialisation: string;
  greeting: string;
  intro: string;
  about: string;
  resumeUrl: string;
  avatar: {
    src: string;
    alt: string;
  };
  technologies: readonly string[];
  services: readonly Service[];
  stats: readonly Stat[];
  socials: readonly SocialLink[];
};

/**
 * A service offering (§45). `problems` is what a client recognises as their
 * own situation — that is what converts, not a technology list.
 */
export type ServiceOffering = {
  id: string;
  title: string;
  summary: string;
  problems: readonly string[];
  icon: "code" | "mobile" | "cloud" | "layers" | "gauge" | "spark";
};

/** An engineering capability (§50): what I can do, and the proof behind it. */
export type Capability = {
  id: string;
  title: string;
  body: string;
  /** Slugs of projects that demonstrate this. Keeps claims traceable (§60). */
  evidence: readonly string[];
  /**
   * Shown instead of the evidence line when no case study on this site
   * demonstrates the capability. Says where the experience comes from rather
   * than leaving the card blank — and never implies the listed projects
   * prove it.
   */
  context?: string;
};

/** A grouped stack section (§51) — never a flat logo wall. */
export type StackGroup = {
  id: string;
  label: string;
  items: readonly string[];
};

/** One step of the working process (§52). */
export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  body: string;
};
