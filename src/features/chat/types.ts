/**
 * A scripted lead-capture conversation.
 *
 * Deliberately not a language model. The job here is to qualify a visitor in a
 * few taps and hand them to a real channel, and that path is fixed — an LLM
 * would add a per-message cost and an open prompt surface on a public page to
 * do something a decision tree already does, while being able to say things
 * about the work that are not true.
 *
 * Every branch is therefore written from what the site already claims, and
 * every branch ends at a way to reach a human.
 */

/** What a choice does when there is nowhere further to go in the script. */
export type ChatAction =
  /** Open WhatsApp with a prefilled message. Hidden when no number is set. */
  | { kind: "whatsapp"; prefill: string }
  /** Open the visitor's mail client with a prefilled subject and body. */
  | { kind: "email"; subject: string; body: string }
  /** Jump to a section of the page and close the panel. */
  | { kind: "scroll"; target: string }
  /** Download the portfolio PDF. */
  | { kind: "download" };

export type ChatChoice = {
  /** The button the visitor taps. Written in their voice, not the site's. */
  label: string;
} & (
  | { next: string; action?: never }
  | { action: ChatAction; next?: never }
);

export type ChatNode = {
  id: string;
  /**
   * What the assistant says. Kept to a couple of short lines — a wall of text
   * in a small panel is skipped, not read.
   */
  lines: readonly string[];
  choices: readonly ChatChoice[];
};
