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
    // Grid-stacked so the reserved copy and the animated copy occupy the same
    // cell: the element keeps the full text's height and width (nothing below
    // shifts as it types) without the reserved copy rendering as a second
    // visible line, which `invisible` alone did not prevent.
    <p
      aria-label={role}
      className="grid text-base font-semibold tracking-wide sm:text-lg"
    >
      {/* Sizing ghost. Not announced; purely reserves space. */}
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 select-none"
      >
        {role}
      </span>

      {/* The visible, animated copy. Assistive tech reads the full role from
          the aria-label on the paragraph instead of the partial text. */}
      <span className="col-start-1 row-start-1" aria-hidden>
        <span className="animate-shimmer">{visible}</span>
        <span className="animate-caret ml-0.5 text-accent">|</span>
      </span>
    </p>
  );
}
