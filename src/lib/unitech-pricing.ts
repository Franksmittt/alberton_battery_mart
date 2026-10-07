export const VAT_PERCENT = 15;
export const MIN_GROSS_PROFIT_PERCENT = 20;
export const ROUNDING_STEP_CENTS = 5000;

export interface UnitechPricing {
  exVatCents: number;
  costInclVatCents: number;
  /** Nearest R50 to cost incl. VAT ÷ 0.80, ties rounded up. */
  nearestStepCents: number;
  sellingPriceCents: number;
  profitInclVatCents: number;
  /** Gross profit as a fraction of selling price, e.g. 0.226. */
  grossProfit: number;
  /** True when the nearest R50 fell under 20% GP and the price was lifted. */
  raisedToHoldMargin: boolean;
}

export function randsToCents(rands: number): number {
  return Math.round(rands * 100);
}

export function centsToRands(cents: number): number {
  return cents / 100;
}

// GP >= 20% <=> (sell - cost) / sell >= 1/5 <=> 4 * sell >= 5 * cost, kept in integers.
function meetsMinimumMargin(sellCents: number, costCents: number): boolean {
  return 4 * sellCents >= 5 * costCents;
}

export function priceUnitechLine(exVatRands: number): UnitechPricing {
  const exVatCents = randsToCents(exVatRands);
  const costInclVatCents = Math.floor((exVatCents * (100 + VAT_PERCENT) + 50) / 100);

  // Target = cost / 0.80 = cost * 5/4. Steps of 5000c, so step index = round(cost * 5/4 / 5000)
  // = round(cost / 4000) = floor((2 * cost + 4000) / 8000), which rounds ties up.
  const stepIndex = Math.floor((2 * costInclVatCents + 4000) / 8000);
  const nearestStepCents = stepIndex * ROUNDING_STEP_CENTS;

  let sellingPriceCents = nearestStepCents;
  while (!meetsMinimumMargin(sellingPriceCents, costInclVatCents)) {
    sellingPriceCents += ROUNDING_STEP_CENTS;
  }

  const profitInclVatCents = sellingPriceCents - costInclVatCents;

  return {
    exVatCents,
    costInclVatCents,
    nearestStepCents,
    sellingPriceCents,
    profitInclVatCents,
    grossProfit: profitInclVatCents / sellingPriceCents,
    raisedToHoldMargin: sellingPriceCents !== nearestStepCents,
  };
}

export function grossProfitForPrice(sellCents: number, costCents: number): number {
  return (sellCents - costCents) / sellCents;
}

export function formatGrossProfit(fraction: number): string {
  return `${(fraction * 100).toFixed(1)}%`;
}
