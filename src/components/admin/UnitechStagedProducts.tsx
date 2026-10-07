'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  UNITECH_GO_LIVE_OPEN_QUESTIONS,
  UNITECH_STAGED_PRODUCTS,
  UNITECH_UNPRICED_DATASHEET_PARTS,
} from '@/data/unitech-staged-products';
import { AlertTriangle } from 'lucide-react';

function sizeLabel(length?: number, width?: number, height?: number): string {
  if (length && width && height) return `${length} x ${width} x ${height} mm`;
  if (length) return `${length} mm long (width/height unconfirmed)`;
  return 'Unconfirmed';
}

export function UnitechStagedProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Staged product records{' '}
          <span className="text-muted-foreground font-normal">
            ({UNITECH_STAGED_PRODUCTS.length} ready, waiting for images · not on the website)
          </span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Specs come from the Unitech 24-month and 18-month datasheets. Names, descriptions and prices are prepared for
          the catalogue but are not published.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {UNITECH_GO_LIVE_OPEN_QUESTIONS.length > 0 && (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-100">
            <p className="font-semibold">Open questions before go-live</p>
            <ul className="mt-1 list-disc pl-5">
              {UNITECH_GO_LIVE_OPEN_QUESTIONS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="divide-y rounded-md border">
          {UNITECH_STAGED_PRODUCTS.map((product) => {
            const extraBlockers = product.goLiveBlockers.length - 1;
            return (
              <details key={product.pricelistPartNumber} className="group p-3">
                <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">{product.name}</span>
                  <span className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-mono">{product.sku}</span>
                    <span>{product.category}</span>
                    <span className="font-semibold text-foreground tabular-nums">{product.sellingPrice_OUTPUT}</span>
                    {extraBlockers > 0 && (
                      <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-1.5 py-0.5 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                        <AlertTriangle className="h-3 w-3" />
                        Check
                      </span>
                    )}
                  </span>
                </summary>

                <div className="mt-3 grid gap-4 text-sm md:grid-cols-2">
                  <dl className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-1">
                    <dt className="text-muted-foreground">Pricelist part</dt>
                    <dd className="font-mono">{product.pricelistPartNumber}</dd>
                    <dt className="text-muted-foreground">Datasheet part</dt>
                    <dd className="font-mono">{product.datasheetPartNumber}</dd>
                    <dt className="text-muted-foreground">Capacity / CCA</dt>
                    <dd>
                      {product.ahCapacity}Ah · {product.cca} CCA (SAE)
                    </dd>
                    <dt className="text-muted-foreground">Case size</dt>
                    <dd>{sizeLabel(product.lengthMm, product.widthMm, product.heightMm)}</dd>
                    <dt className="text-muted-foreground">Weight</dt>
                    <dd>{product.weightKg} kg</dd>
                    <dt className="text-muted-foreground">Terminals</dt>
                    <dd>
                      Layout {product.terminalLayout} · {product.terminalSize}
                      {product.hasHoldDownLip ? ' · hold-down lip' : ''}
                    </dd>
                    <dt className="text-muted-foreground">Warranty</dt>
                    <dd>{product.warrantyMonths} months</dd>
                    <dt className="text-muted-foreground">Popular fits</dt>
                    <dd>{product.popularFits}</dd>
                  </dl>

                  <div className="space-y-3">
                    <div>
                      <p className="text-muted-foreground">{product.seoSubtitle}</p>
                      <p className="mt-1">{product.seoDescription}</p>
                    </div>
                    <ul className="space-y-1">
                      {product.goLiveBlockers.map((b) => (
                        <li key={b} className="flex gap-2 text-amber-800 dark:text-amber-200">
                          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                      {product.notes.map((n) => (
                        <li key={n} className="text-muted-foreground">
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            );
          })}
        </div>

        {UNITECH_UNPRICED_DATASHEET_PARTS.length > 0 && (
          <p className="text-sm text-muted-foreground">
            On the datasheet but not on the pricelist, so not staged:{' '}
            <span className="font-mono">{UNITECH_UNPRICED_DATASHEET_PARTS.join(', ')}</span>.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
