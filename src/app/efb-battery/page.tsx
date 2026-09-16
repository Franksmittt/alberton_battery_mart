import { techHubMetadata, renderTechHub } from "@/components/content/BatteryTechHubPage";

export const revalidate = 86400;

export const metadata = techHubMetadata("efb");

export default function EfbBatteryPage() {
  return renderTechHub("efb");
}
