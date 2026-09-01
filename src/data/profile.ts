import type { Profile } from "@/features/about/types";

export const profile: Profile = {
  name: "Gireesh Singh",
  role: "Senior Frontend Developer",
  greeting: "Hello",
  intro: "I'm Gireesh",
  about:
    "I build real-time web applications — the kind where state has to stay " +
    "correct across many users at once. Recent work includes an operations " +
    "platform running 100+ trucks across multiple sites, a browser-based " +
    "phone system handling conference calls and live transfers, and a " +
    "healthcare portal where clinicians call patients while their health data " +
    "streams onto the same screen. Six years across React, Next.js and " +
    "TypeScript, now working full stack with Node.js and MongoDB.",
  resumeUrl: "/resume.pdf",
  avatar: {
    src: "/images/avatar.svg",
    alt: "Portrait of Gireesh Singh",
  },

  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "Redux Toolkit",
    "TanStack Query",
    "WebSockets",
    "Node.js",
    "MongoDB",
  ],

  services: [
    { id: "frontend", title: "Frontend Architecture", icon: "code" },
    { id: "realtime", title: "Real-Time Systems", icon: "mobile" },
    { id: "fullstack", title: "Full Stack Development", icon: "cloud" },
  ],

  stats: [
    { id: "experience", value: "7", suffix: "+", label: "Years of experience" },
    { id: "projects", value: "100", suffix: "+", label: "Applications delivered" },
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
