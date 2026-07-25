# Alberton Battery Mart — Template / Studio System

Adapted from the Raceview Motors template system for ABM products.

This project has (or will have) TWO separate studio lanes under `/studio`.
They look related but solve different jobs.

1. **SITE STUDIO (A/B/C)** — pick homepage / section UI directions *(planned)*
2. **MARKETING STORIES** — generate 9:16 Instagram/WhatsApp cards (PNG) from catalog products *(live)*

Studio routes are private pitch tools (`noindex`, robots disallow, soft password gate).
The live public site is unaffected by Story previews.

---

## 1) Site Studio — A / B / C section pickers *(next)*

### Purpose
Compare design directions for headers, heroes, trust, footer, etc. Lock winners for the real site.

### Planned location
- `/studio` hub card already reserved
- Future: `src/components/studio/locked.ts` + A/B/C component folders

Previewing another combo in studio must **not** change the live site until re-locked.

---

## 2) Marketing Story Templates — Products *(live)*

### Purpose
One-click social creatives: pick a battery from stock, pick a visual template, download a
**1080×1920 PNG** for Instagram / WhatsApp Stories.

### Where to open
- `/studio` — hub
- `/studio/marketing` — product Stories studio
- Legacy `/login` redirects to `/studio`

### Soft password
- Default: same studio password as before (`85879`)
- Override with `NEXT_PUBLIC_STUDIO_PASSWORD`

### UI
`src/components/studio/marketing/ProductMarketingStudio.tsx`

### Data
- Source: `src/data/products.ts` (`ALL_PRODUCTS`)
- Builder: `src/components/studio/marketing/storyData.ts` → `buildStoryView(product)`

### Auto-filled fields (`StoryProductView`)
- Photo (`imagePath`, proxied when remote)
- Title product name
- Brand / SKU / category
- Price `sellingPrice_OUTPUT`
- Capacity Ah
- Cranking CCA
- Warranty months
- Tech AGM / EFB / Lead Acid / Deep Cycle / etc.
- Fits `popularFits`
- Badge category-aware (`START/STOP READY`, `FLEET / TRUCK`, …)
- Phone CTA

### Product templates (5)
Registry: `STORY_TEMPLATES` in `storyData.ts`

| id | name | thesis |
|---|---|---|
| clean | Clean Special | White card · big price · clear specs |
| brand | Brand Red | ABM red field · high urgency · phone CTA |
| cinema | Cinema Dark | Full-bleed product · desire first |
| specs | Spec Sheet | Technical trust · Ah / CCA / warranty |
| callout | Mobile Callout | We come to you · Alberton dispatch |

Components live in `src/components/studio/marketing/templates/`.

---

## 3) Shared story pipeline

### Canvas size
`1080 × 1920` px (9:16 Stories)

Constants: `STORY_WIDTH` / `STORY_HEIGHT` in `storyData.ts`

### Preview
Studio scales the full-size canvas down (~0.38×) for on-screen preview.
Export always uses full 1080×1920.

### Download
Library: `modern-screenshot` (`domToPng`)

Flow:
1. User clicks **Download PNG**
2. Wait a tick for images to paint
3. Rasterize the canvas DOM node at 1× scale
4. Browser downloads `alberton-story-*.png`

### Image proxy
Route: `/api/proxy-image?url=...`  
File: `src/app/api/proxy-image/route.ts`

Why: browsers block canvas export of cross-origin images (CORS taint).  
Local `/images/...` paths are used directly. Remote catalog URLs go through the proxy.

Allowed hosts include:
- `albertonbatterymart.co.za` / `www.albertonbatterymart.co.za`
- Vercel Blob hosts
- Googleusercontent (Drive-imported assets)

Templates use plain `<img>` + **inline styles** (export-safe; avoid Tailwind inside the canvas).

---

## 4) How to add a new story template

1. Add `id` to `StoryTemplateId` + `STORY_TEMPLATES` in `storyData.ts`
2. Create `StoryXxx.tsx` under `templates/` that accepts `{ view: StoryProductView }`
3. Use inline styles + fixed 1080×1920
4. Use `<img>` (not `next/image`)
5. Wire the component into `ProductMarketingStudio.tsx` switch

### Type size tip
Design for phone readability at full 1080 export. Preview is scaled down, so type that looks
"OK" in preview can still be too small on a real phone. Prefer large labels for secondary copy;
hero title roughly 56–74px+.

---

## 5) Quick file map

```txt
src/app/studio/layout.tsx                 noindex + soft gate
src/app/studio/page.tsx                   studio hub
src/app/studio/marketing/page.tsx         product stories route
src/components/studio/StudioGate.tsx      password gate
src/components/studio/marketing/
  ProductMarketingStudio.tsx              UI + download
  storyData.ts                            types, finance-free product view, proxy helper
  templates/Story*.tsx                    visual templates
src/app/api/proxy-image/route.ts          CORS-safe image proxy
src/lib/studio-auth.ts                    password + session key
STUDIO_TEMPLATE_SYSTEM.md                 this doc
```

---

## 6) Client-facing one-liner

**Site studio** = choose how the dealership website looks (locked for go-live).  
**Story studio** = pick a battery, pick a look, download a Story, post tonight.
