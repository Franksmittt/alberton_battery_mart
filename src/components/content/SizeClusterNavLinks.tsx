import Link from "next/link";
import { getAllClusterConfigs } from "@/lib/battery-sizes/clusters";

const SIZE_HUBS = getAllClusterConfigs();

export function SizeClusterNavLinks({
  variant = "header",
}: {
  variant?: "header" | "footer" | "inline";
}) {
  if (variant === "footer") {
    return (
      <>
        {SIZE_HUBS.map((cluster) => (
          <li key={cluster.code}>
            <Link
              href={cluster.hubPath}
              className="transition-all hover:pl-1 hover:text-[var(--brand-accent)]"
            >
              {cluster.code} Car Battery
            </Link>
          </li>
        ))}
      </>
    );
  }

  if (variant === "inline") {
    return (
      <span className="inline-flex flex-wrap gap-x-3 gap-y-1 justify-center">
        {SIZE_HUBS.map((cluster, index) => (
          <span key={cluster.code}>
            <Link href={cluster.hubPath} className="text-battery font-semibold hover:underline">
              {cluster.code} guide
            </Link>
            {index < SIZE_HUBS.length - 1 ? <span className="text-muted-foreground"> · </span> : null}
          </span>
        ))}
      </span>
    );
  }

  return (
    <>
      {SIZE_HUBS.map((cluster) => (
        <Link
          key={cluster.code}
          href={cluster.hubPath}
          className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]"
        >
          {cluster.code} Car Battery Hub
        </Link>
      ))}
    </>
  );
}
