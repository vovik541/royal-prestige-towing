# Royal Prestige Towing — website (Angular SSR)

Production implementation of the approved design (`../design-exploration/concept-01-refined/`).
Angular 21 LTS · standalone components · signals · SSR + prerendering + hydration · English / Ukrainian / Russian.

> Angular 22 requires Node ≥ 22.22.3; this machine runs Node 22.12, so the app uses Angular 21 LTS.
> After upgrading Node, `npx ng update @angular/core @angular/cli` moves it to 22.

## Run it

```bash
npm install            # .npmrc sets legacy-peer-deps (works around an npm 11.0.0 bug)
npm start              # dev server with SSR at http://localhost:4200/en/
npm run build          # regenerates sitemap/robots, builds, prerenders all 33 pages
npm run serve:ssr      # production server at http://localhost:4000 (PORT=… to change)
npm run images         # re-crop originals from the repo root into public/images (Python + Pillow)
```

Hosting: `dist/web/browser` is fully prerendered static HTML (any static host/CDN works);
`dist/web/server/server.mjs` adds the `/` → language redirect, real 404s and on-demand SSR.
Add the production domain to `security.allowedHosts` in `angular.json` (or `NG_ALLOWED_HOSTS`),
otherwise Angular refuses to server-render unknown hosts and falls back to client rendering.

## Structure

```
site.config.json            domain, indexability, page list (shared by app + sitemap script)
scripts/build-images.py     crop + WebP derivatives (480/800/full) + og image + photo-sizes.ts
scripts/generate-seo-files.mjs  sitemap.xml (with hreflang) and robots.txt
src/styles.css              design tokens and shared primitives (buttons, frame/tie-downs, bands)
src/app/core/config/site.ts business facts (unconfirmed = null) and QUOTE_ENDPOINT
src/app/core/i18n/          languages, I18n signal service (EN eager, UK/RU lazy)
src/app/core/seo/seo.ts     title, description, canonical, hreflang, OG/Twitter, JSON-LD
src/app/content/            en/uk/ru dictionaries, photo + service metadata
src/app/layout/             shell, header, language switcher, footer
src/app/shared/             photo, deck-line motif, reveal, lightbox, FAQ, owner profile,
                            area map, final CTA, breadcrumbs, service card
src/app/features/           home, services, service detail, our work, about, areas,
                            quote (configurator, form, model), not found
```

## Routes (each in /en, /uk, /ru — 33 prerendered pages)

| Path | Page |
|---|---|
| `/` | 302 → `/{last chosen language}/` (cookie `rpt_lang`) or `/en/` |
| `/:lang/` | Home |
| `/:lang/services` | Services overview |
| `/:lang/services/exotic-car-transport` | Luxury & exotic car transport |
| `/:lang/services/vehicle-transport` | Vehicle transportation |
| `/:lang/services/commercial-vehicle-transport` | Commercial vehicle transportation |
| `/:lang/services/equipment-machinery-hauling` | Equipment & machinery hauling |
| `/:lang/services/long-distance-transport` | Long-distance vehicle transportation |
| `/:lang/our-work` | Portfolio with filters and photo viewer |
| `/:lang/about` | About RPT and Serhii Hoida |
| `/:lang/service-areas` | Sacramento base, provisional coverage |
| `/:lang/contact` | Quote request (`?type=exotic\|everyday\|commercial\|machinery\|special`) |
| anything else | 404 page, HTTP 404, `noindex` |

## Translations

`content/i18n/en.ts` is the source; `uk.ts` and `ru.ts` are typed `Dict`, so a missing or extra
key fails the build — coverage is 100% by construction (navigation, content, services, forms,
validation, FAQ, metadata, alt text, ARIA labels). The language comes from the URL and is
resolved before render on server and client, so there is no flicker or hydration mismatch.
The switcher keeps the current page and query string. Ukrainian/Russian phrasing worth an owner
review: "Bay Area" rendered as "район Затоки (Сан-Франциско)" / "район залива"; hero line
"Кожен вантаж / веземо як McLaren." / "Каждый груз / везём как McLaren.".

## SEO

Per-route title/description, canonical, `hreflang` (en-US, uk, ru, x-default), Open Graph + Twitter
cards, `robots` meta, sitemap with alternates, robots.txt, semantic headings (one H1 per page),
breadcrumbs, internal linking between services, descriptive localized alt text.
JSON-LD: `AutomotiveBusiness` (name, owner, Sacramento only — no phone, address, hours or ratings),
`WebSite`, `WebPage`, `Service`, `BreadcrumbList`, `FAQPage`, `ImageGallery`, `AboutPage`, `Person`.
The domain is a placeholder (`royal-prestige-towing.example`) — set `siteUrl` in `site.config.json`.

## Quote request

Configurator → details → optional contact → review. Typed reactive forms, inline accessible
errors with focus management, no prices. `QUOTE_ENDPOINT` is `null`, so the review step states
that online submission isn't connected and the send button is disabled; visitors can copy their
request. Nothing claims a request was sent. To connect a backend: implement `POST /api/quote`
(see `src/server.ts`) accepting `QuoteRequest` (`features/quote/quote.model.ts`), then set
`QUOTE_ENDPOINT = '/api/quote'` and add success/error states.

## Still to confirm with the owner

Phone (the note's (916) 470-5606 is unverified and not shown) · email · production domain ·
coverage beyond Sacramento · owner-operated claims (Serhii quotes, loads and delivers himself;
wheel straps only) · enclosed transport, non-running vehicles, machinery weight/size limits ·
vehicle names in captions · use of the portrait · how quote requests should be delivered.
