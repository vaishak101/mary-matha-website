import { SITE } from "./site";

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
    ],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "MahaRERA",
      value: SITE.maharera,
    },
  };
}

export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
