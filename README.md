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

The app now pushes the following events for GTM/GA4:

- `cta_click` (buttons with `trackingId`)
- `phone_call_click`
- `whatsapp_click`
- `map_directions_click`
- `email_click`

Primary implementation files:

- `src/app/layout.tsx`
- `src/components/ui/button.tsx`
- `src/components/layout/MobileStickyFooter.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`

## Notes

- Existing admin hook warning in `src/app/admin/page.tsx` is pre-existing and not part of SEO changes.
- Local dispatch/business claims should always reflect real operational capacity and hours.
