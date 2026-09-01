"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks the user's reduced-motion preference.
 *
 * CSS handles most of this via the media query in globals.css. This hook is for
 * the cases CSS cannot reach: JS-driven motion (pointer tracking, count-ups)
 * that must not run at all rather than merely run faster.
 *
 * Uses useSyncExternalStore rather than useEffect + setState. A media query is
 * exactly the "external store" this API exists for: it reads the current value
 * during render instead of correcting it in a second pass, which avoids the
 * cascading re-render that calling setState from an effect body causes.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/**
 * Server render assumes motion is allowed, so the markup matches the client's
 * first paint and no hydration mismatch occurs.
 */
function getServerSnapshot(): boolean {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
