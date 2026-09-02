import { Reveal } from "./Reveal";
import { Kicker } from "./Kicker";
import { ProjectGrid } from "./ProjectGrid";
import type { ProjectView } from "./project-types";
import { getCompletedProjects, getOngoingProjects } from "@/lib/content";

export function Projects() {
  const ongoing: ProjectView[] = getOngoingProjects().map((p) => ({
    slug: p._slug,
    kind: "ongoing",
    title: p.title,
    badge:
      p.percentComplete != null
        ? `In progress · ${p.percentComplete}%`
        : "In progress",
    statusLine: [
      p.percentComplete != null
        ? `Ongoing · ${p.percentComplete}% complete`
        : "Ongoing",
      p.expectedCompletion ? `handover ${p.expectedCompletion}` : null,
    ]
      .filter(Boolean)
      .join(" · "),
    meta: `${p.projectType} · ${p.location}`,
    description: p.description,
    gallery: p.gallery,
    videoUrl: p.videoUrl,
  }));

  const completed: ProjectView[] = getCompletedProjects().map((p) => ({
    slug: p._slug,
    kind: "completed",
    title: p.title,
    badge: `Delivered ${p.completedYear}`,
    statusLine: [
      `Delivered ${p.completedYear}`,
      p.durationMonths ? `built in ${p.durationMonths} months` : null,
    ]
      .filter(Boolean)
      .join(" · "),
    meta: `${p.projectType} · ${p.location}`,
    description: p.description,
    gallery: p.gallery,
    videoUrl: p.videoUrl,
  }));

  return (
    <section
      id="projects"
      className="section container-x border-t border-line bg-cream"
    >
      <div className="wrap">
        <Reveal className="mx-auto mb-[clamp(2.25rem,6vw,3.5rem)] max-w-[38rem] text-center">
          <Kicker>On site & delivered</Kicker>
          <h2 className="h-sec mt-3.5">Work you can walk through</h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
            Open any project for photos and a walkthrough. Green marks what&rsquo;s
            being built now; gold marks what&rsquo;s been handed over.
          </p>
        </Reveal>

        <Reveal>
          <ProjectGrid ongoing={ongoing} completed={completed} />
        </Reveal>
      </div>
    </section>
  );
}
