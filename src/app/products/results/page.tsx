// src/app/products/results/page.tsx
import { getAllProducts, ProductCardData, ALL_PRODUCTS } from "@/data/products";
import ProductListPage from "@/components/layout/ProductListPage";
import { notFound } from 'next/navigation';
import CategoryFilterSidebar from "@/components/layout/CategoryFilterSidebar";
import { Separator } from "@/components/ui/separator";
import { Metadata } from 'next';
import { BASE_URL } from "@/lib/seo-constants";

// Mark route as dynamic since it uses searchParams
export const dynamic = 'force-dynamic';

interface ResultsPageProps {
  searchParams: {
    q?: string; // For SKU/Code Search (e.g., ?q=619)
    brand?: string; // For Brand Filter (e.g., ?brand=Willard)
    minAh?: string; // For Capacity Filter (e.g., ?minAh=50)
    maxAh?: string; // For Capacity Filter (e.g., &maxAh=75)
    category?: string; // Should be handled by the layout, but kept for clarity
  };
}

// --- NEW: Dynamic Metadata for SEO ---
export async function generateMetadata({ searchParams }: ResultsPageProps): Promise<Metadata> {
  let title = "Search Results";
  if (searchParams.q) {
    title = `Search results for "${searchParams.q}"`;
  } else if (searchParams.brand) {
    title = `${searchParams.brand} Batteries`;
  } else if (searchParams.minAh || searchParams.maxAh) {
    title = `Batteries from ${searchParams.minAh || '0'}Ah to ${searchParams.maxAh || '...'}Ah`;
  }
  
  const url = `${BASE_URL}/products/results${searchParams.q ? `?q=${encodeURIComponent(searchParams.q)}` : ''}${searchParams.brand ? `?brand=${encodeURIComponent(searchParams.brand)}` : ''}`;
  
  return {
    title: `${title} | Alberton Battery Mart`,
    description: `Find ${title} at Alberton Battery Mart. We stock all car, truck, and solar batteries with free fitment.`,
    keywords: [
      'battery search',
      'find battery',
      'battery catalog',
      searchParams.q || '',
      searchParams.brand || '',
    ].filter(Boolean),
    openGraph: {
      title: `${title} | Alberton Battery Mart`,
      description: `Find ${title} at Alberton Battery Mart. We stock all car, truck, and solar batteries with free fitment.`,
      url,
      type: 'website',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Battery Search Results - Alberton Battery Mart',
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Function now returns an object containing both the filtered list and the title string.
const filterProducts = (allProducts: ProductCardData[], params: ResultsPageProps['searchParams']): { products: ProductCardData[], title: string } => {
  let filtered = allProducts;
  let title = "Search Results";

  // --- Filter 1: SKU/Code Search (?q=619) ---
  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(p => 
      p.sku.toLowerCase().includes(query) || p.name.toLowerCase().includes(query)
    );
    title = `Search Results for "${params.q}"`;
  }
  
  // --- Filter 2: Brand Filter (?brand=Willard) ---
  else if (params.brand) {
    const brandQuery = params.brand.toLowerCase().trim();
    filtered = filtered.filter(p => p.brandName.toLowerCase().trim() === brandQuery);
    title = `${params.brand} Batteries`;
  }

  // --- Filter 3: Capacity Filter (?minAh=50&maxAh=75) ---
  else if (params.minAh || params.maxAh) {
    const min = parseFloat(params.minAh || '0');
    const max = parseFloat(params.maxAh || '9999');
    
    filtered = filtered.filter(p => p.ahCapacity >= min && p.ahCapacity <= max);
    const minStr = params.minAh ? `${params.minAh} Ah` : '0 Ah';
    const maxStr = params.maxAh ? `${params.maxAh} Ah` : 'Max';
    title = `Capacity: ${minStr} to ${maxStr}`;
  }
  
  return { products: filtered, title };
};

// --- NEW: Helper to get filters from results ---
const getFilterOptions = (products: ProductCardData[]) => {
    const brands = Array.from(new Set(products.map(p => p.brandName)));
    const sizes = Array.from(new Set(products.map(p => p.sku)));
    return { brands, sizes };
};

// --- NEW: Universal Capacity Filters ---
const allCapacityFilters = [
    { label: "Small (Under 20 Ah)", min: 0, max: 20 },
    { label: "Medium (20-75 Ah)", min: 20, max: 75 },
    { label: "Large (75-100 Ah)", min: 75, max: 100 },
    { label: "Heavy Duty (100 Ah+)", min: 100, max: 9999 },
];

export default async function SearchResultsPage({ searchParams }: ResultsPageProps) {
  const allProducts = await getAllProducts();
  const { products: filteredProducts, title } = filterProducts(allProducts, searchParams);

  if (filteredProducts.length === 0) {
    // We don't use notFound() here, because we want to show the sidebar and a "no results" message
    // notFound(); 
  }
  
  // --- NEW: Get filters based on the *results* ---
  const { brands, sizes } = getFilterOptions(filteredProducts);

  return (
    <div className="container py-16 space-y-12">
        
        {/* --- NEW: Page Header --- */}
        <div className="text-center space-y-3">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
                <span className="text-battery">{title}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              {filteredProducts.length} products found. Use the filters to refine your search.
            </p>
            <Separator className="pt-4" />
        </div>

        {/* --- NEW: Sidebar + Product Grid Layout --- */}
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Filtering Sidebar */}
            <div className="lg:w-64 lg:flex-shrink-0">
                <CategoryFilterSidebar
                    currentCategory="Search Results"
                    allBrands={brands}
                    allSizes={sizes}
                    capacityFilters={allCapacityFilters}
                />
            </div>

            {/* Right Column: Product List */}
            <div className="lg:flex-grow">
                <ProductListPage
                    title={title}
                    description={`Displaying ${filteredProducts.length} certified products matching your criteria.`}
                    products={filteredProducts}
                />
            </div>

        </div>
    </div>
  );
}