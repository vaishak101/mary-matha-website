"use client";

import { useEffect, useState } from "react";
import { MediaImage } from "./MediaImage";
import { ProjectModal } from "./ProjectModal";
import { PlayIcon } from "./icons";
import { resolveVideo } from "@/lib/video";
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
  const hasVideo = resolveVideo(project.videoUrl) != null;

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
          alt={cover?.alt ?? `${project.title} - photo`}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
        />
        <span
          className={`absolute left-3 top-3 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] ${
            ongoing ? "bg-green text-white" : "bg-gold text-maroon-dark"
          }`}
        >
          {project.badge}
        </span>
        <span
          className={`absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-[11px] ${
            hasVideo ? "bg-gold text-maroon-dark" : "on-dark bg-maroon-dark/80 text-cream"
          }`}
        >
          <PlayIcon width={12} height={12} /> {hasVideo ? "Watch video" : "View"}
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

  // A "#projects?open=<slug>" link (from the modal's Share button) opens
  // that project's modal directly - on load and if the hash changes.
  useEffect(() => {
    const applyFromHash = () => {
      const hash = window.location.hash;
      const q = hash.indexOf("?");
      if (q === -1) return;
      const slug = new URLSearchParams(hash.slice(q + 1)).get("open");
      if (!slug) return;
      const found = [...ongoing, ...completed].find((p) => p.slug === slug);
      if (found) setActive(found);
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, [ongoing, completed]);

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
          <p className="border border-dashed border-line-strong bg-cream-panel px-5 py-8 text-[1rem] text-ink-soft">
            No projects under construction right now - see the completed work
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
          <p className="border border-dashed border-line-strong bg-cream-alt px-5 py-8 text-[1rem] text-ink-soft">
            Handed-over projects will appear here.
          </p>
        )}
      </div>

      {active && (
        <ProjectModal
          project={active}
          onClose={() => {
            setActive(null);
            // Drop a "?open=<slug>" hash so closing (then refreshing, or
            // using back) doesn't immediately reopen the same modal.
            if (window.location.hash.includes("open=")) {
              history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search + "#projects",
              );
            }
          }}
        />
      )}
    </>
  );
}
