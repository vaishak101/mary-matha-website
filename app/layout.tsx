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
    default: `${SITE.name} - 1, 2 & 3 BHK Flats in Vasai, Virar & Nalasopara`,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "1 BHK flat Vasai",
    "2 BHK flat Vasai",
    "3 BHK flat Vasai",
    "1 BHK flat for rent Vasai",
    "2 BHK flat for rent Vasai",
    "flat for rent Virar",
    "flat for rent Nalasopara",
    "new residential projects Vasai Virar",
    "interior design Vasai",
    "civil contractor Vasai Virar Nalasopara",
    "buy flat Vasai",
    "Vasai real estate",
    "MahaRERA builder",
  ],
  authors: [{ name: SITE.name }],
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} - Flats in Vasai, Virar & Nalasopara`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - Flats in Vasai, Virar & Nalasopara`,
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
