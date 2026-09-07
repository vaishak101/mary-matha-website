import { Reveal } from "./Reveal";
import { Kicker } from "./Kicker";

type Step = {
  numeral: string;
  eyebrow: string;
  heading: string;
  body: string;
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
          <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
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
          <ol className="relative grid gap-8 min-[760px]:grid-cols-3 min-[760px]:items-start min-[760px]:gap-0">
            {STEPS.map((step) => (
              <li
                key={step.numeral}
                tabIndex={0}
                className="group border border-transparent px-[clamp(0.625rem,2vw,1.375rem)] py-4 text-center outline-none transition-colors duration-300 focus-visible:border-line-strong focus-visible:bg-cream-panel motion-reduce:transition-none min-[760px]:hover:border-line-strong min-[760px]:hover:bg-cream-panel min-[760px]:focus-within:border-line-strong min-[760px]:focus-within:bg-cream-panel"
              >
                <span
                  className="mx-auto mb-4 flex size-[78px] items-center justify-center rounded-full border border-gold bg-cream text-[1.875rem] text-maroon transition-colors duration-300 motion-reduce:transition-none group-hover:bg-maroon group-hover:text-cream group-focus-visible:bg-maroon group-focus-visible:text-cream group-focus-within:bg-maroon group-focus-within:text-cream"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.numeral}
                </span>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-kicker">
                  {step.eyebrow}
                </p>
                <h3 className="text-[1.3125rem] text-ink">{step.heading}</h3>
                <div className="grid grid-rows-[1fr] opacity-100 transition-all duration-300 motion-reduce:transition-none min-[760px]:grid-rows-[0fr] min-[760px]:opacity-0 min-[760px]:group-hover:grid-rows-[1fr] min-[760px]:group-hover:opacity-100 min-[760px]:group-focus-visible:grid-rows-[1fr] min-[760px]:group-focus-visible:opacity-100 min-[760px]:group-focus-within:grid-rows-[1fr] min-[760px]:group-focus-within:opacity-100">
                  <p className="mx-auto min-h-0 max-w-[24rem] overflow-hidden pt-2.5 text-[1rem] leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
