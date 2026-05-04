// src/components/layout/ProductSpotlight.tsx
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const ProductSpotlight = () => {
  const categories = [
    {
      title: "1. Standard Automotive Batteries",
      description: "Reliable, warrantied replacement batteries for older vehicles, sedans, and standard hatchbacks. Best prices on all major codes (e.g., 619, 646).",
      imagePath: "/images/automotive-battery-spotlight.jpg", 
      ctaText: "Shop Standard Car Power",
      ctaHref: "/products/type/automotive", // <-- CORRECTED LINK
      color: "text-foreground", 
      iconBg: "bg-battery/20",
    },
    {
      title: "2. Performance & Start/Stop (AGM/EFB)",
      description: "Advanced AGM/EFB technology for modern Start/Stop vehicles (VW, BMW, Ford Ranger). Superior charge acceptance and longer life.",
      imagePath: "/images/agm-efb-spotlight.jpg", 
      ctaText: "Explore AGM/EFB Range",
      ctaHref: "/products/type/performance", // <-- CORRECTED LINK
      color: "text-battery", 
      iconBg: "bg-battery/30",
    },
    {
      title: "3. Deep Cycle, Solar & Backup Power",
      description: "High-end LiFePO₄ and AGM Deep Cycle batteries for home inverters, solar, camping, and extended leisure use.",
      imagePath: "/images/solar-battery-spotlight.jpg", 
      ctaText: "View Backup Solutions",
      ctaHref: "/products/type/deep-cycle", // <-- CORRECTED LINK
      color: "text-green-500", 
      iconBg: "bg-green-500/20",
    },
    {
      title: "4. Truck, Commercial & Powersport",
      description: "Heavy-duty commercial batteries (Truck/Lorry), and specialized batteries for Motorcycles and ATVs. High CCA for powerful engines.",
      imagePath: "/images/truck-motorcycle-spotlight.jpg", 
      ctaText: "Shop Heavy Duty Range",
      ctaHref: "/products/type/truck-motorcycle", // <-- CORRECTED LINK
      color: "text-yellow-500", 
      iconBg: "bg-yellow-500/20",
    },
  ];

  // ... rest of the component (rendering logic is unchanged) ...

  return (
    <section className="w-full bg-background py-16">
      <div className="container px-4 md:px-6 lg:px-8 space-y-12">
        
        {/* Section Headline */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Our Products: Find Your Perfect Power Solution
          </h2>
          <p className="text-xl text-muted-foreground mt-2">
            We stock and fit all major technologies across 4 specialized categories.
          </p>
        </div>

        {/* Grid of Four Category Cards (2 rows, 2 columns) */}
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="group flex flex-col overflow-hidden bg-card border-border shadow-2xl hover:border-battery transition-colors duration-300"
            >
              <div className="w-full">
                {/* Image Placeholder using AspectRatio for responsive consistency */}
                <AspectRatio ratio={16 / 9}>
                  {/* IMPORTANT: Placeholder reminder */}
                  <div className={`w-full h-full ${category.iconBg} flex items-center justify-center text-xs text-foreground/50`}>
                    Placeholder for {category.imagePath}
                  </div>
                </AspectRatio>
              </div>

              <CardContent className="p-6 space-y-4 flex-grow flex flex-col">
                <h3 className={`text-2xl font-extrabold ${category.color}`}>
                  {category.title}
                </h3>
                <p className="text-muted-foreground flex-grow">
                  {category.description}
                </p>
                <div className="pt-2">
                  <Button asChild variant="default" className="group-hover:bg-battery group-hover:text-white transition-colors duration-300">
                    <Link href={category.ctaHref}>
                      {category.ctaText}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSpotlight;