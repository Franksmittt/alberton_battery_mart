import { Metadata } from "next";
import { getAllProducts } from "@/data/products";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  BATTERY_619_HUB_FAQ,
  BATTERY_619_SPECS,
} from "@/data/battery-619";
import {
  BASE_URL,
  BUSINESS_ADDRESS,
  BUSINESS_CONTACT,
  LOCAL_BUSINESS_ID,
  STORE_COORDINATES,
  STRUCTURED_AREA_SERVED,
} from "@/lib/seo-constants";
import { JsonLd } from "@/components/seo/JsonLd";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ProductSchema from "@/components/seo/ProductSchema";
import {
  Battery619FaqSection,
  Battery619Hero,
  Battery619IntentLinks,
  Battery619ProductCards,
  Battery619SpecTable,
  Battery619SuburbGrid,
  Battery619TrustStrip,
  Battery619VehicleList,
} from "@/components/content/Battery619Sections";

export const metadata: Metadata = buildPageMetadata({
  title: "619 Car Battery Alberton | Exide & Willard | Free Fitment",
  description:
    "619 car battery in Alberton from R 1 450 with free fitment, alternator testing, and up to 25-month warranty. Willard 619 & Exide 619CE in stock. Mobile call-out to all suburbs.",
  path: "/619-car-battery",
  keywords: [
    "619 car battery",
    "619 battery price",
    "619 car battery Alberton",
    "619 battery near me",
    "619 exide battery",
    "619 willard battery",
    "619 battery for sale",
    "affordable 619 battery brands",
  ],
  imageAlt: "619 car battery Alberton - Alberton Battery Mart",
});

export default async function Battery619HubPage() {
  const allProducts = await getAllProducts();
  const products = allProducts.filter((p) => p.sku === "619" || p.sku === "619CE");

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoPartsStore"],
    "@id": LOCAL_BUSINESS_ID,
    name: "Alberton Battery Mart",
    description: "619 car battery supply, testing, and mobile fitment in Alberton",
    address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
    telephone: BUSINESS_CONTACT.telephone,
    url: `${BASE_URL}/619-car-battery`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE_COORDINATES.latitude,
      longitude: STORE_COORDINATES.longitude,
    },
    areaServed: STRUCTURED_AREA_SERVED,
  };

  return (
    <div className="space-y-4 pb-16">
      <JsonLd data={localBusinessSchema} id="619-hub-localbusiness" />
      <FaqSchema id="619-hub-faq" items={BATTERY_619_HUB_FAQ} />
      <BreadcrumbSchema
        id="619-hub-breadcrumb"
        items={[
          { name: "Home", item: "/" },
          { name: "619 Car Battery", item: "/619-car-battery" },
        ]}
      />
      {products.map((product) => (
        <ProductSchema
          key={product.id}
          scriptId={`619-product-schema-${product.id}`}
          name={product.name}
          description={product.seoDescription}
          sku={product.sku}
          brand={product.brandName}
          image={product.imagePath}
          url={`/products/id/${product.id}`}
          price={product.sellingPrice_OUTPUT.replace(/[^\d.]/g, "") || "1450"}
          additionalProperty={[
            { name: "Ah capacity", value: product.ahCapacity },
            { name: "CCA", value: product.cca },
            { name: "Warranty months", value: product.warrantyMonths },
          ]}
        />
      ))}

      <Battery619Hero
        title="619 Car Battery Alberton"
        subtitle={`South Africa's most common compact-car battery code. ${BATTERY_619_SPECS.ahRange}, ${BATTERY_619_SPECS.dimensions}, from R 1 450 fitted with free testing and mobile call-out across Alberton.`}
        trackingId="619-hub-call"
      />
      <Battery619TrustStrip />
      <Battery619ProductCards products={products} />
      <Battery619SpecTable />
      <Battery619VehicleList />
      <Battery619SuburbGrid />
      <Battery619FaqSection items={BATTERY_619_HUB_FAQ} />
      <div className="container">
        <Battery619IntentLinks />
      </div>
    </div>
  );
}
