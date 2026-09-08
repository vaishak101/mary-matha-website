import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="on-dark bg-maroon-dark text-cream/70">
      <div className="wrap container-x py-[clamp(2.5rem,6vw,3.75rem)]">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo
              variant="name"
              tone="dark"
              sizes="240px"
              className="h-[30px] w-auto sm:h-9"
            />
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-kicker">
              {SITE.tagline}
            </p>
            <p className="mt-3.5 max-w-[22rem] text-[0.875rem] leading-relaxed">
              Buy · Sell · Rent · Build · Renovate. Serving {SITE.region} families
              since {SITE.established}.
            </p>
            <SocialLinks
              className="mt-5"
              itemClassName="border-cream/25 text-cream/70 hover:border-gold hover:text-gold-light"
            />
          </div>

          <nav aria-label="Footer">
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-light">
              Explore
            </p>
            <ul className="space-y-1.5 text-[0.9375rem]">
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
            <ul className="space-y-1.5 text-[0.9375rem]">
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
            <ul className="space-y-1.5 text-[0.9375rem]">
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
          </div>
        </div>

        <div className="mt-8 border-t border-gold/20 pt-5 text-center text-[12.5px] text-cream/50">
          © {year} {SITE.legalName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
