"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const TYPE_MS = 90;
const DELETE_MS = 45;
const HOLD_FULL_MS = 2200;
const HOLD_EMPTY_MS = 500;

/**
 * Types the role out, holds, deletes, and repeats — continuously, not once on
 * load.
 *
 * A single self-scheduling timeout drives it rather than a fixed interval: each
 * phase needs its own delay (typing is slower than deleting, and both pause at
 * the ends), which one interval cannot express.
 *
 * The full role is always in the DOM for assistive tech and for crawlers; only
 * the visual copy animates.
 */
export function TypingRole({ role }: { role: string }) {
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && count === role.length) {
      timer = setTimeout(() => setDeleting(true), HOLD_FULL_MS);
    } else if (deleting && count === 0) {
      timer = setTimeout(() => setDeleting(false), HOLD_EMPTY_MS);
    } else {
      timer = setTimeout(
        () => setCount((n) => n + (deleting ? -1 : 1)),
        deleting ? DELETE_MS : TYPE_MS,
      );
    }

    return () => clearTimeout(timer);
  }, [count, deleting, role.length, prefersReduced]);

  const visible = prefersReduced ? role : role.slice(0, count);

  return (
    <p className="text-3xl font-bold sm:text-5xl">
      {/* Reserves the full width so the buttons below never shift as the text
          types and deletes. */}
      <span className="invisible block h-0 overflow-hidden" aria-hidden>
        {role}
      </span>

      <span className="sr-only">{role}</span>

      <span aria-hidden className="animate-shimmer">
        {visible}
      </span>
      <span aria-hidden className="animate-caret ml-0.5 text-accent">
        |
      </span>
    </p>
  );
}
