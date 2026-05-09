# SEO Weekly Operating Rhythm

This is the execution system for ongoing SEO growth after the technical foundation is complete.

## Weekly targets

- Publish or refresh at least 2 high-intent pages per week.
- Improve CTR on at least 3 rising pages per week.
- Increase assisted conversion clicks (`tel:`, WhatsApp, map, form submit) week over week.
- Keep all updated pages valid for metadata, schema, and internal linking.

## Monday - Pull query/page deltas

## Inputs
- Google Search Console (last 7 days vs previous 7 days)
- GA4 or GTM lead events
- `src/app/sitemap.ts` and segmented sitemap files

## Actions
- Export top query and page deltas:
  - rising impressions + low CTR pages
  - ranking drops on high-intent terms
  - new queries with early traction
- Build this week's priority list:
  - 5 pages to optimize
  - 2 pages to publish/refresh
  - 3 internal linking opportunities

## Output
- Update "This Week Priorities" in this document.

## Tuesday - Ship on-page optimizations

## Actions
- Update metadata, title intent, and snippet quality on rising pages.
- Strengthen proof near CTAs where needed.
- Tighten intro paragraphs to match target query intent.
- Verify canonical and robots behavior on all changed templates.

## Relevant files
- `src/lib/seo/metadata.ts`
- `src/app/page.tsx`
- `src/app/services/[service]/[area]/page.tsx`
- `src/app/local/[area]/page.tsx`
- `src/app/blog/[slug]/page.tsx`

## Wednesday - Internal links + schema QA

## Actions
- Add or improve contextual links using intent anchors.
- Ensure each new/updated page links to:
  - one service page
  - one product/fitment page
  - one local page
- Validate JSON-LD output and breadcrumb consistency.

## Relevant files
- `src/components/seo/IntentLinks.tsx`
- `src/components/seo/RelatedLinks.tsx`
- `src/components/seo/BreadcrumbSchema.tsx`
- `src/components/seo/FaqSchema.tsx`
- `src/components/seo/ProductSchema.tsx`

## Thursday - Publish or refresh content

## Actions
- Publish at least 2 high-intent pages or refresh older pages with new sections.
- Use reusable block types:
  - problem diagnosis
  - battery comparisons
  - local emergency guides
- Confirm links and schema on each published post.

## Relevant files
- `src/data/blog-posts.tsx`
- `src/components/blog/HighIntentTemplateBlock.tsx`
- `src/app/blog/[slug]/page.tsx`

## Friday - Measure and decide scale/prune

## Actions
- Review lead events by landing page:
  - `phone_call_click`
  - `whatsapp_click`
  - `map_directions_click`
  - `form_submit`
  - `search_form_submit`
- Mark each edited/published page as:
  - scale (double down)
  - iterate (improve and retest)
  - prune/merge (thin or overlapping intent)
- Capture next week's top opportunities.

## Scorecard template (fill weekly)

Week of: `YYYY-MM-DD`

| Metric | Target | Actual | Status | Notes |
|---|---:|---:|---|---|
| Pages optimized (on-page) | 5 |  |  |  |
| Pages published/refreshed | 2 |  |  |  |
| Internal link blocks added | 3 |  |  |  |
| CTR wins (pages improved) | 3 |  |  |  |
| Assisted conversion clicks | +WoW |  |  |  |

## This Week Priorities

1.  
2.  
3.  
4.  
5.  

## QA gate before close of week

- Metadata and canonicals correct.
- No indexing of utility/admin/test pages.
- Schema valid on updated templates.
- No mobile overflow regressions on touched pages.
- Lead event tracking verified for all primary CTAs.
