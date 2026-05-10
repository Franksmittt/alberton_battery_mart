# Local SEO content map

This map keeps local SEO expansion focused on useful, indexable pages rather
than near-duplicate doorway URLs.

## Primary route families

| Intent | Route pattern | Purpose |
| --- | --- | --- |
| Service + suburb | `/services/[service]/[area]` | Main money pages for mobile replacement, free testing, jump-start, fleet, and premium fitment. |
| Suburb hub | `/local/[area]` and curated `/local/*` pages | Local proof, landmarks, response windows, and links into service pages. |
| Vehicle fitment | `/vehicles/[make]/[model]` | Vehicle-specific battery recommendations and links into service areas. |
| Product code/size | `/products/size/[code]` | SKU/code demand like 652, 646, 658, AGM/EFB variants, and service CTAs. |
| Product brand/type | `/products/brand/[brandName]`, `/products/type/*` | Battery category and brand demand with links into service pages. |

## Current high-priority service coverage

The data-driven service route now covers these high-intent combinations:

- `mobile-battery-replacement` across all local area data slugs plus Alberton Central, New Redruth, and Meyersdal.
- `free-battery-testing` across all local area data slugs plus Alberton Central, New Redruth, and Meyersdal.
- `emergency-jump-start` across all local area data slugs plus Alberton Central, New Redruth, and Meyersdal.
- `truck-battery-fitment/alrode` for the industrial/fleet intent.
- `battery-fitment/meyersdal` for AGM/EFB, premium vehicle, and coding intent.

## Keyword clusters owned by the new structure

Examples of target clusters now mapped to indexable pages:

- Mobile battery replacement Alberton Central
- Mobile battery replacement New Redruth
- Mobile battery replacement Meyersdal
- Free battery testing New Redruth
- Free battery testing Meyersdal
- Emergency jump-start Alberton Central
- Truck battery fitment Alrode
- AGM battery fitment Meyersdal
- BMW battery coding Meyersdal
- Toyota Hilux battery Alberton
- Ford Ranger battery Alberton
- 652 battery replacement Alberton

## Expansion rules

1. Prefer strengthening existing route families before creating one-off URLs.
2. Add a new suburb service page only when it has unique roads, landmarks,
   response windows, FAQs, or vehicle patterns.
3. Use `ItemList` schema for collection/list pages and reserve `Product` schema
   for pages with complete product offer data.
4. Every indexable page should have at least one path to:
   - a service page,
   - a local area page,
   - a vehicle or product detail page,
   - and a conversion action.
5. Do not create every possible combination of service x vehicle x product x
   suburb unless the page has unique, helpful content.
