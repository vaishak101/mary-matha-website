"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./icons";
import type { Testimonial } from "@/lib/content";

const INTERVAL = 6500;

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = items.length;

  // Clamp rather than wrap: swiping, arrows, and autoplay all stop at the
  // first/last testimonial instead of looping around.
  const go = useCallback(
    (next: number) => setIndex(Math.min(Math.max(next, 0), total - 1)),
    [total],
  );

  useEffect(() => {
    if (total <= 1 || paused || index >= total - 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => go(index + 1), INTERVAL);
    return () => window.clearInterval(id);
  }, [index, paused, total, go]);

  const current = items[index];
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    if (total <= 1) return;
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
    setPaused(true);
  }

  function onTouchEnd(e: React.TouchEvent) {
    const start = touchRef.current;
    touchRef.current = null;
    setPaused(false);
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      go(index + (dx < 0 ? 1 : -1));
    }
  }

  return (
    <div
      className="mx-auto max-w-[46rem] text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => {
        touchRef.current = null;
        setPaused(false);
      }}
      style={{ touchAction: total > 1 ? "pan-y" : undefined }}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="border border-line bg-cream-alt px-[clamp(1.5rem,5vw,3rem)] py-[clamp(1.75rem,5vw,2.75rem)]">
        <span
          aria-hidden
          className="block leading-[0.5] text-gold"
          style={{ fontFamily: "var(--font-display)", fontSize: "3rem" }}
        >
          &ldquo;
        </span>
        <blockquote aria-live="polite">
          <p
            className="mt-3 text-ink"
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.1875rem, 3.4vw, 1.6875rem)",
              lineHeight: 1.5,
            }}
          >
            {current.quote}
          </p>
        </blockquote>
        <p
          className="mt-6 text-maroon"
          style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}
        >
          {current.name}
        </p>
        <p className="mt-1 font-mono text-[12.5px] tracking-[0.04em] text-muted">
          {current.service} · {current.location}
        </p>
      </div>

      {total > 1 && (
        <div className="mt-7 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-line-strong text-maroon transition-colors hover:bg-cream-alt disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft />
          </button>
          <div className="flex gap-2">
            {items.map((t, i) => (
              <button
                key={t._slug}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1} of ${total}`}
                aria-current={i === index}
                className="h-2 rounded-full transition-all"
                style={{
                  width: i === index ? 22 : 8,
                  background: i === index ? "var(--color-maroon)" : "var(--color-line-strong)",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            aria-label="Next testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-line-strong text-maroon transition-colors hover:bg-cream-alt disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
