"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/content";

/** Split "₹250 Cr" -> { prefix: "₹", value: 250, suffix: " Cr", decimals: 0 } */
function parseStat(raw: string) {
  const match = raw.match(/^(\D*?)([\d,]*\.?\d+)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const clean = numStr.replace(/,/g, "");
  const dot = clean.indexOf(".");
  return {
    prefix,
    suffix,
    target: parseFloat(clean),
    decimals: dot === -1 ? 0 : clean.length - dot - 1,
  };
}

/** Cubic-bezier(0.16, 1, 0.3, 1) — the requested "smooth, decelerating" curve. */
function makeBezier(x1: number, y1: number, x2: number, y2: number) {
  const A = (a: number, b: number) => 1 - 3 * b + 3 * a;
  const B = (a: number, b: number) => 3 * b - 6 * a;
  const C = (a: number) => 3 * a;
  const calc = (t: number, a: number, b: number) =>
    ((A(a, b) * t + B(a, b)) * t + C(a)) * t;
  const slope = (t: number, a: number, b: number) =>
    3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a);
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const xEst = calc(t, x1, x2) - x;
      const d = slope(t, x1, x2);
      if (Math.abs(xEst) < 1e-5 || d === 0) break;
      t -= xEst / d;
    }
    return calc(t, y1, y2);
  };
}

const ease = makeBezier(0.16, 1, 0.3, 1);
const DURATION = 2000;

function useCountUp(target: number, decimals: number, run: boolean) {
  const [value, setValue] = useState(target);
  const frame = useRef<number>(0);

  useLayoutEffect(() => {
    if (!run) return;
    setValue(0);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setValue(target * ease(p));
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, run]);

  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const parsed = parseStat(stat.value);
  const display = useCountUp(parsed?.target ?? 0, parsed?.decimals ?? 0, run && !!parsed);

  return (
    <div className="bg-maroon-deep px-[18px] py-[clamp(1.5rem,4vw,2.5rem)] text-center">
      <div
        className="tnum leading-none text-gold-light"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.125rem, 7vw, 3.5rem)",
        }}
      >
        {parsed ? (
          <>
            {parsed.prefix}
            {display}
            {parsed.suffix}
          </>
        ) : (
          stat.value
        )}
      </div>
      <div className="mt-2.5 text-[12.5px] uppercase tracking-[0.08em] text-cream/65">
        {stat.label}
      </div>
    </div>
  );
}

export function StatsBand({ items }: { items: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // leave numbers at their final value
    }
    setRun(false);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRun(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid gap-px bg-gold/25"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}
    >
      {items.map((stat) => (
        <StatItem key={stat.label} stat={stat} run={run} />
      ))}
    </div>
  );
}
