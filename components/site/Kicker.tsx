import type { ReactNode } from "react";

type KickerProps = {
  children: ReactNode;
  align?: "center" | "left";
  tone?: "default" | "gold" | "dark";
  className?: string;
};

/** Monospace eyebrow with the gold "seal" hairlines above it. */
export function Kicker({
  children,
  align = "center",
  tone = "default",
  className = "",
}: KickerProps) {
  const toneClass =
    tone === "gold"
      ? "text-gold-light"
      : tone === "dark"
        ? "text-cream/70"
        : "";
  return (
    <span
      className={`seal kicker inline-block ${align === "left" ? "seal-l" : ""} ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
