// src/app/products/type/automotive/page.tsx
import ProductListPage from "@/components/layout/ProductListPage";
import { getAllProducts, ProductCardData } from "@/data/products";
import CategoryFilterSidebar from "@/components/layout/CategoryFilterSidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Phone, Zap, ShieldCheck, Gauge, Car } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

// Make this page dynamic so it can read updated prices from JSON
export const dynamic = 'force-dynamic';

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
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Car Batteries - Alberton Battery Mart',
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

const EMERGENCY_PHONE_DISPLAY = "010 109 6211";
const EMERGENCY_PHONE_LINK = "0101096211";

const getFilterOptions = (products: ProductCardData[]) => {
    const brands = Array.from(new Set(products.map(p => p.brandName)));
    const sizes = Array.from(new Set(products.map(p => p.sku)));
    return { brands, sizes };
};

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
    description: "Boot battery projects for Audi, BMW, Mercedes.",
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
  const AUTOMOTIVE_PRODUCTS = allProducts.filter((p: ProductCardData) => 
    p.category === 'Standard Automotive' || p.category === 'Performance AGM/EFB'
  );
  const { brands, sizes } = getFilterOptions(AUTOMOTIVE_PRODUCTS);

  const productCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/automotive`,
    isRelatedTo: {
      "@type": "Service",
      name: "Mobile Battery Replacement",
      url: `${BASE_URL}/services/mobile-battery-replacement/alberton`,
    },
    hasPart: AUTOMOTIVE_PRODUCTS.slice(0, 20).map((product) => ({
      "@type": "Product",
      name: product.name,
      sku: product.id,
      url: `${BASE_URL}/product/${product.id}`,
    })),
  };

  return (
    <div className="container py-16 space-y-12">
      <JsonLd data={productCollectionSchema} id="automotive-collection-schema" />
        
        <div className="text-center space-y-3">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
                <span className="text-battery">Car Battery</span> Catalog: Standard & Performance
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                 All certified maintenance-free batteries for your vehicle, including specialized EFB/AGM required for Start/Stop systems.
            </p>
        </div>
        
        {/* --- NEW SECTION: Bakkie/Workhorse Pillar Content --- */}
        <div className="max-w-5xl mx-auto space-y-6 bg-card border border-border p-8 rounded-lg shadow-xl">
          <div className="flex items-center space-x-3">
            <Gauge className="h-10 w-10 text-battery flex-shrink-0" />
            <h2 className="text-3xl font-bold text-foreground">
              For Bakkies, 4x4s, & Start/Stop Vehicles
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            A modern bakkie like a **Toyota Hilux** or **Ford Ranger** is not just a "car." The high electrical demands and Start/Stop technology in new models require a specialized **EFB or AGM battery.**
          </p>
          <p className="text-lg text-muted-foreground">
            Installing a standard "cheap" battery will lead to premature failure and system warnings. We stock the correct, warrantied batteries your bakkie or modern SUV needs.
          </p>
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="flex items-start space-x-3">
              <Zap className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">EFB for High Demand</h3>
                <p className="text-muted-foreground">Enhanced Flooded Batteries (EFB) are the perfect upgrade for vehicles with high electrical loads or basic Start/Stop.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldCheck className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">AGM for Peak Performance</h3>
                <p className="text-muted-foreground">Absorbent Glass Mat (AGM) is mandatory for advanced Start/Stop, regenerative braking, and premium vehicles (BMW, Audi, Mercedes).</p>
              </div>
            </div>
          </div>
        </div>
        {/* --- END NEW SECTION --- */}

        {/* Primary CTA Button on this page (Fixed number display) */}
        <div className="flex flex-col items-center gap-4 text-center max-w-md mx-auto">
             <Button
               asChild
               size="xl"
               variant="battery"
               className="w-full shadow-lg"
               trackingId="type-automotive-call"
             >
               <a href={`tel:${EMERGENCY_PHONE_LINK}`} className="flex w-full items-center justify-center gap-3">
                    <Phone className="h-6 w-6" />
                    <span>Call Us: {EMERGENCY_PHONE_DISPLAY}</span>
                </a>
             </Button>
             <Button
               asChild
               size="xl"
               variant="secondary"
               className="w-full bg-green-600 hover:bg-green-700 text-white"
               trackingId="type-automotive-whatsapp"
             >
               <a
                 href="https://wa.me/27823046926?text=Battery%20quote"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex w-full items-center justify-center gap-2"
               >
                 <Car className="h-5 w-5" />
                 WhatsApp the workshop
               </a>
             </Button>
        </div>

        <Separator className="pt-4" />

        <section className="grid md:grid-cols-3 gap-6">
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
              Vehicles we service daily
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
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

        {/* --- MAIN LAYOUT: SIDEBAR + PRODUCT GRID --- */}
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Filtering Sidebar */}
            <div className="lg:w-64 lg:flex-shrink-0">
                 <CategoryFilterSidebar
                    currentCategory="Car Batteries"
                    allBrands={brands}
                    allSizes={sizes}
                    // Note: This page uses the default capacity filters, which is correct
                 />
            </div>

            {/* Right Column: Product List */}
            <div className="lg:flex-grow">
                <ProductListPage
                    title="All Automotive Batteries"
                     description={`Displaying ${AUTOMOTIVE_PRODUCTS.length} products ready for fitment.`}
                    products={AUTOMOTIVE_PRODUCTS}
                />
            </div>

        </div>
    </div>
  );
}