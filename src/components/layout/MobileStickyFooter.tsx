'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Phone, MessageSquare, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_ADDRESS_LINE,
  STORE_MAPS_URL,
  WHATSAPP_URL,
} from "@/lib/seo-constants";
import { getStoreOpenStatus } from "@/lib/store-hours";

const CodeLookup = dynamic(() => import("@/components/content/CodeLookup"), {
  loading: () => <div className="p-4 text-sm text-muted-foreground">Loading search...</div>,
});

export function MobileStickyFooter() {
  const [openStatus, setOpenStatus] = useState(() => getStoreOpenStatus());

  useEffect(() => {
    const updateStatus = () => setOpenStatus(getStoreOpenStatus());
    updateStatus();
    const interval = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-[var(--brand-border)] bg-[var(--brand-bg)]/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="container px-1 py-1.5 space-y-1">
        <div className="flex justify-center">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              openStatus.isOpen
                ? "bg-[var(--brand-success)] text-white"
                : "bg-[var(--brand-bg-elevated)] text-[var(--brand-muted-2)]"
            }`}
          >
            {openStatus.label}
          </span>
        </div>
        <div className="mx-auto w-full max-w-[360px] grid grid-cols-[auto_1fr_1fr_auto] items-center gap-1">
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

          <Button
            asChild
            variant="battery"
            size="sm"
            className="h-11 px-2 font-bold"
            trackingId="mobile-sticky-call"
          >
            <a href={`tel:${PHONE_TEL}`} className="flex items-center justify-center">
              <Phone className="h-4 w-4 mr-1.5" />
              <span className="text-xs">Call Now</span>
            </a>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="sm"
            className="h-11 px-2 bg-[var(--brand-success)] hover:bg-[var(--brand-success-hover)] text-white font-bold"
            trackingId="mobile-sticky-whatsapp"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <MessageSquare className="h-4 w-4 mr-1.5" />
              <span className="text-xs">WA Quote</span>
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-11 w-11 border-white/20 bg-white/5 px-0 text-white hover:bg-white/10"
            trackingId="mobile-sticky-map"
          >
            <a
              href={STORE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
              aria-label={`Get directions to ${STORE_ADDRESS_LINE}`}
            >
              <MapPin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
