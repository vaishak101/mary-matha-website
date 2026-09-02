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
  established: 1996,
  region: "Vasai–Virar",
  description:
    "Trusted real estate solutions and construction services across Vasai–Virar since 1996 — buy, sell, rent, build and renovate, built on quality, trust and excellence.",

  phonePrimary: { display: "+91 80875 55144", tel: "+918087555144" },
  phoneSecondary: { display: "+91 98650 64257", tel: "+919865064257" },
  whatsapp: {
    number: "918087555144",
    url: "https://wa.me/918087555144",
  },
  email: "marymatha1970@gmail.com",

  address: {
    line: "Shop no. 5, Galaxy 2 CHS, Dhruti Complex, Om Nagar, Vasai West, Vasai–Virar 401202",
    locality: "Vasai West",
    region: "Maharashtra",
    postalCode: "401202",
    country: "IN",
  },

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
} as const;

export const NAV = [
  { label: "Services", href: "/#services" },
  { label: "Properties", href: "/#properties" },
  { label: "How we build", href: "/#build" },
  { label: "Projects", href: "/#projects" },
  { label: "Enquire", href: "/#contact" },
] as const;

/** Web3Forms access key — public by design. Set NEXT_PUBLIC_WEB3FORMS_KEY in the environment. */
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
