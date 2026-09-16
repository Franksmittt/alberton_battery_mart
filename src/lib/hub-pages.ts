import { PAGE_COPY } from "@/lib/store-positioning";
import { BASE_URL } from "@/lib/seo-constants";

export type HubPageConfig = {
  path: string;
  title: string;
  description: string;
  hasFaq?: boolean;
  schemaType?: "WebPage" | "ContactPage" | "FAQPage" | "CollectionPage";
};

/** Primary marketing hub pages for GSC / Lighthouse / axe quality gate */
export const HUB_PAGES: HubPageConfig[] = [
  {
    path: "/",
    title: PAGE_COPY.home.title,
    description: PAGE_COPY.home.description,
    schemaType: "WebPage",
  },
  {
    path: "/about",
    title: PAGE_COPY.about.title,
    description: PAGE_COPY.about.description,
    schemaType: "WebPage",
  },
  {
    path: "/contact",
    title: PAGE_COPY.contact.title,
    description: PAGE_COPY.contact.description,
    schemaType: "ContactPage",
  },
  {
    path: "/services",
    title: PAGE_COPY.services.title,
    description: PAGE_COPY.services.description,
    schemaType: "WebPage",
  },
  {
    path: "/products",
    title: "Batteries for Sale in Alberton | Car, Truck, Motorcycle, Solar",
    description:
      "Browse all batteries at Alberton Battery Mart. We stock Willard, Exide, & Enertec for cars, trucks, motorcycles, and solar inverters. Free fitment & testing.",
    schemaType: "CollectionPage",
  },
  {
    path: "/products/brand/power-plus",
    title: "Power Plus Batteries in Alberton | Alberton Battery Mart",
    description:
      "Shop Power Plus car batteries in Alberton with on-site testing, same-day fitment, and warranty from R1,150. Drive in to New Redruth.",
    schemaType: "CollectionPage",
  },
  {
    path: "/products/brand/eco-plus",
    title: "Eco Plus Batteries in Alberton | Alberton Battery Mart",
    description:
      "Shop Eco Plus car batteries in Alberton with on-site testing, same-day fitment, and warranty from R1,050. Drive in to New Redruth.",
    schemaType: "CollectionPage",
  },
  {
    path: "/testing",
    title: "Free Battery, Starter & Alternator Test in Alberton | Alberton Battery Mart",
    description:
      "Get a 100% free, no-obligation battery, starter, and alternator test at our Alberton store. We only sell you a battery if you actually need one.",
    schemaType: "WebPage",
  },
  {
    path: "/quote",
    title: "Solar & Inverter Quote Alberton | Alberton Battery Mart",
    description:
      "Request a free quote for solar, inverter, or bulk battery orders in Alberton. Our specialists will design a custom power solution for you.",
    schemaType: "WebPage",
  },
  {
    path: "/faq",
    title: "FAQ - Alberton Battery Mart | Free Testing & Fitment",
    description: PAGE_COPY.faq.description,
    hasFaq: true,
    schemaType: "FAQPage",
  },
  ...["616", "619", "628", "646", "652", "658", "668"].map(
    (code): HubPageConfig => ({
      path: `/${code}-car-battery`,
      title: `${code} Car Battery Alberton | In Stock | Free Fitment`,
      description: `${code} car battery in Alberton from R1,050 fitted with free alternator testing and warranty. Drive in to New Redruth or call 010 109 6211 for stock.`,
      hasFaq: true,
      schemaType: "WebPage",
    })
  ),
  {
    path: "/agm-battery",
    title: "AGM Battery Alberton | Start-Stop Fitment & BMS Coding",
    description:
      "AGM batteries in Alberton for BMW, Mercedes and start-stop cars. Stock, BMS coding, and same-day fitment at 28 St Columb Rd, New Redruth.",
    hasFaq: true,
    schemaType: "WebPage",
  },
  {
    path: "/efb-battery",
    title: "EFB Battery Alberton | Start-Stop Fitment",
    description:
      "EFB batteries in Alberton for Polo, Ranger, Tucson and other start-stop cars. Same-day fitment and testing at 28 St Columb Rd, New Redruth.",
    hasFaq: true,
    schemaType: "WebPage",
  },
  {
    path: "/start-stop-battery",
    title: "Start-Stop Battery Alberton | AGM & EFB",
    description:
      "Start-stop battery replacement in Alberton. AGM and EFB in stock with BMS coding for BMW, Mercedes, VW, and SUVs. Drive in to New Redruth.",
    hasFaq: true,
    schemaType: "WebPage",
  },
  {
    path: "/visit",
    title: PAGE_COPY.visit.title,
    description: PAGE_COPY.visit.description,
    hasFaq: true,
    schemaType: "WebPage",
  },
  {
    path: "/warranty",
    title: PAGE_COPY.warranty.title,
    description: PAGE_COPY.warranty.description,
    hasFaq: true,
    schemaType: "WebPage",
  },
  {
    path: "/car-battery-guide",
    title: PAGE_COPY.guide.title,
    description: PAGE_COPY.guide.description,
    hasFaq: true,
    schemaType: "WebPage",
  },
];

export const HUB_PATHS = HUB_PAGES.map((h) => h.path);

export const DEFAULT_HUB_RELATED_LINKS = [
  { href: "/visit", label: "Visit the shop", description: "Directions to 28 St Columb Rd, parking, walk-in hours." },
  { href: "/testing", label: "Free Battery Testing", description: "Drive in for a free 3-point diagnostic test." },
  { href: "/warranty", label: "Warranty", description: "Up to 36 months on named premium brands." },
  { href: "/car-battery-guide", label: "Battery guide", description: "Size, CCA, AGM vs EFB — how to choose." },
  { href: "/agm-battery", label: "AGM Batteries", description: "BMW, Mercedes, and start-stop AGM with BMS coding." },
  { href: "/652-car-battery", label: "652 Car Battery Hub", description: "Popular size — live fitted prices." },
  { href: "/products", label: "Browse All Batteries", description: "Willard, Exide, Enertec, and more." },
  { href: "/faq", label: "Battery FAQs", description: "Walk-ins, warranty, and testing answers." },
];

export function hubAbsoluteUrl(path: string): string {
  return `${BASE_URL}${path === "/" ? "" : path}`;
}

/** Schema @id prefixes checked by verify-hub-gsc to avoid duplicate JSON-LD */
export const EXPLICIT_SCHEMA_ID_PREFIXES = [
  "page-jsonld",
  "breadcrumb-schema",
  "contact-schema",
  "service-schema",
  "faq-page-schema",
  "faq-schema",
  "localbusiness",
  "hub-localbusiness",
  "organization",
  "website-schema",
  "howto-schema",
  "visit-howto-schema",
  "visit-faq-schema",
  "warranty-faq-schema",
  "guide-faq-schema",
];
