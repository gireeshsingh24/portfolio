import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Profile } from "@/features/about/types";
import portfolioImg from "@/assets/images/portfolio-image.png";
import { HeroPortrait } from "./HeroPortrait";
import { TypingRole } from "./TypingRole";

export function HeroSection({ profile }: { profile: Profile }) {
  return (
    // min-h rather than h: the section fills the viewport but can still grow
    // if the content needs more room (long role text, large font settings).
    // 4rem is the sticky header's height, so the hero fills what remains.
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
    >
      <Container className="grid w-full items-center gap-12 py-10 md:grid-cols-2 md:py-0">
        <div>
          <h1
            data-reveal
            className="text-4xl font-bold text-heading sm:text-5xl"
          >
            {profile.greeting}
            <span className="animate-caret text-accent">.</span>
          </h1>

          <p
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="mt-4 flex items-center gap-4 text-2xl text-heading sm:text-3xl"
          >
            {/* Rule grows out from the left as the line reveals. */}
            <span
              aria-hidden
              className="hidden h-px w-12 origin-left bg-accent sm:block"
            />
            {profile.intro}
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            className="mt-4"
          >
            <TypingRole role={profile.role} />
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "360ms" } as React.CSSProperties}
            className="mt-10 flex flex-wrap gap-4"
          >
            <ButtonLink href="#contacts">Got a project?</ButtonLink>
            <ButtonLink href={profile.resumeUrl} variant="outline">
              My resume
            </ButtonLink>
          </div>
        </div>

        <HeroPortrait src={portfolioImg} alt={profile.avatar.alt} />
      </Container>
    </section>
  );
}
