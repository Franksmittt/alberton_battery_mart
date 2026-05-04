// src/app/products/type/performance/page.tsx
import ProductListPage from "@/components/layout/ProductListPage";
import { ALL_PRODUCTS, ProductCardData } from "@/data/products";
import CategoryFilterSidebar from "@/components/layout/CategoryFilterSidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { ShieldCheck, Zap, BrainCircuit, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

const PAGE_TITLE =
  "AGM & EFB Start/Stop Batteries in Alberton | Alberton Battery Mart";
const PAGE_DESCRIPTION =
  "Premium AGM/EFB Start-Stop batteries with coding, BMS registration, and on-site fitment.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "AGM battery Alberton",
    "Start Stop battery coding",
    "EFB battery replacement",
    "premium battery fitment",
  ],
  alternates: {
    canonical: `${BASE_URL}/products/type/performance`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/performance`,
    type: "website",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AGM & EFB Start/Stop Batteries - Alberton Battery Mart',
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

// Filters for: Performance AGM/EFB
const PERFORMANCE_PRODUCTS = ALL_PRODUCTS.filter((p: ProductCardData) => 
  p.category === 'Performance AGM/EFB'
);

const getFilterOptions = (products: ProductCardData[]) => {
    const brands = Array.from(new Set(products.map(p => p.brandName)));
    const sizes = Array.from(new Set(products.map(p => p.sku)));
    return { brands, sizes };
};
const { brands, sizes } = getFilterOptions(PERFORMANCE_PRODUCTS);

const SERVICE_LINKS = [
  {
    label: "Premium Fitment - Meyersdal",
    href: "/services/battery-fitment/meyersdal",
    description: "Boot battery projects, coding, and Start/Stop calibration.",
  },
  {
    label: "Mobile Battery Replacement - Alberton",
    href: "/services/mobile-battery-replacement/alberton",
    description: "On-site swaps for estates and office parks.",
  },
];

const VEHICLE_LINKS = [
  { label: "BMW 3-Series F30 Start/Stop workflow", slug: "bmw/3-series-f30" },
  { label: "Mercedes C-Class W205 AGM coding", slug: "mercedes/c-class-w205" },
  { label: "Audi Q5 boot battery replacement", slug: "audi/q5-tdi" },
];

export default function PerformanceBatteriesPage() {
  const productCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/performance`,
    isRelatedTo: {
      "@type": "Service",
      name: "Premium Battery Fitment - Meyersdal",
      url: `${BASE_URL}/services/battery-fitment/meyersdal`,
    },
    hasPart: PERFORMANCE_PRODUCTS.slice(0, 20).map((product) => ({
      "@type": "Product",
      name: product.name,
      sku: product.id,
      url: `${BASE_URL}/product/${product.id}`,
    })),
  };

  return (
    <div className="container py-16 space-y-12">
      <JsonLd data={productCollectionSchema} id="performance-collection-schema" />
        
        <div className="text-center space-y-3">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
                <span className="text-battery">Performance</span> & Start/Stop Batteries
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                 The specialized, high-capacity AGM/EFB solutions required for modern vehicles with Start/Stop systems. Longest warranties available.
            </p>
            <Separator className="pt-4" />
        </div>

        {/* --- EDUCATIONAL SECTION: AGM vs EFB Explained --- */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* What are AGM/EFB Batteries */}
          <div className="bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-battery" />
              <h2 className="text-3xl font-black text-white">
                Understanding AGM & EFB Batteries
              </h2>
            </div>
            <p className="text-lg text-white/80 leading-relaxed">
              Modern vehicles with Start/Stop technology require advanced battery chemistry to handle frequent engine restarts and power-hungry electronics. Standard flooded batteries cannot meet these demands, which is why manufacturers specify either <strong className="text-white">AGM (Absorbent Glass Mat)</strong> or <strong className="text-white">EFB (Enhanced Flooded Battery)</strong> technology.
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* EFB Section */}
            <div className="bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border border-white/10 rounded-2xl p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-battery/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-battery" />
                </div>
                <h3 className="text-2xl font-black text-white">EFB (Enhanced Flooded Battery)</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-bold text-battery uppercase tracking-wider mb-2">What It Is</p>
                  <p className="text-white/80">
                    An improved version of traditional flooded batteries with thicker plates and enhanced cycling capability. Designed as a cost-effective solution for entry-level Start/Stop systems.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-battery uppercase tracking-wider mb-2">Best For</p>
                  <ul className="text-white/80 space-y-1 list-disc list-inside">
                    <li>Entry-level Start/Stop vehicles (VW Polo, Ford EcoSport)</li>
                    <li>Vehicles with basic Start/Stop (no regenerative braking)</li>
                    <li>Budget-conscious replacements</li>
                    <li>Standard electrical loads</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-battery uppercase tracking-wider mb-2">Key Benefits</p>
                  <ul className="text-white/80 space-y-1 list-disc list-inside">
                    <li>2-3x better cycle life than standard flooded</li>
                    <li>Better charge acceptance for Start/Stop</li>
                    <li>More affordable than AGM</li>
                    <li>Handles moderate deep cycling</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AGM Section */}
            <div className="bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border border-white/10 rounded-2xl p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-battery/20 flex items-center justify-center">
                  <BrainCircuit className="h-6 w-6 text-battery" />
                </div>
                <h3 className="text-2xl font-black text-white">AGM (Absorbent Glass Mat)</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-bold text-battery uppercase tracking-wider mb-2">What It Is</p>
                  <p className="text-white/80">
                    A sealed, maintenance-free battery where the electrolyte is absorbed in a fiberglass mat. This design allows for superior performance, vibration resistance, and deep cycling capability.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-battery uppercase tracking-wider mb-2">Best For</p>
                  <ul className="text-white/80 space-y-1 list-disc list-inside">
                    <li>Premium vehicles (BMW, Mercedes, Audi)</li>
                    <li>Advanced Start/Stop with regenerative braking</li>
                    <li>High electrical load (premium audio, heated seats)</li>
                    <li>Vehicles requiring maximum performance</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-battery uppercase tracking-wider mb-2">Key Benefits</p>
                  <ul className="text-white/80 space-y-1 list-disc list-inside">
                    <li>3-4x better cycle life than EFB</li>
                    <li>Superior charge acceptance</li>
                    <li>Vibration resistant (ideal for boot mounting)</li>
                    <li>No maintenance required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* When to Use Each */}
          <div className="bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border border-white/10 rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-battery" />
              Which Battery Do You Need?
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-bold text-white mb-2">⚠️ Critical Rule: Match Your Original Battery Type</p>
                <p className="text-white/80">
                  Your vehicle was designed for either EFB or AGM. <strong className="text-white">Never downgrade from AGM to EFB</strong> on a vehicle that originally came with AGM. The charging system expects AGM chemistry, and using EFB will cause premature failure and void warranties.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-white mb-2">Choose EFB if:</p>
                  <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                    <li>Your vehicle originally had EFB</li>
                    <li>Entry-level Start/Stop system</li>
                    <li>Standard electrical accessories</li>
                    <li>Budget is a consideration</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Choose AGM if:</p>
                  <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                    <li>Your vehicle originally had AGM</li>
                    <li>Premium brand (BMW, Mercedes, Audi)</li>
                    <li>Advanced Start/Stop with regen braking</li>
                    <li>High electrical load or boot-mounted battery</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Specialist Coding Section */}
          <div className="bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border-2 border-battery/30 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-10 w-10 text-battery flex-shrink-0" />
              <h2 className="text-3xl font-black text-white">
                Expert BMS Coding & Registration
              </h2>
            </div>
            <p className="text-lg text-white/80 leading-relaxed">
              Installing a new AGM or EFB battery in a modern vehicle is not enough. The vehicle's Battery Management System (BMS) <strong className="text-white">must be registered</strong> (or "coded") to accept the new battery. Skipping this step will cause the system to overcharge your new battery, destroying it in months.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              We are one of the only specialists in Alberton with the advanced diagnostic tools to perform this critical service for BMW, Mercedes, Audi, and other premium vehicles.
            </p>
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Protect Your Warranty</h3>
                  <p className="text-white/70">Failure to register the new battery can void its warranty. We ensure it's done right, protecting your investment.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Full System Calibration</h3>
                  <p className="text-white/70">Our service ensures your car's charging profile and Start/Stop system are perfectly calibrated to the new battery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center max-w-md mx-auto">
          <Button
            asChild
            size="xl"
            variant="battery"
            trackingId="type-performance-call"
            className="w-full shadow-lg"
          >
            <a href="tel:0101096211" className="flex w-full items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Call Premium Fitment Desk
            </a>
          </Button>
          <Button
            asChild
            size="xl"
            variant="secondary"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            trackingId="type-performance-whatsapp"
          >
            <a
              href="https://wa.me/27823046926?text=AGM%20battery%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              WhatsApp our technicians
            </a>
          </Button>
        </div>

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
              Vehicles we recode daily
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


        {/* --- MAIN LAYOUT: SIDEBAR + PRODUCT GRID --- */}
        <div className="flex flex-col lg:flex-row gap-8 pt-8">
             
            {/* Left Column: Filtering Sidebar */}
            <div className="lg:w-64 lg:flex-shrink-0">
                <CategoryFilterSidebar
                    currentCategory="Performance AGM/EFB"
                    allBrands={brands}
                     allSizes={sizes}
                    // This page will use the default car capacity filters, which is fine
                />
            </div>

            {/* Right Column: Product List */}
            <div className="lg:flex-grow">
 
                 <ProductListPage
                    title="All Performance & Start/Stop Batteries"
                    description={`Displaying ${PERFORMANCE_PRODUCTS.length} specialized EFB and AGM products ready for fitment.`}
                    products={PERFORMANCE_PRODUCTS}
                 />
            </div>

        </div>
    </div>
  );
}