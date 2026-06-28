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
import {
  BatterySizeFaqSection,
  BatterySizeHero,
  BatterySizeIntentLinks,
  BatterySizeProductCards,
  BatterySizeSiblingLinks,
  BatterySizeSpecTable,
  BatterySizeSuburbGrid,
  BatterySizeTrustStrip,
  BatterySizeVehicleList,
} from "@/components/content/BatterySizeSections";

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
    description: `${cluster.code} car battery supply, testing, and mobile fitment in Alberton`,
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
      <JsonLd data={localBusinessSchema} id={`${code}-hub-localbusiness`} />
      <FaqSchema id={`${code}-hub-faq`} items={hubFaq} />
      <BreadcrumbSchema
        id={`${code}-hub-breadcrumb`}
        items={[
          { name: "Home", item: "/" },
          { name: cluster.displayName, item: cluster.hubPath },
        ]}
      />
      {products.map((product) => (
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

      <BatterySizeHero
        cluster={cluster}
        title={`${cluster.code} Car Battery Alberton`}
        subtitle={
          cluster.hubIntro ||
          `${cluster.headTerm} in Alberton from ${fittedFromPrice} fitted. ${cluster.specs.ahRange}, ${cluster.specs.dimensions}, free testing and mobile call-out across Alberton. In stock: ${brandSummary}.`
        }
        trackingId={`${code}-hub-call`}
      />
      <BatterySizeTrustStrip />
      <BatterySizeProductCards cluster={cluster} products={products} />
      <BatterySizeSpecTable cluster={cluster} />
      <BatterySizeVehicleList cluster={cluster} />
      <BatterySizeSuburbGrid cluster={cluster} />
      <BatterySizeFaqSection items={hubFaq} title={`${cluster.code} Battery FAQs`} />
      <BatterySizeSiblingLinks />
      <div className="container">
        <BatterySizeIntentLinks cluster={cluster} />
      </div>
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
    title: `${cluster.code} Car Battery Alberton | All Brands | Free Fitment`,
    description: `${cluster.headTerm} in Alberton from ${fittedFromPrice} with free fitment, alternator testing, and warranty. ${products.length} option${products.length === 1 ? "" : "s"} in stock (${brandList}). Mobile call-out to all suburbs.`,
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
