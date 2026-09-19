import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { siteUrl } from "@/lib/env";
import "./globals.css";

/**
 * Poppins is a close match to the reference design's headings. Confirm against
 * the original before treating this as final.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Without this, every relative metadata URL below resolves against
  // http://localhost:3000 and `next build` warns. Vercel happens to infer the
  // deployment URL in production, but that inference does not apply to
  // previews built elsewhere, to self-hosting, or to a local build — so the
  // origin is stated once, from the same validated env value the rest of the
  // app uses.
  metadataBase: new URL(siteUrl),
  alternates: {
    // A portfolio accumulates inbound links carrying UTM and referral query
    // strings. Without a canonical, each variant is a separate URL to a search
    // engine and the ranking signal is split across them.
    canonical: "/",
  },
  title: {
    default: "Gireesh Singh — Senior Full-Stack Developer",
    template: "%s | Gireesh Singh",
  },
  // Kept under ~160 characters so search results do not truncate it, while
  // still carrying the terms people actually search: the role, the years, and
  // the framework and runtime names.
  description:
    "Senior Full-Stack Developer, 7+ years. Web, mobile and desktop apps in " +
    "React, Next.js, React Native, Electron, Node.js and PostgreSQL.",
  keywords: [
    "Senior Full-Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "React Native",
    "Electron.js",
    "Desktop App Developer",
    "Mobile App Developer",
    "WebRTC",
    "VOIP",
    "Surat",
    "India",
  ],
  authors: [{ name: "Gireesh Singh" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Gireesh Singh",
    title: "Gireesh Singh — Senior Full-Stack Developer",
    description:
      "7+ years building web, mobile and desktop applications — strong frontend and strong backend engineering, from telephony to healthcare platforms.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {/*
         * Skip link. The header carries five nav links before the page's own
         * content, so a keyboard or screen-reader user otherwise tabs through
         * all of them on every visit. Visually hidden until focused, which is
         * exactly when it is needed.
         */}
        <a
          href="#main"
          className="sr-only rounded-md bg-accent px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
