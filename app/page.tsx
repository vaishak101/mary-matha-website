import fs from "node:fs";
import path from "node:path";

type Highlight = {
  title: string;
  description: string;
};

type PageContent = {
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaLabel: string;
  ctaLink: string;
  highlights: Highlight[];
};

type SiteSettings = {
  companyName: string;
  tagline: string;
  nav: Array<{ label: string; href: string }>;
};

function readJson<T>(relativePath: string): T {
  const fullPath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8")) as T;
}

export default function Home() {
  const page = readJson<PageContent>("content/pages/home.json");
  const site = readJson<SiteSettings>("content/settings/site.json");

  return (
    <main className="page-shell" id="top">
      <header className="topbar">
        <div className="brand-box">
          <span className="brand-mark">MM</span>
          <div>
            <strong>{site.companyName}</strong>
            <small>{site.tagline}</small>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {site.nav.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{site.tagline}</p>
          <h1>{page.heroTitle}</h1>
          <p className="subtitle">{page.heroSubtitle}</p>

          <div className="cta-row">
            <a href={page.ctaLink} className="primary-btn">
              {page.ctaLabel}
            </a>
            <a href="#services" className="secondary-btn">
              Explore services
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <div>
            <span>Residential</span>
            <strong>150+</strong>
          </div>
          <div>
            <span>Commercial</span>
            <strong>35+</strong>
          </div>
          <div>
            <span>Investment</span>
            <strong>98%</strong>
          </div>
        </div>
      </section>

      <section id="services" className="section-block">
        <div className="section-heading">
          <p>What we do</p>
          <h2>Practical expertise across property and construction.</h2>
        </div>

        <div className="card-grid">
          {page.highlights.map((item) => (
            <article key={item.title} className="info-card">
              <span className="card-index">0{page.highlights.indexOf(item) + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-band">
        <div>
          <p className="eyebrow">Let’s build your next opportunity</p>
          <h2>Start with a conversation about your property goals.</h2>
        </div>
        <a href="mailto:hello@marymatha.com" className="primary-btn">
          hello@marymatha.com
        </a>
      </section>
    </main>
  );
}
