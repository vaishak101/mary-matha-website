import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { isSitePublished } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  if (!isSitePublished()) {
    // Site not live yet — keep the "coming soon" page out of search.
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/preview"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
