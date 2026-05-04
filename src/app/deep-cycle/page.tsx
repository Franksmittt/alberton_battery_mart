// src/app/deep-cycle/page.tsx
import ProductListPage from "@/components/layout/ProductListPage";
import { ALL_PRODUCTS, ProductCardData } from "@/data/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sun, Zap, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

// --- NEW: Page-Specific Metadata for SEO ---
export const metadata: Metadata = {
  title: "Solar, Inverter & Deep Cycle Batteries in Alberton",
  description: "Get the best batteries for load shedding in Alberton. We stock Deep Cycle, AGM, and Lithium (LiFePO₄) batteries for inverters and solar systems.",
  keywords: [
    'deep cycle batteries Alberton',
    'solar batteries',
    'inverter batteries',
    'load shedding batteries',
    'LiFePO4 batteries',
    'AGM deep cycle'
  ],
  openGraph: {
    title: "Solar, Inverter & Deep Cycle Batteries in Alberton",
    description: "Get the best batteries for load shedding in Alberton. We stock Deep Cycle, AGM, and Lithium (LiFePO₄) batteries for inverters and solar systems.",
    url: `${BASE_URL}/deep-cycle`,
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Cycle & Solar Batteries - Alberton Battery Mart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Solar, Inverter & Deep Cycle Batteries in Alberton",
    description: "Get the best batteries for load shedding in Alberton. We stock Deep Cycle, AGM, and Lithium (LiFePO₄) batteries for inverters and solar systems.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: `${BASE_URL}/deep-cycle`,
  },
};

// Filters for: Deep Cycle
const DEEP_CYCLE_PRODUCTS = ALL_PRODUCTS.filter((p: ProductCardData) => 
  p.category === 'Deep Cycle'
);

const PRODUCT_COLLECTION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProductCollection",
  name: "Solar, Inverter & Deep Cycle Batteries",
  description: "Get the best batteries for load shedding in Alberton. We stock Deep Cycle, AGM, and Lithium (LiFePO₄) batteries for inverters and solar systems.",
  url: `${BASE_URL}/deep-cycle`,
  hasPart: DEEP_CYCLE_PRODUCTS.slice(0, 20).map((product) => ({
    "@type": "Product",
    name: product.name,
    sku: product.id.toString(),
    url: `${BASE_URL}/product/${product.id}`,
  })),
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Products",
      item: `${BASE_URL}/products`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Deep Cycle & Solar Batteries",
      item: `${BASE_URL}/deep-cycle`,
    },
  ],
};

export default function DeepCycleBatteriesPage() {
  return (
    <>
      <JsonLd data={PRODUCT_COLLECTION_SCHEMA} id="product-collection-schema" />
      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <div className="container py-16 space-y-16">
      
      {/* --- NEW: Full Landing Page Content --- */}
      <div className="text-center space-y-4">
        <Sun className="h-16 w-16 text-battery mx-auto" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
          Solar & Inverter <span className="text-battery">Batteries</span>
        </h1>
        <p className="text-2xl text-muted-foreground max-w-4xl mx-auto font-medium">
          Expert solutions for load shedding, backup power, and off-grid living in Alberton.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 bg-card border border-border p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-foreground">
          Stop Guessing. Get the Right Backup Power.
        </h2>
        <p className="text-lg text-muted-foreground">
          Choosing the right battery for your inverter or solar setup is critical. A standard car battery will fail in months. You need a **Deep Cycle** battery designed to handle long, repeated discharges. As Alberton's power experts, we provide the technical advice you need.
        </p>
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div className="flex items-start space-x-3">
            <Zap className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">AGM vs. Lithium (LiFePO₄)</h3>
              <p className="text-muted-foreground">We stock both AGM (for reliable, budget-friendly backup) and high-performance Lithium batteries (for long-life, high-cycle solar systems) and can explain which is right for you.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ShieldCheck className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">Warranty & Expert Advice</h3>
              <p className="text-muted-foreground">Don't risk your investment. We provide full manufacturer warranties and expert advice on charging, maintenance, and setup to ensure your system lasts.</p>
            </div>
          </div>
        </div>
        <div className="text-center pt-6">
          <Button asChild size="lg" variant="battery">
            <Link href="/quote">Request a Free Solar/Inverter Quote</Link>
          </Button>
        </div>
      </div>

      <Separator />
      {/* --- END NEW CONTENT --- */}

      {/* This is the original component, now placed at the bottom */}
      <ProductListPage
        title="Deep Cycle Product Catalog"
        description={`High-end LiFePO₄ and AGM Deep Cycle solutions for uninterrupted backup power. ${DEEP_CYCLE_PRODUCTS.length} products available.`}
        products={DEEP_CYCLE_PRODUCTS}
      />
    </div>
    </>
  );
}