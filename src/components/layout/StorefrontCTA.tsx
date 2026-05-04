// src/components/layout/StorefrontCTA.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone } from "lucide-react";
import Link from "next/link";

const StorefrontCTA = () => {
  // FINAL VERIFIED CONTACT DETAILS & HOURS
  const STORE_ADDRESS = "28 St Columb Rd, New Redruth, Alberton, 1450";
  const STORE_HOURS = "Mon - Fri: 08:00 AM – 5:00 PM | Sat: 08:00 AM – 12:00 PM";
  const STORE_PHONE = "010 109 6211"; // Cleaned format
  const DIRECTIONS_LINK = "https://maps.app.goo.gl/w13E2jc81bMM3uty5";

  return (
    <section className="w-full bg-background py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <Card className="bg-card border-battery shadow-2xl shadow-battery/20 p-8 md:p-12 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Visit Our Storefront or Talk to an Expert
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
             Need counter service or a large commercial order? Find us in Alberton Central. We have the area's widest selection in stock, ready to go.
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-foreground">
            {/* Left Column: Location Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-6 w-6 text-battery" />
                <h3 className="text-2xl font-bold">Store Location</h3>
              </div>
              <p className="text-lg">{STORE_ADDRESS}</p>
              <Button asChild variant="outline" className="w-full max-w-xs mt-4 border-2 border-primary hover:bg-secondary">
               <a href={DIRECTIONS_LINK} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
            </div>

            {/* Right Column: Hours & Contact */}
             <div className="space-y-4 md:border-l md:border-border md:pl-12">
              <div className="flex items-center justify-center space-x-3">
                <Clock className="h-6 w-6 text-battery" />
                <h3 className="text-2xl font-bold">Trading Hours</h3>
              </div>
              <p className="text-lg">{STORE_HOURS}</p>
               <Button asChild variant="battery" className="w-full max-w-xs mt-4">
                <a href={`tel:${STORE_PHONE}`} className="flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Call Store: {STORE_PHONE}</span>
                </a>
               </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default StorefrontCTA;