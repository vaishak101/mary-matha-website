import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { isSitePublished } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSitePublished()) return [];

  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
