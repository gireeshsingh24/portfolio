import { describe, expect, test } from "bun:test";
import { checkRateLimit } from "./rate-limit";

/** §30 — abuse protection is worth a regression test (§25). */
describe("checkRateLimit", () => {
  test("allows up to the limit, then blocks", () => {
    const key = `allow-${Math.random()}`;
    const results = Array.from({ length: 7 }, () => checkRateLimit(key));
    expect(results.slice(0, 5).every(Boolean)).toBe(true);
    expect(results.slice(5)).toEqual([false, false]);
  });

  test("tracks keys independently", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    for (let i = 0; i < 5; i++) checkRateLimit(a);
    expect(checkRateLimit(a)).toBe(false);
    expect(checkRateLimit(b)).toBe(true);
  });

  test("resets after the window expires", async () => {
    const key = `expiry-${Math.random()}`;
    expect(checkRateLimit(key, 1, 50)).toBe(true);
    expect(checkRateLimit(key, 1, 50)).toBe(false);
    await new Promise((resolve) => setTimeout(resolve, 80));
    expect(checkRateLimit(key, 1, 50)).toBe(true);
  });
});
