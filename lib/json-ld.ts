import { SITE } from "./site";
import type { FeaturedProperty } from "./content";

// Service verticals the business wants to rank for, keyed to the areas it
// serves. Feeds LocalBusiness.hasOfferCatalog below - keep in sync with the
// services described in Services.tsx.
const SERVICES = [
  "1 BHK Flats for Sale",
  "2 BHK Flats for Sale",
  "3 BHK Flats for Sale",
  "Flats for Rent",
  "New Residential Projects",
  "Civil Contracting",
  "Interior Design",
];

/** LocalBusiness / RealEstateAgent structured data for the home page. */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "HomeAndConstructionBusiness"],
    "@id": `${SITE.url}/#business`,
    name: SITE.legalName,
    alternateName: SITE.name,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/brand/logo-on-light.png`,
    image: `${SITE.url}/brand/logo-on-light.png`,
    telephone: SITE.phonePrimary.tel,
    email: SITE.email,
    foundingDate: String(SITE.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.areasServed.map((name) => ({ "@type": "Place", name })),
    knowsAbout: [
      "Residential real estate",
      "Property buying and selling",
      "Home construction",
      "Home renovation",
      "Civil contracting",
      "Interior design",
    ],
    sameAs: SITE.social.filter((s) => s.href).map((s) => s.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: SERVICES.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "MahaRERA",
      value: SITE.maharera,
    },
  };
}

/**
 * Pull the rupee figure out of a price string ("₹43,00,000" -> 4300000).
 * Returns null for anything that isn't a real number (e.g. "On Request"),
 * so we only ever publish a price we actually have.
 */
function parseRupeePrice(raw: string): number | null {
  const digits = raw.replace(/[^0-9]/g, "");
  if (digits.length < 4) return null;
  const value = Number(digits);
  return Number.isFinite(value) && value > 0 ? value : null;
}

/** RealEstateListing structured data for one featured property card. */
export function propertyJsonLd(p: FeaturedProperty) {
  const price = parseRupeePrice(p.price);
  const images = p.gallery.filter((g) => g.image).map((g) => `${SITE.url}${g.image}`);

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${SITE.url}/#property-${p._slug}`,
    url: `${SITE.url}/#properties`,
    name: p.title,
    description: p.description,
    image: images.length > 0 ? images : undefined,
    numberOfRooms: p.configuration || undefined,
    floorSize: p.area
      ? { "@type": "QuantitativeValue", value: p.area, unitCode: "FTK" }
      : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: p.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      ...(price ? { price, priceCurrency: "INR" } : { description: "Price on request" }),
    },
  };
}

export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
