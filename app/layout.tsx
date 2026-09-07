import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { DM_Serif_Display, Spectral } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif-display",
});

const spectral = Spectral({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-spectral",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Real Estate & Construction in Vasai–Virar`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Vasai real estate",
    "Virar construction",
    "buy flat Vasai",
    "build home Vasai-Virar",
    "home renovation Nalasopara",
    "MahaRERA builder",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Real Estate & Construction`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Real Estate & Construction`,
    description: SITE.description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#6b1120",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${spectral.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
