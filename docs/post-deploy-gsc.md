# Post-deploy Google Search Console handoff

Use this checklist after each production deploy that touches hub pages, metadata, or structured data.

**Owner:** site admin / SEO  
**Site:** https://www.albertonbatterymart.co.za  
**Property:** Google Search Console (URL-prefix or domain property)

---

## 1. URL Inspection — request indexing (17 hub URLs)

In GSC → **URL Inspection**, paste each URL and click **Request indexing** after confirming “URL is on Google” or fixing any reported issues.

| # | URL |
|---|-----|
| 1 | https://www.albertonbatterymart.co.za/ |
| 2 | https://www.albertonbatterymart.co.za/about |
| 3 | https://www.albertonbatterymart.co.za/contact |
| 4 | https://www.albertonbatterymart.co.za/services |
| 5 | https://www.albertonbatterymart.co.za/products |
| 6 | https://www.albertonbatterymart.co.za/products/brand/power-plus |
| 7 | https://www.albertonbatterymart.co.za/products/brand/eco-plus |
| 8 | https://www.albertonbatterymart.co.za/testing |
| 9 | https://www.albertonbatterymart.co.za/quote |
| 10 | https://www.albertonbatterymart.co.za/faq |
| 11 | https://www.albertonbatterymart.co.za/616-car-battery |
| 12 | https://www.albertonbatterymart.co.za/619-car-battery |
| 13 | https://www.albertonbatterymart.co.za/628-car-battery |
| 14 | https://www.albertonbatterymart.co.za/646-car-battery |
| 15 | https://www.albertonbatterymart.co.za/652-car-battery |
| 16 | https://www.albertonbatterymart.co.za/658-car-battery |
| 17 | https://www.albertonbatterymart.co.za/668-car-battery |

**Tip:** Batch over 1–2 days if GSC rate-limits requests. Priority: `/`, `/testing`, `/quote`, size hubs used in ads.

---

## 2. Submit sitemap

1. GSC → **Sitemaps**
2. Submit: `https://www.albertonbatterymart.co.za/sitemap.xml`
3. Confirm child sitemaps parse without errors:
   - `/sitemap-products.xml`
   - `/sitemap-services.xml`
   - `/sitemap-local.xml`

Re-submit only after deploys that add/remove indexed URLs.

---

## 3. Rich results — FAQ

Confirm FAQ structured data in GSC → **Enhancements** → **FAQ** (or Rich Results Test):

| Page | What to verify |
|------|----------------|
| `/faq` | `FAQPage` schema; eligible for FAQ rich results |
| Size hubs (`/616-car-battery` … `/668-car-battery`) | FAQ blocks from `FaqSection` / hub JSON-LD render correctly |

**Rich Results Test:** https://search.google.com/test/rich-results

---

## 4. Core Web Vitals — field data lag

- **Lab scores** (PageSpeed Insights, Lighthouse) update immediately after deploy.
- **CrUX field data** in GSC → **Experience** → **Core Web Vitals** reflects real users over a **~28-day rolling window**.
- Do not expect CWV “Good” badges to change on deploy day; re-check after 4 weeks if homepage/hub perf work shipped.

---

## 5. Pre-handoff automated gates (CI / local)

Run before requesting indexing:

```bash
pnpm build
npm run audit:hub:gsc -- https://www.albertonbatterymart.co.za   # or: npx tsx scripts/verify-hub-gsc.ts <base>
node scripts/audit-hub-axe.mjs https://www.albertonbatterymart.co.za
node scripts/audit-hub-lighthouse.mjs --base https://www.albertonbatterymart.co.za
```

Expected: build PASS, GSC static PASS (17 hubs), axe 0 violations, Lighthouse no crashes and mobile perf ≥90% on all hub paths.

---

## 6. Ads-critical URLs — do not break

Smoke-test after deploy (must stay working):

- `/whatsapp` → `27823046926`
- `/power-plus`, `/eco-plus` → 308 brand pages
- `/store-hours` → `/contact#hours`
- GTM + `AW-969671559` on `/`, `/testing`, `/616-car-battery`, `/quote`

---

*Last updated: deploy `1e4c0eb` — homepage perf + WCAG contrast.*
