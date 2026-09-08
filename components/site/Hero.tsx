import Image from "next/image";
import { ArrowDown } from "./icons";
import { SITE } from "@/lib/site";

const PILLS = ["Buy", "Sell", "Rent", "Build", "Renovate"];

// Resting layer: the original masks — feather only the outer edge into the
// frame; the hard inner edge is hidden by the wash.
const REST_MASK_L =
  "linear-gradient(to right, transparent, #000 14%, #000 100%)";
const REST_MASK_R = "linear-gradient(to left, transparent, #000 14%, #000 100%)";

// Intro layer (no wash yet): feather the inner edge too, into the paper-toned
// ground, so the two photos never meet at a hard seam.
const INTRO_MASK_L =
  "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)";
const INTRO_MASK_R =
  "linear-gradient(to left, transparent, #000 12%, #000 88%, transparent)";

export function Hero() {
  return (
    <section
      id="top"
      className="on-dark relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-maroon-deep px-[clamp(1.125rem,5vw,2.5rem)] py-20 text-center"
    >
      {/* Load sequence: the photos glide in at full strength over a paper-toned
         ground (no maroon), then that layer fades out while the resting
         treatment + maroon wash fade in behind it, then the text. Both layers
         frame the photos identically, so nothing shifts when they swap. */}

      {/* Resting treatment — the original look, revealed as the intro fades. */}
      <div className="hero-rest absolute inset-0 grid grid-cols-2" aria-hidden>
        <div className="relative overflow-hidden">
          <Image
            src="/uploads/left-image.jpg"
            alt=""
            fill
            sizes="50vw"
            className="object-cover object-center opacity-[0.45] mix-blend-luminosity"
            style={{ maskImage: REST_MASK_L, WebkitMaskImage: REST_MASK_L }}
          />
        </div>
        <div className="relative overflow-hidden">
          <Image
            src="/uploads/right-image.jpg"
            alt=""
            fill
            sizes="50vw"
            className="object-cover object-center opacity-[0.45] mix-blend-luminosity"
            style={{ maskImage: REST_MASK_R, WebkitMaskImage: REST_MASK_R }}
          />
        </div>
      </div>

      {/* Full-strength intro — same framing as the resting layer, glides in
         from each side over a paper-toned ground, then fades out. */}
      <div
        className="hero-intro absolute inset-0 grid grid-cols-2"
        aria-hidden
        style={{ background: "#f1ede1" }}
      >
        <div className="hero-intro-l relative overflow-hidden">
          <Image
            src="/uploads/left-image.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
            style={{ maskImage: INTRO_MASK_L, WebkitMaskImage: INTRO_MASK_L }}
          />
        </div>
        <div className="hero-intro-r relative overflow-hidden">
          <Image
            src="/uploads/right-image.jpg"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
            style={{ maskImage: INTRO_MASK_R, WebkitMaskImage: INTRO_MASK_R }}
          />
        </div>
      </div>

      {/* Maroon wash — fades in as its own step. */}
      <div
        className="hero-veil absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 82% 78% at 50% 45%, rgba(58,10,18,0.98) 0%, rgba(58,10,18,0.75) 44%, rgba(58,10,18,0.45) 100%)",
        }}
      />
      {/* survey line */}
      {/* <div
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
      </span> */}

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

        <p className="hero-lead mx-auto mb-9 max-w-[34rem] text-[clamp(1rem,2.4vw,1.1875rem)] leading-relaxed text-cream/90">
          Trusted real estate solutions and construction services built on
          quality, trust and excellence.
        </p>

        <div className="hero-pills mx-auto flex max-w-[32rem] border border-gold/45">
          {PILLS.map((pill, i) => (
            <a
              key={pill}
              href={`#contact?intent=${pill}`}
              aria-label={`${pill} - go to the enquiry form`}
              className={`flex-1 py-[0.7rem] text-center text-[clamp(0.7rem,2.5vw,0.9rem)] uppercase tracking-[0.1em] text-cream transition-colors duration-200 hover:bg-gold/15 hover:text-gold-light focus-visible:bg-gold/15 focus-visible:text-gold-light motion-reduce:transition-none ${
                i > 0 ? "border-l border-gold/35" : ""
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pill}
            </a>
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
