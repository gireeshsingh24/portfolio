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
