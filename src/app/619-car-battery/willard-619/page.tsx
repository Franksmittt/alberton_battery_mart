import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BATTERY_619_SPECS } from "@/data/battery-619";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ProductSchema from "@/components/seo/ProductSchema";
import {
  Battery619FaqSection,
  Battery619Hero,
  Battery619IntentLinks,
  Battery619SpecTable,
  Battery619TrustStrip,
} from "@/components/content/Battery619Sections";
import { getWillard619 } from "@/lib/products/battery-619";
import { formatProductPrice, priceForSchema } from "@/lib/formatting";

function getWillardFaq(price: string) {
  return [
    {
      question: "Willard 619 battery price in Alberton?",
      answer: `Willard 619 is ${price} at Alberton Battery Mart with scrap exchange, free fitment, free alternator testing, and a 25-month warranty.`,
    },
    {
      question: "Willard 619 specifications?",
      answer: `Willard 619 is a 12V ${BATTERY_619_SPECS.ahRange} maintenance-free battery with ${BATTERY_619_SPECS.ccaRange}, dimensions ${BATTERY_619_SPECS.dimensions}, and weight around 11.5 kg.`,
    },
    {
      question: "Willard 619 vs Exide 619CE?",
      answer:
        "Willard 619 offers slightly higher Ah (43 vs 42) and a 25-month warranty. Exide 619CE is ideal when your vehicle originally shipped with Exide Start/Stop technology. We confirm the correct match before fitment.",
    },
  ];
}

export async function generateMetadata(): Promise<Metadata> {
  const product = await getWillard619();
  if (!product) return {};

  return buildPageMetadata({
    title: "Willard 619 Battery Alberton | Price, Specs & Free Fitment",
    description: `Willard 619 battery in Alberton from ${product.sellingPrice_OUTPUT}. 43Ah, 325 CCA, 25-month warranty, free fitment and mobile call-out. In stock at Alberton Battery Mart.`,
    path: "/619-car-battery/willard-619",
    keywords: [
      "619 willard battery",
      "willard 619 battery price",
      "willard 619 Alberton",
      "willard 619 specs",
    ],
  });
}

export default async function Willard619Page() {
  const product = await getWillard619();
  if (!product) notFound();

  const willardFaq = getWillardFaq(product.sellingPrice_OUTPUT);

  return (
    <div className="space-y-4 pb-16">
      <FaqSchema id="willard-619-faq" items={willardFaq} />
      <BreadcrumbSchema
        id="willard-619-breadcrumb"
        items={[
          { name: "Home", item: "/" },
          { name: "619 Car Battery", item: "/619-car-battery" },
          { name: "Willard 619", item: "/619-car-battery/willard-619" },
        ]}
      />
      <ProductSchema
        name={product.name}
        description={product.seoDescription}
        sku={product.sku}
        brand={product.brandName}
        image={product.imagePath}
        url={`/products/id/${product.id}`}
        price={priceForSchema(product.sellingPrice_OUTPUT)}
        additionalProperty={[
          { name: "Ah capacity", value: product.ahCapacity },
          { name: "CCA", value: product.cca },
        ]}
      />

      <Battery619Hero
        title="Willard 619 Battery Alberton"
        subtitle={`${product.ahCapacity}Ah · ${product.cca} CCA · ${product.warrantyMonths}-month warranty · ${product.sellingPrice_OUTPUT} fitted with scrap exchange and free alternator testing.`}
        trackingId="willard-619-call"
      />
      <Battery619TrustStrip />

      <section className="container py-10">
        <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Why choose Willard 619?</h2>
          <p className="text-muted-foreground">
            Willard 619 is the workhorse compact-car battery for Alberton commuters. Popular on{" "}
            {product.popularFits}. We stock it for counter sales and mobile fitment with the longest
            warranty in this size class at 25 months.
          </p>
          <p className="text-2xl font-extrabold text-battery">
            {formatProductPrice(product.sellingPrice_OUTPUT)}
          </p>
          <Link href={`/products/id/${product.id}`} className="text-battery font-semibold hover:underline">
            View full Willard 619 product page →
          </Link>
        </div>
      </section>

      <Battery619SpecTable />
      <Battery619FaqSection items={willardFaq} title="Willard 619 FAQs" />
      <div className="container">
        <Battery619IntentLinks />
      </div>
    </div>
  );
}
