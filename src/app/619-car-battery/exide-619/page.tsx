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
import { getExide619CE } from "@/lib/products/battery-619";
import { formatProductPrice, priceForSchema } from "@/lib/formatting";

function getExideFaq(price: string) {
  return [
    {
      question: "619 Exide battery price in Alberton?",
      answer: `Exide 619CE is ${price} at Alberton Battery Mart with scrap exchange, free fitment, and a 24-month warranty.`,
    },
    {
      question: "What is the difference between Exide 619 and 619CE?",
      answer:
        "619CE is Exide's catalog SKU for the 619 size family in South Africa. It is a maintenance-free 12V battery rated at 42Ah with strong cold-crank performance for compact cars and selected Start/Stop applications.",
    },
    {
      question: "619 Exide vs Willard — which should I buy?",
      answer:
        "Choose Exide 619CE if your car originally used Exide or you want Exide's B-range performance. Choose Willard 619 for the extra 1Ah capacity and 25-month warranty. We test your charging system before recommending either.",
    },
  ];
}

export async function generateMetadata(): Promise<Metadata> {
  const product = await getExide619CE();
  if (!product) return {};

  return buildPageMetadata({
    title: "619 Exide Battery Alberton | 619CE Price, Specs & Fitment",
    description: `Exide 619 / 619CE battery in Alberton from ${product.sellingPrice_OUTPUT}. 42Ah, 314 CCA, 24-month warranty, free fitment and mobile call-out. In stock now.`,
    path: "/619-car-battery/exide-619",
    keywords: [
      "619 exide battery",
      "exide 619ce price",
      "exide 619 Alberton",
      "619 exide battery price south africa",
    ],
  });
}

export default async function Exide619Page() {
  const product = await getExide619CE();
  if (!product) notFound();

  const exideFaq = getExideFaq(product.sellingPrice_OUTPUT);

  return (
    <div className="space-y-4 pb-16">
      <FaqSchema id="exide-619-faq" items={exideFaq} />
      <BreadcrumbSchema
        id="exide-619-breadcrumb"
        items={[
          { name: "Home", item: "/" },
          { name: "619 Car Battery", item: "/619-car-battery" },
          { name: "Exide 619", item: "/619-car-battery/exide-619" },
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
        title="Exide 619 / 619CE Battery Alberton"
        subtitle={`${product.name} · ${product.ahCapacity}Ah · ${product.cca} CCA · ${product.sellingPrice_OUTPUT} fitted · Popular on ${product.popularFits}.`}
        trackingId="exide-619-call"
      />
      <Battery619TrustStrip />

      <section className="container py-10">
        <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Exide 619CE in Alberton</h2>
          <p className="text-muted-foreground">
            Exide 619CE is one of the most searched 619 variants on Google. We keep it in stock alongside
            Willard 619 for same-day replacement. Dimensions match the standard 619 footprint at{" "}
            {BATTERY_619_SPECS.dimensions}.
          </p>
          <p className="text-2xl font-extrabold text-battery">
            {formatProductPrice(product.sellingPrice_OUTPUT)}
          </p>
          <Link href={`/products/id/${product.id}`} className="text-battery font-semibold hover:underline">
            View full Exide 619CE product page →
          </Link>
        </div>
      </section>

      <Battery619SpecTable />
      <Battery619FaqSection items={exideFaq} title="Exide 619 FAQs" />
      <div className="container">
        <Battery619IntentLinks />
      </div>
    </div>
  );
}
