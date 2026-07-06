// src/components/layout/StorefrontCTA.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone } from "lucide-react";
import Link from "next/link";

import {
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_ADDRESS_LINE,
  STORE_HOURS_DISPLAY_LONG,
  STORE_MAPS_URL,
} from "@/lib/seo-constants";

const StorefrontCTA = () => {
  return (
    <section className="w-full bg-background py-16">
      <div className="container px-4 md:px-6 lg:px-8">
        <Card className="bg-card border-battery shadow-2xl shadow-battery/20 p-8 md:p-12 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Visit Our Storefront or Talk to an Expert
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
             Need counter service or a large commercial order? Find us in Alberton Central. We have the area&apos;s widest selection in stock, ready to go.
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-foreground">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-6 w-6 text-battery" />
                <h3 className="text-2xl font-bold">Store Location</h3>
              </div>
              <p className="text-lg">{STORE_ADDRESS_LINE}</p>
              <Button asChild variant="outline" className="w-full max-w-xs mt-4 border-2 border-primary hover:bg-secondary">
               <a href={STORE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
            </div>

             <div className="space-y-4 md:border-l md:border-border md:pl-12">
              <div className="flex items-center justify-center space-x-3">
                <Clock className="h-6 w-6 text-battery" />
                <h3 className="text-2xl font-bold">Trading Hours</h3>
              </div>
              <p className="text-lg">{STORE_HOURS_DISPLAY_LONG}</p>
               <Button asChild variant="battery" className="w-full max-w-xs mt-4">
                <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Call Store: {PHONE_DISPLAY}</span>
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