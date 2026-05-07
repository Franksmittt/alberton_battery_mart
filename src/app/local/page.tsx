import { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { getAllLocalAreas } from "@/data/local-areas";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Alberton Suburb Battery Services | Alberton Battery Mart",
  description:
    "Browse mobile battery replacement coverage across Alberton suburbs including Brackenhurst, Brackendowns, Randhart, Verwoerdpark, and Alrode.",
  alternates: {
    canonical: "https://www.albertonbatterymart.co.za/local",
  },
};

export default function LocalAreasHubPage() {
  const areas = getAllLocalAreas();
  const baseUrl = "https://www.albertonbatterymart.co.za";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${baseUrl}/local`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Alberton Battery Service Areas",
    itemListElement: [
      ...areas.map((area, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: area.name,
        url: `${baseUrl}/local/${area.slug}`,
      })),
      {
        "@type": "ListItem",
        position: areas.length + 1,
        name: "Alberton Central",
        url: `${baseUrl}/local/alberton-central`,
      },
      {
        "@type": "ListItem",
        position: areas.length + 2,
        name: "Meyersdal",
        url: `${baseUrl}/local/meyersdal`,
      },
      {
        "@type": "ListItem",
        position: areas.length + 3,
        name: "New Redruth",
        url: `${baseUrl}/local/new-redruth`,
      },
    ],
  };

  return (
    <div className="container py-16 space-y-10">
      <JsonLd data={breadcrumbSchema} id="local-hub-breadcrumb-schema" />
      <JsonLd data={itemListSchema} id="local-hub-item-list-schema" />
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Alberton Coverage Hub
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
          Mobile battery replacement by suburb
        </h1>
        <p className="text-lg text-muted-foreground">
          Find the dedicated page for your suburb to see local response windows,
          service focus, and direct callout options.
        </p>
      </section>

      <Separator />

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {areas.map((area) => (
          <Link
            key={area.slug}
            href={`/local/${area.slug}`}
            className="rounded-lg border border-border bg-card p-5 hover:border-battery transition-colors"
          >
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-battery mt-1" />
              <div>
                <h2 className="text-xl font-bold text-foreground">{area.name}</h2>
                <p className="text-sm text-muted-foreground mt-2">{area.areaSummary}</p>
                <p className="text-sm text-battery mt-3">
                  Typical response: {area.responseWindow}
                </p>
              </div>
            </div>
          </Link>
        ))}
        <Link
          href="/local/alberton-central"
          className="rounded-lg border border-border bg-card p-5 hover:border-battery transition-colors"
        >
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-battery mt-1" />
            <div>
              <h2 className="text-xl font-bold text-foreground">Alberton Central</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Core CBD page with walk-in and rapid nearby dispatch focus.
              </p>
              <p className="text-sm text-battery mt-3">Typical response: 30-45 minutes</p>
            </div>
          </div>
        </Link>
        <Link
          href="/local/meyersdal"
          className="rounded-lg border border-border bg-card p-5 hover:border-battery transition-colors"
        >
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-battery mt-1" />
            <div>
              <h2 className="text-xl font-bold text-foreground">Meyersdal</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Premium-area page focused on AGM fitment and BMS-sensitive vehicles.
              </p>
              <p className="text-sm text-battery mt-3">Typical response: 45-60 minutes</p>
            </div>
          </div>
        </Link>
        <Link
          href="/local/new-redruth"
          className="rounded-lg border border-border bg-card p-5 hover:border-battery transition-colors"
        >
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-battery mt-1" />
            <div>
              <h2 className="text-xl font-bold text-foreground">New Redruth</h2>
              <p className="text-sm text-muted-foreground mt-2">
                HQ-adjacent page with fastest dispatch and walk-in conversion coverage.
              </p>
              <p className="text-sm text-battery mt-3">Typical response: 30-45 minutes</p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
