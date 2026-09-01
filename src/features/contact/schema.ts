import { z } from "zod";

/**
 * Single source of truth for contact form validation.
 *
 * This runs on the server. Any client-side checking is a UX convenience only
 * and is never trusted — Server Actions are reachable by direct POST, so the
 * server must validate every field itself.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  email: z.email("Please enter a valid email address.").max(254),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(4000, "Message is too long."),
  /**
   * Honeypot. Hidden from real users via CSS, so any value here means a bot
   * filled it in. Must be empty.
   */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Discriminated result returned to the client. Never carries internals. */
export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<"name" | "email" | "message", string[]>>;
    };
