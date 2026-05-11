import { getAllProducts, ProductCardData } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Zap, ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";
import AutomotiveCatalogExperience from "@/components/products/AutomotiveCatalogExperience";
import { createItemListSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

const PAGE_TITLE = "Car Batteries in Alberton | Standard & AGM | Alberton Battery Mart";
const PAGE_DESCRIPTION =
  "Willard, Exide, Enertec, and AGM/EFB Start-Stop batteries with mobile fitment across Alberton.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "car battery Alberton",
    "start-stop battery Alberton",
    "AGM battery fitment",
    "mobile battery replacement",
  ],
  alternates: {
    canonical: `${BASE_URL}/products/type/automotive`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/automotive`,
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Car Batteries - Alberton Battery Mart",
      },
    ],
    locale: "en_ZA",
    siteName: "Alberton Battery Mart",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
};

const EMERGENCY_PHONE_DISPLAY = "010 109 6211";
const EMERGENCY_PHONE_LINK = "0101096211";

const SERVICE_LINKS = [
  {
    label: "Mobile Battery Replacement - Alberton",
    href: "/services/mobile-battery-replacement/alberton",
    description: "On-site diagnostics, BMS coding, Start/Stop calibration.",
  },
  {
    label: "Free Battery Testing - Alberton",
    href: "/services/free-battery-testing/alberton",
    description: "Alternator ripple, starter draw, and parasitic drain checks.",
  },
  {
    label: "Premium Fitment - Meyersdal",
    href: "/services/battery-fitment/meyersdal",
    description: "Boot battery projects for Audi, BMW, and Mercedes.",
  },
];

const VEHICLE_LINKS = [
  { label: "Toyota Hilux 3.0 D-4D battery guide", slug: "toyota/hilux-3-0-d4d" },
  { label: "Ford Ranger 2.2 TDCi coding workflow", slug: "ford/ranger-2-2-tdci" },
  { label: "BMW 3-Series F30 AGM replacement", slug: "bmw/3-series-f30" },
  { label: "Mercedes C-Class W205 Start/Stop battery", slug: "mercedes/c-class-w205" },
];

export default async function StandardAutomotiveBatteriesPage() {
  const allProducts = await getAllProducts();
  const automotiveProducts = allProducts
    .filter(
      (p: ProductCardData) =>
        p.category === "Standard Automotive" || p.category === "Performance AGM/EFB"
    )
    .sort((a, b) => a.brandName.localeCompare(b.brandName) || a.name.localeCompare(b.name));

  const productCollectionSchema = createItemListSchema({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/automotive`,
    items: automotiveProducts.slice(0, 20).map((product) => ({
      name: product.name,
      url: `${BASE_URL}/products/id/${product.id}`,
    })),
  });

  return (
    <div className="container py-14 space-y-10">
      <JsonLd data={productCollectionSchema} id="automotive-collection-schema" />

      <section className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-bg)] p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Automotive batteries, <span className="text-[var(--brand-accent)]">properly matched</span> to your vehicle
            </h1>
            <p className="text-lg text-[var(--brand-muted)] max-w-3xl">
              Premium daily-driver, bakkie, and Start/Stop battery options with diagnostics-first
              fitment in Alberton.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button
                asChild
                size="lg"
                variant="battery"
                className="sm:w-auto"
                trackingId="type-automotive-call"
              >
                <a href={`tel:${EMERGENCY_PHONE_LINK}`} className="inline-flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Call: {EMERGENCY_PHONE_DISPLAY}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="sm:w-auto bg-[var(--brand-success)] hover:bg-[var(--brand-success-hover)] text-white"
                trackingId="type-automotive-whatsapp"
              >
                <a
                  href="https://wa.me/27823046926?text=Hi%20ABM%2C%20I%20need%20an%20automotive%20battery%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  WhatsApp the workshop
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg-elevated)] p-5 space-y-3">
            <p className="text-xs uppercase tracking-[0.8px] font-semibold text-[var(--brand-muted)]">
              Live catalog
            </p>
            <p className="text-3xl font-black text-white">{automotiveProducts.length}</p>
            <p className="text-sm text-[var(--brand-muted-2)] leading-relaxed">
              products in stock-ready range. Start with the first 6 cards below and load more as
              needed.
            </p>
            <Link
              href="#automotive-grid"
              className="inline-flex text-sm font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)]"
            >
              Jump to catalog
            </Link>
          </div>
        </div>
      </section>

      <AutomotiveCatalogExperience products={automotiveProducts} />

      <section className="space-y-6">
        <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-bg-elevated)] p-7 md:p-8 space-y-6">
          <h2 className="text-3xl font-bold text-white">
            For Bakkies, 4x4s, and Start/Stop Vehicles
          </h2>
          <p className="text-[var(--brand-muted)] leading-relaxed">
            A modern Toyota Hilux or Ford Ranger is not just a standard car application. High
            electrical demand and Start/Stop systems require the correct battery chemistry for
            reliability and warranty performance.
          </p>
          <p className="text-[var(--brand-muted)] leading-relaxed">
            Installing the wrong battery often causes premature failure and warning lights. We fit
            the correct spec from the start, then validate charging system health during fitment.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg)] p-5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-[var(--brand-accent)]" />
                <h3 className="text-lg font-semibold text-white">EFB for high demand</h3>
              </div>
              <p className="text-sm text-[var(--brand-muted-2)]">
                Enhanced Flooded Batteries suit high accessory load and basic Start/Stop operation.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg)] p-5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-[var(--brand-accent)]" />
                <h3 className="text-lg font-semibold text-white">AGM for peak performance</h3>
              </div>
              <p className="text-sm text-[var(--brand-muted-2)]">
                AGM is required for advanced Start/Stop, regenerative braking, and premium models.
              </p>
            </div>
          </div>
        </div>

        <section className="grid md:grid-cols-3 gap-4">
          {SERVICE_LINKS.map((service) => (
            <div
              key={service.href}
              className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg)] p-5 space-y-3"
            >
              <h3 className="text-lg font-semibold text-white">{service.label}</h3>
              <p className="text-sm text-[var(--brand-muted-2)]">{service.description}</p>
              <Link
                href={service.href}
                className="text-sm font-semibold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)]"
              >
                Explore →
              </Link>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-bg)] p-6 space-y-3">
          <h2 className="text-2xl font-bold text-white">Vehicles we service daily</h2>
          <div className="grid md:grid-cols-4 gap-3">
            {VEHICLE_LINKS.map((vehicle) => (
              <Link
                key={vehicle.slug}
                href={`/vehicles/${vehicle.slug}`}
                className="rounded-lg border border-[var(--brand-border)] bg-[var(--brand-bg-elevated)] p-4 text-sm text-[var(--brand-muted)] hover:border-[var(--brand-accent)] hover:text-white transition-colors"
              >
                {vehicle.label}
              </Link>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
