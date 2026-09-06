import type { Metadata } from "next";
import { LegalLayout } from "@/components/site/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.legalName} handles the information you share through this website.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="September 2026">
      <p>
        This policy explains what personal information {SITE.legalName}
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects through this website, why we
        collect it, and what we do with it. It is written in plain language and
        should be read alongside our{" "}
        <a href="/terms">Terms of Use</a>.
      </p>

      <h2>Information we collect</h2>
      <p>
        We only collect what you choose to send us through the enquiry form: your
        name, phone or WhatsApp number, the details of what you are looking for,
        and any notes you add. We do not run advertising trackers or analytics
        cookies on this site.
      </p>

      <h2>How the enquiry form works</h2>
      <p>
        The form is delivered by Web3Forms, a third-party form service. When you
        submit an enquiry, your details are passed to Web3Forms, which emails them
        to our office. Web3Forms processes the submission on our behalf and does
        not use your information for its own purposes. See the{" "}
        <a
          href="https://web3forms.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Web3Forms privacy policy
        </a>{" "}
        for details.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To call or message you back about your enquiry.</li>
        <li>To shortlist properties or prepare an estimate for you.</li>
        <li>To keep a record of enquiries for our own follow-up.</li>
      </ul>
      <p>
        We do not sell your information or share it with anyone outside our team,
        except where we are required to by law.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry records for as long as we are in contact with you about
        your requirement, and for a reasonable period afterwards in case you get
        back in touch. You can ask us to delete your details at any time.
      </p>

      <h2>Your choices</h2>
      <p>
        To see, correct, or delete the information we hold about you, contact us
        at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or{" "}
        <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes, we will update the date above. Significant changes
        will be noted on this page.
      </p>

      <p style={{ marginTop: "2.5rem", fontStyle: "italic" }}>
        Placeholder text — please have this reviewed against your actual data
        practices and applicable law (including the DPDP Act, 2023) before launch.
      </p>
    </LegalLayout>
  );
}
