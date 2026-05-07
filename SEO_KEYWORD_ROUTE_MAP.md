# Alberton Battery Mart Keyword-to-Page Map

This file keeps local SEO execution aligned with actual routes.
Use it for content updates, internal links, and Search Console tracking.

## Emergency / Distress Intent

- `mobile battery replacement alberton` -> `/services/mobile-battery-replacement/alberton`
- `emergency jump start alberton` -> `/services/emergency-jump-start/alberton`
- `car won't start alberton` -> `/services/emergency-jump-start/alberton`
- `mobile battery fitment brackenhurst` -> `/services/mobile-battery-replacement/brackenhurst`
- `mobile battery fitment brackendowns` -> `/services/mobile-battery-replacement/brackendowns`
- `mobile battery fitment randhart` -> `/services/mobile-battery-replacement/randhart`
- `mobile battery fitment verwoerdpark` -> `/services/mobile-battery-replacement/verwoerdpark`
- `mobile battery fitment alberante` -> `/services/mobile-battery-replacement/alberante`
- `mobile battery fitment mayberry park` -> `/services/mobile-battery-replacement/mayberry-park`
- `mobile battery fitment eden park` -> `/services/mobile-battery-replacement/eden-park`

## Core Local Intent

- `battery replacement alberton central` -> `/local/alberton-central`
- `battery replacement meyersdal` -> `/local/meyersdal`
- `battery replacement new redruth` -> `/local/new-redruth`
- `car battery brackenhurst` -> `/local/brackenhurst`
- `car battery brackendowns` -> `/local/brackendowns`
- `car battery randhart` -> `/local/randhart`
- `car battery verwoerdpark` -> `/local/verwoerdpark`
- `car battery alrode` -> `/local/alrode`
- `car battery alberante` -> `/local/alberante`
- `car battery florentia` -> `/local/florentia`
- `car battery raceview` -> `/local/raceview`
- `car battery south crest` -> `/local/south-crest`
- `car battery mayberry park` -> `/local/mayberry-park`
- `car battery general alberts park` -> `/local/general-alberts-park`
- `car battery eden park` -> `/local/eden-park`

## Technical / Diagnostic Intent

- `free battery testing alberton` -> `/services/free-battery-testing/alberton`
- `free alternator testing alberton` -> `/services/free-battery-testing/alberton`
- `battery keeps dying alberton` -> `/services/free-battery-testing/alberton`
- `bms coding battery alberton` -> `/services/battery-fitment/meyersdal`

## Fleet / Commercial Intent

- `truck battery alrode` -> `/services/truck-battery-fitment/alrode`
- `fleet battery maintenance alrode` -> `/services/truck-battery-fitment/alrode`
- `commercial battery suppliers alrode` -> `/services/truck-battery-fitment/alrode`

## Product / Transactional Intent

- `willard battery alberton` -> `/products/brand/willard`
- `exide battery alberton` -> `/products/brand/exide`
- `automotive battery alberton` -> `/products/type/automotive`
- `truck battery alberton` -> `/products/type/truck-commercial`
- `motorcycle battery alberton` -> `/products/type/motorcycle`
- `deep cycle battery alberton` -> `/products/type/deep-cycle`

## Internal Linking Rules

- Every suburb page should link to:
  - `/services/mobile-battery-replacement/alberton`
  - `/services/free-battery-testing/alberton`
  - One adjacent suburb page
- Every service page should link to:
  - `/local`
  - At least 3 suburb service routes
  - Relevant product category route

## Tracking Rules (GTM/GA4)

- Track events: `phone_call_click`, `whatsapp_click`, `map_directions_click`, `cta_click`
- Mark `phone_call_click` and `whatsapp_click` as key events in GA4.
- Build weekly report segments by landing path prefix:
  - `/local/`
  - `/services/mobile-battery-replacement/`
  - `/services/truck-battery-fitment/`
