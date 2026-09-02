import type { Profile } from "@/features/about/types";
import { siteUrl } from "@/lib/env";

/**
 * §56 — structured data.
 *
 * Person + WebSite + ProfilePage. This is what lets search engines associate
 * the name "Gireesh Singh" with a job title, a skill set and social profiles,
 * rather than treating the page as anonymous text.
 *
 * The content is our own data, not user input, so there is no injection
 * surface — JSON.stringify is used so quotes and unicode escape correctly.
 */
export function JsonLd({
  profile,
  skills,
}: {
  profile: Profile;
  skills: readonly string[];
}) {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    jobTitle: profile.role,
    description: profile.about,
    url: siteUrl,
    email: profile.socials.find((social) => social.icon === "mail")?.href,
    sameAs: profile.socials
      .filter((social) => social.href.startsWith("http"))
      .map((social) => social.href),
    knowsAbout: skills,
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${profile.name} — ${profile.role}`,
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        about: { "@id": `${siteUrl}/#person` },
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
