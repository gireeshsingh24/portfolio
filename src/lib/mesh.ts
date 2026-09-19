/**
 * Geometry for the hero's node mesh.
 *
 * Kept apart from the component that draws it because it is pure maths: no
 * React, no canvas, no DOM. That makes it directly testable, and keeps the
 * component file about rendering and lifecycle rather than trigonometry.
 */

export type Vec3 = { x: number; y: number; z: number };
export type Edge = { a: number; b: number };

/**
 * Points spread evenly over a unit sphere, by the Fibonacci lattice.
 *
 * The obvious alternative — random latitude and longitude — bunches points
 * visibly at the poles, because equal steps of latitude cover less surface
 * near the top and bottom of the sphere. Walking `y` linearly and stepping the
 * angle by the golden angle avoids that with no rejection sampling.
 */
export function buildNodes(count: number): Vec3[] {
  if (count <= 0) return [];
  // A single point has no span to divide, so place it at a pole and return.
  if (count === 1) return [{ x: 0, y: 1, z: 0 }];

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const nodes: Vec3[] = [];

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    // Clamped at zero: floating-point error can make 1 - y*y very slightly
    // negative at the poles, and Math.sqrt of that is NaN, which would
    // silently poison every coordinate downstream.
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;

    nodes.push({
      x: Math.cos(theta) * ringRadius,
      y,
      z: Math.sin(theta) * ringRadius,
    });
  }

  return nodes;
}

/**
 * Every pair of nodes closer together than `maxDistance`.
 *
 * Computed once, not per frame: the pairs are fixed in model space, and
 * rotating the sphere never changes which nodes are neighbours.
 */
export function buildEdges(
  nodes: readonly Vec3[],
  maxDistance: number,
): Edge[] {
  const edges: Edge[] = [];

  for (let a = 0; a < nodes.length; a++) {
    for (let b = a + 1; b < nodes.length; b++) {
      const dx = nodes[a].x - nodes[b].x;
      const dy = nodes[a].y - nodes[b].y;
      const dz = nodes[a].z - nodes[b].z;

      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < maxDistance) {
        edges.push({ a, b });
      }
    }
  }

  return edges;
}
