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

export type SiteSettings = {
  published: boolean;
  comingSoon: {
    headline: string;
    message: string;
    showContact: boolean;
  };
};

const SITE_SETTINGS_FALLBACK: SiteSettings = {
  published: false,
  comingSoon: {
    headline: "Our new website is launching soon",
    message:
      "We're putting the finishing touches on it. In the meantime we're open for business — call or message us.",
    showContact: true,
  },
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

export function getSiteSettings(): SiteSettings {
  const raw = readSingleton<Partial<SiteSettings>>(
    "settings/site.json",
    SITE_SETTINGS_FALLBACK,
  );
  return {
    published: raw.published === true,
    comingSoon: { ...SITE_SETTINGS_FALLBACK.comingSoon, ...raw.comingSoon },
  };
}

/**
 * Whether the public site is live. The client controls this with the
 * "Website is LIVE" switch in the CMS — and it behaves the same in dev,
 * production and preview builds, so what you test is what ships.
 *
 * - `/preview` ignores this entirely and always renders the full site.
 * - `NEXT_PUBLIC_SITE_LIVE=true|false` force-overrides the switch (set `true`
 *   on Vercel's Preview environment so preview deployments show the real site).
 */
export function isSitePublished(): boolean {
  if (process.env.NEXT_PUBLIC_SITE_LIVE === "true") return true;
  if (process.env.NEXT_PUBLIC_SITE_LIVE === "false") return false;
  return getSiteSettings().published;
}
