import { Header } from "@/components/site/Header";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-maroon focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section id="top" className="section container-x wrap">
          <p className="kicker">Foundation check</p>
          <h1 className="h-sec mt-4">Tokens, fonts and Tailwind are wired.</h1>
        </section>
      </main>
    </>
  );
}
