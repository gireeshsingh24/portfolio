import type { ChatNode } from "@/features/chat/types";

/**
 * The conversation script.
 *
 * Two rules hold throughout:
 *
 * 1. Nothing here states a fact the rest of the site does not already state.
 *    Rates, notice periods and current availability are not on the site, so
 *    the script does not guess at them — those branches hand over to a real
 *    conversation instead of inventing an answer that would have to be walked
 *    back later.
 *
 * 2. Every branch terminates at a way to reach a human. A visitor should never
 *    be able to tap themselves into a dead end.
 */
export const chatNodes: readonly ChatNode[] = [
  {
    id: "start",
    lines: [
      "Hi — I can point you to the right thing in about three taps.",
      "What brings you here?",
    ],
    choices: [
      { label: "I have a project in mind", next: "project-type" },
      { label: "What do you build?", next: "services" },
      { label: "Can I see the work?", next: "work" },
      { label: "Availability and rates", next: "commercials" },
    ],
  },

  // ---- Project path: qualify, then hand over. ----
  {
    id: "project-type",
    lines: ["Good. Which of these is closest?"],
    choices: [
      { label: "A SaaS or business platform", next: "fit-platform" },
      { label: "Something real-time", next: "fit-realtime" },
      { label: "Mobile or desktop too", next: "fit-crossplatform" },
      { label: "An existing codebase that's struggling", next: "fit-rescue" },
      { label: "Something with AI in it", next: "fit-ai" },
    ],
  },
  {
    id: "fit-platform",
    lines: [
      "That's the core of the work — multi-role platforms, dashboards and " +
        "operational tools built to survive real use.",
      "MyTruckBoss is the clearest example: 200+ users across five roles on " +
        "one live dataset.",
    ],
    choices: [
      { label: "Read that case study", action: { kind: "scroll", target: "#projects" } },
      { label: "Let's talk about mine", next: "handover" },
    ],
  },
  {
    id: "fit-realtime",
    lines: [
      "Real-time is the speciality — WebSocket sync and shared state across " +
        "many users at once.",
      "Including telephony call state that stays coherent through transfers, " +
        "holds and conference calls.",
    ],
    choices: [
      { label: "Show me that", action: { kind: "scroll", target: "#projects" } },
      { label: "Let's talk about mine", next: "handover" },
    ],
  },
  {
    id: "fit-crossplatform",
    lines: [
      "Web, React Native on mobile and Electron on desktop — sharing domain " +
        "logic rather than being rebuilt three times.",
    ],
    choices: [
      { label: "See the stack", action: { kind: "scroll", target: "#engineering" } },
      { label: "Let's talk about mine", next: "handover" },
    ],
  },
  {
    id: "fit-rescue",
    lines: [
      "Codebases that got slower to change with every feature, or state bugs " +
        "nobody can reproduce — that's a known shape of problem.",
      "Worth a look at the actual repo before anyone promises anything.",
    ],
    choices: [
      { label: "Let's set that up", next: "handover" },
      { label: "What's the process?", next: "process" },
    ],
  },
  {
    id: "fit-ai",
    lines: [
      "AI-assisted workflows and chat interfaces, with model output treated " +
        "as untrusted input — validated before it reaches business rules.",
      "Which is also why this assistant is a plain script, not a model.",
    ],
    choices: [
      { label: "Fair enough — let's talk", next: "handover" },
      { label: "See the stack", action: { kind: "scroll", target: "#engineering" } },
    ],
  },

  // ---- Information paths. ----
  {
    id: "services",
    lines: [
      "Seven years of production work: SaaS and business platforms, " +
        "real-time apps, React and Next.js builds, mobile and desktop, and " +
        "AI-assisted features.",
    ],
    choices: [
      { label: "See all of it", action: { kind: "scroll", target: "#services" } },
      { label: "I have a project", next: "project-type" },
      { label: "Talk to Gireesh", next: "handover" },
    ],
  },
  {
    id: "work",
    lines: [
      "Three case studies on this page: a construction operations platform, " +
        "a browser-based phone system, and a remote patient monitoring " +
        "portal.",
      "There's also a PDF with all of it in one place.",
    ],
    choices: [
      { label: "Open the case studies", action: { kind: "scroll", target: "#projects" } },
      { label: "Download the PDF", action: { kind: "download" } },
      { label: "Talk to Gireesh", next: "handover" },
    ],
  },
  {
    id: "process",
    lines: [
      "Understand, plan, build, validate, improve — architecture and " +
        "trade-offs agreed before code, and edge cases and permissions " +
        "tested, not just the happy path.",
    ],
    choices: [
      { label: "See the detail", action: { kind: "scroll", target: "#engineering" } },
      { label: "Talk to Gireesh", next: "handover" },
    ],
  },
  {
    id: "commercials",
    lines: [
      "Those depend on the scope and the timeline, so I'd rather not guess " +
        "at a number here.",
      "Send over what you need and Gireesh will come back with both.",
    ],
    choices: [
      { label: "OK — how do I reach him?", next: "handover" },
      { label: "Let me describe the project first", next: "project-type" },
    ],
  },

  // ---- Handover. Every path lands here. ----
  {
    id: "handover",
    lines: ["Pick whichever is easiest — all three reach him directly."],
    choices: [
      {
        label: "WhatsApp",
        action: {
          kind: "whatsapp",
          prefill:
            "Hi Gireesh — I found your portfolio and I'd like to discuss a project.",
        },
      },
      {
        label: "Email",
        action: {
          kind: "email",
          subject: "Project enquiry",
          body:
            "Hi Gireesh,\n\nI found your portfolio and I'd like to discuss a " +
            "project.\n\nWhat we need:\n\nTimeline:\n\n",
        },
      },
      {
        label: "Use the contact form",
        action: { kind: "scroll", target: "#contacts" },
      },
    ],
  },
];
