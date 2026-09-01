"use server";

import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactSchema, type ContactState } from "./schema";

/**
 * Handles a contact form submission.
 *
 * Server Actions are invoked by POST and are reachable directly, not only
 * through our own UI, so every submission is validated and rate limited here
 * regardless of what the client did.
 *
 * DELIVERY IS NOT IMPLEMENTED. Valid submissions are logged server-side and
 * nothing is sent or persisted. Wiring an email provider needs an API key, and
 * persisting needs a database — both are deliberately out of scope for the
 * static phase. Replace the marked block below when you choose one.
 */
export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const { fieldErrors } = z_flatten(parsed.error);

    // A filled honeypot is a bot. Report success so it learns nothing.
    if (fieldErrors.website) {
      return { status: "success", message: "Thanks — your message was sent." };
    }

    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: {
        name: fieldErrors.name,
        email: fieldErrors.email,
        message: fieldErrors.message,
      },
    };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return {
      status: "error",
      message: "Too many messages sent. Please try again later.",
    };
  }

  try {
    // ---- Delivery sink: replace this block ----------------------------------
    // Options: send via an email provider, or persist to a database so the
    // future admin panel can read submissions. Both need configuration that
    // does not exist yet.
    console.info("[contact] submission received", {
      name: parsed.data.name,
      email: parsed.data.email,
      length: parsed.data.message.length,
    });
    // ------------------------------------------------------------------------

    return {
      status: "success",
      message: "Thanks — your message was sent. I'll get back to you soon.",
    };
  } catch (error) {
    // Log the real error server-side; return something safe to the client.
    console.error("[contact] delivery failed", error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    };
  }
}

/** Narrow helper so the action does not depend on zod's error shape inline. */
function z_flatten(error: {
  issues: { path: PropertyKey[]; message: string }[];
}): { fieldErrors: Record<string, string[] | undefined> } {
  const fieldErrors: Record<string, string[] | undefined> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (!key) continue;
    (fieldErrors[key] ??= []).push(issue.message);
  }
  return { fieldErrors };
}
