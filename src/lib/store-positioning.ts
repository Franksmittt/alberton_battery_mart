import { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE } from "@/lib/seo-constants";

/** Meta descriptions must stay 120–160 characters for the hub GSC gate. */
export const PAGE_COPY = {
  home: {
    title: HOME_PAGE_TITLE,
    description: HOME_PAGE_DESCRIPTION,
  },
  about: {
    title: "About Alberton Battery Mart | Independent Battery Shop",
    description:
      "Independent multi-brand battery shop at 28 St Columb Rd, New Redruth. Willard, Exide, Enertec, free testing, and same-day fitment. Call 010 109 6211.",
  },
  contact: {
    title: "Visit Alberton Battery Mart | 28 St Columb Rd Hours",
    description:
      "Walk in at 28 St Columb Rd, New Redruth. Phones from 07:30, shop 08:00–17:00 weekdays, Saturday 08:00–12:00. Call 010 109 6211.",
  },
  services: {
    title: "Battery Testing & Fitment in Alberton | Drive-In Shop",
    description:
      "Drive-in battery testing and same-day fitment at 28 St Columb Rd. Free diagnostics, AGM coding, mobile callouts on request. Call 010 109 6211.",
  },
  visit: {
    title: "Visit Alberton Battery Mart | 28 St Columb Rd",
    description:
      "How to reach 28 St Columb Rd from Voortrekker, Meyersdal, and Brackenhurst. Park, walk in, free test, fitted while you wait. Call 010 109 6211.",
  },
  warranty: {
    title: "Car Battery Warranty Alberton | Up to 36 Months",
    description:
      "Up to 36 months on Willard EFB and Enertec AGM, registered at fitment in New Redruth. Named manufacturer cover, not a house brand. Call 010 109 6211.",
  },
  guide: {
    title: "How to Choose a Car Battery in Alberton",
    description:
      "Size, CCA, AGM vs EFB, scrap exchange, and when a standard battery is wrong. Independent advice from 28 St Columb Rd. Call 010 109 6211.",
  },
  fail: {
    title: "Why Car Batteries Fail in Alberton | Highveld Heat",
    description:
      "Heat, short trips, and start-stop cycling kill batteries on the Highveld. Test first at 28 St Columb Rd before you buy. Call 010 109 6211.",
  },
  recycle: {
    title: "Recycle a Car Battery in Alberton | Free Scrap Take-In",
    description:
      "Bring the old battery to 28 St Columb Rd. We take scrap on every fitted job and recycle it properly. No dumping fee. Call 010 109 6211.",
  },
  faq: {
    title: "FAQ - Alberton Battery Mart | Free Testing & Fitment",
    description:
      "Walk-in hours, 36-month warranties, AGM coding, and fitted prices at 28 St Columb Rd, New Redruth. Independent battery shop. Call 010 109 6211.",
  },
} as const;
