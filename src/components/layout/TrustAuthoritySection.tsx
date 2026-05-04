// src/components/layout/TrustAuthoritySection.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Gauge, Zap, CalendarCheck, MapPin, BrainCircuit } from "lucide-react"; // --- NEW: Added BrainCircuit
import Link from "next/link";
// Required for the Button's 'asChild' behavior

// Differentiator blocks based on key competitive advantages.
// --- NEW: Added a 5th block for Specialist BMS Coding ---
const trustBlocks = [
  {
    icon: CalendarCheck,
    title: "Up to 36-Month Warranty",
    description: "Full peace of mind guaranteed. We stand by our multi-brand selection, offering warranties that meet or exceed industry standards.",
  },
  {
    icon: Gauge,
    title: "Free On-Site Diagnostics",
    description: "Expert battery health and alternator testing included with every fitment. Ensure your vehicle's charging system is running perfectly.",
  },
  {
    icon: Zap,
    title: "Multi-Brand Authority",
    description: "Official stockists of Willard, Enertec, Exide, and more. We offer unbiased, expert advice on the right battery for your car's specs.",
  },
  {
    icon: MapPin,
    title: "Local Alberton Speed",
    description: "Focused on the local area (New Redruth, Meyersdal, Alberton Central) for the fastest emergency response times in the south.",
  },
  {
    icon: BrainCircuit, // --- NEW ICON
    title: "Specialist BMS Coding",
    description: "Expertise in coding & registering new batteries for BMW, Mercedes, & Audi. We protect your investment and warranty.",
  },
];

const TrustAuthoritySection = () => {
  return (
    <section className="w-full bg-background py-20">
      <div className="container px-4 md:px-6 lg:px-8 space-y-12">
        
        {/* Section Headline */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
            Why Alberton Battery Mart is the Right Choice
          </h2>
            <p className="text-xl text-muted-foreground mt-3">
            Service You Can Trust. Products That Last.
          </p>
        </div>

        {/* --- NEW: Grid now dynamically handles 5 items --- */}
        {/* This grid will wrap to 2 columns on tablet and 5 on desktop for a clean look */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {trustBlocks.map((block, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 bg-card border-border shadow-md transition-all hover:border-battery/50 hover:shadow-battery/20">
              <block.icon className="h-10 w-10 text-battery mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                {block.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                  {block.description}
              </p>
            </Card>
          ))}
        </div>
        
        {/* Call-to-Action for Full Catalog */}
        <div className="text-center pt-8">
            <Separator className="bg-border mb-8 max-w-lg mx-auto" />
             <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready for the most reliable power?
 </h3>
            <p className="text-lg text-muted-foreground mb-6">
                Browse our full range, or call our expert team for instant advice.
 </p>
            {/* --- FIX: Updated link from /products/automotive to /products/all --- */}
            <Button asChild size="lg" variant="battery">
                <Link href="/products/all">View All Batteries Now</Link>
            </Button>
        </div>

      </div>
    </section>
  );
};

export default TrustAuthoritySection;