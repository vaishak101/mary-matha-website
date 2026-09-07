import { PhoneIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

type ComingSoonProps = {
  headline: string;
  message: string;
  showContact: boolean;
};

export function ComingSoon({ headline, message, showContact }: ComingSoonProps) {
  return (
    <main className="on-dark flex min-h-[100svh] flex-col items-center justify-center overflow-x-hidden bg-maroon-dark px-[clamp(1.25rem,6vw,2.5rem)] py-16 text-center text-cream">
      <p className="kicker text-gold-light">
        {`${SITE.region} · Est. ${SITE.established}`}
      </p>

      <h1 className="mt-7 flex w-full justify-center">
        <Logo
          variant="full"
          tone="dark"
          priority
          sizes="(min-width: 640px) 440px, 82vw"
          className="h-auto w-[min(82vw,440px)]"
          alt="Mary Matha — Real Estate & Construction"
        />
      </h1>

      <h2
        className="mt-12 max-w-[32rem] text-balance text-cream"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
          lineHeight: 1.2,
        }}
      >
        {headline}
      </h2>

      <p className="mt-4 max-w-[34rem] text-[clamp(0.95rem,2.6vw,1.0625rem)] leading-relaxed text-cream/85">
        {message}
      </p>

      {showContact && (
        <div className="mt-9 flex w-full max-w-[26rem] flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={`tel:${SITE.phonePrimary.tel}`}
            className="btn btn-gold rounded-none px-5 py-3.5"
          >
            <PhoneIcon />
            {SITE.phonePrimary.display}
          </a>
          <a
            href={SITE.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa rounded-none px-5 py-3.5"
          >
            <WhatsAppIcon />
            Message on WhatsApp
          </a>
        </div>
      )}

      <p className="mt-14 max-w-full text-balance font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-cream/45">
        {`${SITE.legalName} · © ${SITE.established}–${new Date().getFullYear()} `}
      </p>
    </main>
  );
}
