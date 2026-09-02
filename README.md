# Mary Matha — Real Estate & Construction

Single-page marketing site for Mary Matha (Vasai–Virar), assembled from the four
design options in [`designs/`](designs/) against one canonical token system
(Option 1, "The Nameplate").

- **Next.js 16 (App Router) + React 19 + TypeScript**, pnpm
- **Tailwind v4** — design tokens live as CSS variables in
  [`app/globals.css`](app/globals.css) (`@theme`). Change the palette there and
  it changes everywhere.
- **TinaCMS**, git-backed, Tina Cloud for the editing session
- Deploys to **Vercel**

## Getting started

```bash
pnpm install
pnpm dev          # tinacms dev + next dev
```

- Site: http://localhost:3000
- CMS: http://localhost:3000/admin

## Environment variables

Copy into `.env.local` (already gitignored):

| Variable | Needed for | Notes |
|---|---|---|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Tina Cloud editing | from the Tina Cloud project |
| `TINA_TOKEN` | Tina Cloud editing | read-only content token |
| `NEXT_PUBLIC_TINA_BRANCH` | Tina Cloud editing | usually the deploy branch |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Enquiry form | public access key from web3forms.com — **not yet set** |
| `NEXT_PUBLIC_SITE_URL` | canonical URLs, sitemap, JSON-LD | set to the real domain before launch |

## Content model

Five Tina collections, all stored as JSON under [`content/`](content/):

| Collection | Path | Drives |
|---|---|---|
| Featured Properties | `content/featured-properties/` | the Featured Properties cards |
| Ongoing Projects | `content/ongoing-projects/` | "Ongoing Projects" grid + modal |
| Completed Projects | `content/completed-projects/` | "Completed Projects" grid + modal |
| Number Stats | `content/stats/stats.json` | the maroon count-up band |
| Testimonials | `content/testimonials/` | the testimonial carousel |

Header, hero, services, workflow, the enquiry form and the footer are **static** —
their copy lives in [`lib/site.ts`](lib/site.ts) and the section components.

### How content is read

The public site reads the JSON files directly with `fs` at build time
([`lib/content.ts`](lib/content.ts)) — no Tina GraphQL runtime, no client
bundle, nothing to hydrate. Tina's `/admin` still edits those same files and
commits them to git; a push triggers a rebuild. Visual (in-context) editing is
not wired up — editing happens through the `/admin` forms.

### Why Ongoing and Completed are two collections, not one

They share a shape but diverge in ways that matter to the editor:

- **Different required fields** — ongoing carries *% complete* / *expected
  completion*; completed carries *year handed over* / *build duration*.
- **Different editing rhythm** — ongoing needs regular status edits; completed is
  written once and rarely touched.
- **Different default sort** — ongoing by recency, completed by year, newest
  first.
- A single `status` toggle risks a half-set value hiding a project or breaking a
  list filter.

The common fields are defined once (`sharedProjectFields` in
[`tina/config.ts`](tina/config.ts)) so the two schemas stay in step.

### Images & video

- Images go through Tina media into `public/uploads/` and render with
  `next/image` inside aspect-ratio boxes (no layout shift). Keep files small —
  this is a git repo and the audience is on Indian mobile data.
- **Video is a URL field**, not a file. Paste a YouTube or Vimeo link; it embeds
  in the project modal. Don't commit video.
- Every image slot that has no art yet renders a marked `Placeholder`. Search the
  codebase for `Placeholder` / `placeholder` before launch.

## Before launch — checklist

- [ ] Set `NEXT_PUBLIC_WEB3FORMS_KEY` and test an enquiry end to end
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain
- [ ] Replace the real MahaRERA number (`lib/site.ts`, `SITE.maharera`)
- [ ] Replace placeholder stats, testimonials, properties and projects
- [ ] Add the two hero images and the office map embed
- [ ] Have `Privacy Policy` and `Terms of Use` reviewed by a legal advisor
- [ ] Add real `opengraph-image` / `favicon`
