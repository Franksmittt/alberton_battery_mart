// src/components/layout/MobileNav.tsx
"use client";
import { useState } from 'react';
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// --- FIX: Import navItems from the central constants file ---
import { navItems, mobileCtaItem } from "@/lib/nav-constants";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const PRIMARY_PHONE = "0101096211"; 
  const WHATSAPP_NUMBER_LINK = "27823046926";

  // --- FIX: Combine the standard nav with the mobile CTA ---
  const allMobileItems = [...navItems, mobileCtaItem];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-md border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
        >
          <Menu className="h-6 w-6 text-[var(--brand-accent)]" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-l border-[var(--brand-border)] bg-[var(--brand-bg)] p-0 text-white sm:max-w-sm">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-[var(--brand-border)] px-6 py-5 text-left">
            <SheetTitle className="text-left">
              <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <span className="text-lg font-extrabold tracking-tight text-white">
                  Alberton <span className="text-[var(--brand-accent)]">Battery</span> Mart
                </span>
              </Link>
            </SheetTitle>
            <p className="pt-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)]">
              Mobile Fitment. Honest Testing.
            </p>
          </SheetHeader>

          <nav className="flex-1 space-y-2 overflow-y-auto px-6 py-6">
            {allMobileItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl border px-4 py-3 text-base font-extrabold uppercase tracking-[0.05em] transition-colors ${
                  item.isCta
                    ? "border-[var(--brand-accent)]/60 bg-[var(--brand-accent)]/15 text-[var(--brand-accent)] hover:bg-[var(--brand-accent)]/25"
                    : "border-[var(--brand-border)] bg-white/[0.03] text-white hover:border-[var(--brand-accent)]/40 hover:text-[var(--brand-accent)]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-3 border-t border-[var(--brand-border)] px-6 py-6">
            <Button asChild size="lg" className="h-12 w-full bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent-hover)] font-extrabold">
              <a href={`tel:${PRIMARY_PHONE}`}>Call Us: {PRIMARY_PHONE}</a>
            </Button>
            <Button asChild size="lg" className="h-12 w-full bg-[var(--brand-success)] text-white hover:bg-[var(--brand-success-hover)] font-extrabold">
              <a href={`https://wa.me/${WHATSAPP_NUMBER_LINK}`} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;