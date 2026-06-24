import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getClusterConfig } from "@/lib/battery-sizes/clusters";
import { getHubFaq, getPriceRows, summarizeBrands } from "@/lib/battery-sizes/content";
import { getProductsBySizeCode, getFittedPriceLabel } from "@/lib/products/by-size";
import {
  BatterySizeFaqSection,
  BatterySizeHero,
  BatterySizeIntentLinks,
  BatterySizeTrustStrip,
} from "@/components/content/BatterySizeSections";

export async function renderClusterPrice(code: string) {
  const cluster = getClusterConfig(code);
  if (!cluster) notFound();

  const products = await getProductsBySizeCode(code);
  const fittedFromPrice = getFittedPriceLabel(products);
  const brandSummary = summarizeBrands(products);
  const priceRows = getPriceRows(cluster, products, fittedFromPrice);
  const faqs = [
    {
      question: `${cluster.code} battery price Midas?`,
      answer: `Midas typically lists shelf-price ${cluster.code} batteries without fitment or charging-system diagnostics. Our fitted price from ${fittedFromPrice} includes installation, alternator test, and warranty registration.`,
    },
    {
      question: `Best price for ${cluster.code} car battery in Alberton?`,
      answer: `The best value includes fitment and diagnostics. Our ${fittedFromPrice} fitted price covers in-stock options: ${brandSummary}.`,
    },
    ...getHubFaq(cluster, fittedFromPrice, brandSummary).slice(0, 2),
  ];

  return (
    <div className="space-y-4 pb-16">
      <FaqSchema id={`${code}-price-faq`} items={faqs} />
      <BreadcrumbSchema
        id={`${code}-price-breadcrumb`}
        items={[
          { name: "Home", item: "/" },
          { name: cluster.displayName, item: cluster.hubPath },
          { name: `${cluster.code} Price Guide`, item: `/${code}-car-battery-price` },
        ]}
      />

      <BatterySizeHero
        cluster={cluster}
        title={`${cluster.code} Battery Price Guide — Alberton`}
        subtitle="Honest comparison of fitted prices vs Midas, Goldwagen, and online shelf prices. Includes what you get with mobile fitment and free diagnostics."
        trackingId={`${code}-price-call`}
      />
      <BatterySizeTrustStrip />

      <section className="container py-10">
        <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-6 overflow-x-auto">
          <h2 className="text-3xl font-bold text-foreground">
            {cluster.code} Battery Price Comparison
          </h2>
          <table className="w-full min-w-[640px] text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 font-bold">Retailer</th>
                <th className="py-3 pr-4 font-bold">{priceRows[0]?.col1Label}</th>
                <th className="py-3 pr-4 font-bold">{priceRows[0]?.col2Label}</th>
                <th className="py-3 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {priceRows.map((row) => (
                <tr key={row.retailer} className="border-b border-border/70 align-top">
                  <td className="py-3 pr-4 font-semibold text-foreground">{row.retailer}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.col1}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.col2}</td>
                  <td className="py-3 text-muted-foreground">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground">
            Shelf-price ranges are indicative. Fitted prices are loaded from the live product catalog.
          </p>
          <Link href={cluster.hubPath} className="text-battery font-semibold hover:underline">
            View {cluster.code} car battery hub →
          </Link>
        </div>
      </section>

      <BatterySizeFaqSection items={faqs} title={`${cluster.code} Price FAQs`} />
      <div className="container">
        <BatterySizeIntentLinks cluster={cluster} />
      </div>
    </div>
  );
}

export async function clusterPriceMetadata(code: string) {
  const cluster = getClusterConfig(code);
  if (!cluster) return {};

  const products = await getProductsBySizeCode(code);
  const fittedFromPrice = getFittedPriceLabel(products);

  return buildPageMetadata({
    title: `${cluster.code} Battery Price Comparison Alberton | Midas vs Fitted Price`,
    description: `Compare ${cluster.code} battery prices: Alberton Battery Mart fitted price vs Midas, Goldwagen, and Makro shelf prices. From ${fittedFromPrice} with free fitment.`,
    path: `/${code}-car-battery-price`,
    keywords: [
      `${cluster.code} battery price comparison`,
      `${cluster.code} battery price midas`,
      `best price ${cluster.code} car battery`,
    ],
  });
}
