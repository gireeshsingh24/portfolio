import { describe, expect, test } from "bun:test";
import { contactSchema } from "./schema";

/**
 * §30 — tests target the risk, not coverage percentage.
 *
 * This schema is the only thing standing between an unauthenticated POST and
 * the contact pipeline, so its rejection behaviour is worth locking down.
 */

const valid = {
  name: "Ana Ray",
  email: "ana@example.com",
  message: "Hello, I have a project I would like to discuss with you.",
  website: "",
};

describe("contactSchema", () => {
  test("accepts a well-formed submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  const rejections: [string, Record<string, unknown>, string][] = [
    ["name too short", { ...valid, name: "A" }, "name"],
    ["name only whitespace", { ...valid, name: "   " }, "name"],
    ["invalid email", { ...valid, email: "not-an-email" }, "email"],
    ["message too short", { ...valid, message: "hi" }, "message"],
    ["message too long", { ...valid, message: "x".repeat(5000) }, "message"],
    ["honeypot filled", { ...valid, website: "spam.example" }, "website"],
  ];

  test.each(rejections)("rejects %s", (_label, input, field) => {
    const result = contactSchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.path[0] === field),
      ).toBe(true);
    }
  });

  test("rejects null fields rather than coercing them", () => {
    const result = contactSchema.safeParse({
      name: null,
      email: null,
      message: null,
      website: "",
    });
    expect(result.success).toBe(false);
  });

  test("trims surrounding whitespace on accepted input", () => {
    const result = contactSchema.safeParse({ ...valid, name: "  Ana Ray  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Ana Ray");
  });
});
