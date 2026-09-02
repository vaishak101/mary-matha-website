import fs from "node:fs";
import path from "node:path";

/* ------------------------------------------------------------------ *
 * Content layer. TinaCMS edits these JSON files (git-backed); the
 * public site reads them directly with `fs` at build time — no Tina
 * runtime, no client bundle, nothing to hydrate.
 * ------------------------------------------------------------------ */

const CONTENT_DIR = path.join(process.cwd(), "content");

export type GalleryImage = {
  image: string;
  alt: string;
};

export type FeaturedProperty = {
  _slug: string;
  title: string;
  tag?: string;
  description: string;
  price: string;
  areaSqft: number;
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  locality: string;
  possession?: string;
  facing?: string;
  gallery: GalleryImage[];
  featured?: boolean;
  order?: number;
};

export type OngoingProject = {
  _slug: string;
  title: string;
  description: string;
  location: string;
  projectType: string;
  percentComplete?: number;
  expectedCompletion?: string;
  gallery: GalleryImage[];
  videoUrl?: string;
  order?: number;
};

export type CompletedProject = {
  _slug: string;
  title: string;
  description: string;
  location: string;
  projectType: string;
  completedYear: number;
  durationMonths?: number;
  gallery: GalleryImage[];
  videoUrl?: string;
  order?: number;
};

export type Stat = {
  value: string;
  label: string;
};

export type Testimonial = {
  _slug: string;
  quote: string;
  name: string;
  location: string;
  service: string;
  order?: number;
};

function readCollection<T>(dir: string): (T & { _slug: string })[] {
  const full = path.join(CONTENT_DIR, dir);
  let files: string[] = [];
  try {
    files = fs.readdirSync(full).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const data = JSON.parse(raw) as T;
      return { ...data, _slug: file.replace(/\.json$/, "") };
    })
    .sort(byOrderThenSlug);
}

function byOrderThenSlug(
  a: { order?: number; _slug: string },
  b: { order?: number; _slug: string },
) {
  const ao = a.order ?? Number.MAX_SAFE_INTEGER;
  const bo = b.order ?? Number.MAX_SAFE_INTEGER;
  if (ao !== bo) return ao - bo;
  return a._slug.localeCompare(b._slug);
}

function readSingleton<T>(file: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getFeaturedProperties(): FeaturedProperty[] {
  const all = readCollection<FeaturedProperty>("featured-properties");
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : all;
}

export function getOngoingProjects(): OngoingProject[] {
  return readCollection<OngoingProject>("ongoing-projects");
}

export function getCompletedProjects(): CompletedProject[] {
  return readCollection<CompletedProject>("completed-projects").sort(
    (a, b) => (b.completedYear ?? 0) - (a.completedYear ?? 0),
  );
}

export function getStats(): Stat[] {
  return readSingleton<{ items: Stat[] }>("stats/stats.json", { items: [] }).items;
}

export function getTestimonials(): Testimonial[] {
  return readCollection<Testimonial>("testimonials");
}
