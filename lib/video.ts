export type VideoSource =
  | { kind: "embed"; src: string }
  | { kind: "file"; src: string };

/**
 * Resolve a walkthrough-video value to something playable:
 * - a YouTube / Vimeo link  -> embedded player
 * - a direct video file URL (`.mp4` / `.webm` / …), including one uploaded
 *   through Tina's media manager (`/uploads/…`) or hosted on Cloudinary etc.
 *   -> a native <video> element
 */
export function resolveVideo(url: string | undefined): VideoSource | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (/\.(mp4|webm|ogv|ogg|mov|m4v)(\?.*)?$/i.test(trimmed) || trimmed.startsWith("/")) {
    return { kind: "file", src: trimmed };
  }

  const embed = toEmbedUrl(trimmed);
  return embed ? { kind: "embed", src: embed } : null;
}

/** Turn a YouTube / Vimeo watch URL into an embeddable player URL. */
export function toEmbedUrl(url: string | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v");
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
      }
      if (u.pathname.startsWith("/embed/")) return trimmed;
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/")[2];
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
      }
    }
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }
    if (host === "player.vimeo.com") return trimmed;
  } catch {
    return null;
  }
  return null;
}
