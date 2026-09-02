import { Reveal } from "./Reveal";
import { Kicker } from "./Kicker";

type Craft = {
  numeral: string;
  label: string;
  heading: string;
  lead: string;
  body: string;
};

const CRAFTS: Craft[] = [
  {
    numeral: "I",
    label: "Property",
    heading: "Buy, Sell & Rent",
    lead: "One trusted desk for every property need across Vasai–Virar — and no broker games.",
    body: "Flats, plots, shops and bungalows matched to your budget and your life. We arrange the site visits, scrutinise every document, and steer the home loan, stamp duty and registration from first enquiry to the day the keys are in your hand — with nothing hidden in between.",
  },
  {
    numeral: "II",
    label: "Construction",
    heading: "Build & Renovate",
    lead: "A deliberate method: you approve the vision before a single line is built.",
    body: "New construction, whole-home renovation, repair and fine finishing. We render the expected result and revise it with you until it is exactly right, then build to that approved vision with quality materials and daily supervision on the site — straight through to handover.",
  },
];

export function Services() {
  return (
    <section id="services" className="section container-x">
      <div className="wrap">
        <Reveal className="rule-double flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pt-[18px]">
          <h2 className="h-sec">Two crafts, one trusted name</h2>
          <Kicker align="left">Our Services</Kicker>
        </Reveal>

        <div className="mt-[clamp(2.25rem,5vw,3.5rem)] grid gap-8 md:grid-cols-2 md:gap-0">
          {CRAFTS.map((craft, i) => (
            <Reveal
              key={craft.numeral}
              delay={i * 120}
              className={
                i === 1
                  ? "border-t border-line pt-8 md:border-t-0 md:border-l md:border-ink md:pl-[clamp(1.75rem,4vw,3rem)] md:pt-0"
                  : "md:pr-[clamp(1.75rem,4vw,3rem)]"
              }
            >
              <p className="kicker mb-3 text-gold">
                {craft.numeral}. {craft.label}
              </p>
              <h3 className="h-3 text-ink">{craft.heading}</h3>
              <p
                className="mt-4 mb-4 text-maroon"
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(1.0625rem, 2.4vw, 1.3125rem)",
                  lineHeight: 1.5,
                }}
              >
                {craft.lead}
              </p>
              <p className="max-w-[65ch] text-[0.9375rem] leading-[1.8] text-ink-soft">
                {craft.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
