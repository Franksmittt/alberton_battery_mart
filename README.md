# Alberton Battery Mart Website

Next.js 14 website for Alberton Battery Mart with product catalog, service landing pages, and local SEO architecture for Alberton suburbs.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- pnpm

## Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Start dev server:

```bash
pnpm dev
```

3. Build production bundle:

```bash
pnpm build
```

4. Run lint checks:

```bash
pnpm lint
```

## Environment Variables

Create `.env.local` and set:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

If `NEXT_PUBLIC_GTM_ID` is not set, GTM script loading is automatically skipped.

## SEO and Local Coverage

- Dynamic suburb coverage hub: `/local`
- Dynamic suburb pages: `/local/[area]`
- Dynamic service pages: `/services/[service]/[area]`
- Sitemap includes static, product, vehicle, service, and suburb pages.
- Robots rules block low-value parameterized URLs (sort/filter/page/utm patterns).

Core local data files:

- `src/data/local-areas.ts`
- `src/data/service-pages.ts`
- `src/lib/seo-constants.ts`
- `SEO_KEYWORD_ROUTE_MAP.md`

## Tracking Events (dataLayer)

The app pushes the following events for GTM/GA4:

- `cta_click` (buttons with `trackingId`, including AdLandingHero)
- `phone_call_click` → Google Ads Conversion Action ID `6560221892`
- `map_directions_click` → Google Ads Conversion Action ID `6560221601`
- `whatsapp_click`
- `email_click`

Each conversion click also includes `conversion_action_id` and `google_ads_id` on the dataLayer row so GTM can map Custom Event triggers to Google Ads Conversion tags.

GTM setup (container UI):

1. Triggers: Custom Event = `phone_call_click`, `map_directions_click`, `whatsapp_click`, `cta_click`
2. Tags: Google Ads Conversion for Call → Action ID `6560221892`; Directions → Action ID `6560221601`
3. Optional Data Layer Variable: `conversion_action_id` (for a lookup table)

Primary implementation files:

- `src/lib/google-ads-conversions.ts`
- `src/lib/analytics.ts`
- `src/app/layout.tsx`
- `src/components/ui/button.tsx`
- `src/components/layout/AdLandingHero.tsx`
- `src/components/layout/MobileStickyFooter.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`

## Notes

- Existing admin hook warning in `src/app/admin/page.tsx` is pre-existing and not part of SEO changes.
- Local dispatch/business claims should always reflect real operational capacity and hours.
