import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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
    title: "Gireesh Singh — Senior Full-Stack Developer",
    description:
      "7+ years building web, mobile and desktop applications — strong frontend and strong backend engineering, from telephony to healthcare platforms.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
