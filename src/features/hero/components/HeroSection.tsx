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
          {/* §44: eyebrow positions seniority and years before the claim. */}
          <p
            data-reveal
            className="text-xs font-medium uppercase tracking-[0.18em] text-accent sm:text-sm"
          >
            {profile.eyebrow}
          </p>

          <h1
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            className="mt-5 text-3xl font-bold leading-tight text-heading sm:text-5xl"
          >
            {profile.headline}
          </h1>

          {/* Specialisation, still typed — keeps the existing animation. */}
          <div
            data-reveal
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            className="mt-4"
          >
            <TypingRole role={profile.specialisation} />
          </div>

          <p
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            className="mt-5 max-w-xl text-sm leading-relaxed text-body sm:text-base"
          >
            {profile.about}
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "360ms" } as React.CSSProperties}
            className="mt-10 flex flex-wrap gap-4"
          >
            {/* §44: primary CTA is the work, secondary is the conversation. */}
            <ButtonLink href="#projects">View My Work</ButtonLink>
            <ButtonLink href="#contacts" variant="outline">
              Discuss Your Project
            </ButtonLink>
          </div>
        </div>

        <HeroPortrait src={portfolioImg} alt={profile.avatar.alt} />
      </Container>
    </section>
  );
}
