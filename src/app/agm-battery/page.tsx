import { techHubMetadata, renderTechHub } from "@/components/content/BatteryTechHubPage";

export const revalidate = 86400;

export const metadata = techHubMetadata("agm");

export default function AgmBatteryPage() {
  return renderTechHub("agm");
}
