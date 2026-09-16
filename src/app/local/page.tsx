import Link from "next/link";
import { MapPin } from "lucide-react";

import { getAllLocalAreas } from "@/data/local-areas";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { POPULAR_SIZE_CODES, sizeHubPath } from "@/lib/battery-sizes/types";
import {
  PRIORITY_RESIDENTIAL_LINKS,
  TECH_HUB_NAV_LINKS,
} from "@/lib/battery-sizes/tech-hubs";

export const metadata = buildPageMetadata({
  title: "Alberton Suburb Battery Services | Alberton Battery Mart",
  description:
    "Car batteries for Alberton North, Meyersdal, Brackenhurst, Brackendowns, Randhart, Alberante, and Albertsdal. Drive in to New Redruth or request mobile fitment.",
  path: "/local",
  keywords: [
    "battery replacement Alberton suburbs",
    "mobile battery service Alberton",
    "car battery Alberton North",
    "car battery Brackenhurst",
    "battery fitment Meyersdal",
    "car battery Albertsdal",
    "car battery Alberante",
  ],
  imageAlt: "Alberton suburb mobile battery service coverage",
});

export default function LocalAreasHubPage() {
  const areas = getAllLocalAreas();
  const featuredSlugs = new Set(
    PRIORITY_RESIDENTIAL_LINKS.map((link) => link.href.replace("/local/", ""))
  );
  const remainingAreas = areas.filter((area) => !featuredSlugs.has(area.slug));
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
          Car batteries for Alberton suburbs
        </h1>
        <p className="text-lg text-muted-foreground">
          Alberton North, Meyersdal, Brackenhurst, Brackendowns, Randhart,
          Alberante, Albertsdal, and the other established Alberton suburbs.
          Popular sizes 616, 619, 628, 646, 652, 658, and 668 plus AGM/EFB
          start-stop batteries.
        </p>
      </section>

      <Separator />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-foreground text-center">
          Priority residential suburbs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRIORITY_RESIDENTIAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-battery/40 bg-card p-5 hover:border-battery transition-colors"
            >
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-battery mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground">{link.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {link.label} car batteries, mobile fitment, and start-stop AGM/EFB
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-foreground text-center">
          Popular battery sizes
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {POPULAR_SIZE_CODES.map((code) => (
            <Link
              key={code}
              href={sizeHubPath(code)}
              className="rounded-lg border border-border bg-card px-5 py-3 text-lg font-black text-battery hover:border-battery"
            >
              {code}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {TECH_HUB_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-battery font-semibold underline underline-offset-2"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-foreground text-center">
          More Alberton coverage
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {remainingAreas.map((area) => (
          <Link
            key={area.slug}
            href={`/local/${area.slug}`}
            className="rounded-lg border border-border bg-card p-5 hover:border-battery transition-colors"
          >
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-battery mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground">{area.name}</h3>
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
              <h3 className="text-xl font-bold text-foreground">Alberton Central</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Core CBD page with walk-in and rapid nearby dispatch focus.
              </p>
              <p className="text-sm text-battery mt-3">Typical response: 30-45 minutes</p>
            </div>
          </div>
        </Link>
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground text-center">
          Service landing pages by suburb
        </h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto">
          Jump straight to high-intent service pages for diagnostics, emergency support, and mobile replacement.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((area) => (
            <div key={`service-links-${area.slug}`} className="rounded-lg border border-border bg-card p-4 space-y-2">
              <p className="font-semibold text-foreground">{area.name}</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <Link href={`/services/mobile-battery-replacement/${area.slug}`} className="text-battery hover:underline">
                  Mobile replacement
                </Link>
                <Link href={`/services/free-battery-testing/${area.slug}`} className="text-battery hover:underline">
                  Free testing
                </Link>
                <Link href={`/services/emergency-jump-start/${area.slug}`} className="text-battery hover:underline">
                  Emergency jump-start
                </Link>
              </div>
            </div>
          ))}
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <p className="font-semibold text-foreground">Alberton Central</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/services/mobile-battery-replacement/alberton-central" className="text-battery hover:underline">
                Mobile replacement
              </Link>
              <Link href="/services/free-battery-testing/alberton-central" className="text-battery hover:underline">
                Free testing
              </Link>
              <Link href="/services/emergency-jump-start/alberton-central" className="text-battery hover:underline">
                Emergency jump-start
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <p className="font-semibold text-foreground">Meyersdal</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/services/battery-fitment/meyersdal" className="text-battery hover:underline">
                Premium fitment
              </Link>
              <Link href="/services/free-battery-testing/meyersdal" className="text-battery hover:underline">
                Free testing
              </Link>
              <Link href="/services/mobile-battery-replacement/meyersdal" className="text-battery hover:underline">
                Mobile replacement
              </Link>
              <Link href="/services/emergency-jump-start/meyersdal" className="text-battery hover:underline">
                Emergency jump-start
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <p className="font-semibold text-foreground">New Redruth</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href="/services/mobile-battery-replacement/new-redruth" className="text-battery hover:underline">
                Mobile replacement
              </Link>
              <Link href="/services/free-battery-testing/new-redruth" className="text-battery hover:underline">
                Free testing
              </Link>
              <Link href="/services/emergency-jump-start/new-redruth" className="text-battery hover:underline">
                Emergency jump-start
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
