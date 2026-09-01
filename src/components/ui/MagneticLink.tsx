"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const PULL = 0.28; // fraction of the cursor offset the element follows

export function MagneticLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef<number | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (prefersReduced) return;
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.style.transform = `translate3d(${dx * PULL}px, ${dy * PULL}px, 0)`;
    });
  }

  function handlePointerLeave() {
    const node = ref.current;
    if (!node) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    node.style.transform = "";
  }

  return (
    <Link
      {...props}
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "inline-block transition-transform duration-300 ease-out will-change-transform",
        className,
      )}
    >
      {children}
    </Link>
  );
}
