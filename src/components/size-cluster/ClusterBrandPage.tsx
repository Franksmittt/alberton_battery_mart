import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ProductSchema from "@/components/seo/ProductSchema";
import { getClusterConfig } from "@/lib/battery-sizes/clusters";
import {
  brandPageSlug,
  getBrandFaq,
  getPrimaryProductForBrand,
} from "@/lib/battery-sizes/content";
import { brandDisplayName, type BatteryBrand } from "@/lib/products/brands";
import { getProductsBySizeCode } from "@/lib/products/by-size";
import { formatProductPrice, priceForSchema } from "@/lib/formatting";
import {
  BatterySizeFaqSection,
  BatterySizeHero,
  BatterySizeIntentLinks,
  BatterySizeSpecTable,
  BatterySizeTrustStrip,
} from "@/components/content/BatterySizeSections";

export async function renderClusterBrand(
  code: string,
  brand: BatteryBrand
) {
  const cluster = getClusterConfig(code);
  if (!cluster || !cluster.brands.includes(brand)) notFound();

  const products = await getProductsBySizeCode(code);
  const product = getPrimaryProductForBrand(products, brand);
  if (!product) notFound();

  const brandLabel = brandDisplayName(brand);
  const faqs = getBrandFaq(cluster, product);

  return (
    <div className="space-y-4 pb-16">
      <FaqSchema id={`${brand}-${code}-faq`} items={faqs} />
      <BreadcrumbSchema
        id={`${brand}-${code}-breadcrumb`}
        items={[
          { name: "Home", item: "/" },
          { name: cluster.displayName, item: cluster.hubPath },
          {
            name: `${brandLabel} ${cluster.code}`,
            item: `${cluster.hubPath}/${brandPageSlug(brand, code)}`,
          },
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

      <BatterySizeHero
        cluster={cluster}
        title={`${brandLabel} ${cluster.code} Battery Alberton`}
        subtitle={`${product.ahCapacity}Ah · ${product.cca} CCA · ${product.warrantyMonths}-month warranty · ${formatProductPrice(product.sellingPrice_OUTPUT)} fitted with scrap exchange and free alternator testing.`}
        trackingId={`${brand}-${code}-call`}
      />
      <BatterySizeTrustStrip />

      <section className="container py-10">
        <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Why choose {brandLabel} {cluster.code}?
          </h2>
          <p className="text-muted-foreground">
            {product.popularFits}. We stock {product.name} for counter sales and mobile fitment
            across Alberton with professional installation and warranty registration.
          </p>
          <p className="text-2xl font-extrabold text-battery">
            {formatProductPrice(product.sellingPrice_OUTPUT)}
          </p>
          <Link
            href={`/products/id/${product.id}`}
            className="text-battery font-semibold hover:underline"
          >
            View full {product.name} product page →
          </Link>
        </div>
      </section>

      <BatterySizeSpecTable cluster={cluster} />
      <BatterySizeFaqSection items={faqs} title={`${brandLabel} ${cluster.code} FAQs`} />
      <div className="container">
        <BatterySizeIntentLinks cluster={cluster} />
      </div>
    </div>
  );
}

export async function clusterBrandMetadata(code: string, brand: BatteryBrand) {
  const cluster = getClusterConfig(code);
  if (!cluster) return {};

  const products = await getProductsBySizeCode(code);
  const product = getPrimaryProductForBrand(products, brand);
  if (!product) return {};

  const brandLabel = brandDisplayName(brand);

  return buildPageMetadata({
    title: `${brandLabel} ${cluster.code} Battery Alberton | Price, Specs & Free Fitment`,
    description: `${product.name} in Alberton from ${product.sellingPrice_OUTPUT}. ${product.ahCapacity}Ah, ${product.cca} CCA, ${product.warrantyMonths}-month warranty, free fitment and mobile call-out.`,
    path: `${cluster.hubPath}/${brandPageSlug(brand, code)}`,
    keywords: [
      `${cluster.code} ${brandLabel.toLowerCase()} battery`,
      `${brandLabel.toLowerCase()} ${cluster.code} battery price`,
      `${brandLabel.toLowerCase()} ${cluster.code} Alberton`,
    ],
  });
}
