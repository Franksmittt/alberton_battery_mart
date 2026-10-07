'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UNITECH_PRICELIST } from '@/data/unitech-pricelist';
import { formatZAR } from '@/lib/formatting';
import {
  centsToRands,
  formatGrossProfit,
  grossProfitForPrice,
  MIN_GROSS_PROFIT_PERCENT,
  priceUnitechLine,
} from '@/lib/unitech-pricing';
import { Info, Search } from 'lucide-react';

const money = (cents: number) => formatZAR(centsToRands(cents));

export function UnitechPricelist() {
  const [search, setSearch] = useState('');

  const rows = useMemo(
    () => UNITECH_PRICELIST.map((line) => ({ ...line, pricing: priceUnitechLine(line.price5PlusExVat) })),
    []
  );

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) => row.partNumber.toLowerCase().includes(query));
  }, [rows, search]);

  const raisedCount = rows.filter((row) => row.pricing.raisedToHoldMargin).length;

  return (
    <div className="space-y-6">
      <div className="flex gap-3 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-100">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="space-y-1">
          <p className="font-semibold">Back office only. This list is not on the website.</p>
          <p>
            Unitech supplier pricelist, read-only. Prices use the PRICE 5 PLUS column (supplier cost ex VAT).
            PRICE 25 PLUS is not used. Selling prices are cost incl. VAT ÷ 0.80, rounded to the nearest R50, and
            lifted by R50 steps where needed to hold at least {MIN_GROSS_PROFIT_PERCENT}% gross profit.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Find a Unitech part</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search by part number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Unitech pricelist{' '}
            <span className="text-muted-foreground font-normal">
              ({rows.length} lines · {raisedCount} raised to hold {MIN_GROSS_PROFIT_PERCENT}%)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2 font-semibold">Part number</th>
                  <th className="p-2 font-semibold">Warranty</th>
                  <th className="p-2 font-semibold text-right whitespace-nowrap">Ex VAT (5+)</th>
                  <th className="p-2 font-semibold text-right whitespace-nowrap">Cost incl. VAT</th>
                  <th className="p-2 font-semibold text-right whitespace-nowrap">Selling price</th>
                  <th className="p-2 font-semibold text-right">GP</th>
                  <th className="p-2 font-semibold text-right whitespace-nowrap">Profit incl. VAT</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map(({ partNumber, warrantyMonths, pricing }) => (
                  <tr key={partNumber} className="border-b hover:bg-muted/40">
                    <td className="p-2 font-mono whitespace-nowrap">{partNumber}</td>
                    <td className="p-2 whitespace-nowrap">{warrantyMonths} months</td>
                    <td className="p-2 text-right tabular-nums whitespace-nowrap">{money(pricing.exVatCents)}</td>
                    <td className="p-2 text-right tabular-nums whitespace-nowrap">
                      {money(pricing.costInclVatCents)}
                    </td>
                    <td className="p-2 text-right tabular-nums whitespace-nowrap">
                      <div className="font-semibold">{money(pricing.sellingPriceCents)}</div>
                      {pricing.raisedToHoldMargin && (
                        <div className="text-xs font-normal text-amber-700 dark:text-amber-300">
                          Raised from {money(pricing.nearestStepCents)} (
                          {formatGrossProfit(grossProfitForPrice(pricing.nearestStepCents, pricing.costInclVatCents))}{' '}
                          GP)
                        </div>
                      )}
                    </td>
                    <td className="p-2 text-right tabular-nums">{formatGrossProfit(pricing.grossProfit)}</td>
                    <td className="p-2 text-right tabular-nums whitespace-nowrap">
                      {money(pricing.profitInclVatCents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRows.length === 0 && (
            <p className="py-10 text-center text-muted-foreground">No Unitech parts match your search.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
