import type { SVGProps } from "react";

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6.6 3.5 8.9 3c.5-.1 1 .2 1.2.7l1 3c.1.4 0 .9-.3 1.2L8.5 10.5a13 13 0 0 0 5 5l1.6-2.3c.3-.3.8-.5 1.2-.3l3 1c.5.2.8.7.7 1.2l-.5 2.3c-.1.5-.6.9-1.1.9A15.5 15.5 0 0 1 3.5 5.1c0-.5.4-1 .9-1.1Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" />
      <path d="M8.9 8.4c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4 0 .5l-.4.6c-.1.2-.2.3 0 .6a6 6 0 0 0 2.7 2.4c.3.1.4.1.6-.1l.6-.7c.2-.2.3-.2.6-.1l1.6.8c.2.1.4.2.4.4v.5c0 .5-.5 1.2-.8 1.3-.6.3-1.4.5-3-.1a9 9 0 0 1-4.4-3.9c-.4-.7-.8-1.6-.8-2.4 0-.9.4-1.4.7-1.8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  );
}

const brand = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
};

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...brand} {...props}>
      <path d="M14 8.5h2.5V5.3C16 5.1 14.9 5 13.9 5 11.4 5 10 6.5 10 9v2H7.5v3.3H10V22h3.3v-7.7H16l.5-3.3h-3.2V9.3c0-.5.4-.8 1.2-.8Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...brand} fill="none" {...props}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...brand} {...props}>
      <path d="M22 12s0-3.2-.4-4.7a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.5A2.6 2.6 0 0 0 2.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7c.3 1 1 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.5a2.6 2.6 0 0 0 1.8-1.8C22 15.2 22 12 22 12ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}
