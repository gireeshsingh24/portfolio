import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { NetworkMesh } from "@/components/visuals/NetworkMesh";
import type { Profile } from "@/features/about/types";
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
      {/* Rotating node mesh behind the copy.
          No mask here, deliberately: the sphere is sized off the section's
          larger axis, so any radial fade tight enough to matter lands on its
          rim and erases the silhouette that makes it read as 3D. The mesh
          already fades into the background on its own — depth drives alpha, so
          the far side of the sphere recedes.
          Nor is there a wrapper opacity: 1px antialiased lines lose far more
          than the number suggests when a layer opacity is applied on top of
          their own alpha, so the fade is done once, inside the canvas, where
          depth can drive it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[46%] lg:w-[44%]"
      >
        <NetworkMesh labels={profile.technologies} />
      </div>

      {/* Readability scrim between the mesh and the copy.
          Dimming the mesh itself far enough for comfortable reading would have
          flattened it back into noise, so the contrast is bought locally: a
          wash under the text column only, leaving the mesh crisp everywhere
          else. On small screens the copy spans the full width, so the wash
          covers everything rather than one side. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-bg/55 md:bg-transparent md:[background-image:linear-gradient(to_right,var(--color-bg)_0%,color-mix(in_srgb,var(--color-bg)_72%,transparent)_34%,transparent_62%)]"
      />

      <Container className="relative w-full py-10 md:py-0">
        {/* Capped width now that the portrait no longer holds the right half.
            Without it the headline would stretch the full container and the
            mesh behind it would have nowhere to show through. */}
        <div className="max-w-2xl">
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

          {/*
           * Third path, deliberately quieter than the two buttons: a client
           * who is not ready to start a conversation still wants something to
           * forward to whoever signs off. A plain <a>, not next/link, because
           * the target is a static file rather than a route — and `download`
           * saves it instead of replacing the page with a PDF viewer.
           */}
          <p
            data-reveal
            style={{ "--reveal-delay": "440ms" } as React.CSSProperties}
            className="mt-6 text-sm"
          >
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 text-muted underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M12 3v12" />
                <path d="m7 12 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              Download portfolio (PDF)
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
