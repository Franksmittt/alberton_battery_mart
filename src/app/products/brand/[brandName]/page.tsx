// src/app/products/brand/[brandName]/page.tsx
import Link from "next/link";
import ProductListPage from "@/components/layout/ProductListPage";
import { getAllProducts, ProductCardData, ALL_PRODUCTS } from "@/data/products";
import { notFound } from "next/navigation";
import CategoryFilterSidebar from "@/components/layout/CategoryFilterSidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL, DEFAULT_LOGO } from "@/lib/seo-constants";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

// Make this page dynamic so it can read updated prices from JSON
export const dynamic = 'force-dynamic';

// This function tells Next.js which brands to pre-build
export function generateStaticParams() {
  const brands = Array.from(new Set(ALL_PRODUCTS.map((p) => p.brandName)));
  return brands.map((brand) => ({
    brandName: brand.toLowerCase(),
  }));
}

// Props interface for the dynamic page
interface BrandPageProps {
  params: {
    brandName: string;
  };
}

// --- NEW: Dynamic Metadata for SEO ---
export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const brandName =
    params.brandName.charAt(0).toUpperCase() + params.brandName.slice(1);
  const url = `${BASE_URL}/products/brand/${params.brandName.toLowerCase()}`;

  const description = `Shop authentic ${brandName} batteries in Alberton with on-site testing, coding, and same-day fitment.`;

  return {
    title: `${brandName} Batteries in Alberton | Alberton Battery Mart`,
    description,
    keywords: [
      `${brandName} batteries`,
      `${brandName} Alberton`,
      `${brandName} battery price`,
      "mobile battery replacement",
    ],
    openGraph: {
      title: `${brandName} Batteries in Alberton`,
      description,
      url,
      type: "website",
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${brandName} Batteries - Alberton Battery Mart`,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Helper to filter products and capitalize the brand name
const getBrandData = (allProducts: ProductCardData[], brandSlug: string) => {
  const products = allProducts.filter(
    (p) => p.brandName.toLowerCase() === brandSlug.toLowerCase()
  );
  const brandName = products.length > 0 ? products[0].brandName : brandSlug;

  const brands = Array.from(new Set(products.map((p) => p.brandName)));
  const sizes = Array.from(new Set(products.map((p) => p.sku)));

  return { products, brandName, brands, sizes };
};

// --- NEW: Universal Capacity Filters (can be customized) ---
const allCapacityFilters = [
  { label: "Small (Under 20 Ah)", min: 0, max: 20 },
  { label: "Medium (20-75 Ah)", min: 20, max: 75 },
  { label: "Large (75-100 Ah)", min: 75, max: 100 },
  { label: "Heavy Duty (100 Ah+)", min: 100, max: 9999 },
];

const BRAND_SERVICE_LINKS: Record<
  string,
  { label: string; href: string; description: string }[]
> = {
  willard: [
    {
      label: "Mobile Battery Replacement Alberton",
      href: "/services/mobile-battery-replacement/alberton",
      description: "On-site Willard swaps with diagnostics & coding.",
    },
    {
      label: "Truck & Fleet Battery Fitment",
      href: "/services/truck-battery-fitment/alrode",
      description: "Pair Willard 658/689 with fleet rotation plans.",
    },
  ],
  exide: [
    {
      label: "Premium Meyersdal Fitment",
      href: "/services/battery-fitment/meyersdal",
      description: "Boot-mounted Exide AGM swaps with coding.",
    },
    {
      label: "Free Battery Testing",
      href: "/services/free-battery-testing/alberton",
      description: "Baseline alternator diagnostics for Exide EFB.",
    },
  ],
  enertec: [
    {
      label: "Deep Cycle & Solar Consult",
      href: "/deep-cycle",
      description: "Enertec AGM/Lithium planning for load shedding.",
    },
    {
      label: "Quote our inverter specialists",
      href: "/quote",
      description: "Design a full Enertec backup solution.",
    },
  ],
};

const BRAND_VEHICLE_LINKS: Record<
  string,
  { label: string; slug: string; note?: string }[]
> = {
  willard: [
    { label: "Toyota Hilux 3.0 D-4D battery guide", slug: "toyota/hilux-3-0-d4d" },
    { label: "Ford Ranger 2.2 TDCi fitment", slug: "ford/ranger-2-2-tdci" },
    { label: "VW Amarok BiTDI battery spec", slug: "volkswagen/amarok-btdi" },
  ],
  exide: [
    { label: "Toyota Fortuner 2.8 GD-6 Start/Stop", slug: "toyota/fortuner-2-8-gd6" },
    { label: "Mercedes C-Class W205 coding workflow", slug: "mercedes/c-class-w205" },
    { label: "BMW 3-Series F30 AGM swap", slug: "bmw/3-series-f30" },
    { label: "Audi Q5 boot battery upgrade", slug: "audi/q5-tdi" },
  ],
  enertec: [
    { label: "Land Rover Discovery 4 dual battery", slug: "land-rover/discovery-4" },
    { label: "Range Rover Sport auxiliary kit", slug: "land-rover/range-rover-sport" },
    { label: "Toyota Land Cruiser 200 touring setup", slug: "toyota/land-cruiser-200" },
  ],
};

const BRAND_POSITIONING: Record<string, string> = {
  willard:
    "Willard remains the go-to OE battery for Hilux, Ranger, and heavy-duty African conditions. We stock every DIN/JIS size and deliver across Alberton within 60 minutes.",
  exide:
    "Exide's AGM and EFB line-up handles Start/Stop vehicles with coding-safe fitment. Ideal for Fortuner, BMW, Mercedes, and premium SUVs needing reserve capacity.",
  enertec:
    "Enertec deep-cycle and lithium batteries power inverter, solar, and expedition builds. Pair them with our inverter design desk for stable backup power.",
};

// The new page component
export default async function BrandPage({ params }: BrandPageProps) {
  const { brandName: brandSlug } = params;
  const allProducts = await getAllProducts();
  const { products, brandName, brands, sizes } = getBrandData(allProducts, brandSlug);

  if (products.length === 0) {
    notFound();
  }

  const normalizedSlug = brandSlug.toLowerCase();
  const canonicalUrl = `${BASE_URL}/products/brand/${normalizedSlug}`;
  const serviceLinks =
    BRAND_SERVICE_LINKS[normalizedSlug] ??
    BRAND_SERVICE_LINKS["willard"] ??
    [];
  const vehicleLinks = BRAND_VEHICLE_LINKS[normalizedSlug] ?? [];
  const positioningCopy =
    BRAND_POSITIONING[normalizedSlug] ??
    "Battery supply, diagnostics, and mobile fitment for Alberton and the East Rand.";

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brandName,
    url: canonicalUrl,
    logo: DEFAULT_LOGO,
    description: positioningCopy,
    areaServed: "Gauteng",
    makesOffer: products.slice(0, 12).map((product) => ({
      "@type": "Product",
      name: product.name,
      sku: product.id,
      url: `${BASE_URL}/product/${product.id}`,
      category: product.category,
    })),
  };

  const productCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    name: `${brandName} Batteries`,
    url: canonicalUrl,
    isRelatedTo: {
      "@type": "Brand",
      name: brandName,
      url: canonicalUrl,
    },
    hasPart: products.slice(0, 20).map((product) => ({
      "@type": "Product",
      name: product.name,
      sku: product.id,
      url: `${BASE_URL}/product/${product.id}`,
    })),
  };

  return (
    <div className="container py-16 space-y-12">
      <JsonLd data={brandSchema} id={`${normalizedSlug}-brand-schema`} />
      <JsonLd
        data={productCollectionSchema}
        id={`${normalizedSlug}-collection-schema`}
      />

      <div className="text-center space-y-3">
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
          <span className="text-battery">{brandName}</span> Batteries
        </h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          {positioningCopy}
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button
            asChild
            size="lg"
            variant="battery"
            trackingId={`brand-${normalizedSlug}-call`}
          >
            <a href="tel:0101096211" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call for {brandName} fitment
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-green-600 hover:bg-green-700 text-white"
            trackingId={`brand-${normalizedSlug}-whatsapp`}
          >
            <a
              href="https://wa.me/27823046926?text=Battery%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              WhatsApp the workshop
            </a>
          </Button>
        </div>
        <Separator className="pt-4" />
      </div>

      <section className="bg-card/40 border border-border rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          How we deploy {brandName} batteries in Alberton
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {serviceLinks.map((link) => (
            <div
              key={link.href}
              className="space-y-2 p-5 rounded-xl bg-background border border-border"
            >
              <h3 className="text-xl font-semibold text-battery">
                {link.label}
              </h3>
              <p className="text-muted-foreground">{link.description}</p>
              <Link
                href={link.href}
                className="text-sm font-semibold text-foreground hover:text-battery"
              >
                Explore service →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {vehicleLinks.length > 0 && (
        <section className="bg-secondary/20 border border-border rounded-2xl p-8 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Popular vehicles running {brandName}
          </h2>
          <p className="text-muted-foreground">
            These are the most common fitment guides customers read before
            booking. Use them to compare specs and service workflows.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {vehicleLinks.map((vehicle) => (
              <a
                key={vehicle.slug}
                href={`/vehicles/${vehicle.slug}`}
                className="p-4 bg-background rounded-xl border border-border hover:border-battery transition-colors"
              >
                <p className="font-semibold text-foreground">{vehicle.label}</p>
                {vehicle.note && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {vehicle.note}
                  </p>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 lg:flex-shrink-0">
          <CategoryFilterSidebar
            currentCategory={`${brandName} Batteries`}
            allBrands={brands}
            allSizes={sizes}
            capacityFilters={allCapacityFilters}
          />
          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p>
              Need a quote for fleet pricing or inverter backup systems?{" "}
              <Link href="/quote" className="font-semibold text-battery">
                Request a custom proposal.
              </Link>
            </p>
            <p>
              Prefer in-store diagnostics?{" "}
              <Link
                href="/services/free-battery-testing/alberton"
                className="font-semibold text-battery"
              >
                Book a battery test slot.
              </Link>
            </p>
          </div>
        </div>

        <div className="lg:flex-grow">
          <ProductListPage
            title={`${brandName} Catalog`}
            description={`Displaying all ${products.length} ${brandName} products in stock.`}
            products={products}
          />
        </div>
      </div>
    </div>
  );
}