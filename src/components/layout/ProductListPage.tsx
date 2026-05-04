// src/components/layout/ProductListPage.tsx
import { ALL_PRODUCTS, ProductCardData } from "@/data/products"; 
import { ProductCard } from "@/components/content/ProductCard";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

// --- VERIFIED CONTACT ---
const EMERGENCY_PHONE_DISPLAY = "010 109 6211";
const EMERGENCY_PHONE_LINK = "0101096211";

// This template is designed to accept a title and a filtered list of products
interface ProductListPageProps {
  title: string;
  description: string;
  products: ProductCardData[]; // Uses the imported interface
}

const ProductListPage: React.FC<ProductListPageProps> = ({ title, description, products }) => {
  return (
    <div className="w-full bg-background py-16"> 
      
      <div className="container px-4 md:px-6 lg:px-8 space-y-12">
        
        {/* Page Header (Adjusted bottom padding) */}
        <div className="text-center space-y-3 border-b border-border pb-10"> 
          <h1 className="text-5xl font-extrabold text-battery">{title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{description}</p>
        </div>

        {/* --- RESPONSIVE GRID FIX --- */}
        {/* This is now 1 column on mobile, 2 on tablet, and 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="sm:col-span-2 lg:col-span-3 text-center py-20 bg-card/50 rounded-lg">
              <h3 className="text-2xl font-semibold text-foreground">No matching products found.</h3>
               <p className="text-muted-foreground mt-2">Try a different category or call us for direct assistance.</p>
            </div>
          )}
        </div>
        
        {/* Final Conversion CTA (Increased top padding) */}
        <div className="text-center pt-12"> 
          <p className="text-2xl font-bold text-foreground mb-4">Need immediate help or a specific quote?</p>
          <Button asChild size="xl" variant="battery">
            <a href={`tel:${EMERGENCY_PHONE_LINK}`} className="flex items-center justify-center space-x-3 mx-auto">
              <Phone className="h-6 w-6" />
              <span>CALL NOW: {EMERGENCY_PHONE_DISPLAY}</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;