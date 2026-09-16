import { techHubMetadata, renderTechHub } from "@/components/content/BatteryTechHubPage";

export const revalidate = 86400;

export const metadata = techHubMetadata("start-stop");

export default function StartStopBatteryPage() {
  return renderTechHub("start-stop");
}
