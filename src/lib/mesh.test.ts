import { describe, expect, test } from "bun:test";
import {
  buildEdges,
  buildNodes,
  EDGE_DISTANCE,
  NODE_COUNT,
} from "./mesh";

describe("buildNodes", () => {
  test("returns the requested number of points", () => {
    expect(buildNodes(NODE_COUNT)).toHaveLength(NODE_COUNT);
  });

  test("every point lies on the unit sphere", () => {
    // If this drifts, perspective division stops being meaningful: the scene
    // assumes a radius of exactly 1 when it places the camera.
    for (const node of buildNodes(NODE_COUNT)) {
      const length = Math.sqrt(node.x ** 2 + node.y ** 2 + node.z ** 2);
      expect(length).toBeCloseTo(1, 10);
    }
  });

  test("produces no NaN at the poles", () => {
    // The first and last points sit at y = ±1, where 1 - y*y can go very
    // slightly negative in floating point and turn the radius into NaN.
    const nodes = buildNodes(NODE_COUNT);

    for (const node of [nodes[0], nodes[nodes.length - 1]]) {
      expect(Number.isNaN(node.x)).toBe(false);
      expect(Number.isNaN(node.y)).toBe(false);
      expect(Number.isNaN(node.z)).toBe(false);
    }
  });

  test("spans the full height of the sphere", () => {
    const nodes = buildNodes(NODE_COUNT);
    const ys = nodes.map((node) => node.y);

    expect(Math.max(...ys)).toBeCloseTo(1, 10);
    expect(Math.min(...ys)).toBeCloseTo(-1, 10);
  });

  test("handles degenerate counts without dividing by zero", () => {
    expect(buildNodes(0)).toEqual([]);
    expect(buildNodes(-5)).toEqual([]);

    // count === 1 would otherwise divide by (count - 1) === 0.
    const single = buildNodes(1);
    expect(single).toHaveLength(1);
    expect(Number.isNaN(single[0].y)).toBe(false);
  });
});

describe("buildEdges", () => {
  test("links only pairs closer than the threshold", () => {
    const nodes = buildNodes(NODE_COUNT);

    for (const edge of buildEdges(nodes, EDGE_DISTANCE)) {
      const a = nodes[edge.a];
      const b = nodes[edge.b];
      const distance = Math.sqrt(
        (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2,
      );

      expect(distance).toBeLessThan(EDGE_DISTANCE);
    }
  });

  test("never links a node to itself and never repeats a pair", () => {
    const edges = buildEdges(buildNodes(NODE_COUNT), EDGE_DISTANCE);
    const seen = new Set<string>();

    for (const edge of edges) {
      expect(edge.a).not.toBe(edge.b);
      // b is always the higher index, so one key per unordered pair.
      const key = `${edge.a}-${edge.b}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    }
  });

  test("indices stay inside the node array", () => {
    const nodes = buildNodes(NODE_COUNT);

    for (const edge of buildEdges(nodes, EDGE_DISTANCE)) {
      expect(nodes[edge.a]).toBeDefined();
      expect(nodes[edge.b]).toBeDefined();
    }
  });

  test("the default threshold produces a connected-looking mesh", () => {
    // Guards the tuning: too low and the sphere renders as loose dust, too
    // high and it fills in as a solid blob that reads as noise.
    const edges = buildEdges(buildNodes(NODE_COUNT), EDGE_DISTANCE);

    expect(edges.length).toBeGreaterThan(NODE_COUNT * 1.5);
    expect(edges.length).toBeLessThan(NODE_COUNT * 6);
  });

  test("a zero threshold produces no edges", () => {
    expect(buildEdges(buildNodes(NODE_COUNT), 0)).toEqual([]);
  });
});
