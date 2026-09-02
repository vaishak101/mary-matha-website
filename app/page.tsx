import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { FeaturedProperties } from "@/components/site/FeaturedProperties";
import { Workflow } from "@/components/site/Workflow";
import { Projects } from "@/components/site/Projects";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { businessJsonLd, jsonLdScript } from "@/lib/json-ld";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(businessJsonLd())}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded focus:bg-maroon focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <FeaturedProperties />
        <Workflow />
        <Projects />
        <Stats />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
