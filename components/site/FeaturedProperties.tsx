import { Reveal } from "./Reveal";
import { Kicker } from "./Kicker";
import { PropertyCard } from "./PropertyCard";
import { ArrowRight } from "./icons";
import { getFeaturedProperties } from "@/lib/content";

export function FeaturedProperties() {
  const properties = getFeaturedProperties();

  return (
    <section id="properties" className="section container-x bg-cream-alt">
      <div className="wrap">
        <Reveal className="mb-[clamp(1.875rem,5vw,3.25rem)] flex flex-wrap items-end justify-between gap-3">
          <div>
            <Kicker align="left">Available now</Kicker>
            <h2 className="h-sec mt-2.5">Featured Properties</h2>
          </div>
          <a
            href="#contact"
            className="flex items-center gap-1.5 border-b border-gold pb-1 text-sm text-maroon"
          >
            Looking for something else? <ArrowRight width={15} height={15} />
          </a>
        </Reveal>

        {properties.length > 0 ? (
          <div className="grid gap-[clamp(1.125rem,2.5vw,1.75rem)] sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, i) => (
              <Reveal key={property._slug} delay={i * 90} className="h-full">
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="hatch border border-line-strong">
            <div className="bg-cream-panel/95 px-6 py-14 text-center">
              <p
                className="mx-auto mb-2 text-maroon"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}
              >
                No properties listed right now
              </p>
              <p className="mx-auto mb-5 max-w-[26rem] text-[0.9375rem] text-ink-soft">
                New listings are added regularly. Tell us what you&rsquo;re
                looking for and we&rsquo;ll call the moment something matches.
              </p>
              <a href="#contact" className="btn btn-primary rounded-none">
                Register your requirement
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
