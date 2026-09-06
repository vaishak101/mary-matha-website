"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Carousel } from "./Carousel";
import { Placeholder } from "./Placeholder";
import { CloseIcon } from "./icons";
import { toEmbedUrl } from "@/lib/video";
import type { ProjectView } from "./project-types";

export function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectView;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const embed = toEmbedUrl(project.videoUrl);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const isOngoing = project.kind === "ongoing";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-maroon-dark/85 p-[clamp(0.75rem,3vw,2rem)] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="on-dark relative max-h-[90svh] w-full max-w-[760px] overflow-y-auto border border-gold bg-cream text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Carousel
            images={project.gallery}
            sizes="(min-width: 800px) 760px, 100vw"
            className="aspect-[16/10]"
          />
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-maroon-dark/85 text-cream transition-colors hover:bg-maroon-dark"
          >
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        <div className="p-[clamp(1.375rem,4vw,2.25rem)]">
          <p
            className={`mb-2 font-mono text-[11px] uppercase tracking-[0.16em] ${
              isOngoing ? "text-green" : "text-gold"
            }`}
          >
            {project.statusLine}
          </p>
          <h3
            id={titleId}
            className="text-maroon"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.375rem, 4vw, 1.875rem)" }}
          >
            {project.title}
          </h3>
          <p className="mt-1.5 font-mono text-[13px] text-muted">{project.meta}</p>
          <p className="mt-4 text-[0.9375rem] leading-[1.75] text-ink-soft">
            {project.description}
          </p>

          <div className="mt-5">
            {embed ? (
              <div className="relative aspect-video w-full border border-line">
                <iframe
                  src={embed}
                  title={`${project.title} — walkthrough video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            ) : (
              <Placeholder
                label="Walkthrough video — coming soon"
                ratio="16 / 9"
              />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
