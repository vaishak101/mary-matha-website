import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="on-dark bg-maroon-dark text-cream/70">
      <div className="wrap container-x py-[clamp(2.5rem,6vw,3.75rem)]">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p
              className="text-cream"
              style={{
                fontFamily: "var(--font-wordmark)",
                fontWeight: 500,
                fontSize: "1.125rem",
                letterSpacing: "0.14em",
              }}
            >
              MARY MATHA
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-kicker">
              {SITE.tagline}
            </p>
            <p className="mt-3.5 max-w-[22rem] text-[0.8125rem] leading-relaxed">
              Buy · Sell · Rent · Build · Renovate. Serving {SITE.region} families
              since {SITE.established}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-light">
              Explore
            </p>
            <ul className="space-y-1 text-[0.875rem]">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-cream/70 hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-light">
              Contact
            </p>
            <ul className="space-y-1 text-[0.875rem]">
              <li>
                <a href={`tel:${SITE.phonePrimary.tel}`} className="text-cream/70 hover:text-cream">
                  {SITE.phonePrimary.display}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneSecondary.tel}`} className="text-cream/70 hover:text-cream">
                  {SITE.phoneSecondary.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="text-cream/70 hover:text-cream">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-light">
              Legal
            </p>
            <ul className="space-y-1 text-[0.875rem]">
              <li>
                <Link href="/privacy-policy" className="text-cream/70 hover:text-cream">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-cream/70 hover:text-cream">
                  Terms of Use
                </Link>
              </li>
            </ul>
            <p className="mt-2 text-[12px] text-cream/45">
              MahaRERA: {SITE.maharera}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gold/20 pt-5 text-center text-[12px] text-cream/45">
          © {SITE.established}–{year} {SITE.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
