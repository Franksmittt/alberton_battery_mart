import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BATTERY_619_HUB_FAQ, BATTERY_619_PRICE_ROWS } from "@/data/battery-619";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import {
  Battery619FaqSection,
  Battery619Hero,
  Battery619IntentLinks,
  Battery619TrustStrip,
} from "@/components/content/Battery619Sections";

const PRICE_FAQ = [
  {
    question: "619 battery price Midas?",
    answer:
      "Midas typically lists shelf-price 619 batteries around R 1 200–R 1 350 without fitment or charging-system diagnostics. Our fitted price from R 1 450 includes installation, alternator test, and warranty registration.",
  },
  {
    question: "619 battery price Goldwagen?",
    answer:
      "Goldwagen shelf prices are similar to Midas for 619-size batteries. Alberton Battery Mart includes mobile fitment, scrap exchange, and free testing in our fitted price.",
  },
  {
    question: "Best price for 619 car battery in Alberton?",
    answer:
      "The best value is not always the lowest shelf price. Our R 1 450 fitted price covers Willard 619 or Exide 619CE with up to 25-month warranty, professional installation, and on-site diagnostics.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "619 Battery Price Comparison Alberton | Midas vs Fitted Price",
  description:
    "Compare 619 battery prices: Alberton Battery Mart fitted price vs Midas, Goldwagen, and Makro shelf prices. Willard 619 & Exide 619CE from R 1 450 with free fitment.",
  path: "/619-car-battery-price",
  keywords: [
    "619 battery price comparison",
    "619 battery price midas",
    "619 battery price goldwagen",
    "best price 619 car battery",
    "cheap 619 car battery alberton",
    "619 battery trade-in discounts",
  ],
});

export default function Battery619PricePage() {
  const allFaqs = [...PRICE_FAQ, ...BATTERY_619_HUB_FAQ.slice(0, 2)];

  return (
    <div className="space-y-4 pb-16">
      <FaqSchema id="619-price-faq" items={allFaqs} />
      <BreadcrumbSchema
        id="619-price-breadcrumb"
        items={[
          { name: "Home", item: "/" },
          { name: "619 Car Battery", item: "/619-car-battery" },
          { name: "619 Price Guide", item: "/619-car-battery-price" },
        ]}
      />

      <Battery619Hero
        title="619 Battery Price Guide — Alberton"
        subtitle="Honest comparison of fitted prices vs Midas, Goldwagen, and online shelf prices. Includes what you actually get with mobile fitment and free diagnostics."
        trackingId="619-price-call"
      />
      <Battery619TrustStrip />

      <section className="container py-10">
        <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-6 overflow-x-auto">
          <h2 className="text-3xl font-bold text-foreground">619 Battery Price Comparison</h2>
          <table className="w-full min-w-[640px] text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 font-bold">Retailer</th>
                <th className="py-3 pr-4 font-bold">Willard 619</th>
                <th className="py-3 pr-4 font-bold">Exide 619CE</th>
                <th className="py-3 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {BATTERY_619_PRICE_ROWS.map((row) => (
                <tr key={row.retailer} className="border-b border-border/70 align-top">
                  <td className="py-3 pr-4 font-semibold text-foreground">{row.retailer}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.willard619}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.exide619ce}</td>
                  <td className="py-3 text-muted-foreground">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground">
            Shelf-price ranges are indicative and vary by branch and promotion. Last updated from Alberton
            Battery Mart live pricing.
          </p>
          <Link href="/619-car-battery" className="text-battery font-semibold hover:underline">
            View 619 car battery hub →
          </Link>
        </div>
      </section>

      <Battery619FaqSection items={allFaqs} title="619 Price FAQs" />
      <div className="container">
        <Battery619IntentLinks />
      </div>
    </div>
  );
}
