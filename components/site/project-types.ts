import type { GalleryImage } from "@/lib/content";

export type ProjectView = {
  slug: string;
  kind: "ongoing" | "completed";
  title: string;
  /** Card badge, e.g. "In progress · 60%" or "Delivered 2024". */
  badge: string;
  /** Modal status line, e.g. "Ongoing · 60% complete · handover May 2026". */
  statusLine: string;
  /** "G+2 bungalow · Vasai West" */
  meta: string;
  description: string;
  gallery: GalleryImage[];
  videoUrl?: string;
};
