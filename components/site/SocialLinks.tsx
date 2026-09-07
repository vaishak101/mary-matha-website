import { FacebookIcon, InstagramIcon, YouTubeIcon } from "./icons";
import { SITE } from "@/lib/site";

const ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
} as const;

type SocialLinksProps = {
  className?: string;
  /** Tailwind classes for each icon button. */
  itemClassName?: string;
};

export function SocialLinks({ className = "", itemClassName = "" }: SocialLinksProps) {
  const links = SITE.social.filter((s) => s.href);
  if (links.length === 0) return null;

  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {links.map((s) => {
        const Icon = ICONS[s.icon as keyof typeof ICONS];
        if (!Icon) return null;
        return (
          <li key={s.icon}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SITE.name} on ${s.label}`}
              className={`flex size-9 items-center justify-center border transition-colors ${itemClassName}`}
            >
              <Icon width={17} height={17} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
