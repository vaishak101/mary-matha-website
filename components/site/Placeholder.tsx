import type { CSSProperties } from "react";

type PlaceholderProps = {
  /** Short label describing the art that will go here. */
  label: string;
  className?: string;
  dark?: boolean;
  style?: CSSProperties;
  /** Aspect ratio as "w / h" for a CLS-free box. Ignored if the parent sizes it. */
  ratio?: string;
  /** Where the caption sits inside the box. */
  align?: "center" | "top";
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
  align = "center",
}: PlaceholderProps) {
  return (
    <div
      className={`${dark ? "hatch-dark" : "hatch"} flex justify-center overflow-hidden p-3 ${
        align === "top" ? "items-start" : "items-center"
      } ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      <span
        className={`max-w-[80%] text-center font-mono text-[10px] uppercase leading-snug tracking-[0.1em] ${
          dark ? "bg-maroon-dark/70 text-cream/75" : "bg-cream/85 text-maroon/80"
        } px-2 py-1`}
      >
        {label}
      </span>
    </div>
  );
}
