'use client';

import dynamic from "next/dynamic";
import { Phone, MessageSquare, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const CodeLookup = dynamic(() => import("@/components/content/CodeLookup"), {
  loading: () => <div className="p-4 text-sm text-muted-foreground">Loading search...</div>,
});

const PRIMARY_PHONE = "010 109 6211";
const WHATSAPP_NUMBER_LINK = "27823046926";
const ADDRESS = "28 St Columb Rd, New Redruth, Alberton, 1450";

export function MobileStickyFooter() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-[var(--brand-border)] bg-[var(--brand-bg)]/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="container px-1 py-1.5">
        <div className="mx-auto w-full max-w-[360px] grid grid-cols-[auto_1fr_1fr_auto] items-center gap-1">
          {/* Search Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-11 w-11 border-white/20 bg-white/5 px-0 text-white hover:bg-white/10"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
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
            className="h-11 px-2 font-bold"
            trackingId="mobile-sticky-call"
          >
            <a href={`tel:${PRIMARY_PHONE.replace(/ /g, '')}`} className="flex items-center justify-center">
              <Phone className="h-4 w-4 mr-1.5" />
              <span className="text-xs">Call Now</span>
            </a>
          </Button>

          {/* WhatsApp Button */}
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="h-11 px-2 bg-[var(--brand-success)] hover:bg-[var(--brand-success-hover)] text-white font-bold"
            trackingId="mobile-sticky-whatsapp"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER_LINK}?text=Hi, I need help with a battery.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <MessageSquare className="h-4 w-4 mr-1.5" />
              <span className="text-xs">WA Quote</span>
            </a>
          </Button>

          {/* Directions Button */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-11 w-11 border-white/20 bg-white/5 px-0 text-white hover:bg-white/10"
            trackingId="mobile-sticky-map"
          >
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
              aria-label="Open map directions"
            >
              <MapPin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

