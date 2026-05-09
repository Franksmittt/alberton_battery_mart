// src/components/layout/CategoryFilterSidebar.tsx
"use client";
import * as React from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation'; 

// --- NEW: Define a type for the capacity filters ---
interface CapacityFilter {
    label: string;
    min: number;
    max: number;
}

interface CategoryFilterSidebarProps {
    currentCategory: string;
    allBrands: string[];
    allSizes: string[];
    // --- NEW: Make capacityFilters an optional prop ---
    capacityFilters?: CapacityFilter[];
}

// --- NEW: Define DEFAULT filters for Automotive ---
const defaultCapacityFilters: CapacityFilter[] = [
    { label: "Under 50 Ah", min: 0, max: 50 },
    { label: "50 Ah - 75 Ah", min: 50, max: 75 },
    { label: "75 Ah - 100 Ah", min: 75, max: 100 },
    { label: "100 Ah and Up", min: 100, max: 500 }, 
];

const CategoryFilterSidebar: React.FC<CategoryFilterSidebarProps> = ({
    currentCategory,
    allBrands,
    allSizes,
    // --- FIX: Use the passed-in filters, or fall back to the default ---
    capacityFilters = defaultCapacityFilters
}) => {
    const [activeCapacity, setActiveCapacity] = React.useState<string | null>(null);
    const router = useRouter(); 

    const handleCapacityFilter = (label: string, min: number, max: number) => {
        const url = `/products/results?minAh=${min}&maxAh=${max}`;
        router.push(url);
        setActiveCapacity(label);
    };
    
    const handleSkuFilter = (sku: string) => {
        router.push(`/products/results?q=${encodeURIComponent(sku)}`);
    }

    const handleBrandFilter = (brand: string) => {
        router.push(`/products/results?brand=${encodeURIComponent(brand)}`);
    }
    
  return (
    <aside className="w-full border-r-0 border-[#2a2a2a] border-b-2 lg:w-[300px] lg:flex-shrink-0 lg:border-r-2 lg:border-b-0 bg-[#121212] p-8 space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#888888]">Now Viewing</p>
        <h3 className="text-2xl font-black text-white">{currentCategory}</h3>
      </div>

      <div className="space-y-5">
        <h4 className="text-[1.2rem] font-black uppercase text-white">OEM Brand</h4>
        <div className="flex flex-wrap gap-2">
          {allBrands.map((brand, index) => (
            <button
              key={brand}
              type="button"
              onClick={() => handleBrandFilter(brand)}
              className={`inline-flex rounded-full border-2 px-4 py-2 text-[0.85rem] font-bold transition-colors ${
                index === 0
                  ? "border-white bg-white text-[#0a0a0a]"
                  : "border-[#2a2a2a] text-[#888888] hover:border-white hover:text-white"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
        <Link href="/products" className="inline-flex text-sm font-semibold text-[#E53935] hover:text-[#C62828]">
          View All Categories
        </Link>
      </div>

      <div className="space-y-5">
        <h4 className="text-[1.1rem] font-black uppercase text-white">Capacity (Ah)</h4>
        <div className="flex flex-wrap gap-2">
          {capacityFilters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              onClick={() => handleCapacityFilter(filter.label, filter.min, filter.max)}
              className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeCapacity === filter.label
                  ? "border-white bg-white text-[#0a0a0a]"
                  : "border-[#2a2a2a] text-[#888888] hover:border-[#444444] hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <h4 className="text-[1.1rem] font-black uppercase text-white">Quick Size (SKU)</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.slice(0, 30).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSkuFilter(size)}
              className="inline-flex rounded-full border border-[#2a2a2a] px-3 py-1.5 text-xs font-semibold text-[#888888] transition-colors hover:border-[#444444] hover:text-white"
            >
              {size}
            </button>
          ))}
        </div>
        <p className="text-xs text-[#666666]">Common codes: 619, 652, EFB.</p>
      </div>
    </aside>
  );
};

export default CategoryFilterSidebar;