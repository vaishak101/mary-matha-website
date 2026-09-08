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
        should be read alongside our <a href="/terms">Terms of Use</a>.
      </p>

      <h2>Information you give us</h2>
      <p>
        We only collect what you choose to send through the enquiry form: your
        name, phone or WhatsApp number, the details of what you are looking for
        (budget, area, plot size, scope of work, and so on), and any notes you
        add. If you call, message or email us instead, we keep whatever you share
        in that conversation.
      </p>

      <h2>Information collected automatically</h2>
      <p>
        Like any website, ours is served by a hosting provider that keeps
        standard server logs - your IP address, browser type, the pages you
        request and the time of the request. These logs are used only to run the
        site securely and diagnose problems. We do <strong>not</strong> use
        advertising trackers, analytics cookies, or any script that builds a
        profile of you.
      </p>

      <h2>How this website is built</h2>
      <p>
        In brief, so you know what is and isn&rsquo;t happening in your browser:
      </p>
      <ul>
        <li>
          <strong>Framework &amp; hosting.</strong> The site is a Next.js
          application hosted on Vercel. Pages are pre-built and served as static
          content; there is no login and no user database.
        </li>
        <li>
          <strong>Content.</strong> Property listings, projects and text are
          managed through TinaCMS and stored in the site&rsquo;s code repository.
          None of your data is stored there.
        </li>
        <li>
          <strong>Fonts.</strong> Web fonts are self-hosted from our own domain,
          so displaying the page does not call out to a font provider.
        </li>
        <li>
          <strong>Cookies.</strong> We do not set any first-party cookies and the
          site works with cookies disabled. See &ldquo;Embedded content&rdquo;
          below for the one exception.
        </li>
      </ul>

      <h2>How the enquiry form works</h2>
      <p>
        The form is handled by Web3Forms, a third-party form service. When you
        submit it, your details are sent from your browser to Web3Forms, which
        emails them to our office. Web3Forms processes the submission on our
        behalf and does not use your information for its own purposes. The form
        includes a hidden anti-spam field; it does not ask for and we never
        collect payment-card details. See the{" "}
        <a
          href="https://web3forms.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Web3Forms privacy policy
        </a>{" "}
        for details.
      </p>

      <h2>Embedded content and third-party links</h2>
      <p>
        Some pages load content from other services. When that content loads,
        those services can see your IP address and may set their own cookies,
        under their own privacy policies:
      </p>
      <ul>
        <li>
          <strong>Google Maps.</strong> The map on the enquiry section is
          embedded from Google. This is the one place a third-party cookie may be
          set.
        </li>
        <li>
          <strong>YouTube.</strong> Project walk-through videos, where present,
          are embedded in privacy-enhanced mode, which does not set tracking
          cookies unless you start playback. Videos we host ourselves are served
          from our own domain.
        </li>
        <li>
          <strong>WhatsApp and phone links.</strong> &ldquo;Call&rdquo; and
          &ldquo;WhatsApp&rdquo; buttons simply open those apps; nothing is sent
          until you send a message yourself.
        </li>
        <li>
          <strong>Social links.</strong> Links to our Facebook, Instagram and
          YouTube pages open those sites in a new tab; they do not track you from
          our pages.
        </li>
      </ul>

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
        back in touch. Hosting server logs are retained only for a short period.
        You can ask us to delete your details at any time.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to see, correct, or delete the information we hold about you,
        or withdraw your consent to us contacting you. Write to us at{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
        <a href={`tel:${SITE.phonePrimary.tel}`}>{SITE.phonePrimary.display}</a>.
        If you are not satisfied with our response, you may raise the matter with
        the Data Protection Board of India under the Digital Personal Data
        Protection Act, 2023.
      </p>

      <h2>Children</h2>
      <p>
        This website and its enquiry form are intended for adults. We do not
        knowingly collect information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes, we will update the date above. Significant
        changes will be noted on this page.
      </p>

      <p style={{ marginTop: "2.5rem", fontStyle: "italic" }}>
        Placeholder text - please have this reviewed against your actual
        data practices and applicable law (including the DPDP Act, 2023) before
        launch.
      </p>
    </LegalLayout>
  );
}
