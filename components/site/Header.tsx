"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-md data-[scrolled]:border-line-strong"
    >
      <div className="wrap container-x flex items-center justify-between gap-3 py-3">
        <Link
          href="/#top"
          className="flex items-center gap-3"
          aria-label={`${SITE.legalName} — home`}
        >
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold text-[20px] leading-none text-maroon"
            style={{ fontFamily: "var(--font-wordmark)", fontWeight: 500 }}
          >
            M
          </span>
          <span className="leading-none">
            <span
              className="block whitespace-nowrap text-maroon"
              style={{
                fontFamily: "var(--font-wordmark)",
                fontWeight: 500,
                fontSize: "1.0625rem",
                letterSpacing: "0.14em",
                lineHeight: 1.15,
              }}
            >
              MARY MATHA
            </span>
            <span className="mt-[3px] hidden whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.24em] text-muted min-[380px]:block">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 min-[1040px]:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-maroon"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={`tel:${SITE.phonePrimary.tel}`}
            className="btn btn-call px-3 sm:px-4"
            aria-label={`Call ${SITE.phonePrimary.display}`}
          >
            <PhoneIcon />
            <span className="hidden sm:inline">Call</span>
          </a>
          <a
            href={SITE.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa px-3 sm:px-4"
            aria-label="Message us on WhatsApp"
          >
            <WhatsAppIcon />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="btn btn-call px-2.5 min-[1040px]:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              aria-hidden
              className="relative block h-[10px] w-4"
            >
              <span
                className="absolute left-0 block h-[1.5px] w-full bg-current transition-transform"
                style={{ top: open ? 4 : 0, transform: open ? "rotate(45deg)" : "none" }}
              />
              <span
                className="absolute left-0 top-1 block h-[1.5px] w-full bg-current transition-opacity"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute left-0 block h-[1.5px] w-full bg-current transition-transform"
                style={{ top: open ? 4 : 8, transform: open ? "rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Site"
          className="border-t border-line bg-cream px-[clamp(1rem,4vw,2rem)] py-2 min-[1040px]:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft last:border-0 hover:text-maroon"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
