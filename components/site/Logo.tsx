import Image from "next/image";

/**
 * Mary Matha logo. Two crops - `full` (roof + wordmark + "Real Estate &
 * Construction" + key) and `wordmark` (roof + "MARY MATHA" only) - each in a
 * `light` treatment for cream backgrounds and a `dark` (solid gold) treatment
 * for the maroon sections.
 *
 * Interim assets: knocked out from the supplied paper mockup. Swap the four
 * files in `public/brand/` for clean transparent PNG/SVG when available.
 */
type LogoProps = {
  variant?: "full" | "wordmark" | "name";
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
  sizes?: string;
  alt?: string;
};

const ASSETS = {
  full: {
    light: { src: "/brand/logo-on-light.png", width: 1200, height: 788 },
    dark: { src: "/brand/logo-on-dark.png", width: 1500, height: 985 },
  },
  wordmark: {
    light: { src: "/brand/logo-wordmark-on-light.png", width: 1300, height: 410 },
    dark: { src: "/brand/logo-wordmark-on-dark.png", width: 1300, height: 410 },
  },
  name: {
    light: { src: "/brand/logo-name-on-light.png", width: 1300, height: 210 },
    dark: { src: "/brand/logo-name-on-dark.png", width: 1300, height: 210 },
  },
} as const;

export function Logo({
  variant = "full",
  tone = "light",
  className = "",
  priority = false,
  sizes,
  alt = "Mary Matha - Real Estate & Construction",
}: LogoProps) {
  const a = ASSETS[variant][tone];
  return (
    <Image
      src={a.src}
      width={a.width}
      height={a.height}
      alt={alt}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
