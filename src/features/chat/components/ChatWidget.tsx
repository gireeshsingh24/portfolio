"use client";

import { useEffect, useId, useRef, useState } from "react";
import { chatNodes } from "@/data/chat";
import type { ChatAction, ChatChoice, ChatNode } from "../types";
import { cn } from "@/lib/utils";

/**
 * A scripted assistant whose only job is to get a visitor to a real channel.
 *
 * It answers from the page's own claims and hands over to WhatsApp, email or
 * the contact form. See `src/data/chat.ts` for why this is a decision tree and
 * not a language model.
 */

type Turn = { id: number; from: "bot" | "visitor"; text: string };

const nodesById = new Map<string, ChatNode>(
  chatNodes.map((node) => [node.id, node]),
);

const START = "start";

function turnsForNode(node: ChatNode, from: number): Turn[] {
  return node.lines.map((text, i) => ({ id: from + i, from: "bot", text }));
}

export function ChatWidget({
  email,
  whatsapp,
  portfolioUrl,
}: {
  email: string;
  /** Digits only, no "+". When absent the WhatsApp option is not rendered. */
  whatsapp?: string;
  portfolioUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const [nodeId, setNodeId] = useState(START);
  const [turns, setTurns] = useState<Turn[]>(() =>
    turnsForNode(nodesById.get(START)!, 0),
  );

  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  const nextTurnId = useRef(100);

  const node = nodesById.get(nodeId) ?? nodesById.get(START)!;

  // Escape closes from anywhere inside the panel, and focus goes back to the
  // button that opened it — otherwise a keyboard user is dropped at the top of
  // the document.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Move focus into the panel on open so the conversation is reachable without
  // tabbing back through the whole page.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  // Keep the newest turn in view as the conversation grows.
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ block: "end" });
  }, [turns]);

  function say(choice: ChatChoice, target: ChatNode) {
    const base = nextTurnId.current;
    nextTurnId.current = base + 1 + target.lines.length;

    setTurns((current) => [
      ...current,
      { id: base, from: "visitor", text: choice.label },
      ...turnsForNode(target, base + 1),
    ]);
    setNodeId(target.id);
  }

  function run(action: ChatAction) {
    switch (action.kind) {
      case "whatsapp": {
        if (!whatsapp) return;
        window.open(
          `https://wa.me/${whatsapp}?text=${encodeURIComponent(action.prefill)}`,
          "_blank",
          "noopener,noreferrer",
        );
        return;
      }

      case "email": {
        // A mailto: opens the visitor's own client with the draft ready. The
        // site never sends anything on their behalf.
        window.location.assign(
          `mailto:${email}` +
            `?subject=${encodeURIComponent(action.subject)}` +
            `&body=${encodeURIComponent(action.body)}`,
        );
        return;
      }

      case "scroll": {
        setOpen(false);
        document
          .querySelector(action.target)
          ?.scrollIntoView({ block: "start" });
        return;
      }

      case "download": {
        const link = document.createElement("a");
        link.href = portfolioUrl;
        link.download = "";
        link.click();
        return;
      }
    }
  }

  function choose(choice: ChatChoice) {
    if (choice.action) {
      run(choice.action);
      return;
    }

    const target = nodesById.get(choice.next);
    if (target) say(choice, target);
  }

  function restart() {
    const start = nodesById.get(START)!;
    nextTurnId.current = 100;
    setTurns(turnsForNode(start, 0));
    setNodeId(START);
  }

  // A WhatsApp choice with no number behind it would be a button that does
  // nothing, so it is filtered out rather than disabled.
  const choices = node.choices.filter(
    (choice) => !(choice.action?.kind === "whatsapp" && !whatsapp),
  );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close chat" : "Chat about a project"}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center",
          "rounded-full bg-accent text-white shadow-lg shadow-black/40",
          "transition-transform duration-300 hover:scale-105 active:scale-95",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        )}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          {open ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.3-.6L3 21l1.7-5a8.2 8.2 0 0 1-.7-3.4 8.4 8.4 0 0 1 8.5-8.1 8.4 8.4 0 0 1 8.5 8Z" />
          )}
        </svg>
      </button>

      <div
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-label="Chat about a project"
        tabIndex={-1}
        hidden={!open}
        className={cn(
          "fixed bottom-24 right-5 z-50 flex max-h-[min(32rem,calc(100svh-9rem))] w-[min(22rem,calc(100vw-2.5rem))]",
          "flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/50",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        )}
      >
        <header className="flex items-center justify-between border-b border-line px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-heading">
              Project enquiry
            </p>
            <p className="text-xs text-muted">Answers, then straight to Gireesh</p>
          </div>
          <button
            type="button"
            onClick={restart}
            className="rounded-sm text-xs text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start over
          </button>
        </header>

        {/* polite, not assertive: new lines should not interrupt whatever a
            screen reader is already saying. */}
        <div
          aria-live="polite"
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        >
          {turns.map((turn) => (
            <p
              key={turn.id}
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                turn.from === "bot"
                  ? "bg-bg text-body"
                  : "ml-auto bg-accent text-white",
              )}
            >
              {turn.text}
            </p>
          ))}
          <div ref={logEndRef} />
        </div>

        <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
          {choices.map((choice) => (
            <button
              key={choice.label}
              type="button"
              onClick={() => choose(choice)}
              className={cn(
                "rounded-full border border-line px-3 py-1.5 text-xs text-body",
                "transition-colors hover:border-accent hover:text-accent",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              )}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
