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
    title: "Alberton Battery Mart | Mobile Battery Replacement & Fitment Service",
    description:
      "Fast mobile battery replacement in Alberton, New Redruth, and Meyersdal. Willard & Exide in stock. Free fitment, testing, and warranty. Call 010 109 6211.",
    schemaType: "WebPage",
  },
  {
    path: "/about",
    title: "About Alberton Battery Mart | Your Local Battery Experts",
    description:
      "Learn about Alberton Battery Mart. We are your local, multi-brand battery specialists offering expert advice, free fitment, and mobile callouts in Alberton.",
    schemaType: "WebPage",
  },
  {
    path: "/contact",
    title: "Contact Alberton Battery Mart | Store Location & Hours",
    description:
      "Visit our store at 28 St Columb Rd, New Redruth, Alberton for a free battery test. Call 010 109 6211 or WhatsApp for quotes.",
    schemaType: "ContactPage",
  },
  {
    path: "/services",
    title: "Mobile Battery Replacement Service in Alberton | Alberton Battery Mart",
    description:
      "Fast mobile battery replacement and fitment in Alberton, New Redruth, & Meyersdal. We come to you. Free alternator testing with every callout.",
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
    description:
      "Answers to common battery questions in Alberton. Learn about our free callouts, warranty, and AGM/EFB batteries. Get expert advice.",
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
];

export const HUB_PATHS = HUB_PAGES.map((h) => h.path);

export const DEFAULT_HUB_RELATED_LINKS = [
  { href: "/contact", label: "Contact & Store Hours", description: "Visit us in New Redruth or call for availability." },
  { href: "/testing", label: "Free Battery Testing", description: "Drive in for a free 3-point diagnostic test." },
  { href: "/products", label: "Browse All Batteries", description: "Car, truck, motorcycle, and solar batteries." },
  { href: "/658-car-battery", label: "658 Car Battery Hub", description: "Popular heavy-duty size — in stock with fitment." },
  { href: "/646-car-battery", label: "646 Car Battery Hub", description: "AGM/EFB options for Start/Stop vehicles." },
  { href: "/faq", label: "Battery FAQs", description: "Warranty, fitment, and testing answers." },
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
];
