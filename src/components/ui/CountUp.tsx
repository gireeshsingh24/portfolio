"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export function CountUp({
  value,
  durationMs = 1600,
}: {
  value: string;
  durationMs?: number;
}) {
  const target = Number.parseFloat(value);
  const isNumeric = Number.isFinite(target);

  const ref = useRef<HTMLSpanElement>(null);
  const [progressValue, setProgressValue] = useState(0);
  const prefersReduced = usePrefersReducedMotion();

  const shouldAnimate = isNumeric && !prefersReduced;

  useEffect(() => {
    if (!shouldAnimate) return;

    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          // easeOutExpo: fast start, long settle — reads as "landing" on a value.
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setProgressValue(Math.round(target * eased));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [shouldAnimate, target, durationMs]);

  // Derived during render rather than assigned from an effect: a non-numeric or
  // reduced-motion value never needs a state write at all.
  const display = shouldAnimate ? String(progressValue) : value;

  // aria-label carries the final value so assistive tech never reads the
  // intermediate counting numbers.
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
