import { WhatsAppIcon } from "./icons";
import { SITE } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={SITE.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      className="on-dark fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-green text-white shadow-[0_8px_22px_rgba(31,175,84,0.45)]"
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
