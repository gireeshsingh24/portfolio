"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { submitContact } from "../actions";
import type { ContactState } from "../schema";

const initialState: ContactState = { status: "idle" };

/**
 * Client component so the submission result and pending state can be shown
 * inline. Validation shown here is a convenience — the Server Action revalidates
 * everything, because it can be POSTed to directly.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="flex w-full flex-col gap-8" noValidate>
      <Field
        name="name"
        label="Name"
        type="text"
        autoComplete="name"
        errors={fieldErrors?.name}
      />
      <Field
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        errors={fieldErrors?.email}
      />
      <Field
        name="message"
        label="Message"
        multiline
        errors={fieldErrors?.message}
      />

      {/* Honeypot: hidden from users, visible to naive bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending} className="px-10">
          {pending ? "Sending…" : "Submit"}
        </Button>

        {/* Announced to assistive tech when the result arrives. */}
        <p
          role="status"
          aria-live="polite"
          className={
            state.status === "error"
              ? "text-sm text-accent"
              : "text-sm text-body"
          }
        >
          {state.status !== "idle" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  multiline = false,
  autoComplete,
  errors,
}: {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
  errors?: string[];
}) {
  const errorId = `${name}-error`;
  const hasError = Boolean(errors?.length);

  const shared = {
    id: name,
    name,
    autoComplete,
    "aria-invalid": hasError || undefined,
    "aria-describedby": hasError ? errorId : undefined,
    className:
      "w-full border-b bg-transparent pb-2 text-sm text-heading outline-none " +
      "transition-colors placeholder:text-muted focus:border-accent " +
      (hasError ? "border-accent" : "border-line"),
  };

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm text-muted">
        {label}
      </label>

      {multiline ? (
        <textarea {...shared} rows={4} />
      ) : (
        <input {...shared} type={type} />
      )}

      {hasError && (
        <p id={errorId} className="mt-2 text-xs text-accent">
          {errors?.[0]}
        </p>
      )}
    </div>
  );
}
