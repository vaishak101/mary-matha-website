import { Reveal } from "./Reveal";
import { Kicker } from "./Kicker";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { SITE } from "@/lib/site";
import { getTestimonials } from "@/lib/content";

export function Testimonials() {
  const testimonials = getTestimonials();

  return (
    <section id="testimonials" className="section container-x">
      <div className="wrap">
        <Reveal className="mb-[clamp(2rem,5vw,2.5rem)] text-center">
          <Kicker>In their words</Kicker>
        </Reveal>

        {testimonials.length > 0 ? (
          <Reveal>
            <TestimonialCarousel items={testimonials} />
          </Reveal>
        ) : (
          <Reveal className="mx-auto max-w-[46rem] border border-dashed border-line-strong bg-cream-alt px-6 py-12 text-center">
            <p className="text-[0.9375rem] text-ink-soft">
              Reviews from the families we&rsquo;ve worked with will appear here.
            </p>
          </Reveal>
        )}

        <Reveal className="mx-auto mt-[clamp(2.75rem,7vw,4rem)] max-w-[46rem] border-t border-line pt-[clamp(2rem,5vw,3rem)] text-center">
          <p className="kicker">Areas we serve</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {SITE.areasServed.map((area) => (
              <span
                key={area}
                className="border border-line-strong px-4 py-2 text-sm text-ink-soft"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
              >
                {area}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
