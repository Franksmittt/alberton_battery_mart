// src/app/products/size/[code]/page.tsx
import Link from "next/link";
import ProductListPage from "@/components/layout/ProductListPage";
import { getAllProducts, ProductCardData, ALL_PRODUCTS } from "@/data/products";
import { notFound } from "next/navigation";
import CategoryFilterSidebar from "@/components/layout/CategoryFilterSidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Battery } from "lucide-react";

// This function tells Next.js which battery codes to pre-build
export async function generateStaticParams() {
  const sizes = Array.from(new Set(ALL_PRODUCTS.map((p) => p.sku)));
  return sizes.map((size) => ({
    code: size.toLowerCase(),
  }));
}

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
  const url = `${BASE_URL}/products/size/${params.code.toLowerCase()}`;

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

// Helper to filter products by size/code
const getSizeData = (allProducts: ProductCardData[], codeSlug: string) => {
  const products = allProducts.filter(
    (p) => p.sku.toLowerCase() === codeSlug.toLowerCase()
  );

  const brands = Array.from(new Set(products.map((p) => p.brandName)));
  const sizes = Array.from(new Set(products.map((p) => p.sku)));

  return { products, brands, sizes };
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
  const allProducts = await getAllProducts();
  const { products, brands, sizes } = getSizeData(allProducts, codeSlug);

  if (products.length === 0) {
    notFound();
  }

  const code = codeSlug.toUpperCase();
  const canonicalUrl = `${BASE_URL}/products/size/${codeSlug.toLowerCase()}`;

  // Get product specs for the first product (they should all be similar size)
  const avgCapacity = Math.round(
    products.reduce((sum, p) => sum + p.ahCapacity, 0) / products.length
  );
  const avgCCA = Math.round(
    products.reduce((sum, p) => sum + (p.cca || 0), 0) / products.length
  );

  const productCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    name: `${code} Size Batteries`,
    url: canonicalUrl,
    description: `All ${code} size batteries available at Alberton Battery Mart. Includes Willard, Exide, and Enertec brands.`,
    hasPart: products.slice(0, 20).map((product) => ({
      "@type": "Product",
      name: product.name,
      sku: product.id,
      url: `${BASE_URL}/product/${product.id}`,
      brand: product.brandName,
      category: product.category,
    })),
  };

  return (
    <div className="container py-16 space-y-12">
      <JsonLd
        data={productCollectionSchema}
        id={`${codeSlug}-size-collection-schema`}
      />

      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Battery className="h-8 w-8 text-battery" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
            <span className="text-battery">{code}</span> Battery Size
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          All {code} size batteries available in Alberton. Compare prices, specs, and brands. Free fitment and testing included.
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
    </div>
  );
}

