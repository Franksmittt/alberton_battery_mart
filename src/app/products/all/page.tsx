// src/app/products/all/page.tsx
import ProductListPage from "@/components/layout/ProductListPage";
import { getAllProducts, ProductCardData, ALL_PRODUCTS } from "@/data/products";
import CategoryFilterSidebar from "@/components/layout/CategoryFilterSidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/seo-constants";

// Make this page dynamic so it can read updated prices from JSON
export const dynamic = 'force-dynamic';

// --- NEW: Page-Specific Metadata for SEO ---
export const metadata: Metadata = {
  title: "All Batteries for Sale in Alberton | Alberton Battery Mart",
  description: "Browse our complete inventory. We stock car, truck, motorcycle, solar, and inverter batteries from Willard, Exide, and Enertec. Free fitment in Alberton.",
  keywords: [
    'all batteries Alberton',
    'battery catalog',
    'complete battery range',
    'Willard Exide Enertec',
    'battery inventory'
  ],
  openGraph: {
    title: "All Batteries for Sale in Alberton | Alberton Battery Mart",
    description: "Browse our complete inventory. We stock car, truck, motorcycle, solar, and inverter batteries from Willard, Exide, and Enertec. Free fitment in Alberton.",
    url: `${BASE_URL}/products/all`,
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'All Batteries - Alberton Battery Mart',
      },
    ],
  },
  alternates: {
    canonical: `${BASE_URL}/products/all`,
  },
};

// --- NEW: Helper to get ALL filters for the sidebar ---
const getFilterOptions = (products: ProductCardData[]) => {
    const brands = Array.from(new Set(products.map(p => p.brandName)));
    const sizes = Array.from(new Set(products.map(p => p.sku)));
    return { brands, sizes };
};

// --- NEW: Create UNIVERSAL capacity filters ---
const allCapacityFilters = [
    { label: "Small (Under 20 Ah)", min: 0, max: 20 },
    { label: "Medium (20-75 Ah)", min: 20, max: 75 },
    { label: "Large (75-100 Ah)", min: 75, max: 100 },
    { label: "Heavy Duty (100 Ah+)", min: 100, max: 9999 },
];

export default async function AllProductsPage() {
  const products = await getAllProducts();
  const { brands, sizes } = getFilterOptions(products);
  
  return (
    <div className="container py-16 space-y-12">
        
        {/* --- NEW: Page Header --- */}
        <div className="text-center space-y-3">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
                Our <span className="text-battery">Complete</span> Battery Catalog
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Browse our full inventory. Use the filters to find the exact battery you need for your car, truck, bike, or solar setup.
            </p>
            <Separator className="pt-4" />
        </div>

        {/* --- NEW: Sidebar + Product Grid Layout --- */}
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Filtering Sidebar */}
            <div className="lg:w-64 lg:flex-shrink-0">
                <CategoryFilterSidebar
                    currentCategory="All Products"
                    allBrands={brands}
                    allSizes={sizes}
                    capacityFilters={allCapacityFilters}
                />
            </div>

            {/* Right Column: Product List */}
            <div className="lg:flex-grow">
                <ProductListPage
                    title="Complete Inventory"
                    description={`Displaying all ${products.length} products in stock.`}
                    products={products}
                />
            </div>

        </div>
    </div>
  );
}