"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms, applied as transition-delay. */
  delay?: number;
  id?: string;
};

/**
 * Wraps content in a scroll-triggered fade + rise. The `.reveal` class does the
 * work in CSS; this just toggles `data-shown` when the element enters view.
 * Fails safe: if the observer never fires (or JS is slow), a timeout reveals
 * the content anyway, so nothing can stay invisible. `prefers-reduced-motion`
 * is handled in globals.css.
 */
export function Reveal({
  children,
  as,
  className = "",
  delay = 0,
  id,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-shown", "");

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    // Already in (or near) view on mount — reveal right away.
    if (node.getBoundingClientRect().top < window.innerHeight * 1.1) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);

    // Failsafe: if the observer never fires, reveal anyway rather than
    // leaving content stuck invisible.
    const failsafe = window.setTimeout(show, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
