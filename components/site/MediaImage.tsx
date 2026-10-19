import Image from "next/image";
import { Placeholder } from "./Placeholder";

type MediaImageProps = {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  dark?: boolean;
  /** "cover" (default) crops to fill the box; "contain" shows the whole
   * photo letterboxed - use for galleries that mix portrait and landscape
   * source images, so nothing gets cropped/zoomed. */
  fit?: "cover" | "contain";
};

/**
 * `next/image` with `fill` - always render it inside a `position: relative`
 * box that sets the aspect ratio, so there's no layout shift. Falls back to a
 * marked placeholder when there's no image yet.
 */
export function MediaImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
  dark = false,
  fit = "cover",
}: MediaImageProps) {
  if (!src) {
    return <Placeholder label={alt} dark={dark} className="absolute inset-0" />;
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}
