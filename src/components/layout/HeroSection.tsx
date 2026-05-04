// src/components/layout/HeroSection.tsx
import { Zap, MapPin, Phone, AlertCircle } from "lucide-react";
import React from "react";
import { HeroCtaButtons } from "./HeroCtaButtons";
import { YMMSearchWidget } from "@/components/content/YMMSearchWidget";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  variant?: "control" | "variant";
};

const PRIMARY_PHONE = "010 109 6211";

const HeroSection = ({ variant = "control" }: HeroSectionProps) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-background via-background to-background/95 min-h-[calc(100vh-5rem)] flex items-center pt-20 pb-32">
      <div className="container px-4 md:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          
          {/* Left Side (70%): YMM Search Widget - The Functional Hero */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-center lg:text-left space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                Find the Right Battery. <span className="text-battery">Instantly.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Enter your vehicle details below to see compatible batteries with guaranteed fitment and free installation.
              </p>
            </div>
            
            {/* YMM Search Widget */}
            <div className="pt-4">
              <YMMSearchWidget variant="hero" />
            </div>

            {/* Trust Signals - Immediately Below Search */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="h-10 w-10 rounded-full bg-battery/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-battery" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Free Testing</p>
                  <p className="text-xs text-white/60">Battery & Alternator</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="h-10 w-10 rounded-full bg-battery/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-battery" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Free Fitment</p>
                  <p className="text-xs text-white/60">Professional Installation</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="h-10 w-10 rounded-full bg-battery/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-battery" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">We Recycle</p>
                  <p className="text-xs text-white/60">Old Batteries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side (30%): Panic Button & Emergency CTA */}
          <div className="lg:col-span-3 space-y-4">
            <div className="sticky top-24 space-y-4">
              {/* Emergency Panic Button */}
              <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 border-2 border-red-500/50 rounded-xl p-6 space-y-4 shadow-[0_8px_30px_rgba(239,68,68,0.3)]">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                  <h3 className="text-xl font-black text-white">Dead Battery?</h3>
                </div>
                <p className="text-sm text-white/80">
                  We come to you. Mobile service available now in Alberton, New Redruth & Meyersdal.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <a href={`tel:${PRIMARY_PHONE.replace(/ /g, '')}`} className="flex items-center justify-center gap-2">
                    <Phone className="h-6 w-6" />
                    <span>Call Now</span>
                  </a>
                </Button>
                <p className="text-xs text-white/60 text-center">
                  {PRIMARY_PHONE}
                </p>
              </div>

              {/* Alternative: Inverter/Solar Link */}
              <div className="bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] border border-white/10 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">Need Inverter/Solar?</h3>
                <p className="text-sm text-white/70">
                  Use our Load Calculator to find the perfect battery for your home backup system.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <a href="/products/type/deep-cycle">Calculate Load</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;