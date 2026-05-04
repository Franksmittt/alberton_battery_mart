'use client';

import { Phone, MessageSquare, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import CodeLookup from '@/components/content/CodeLookup';

const PRIMARY_PHONE = "010 109 6211";
const WHATSAPP_NUMBER_LINK = "27823046926";
const ADDRESS = "28 St Columb Rd, New Redruth, Alberton, 1450";

export function MobileStickyFooter() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-background/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="container px-2 py-2">
        <div className="flex items-center justify-between gap-2">
          {/* Search Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-12 border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <Search className="h-5 w-5 mr-2" />
                <span className="text-xs font-semibold">Search</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
              <SheetHeader className="text-center pb-4 border-b border-border">
                <SheetTitle className="text-2xl font-extrabold text-foreground">
                  Search Products
                </SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <CodeLookup />
              </div>
            </SheetContent>
          </Sheet>

          {/* Call Button - Primary CTA */}
          <Button
            asChild
            variant="battery"
            size="sm"
            className="flex-1 h-12 font-bold"
          >
            <a href={`tel:${PRIMARY_PHONE.replace(/ /g, '')}`} className="flex items-center justify-center">
              <Phone className="h-5 w-5 mr-2" />
              <span className="text-xs">Call</span>
            </a>
          </Button>

          {/* WhatsApp Button */}
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-bold"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER_LINK}?text=Hi, I need help with a battery.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              <span className="text-xs">WhatsApp</span>
            </a>
          </Button>

          {/* Directions Button */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-1 h-12 border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-xs font-semibold">Map</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

