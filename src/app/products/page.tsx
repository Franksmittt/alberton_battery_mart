// src/app/products/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Battery, Zap, Truck, Sun, Car, LayoutGrid, Bike } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import CodeLookup from "@/components/content/CodeLookup";
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";

// --- NEW: Page-Specific Metadata for SEO with Open Graph ---
export const metadata: Metadata = {
  title: "Batteries for Sale in Alberton | Car, Truck, Motorcycle, Solar",
  description: "Browse all batteries at Alberton Battery Mart. We stock Willard, Exide, & Enertec for cars, trucks, motorcycles, and solar inverters. Free fitment & testing.",
  keywords: [
    'batteries for sale Alberton',
    'car batteries Alberton',
    'truck batteries',
    'motorcycle batteries',
    'solar batteries',
    'Willard batteries',
    'Exide batteries',
    'Enertec batteries'
  ],
  openGraph: {
    title: "Batteries for Sale in Alberton | Car, Truck, Motorcycle, Solar",
    description: "Browse all batteries at Alberton Battery Mart. We stock Willard, Exide, & Enertec for cars, trucks, motorcycles, and solar inverters.",
    url: 'https://www.albertonbatterymart.co.za/products',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Batteries for Sale - Alberton Battery Mart',
      },
    ],
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Batteries for Sale in Alberton | Car, Truck, Motorcycle, Solar",
    description: "Browse all batteries at Alberton Battery Mart. We stock Willard, Exide, & Enertec for cars, trucks, motorcycles, and solar inverters. Free fitment & testing.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za/products',
  },
};

const filterLinks = {
    category: [
        { title: "Standard Automotive", icon: Car, href: "/products/type/automotive" },
        { title: "Performance AGM/EFB", icon: Zap, href: "/products/type/performance" },
        { title: "Deep Cycle / Solar", icon: Sun, href: "/products/type/deep-cycle" },
        { title: "Truck & Commercial", icon: Truck, href: "/products/type/truck-commercial" },
        { title: "Motorcycle / Powersport", icon: Bike, href: "/products/type/motorcycle" },
        { title: "Show All Products", icon: LayoutGrid, href: "/products/all" },
    ],
    brand: [
        { title: "Willard Batteries", icon: Battery, href: "/products/results?brand=Willard" }, 
        { title: "Enertec Batteries", icon: Battery, href: "/products/results?brand=Enertec" }, 
        { title: "Exide Batteries", icon: Battery, href: "/products/results?brand=Exide" },
        { title: "Power Plus Batteries", icon: Battery, href: "/products/results?brand=Power Plus" },
        { title: "Eco Plus Batteries", icon: Battery, href: "/products/results?brand=Eco Plus" },
    ]
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
  ],
};

export default function ProductsBasePage() {
  return (
    <>
      <JsonLd data={BREADCRUMB_SCHEMA} id="breadcrumb-schema" />
      <div className="container py-16 space-y-16">
        
        {/* H1 and Introduction (SEO Focus) */}
        <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
                Find Your Perfect <span className="text-battery">Battery</span> Solution
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Shop our certified multi-brand selection by category, vehicle type, or specific battery code. All prices include a competitive warranty.
            </p>
        </div>

        {/* ------------------------------------------- */}
        {/* FILTER SECTION 1: SHOP BY CATEGORY/TYPE */}
        {/* ------------------------------------------- */}
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">1. Shop by Vehicle or Power Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
                {filterLinks.category.map((item, index) => (
                    <Card key={index} className="hover:border-battery transition-colors shadow-lg">
                        <Link href={item.href}>
                            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                                <item.icon className="h-8 w-8 text-battery mb-3" />
                                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>

        <Separator className="bg-border" />
        
        {/* ------------------------------------------- */}
        {/* FILTER SECTION 2: QUICK FIND BY CODE/SIZE (The Critical Lookup) */}
        {/* ------------------------------------------- */}
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground text-center">2. Look Up Battery Code or Size (e.g., 619)</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
                Know your battery code? Use this feature to instantly search all matching batteries across all brands we stock.
            </p>
            <CodeLookup /> 
        </div>
        
        <Separator className="bg-border" />

        {/* ------------------------------------------- */}
        {/* FILTER SECTION 3: SHOP BY BRAND (Trust Factor) */}
        {/* ------------------------------------------- */}
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground text-center">3. Shop by Brand</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {filterLinks.brand.map((item, index) => (
                    <Card key={index} className="hover:border-battery transition-colors shadow-lg w-full max-w-[200px]">
                        <Link href={item.href}>
                            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                                <item.icon className="h-8 w-8 text-battery mb-3" />
                                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    </div>
    </>
  );
}