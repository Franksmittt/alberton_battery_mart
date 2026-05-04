// src/app/products/type/deep-cycle/page.tsx
import ProductListPage from "@/components/layout/ProductListPage";
import { getAllProducts, ProductCardData } from "@/data/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sun, Zap, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

// Make this page dynamic so it can read updated prices from JSON
export const dynamic = 'force-dynamic';

const PAGE_TITLE = "Solar, Inverter & Deep Cycle Batteries in Alberton";
const PAGE_DESCRIPTION =
  "Get load-shedding ready with AGM and LiFePO₄ deep-cycle batteries plus expert inverter advice in Alberton.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "deep cycle batteries Alberton",
    "LiFePO4 inverter battery",
    "solar battery Alberton",
    "load shedding backup",
  ],
  alternates: {
    canonical: `${BASE_URL}/products/type/deep-cycle`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/deep-cycle`,
    type: "website",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Cycle & Solar Batteries - Alberton Battery Mart',
      },
    ],
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ['/images/og-image.jpg'],
  },
};

// Filters will be applied in the component

const SERVICE_LINKS = [
  {
    label: "Request a Solar/Inverter Quote",
    href: "/quote",
    description:
      "Sizing calculator, load profile analysis, and equipment sourcing.",
  },
  {
    label: "Deep Cycle & Solar Knowledge Hub",
    href: "/deep-cycle",
    description: "AGM vs LiFePO₄ guides, charging recommendations, maintenance.",
  },
  {
    label: "Free Battery Testing - Alberton",
    href: "/services/free-battery-testing/alberton",
    description: "Check alternator + charger health before you upgrade batteries.",
  },
];

const VEHICLE_LINKS = [
  { label: "Land Cruiser 200 dual battery setup", slug: "toyota/land-cruiser-200" },
  { label: "Range Rover Sport auxiliary upgrade", slug: "land-rover/range-rover-sport" },
  { label: "Discovery 4 load-shedding build", slug: "land-rover/discovery-4" },
];

export default async function DeepCycleBatteriesPage() {
  const allProducts = await getAllProducts();
  const DEEP_CYCLE_PRODUCTS = allProducts.filter((p: ProductCardData) => 
    p.category === 'Deep Cycle'
  );

  const productCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/deep-cycle`,
    isRelatedTo: {
      "@type": "Service",
      name: "Inverter and Solar Deployment",
      url: `${BASE_URL}/quote`,
    },
    hasPart: DEEP_CYCLE_PRODUCTS.slice(0, 20).map((product) => ({
      "@type": "Product",
      name: product.name,
      sku: product.id,
      url: `${BASE_URL}/product/${product.id}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Should I use AGM or Lithium for my inverter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AGM batteries are affordable and work for moderate load shedding, while LiFePO₄ handles higher cycles and deeper discharge for heavy usage.",
        },
      },
      {
        "@type": "Question",
        name: "Can I mix old and new deep-cycle batteries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Mixing old and new batteries causes imbalance and voids warranties. Replace the entire bank together or isolate banks.",
        },
      },
      {
        "@type": "Question",
        name: "Do you install and commission inverter batteries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We perform installs via our solar partners, validate charger settings, and commission the battery bank to ensure warranty compliance.",
        },
      },
    ],
  };

  return (
    <div className="container py-16 space-y-16">
      <JsonLd data={productCollectionSchema} id="deep-cycle-collection" />
      <JsonLd data={faqSchema} id="deep-cycle-faq" />
      
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
          <Button
            asChild
            size="lg"
            variant="battery"
            trackingId="type-deep-cycle-quote"
          >
            <Link href="/quote">Request a Free Solar/Inverter Quote</Link>
          </Button>
        </div>
      </div>

      <Separator />
      {/* --- END NEW CONTENT --- */}

      <section className="grid md:grid-cols-2 gap-6">
        {SERVICE_LINKS.map((service) => (
          <div
            key={service.href}
            className="p-6 rounded-2xl bg-secondary/20 border border-border space-y-3"
          >
            <h3 className="text-xl font-semibold text-battery">
              {service.label}
            </h3>
            <p className="text-muted-foreground">{service.description}</p>
            <Link
              href={service.href}
              className="text-sm font-semibold text-foreground hover:text-battery"
            >
              Explore →
            </Link>
          </div>
        ))}
      </section>

      {VEHICLE_LINKS.length > 0 && (
        <section className="bg-card/50 border border-border rounded-2xl p-8 space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Vehicles we upgrade with dual/deep-cycle banks
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {VEHICLE_LINKS.map((vehicle) => (
              <Link
                key={vehicle.slug}
                href={`/vehicles/${vehicle.slug}`}
                className="p-4 rounded-xl bg-background border border-border hover:border-battery transition-colors"
              >
                {vehicle.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      <ProductListPage
        title="Deep Cycle Product Catalog"
        description={`High-end LiFePO₄ and AGM Deep Cycle solutions for uninterrupted backup power. ${DEEP_CYCLE_PRODUCTS.length} products available.`}
        products={DEEP_CYCLE_PRODUCTS}
      />
    </div>
  );
}