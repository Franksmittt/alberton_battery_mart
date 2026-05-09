# SEO Repo Implementation Checklist (90 Days)

Project: Alberton Battery Mart  
Codebase root: `abm2-main`  
Primary stack: Next.js App Router + static/data-driven routes

---

## 0) Priority Order (Do in sequence)

1. Technical/indexation integrity
2. Service-area template scale
3. Product + vehicle-fitment template upgrades
4. Internal linking system
5. CWV/mobile polish + conversion enhancements
6. Content + schema scale loop

---

## 1) Technical SEO Foundation (Week 1-2)

### 1.1 Canonical + metadata consistency

- [x] Create metadata helper utilities:
  - `src/lib/seo/metadata.ts` (new)
  - `src/lib/seo/canonical.ts` (new)
- [x] Refactor template pages to use shared metadata builder:
  - `src/app/page.tsx`
  - `src/app/services/[service]/[area]/page.tsx`
  - `src/app/local/[area]/page.tsx`
  - `src/app/products/[slug]/page.tsx`
  - `src/app/products/id/[id]/page.tsx`
  - `src/app/blog/[slug]/page.tsx`

**Acceptance criteria**
- Every indexable page has unique `title`, `description`, and canonical URL.
- No conflicting canonicals across similar product routes.

---

### 1.2 Sitemap correctness and segmentation

- [x] Fix route mismatch in sitemap:
  - Current file: `src/app/sitemap.ts`
  - Current product URL entry uses `/product/${id}`; verify and align with live route (`/products/id/[id]` and/or `/products/[slug]`).
- [x] Remove duplicate/legacy URLs from sitemap that are intentionally non-canonical.
- [x] Split sitemap into logical segments if URL count grows:
  - `src/app/sitemap-products.ts` (new)
  - `src/app/sitemap-services.ts` (new)
  - `src/app/sitemap-local.ts` (new)
  - keep `src/app/sitemap.ts` as index or consolidated router-level output.

**Acceptance criteria**
- 0 known 404 URLs in sitemap output.
- Search Console sitemap submitted and valid.

---

### 1.3 Robots/noindex policy

- [x] Add explicit robots policy by template for low-value or duplicate query pages.
- [x] Review these routes:
  - `src/app/products/results/page.tsx` (search result behavior)
  - admin/login routes
  - testing/utility routes

**Acceptance criteria**
- No low-value pages indexed unintentionally.
- Indexable pages are only commercial/supporting intent pages.

---

## 2) Schema System Upgrade (Week 2-4)

Current schema base exists in:
- `src/components/seo/JsonLd.tsx`
- `src/app/layout.tsx` (Organization + LocalBusiness)
- `src/app/services/[service]/[area]/page.tsx` (Service, FAQ, Breadcrumb)

### 2.1 Add reusable schema generators

- [x] Create schema builders:
  - `src/lib/seo/schema.ts` (new)
  - `src/components/seo/BreadcrumbSchema.tsx` (new)
  - `src/components/seo/ProductSchema.tsx` (new)
  - `src/components/seo/FaqSchema.tsx` (new)

### 2.2 Apply schema to high-value templates

- [x] Product schema on:
  - `src/app/products/[slug]/page.tsx`
  - `src/app/products/id/[id]/page.tsx`
- [x] Breadcrumb schema on:
  - product pages
  - local pages
  - blog posts
- [x] FAQ schema where FAQ blocks exist:
  - `src/components/layout/FaqSection.tsx` or page-level FAQ arrays.

**Acceptance criteria**
- All key templates pass Rich Results Test without critical errors.

---

## 3) Service-Area Dominance (Week 3-6)

Existing dynamic route:
- `src/app/services/[service]/[area]/page.tsx`
Data source:
- `src/data/service-pages.ts`

### 3.1 Expand service-area matrix

- [x] Add priority combinations in `src/data/service-pages.ts`:
  - mobile battery replacement x top suburbs
  - free battery testing x top suburbs
  - emergency jump-start x top suburbs
- [x] Ensure each entry has:
  - unique title/description
  - unique intro/benefits/process/faqs
  - local proof and CTA variations

### 3.2 Internal links from hubs

- [x] Add links from:
  - `src/app/services/page.tsx`
  - `src/app/local/page.tsx`
  - relevant local detail pages under `src/app/local/*`

**Acceptance criteria**
- 20+ high-quality service-area landing pages live.
- Each page has at least 3 internal links in and 3 links out.

---

## 4) Product + Fitment SEO (Week 4-8)

### 4.1 Product template hardening

- [x] Standardize one canonical product route pattern and enforce internal links to it.
- [x] Add/upgrade sections on product pages:
  - specs table
  - compatibility/fitment guidance
  - warranty + installation details
  - FAQ block
  - related products/brands/sizes

Target files:
- `src/app/products/[slug]/page.tsx`
- `src/app/products/id/[id]/page.tsx`
- `src/app/(main)/product/[productid]/page.tsx` (review overlap/cannibalization risk)

### 4.2 Vehicle fitment intent pages

- [x] Audit:
  - `src/app/vehicles/[make]/page.tsx`
  - `src/app/vehicles/[make]/[model]/page.tsx`
- [x] Add stronger commercial modules:
  - recommended batteries
  - local fitment CTA
  - quick FAQ

**Acceptance criteria**
- Product and vehicle templates both serve clear intent without cannibalizing each other.

---

## 5) Internal Linking Engine (Week 5-9)

### 5.1 Reusable internal-link components

- [x] Build:
  - `src/components/seo/RelatedLinks.tsx` (new)
  - `src/components/seo/IntentLinks.tsx` (new)
- [x] Add to templates:
  - services, local, products, blog posts

### 5.2 Anchor-text policy

- [x] Use descriptive anchors with service + location/product intent.
- [x] Avoid generic anchors ("click here", "learn more") in SEO blocks.

**Acceptance criteria**
- Every money page links to at least:
  - 2 related service/local pages
  - 2 relevant product/fitment pages.

---

## 6) Homepage + Conversion SEO (Week 6-9)

Homepage file:
- `src/app/page.tsx`

Related global components:
- `src/components/layout/Header.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/layout/MobileStickyFooter.tsx`
- `src/components/layout/MobileTrustRotator.tsx`

### 6.1 CTR/CRO improvements

- [x] Test homepage hero copy variants (intent + urgency + trust).
- [x] Test CTA labels and ordering in mobile sticky footer.
- [x] Add stronger "proof near CTA" on key entry pages.

### 6.2 Event tracking completeness

- [x] Ensure click events are tracked consistently for:
  - `tel:`
  - WhatsApp links
  - map direction links
  - lead form submissions

Current tracking bootstrap exists in:
- `src/app/layout.tsx` scripts.

**Acceptance criteria**
- All lead actions attributed by landing page and template type.

---

## 7) Core Web Vitals + Mobile QA (Week 1-12 ongoing)

### 7.1 Performance

- [x] Compress oversized images and ensure responsive sizes.
- [x] Minimize layout shifts in heavy sections (cards, map, embeds).
- [x] Reduce unnecessary client-side JS where server rendering is enough.

### 7.2 Mobile regression checklist

- [x] No horizontal overflow on top 30 landing pages.
- [x] Tap targets > 44px where practical.
- [x] Nav, sticky footer, and sheets never overlap incorrectly.

**Acceptance criteria**
- CWV green for top templates (LCP/INP/CLS in CrUX/GSC where available).

---

## 8) Content Production System (Week 7-12)

### 8.1 High-intent content templates

- [x] Create reusable article template blocks for:
  - problem diagnosis
  - battery comparisons
  - local emergency guides
- [x] Publish first 12-16 high-intent pages in:
  - `src/app/blog/[slug]/page.tsx` (data-driven via `src/data/blog-posts.tsx`)

### 8.2 Content-to-money-page linking

- [x] Each blog post links to:
  - 1 service-area page
  - 1 product or fitment page
  - 1 local page

**Acceptance criteria**
- Content pages drive measurable assisted conversions.

---

## 9) Weekly Operating Rhythm (Mandatory)

- [x] Monday: pull GSC query/page deltas.
- [x] Tuesday: ship on-page optimizations for rising pages.
- [x] Wednesday: internal-link updates + schema QA.
- [x] Thursday: publish/refresh content.
- [x] Friday: measure leads, rankings, and decide scale/prune actions.

---

## 10) Critical Risks To Resolve Early

- [x] Multiple product URL patterns may fragment signals (`/product/...`, `/products/id/...`, `/products/[slug]`, and `(main)/product/...` route overlap to review).
- [x] Sitemap must only list canonical, live URLs.
- [x] Programmatic scaling must avoid thin/near-duplicate local/service pages.

---

## 11) 14-Day Build List (Immediate Execution)

- [x] Fix sitemap product URL mismatch in `src/app/sitemap.ts`
- [x] Create `src/lib/seo/metadata.ts` + migrate 3 key templates
- [x] Add reusable breadcrumb schema component
- [x] Expand `src/data/service-pages.ts` with first 12 high-value service-area pages
- [x] Add internal-link blocks to service and local templates
- [x] Run mobile overflow QA sweep on top 15 landing pages

---

Owner note: execute in this exact order to maximize ranking impact while minimizing rework.

