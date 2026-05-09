// src/components/content/ProductSpotlight.tsx
import { ALL_PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProductSpotlightProps {
  count?: number;
}

const ProductSpotlight = ({ count = 3 }: ProductSpotlightProps) => {
  // Keep spotlight server-rendered to prevent late-insert layout shifts.
  const featuredProducts = ALL_PRODUCTS.slice(0, count);

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