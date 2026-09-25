"use client";

import { useId, useRef, useState } from "react";
import { MediaImage } from "./MediaImage";
import { ChevronLeft, ChevronRight } from "./icons";
import type { GalleryImage } from "@/lib/content";

type CarouselProps = {
  images: GalleryImage[];
  sizes: string;
  /** Extra content layered over the image, e.g. a badge. */
  overlay?: React.ReactNode;
  className?: string;
};

type Drag = { startX: number; startY: number; dx: number; active: boolean };

export function Carousel({ images, sizes, overlay, className = "" }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState<Drag | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupId = useId();
  const count = images.length;
  const safe = count > 0 ? images : [{ image: "", alt: "Photo coming soon" }];
  const total = safe.length;

  // Clamp rather than wrap: swiping or clicking past either end just stops
  // at the first/last photo instead of looping around.
  const go = (next: number) => setIndex(Math.min(Math.max(next, 0), total - 1));

  function onTouchStart(e: React.TouchEvent) {
    if (total <= 1) return;
    const t = e.touches[0];
    setDrag({ startX: t.clientX, startY: t.clientY, dx: 0, active: false });
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!drag) return;
    const t = e.touches[0];
    const dx = t.clientX - drag.startX;
    const dy = t.clientY - drag.startY;
    if (!drag.active) {
      // Wait for a clear direction before deciding: horizontal drags the
      // carousel, vertical is left alone so the page can still scroll.
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        setDrag(null);
        return;
      }
      setDrag({ ...drag, active: true, dx });
      return;
    }
    setDrag({ ...drag, dx });
  }

  function onTouchEnd() {
    if (!drag) return;
    const width = trackRef.current?.offsetWidth || 1;
    const threshold = Math.min(60, width * 0.18);
    if (drag.active && Math.abs(drag.dx) > threshold) {
      go(index + (drag.dx < 0 ? 1 : -1));
    }
    setDrag(null);
  }

  const dragOffset = drag?.active ? drag.dx : 0;

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden bg-cream-alt ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${total} photo${total > 1 ? "s" : ""}`}
    >
      <div
        ref={trackRef}
        className="carousel-track h-full"
        style={{
          transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
          transition: drag?.active ? "none" : undefined,
          touchAction: total > 1 ? "pan-y" : undefined,
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => setDrag(null)}
      >
        {safe.map((img, i) => (
          <div
            key={i}
            className="relative h-full w-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            aria-hidden={i !== index}
            id={`${groupId}-slide-${i}`}
          >
            <MediaImage src={img.image} alt={img.alt} sizes={sizes} />
          </div>
        ))}
      </div>

      {overlay}

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous photo"
            className="on-dark absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center bg-maroon-dark/70 text-cream transition-colors hover:bg-maroon-dark/90 disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            aria-label="Next photo"
            className="on-dark absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center bg-maroon-dark/70 text-cream transition-colors hover:bg-maroon-dark/90 disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight />
          </button>
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
            {safe.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === index ? 16 : 6,
                  background:
                    i === index ? "var(--color-gold-light)" : "rgba(247,239,221,0.5)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
