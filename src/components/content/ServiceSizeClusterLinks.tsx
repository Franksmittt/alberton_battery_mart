import Link from "next/link";
import { getAllClusterConfigs } from "@/lib/battery-sizes/clusters";
import IntentLinks from "@/components/seo/IntentLinks";

export function ServiceSizeClusterLinks() {
  const clusters = getAllClusterConfigs();

  return (
    <IntentLinks
      title="Popular battery size guides"
      description="Jump to a size-specific hub for pricing, specs, suburb dispatch, and in-stock products."
      columnsClassName="md:grid-cols-4"
      links={[
        ...clusters.map((cluster) => ({
          href: cluster.hubPath,
          label: `${cluster.code} car battery Alberton`,
        })),
        { href: "/mobile-battery-fitment-alberton", label: "Mobile battery fitment Alberton" },
        { href: "/emergency-battery-replacement-alberton", label: "Emergency battery replacement" },
        { href: "/services/mobile-battery-replacement/alberton", label: "Mobile replacement service" },
      ]}
    />
  );
}

export function ServiceSizeClusterQuickLinks() {
  const clusters = getAllClusterConfigs();
  return (
    <div className="flex flex-wrap gap-3">
      {clusters.map((cluster) => (
        <Link key={cluster.code} href={cluster.hubPath} className="text-battery font-semibold hover:underline">
          {cluster.code} hub
        </Link>
      ))}
    </div>
  );
}
