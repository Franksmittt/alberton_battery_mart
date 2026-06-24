import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { getClusterConfig } from "@/lib/battery-sizes/clusters";
import { getDimensionsFaq } from "@/lib/battery-sizes/content";
import {
  BatterySizeFaqSection,
  BatterySizeHero,
  BatterySizeIntentLinks,
  BatterySizeTrustStrip,
} from "@/components/content/BatterySizeSections";

export async function renderClusterDimensions(code: string) {
  const cluster = getClusterConfig(code);
  if (!cluster) notFound();

  const faqs = getDimensionsFaq(cluster);
  const [length, width, height] = cluster.specs.dimensions
    .replace(" mm", "")
    .split("×")
    .map((part) => part.trim());

  return (
    <div className="space-y-4 pb-16">
      <FaqSchema id={`${code}-dimensions-faq`} items={faqs} />
      <BreadcrumbSchema
        id={`${code}-dimensions-breadcrumb`}
        items={[
          { name: "Home", item: "/" },
          { name: cluster.displayName, item: cluster.hubPath },
          { name: `${cluster.code} Dimensions`, item: `/${code}-battery-dimensions` },
        ]}
      />

      <BatterySizeHero
        cluster={cluster}
        title={`${cluster.code} Battery Dimensions & Terminal Layout`}
        subtitle={`Physical size guide for ${cluster.code} batteries — tray dimensions, terminal orientation, and fitment checks before replacement.`}
        trackingId={`${code}-dimensions-call`}
      />
      <BatterySizeTrustStrip />

      <section className="container py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Length", value: length },
            { label: "Width", value: width },
            { label: "Height", value: height },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-card/40 p-6 text-center space-y-2"
            >
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="text-3xl font-extrabold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-muted-foreground">
          Terminal layout: {cluster.specs.terminalLayout}. Typical weight: {cluster.specs.weight}.
        </p>
      </section>

      <BatterySizeFaqSection items={faqs} title={`${cluster.code} Dimension FAQs`} />
      <div className="container">
        <BatterySizeIntentLinks cluster={cluster} />
      </div>
    </div>
  );
}

export async function clusterDimensionsMetadata(code: string) {
  const cluster = getClusterConfig(code);
  if (!cluster) return {};

  return buildPageMetadata({
    title: `${cluster.code} Battery Dimensions | Size & Terminals | Alberton`,
    description: `${cluster.code} battery dimensions: ${cluster.specs.dimensions}. Terminal layout and fitment guidance from Alberton Battery Mart.`,
    path: `/${code}-battery-dimensions`,
    keywords: [
      `${cluster.code} battery dimensions`,
      `${cluster.code} battery size`,
      `${cluster.code} terminal layout`,
    ],
  });
}
