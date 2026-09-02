import { Reveal } from "./Reveal";
import { Kicker } from "./Kicker";

type Step = {
  numeral: string;
  eyebrow: string;
  heading: string;
  body: string;
  trust?: boolean;
};

const STEPS: Step[] = [
  {
    numeral: "I",
    eyebrow: "Step one",
    heading: "Requirement gathering",
    body: "We sit with you, understand the plot, the budget and how you want to live in the space — then put it in writing.",
  },
  {
    numeral: "II",
    eyebrow: "Step two — the trust step",
    heading: "Prototype & iterate",
    body: "We show you the expected output — layouts, finishes, elevation — and change it as many times as it takes until you approve. No guesswork.",
    trust: true,
  },
  {
    numeral: "III",
    eyebrow: "Step three",
    heading: "Work begins",
    body: "Construction proceeds against the approved plan with quality materials, staged updates and personal supervision to handover.",
  },
];

export function Workflow() {
  return (
    <section id="build" className="section container-x">
      <div className="wrap">
        <Reveal className="mx-auto mb-[clamp(2.25rem,6vw,3.75rem)] max-w-[38rem] text-center">
          <Kicker>How we build</Kicker>
          <h2 className="h-sec mt-3.5">You approve it before we pour concrete</h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
            The step most builders skip is the one we lead with — we show you the
            expected output and refine it until you&rsquo;re happy. Nothing is a
            surprise.
          </p>
        </Reveal>

        <Reveal className="relative">
          <div
            aria-hidden
            className="absolute left-[17%] right-[17%] top-[39px] hidden border-t-2 border-dotted border-gold min-[760px]:block"
          />
          <ol className="relative grid gap-8 min-[760px]:grid-cols-3 min-[760px]:gap-0">
            {STEPS.map((step) => (
              <li
                key={step.numeral}
                className={`px-[clamp(0.625rem,2vw,1.375rem)] text-center ${
                  step.trust
                    ? "on-dark bg-maroon py-[clamp(1.25rem,2vw,1.625rem)]"
                    : ""
                }`}
              >
                <span
                  className={`mx-auto mb-4 flex size-[78px] items-center justify-center rounded-full text-[1.875rem] ${
                    step.trust
                      ? "bg-gold text-maroon-dark"
                      : "border border-gold bg-cream text-maroon"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.numeral}
                </span>
                <p
                  className={`mb-2 font-mono text-[11px] uppercase tracking-[0.2em] ${
                    step.trust ? "text-gold-light" : "text-kicker"
                  }`}
                >
                  {step.eyebrow}
                </p>
                <h3
                  className={`text-[1.3125rem] ${step.trust ? "text-cream" : "text-ink"}`}
                >
                  {step.heading}
                </h3>
                <p
                  className={`mx-auto mt-2.5 max-w-[24rem] text-[0.90625rem] leading-relaxed ${
                    step.trust ? "text-cream/90" : "text-ink-soft"
                  }`}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
