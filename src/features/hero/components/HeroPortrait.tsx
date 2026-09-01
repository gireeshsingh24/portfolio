"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function HeroPortrait({
  src,
  alt,
}: {
  src: string | StaticImageData;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.style.transform =
        `perspective(1000px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg) ` +
        `translate3d(${dx * 14}px, ${dy * 14}px, 0)`;
    });
  }

  function handlePointerLeave() {
    const node = ref.current;
    if (!node) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    node.style.transform = "";
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      // Portrait aspect (3/5) matches the source image, so it fills the box
      // instead of leaving dead space above and below as aspect-square did.
      // Height is capped in vh so the portrait stays inside the fold on short
      // screens; a width-only rule would push the buttons below the viewport.
      className="relative mx-auto aspect-[3/5] h-[min(72vh,38rem)] w-auto max-w-full"
    >
      {/* Halo behind the portrait, pulsing on its own timer. */}
      <div
        aria-hidden
        className="animate-pulse-glow pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 65%)",
        }}
      />

      <div
        ref={ref}
        className="animate-float-y relative h-full w-full transition-transform duration-500 ease-out will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          // The source is only 373x669, so requesting a much larger rendition
          // would just upscale and soften it. 512px is the practical ceiling.
          sizes="(max-width: 768px) 80vw, 640px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
