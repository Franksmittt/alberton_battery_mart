import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ProductSchema from "@/components/seo/ProductSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  BASE_URL,
  BUSINESS_ADDRESS,
  BUSINESS_CONTACT,
  LOCAL_BUSINESS_ID,
  STORE_COORDINATES,
  STRUCTURED_AREA_SERVED,
} from "@/lib/seo-constants";
import { getClusterConfig } from "@/lib/battery-sizes/clusters";
import {
  getHubFaq,
  summarizeBrands,
} from "@/lib/battery-sizes/content";
import { getProductsBySizeCode, getFittedPriceLabel } from "@/lib/products/by-size";
import { priceForSchema } from "@/lib/formatting";
import { isProductSchemaEligible } from "@/lib/seo/product-schema-eligibility";
import { AdLandingHero } from "@/components/layout/AdLandingHero";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { HubSection } from "@/components/seo/HubSection";
import { RelatedContent } from "@/components/seo/RelatedContent";
import {
  BatterySizeFaqSection,
  BatterySizeIntentLinks,
  BatterySizeProductCards,
  BatterySizeSiblingLinks,
  BatterySizeSpecTable,
  BatterySizeSuburbGrid,
  BatterySizeTrustStrip,
  BatterySizeVehicleList,
} from "@/components/content/BatterySizeSections";

function buildHubSubtitle(
  cluster: NonNullable<ReturnType<typeof getClusterConfig>>,
  fittedFromPrice: string,
  brandSummary: string
): string {
  const driveInLead = `${cluster.headTerm} in Alberton from ${fittedFromPrice} fitted. ${cluster.specs.ahRange}, ${cluster.specs.dimensions}, free in-store testing and same-day fitment.`;
  if (cluster.hubIntro) {
    return `${cluster.hubIntro} ${driveInLead} In stock: ${brandSummary}.`;
  }
  return `${driveInLead} In stock: ${brandSummary}.`;
}

export async function renderClusterHub(code: string) {
  const cluster = getClusterConfig(code);
  if (!cluster) notFound();

  const products = await getProductsBySizeCode(code);
  const fittedFromPrice = getFittedPriceLabel(products);
  const brandSummary = summarizeBrands(products);
  const hubFaq = getHubFaq(cluster, fittedFromPrice, brandSummary);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoPartsStore"],
    "@id": LOCAL_BUSINESS_ID,
    name: "Alberton Battery Mart",
    description: `${cluster.code} car battery supply, in-store testing, and same-day fitment in Alberton`,
    address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
    telephone: BUSINESS_CONTACT.telephone,
    url: `${BASE_URL}${cluster.hubPath}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE_COORDINATES.latitude,
      longitude: STORE_COORDINATES.longitude,
    },
    areaServed: STRUCTURED_AREA_SERVED,
  };

  return (
    <div className="space-y-4 pb-16">
      <PageJsonLd
        title={`${cluster.code} Car Battery Alberton | In Stock | Free Fitment`}
        description={`${cluster.code} car battery in Alberton from ${fittedFromPrice} fitted with free alternator testing and warranty. Drive in to New Redruth or call for stock.`}
        path={cluster.hubPath}
      />
      <JsonLd data={localBusinessSchema} id={`${code}-hub-localbusiness`} />
      <FaqSchema id={`${code}-hub-faq`} items={hubFaq} />
      <BreadcrumbSchema
        id={`${code}-hub-breadcrumb`}
        items={[
          { name: "Home", item: "/" },
          { name: cluster.displayName, item: cluster.hubPath },
        ]}
      />
      {products.filter(isProductSchemaEligible).map((product) => (
        <ProductSchema
          key={product.id}
          scriptId={`${code}-product-schema-${product.id}`}
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
            { name: "Warranty months", value: product.warrantyMonths },
          ]}
        />
      ))}

      <HubSection>
        <AdLandingHero
          title={`${cluster.code} Car Battery — In Stock at Alberton Battery Mart`}
          subtitle={buildHubSubtitle(cluster, fittedFromPrice, brandSummary)}
          trackingPrefix={`${code}-hub`}
        />
      </HubSection>
      <HubSection>
        <BatterySizeTrustStrip />
        <BatterySizeProductCards cluster={cluster} products={products} />
      </HubSection>
      <HubSection>
        <BatterySizeSpecTable cluster={cluster} />
        <BatterySizeVehicleList cluster={cluster} />
        <BatterySizeSuburbGrid cluster={cluster} />
        <BatterySizeFaqSection items={hubFaq} title={`${cluster.code} Battery FAQs`} />
        <BatterySizeSiblingLinks />
      </HubSection>
      <div className="container">
        <BatterySizeIntentLinks cluster={cluster} />
      </div>
      <RelatedContent
        links={[
          { href: "/contact", label: "Contact & store hours", description: "Visit New Redruth or call for availability." },
          { href: "/testing", label: "Free battery testing", description: "Drive in for a free diagnostic before you buy." },
          { href: "/products", label: "All batteries", description: "Browse car, truck, and solar batteries." },
          { href: cluster.hubPath + "-price", label: `${cluster.code} price guide`, description: `Compare ${cluster.code} battery prices in Alberton.` },
        ]}
      />
    </div>
  );
}

export async function clusterHubMetadata(code: string) {
  const cluster = getClusterConfig(code);
  if (!cluster) return {};

  const products = await getProductsBySizeCode(code);
  const fittedFromPrice = getFittedPriceLabel(products);
  const brandList = summarizeBrands(products);

  return buildPageMetadata({
    title: `${cluster.code} Car Battery Alberton | In Stock | Free Fitment`,
    description: `${cluster.headTerm} in Alberton from ${fittedFromPrice} fitted with free alternator testing and warranty. ${products.length} option${products.length === 1 ? "" : "s"} in stock (${brandList}). Drive in to New Redruth.`,
    path: cluster.hubPath,
    keywords: [
      `${cluster.code} car battery`,
      `${cluster.code} battery price`,
      `${cluster.code} car battery Alberton`,
      `${cluster.code} battery near me`,
      `${cluster.code} battery for sale`,
    ],
    imageAlt: `${cluster.code} car battery Alberton - Alberton Battery Mart`,
  });
}
