"use client";

import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/layout/MobileNav";
import { useState } from "react";

const Header = () => {
  const PRIMARY_PHONE_LINK = "0101096211";
  const WHATSAPP_NUMBER_LINK = "27823046926";
  const DIRECTIONS_LINK =
    "https://www.google.com/maps/dir/?api=1&destination=28+St+Columb+Rd,+New+Redruth,+Alberton,+1450";
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--brand-border)] bg-[var(--brand-bg)] text-white shadow-sm">
      <div className="hidden lg:block">
        <div className="bg-[var(--brand-bg)] text-white">
          <div className="container h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center font-black text-xl tracking-tight whitespace-nowrap">
              Alberton{" "}
              <span className="battery-neon mx-1" data-text="Battery">
                Battery
              </span>{" "}
              Mart
            </Link>

            <p className="hidden xl:block justify-self-center text-white/85 text-sm xl:text-base font-extrabold uppercase tracking-[0.12em] whitespace-nowrap">
              Mobile Fitment. Honest Testing. Warranty Backed.
            </p>

            <div className="justify-self-end flex items-center gap-2 relative">
              <Button
                asChild
                size="sm"
                trackingId="header-call-top"
                className="h-8 min-w-[92px] bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white font-extrabold"
              >
                <a href={`tel:${PRIMARY_PHONE_LINK}`}>Call</a>
              </Button>
              <Button
                asChild
                size="sm"
                trackingId="header-whatsapp-top"
                className="h-8 min-w-[92px] bg-[var(--brand-success)] text-white border border-[var(--brand-success)] hover:bg-[var(--brand-success-hover)] font-extrabold"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER_LINK}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                trackingId="header-directions-top"
                className="h-8 min-w-[92px] bg-white text-[var(--brand-accent)] border border-[var(--brand-accent)] hover:bg-red-50 font-extrabold"
              >
                <a
                  href={DIRECTIONS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Directions
                </a>
              </Button>
              <button
                type="button"
                aria-label="Open search"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="h-8 w-8 rounded-md border border-white/20 bg-white/5 text-white inline-flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] z-[70]">
                  <form
                    action="/products/results"
                    method="get"
                    className="w-[360px] rounded-xl border border-white/20 bg-[var(--brand-bg-soft)] p-2 shadow-2xl"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        type="search"
                        name="q"
                        placeholder="Search by model, size or brand..."
                        className="h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/60 outline-none focus:border-white/35"
                      />
                      <button
                        type="submit"
                        className="h-10 px-4 rounded-md bg-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] text-white text-sm font-bold"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="bg-[var(--brand-bg-soft)] border-t border-[var(--brand-border)]">
          <div className="container h-12 px-4 sm:px-6 lg:px-8 grid grid-cols-[auto_1fr_auto] items-center gap-6">
            <div className="justify-self-start relative group">
              <button
                type="button"
                className="inline-flex items-center gap-2 font-bold text-white hover:text-[var(--brand-accent)] text-sm"
                aria-haspopup="menu"
              >
                <Menu className="h-4 w-4" />
                All Categories
                <ChevronDown className="h-4 w-4" />
              </button>

              <div className="absolute left-0 top-full mt-2 w-[min(680px,calc(100vw-2rem))] rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg-elevated)] p-5 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150">
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <p className="font-black text-white uppercase text-xs tracking-wide">Shop By Type</p>
                    <Link href="/products/type/automotive" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Automotive Batteries</Link>
                    <Link href="/products/type/performance" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Start/Stop AGM & EFB</Link>
                    <Link href="/products/type/truck-commercial" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Commercial & Fleet</Link>
                    <Link href="/products/type/deep-cycle" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Deep Cycle & Solar</Link>
                    <Link href="/products/type/motorcycle" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Motorcycle Batteries</Link>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black text-white uppercase text-xs tracking-wide">Popular Sizes</p>
                    <Link href="/products/size/621" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Size 621</Link>
                    <Link href="/products/size/646" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Size 646</Link>
                    <Link href="/products/size/652" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Size 652</Link>
                    <Link href="/products/size/658" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Size 658</Link>
                    <Link href="/products/size/668" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Size 668</Link>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black text-white uppercase text-xs tracking-wide">Services</p>
                    <Link href="/services/mobile-battery-replacement/alberton" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Mobile Replacement</Link>
                    <Link href="/services/free-battery-testing/alberton" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Free Battery Testing</Link>
                    <Link href="/services/emergency-jump-start/alberton" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Emergency Jump Start</Link>
                    <Link href="/local" className="block text-[var(--brand-muted)] hover:text-[var(--brand-accent)]">Service Areas</Link>
                    <Link href="/products" className="block font-bold text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)]">View Full Catalog</Link>
                  </div>
                </div>
              </div>
            </div>

            <nav className="justify-self-center flex items-center gap-6 text-sm font-medium text-[var(--brand-muted)]">
              <Link href="/products/type/automotive" className="hover:text-[var(--brand-accent)]">Automotive Batteries</Link>
              <Link href="/products/type/truck-commercial" className="hover:text-[var(--brand-accent)]">Commercial & Fleet</Link>
              <Link href="/products/type/performance" className="hover:text-[var(--brand-accent)]">Start/Stop (AGM)</Link>
              <Link href="/products" className="hover:text-[var(--brand-accent)]">Accessories</Link>
            </nav>

            <div className="justify-self-end flex items-center gap-4 text-sm font-semibold text-[var(--brand-muted)]">
              <Link href="/products/brand/power-plus" className="hover:text-[var(--brand-accent)]">
                PowerPlus
              </Link>
              <Link href="/products/brand/eco-plus" className="hover:text-[var(--brand-accent)]">
                Ecoplus
              </Link>
              <Link href="/products/brand/exide" className="hover:text-[var(--brand-accent)]">
                Exide
              </Link>
              <Link href="/products/brand/willard" className="hover:text-[var(--brand-accent)]">
                Willard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden bg-[var(--brand-bg)] border-t border-white/10">
        <div className="container h-16 px-4 flex items-center justify-between gap-3">
          <Link href="/" className="min-w-0 flex-1 text-sm sm:text-lg font-black text-white tracking-tight leading-tight">
            Alberton <span className="text-[var(--brand-accent)] ml-1">Battery</span> Mart
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;