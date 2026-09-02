"use client";

import { useId, useState } from "react";
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

export function Carousel({ images, sizes, overlay, className = "" }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const groupId = useId();
  const count = images.length;
  const safe = count > 0 ? images : [{ image: "", alt: "Photo coming soon" }];
  const total = safe.length;

  const go = (next: number) => setIndex((next + total) % total);

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden bg-cream-alt ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${total} photo${total > 1 ? "s" : ""}`}
    >
      <div
        className="carousel-track h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
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
            aria-label="Previous photo"
            className="on-dark absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center bg-maroon-dark/70 text-cream transition-colors hover:bg-maroon-dark/90"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next photo"
            className="on-dark absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center bg-maroon-dark/70 text-cream transition-colors hover:bg-maroon-dark/90"
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
