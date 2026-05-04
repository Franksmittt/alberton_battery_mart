// src/components/content/ProductCard.tsx

'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, BatteryCharging, ShieldCheck, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductCardData } from '@/data/products';

export function ProductCard({ product }: { product: ProductCardData }) {
  const isAGM = product.isAGM;
  
  // Use product ID to create dynamic link path
  const linkPath = `/product/${product.id}`;

  const badgeLabel = isAGM ? 'AGM / Start-Stop' : 'Standard Fitment';

  return (
    <Link
      href={linkPath}
      className="group block h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-battery/40 rounded-2xl"
    >
      <Card
        className={cn(
          'relative h-full overflow-hidden border border-white/5 bg-gradient-to-br from-[#060606] via-[#0b0b10] to-[#151821] text-white',
          'shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out',
          'before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(192,0,0,0.15),_transparent)] before:opacity-0 before:transition-opacity before:duration-500',
          'after:absolute after:-top-1/2 after:left-1/2 after:w-64 after:h-64 after:bg-battery/40 after:blur-3xl after:opacity-0 after:-translate-x-1/2 after:transition-all after:duration-500',
          'group-hover:-translate-y-1 group-hover:border-battery/60 group-hover:shadow-[0_25px_50px_rgba(192,0,0,0.35)] group-hover:before:opacity-50 group-hover:after:opacity-60'
        )}
      >
        <div className="absolute inset-px rounded-[18px] border border-white/5 pointer-events-none" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(130deg,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)] animate-[energyGridPulse_8s_ease-in-out_infinite]" />

        <CardHeader className="relative z-10 p-6 flex flex-col items-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.3em] uppercase bg-white/10 text-white/80 border border-white/20">
            <BatteryCharging className="h-3.5 w-3.5 text-battery" />
            <span>{badgeLabel}</span>
          </div>

          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-battery/20 blur-3xl opacity-70" />
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>

          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-black tracking-tight text-white">
              {product.name}
            </CardTitle>
            <p className="text-sm text-white/70">{product.seoSubtitle}</p>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 px-6 pb-4 space-y-5">
          <Separator className="border-white/10" />

          <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">CCA</p>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-battery" />
                <p className="text-lg font-bold text-white">{product.cca || 'N/A'}</p>
              </div>
            </div>

            <div className="space-y-1 text-right">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Capacity</p>
              <p className="text-lg font-bold text-white">{product.ahCapacity}Ah</p>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Warranty</p>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <p className="text-base font-semibold text-white">
                  {product.warrantyMonths} Months
                </p>
              </div>
            </div>

            <div className="space-y-1 text-right">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Price</p>
              <p className="text-xl font-black text-battery">{product.sellingPrice_OUTPUT}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="relative z-10 px-6 pb-6 pt-0 flex items-center justify-between text-sm text-white/70">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
              Price includes Scrap Exchange
            </p>
          </div>

          <div className="flex items-center gap-2 text-battery font-semibold">
            <span>Details</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}