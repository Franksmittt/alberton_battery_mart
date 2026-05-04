// src/app/products/type/truck-motorcycle/page.tsx
import ProductListPage from "@/components/layout/ProductListPage";
import { ALL_PRODUCTS, ProductCardData } from "@/data/products";
import CategoryFilterSidebar from "@/components/layout/CategoryFilterSidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";
import Link from "next/link";

const PAGE_TITLE =
  "Commercial & Powersport Batteries in Alberton | Alberton Battery Mart";
const PAGE_DESCRIPTION =
  "Heavy-duty truck batteries and compact motorcycle AGM packs with mobile fitment across Alberton.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "truck battery Alberton",
    "motorcycle battery Alberton",
    "powersport battery fitment",
  ],
  alternates: {
    canonical: `${BASE_URL}/products/type/truck-motorcycle`,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/truck-motorcycle`,
    type: "website",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Commercial & Powersport Batteries - Alberton Battery Mart',
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

const TRUCK_MOTORCYCLE_PRODUCTS = ALL_PRODUCTS.filter(
  (p: ProductCardData) =>
    p.category === "Truck & Commercial" || p.category === "Motorcycle"
);

const getFilterOptions = (products: ProductCardData[]) => {
  const brands = Array.from(new Set(products.map((p) => p.brandName)));
  const sizes = Array.from(new Set(products.map((p) => p.sku)));
  return { brands, sizes };
};
const { brands, sizes } = getFilterOptions(TRUCK_MOTORCYCLE_PRODUCTS);

const SERVICE_LINKS = [
  {
    label: "Truck & Fleet Battery Fitment",
    href: "/services/truck-battery-fitment/alrode",
    description: "Fleet rotation, recycling, and high-CCA installs.",
  },
  {
    label: "Mobile Battery Replacement",
    href: "/services/mobile-battery-replacement/alberton",
    description: "Estate-friendly swaps for motorcycles and ATVs.",
  },
];

export default function TruckMotorcycleBatteriesPage() {
  const productCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/products/type/truck-motorcycle`,
    hasPart: TRUCK_MOTORCYCLE_PRODUCTS.slice(0, 20).map((product) => ({
      "@type": "Product",
      name: product.name,
      sku: product.id,
      url: `${BASE_URL}/product/${product.id}`,
    })),
  };

  return (
    <div className="container py-16 space-y-12">
      <JsonLd data={productCollectionSchema} id="truck-motorcycle-collection" />
        
        <div className="text-center space-y-3">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
                <span className="text-battery">Commercial</span> & Powersport Batteries
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Specialized high-CCA commercial batteries for trucks, lorries, buses, and dedicated motorcycle/ATV batteries.
            </p>
            <Separator className="pt-4" />
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              asChild
              size="lg"
              variant="battery"
              trackingId="type-truck-motorcycle-call"
            >
              <a href="tel:0101096211" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call fitment desk
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-green-600 hover:bg-green-700 text-white"
              trackingId="type-truck-motorcycle-whatsapp"
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

        {/* --- MAIN LAYOUT: SIDEBAR + PRODUCT GRID --- */}
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Filtering Sidebar */}
            <div className="lg:w-64 lg:flex-shrink-0">
                <CategoryFilterSidebar
                    currentCategory="Truck & Powersport"
                    allBrands={brands}
                    allSizes={sizes}
                />
            </div>

            {/* Right Column: Product List */}
            <div className="lg:flex-grow">
                <ProductListPage
                    title="All Commercial & Powersport Batteries"
                    description={`Displaying ${TRUCK_MOTORCYCLE_PRODUCTS.length} products ready for heavy-duty and light-sport applications.`}
                    products={TRUCK_MOTORCYCLE_PRODUCTS}
                />
            </div>

        </div>
    </div>
  );
}