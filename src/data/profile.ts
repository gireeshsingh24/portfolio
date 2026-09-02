import type { Profile } from "@/features/about/types";

export const profile: Profile = {
  name: "Gireesh Singh",
  role: "Senior Full-Stack Developer",
  eyebrow: "Full-Stack Developer · 7+ Years",
  // "Applications" rather than "web apps": the work spans web, mobile and
  // desktop, and narrowing it to web understates the platforms shipped.
  headline: "I build applications businesses rely on.",
  // Searchable technology names rather than adjectives, now spanning the
  // three platforms shipped: web, mobile and desktop.
  specialisation: "Web · Mobile · Desktop · Real-Time",
  greeting: "Hello",
  intro: "I'm Gireesh",
  about:
    "I build real-time web applications — the kind where state has to stay " +
    "correct across many users at once. Recent work includes an operations " +
    "platform running 100+ trucks across multiple sites, a browser-based " +
    "phone system handling conference calls and live transfers, and a " +
    "healthcare portal where clinicians call patients while their health data " +
    "streams onto the same screen. Seven years across React, Next.js and " +
    "TypeScript on the frontend, and Node.js, NestJS and PostgreSQL on the " +
    "backend — shipped to web, mobile and desktop.",
  resumeUrl: "/resume.pdf",
  avatar: {
    src: "/images/avatar.svg",
    alt: "Portrait of Gireesh Singh",
  },

  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "Electron.js",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "WebSockets",
    "Tailwind CSS",
  ],
  services: [
    { id: "frontend", title: "Frontend Architecture", icon: "code" },
    { id: "realtime", title: "Real-Time Systems", icon: "mobile" },
    { id: "fullstack", title: "Full Stack Development", icon: "cloud" },
  ],

  stats: [
    { id: "experience", value: "7", suffix: "+", label: "Years of experience" },
    { id: "features", value: "100", suffix: "+", label: "Features & modules shipped" },
    { id: "scale", value: "200", suffix: "+", label: "Users on a live platform" },
  ],
  socials: [
    {
      id: "mail",
      label: "Email",
      href: "mailto:gireesh.rajput786@gmail.com",
      icon: "mail",
    },
    { id: "github", label: "GitHub", href: "https://github.com/", icon: "github" },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/gireesh-singh-293b83147",
      icon: "linkedin",
    },
  ],
};
