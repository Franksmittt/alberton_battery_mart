import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getClusterConfig } from "@/lib/battery-sizes/clusters";
import { getSpecsFaq } from "@/lib/battery-sizes/content";
import {
  BatterySizeFaqSection,
  BatterySizeHero,
  BatterySizeIntentLinks,
  BatterySizeSpecTable,
  BatterySizeTrustStrip,
  BatterySizeVehicleList,
} from "@/components/content/BatterySizeSections";

export async function renderClusterSpecs(code: string) {
  const cluster = getClusterConfig(code);
  if (!cluster) notFound();

  const faqs = getSpecsFaq(cluster);

  return (
    <div className="space-y-4 pb-16">
      <FaqSchema id={`${code}-specs-faq`} items={faqs} />
      <BreadcrumbSchema
        id={`${code}-specs-breadcrumb`}
        items={[
          { name: "Home", item: "/" },
          { name: cluster.displayName, item: cluster.hubPath },
          { name: `${cluster.code} Specs`, item: `/${code}-battery-specs` },
        ]}
      />

      <BatterySizeHero
        cluster={cluster}
        title={`${cluster.code} Battery Specifications`}
        subtitle={`Technical specifications for ${cluster.code} automotive batteries — ${cluster.specs.ahRange}, ${cluster.specs.ccaRange}, ${cluster.specs.technology}.`}
        trackingId={`${code}-specs-call`}
      />
      <BatterySizeTrustStrip />
      <BatterySizeSpecTable cluster={cluster} />
      <BatterySizeVehicleList cluster={cluster} />
      <BatterySizeFaqSection items={faqs} title={`${cluster.code} Spec FAQs`} />
      <div className="container">
        <BatterySizeIntentLinks cluster={cluster} />
      </div>
    </div>
  );
}

export async function clusterSpecsMetadata(code: string) {
  const cluster = getClusterConfig(code);
  if (!cluster) return {};

  return buildPageMetadata({
    title: `${cluster.code} Battery Specs | Ah, CCA & Dimensions | Alberton`,
    description: `${cluster.code} battery specifications: ${cluster.specs.ahRange}, ${cluster.specs.ccaRange}, ${cluster.specs.dimensions}. Free fitment at Alberton Battery Mart.`,
    path: `/${code}-battery-specs`,
    keywords: [
      `${cluster.code} battery specs`,
      `${cluster.code} battery ah`,
      `${cluster.code} battery cca`,
    ],
  });
}
