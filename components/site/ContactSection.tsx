import { Reveal } from "./Reveal";
import { EnquiryForm } from "./EnquiryForm";

export function ContactSection() {
  return (
    <section id="contact" className="section container-x bg-cream-alt">
      <Reveal className="wrap border border-line bg-cream-panel">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b-2 border-maroon bg-cream px-[clamp(1.25rem,4vw,2.25rem)] py-[clamp(1.125rem,3vw,1.625rem)]">
          <div>
            <p className="kicker">Enquiry form</p>
            <h2 className="h-sec mt-1">Request a call-back</h2>
          </div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
            Reply within 24 hours
          </p>
        </div>
        <div className="p-[clamp(1.25rem,4vw,2.25rem)]">
          <EnquiryForm />
        </div>
      </Reveal>
    </section>
  );
}
