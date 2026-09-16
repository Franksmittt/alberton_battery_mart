import Link from "next/link";
import { Battery, Zap } from "lucide-react";
import {
  POPULAR_SIZE_CODES,
  sizeSuburbPath,
} from "@/lib/battery-sizes/types";
import { TECH_HUB_NAV_LINKS } from "@/lib/battery-sizes/tech-hubs";

type LocalDemandLinksProps = {
  areaName: string;
  areaSlug: string;
};

export function LocalDemandLinks({ areaName, areaSlug }: LocalDemandLinksProps) {
  return (
    <section className="container space-y-10">
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <Battery className="h-5 w-5 text-battery" />
          <h2 className="text-2xl font-bold text-foreground">
            Popular battery sizes for {areaName}
          </h2>
        </div>
        <p className="text-muted-foreground max-w-3xl">
          These are the sizes Alberton drivers ask for most. Each page shows
          in-stock brands, fitted prices, and mobile fitment for {areaName}.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {POPULAR_SIZE_CODES.map((code) => (
            <Link
              key={code}
              href={sizeSuburbPath(code, areaSlug)}
              className="rounded-lg border border-border bg-card px-3 py-4 text-center hover:border-battery transition-colors"
            >
              <p className="text-xl font-black text-battery">{code}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {areaName} stock
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-battery" />
          <h2 className="text-2xl font-bold text-foreground">
            Start-stop, AGM & premium vehicles in {areaName}
          </h2>
        </div>
        <p className="text-muted-foreground max-w-3xl">
          BMW, Mercedes, Audi, and many VW/Ford models in {areaName} need AGM
          or EFB plus BMS coding. Do not fit a standard flooded battery on a
          start-stop car.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_HUB_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-border bg-card p-4 hover:border-battery transition-colors"
            >
              <p className="font-semibold text-foreground">{link.label}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Serving {areaName} from 28 St Columb Rd, New Redruth
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
