// src/components/layout/CategoryFilterSidebar.tsx
"use client";
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Battery, Zap } from "lucide-react";
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
        <div className="lg:sticky lg:top-24 w-full lg:w-64 space-y-6 p-4 bg-card rounded-lg border border-border shadow-lg">
            
            <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Now Viewing:</p>
                <h3 className="text-xl font-extrabold text-battery flex items-center space-x-2">
                     <Battery className="h-5 w-5" />
                    <span>{currentCategory}</span>
                </h3>
            </div>

            <Separator />

            {/* --- FIX: Improved Brand Filtering UX --- */}
            <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">Shop by Brand</h4>
                {allBrands.map((brand, index) => (
                    <Button
                        key={index}
                        variant="ghost" // Better for lists
                        className="w-full justify-between text-sm text-muted-foreground hover:text-battery"
                        onClick={() => handleBrandFilter(brand)}
                    >
                        <span>{brand}</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                ))}
                 <Link href="/products" className="text-sm text-battery font-semibold block pt-2">
                    View All Categories
                </Link>
            </div>

            <Separator />
            
            <div className="space-y-3">
                 <h4 className="text-lg font-bold text-foreground flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Filter by Capacity (Ah)</span>
                </h4>
                <p className="text-xs text-muted-foreground">Narrow down by Amp-hour capacity.</p>
                 
                <div className="space-y-2">
                    {capacityFilters.map((filter, index) => (
                        <Button
                             key={index}
                            variant={activeCapacity === filter.label ? "battery" : "outline"}
                            className="w-full justify-start text-left text-sm"
                            onClick={() => handleCapacityFilter(filter.label, filter.min, filter.max)}
                        >
                             {filter.label}
                        </Button>
                    ))}
                </div>
            </div>
             
            <Separator />
            
            {/* --- FIX: Improved SKU/Size Filtering UX --- */}
            <div className="space-y-2">
                <h4 className="text-lg font-bold text-foreground">Quick Find by Size (SKU)</h4>
                <div className="flex flex-col space-y-2">
                    {allSizes.map((size, index) => ( 
                        <Button
                            key={index}
                            variant="ghost" // Better for lists
                            className="w-full justify-between text-sm text-muted-foreground hover:text-battery"
                            onClick={() => handleSkuFilter(size)}
                        >
                            <span>{size}</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground pt-1">Common codes: 619, 652, EFB.</p>
            </div>
        </div>
    );
};

export default CategoryFilterSidebar;