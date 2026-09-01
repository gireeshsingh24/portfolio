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
    default: "Gireesh Singh — Senior Frontend Developer",
    template: "%s | Gireesh Singh",
  },
  description:
    "Senior Frontend Developer with 6+ years building real-time web applications in React, Next.js and TypeScript — from multi-site operations platforms to browser-based telephony and healthcare portals.",
  keywords: [
    "Senior Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Full Stack Developer",
    "WebRTC",
    "VOIP",
    "Surat",
    "India",
  ],
  authors: [{ name: "Gireesh Singh" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Gireesh Singh — Senior Frontend Developer",
    description:
      "6+ years building real-time web applications in React, Next.js and TypeScript — including VOIP and healthcare platforms.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
