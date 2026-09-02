import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ArrowRight } from "./icons";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" className="section container-x">
        <div className="legal wrap max-w-[46rem]">
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-maroon"
          >
            <ArrowRight width={14} height={14} className="rotate-180" />
            Back to home
          </a>
          <h1>{title}</h1>
          <p className="updated">Last updated {updated}</p>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
