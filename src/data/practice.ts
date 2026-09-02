import type {
  Capability,
  ProcessStep,
  ServiceOffering,
  StackGroup,
} from "@/features/about/types";

/**
 * Services, capabilities, stack and process.
 *
 * Every claim here is backed by work in `projects.ts` or by the CV. The
 * `evidence` field on each capability names the project slugs that demonstrate
 * it, so nothing is asserted that cannot be discussed in an interview (§60).
 */

/** §45 — framed by the problem a client recognises, not by technology. */
export const services: readonly ServiceOffering[] = [
  {
    id: "saas",
    title: "SaaS Applications",
    summary:
      "Multi-role SaaS platforms, dashboards, subscription products and " +
      "internal business tools built to survive real operational use.",
    problems: [
      "Multiple user roles needing different views of the same data",
      "Operational workflows that outgrew spreadsheets",
      "Dashboards that must stay correct under concurrent edits",
    ],
    icon: "layers",
  },
  {
    id: "realtime",
    title: "Real-Time Web Applications",
    summary:
      "Live dashboards, notifications and synchronised state over WebSockets " +
      "— where being stale by ten seconds is a business problem.",
    problems: [
      "Users refreshing to find out what changed",
      "Two people acting on the same record at once",
      "Call, ticket or job state drifting between clients",
    ],
    icon: "spark",
  },
  {
    id: "react-next",
    title: "React & Next.js Applications",
    summary:
      "Production React and Next.js builds with TypeScript, sane state " +
      "ownership and an architecture the next developer can follow.",
    problems: [
      "A codebase that slows down with every feature",
      "Server and client state tangled together",
      "No clear boundary between UI and business rules",
    ],
    icon: "code",
  },
  {
    id: "business-platforms",
    title: "Business Platforms",
    summary:
      "Workflow-heavy applications with multiple roles, permissions and " +
      "operational processes that mirror how the business actually runs.",
    problems: [
      "Paper or manual processes that need digitising",
      "Permission rules scattered through the UI",
      "Multi-site or multi-team coordination",
    ],
    icon: "cloud",
  },
  {
    id: "complex-frontend",
    title: "Complex Frontend Systems",
    summary:
      "Large applications with heavy state, live data, many integrations and " +
      "workflows that cannot be modelled as simple CRUD.",
    problems: [
      "State bugs nobody can reproduce",
      "Slow, janky interfaces under real data volumes",
      "Integration logic leaking into components",
    ],
    icon: "gauge",
  },
  {
    id: "ai",
    title: "AI-Powered Applications",
    summary:
      "AI-assisted workflows and chat interfaces, with model output treated " +
      "as untrusted input — validated before it reaches business rules.",
    problems: [
      "AI features that break on unexpected model output",
      "Chat interfaces needing streaming and conversation state",
      "Deciding where AI genuinely beats a deterministic solution",
    ],
    icon: "mobile",
  },
];

/** §50 — each capability names the projects that prove it. */
export const capabilities: readonly Capability[] = [
  {
    id: "frontend-architecture",
    title: "Frontend Architecture",
    body:
      "Maintainable React and Next.js structure: reusable components, clear " +
      "state ownership, and boundaries that keep business rules out of the " +
      "view layer.",
    evidence: ["mytruckboss", "ihs-phone"],
  },
  {
    id: "state-management",
    title: "State Management",
    body:
      "Redux Toolkit for client and session state, TanStack Query for server " +
      "state, and an explicit boundary between them — the distinction most " +
      "large React codebases get wrong.",
    evidence: ["mytruckboss"],
  },
  {
    id: "realtime",
    title: "Real-Time Systems",
    body:
      "WebSocket synchronisation, live updates and shared state across many " +
      "concurrent users, including telephony call state that has to stay " +
      "coherent through transfers, holds and conferences.",
    evidence: ["ihs-phone", "mytruckboss"],
  },
  {
    id: "api-integration",
    title: "API Integration",
    body:
      "Reliable API communication: validation, error states, loading and " +
      "empty states, caching, and integration logic kept out of components.",
    evidence: ["mytruckboss", "rpm-platform"],
  },
  {
    id: "business-workflows",
    title: "Complex Business Workflows",
    body:
      "Turning operational processes into role-aware application flows — " +
      "five distinct roles reading one live dataset, each with a different " +
      "job to do.",
    evidence: ["mytruckboss", "rpm-platform"],
  },
  {
    id: "production",
    title: "Production Engineering",
    body:
      "Security, failure handling, accessibility and maintainability treated " +
      "as part of the feature rather than a later pass.",
    evidence: ["ihs-phone", "rpm-platform"],
  },
];

/** §51 — grouped, not a logo wall. Only technologies used in production. */
export const stackGroups: readonly StackGroup[] = [
  {
    id: "core",
    label: "Core",
    items: ["JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    id: "architecture",
    label: "Frontend Architecture",
    items: ["Redux Toolkit", "TanStack Query", "React Hook Form", "Zod"],
  },
  {
    id: "ui",
    label: "UI",
    items: ["Tailwind CSS", "Framer Motion", "Lucide React", "SASS"],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "NestJS", "Express.js", "Django"],
  },
  {
    id: "data",
    label: "Data",
    items: ["PostgreSQL", "Prisma", "MongoDB"],
  },
  {
    id: "integration",
    label: "Integration",
    items: ["REST APIs", "WebSockets", "Axios", "SIP.js", "FreeSWITCH"],
  },
  {
    id: "ai",
    label: "AI",
    items: ["OpenAI API", "AI chat interfaces", "LLM integration patterns"],
  },
];

/** §52 — how the work actually runs. */
export const processSteps: readonly ProcessStep[] = [
  {
    id: "understand",
    number: "01",
    title: "Understand",
    body:
      "The business problem, the users, the workflow around the feature, the " +
      "constraints, and what success actually looks like.",
  },
  {
    id: "plan",
    number: "02",
    title: "Plan",
    body:
      "Architecture, data flow, risks and dependencies agreed before code — " +
      "the cheapest place to fix a wrong decision.",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    body:
      "Modular, typed, reviewable implementation that follows the existing " +
      "conventions of the codebase rather than my personal preferences.",
  },
  {
    id: "validate",
    number: "04",
    title: "Validate",
    body:
      "Edge cases, permissions, concurrent access, failure paths and " +
      "integrations — not just the happy path.",
  },
  {
    id: "improve",
    number: "05",
    title: "Improve",
    body:
      "Measure first, then optimise the actual bottleneck. No guess-driven " +
      "performance work.",
  },
];
