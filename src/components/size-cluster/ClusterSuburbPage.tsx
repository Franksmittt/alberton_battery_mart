import { notFound } from "next/navigation";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  BASE_URL,
  BUSINESS_ADDRESS,
  BUSINESS_CONTACT,
  LOCAL_BUSINESS_ID,
  STORE_COORDINATES,
} from "@/lib/seo-constants";
import { getClusterConfig } from "@/lib/battery-sizes/clusters";
import {
  getClusterSuburb,
  getSuburbFaqs,
  summarizeBrands,
} from "@/lib/battery-sizes/content";
import { getProductsBySizeCode, getFittedPriceLabel } from "@/lib/products/by-size";
import {
  BatterySizeFaqSection,
  BatterySizeHero,
  BatterySizeIntentLinks,
  BatterySizeProductCards,
  BatterySizeSuburbDetails,
  BatterySizeTrustStrip,
} from "@/components/content/BatterySizeSections";

export async function renderClusterSuburb(code: string, suburbSlug: string) {
  const cluster = getClusterConfig(code);
  const suburb = cluster ? getClusterSuburb(cluster, suburbSlug) : undefined;
  if (!cluster || !suburb) notFound();

  const products = await getProductsBySizeCode(code);
  const fittedFromPrice = getFittedPriceLabel(products);
  const brandSummary = summarizeBrands(products);
  const faqs = getSuburbFaqs(cluster, suburb, fittedFromPrice, brandSummary);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoPartsStore"],
    "@id": LOCAL_BUSINESS_ID,
    name: "Alberton Battery Mart",
    description: `${cluster.code} car battery mobile fitment in ${suburb.name}`,
    address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
    telephone: BUSINESS_CONTACT.telephone,
    url: `${BASE_URL}${cluster.hubPath}/${suburb.slug}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE_COORDINATES.latitude,
      longitude: STORE_COORDINATES.longitude,
    },
    areaServed: [{ "@type": "Place", name: suburb.name }],
    serviceType: `${cluster.code} battery mobile replacement`,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${cluster.code} car battery replacement in ${suburb.name}`,
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
      <JsonLd data={localBusinessSchema} id={`${code}-suburb-local-${suburb.slug}`} />
      <JsonLd data={serviceSchema} id={`${code}-suburb-service-${suburb.slug}`} />
      <FaqSchema id={`${code}-suburb-faq-${suburb.slug}`} items={faqs} />
      <BreadcrumbSchema
        id={`${code}-suburb-breadcrumb-${suburb.slug}`}
        items={[
          { name: "Home", item: "/" },
          { name: cluster.displayName, item: cluster.hubPath },
          { name: suburb.name, item: `${cluster.hubPath}/${suburb.slug}` },
        ]}
      />

      <BatterySizeHero
        cluster={cluster}
        title={`${cluster.code} Car Battery ${suburb.name} — Mobile Fitment`}
        subtitle={`${cluster.code} batteries in stock from ${fittedFromPrice}. Mobile dispatch to ${suburb.name} in ${suburb.responseWindow} with free alternator testing. ${brandSummary}.`}
        trackingId={`${code}-suburb-${suburb.slug}-call`}
      />
      <BatterySizeTrustStrip />
      <BatterySizeSuburbDetails cluster={cluster} suburb={suburb} />
      <BatterySizeProductCards cluster={cluster} products={products} />
      <BatterySizeFaqSection
        items={faqs}
        title={`${cluster.code} Battery FAQs — ${suburb.name}`}
      />
      <div className="container">
        <BatterySizeIntentLinks cluster={cluster} />
      </div>
    </div>
  );
}

export async function clusterSuburbMetadata(code: string, suburbSlug: string) {
  const cluster = getClusterConfig(code);
  const suburb = cluster ? getClusterSuburb(cluster, suburbSlug) : undefined;
  if (!cluster || !suburb) return {};

  const products = await getProductsBySizeCode(code);
  const fittedFromPrice = getFittedPriceLabel(products);

  return buildPageMetadata({
    title: `${cluster.code} Car Battery ${suburb.name} | Mobile Fitment & Price`,
    description: `${cluster.code} car battery supply and mobile fitment in ${suburb.name}, Alberton from ${fittedFromPrice} with free testing. Response ${suburb.responseWindow}.`,
    path: `${cluster.hubPath}/${suburb.slug}`,
    keywords: [
      `${cluster.code} car battery ${suburb.name.toLowerCase()}`,
      `${cluster.code} battery price ${suburb.name.toLowerCase()}`,
      `mobile battery fitment ${suburb.name.toLowerCase()}`,
    ],
  });
}
