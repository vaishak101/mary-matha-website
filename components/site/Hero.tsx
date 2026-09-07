import Image from "next/image";
import { ArrowDown } from "./icons";
import { SITE } from "@/lib/site";

const PILLS = ["Buy", "Sell", "Rent", "Build", "Renovate"];

export function Hero() {
  return (
    <section
      id="top"
      className="on-dark relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-maroon-deep px-[clamp(1.125rem,5vw,2.5rem)] py-20 text-center"
    >
      {/* two background images — pencil sketches, blended into the brand tone */}
      <div className="absolute inset-0 grid grid-cols-2" aria-hidden>
        <div className="relative overflow-hidden">
          <Image
            src="/uploads/left-image.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover object-center opacity-[0.45] mix-blend-luminosity"
          />
        </div>
        <div className="relative overflow-hidden border-l border-gold/10">
          <Image
            src="/uploads/right-image.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover object-center opacity-[0.45] mix-blend-luminosity"
          />
        </div>
      </div>
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 82% 78% at 50% 45%, rgba(58,10,18,0.95) 0%, rgba(58,10,18,0.82) 42%, rgba(58,10,18,0.45) 100%)",
        }}
      />
      {/* survey line */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-[clamp(1rem,4vw,2.75rem)] top-24 w-px opacity-50"
        style={{
          background:
            "repeating-linear-gradient(#c29a43, #c29a43 5px, transparent 5px, transparent 11px)",
        }}
      />
      <span
        aria-hidden
        className="absolute left-[clamp(0.75rem,3.4vw,2.25rem)] top-[7.5rem] font-mono text-[10px] tracking-[0.14em] text-gold-light/80"
      >
        0.00 m
      </span>

      <div className="relative w-full max-w-[54rem]">
        <p className="hero-sub kicker mb-6 text-gold-light">
          {SITE.region} · Est. {SITE.established}
        </p>

        <h1 className="hero-wipe h-hero mx-auto whitespace-nowrap tracking-[0.09em] text-cream sm:tracking-[0.18em]">
          MARY MATHA
        </h1>

        <div
          className="hero-rule mx-auto my-4 h-px w-[min(360px,72%)]"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c29a43 20%, #c29a43 80%, transparent)",
          }}
        />

        <p
          className="hero-sub mx-auto mb-7 text-gold-light"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.0625rem, 4.4vw, 1.75rem)",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
          }}
        >
          Real Estate &amp; Construction
        </p>

        <p className="hero-lead mx-auto mb-9 max-w-[34rem] text-[clamp(0.95rem,2.4vw,1.125rem)] leading-relaxed text-cream/90">
          Trusted real estate solutions and construction services built on
          quality, trust and excellence.
        </p>

        <div className="hero-pills mx-auto flex max-w-[32rem] border border-gold/45">
          {PILLS.map((pill, i) => (
            <span
              key={pill}
              className={`flex-1 py-[0.7rem] text-center text-[clamp(0.7rem,2.5vw,0.9rem)] uppercase tracking-[0.14em] text-cream ${
                i > 0 ? "border-l border-gold/35" : ""
              } ${pill === "Renovate" ? "text-gold-light" : ""}`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to our services"
        className="hero-cue absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-light/80"
      >
        <ArrowDown width={22} height={22} />
      </a>
    </section>
  );
}
