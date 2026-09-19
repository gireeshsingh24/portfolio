"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { buildEdges, buildNodes } from "@/lib/mesh";
import { cn } from "@/lib/utils";

/**
 * A rotating 3D node mesh, projected by hand onto a 2D canvas.
 *
 * WHY CANVAS AND NOT WebGL: the whole scene is ~70 points and ~120 short
 * lines. That is well inside what 2D canvas draws in a fraction of a frame,
 * and it costs nothing to download — three.js would have added hundreds of
 * kilobytes to a site whose pitch is that the author cares about what ships.
 * The 3D here is real: unit vectors are rotated on two axes and divided
 * through by depth for perspective, then depth drives size, alpha and
 * draw order. It is the projection maths that is doing the work, not a
 * library.
 *
 * WHY THIS IMAGE: the site is about state staying correct across many clients
 * at once. A graph of nodes with updates visibly propagating along its edges
 * is that idea, rather than decoration that could belong to any site.
 *
 * Budget guards, in order of how often they matter:
 *   - reduced motion  → one static frame, no loop at all
 *   - scrolled away   → loop stops (IntersectionObserver)
 *   - tab hidden      → loop stops (visibilitychange)
 *   - device pixels   → capped at 2, so a 3x phone does not draw 9x the pixels
 */

/** Points on the sphere. Enough to read as a mesh, few enough to stay cheap. */
const NODE_COUNT = 70;
/** Edges only between genuinely close nodes, or the sphere becomes a solid blob. */
const EDGE_DISTANCE = 0.62;
/** Camera sits this far back in scene units; the sphere has radius 1. */
const CAMERA_DISTANCE = 2.6;
/** Larger values flatten the perspective, smaller ones exaggerate it. */
const FOCAL_LENGTH = 2.1;
/** Radians per second. Slow enough to feel ambient rather than busy. */
const SPIN_SPEED = 0.16;
/** How far the pointer can tilt the scene, in radians. */
const POINTER_TILT = 0.4;
/** Concurrent update pulses travelling along edges. */
const PULSE_COUNT = 7;
/** Edge fractions per second — how fast one pulse crosses its edge. */
const PULSE_SPEED = 0.55;

type Pulse = { edge: number; t: number; speed: number };

export function NetworkMesh({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // A 2D context can genuinely be null (very old browsers, canvas disabled).
    // The canvas is decorative, so bail out silently and leave the gradient
    // behind it doing the work.
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = buildNodes(NODE_COUNT);
    const edges = buildEdges(nodes, EDGE_DISTANCE);

    const pulses: Pulse[] = Array.from({ length: PULSE_COUNT }, () => ({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: PULSE_SPEED * (0.6 + Math.random() * 0.8),
    }));

    // Read the brand colours from CSS rather than hardcoding them, so the
    // scene follows the design tokens if they ever change.
    // `--color-muted` rather than `--color-line`: the line token is tuned for
    // 1px borders sitting directly on the background, and at the low alphas
    // used here it disappears against it entirely.
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--color-accent").trim() || "#f2795b";
    const line = styles.getPropertyValue("--color-muted").trim() || "#8a94a6";

    let width = 0;
    let height = 0;

    const resize = () => {
      // Cap DPR: beyond 2 the extra pixels are invisible but the fill cost is
      // quadratic, and this runs every frame.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      // Draw in CSS pixels and let the transform handle the device ratio.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // Pointer parallax is stored as a target and eased towards each frame, so
    // a fast mouse does not snap the scene around.
    let pointerX = 0;
    let pointerY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const projected = nodes.map(() => ({ x: 0, y: 0, depth: 0 }));

    /**
     * Draws one frame at the given elapsed time.
     *
     * `elapsed` is passed in rather than read from a clock so the static
     * reduced-motion render can reuse the identical code path at t=0.
     */
    const draw = (elapsed: number) => {
      const spin = elapsed * SPIN_SPEED;
      const angleY = spin + tiltX * POINTER_TILT;
      const angleX = Math.sin(elapsed * 0.22) * 0.18 + tiltY * POINTER_TILT;

      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);
      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);

      const centreX = width / 2;
      const centreY = height / 2;
      // Sized off the LARGER axis so the mesh spans a wide hero instead of
      // sitting as a small ball in the middle of it, then clamped against the
      // width. Without the clamp a tall narrow phone viewport drives the
      // radius off its height and the sphere grows wider than the screen,
      // leaving only a slab of criss-crossing lines with no silhouette.
      const radius = Math.min(Math.max(width, height) * 0.4, width * 0.52);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Yaw, then pitch.
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.x * sinY + node.z * cosY;
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        // Perspective divide. CAMERA_DISTANCE keeps the denominator well away
        // from zero, so no point can blow up as it passes the camera plane.
        const scale = FOCAL_LENGTH / (CAMERA_DISTANCE + z2);

        projected[i].x = centreX + x1 * scale * radius;
        projected[i].y = centreY + y2 * scale * radius;
        // Normalised 0 (far) → 1 (near), used for alpha and node size.
        projected[i].depth = (z2 + 1) / 2;
      }

      // Edges first so nodes sit on top of them.
      ctx.strokeStyle = line;
      ctx.lineWidth = 1.1;

      for (const edge of edges) {
        const a = projected[edge.a];
        const b = projected[edge.b];
        // Far edges fade out; without this the back of the sphere reads as
        // visual noise competing with the hero copy.
        const nearness = 1 - (a.depth + b.depth) / 2;

        ctx.globalAlpha = 0.05 + nearness * 0.42;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Nodes.
      for (let i = 0; i < projected.length; i++) {
        const point = projected[i];
        const nearness = 1 - point.depth;

        ctx.globalAlpha = 0.2 + nearness * 0.5;
        ctx.fillStyle = i % 7 === 0 ? accent : line;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 0.8 + nearness * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update pulses travelling between nodes.
      ctx.fillStyle = accent;

      for (const pulse of pulses) {
        const edge = edges[pulse.edge];
        if (!edge) continue;

        const a = projected[edge.a];
        const b = projected[edge.b];
        const px = a.x + (b.x - a.x) * pulse.t;
        const py = a.y + (b.y - a.y) * pulse.t;
        const nearness = 1 - (a.depth + b.depth) / 2;

        ctx.globalAlpha = 0.25 + nearness * 0.6;
        ctx.beginPath();
        ctx.arc(px, py, 1.4 + nearness * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    // ---- Static path: one frame, no loop, no listeners. ----
    if (prefersReduced) {
      draw(0);
      const observer = new ResizeObserver(() => {
        resize();
        draw(0);
      });
      observer.observe(canvas);
      return () => observer.disconnect();
    }

    // ---- Animated path. ----
    let frame: number | null = null;
    let lastTimestamp: number | null = null;
    let elapsed = 0;
    let onScreen = true;

    const tick = (timestamp: number) => {
      // Delta time rather than a frame counter: the scene then runs at the
      // same speed on 60Hz and 144Hz displays, and does not jump after the
      // loop has been parked for a while.
      const delta =
        lastTimestamp === null
          ? 0
          : Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;
      elapsed += delta;

      tiltX += (pointerX - tiltX) * 0.05;
      tiltY += (pointerY - tiltY) * 0.05;

      for (const pulse of pulses) {
        pulse.t += pulse.speed * delta;
        if (pulse.t >= 1) {
          // Hand the pulse to a new random edge so traffic keeps moving
          // around the graph instead of looping on the same few lines.
          pulse.t = 0;
          pulse.edge = Math.floor(Math.random() * edges.length);
        }
      }

      draw(elapsed);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame !== null) return;
      // Reset the clock so the first delta after a pause is 0, not the whole
      // time spent parked.
      lastTimestamp = null;
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (frame === null) return;
      cancelAnimationFrame(frame);
      frame = null;
    };

    const sync = () => {
      if (onScreen && !document.hidden) start();
      else stop();
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    sync();

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      // Decorative: it carries no information that is not already in the copy,
      // so it is hidden from assistive tech and never takes pointer events.
      className={cn("pointer-events-none block h-full w-full", className)}
    />
  );
}
