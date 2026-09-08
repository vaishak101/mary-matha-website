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
        {SITE.legalName}. By using the site you accept them. If you do not agree,
        please do not use the site. They should be read alongside our{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
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
      <p>
        Some listing images are taken from the property&rsquo;s or
        developer&rsquo;s official pages so the listing reflects the actual
        project. Those images remain the property of their respective owners and
        are used here only to represent the property accurately.
      </p>

      <h2>Construction and renovation</h2>
      <p>
        Any scope, cost or schedule discussed through this site is preliminary. A
        binding agreement is formed only through a signed written contract.
      </p>

      <h2>Enquiries</h2>
      <p>
        When you send an enquiry you confirm that the contact details you provide
        are yours and that we may contact you about your request. The enquiry
        form is delivered by a third-party provider (Web3Forms); do not submit
        anything through it that you would not want handled by email. See our{" "}
        <a href="/privacy-policy">Privacy Policy</a> for how we handle your
        details.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to misuse the site - for example, by submitting false
        details or spam through the form, sending automated or bulk requests,
        attempting to gain unauthorised access, scraping content at scale, or
        doing anything that disrupts the site for others.
      </p>

      <h2>How the site is provided</h2>
      <p>
        The site is a statically built application hosted on third-party
        infrastructure (Vercel) and relies on external services for its form,
        maps and video embeds. We provide it &ldquo;as is&rdquo; and do not
        promise it will always be available, uninterrupted, or error-free. We may
        change, suspend or withdraw any part of it without notice.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The text, layout, and images on this site belong to {SITE.legalName}{" "}
        unless stated otherwise, and may not be reused without permission.
      </p>

      <h2>External links and embedded services</h2>
      <p>
        This site links to and embeds third-party services - including
        Web3Forms (enquiry form), Google Maps (office location), YouTube (project
        videos) and WhatsApp. Those services operate under their own terms and
        privacy policies, and we are not responsible for their content or
        practices.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, we are not liable for any loss arising
        from your use of, or reliance on, this website or any service linked from
        it. Nothing in these terms limits liability that cannot be limited under
        applicable law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, and disputes are subject
        to the courts of Maharashtra.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The date above shows when
        they were last revised; continuing to use the site means you accept the
        current version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>,{" "}
        <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a>.
      </p>
    </LegalLayout>
  );
}
