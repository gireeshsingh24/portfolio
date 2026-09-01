"use client";

import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const MAX_TILT_DEG = 9;

export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const node = ref.current;
    if (!node) return;

    // Cache the values now — the event object is not safe to read inside rAF.
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.style.transform =
        `perspective(900px) rotateX(${(0.5 - py) * MAX_TILT_DEG}deg) ` +
        `rotateY(${(px - 0.5) * MAX_TILT_DEG}deg) scale3d(1.02, 1.02, 1.02)`;
      node.style.setProperty("--spot-x", `${px * 100}%`);
      node.style.setProperty("--spot-y", `${py * 100}%`);
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
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group/tilt relative transition-transform duration-300 ease-out will-change-transform",
        className,
      )}
    >
      {/* Spotlight that follows the pointer. Fades in only while hovered. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
