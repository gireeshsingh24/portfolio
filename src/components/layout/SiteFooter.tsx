import { Container } from "@/components/ui/Container";
import { socialIcons } from "@/components/ui/icons";
import type { Profile } from "@/features/about/types";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-white/5 bg-surface py-12">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="font-semibold text-heading">{profile.name}</p>
        <p className="text-sm text-muted">
          Designed and built by {profile.name}. &copy;{" "}
          {new Date().getFullYear()} All rights reserved.
        </p>

        <ul className="mt-2 flex items-center gap-4">
          {profile.socials.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-bg text-body transition-all duration-300 hover:-translate-y-1 hover:text-accent hover:shadow-[0_0_20px_-4px_var(--color-accent)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </footer>
  );
}
