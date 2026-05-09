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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="hidden lg:block">
        <div className="bg-[#121212] text-white">
          <div className="container h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center font-black text-xl tracking-tight whitespace-nowrap">
              Alberton{" "}
              <span className="battery-neon mx-1" data-text="Battery">
                Battery
              </span>{" "}
              Mart
            </Link>

            <p className="justify-self-center text-white/85 text-sm xl:text-base font-extrabold uppercase tracking-[0.12em] whitespace-nowrap">
              Mobile Fitment. Honest Testing. Warranty Backed.
            </p>

            <div className="justify-self-end flex items-center gap-2 relative">
              <Button
                asChild
                size="sm"
                trackingId="header-call-top"
                className="h-8 min-w-[92px] bg-red-600 hover:bg-red-700 text-white font-extrabold"
              >
                <a href={`tel:${PRIMARY_PHONE_LINK}`}>Call</a>
              </Button>
              <Button
                asChild
                size="sm"
                trackingId="header-whatsapp-top"
                className="h-8 min-w-[92px] bg-[#25D366] text-white border border-[#25D366] hover:bg-[#1ebe5a] font-extrabold"
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
                className="h-8 min-w-[92px] bg-white text-red-600 border border-red-600 hover:bg-red-50 font-extrabold"
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
                    className="w-[360px] rounded-xl border border-white/20 bg-[#171717] p-2 shadow-2xl"
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
                        className="h-10 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-bold"
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

        <div className="bg-slate-100 border-t border-slate-800/30">
          <div className="container h-12 px-4 sm:px-6 lg:px-8 grid grid-cols-[auto_1fr_auto] items-center gap-6">
            <div className="justify-self-start relative group">
              <button
                type="button"
                className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-red-600 text-sm"
                aria-haspopup="menu"
              >
                <Menu className="h-4 w-4" />
                All Categories
                <ChevronDown className="h-4 w-4" />
              </button>

              <div className="absolute left-0 top-full mt-2 w-[680px] rounded-xl border border-slate-200 bg-white p-5 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150">
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div className="space-y-2">
                    <p className="font-black text-slate-900 uppercase text-xs tracking-wide">Shop By Type</p>
                    <Link href="/products/type/automotive" className="block text-slate-700 hover:text-red-600">Automotive Batteries</Link>
                    <Link href="/products/type/performance" className="block text-slate-700 hover:text-red-600">Start/Stop AGM & EFB</Link>
                    <Link href="/products/type/truck-commercial" className="block text-slate-700 hover:text-red-600">Commercial & Fleet</Link>
                    <Link href="/products/type/deep-cycle" className="block text-slate-700 hover:text-red-600">Deep Cycle & Solar</Link>
                    <Link href="/products/type/motorcycle" className="block text-slate-700 hover:text-red-600">Motorcycle Batteries</Link>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black text-slate-900 uppercase text-xs tracking-wide">Popular Sizes</p>
                    <Link href="/products/size/621" className="block text-slate-700 hover:text-red-600">Size 621</Link>
                    <Link href="/products/size/646" className="block text-slate-700 hover:text-red-600">Size 646</Link>
                    <Link href="/products/size/652" className="block text-slate-700 hover:text-red-600">Size 652</Link>
                    <Link href="/products/size/658" className="block text-slate-700 hover:text-red-600">Size 658</Link>
                    <Link href="/products/size/668" className="block text-slate-700 hover:text-red-600">Size 668</Link>
                  </div>
                  <div className="space-y-2">
                    <p className="font-black text-slate-900 uppercase text-xs tracking-wide">Services</p>
                    <Link href="/services/mobile-battery-replacement/alberton" className="block text-slate-700 hover:text-red-600">Mobile Replacement</Link>
                    <Link href="/services/free-battery-testing/alberton" className="block text-slate-700 hover:text-red-600">Free Battery Testing</Link>
                    <Link href="/services/emergency-jump-start/alberton" className="block text-slate-700 hover:text-red-600">Emergency Jump Start</Link>
                    <Link href="/local" className="block text-slate-700 hover:text-red-600">Service Areas</Link>
                    <Link href="/products" className="block font-bold text-red-600 hover:text-red-700">View Full Catalog</Link>
                  </div>
                </div>
              </div>
            </div>

            <nav className="justify-self-center flex items-center gap-6 text-sm font-medium text-slate-700">
              <Link href="/products/type/automotive" className="hover:text-red-600">Automotive Batteries</Link>
              <Link href="/products/type/truck-commercial" className="hover:text-red-600">Commercial & Fleet</Link>
              <Link href="/products/type/performance" className="hover:text-red-600">Start/Stop (AGM)</Link>
              <Link href="/products" className="hover:text-red-600">Accessories</Link>
            </nav>

            <div className="justify-self-end flex items-center gap-4 text-sm font-semibold text-slate-700">
              <Link href="/products/brand/power-plus" className="hover:text-red-600">
                PowerPlus
              </Link>
              <Link href="/products/brand/eco-plus" className="hover:text-red-600">
                Ecoplus
              </Link>
              <Link href="/products/brand/exide" className="hover:text-red-600">
                Exide
              </Link>
              <Link href="/products/brand/willard" className="hover:text-red-600">
                Willard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="container h-16 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center font-black text-base sm:text-lg text-slate-900 tracking-tight whitespace-nowrap">
            Alberton Battery Mart
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;