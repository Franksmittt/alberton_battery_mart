import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  clusterBrandMetadata,
  renderClusterBrand,
} from "@/components/size-cluster/ClusterBrandPage";
import {
  clusterSuburbMetadata,
  renderClusterSuburb,
} from "@/components/size-cluster/ClusterSuburbPage";
import {
  getHubSegmentStaticParams,
  resolveHubSegment,
} from "@/lib/battery-sizes/routes";

export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  return getHubSegmentStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; segment: string };
}): Promise<Metadata> {
  const resolved = resolveHubSegment(params.slug, params.segment);
  if (!resolved) return {};

  if (resolved.type === "suburb") {
    return clusterSuburbMetadata(resolved.code, resolved.suburbSlug);
  }

  return clusterBrandMetadata(resolved.code, resolved.brand);
}

export default async function SizeClusterSegmentPage({
  params,
}: {
  params: { slug: string; segment: string };
}) {
  const resolved = resolveHubSegment(params.slug, params.segment);
  if (!resolved) notFound();

  if (resolved.type === "suburb") {
    return renderClusterSuburb(resolved.code, resolved.suburbSlug);
  }

  return renderClusterBrand(resolved.code, resolved.brand);
}
