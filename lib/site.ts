/**
 * Static site content — the parts that live in code, not the CMS.
 * Header, hero, services, workflow, enquiry form and footer read from here.
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mary-matha.vercel.app";

export const SITE = {
  name: "Mary Matha",
  legalName: "Mary Matha Real Estate & Construction",
  tagline: "Real Estate & Construction",
  // TODO: set NEXT_PUBLIC_SITE_URL to the real domain before launch.
  url: rawUrl.replace(/\/$/, ""),
  established: 2000,
  region: "Vasai–Virar",
  description:
    "Trusted real estate solutions and construction services across Vasai–Virar since 2000 — buy, sell, rent, build and renovate, built on quality, trust and excellence.",

  phonePrimary: { display: "+91 80873 53144", tel: "+918087353144" },
  phoneSecondary: { display: "+91 96650 64257", tel: "+919665064257" },
  whatsapp: {
    number: "918087353144",
    url: "https://wa.me/918087353144",
  },
  email: "marymatha1970@gmail.com",

  address: {
    line: "Shop no. 5, Galaxy 2 CHS, Dhruti Complex, Om Nagar, Vasai West, Vasai–Virar 401202",
    locality: "Vasai West",
    region: "Maharashtra",
    postalCode: "401202",
    country: "IN",
  },

  // Google Maps "Embed a map" iframe src (Share → Embed a map → copy the src).
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.460871195323!2d72.825908!3d19.3924833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7af77bb79e709%3A0xb698e07b0b3bf6cd!2sMary%20Matha%20Real%20Estates%20%26Constriction!5e0!3m2!1sen!2sin!4v1788775942538!5m2!1sen!2sin",
  mapLink: "https://maps.google.com/?q=Mary+Matha+Real+Estates+%26+Construction,+Vasai+West",

  // TODO: replace with the real MahaRERA registration number.
  maharera: "A00000000000000",

  areasServed: [
    "Vasai West",
    "Vasai East",
    "Nalasopara",
    "Virar",
    "Naigaon",
    "Bhayandar",
    "Mira Road",
    "Palghar",
  ],

  // Leave an href "" to hide that icon.
  social: [
    {
      label: "Facebook",
      icon: "facebook",
      href: "https://www.facebook.com/share/19DDPdCG3c/",
    },
    {
      label: "Instagram",
      icon: "instagram",
      href: "https://www.instagram.com/marymatha1970",
    },
    {
      label: "YouTube",
      icon: "youtube",
      href: "https://www.youtube.com/@marymathaconstruction988",
    },
  ],
} as const;

export const NAV = [
  { label: "Services", href: "/#services" },
  { label: "Properties", href: "/#properties" },
  { label: "How we build", href: "/#build" },
  { label: "Projects", href: "/#projects" },
  { label: "Enquire", href: "/#contact" },
] as const;

/**
 * Web3Forms access key. Public by design — it's meant to live in client code
 * (see web3forms.com docs). Baked in so the enquiry form works on every
 * environment without extra config; set NEXT_PUBLIC_WEB3FORMS_KEY to override
 * (e.g. a separate key for staging). Regenerate at web3forms.com if it's abused.
 */
export const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "b90ce043-3bf8-43e6-80a9-c6516a368800";
