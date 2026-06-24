import { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  getAllBattery619Suburbs,
  getBattery619Suburb,
  getBattery619SuburbFaqs,
} from "@/data/battery-619";
import { getAllProducts } from "@/data/products";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import {
  BASE_URL,
  BUSINESS_ADDRESS,
  BUSINESS_CONTACT,
  LOCAL_BUSINESS_ID,
  STORE_COORDINATES,
} from "@/lib/seo-constants";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Battery619FaqSection,
  Battery619Hero,
  Battery619IntentLinks,
  Battery619ProductCards,
  Battery619SuburbDetails,
  Battery619TrustStrip,
} from "@/components/content/Battery619Sections";

type Params = { suburb: string };

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllBattery619Suburbs().map((suburb) => ({ suburb: suburb.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const suburb = getBattery619Suburb(params.suburb);
  if (!suburb) return {};

  return buildPageMetadata({
    title: `619 Car Battery ${suburb.name} | Mobile Fitment & Price`,
    description: `619 car battery supply and mobile fitment in ${suburb.name}, Alberton. Willard 619 & Exide 619CE from R 1 450 with free testing. Response ${suburb.responseWindow}.`,
    path: `/619-car-battery/${suburb.slug}`,
    keywords: [
      `619 car battery ${suburb.name.toLowerCase()}`,
      `619 battery price ${suburb.name.toLowerCase()}`,
      `619 battery near me ${suburb.name.toLowerCase()}`,
      `mobile battery fitment ${suburb.name.toLowerCase()}`,
    ],
  });
}

export default async function Battery619SuburbPage({ params }: { params: Params }) {
  const suburb = getBattery619Suburb(params.suburb);
  if (!suburb) notFound();

  const faqs = getBattery619SuburbFaqs(suburb);
  const allProducts = await getAllProducts();
  const products = allProducts.filter((p) => p.sku === "619" || p.sku === "619CE");

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoPartsStore"],
    "@id": LOCAL_BUSINESS_ID,
    name: "Alberton Battery Mart",
    description: `619 car battery mobile fitment in ${suburb.name}`,
    address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
    telephone: BUSINESS_CONTACT.telephone,
    url: `${BASE_URL}/619-car-battery/${suburb.slug}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE_COORDINATES.latitude,
      longitude: STORE_COORDINATES.longitude,
    },
    areaServed: [{ "@type": "Place", name: suburb.name }],
    serviceType: "619 battery mobile replacement",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `619 car battery replacement in ${suburb.name}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": LOCAL_BUSINESS_ID,
      name: "Alberton Battery Mart",
      telephone: BUSINESS_CONTACT.telephone,
    },
    areaServed: { "@type": "Place", name: suburb.name },
  };

  return (
    <div className="space-y-4 pb-16">
      <JsonLd data={localBusinessSchema} id={`619-suburb-local-${suburb.slug}`} />
      <JsonLd data={serviceSchema} id={`619-suburb-service-${suburb.slug}`} />
      <FaqSchema id={`619-suburb-faq-${suburb.slug}`} items={faqs} />
      <BreadcrumbSchema
        id={`619-suburb-breadcrumb-${suburb.slug}`}
        items={[
          { name: "Home", item: "/" },
          { name: "619 Car Battery", item: "/619-car-battery" },
          { name: suburb.name, item: `/619-car-battery/${suburb.slug}` },
        ]}
      />

      <Battery619Hero
        title={`619 Car Battery ${suburb.name} — Mobile Fitment`}
        subtitle={`Willard 619 & Exide 619CE in stock. Mobile dispatch to ${suburb.name} in ${suburb.responseWindow} with free alternator testing and professional fitment.`}
        trackingId={`619-suburb-${suburb.slug}-call`}
      />
      <Battery619TrustStrip />
      <Battery619SuburbDetails suburb={suburb} />
      <Battery619ProductCards products={products} />
      <Battery619FaqSection items={faqs} title={`619 Battery FAQs — ${suburb.name}`} />
      <div className="container">
        <Battery619IntentLinks />
      </div>
    </div>
  );
}
