import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms on which ${SITE.legalName} provides this website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="September 2026">
      <p>
        These terms apply to your use of this website, operated by{" "}
        {SITE.legalName}. By using the site you accept them.
      </p>

      <h2>About the information on this site</h2>
      <p>
        Property listings, project details, prices, sizes, timelines and
        statistics are provided for general information and may change without
        notice. Nothing on this site is an offer, a valuation, or a guarantee.
        Please confirm current details with us directly before making any
        decision.
      </p>

      <h2>Property listings</h2>
      <p>
        Listed properties are subject to availability and to verification of
        title and documents. Photographs and floor areas are indicative. We are
        not responsible for decisions made solely on the basis of information
        shown here.
      </p>

      <h2>Construction and renovation</h2>
      <p>
        Any scope, cost or schedule discussed through this site is preliminary. A
        binding agreement is formed only through a signed written contract.
      </p>

      <h2>Enquiries</h2>
      <p>
        When you send an enquiry you confirm that the contact details you provide
        are yours and that we may contact you about your request. See our{" "}
        <a href="/privacy-policy">Privacy Policy</a> for how we handle your
        details.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, layout, and images on this site belong to {SITE.legalName}
        unless stated otherwise, and may not be reused without permission.
      </p>

      <h2>External links</h2>
      <p>
        This site links to services such as WhatsApp and our form provider. We
        are not responsible for the content or practices of external sites.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, and disputes are subject
        to the courts of Maharashtra.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>,{" "}
        <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a>.
      </p>

      <p style={{ marginTop: "2.5rem", fontStyle: "italic" }}>
        Placeholder text — please have this reviewed by a legal advisor and
        confirm the RERA disclosures required for your listings before launch.
      </p>
    </LegalLayout>
  );
}
