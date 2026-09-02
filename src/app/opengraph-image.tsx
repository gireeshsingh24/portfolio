import { ImageResponse } from "next/og";
import { getProfile } from "@/data/repository";

/**
 * §56 — Open Graph card, generated at build time.
 *
 * Without this a shared link renders as a bare URL on LinkedIn and X, which is
 * exactly where a portfolio gets shared. Built from profile data so it cannot
 * drift out of sync with the site.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gireesh Singh — Senior React & Next.js Developer";

export default async function OpengraphImage() {
  const profile = await getProfile();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0b1220",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#f2795b",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {profile.eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
          }}
        >
          {profile.headline}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            color: "#8a94a6",
          }}
        >
          {profile.specialisation}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 30,
            fontWeight: 600,
            color: "#ffffff",
          }}
        >
          {profile.name}
        </div>
      </div>
    ),
    size,
  );
}
