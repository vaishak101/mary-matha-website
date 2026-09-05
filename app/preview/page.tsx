import type { Metadata } from "next";
import { SiteHome } from "@/components/site/SiteHome";

/**
 * The finished site, always rendered regardless of the "Website is LIVE"
 * switch — so the client can review everything on the real domain before
 * flipping it on. Not linked anywhere, not in the sitemap, not indexed.
 */
export const metadata: Metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return <SiteHome />;
}
