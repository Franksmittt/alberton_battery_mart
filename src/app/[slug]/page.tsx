import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  clusterDimensionsMetadata,
  renderClusterDimensions,
} from "@/components/size-cluster/ClusterDimensionsPage";
import {
  clusterHubMetadata,
  renderClusterHub,
} from "@/components/size-cluster/ClusterHubPage";
import {
  clusterPriceMetadata,
  renderClusterPrice,
} from "@/components/size-cluster/ClusterPricePage";
import {
  clusterSpecsMetadata,
  renderClusterSpecs,
} from "@/components/size-cluster/ClusterSpecsPage";
import {
  getTopLevelClusterStaticParams,
  parseClusterSlug,
} from "@/lib/battery-sizes/routes";

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  return getTopLevelClusterStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const parsed = parseClusterSlug(params.slug);
  if (!parsed) return {};

  switch (parsed.kind) {
    case "hub":
      return clusterHubMetadata(parsed.code);
    case "price":
      return clusterPriceMetadata(parsed.code);
    case "specs":
      return clusterSpecsMetadata(parsed.code);
    case "dimensions":
      return clusterDimensionsMetadata(parsed.code);
    default:
      return {};
  }
}

export default async function SizeClusterTopLevelPage({
  params,
}: {
  params: { slug: string };
}) {
  const parsed = parseClusterSlug(params.slug);
  if (!parsed) notFound();

  switch (parsed.kind) {
    case "hub":
      return renderClusterHub(parsed.code);
    case "price":
      return renderClusterPrice(parsed.code);
    case "specs":
      return renderClusterSpecs(parsed.code);
    case "dimensions":
      return renderClusterDimensions(parsed.code);
    default:
      notFound();
  }
}
