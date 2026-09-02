import type { CSSProperties } from "react";

type PlaceholderProps = {
  /** Short label describing the art that will go here. */
  label: string;
  className?: string;
  dark?: boolean;
  style?: CSSProperties;
  /** Aspect ratio as "w / h" for a CLS-free box. Ignored if the parent sizes it. */
  ratio?: string;
};

/**
 * A clearly-marked stand-in for real photography. Every one of these is a
 * "replace me" flag — grep for `Placeholder` before launch.
 */
export function Placeholder({
  label,
  className = "",
  dark = false,
  style,
  ratio,
}: PlaceholderProps) {
  return (
    <div
      className={`${dark ? "hatch-dark" : "hatch"} relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      <span
        className={`kicker px-3 py-1 text-center ${
          dark ? "bg-maroon-dark/70 text-cream/80" : "bg-cream/85 text-maroon"
        }`}
        style={{ letterSpacing: "0.16em" }}
      >
        {label}
      </span>
    </div>
  );
}
