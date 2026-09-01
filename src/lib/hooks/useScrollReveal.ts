"use client";

import { useEffect } from "react";

/**
 * Reveals every `[data-reveal]` element as it scrolls into view.
 *
 * One observer for the whole document rather than one per element: a single
 * observer with many targets is markedly cheaper than dozens of observers, and
 * elements are unobserved once revealed so the callback list keeps shrinking.
 *
 * Elements stay revealed. Re-hiding on scroll-out makes a page feel twitchy and
 * forces users who scroll back up to watch the same animation again.
 *
 * Three failure modes this guards against, all of which leave text permanently
 * invisible if unhandled:
 *
 * 1. NESTED TARGETS. A `[data-reveal]` inside another `[data-reveal]` can never
 *    intersect while its ancestor sits at opacity 0, so it would never reveal.
 *    Revealing an element therefore also reveals its descendants.
 * 2. THRESHOLD. A `threshold` above 0 cannot be met by an element taller than
 *    the viewport, so it is 0 here — any pixel entering the viewport counts.
 * 3. TEARDOWN. The hiding class must be removed on cleanup, otherwise React's
 *    development double-invoke leaves the page hidden with no live observer.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const revealAll = () =>
      targets.forEach((el) => el.setAttribute("data-visible", "true"));

    // Respect the OS setting: reveal everything immediately and skip observing.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      revealAll();
      return;
    }

    // Bail out rather than hide anything if the API is unavailable.
    if (typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    // Only now opt in to hiding: the CSS keys off this class, so content stays
    // readable if this effect never runs at all.
    root.classList.add("js-reveal-ready");

    // Safety net for anything the observer cannot reach.
    const failsafe = window.setTimeout(revealAll, 2500);

    const reveal = (el: HTMLElement) => {
      el.setAttribute("data-visible", "true");
      // Descendants could not intersect while this element was hidden, so they
      // are revealed together with it.
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child) =>
        child.setAttribute("data-visible", "true"),
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      // threshold 0: reveal as soon as any part enters, which works regardless
      // of how tall the element is. rootMargin starts it slightly early.
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );

    // Only observe outermost targets. Nested ones are revealed by their
    // ancestor, and observing them separately would never fire.
    targets.forEach((el) => {
      if (el.parentElement?.closest("[data-reveal]")) return;
      observer.observe(el);
    });

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
      // Critical: drop the hiding class, or a teardown without a re-mount
      // leaves every target stuck at opacity 0.
      root.classList.remove("js-reveal-ready");
    };
  }, []);
}
