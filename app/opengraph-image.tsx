import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.legalName}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #3a0a12 0%, #4a0d16 55%, #3a0a12 100%)",
          color: "#f7efdd",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "#e0c176",
          }}
        >
          {`${SITE.region} · Est. ${SITE.established}`}
        </div>
        <div
          style={{
            fontSize: 132,
            letterSpacing: 18,
            marginTop: 26,
            marginBottom: 8,
          }}
        >
          MARY MATHA
        </div>
        <div style={{ width: 420, height: 2, background: "#c29a43" }} />
        <div
          style={{
            fontSize: 40,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#e0c176",
            marginTop: 22,
          }}
        >
          Real Estate &amp; Construction
        </div>
      </div>
    ),
    size,
  );
}
