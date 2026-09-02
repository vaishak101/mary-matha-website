import { Carousel } from "./Carousel";
import { ArrowRight } from "./icons";
import type { FeaturedProperty } from "@/lib/content";

function specChips(p: FeaturedProperty): string[] {
  const candidates = [
    `${p.areaSqft.toLocaleString("en-IN")} sq ft`,
    p.bedrooms ? `${p.bedrooms} Bed` : null,
    p.bathrooms ? `${p.bathrooms} Bath` : null,
    p.locality,
    !p.bedrooms ? p.propertyType : null,
    p.possession,
  ].filter(Boolean) as string[];
  return [...new Set(candidates)].slice(0, 4);
}

export function PropertyCard({ property }: { property: FeaturedProperty }) {
  const chips = specChips(property);

  return (
    <article className="flex h-full flex-col border border-line bg-cream-panel">
      <Carousel
        images={property.gallery}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
        overlay={
          property.tag ? (
            <span className="absolute left-3 top-3 bg-maroon px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-gold-light">
              {property.tag}
            </span>
          ) : null
        }
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2.5">
          <h3
            className="text-ink"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem" }}
          >
            {property.title}
          </h3>
          <p
            className="tnum whitespace-nowrap text-maroon"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.3125rem" }}
          >
            {property.price}
          </p>
        </div>

        <p className="mt-2.5 mb-4 text-[0.875rem] leading-relaxed text-ink-soft">
          {property.description}
        </p>

        <div
          className={`mt-auto mb-4 grid border-l border-t border-line ${
            chips.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {chips.map((chip) => (
            <span
              key={chip}
              className="border-b border-r border-line px-2 py-2 text-center font-mono text-[11.5px] uppercase tracking-[0.06em] text-maroon [&:last-child:nth-child(odd)]:col-span-2"
            >
              {chip}
            </span>
          ))}
        </div>

        <a
          href="#contact"
          className="btn btn-primary w-full rounded-none"
          aria-label={`Enquire about ${property.title} in ${property.locality}`}
        >
          Enquire about this
          <ArrowRight width={16} height={16} />
        </a>
      </div>
    </article>
  );
}
