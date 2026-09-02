import type { Project } from "@/features/projects/types";

/**
 * Work drawn from the case-study documents.
 *
 * Products are named as they appear in the case-study banners, which carry each
 * product's own branding. Scale figures and technical detail are accurate and
 * drawn from the source documents; no proprietary internals or customer data are
 * disclosed.
 *
 * No public repository or demo exists for any of these, so `githubUrl` and
 * `liveUrl` are null and the UI hides those links rather than rendering dead
 * ones.
 *
 * NOTE: confirm with each employer before publishing. The RPM work is
 * healthcare and may carry NDA or patient-privacy terms.
 */
export const projects: readonly Project[] = [
  {
    slug: "mytruckboss",
    title: "MyTruckBoss",
    description:
      "Real-time operations platform that replaced paper ticketing for " +
      "dump-truck and sitework contractors — 100+ trucks and 200+ users " +
      "across multiple construction sites, with truck availability and " +
      "ticket status synchronised live across five user roles.",
    tags: [
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query",
      "WebSockets",
    ],
    githubUrl: null,
    liveUrl: null,
    image: {
      src: "/images/projects/mytruckboss.webp",
      alt: "MyTruckBoss digital truck ticketing platform",
    },
    featured: true,
    order: 1,
    caseStudy: {
      tagline: "Real-time construction & truck management platform",
      overview:
        "A digital ticketing and operations platform for dump-truck and " +
        "sitework contractors, replacing paper ticket tracking with a " +
        "centralised workflow for trucks, loads, tickets, drivers, payments " +
        "and site operations across multiple construction sites.",
      challenge: {
        summary:
          "Contractors tracked trucks by load or by hour on paper. " +
          "Coordinating multiple sites took significant manpower, and no one " +
          "had a shared view of what was actually happening on the ground.",
        points: [
          "Managers could not see which trucks were available or already assigned",
          "Material requirements and delivered quantities were tracked manually",
          "Pending ticket status was invisible until paperwork caught up",
          "Accounting had no timely visibility into tickets or payments",
          "Teams fell out of sync because information was never centralised",
        ],
      },
      role: {
        title: "Senior Frontend Developer",
        summary:
          "I designed and implemented the frontend application and its " +
          "supporting data architecture, working against a separately built " +
          "Python/Django backend.",
        responsibilities: [
          "Frontend architecture and reusable component system",
          "Redux state architecture for complex operational workflows",
          "TanStack Query data layer and backend API integration",
          "WebSocket-based real-time synchronisation",
          "Dashboards, operational views and analytics",
          "Role-specific experiences for five distinct user types",
          "Forms, validation and responsive interfaces",
        ],
      },
      highlights: [
        {
          title: "Real-time synchronisation",
          body:
            "When a truck becomes available, that state propagates to every " +
            "connected user immediately — a manager sees it and can assign it " +
            "to a load without refreshing. Ticket updates flow the same way, " +
            "so administrators watch status change as managers work. The " +
            "result is one synchronised view shared by administrators, " +
            "managers, truck operators and site supervisors.",
        },
        {
          title: "Role-based operational views",
          body:
            "Admin, Manager, Truck Operator, Site Supervisor and " +
            "accounting users each need a different slice of the same live " +
            "data. The component and state architecture treats role as a " +
            "first-class input rather than bolting on per-role conditionals.",
        },
        {
          title: "State architecture",
          body:
            "The hardest part was keeping complex business workflows correct " +
            "while operational information stayed synchronised across users " +
            "in real time — server state through TanStack Query, client and " +
            "session state through Redux Toolkit, with a clear boundary " +
            "between the two.",
        },
      ],
      stack: [
        {
          group: "Frontend",
          items: [
            "Next.js",
            "TypeScript",
            "Redux Toolkit",
            "TanStack Query",
            "Axios",
            "WebSockets",
          ],
        },
        { group: "Backend (separate team)", items: ["Python", "Django"] },
      ],
      scale: [
        { value: "100+", label: "Trucks managed" },
        { value: "200+", label: "Platform users" },
        { value: "5", label: "User roles" },
      ],
      outcome:
        "Digitised a workflow that ran on paper tickets and manual " +
        "coordination. Centralising truck, ticket, material, driver and " +
        "payment data gave construction teams a shared real-time view and cut " +
        "the effort of keeping multiple sites in sync.",
    },
  },
  {
    slug: "ihs-phone",
    title: "IHS Phone",
    description:
      "Browser-based business phone system covering calling, messaging, fax " +
      "and voicemail across multiple extensions on a single business number. " +
      "The hard part was call state — conference calls, blind and attended " +
      "transfers, hold and several simultaneous calls staying coherent.",
    tags: ["React", "TypeScript", "SIP.js", "FreeSWITCH", "WebSockets"],
    githubUrl: null,
    liveUrl: null,
    image: {
      src: "/images/projects/ihs-phone.webp",
      alt: "IHS Phone business communication platform",
    },
    featured: true,
    order: 2,
    caseStudy: {
      tagline: "Real-time business communication platform",
      overview:
        "A unified communication platform for businesses, call centres, " +
        "insurance organisations and private nursing companies. It provides " +
        "internet-based calling alongside messaging, fax, voicemail and call " +
        "management, letting an organisation run one business number with " +
        "many extensions so employees share a number while keeping their own.",
      challenge: {
        summary:
          "Traditional phone systems get unmanageable when many employees " +
          "share a business number but each need their own extension and call " +
          "workflow. The application had to deliver a modern web experience " +
          "while supporting professional telephony behaviour end to end.",
        points: [
          "Conference calls with multiple participants",
          "Blind transfers — hand a live call straight to another extension",
          "Attended transfers — speak to the receiving extension first",
          "Multiple simultaneous calls, placed or received while one is active",
          "Call hold across all of the above",
          "Multiple extensions under one business number",
          "Messaging, fax, voicemail and real-time call history",
        ],
      },
      role: {
        title: "Frontend Developer — architecture, functionality & real-time",
        summary:
          "I built the frontend application, the application-side " +
          "functionality and the real-time synchronisation layer. The backend " +
          "was implemented separately.",
        responsibilities: [
          "Frontend architecture and reusable UI component system",
          "Complete application interface implementation",
          "API integration and application functionality",
          "WebSocket-based real-time synchronisation",
          "Managing complex communication state",
          "Call management, messaging, fax and voicemail interfaces",
          "Call history, dashboards and analytics",
          "Forms, validation and responsive UI",
        ],
      },
      highlights: [
        {
          title: "Advanced calling workflows",
          body:
            "Supporting real telephony rather than basic one-to-one calling " +
            "was the core difficulty. A user can join several participants " +
            "into a conference, transfer a live call blind or attended, place " +
            "a caller on hold to take another, and move between simultaneous " +
            "calls — each of which mutates call state in a different way.",
        },
        {
          title: "Call state management",
          body:
            "Active calls, multiple concurrent calls, conferences, transfers, " +
            "holds and inbound real-time updates all had to stay coherent in " +
            "one interface. The state model had to make illegal combinations " +
            "unrepresentable rather than defending against them case by case.",
        },
        {
          title: "Real-time synchronisation",
          body:
            "WebSocket synchronisation keeps call information and " +
            "communication history current across the application, so users " +
            "never refresh to see the state of their own phone system.",
        },
      ],
      stack: [
        {
          group: "Frontend",
          items: [
            "React",
            "Vite",
            "TypeScript",
            "Redux Toolkit",
            "TanStack Query",
            "Axios",
            "WebSockets",
          ],
        },
        {
          group: "Communications",
          items: ["SIP.js", "FreeSWITCH", "Bandwidth telephony"],
        },
      ],
      outcome:
        "Gave organisations a centralised software phone system in place of " +
        "physical handsets — multiple extensions under a shared business " +
        "number, with calling, messaging, fax, voicemail and history in one " +
        "unified workflow.",
    },
  },
  {
    slug: "rpm-platform",
    title: "Remote Patient Monitoring",
    description:
      "Healthcare platform where clinicians monitor patients remotely. Built " +
      "the in-portal VOIP module so a call runs alongside live patient health " +
      "data on the same screen, plus secure clinical messaging, " +
      "documentation, and shift-based billing and payroll for nursing staff.",
    tags: ["React", "TypeScript", "SIP.js", "WebRTC", "REST API"],
    githubUrl: null,
    liveUrl: null,
    image: {
      src: "/images/projects/rpm-platform.webp",
      alt: "Remote patient monitoring healthcare platform",
    },
    featured: true,
    order: 3,
    caseStudy: {
      tagline: "Remote patient monitoring platform",
      overview:
        "A platform for clinicians monitoring patients remotely, combining " +
        "live health data, in-portal voice calls, clinical messaging and " +
        "documentation, and the billing and payroll workflows that nursing " +
        "staff depend on.",
      challenge: {
        summary:
          "Clinical staff were switching between a phone, a monitoring " +
          "dashboard and a notes system during a single patient interaction. " +
          "Context was lost at every switch, and healthcare data carries " +
          "constraints ordinary business software does not.",
        points: [
          "Calling a patient meant leaving the screen showing their vitals",
          "Clinical notes and messages lived apart from the monitoring data",
          "Nursing compensation is shift-based and was tracked separately",
          "Patient data demands strict handling and access control",
        ],
      },
      role: {
        title: "Senior Frontend Developer",
        summary:
          "I built the in-portal VOIP module and the surrounding clinical " +
          "workflows, integrating with a separately built backend.",
        responsibilities: [
          "In-portal VOIP calling alongside live patient data",
          "Secure clinical messaging interfaces",
          "Clinical documentation and patient history views",
          "Shift-based billing and payroll workflows for nursing staff",
          "Real-time health data presentation",
          "API integration and application state",
        ],
      },
      highlights: [
        {
          title: "Calls and clinical data on one screen",
          body:
            "The core of the work: a clinician starts a call from inside the " +
            "portal and the patient's vitals, alerts and medication list stay " +
            "visible throughout. No window switching during a clinical " +
            "conversation, which is where context gets lost.",
        },
        {
          title: "Clinical workflows",
          body:
            "Messaging, documentation and patient history are part of the " +
            "same surface as monitoring, so what a clinician observes and " +
            "what they record do not live in separate systems.",
        },
        {
          title: "Operational workflows",
          body:
            "Nursing staff are paid by shift, so billing and payroll were " +
            "built into the platform rather than handled outside it — the " +
            "same data serving both clinical and operational needs.",
        },
      ],
      stack: [
        {
          group: "Frontend",
          items: ["React", "TypeScript", "SIP.js", "WebRTC", "REST APIs"],
        },
        { group: "Backend (separate team)", items: ["Python", "Django"] },
      ],
      outcome:
        "Gave clinicians a single place to monitor, call, message and " +
        "document, and gave the organisation shift-based billing and payroll " +
        "in the same system.",
    },
  },
  {
    slug: "web-app-suite",
    title: "Client Web Application Suite",
    description:
      "Production applications delivered across two agencies with React and " +
      "Next.js on Agile cycles, with full cross-browser support. Included API " +
      "integration work that cut data-sync response time by 40%, and peer " +
      "code review that reduced bug resolution time by 25%.",
    tags: ["Next.js", "React", "TypeScript", "SASS", "Agile"],
    githubUrl: null,
    liveUrl: null,
    image: {
      src: "/images/projects/web-suite.svg",
      alt: "Client web application suite",
    },
    featured: false,
    order: 4,
  },
];
