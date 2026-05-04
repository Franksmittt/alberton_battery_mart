// src/app/products/type/truck-commercial/page.tsx
import ProductListPage from "@/components/layout/ProductListPage";
import { getAllProducts, ProductCardData } from "@/data/products";
import CategoryFilterSidebar from "@/components/layout/CategoryFilterSidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { Building, ShieldCheck, Zap, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

// Make this page dynamic so it can read updated prices from JSON
export const dynamic = 'force-dynamic';

const PAGE_TITLE = "Truck & Commercial Batteries in Alberton | Alberton Battery Mart";
const PAGE_DESCRIPTION =
  "High-CCA truck, bus, and fleet batteries with on-site fitment across Alberton and the East Rand.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "truck battery Alberton",
    "fleet battery replacement",
    "Willard 658 price",
    "heavy duty CCA battery",
  ],
  alternates: {
    canonical: `${BASE_URL}/products/type/truck-commercial`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/truck-commercial`,
    type: "website",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Truck & Commercial Batteries - Alberton Battery Mart',
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

const truckCapacityFilters = [
    { label: "Heavy Duty (90-115 Ah)", min: 90, max: 115 },
    { label: "Super Heavy Duty (115Ah+)", min: 115, max: 9999 },
];

const getFilterOptions = (products: ProductCardData[]) => {
    const brands = Array.from(new Set(products.map(p => p.brandName)));
    const sizes = Array.from(new Set(products.map(p => p.sku)));
    return { brands, sizes };
};

const SERVICE_LINKS = [
  {
    label: "Truck & Fleet Battery Fitment",
    href: "/services/truck-battery-fitment/alrode",
    description: "Dual-technician fitment, rotation plans, recycling.",
  },
  {
    label: "Mobile Battery Replacement - Alberton",
    href: "/services/mobile-battery-replacement/alberton",
    description: "24/7 emergency callouts for stranding trucks.",
  },
  {
    label: "Fleet Pricing & Account Setup",
    href: "/quote",
    description: "Centralized invoicing, consignment stock available.",
  },
];

const VEHICLE_LINKS = [
  { label: "VW Amarok BiTDI fleet fitment", slug: "volkswagen/amarok-btdi" },
  { label: "Land Rover Discovery 4 heavy-duty battery", slug: "land-rover/discovery-4" },
  { label: "Toyota Fortuner GD-6 touring setup", slug: "toyota/fortuner-2-8-gd6" },
];

export default async function TruckBatteriesPage() {
  const allProducts = await getAllProducts();
  const TRUCK_PRODUCTS = allProducts.filter((p: ProductCardData) => 
    p.category === 'Truck & Commercial'
  );
  const { brands, sizes } = getFilterOptions(TRUCK_PRODUCTS);

  const productCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/truck-commercial`,
    isRelatedTo: {
      "@type": "Service",
      name: "Truck & Fleet Battery Fitment",
      url: `${BASE_URL}/services/truck-battery-fitment/alrode`,
    },
    hasPart: TRUCK_PRODUCTS.slice(0, 20).map((product) => ({
      "@type": "Product",
      name: product.name,
      sku: product.id,
      url: `${BASE_URL}/product/${product.id}`,
    })),
  };

  return (
    <div className="container py-16 space-y-12">
      <JsonLd data={productCollectionSchema} id="truck-collection-schema" />
        
        <div className="text-center space-y-3">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
                <span className="text-battery">Truck & Commercial</span> Batteries
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                 Specialized high-CCA commercial batteries for trucks, lorries, buses, and heavy-duty applications.
            </p>
        </div>

        {/* --- EDUCATIONAL SECTION: Understanding Commercial Batteries --- */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* What Makes Commercial Batteries Different */}
          <div className="bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-battery" />
              <h2 className="text-3xl font-black text-white">
                Understanding Commercial & Heavy-Duty Batteries
              </h2>
            </div>
            <p className="text-lg text-white/80 leading-relaxed">
              Commercial vehicles face unique challenges: high-compression diesel engines, extreme vibration, extended idling periods, and heavy electrical loads (refrigeration units, lift gates, sleeper amenities). Standard automotive batteries simply cannot handle these demands.
            </p>
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-battery" />
                  High CCA Requirements
                </h3>
                <p className="text-white/80">
                  Diesel engines require significantly more cranking power than petrol engines, especially in cold conditions. Our commercial batteries deliver 600-900+ CCA to ensure reliable starts every time.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-battery" />
                  Vibration Resistance
                </h3>
                <p className="text-white/80">
                  Heavy-duty batteries feature reinforced construction and special plate design to withstand constant vibration from rough roads, preventing premature failure and internal damage.
                </p>
              </div>
            </div>
          </div>

          {/* Fleet & B2B Solutions */}
          <div className="bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border-2 border-battery/30 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Building className="h-10 w-10 text-battery flex-shrink-0" />
              <h2 className="text-3xl font-black text-white">
                Fleet & B2B Solutions for Alberton Businesses
              </h2>
            </div>
            <p className="text-lg text-white/80 leading-relaxed">
              We understand that for a commercial fleet, downtime is not an option. We are a dedicated B2B partner for Alberton's logistics, construction, and transport companies. We provide not just batteries, but reliable power solutions that protect your bottom line.
            </p>
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white">High-CCA & Vibration Resistance</h3>
                  <p className="text-white/70">Our commercial range (from brands like Exide) is built for the demands of heavy-duty diesel engines, offering high Cold Cranking Amps (CCA) and superior vibration resistance for tough South African roads.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Full Manufacturer Warranties</h3>
                  <p className="text-white/70">Protect your fleet. All our heavy-duty batteries are backed by a full manufacturer warranty, giving you total peace of mind and predictable operational costs.</p>
                </div>
              </div>
            </div>
            <div className="text-center pt-6">
              <Button
                asChild
                size="lg"
                variant="battery"
                trackingId="type-truck-commercial-quote"
              >
                <Link href="/quote">Request a Free Fleet/B2B Quote</Link>
              </Button>
            </div>
          </div>

          {/* Common Applications */}
          <div className="bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border border-white/10 rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <Truck className="h-6 w-6 text-battery" />
              Common Commercial Applications
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-white mb-2">Heavy-Duty Trucks & Lorries</p>
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Long-haul transport vehicles</li>
                  <li>Construction and mining trucks</li>
                  <li>Delivery and logistics fleets</li>
                  <li>Agricultural and farming equipment</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Specialized Vehicles</p>
                <ul className="text-white/80 space-y-1 list-disc list-inside text-sm">
                  <li>Buses and passenger transport</li>
                  <li>Emergency vehicles (ambulances, fire trucks)</li>
                  <li>Refrigerated transport units</li>
                  <li>Heavy-duty SUVs and 4x4s</li>
                </ul>
              </div>
            </div>
          </div>
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
              Vehicles running these commercial batteries
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

        <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="lg:w-64 lg:flex-shrink-0">
                 <CategoryFilterSidebar
                    currentCategory="Truck & Commercial"
                    allBrands={brands}
                    allSizes={sizes}
                    capacityFilters={truckCapacityFilters}
                 />
            </div>

            <div className="lg:flex-grow">
                <ProductListPage
                    title="All Commercial & Truck Batteries"
                    description={`Displaying ${TRUCK_PRODUCTS.length} heavy-duty products.`}
                     products={TRUCK_PRODUCTS}
                />
            </div>

        </div>
    </div>
  );
}