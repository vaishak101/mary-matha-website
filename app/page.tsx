import type { Metadata } from "next";
import { SiteHome } from "@/components/site/SiteHome";
import { ComingSoon } from "@/components/site/ComingSoon";
import { getSiteSettings, isSitePublished } from "@/lib/content";

export function generateMetadata(): Metadata {
  if (isSitePublished()) return {};
  return {
    title: "Launching soon",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  if (!isSitePublished()) {
    return <ComingSoon {...getSiteSettings().comingSoon} />;
  }
  return <SiteHome />;
}
