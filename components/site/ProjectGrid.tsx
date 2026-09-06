"use client";

import { useState } from "react";
import { MediaImage } from "./MediaImage";
import { ProjectModal } from "./ProjectModal";
import { PlayIcon } from "./icons";
import type { ProjectView } from "./project-types";

function Card({
  project,
  onOpen,
}: {
  project: ProjectView;
  onOpen: () => void;
}) {
  const ongoing = project.kind === "ongoing";
  const cover = project.gallery[0];

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group flex h-full flex-col border border-l-2 text-left transition-colors ${
        ongoing
          ? "border-line border-l-green bg-cream-panel hover:border-line-strong hover:border-l-green"
          : "border-line border-l-gold bg-cream-alt hover:border-gold"
      }`}
    >
      <div className={`relative ${ongoing ? "aspect-[16/10]" : "aspect-[16/11]"}`}>
        <MediaImage
          src={cover?.image}
          alt={cover?.alt ?? `${project.title} — photo`}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
        />
        <span
          className={`absolute left-3 top-3 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] ${
            ongoing ? "bg-green text-white" : "bg-gold text-maroon-dark"
          }`}
        >
          {project.badge}
        </span>
        <span className="on-dark absolute bottom-3 right-3 flex items-center gap-1.5 bg-maroon-dark/80 px-2.5 py-1 text-[11px] text-cream">
          <PlayIcon width={12} height={12} /> View
        </span>
      </div>
      <div className="p-[18px]">
        <h4
          className="text-ink"
          style={{ fontFamily: "var(--font-display)", fontSize: ongoing ? "1.1875rem" : "1.125rem" }}
        >
          {project.title}
        </h4>
        <p className="mt-1 font-mono text-[12.5px] text-muted">{project.meta}</p>
      </div>
    </button>
  );
}

export function ProjectGrid({
  ongoing,
  completed,
}: {
  ongoing: ProjectView[];
  completed: ProjectView[];
}) {
  const [active, setActive] = useState<ProjectView | null>(null);

  return (
    <>
      {/* Ongoing */}
      <div className="mb-9">
        <div className="mb-5 flex items-center gap-3">
          <span className="pulse-dot size-2.5 rounded-full bg-green" aria-hidden />
          <h3 className="text-[clamp(1.25rem,4vw,1.625rem)] text-maroon">
            Ongoing Projects
          </h3>
        </div>
        {ongoing.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ongoing.map((p) => (
              <Card key={p.slug} project={p} onOpen={() => setActive(p)} />
            ))}
          </div>
        ) : (
          <p className="border border-dashed border-line-strong bg-cream-panel px-5 py-8 text-[0.9375rem] text-ink-soft">
            No projects under construction right now — see the completed work
            below.
          </p>
        )}
      </div>

      {/* Completed */}
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="size-2.5 rounded-full bg-gold" aria-hidden />
          <h3 className="text-[clamp(1.25rem,4vw,1.625rem)] text-maroon">
            Completed Projects
          </h3>
        </div>
        {completed.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map((p) => (
              <Card key={p.slug} project={p} onOpen={() => setActive(p)} />
            ))}
          </div>
        ) : (
          <p className="border border-dashed border-line-strong bg-cream-alt px-5 py-8 text-[0.9375rem] text-ink-soft">
            Handed-over projects will appear here.
          </p>
        )}
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </>
  );
}
