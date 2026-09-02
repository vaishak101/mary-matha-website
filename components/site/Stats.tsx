import { Reveal } from "./Reveal";
import { Kicker } from "./Kicker";
import { StatsBand } from "./StatsBand";
import { getStats } from "@/lib/content";

export function Stats() {
  const stats = getStats();
  if (stats.length === 0) return null;

  return (
    <section id="stats" className="on-dark bg-maroon-deep">
      <div className="wrap container-x section-tight">
        <Reveal className="mb-[clamp(1.875rem,5vw,3rem)] text-center">
          <Kicker tone="gold">By the numbers</Kicker>
          <h2
            className="mt-3.5 text-cream"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,5vw,2.375rem)" }}
          >
            Three decades, quietly stated
          </h2>
        </Reveal>
        <Reveal>
          <StatsBand items={stats} />
        </Reveal>
      </div>
    </section>
  );
}
