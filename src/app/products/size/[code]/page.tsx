// src/app/products/size/[code]/page.tsx
import Link from "next/link";
import ProductListPage from "@/components/layout/ProductListPage";
import { notFound } from "next/navigation";
import CategoryFilterSidebar from "@/components/layout/CategoryFilterSidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Battery } from "lucide-react";
import { productSizeSlug } from "@/lib/product-size-slugs";
import { createItemListSchema } from "@/lib/seo/schema";
import IntentLinks from "@/components/seo/IntentLinks";
import FaqSchema from "@/components/seo/FaqSchema";
import { getClusterConfig } from "@/lib/battery-sizes/clusters";
import { getHubFaq, summarizeBrands } from "@/lib/battery-sizes/content";
import { getFittedPriceLabel, getProductsBySizeCode } from "@/lib/products/by-size";
import { extractBaseSizeCode } from "@/lib/products/size-matching";

export const dynamic = "force-dynamic";

// Props interface for the dynamic page
interface SizePageProps {
  params: {
    code: string;
  };
}

// Dynamic Metadata for SEO
export async function generateMetadata({
  params,
}: SizePageProps): Promise<Metadata> {
  const code = params.code.toUpperCase();
  const url = `${BASE_URL}/products/size/${productSizeSlug(params.code)}`;

  const description = `Shop ${code} size batteries in Alberton. All brands available: Willard, Exide, Enertec. Free fitment and testing included.`;

  return {
    title: `${code} Battery Price & Fitment in Alberton | Alberton Battery Mart`,
    description,
    keywords: [
      `${code} battery`,
      `${code} battery price`,
      `${code} battery Alberton`,
      `${code} battery replacement`,
      "battery size " + code,
    ],
    openGraph: {
      title: `${code} Battery Price & Fitment in Alberton`,
      description,
      url,
      type: "website",
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${code} Battery - Alberton Battery Mart`,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Filter products by canonical battery size code (619, 628, etc.)
const getSizeData = async (codeSlug: string) => {
  const baseCode = extractBaseSizeCode(codeSlug) ?? codeSlug.toUpperCase();
  const products = await getProductsBySizeCode(baseCode);
  const brands = Array.from(new Set(products.map((p) => p.brandName)));
  const sizes = Array.from(new Set(products.map((p) => p.sku)));

  return { products, brands, sizes, baseCode };
};

// Universal Capacity Filters
const allCapacityFilters = [
  { label: "Small (Under 20 Ah)", min: 0, max: 20 },
  { label: "Medium (20-75 Ah)", min: 20, max: 75 },
  { label: "Large (75-100 Ah)", min: 75, max: 100 },
  { label: "Heavy Duty (100 Ah+)", min: 100, max: 9999 },
];

// The page component
export default async function SizePage({ params }: SizePageProps) {
  const { code: codeSlug } = params;
  const { products, brands, sizes, baseCode } = await getSizeData(codeSlug);

  if (products.length === 0) {
    notFound();
  }

  const code = baseCode.toUpperCase();
  const canonicalUrl = `${BASE_URL}/products/size/${productSizeSlug(code)}`;
  const cluster = getClusterConfig(baseCode);
  const hubFaq =
    cluster && products.length
      ? getHubFaq(
          cluster,
          getFittedPriceLabel(products),
          summarizeBrands(products)
        )
      : [];

  // Get product specs for the first product (they should all be similar size)
  const avgCapacity = Math.round(
    products.reduce((sum, p) => sum + p.ahCapacity, 0) / products.length
  );
  const avgCCA = Math.round(
    products.reduce((sum, p) => sum + (p.cca || 0), 0) / products.length
  );

  const productCollectionSchema = createItemListSchema({
    name: `${code} Size Batteries`,
    url: canonicalUrl,
    description: `All ${code} size batteries available at Alberton Battery Mart. Includes Willard, Exide, and Enertec brands.`,
    items: products.slice(0, 20).map((product) => ({
      name: product.name,
      url: `${BASE_URL}/products/id/${product.id}`,
    })),
  });

  return (
    <div className="container py-16 space-y-12">
      <JsonLd
        data={productCollectionSchema}
        id={`${codeSlug}-size-collection-schema`}
      />
      {hubFaq.length > 0 && <FaqSchema id={`${code}-size-faq`} items={hubFaq} />}

      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Battery className="h-8 w-8 text-battery" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
            <span className="text-battery">{code}</span> Battery Size
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          All {code} size batteries available in Alberton. Compare prices, specs, and brands. Free fitment and testing included.
          {cluster && (
            <>
              {" "}
              <Link href={cluster.hubPath} className="text-battery font-semibold hover:underline">
                View the full {code} car battery guide
              </Link>
              .
            </>
          )}
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button
            asChild
            size="lg"
            variant="battery"
          >
            <a href="tel:0101096211" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call for {code} fitment
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <a
              href={`https://wa.me/27823046926?text=Battery%20quote%20for%20size%20${code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              WhatsApp quote
            </a>
          </Button>
        </div>
        <Separator className="pt-4" />
      </div>

      <section className="bg-card/40 border border-border rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          {code} Battery Specifications
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2 p-5 rounded-xl bg-background border border-border">
            <h3 className="text-lg font-semibold text-battery">Average Capacity</h3>
            <p className="text-2xl font-bold text-foreground">{avgCapacity}Ah</p>
            <p className="text-sm text-muted-foreground">
              Typical capacity for {code} size batteries
            </p>
          </div>
          <div className="space-y-2 p-5 rounded-xl bg-background border border-border">
            <h3 className="text-lg font-semibold text-battery">Average CCA</h3>
            <p className="text-2xl font-bold text-foreground">{avgCCA} CCA</p>
            <p className="text-sm text-muted-foreground">
              Cold cranking amps rating
            </p>
          </div>
          <div className="space-y-2 p-5 rounded-xl bg-background border border-border">
            <h3 className="text-lg font-semibold text-battery">Brands Available</h3>
            <p className="text-2xl font-bold text-foreground">{brands.length}</p>
            <p className="text-sm text-muted-foreground">
              {brands.join(", ")}
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 lg:flex-shrink-0">
          <CategoryFilterSidebar
            currentCategory={`${code} Size Batteries`}
            allBrands={brands}
            allSizes={sizes}
            capacityFilters={allCapacityFilters}
          />
          <div className="mt-8 space-y-4 text-sm text-muted-foreground">
            <p>
              Not sure if {code} fits your vehicle?{" "}
              <Link href="/fitment" className="font-semibold text-battery">
                Check our fitment guide.
              </Link>
            </p>
            <p>
              Need mobile fitment?{" "}
              <Link
                href="/services"
                className="font-semibold text-battery"
              >
                Book a callout.
              </Link>
            </p>
          </div>
        </div>

        <div className="lg:flex-grow">
          <ProductListPage
            title={`${code} Size Battery Options`}
            description={`Displaying all ${products.length} ${code} size batteries from all brands. Compare prices and specs.`}
            products={products}
          />
        </div>
      </div>

      <IntentLinks
        title={`High-intent ${code} battery support`}
        description="Move from size research to the closest service page for fitment, diagnostics, or suburb dispatch."
        columnsClassName="md:grid-cols-3"
        links={[
          ...(cluster
            ? [
                { href: cluster.hubPath, label: `${code} car battery hub — Alberton` },
                { href: `/${code}-car-battery-price`, label: `${code} battery price comparison` },
                { href: `/${code}-battery-specs`, label: `${code} battery specifications` },
              ]
            : []),
          {
            href: "/services/mobile-battery-replacement/alberton",
            label: `${code} mobile battery replacement in Alberton`,
          },
          {
            href: "/services/free-battery-testing/new-redruth",
            label: `${code} battery testing at New Redruth`,
          },
          {
            href: "/services/mobile-battery-replacement/meyersdal",
            label: `${code} battery callout in Meyersdal`,
          },
          {
            href: "/services/emergency-jump-start/alberton-central",
            label: `${code} emergency battery help in Alberton Central`,
          },
          {
            href: "/vehicles/toyota/hilux-3-0-d4d",
            label: "Toyota Hilux battery fitment guide",
          },
          {
            href: "/vehicles/ford/ranger-2-2-tdci",
            label: "Ford Ranger battery fitment guide",
          },
          ...(code === "619"
            ? [{ href: "/vehicles/volkswagen/polo-vivo", label: "VW Polo Vivo 619 battery guide" }]
            : []),
        ]}
      />
    </div>
  );
}

