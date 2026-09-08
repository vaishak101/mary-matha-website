"use client";

import { useState, type FormEvent } from "react";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { SITE, WEB3FORMS_KEY } from "@/lib/site";

type Intent = "Buy" | "Sell" | "Rent" | "Build" | "Renovate";

const INTENTS: Record<
  Intent,
  { label: string; placeholder: string; submit: string }
> = {
  Buy: {
    label: "Budget & preferred area",
    placeholder: "e.g. up to ₹60L, 2 BHK in Vasai West",
    submit: "Send enquiry — buying",
  },
  Sell: {
    label: "What are you selling?",
    placeholder: "e.g. 1 BHK, 444 sq ft, Nalasopara",
    submit: "Send enquiry — selling",
  },
  Rent: {
    label: "Rental need & area",
    placeholder: "e.g. 2 BHK on rent, Virar, for family",
    submit: "Send enquiry — renting",
  },
  Build: {
    label: "Plot size & location",
    placeholder: "e.g. 1200 sq ft plot, Virar East",
    submit: "Send enquiry — building",
  },
  Renovate: {
    label: "What needs renovating?",
    placeholder: "e.g. full 2 BHK, kitchen and bathrooms",
    submit: "Send enquiry — renovation",
  },
};

const inputClass =
  "w-full border border-line-strong bg-cream px-3.5 py-3 text-[1rem] text-ink placeholder:text-muted/80 focus-visible:border-maroon";
const labelClass =
  "mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted";

export function EnquiryForm() {
  const [intent, setIntent] = useState<Intent>("Buy");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const cfg = INTENTS[intent];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // honeypot tripped

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Send as FormData (no custom headers) so the request stays a "simple"
    // CORS request — Web3Forms rejects the preflight that a JSON body triggers.
    const payload = new FormData();
    payload.append("access_key", WEB3FORMS_KEY);
    payload.append(
      "subject",
      `Website enquiry — ${intent} — ${data.get("name") || ""}`,
    );
    payload.append("from_name", SITE.legalName);
    payload.append("Intent", intent);
    payload.append("Name", String(data.get("name") || ""));
    payload.append("Phone / WhatsApp", String(data.get("phone") || ""));
    payload.append(cfg.label, String(data.get("detail") || ""));
    payload.append("Notes", String(data.get("notes") || "—"));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const json = await res.json();
      setStatus(json.success ? "sent" : "error");
      if (json.success) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-line bg-cream-panel p-[clamp(1.5rem,4vw,2.5rem)] text-center">
        <p
          className="text-maroon"
          style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}
        >
          Thank you — your enquiry is in.
        </p>
        <p className="mx-auto mt-2 max-w-[28rem] text-[1rem] text-ink-soft">
          We call back within a working day. If it&rsquo;s urgent, reach us
          directly on {SITE.phonePrimary.display} or WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-call mt-5 rounded-none"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
      <form onSubmit={onSubmit} noValidate>
        <fieldset>
          <legend className={labelClass}>I&rsquo;m here to —</legend>
          <div className="mb-6 flex flex-wrap gap-px bg-line-strong">
            {(Object.keys(INTENTS) as Intent[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setIntent(key)}
                aria-pressed={intent === key}
                className={`flex-1 basis-[30%] py-3 text-[0.9375rem] tracking-[0.04em] transition-colors sm:basis-0 ${
                  intent === key
                    ? "bg-maroon text-cream"
                    : "bg-cream text-maroon hover:bg-cream-alt"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {key}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="ef-name" className={labelClass}>
              Full name
            </label>
            <input id="ef-name" name="name" required autoComplete="name" className={inputClass} />
          </div>
          <div>
            <label htmlFor="ef-phone" className={labelClass}>
              Phone / WhatsApp
            </label>
            <input
              id="ef-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="ef-detail" className={labelClass}>
            {cfg.label}
          </label>
          <input
            id="ef-detail"
            name="detail"
            required
            placeholder={cfg.placeholder}
            className={inputClass}
          />
        </div>

        <div className="mt-3">
          <label htmlFor="ef-notes" className={labelClass}>
            Anything else we should know? <span className="normal-case">(optional)</span>
          </label>
          <textarea
            id="ef-notes"
            name="notes"
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* honeypot */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-gold mt-4 w-full rounded-none py-4 text-[1rem] disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : cfg.submit}
        </button>

        <p aria-live="polite" className="mt-3 min-h-[1.25rem] text-[0.875rem]">
          {status === "error" && (
            <span className="text-maroon">
              That didn&rsquo;t go through. Please call {SITE.phonePrimary.display}{" "}
              or{" "}
              <a
                href={SITE.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                message us on WhatsApp
              </a>
              .
            </span>
          )}
          {status === "idle" && (
            <span className="text-muted">We call back within a working day.</span>
          )}
        </p>
      </form>

      <div className="flex flex-col gap-3">
        <a
          href={`tel:${SITE.phonePrimary.tel}`}
          className="flex items-center gap-3.5 border border-line bg-cream-panel p-4"
        >
          <PhoneIcon width={20} height={20} className="text-maroon" />
          <span>
            <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
              Call directly
            </span>
            <span className="block text-[1rem] text-ink">
              {SITE.phonePrimary.display}
            </span>
          </span>
        </a>
        <a
          href={SITE.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="on-dark flex items-center gap-3.5 bg-green p-4 text-white"
        >
          <WhatsAppIcon width={20} height={20} />
          <span>
            <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/80">
              Fastest reply
            </span>
            <span className="block text-[1rem]">Message on WhatsApp</span>
          </span>
        </a>
        <div className="flex-1 border border-line bg-cream-panel p-4">
          <span className="block font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
            Visit the office
          </span>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
            {SITE.address.line}
          </p>
          <div className="mt-3 aspect-[4/3] overflow-hidden border border-line">
            <iframe
              src={SITE.mapEmbedUrl}
              title={`Map to the ${SITE.legalName} office`}
              className="h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <a
            href={SITE.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block border-b border-gold pb-0.5 text-[0.875rem] text-maroon"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
