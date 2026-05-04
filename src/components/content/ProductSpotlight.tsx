// src/components/content/ProductSpotlight.tsx
"use client";
import React, { useMemo, useEffect, useState } from 'react';
import { ProductCardData } from "@/data/products";
import { ProductCard } from "./ProductCard"; // This path is correct for this file
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------
// *** Deterministic "Alternating" Function ***
// This uses the day of the week to create a stable,
// "random"-looking list that changes automatically.
// ----------------------------------------------------

const generateDeterministicShuffledArray = (products: ProductCardData[], seed: number): ProductCardData[] => {
  // Use day of the week (0-6) as the seed
  const dateSeed = new Date().getDay() + seed; 
  const array = [...products];
  // Fisher-Yates shuffle algorithm using a seeded generator
  for (let i = array.length - 1; i > 0; i--) {
    // A simplified seeded random number generation
    const j = Math.floor((Math.sin(dateSeed * i) + 1) * 1000) % (i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to get 'n' stable, random products
const getStableRandomProducts = (products: ProductCardData[], count: number): ProductCardData[] => {
  if (products.length === 0) return [];
  const shuffled = generateDeterministicShuffledArray(products, 0); 
  return shuffled.slice(0, count);
};

// ----------------------------------------------------
// *** Component Starts Here ***
// ----------------------------------------------------

interface ProductSpotlightProps {
  count?: number; // Number of products to display
}

const ProductSpotlight: React.FC<ProductSpotlightProps> = ({ count = 3 }) => {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from API (reads from JSON if available)
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Use the stable "alternating" function in useMemo
  const featuredProducts = useMemo(() => {
    if (products.length === 0) return [];
    return getStableRandomProducts(products, count);
  }, [products, count]);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="py-16 bg-muted/20">
      <div className="container space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <Zap className="h-10 w-10 text-battery mx-auto" />
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
            Weekly <span className="text-battery">Power Picks</span> & Hot Deals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out our top-selling batteries and current promotions. Deals refresh automatically!
          </p>
        </div>

        {/* Product Grid - (1 col on mobile, 2 on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Footer CTA */}
        <div className="text-center">
            <Button asChild variant="secondary" size="lg" className="shadow-md">
                <Link href="/products/all" className="flex items-center justify-center space-x-2">
                    <span>View Full Product Catalog</span>
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductSpotlight;