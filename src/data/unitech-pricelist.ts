/**
 * Unitech supplier pricelist, PRICE 5 PLUS column (supplier cost ex VAT).
 * PRICE 25 PLUS is intentionally not used.
 *
 * Back office only: these parts are not in data/products.json, the public
 * catalogue, sitemaps, or Blob storage. Datasheets have not arrived yet.
 */
export interface UnitechPricelistLine {
  partNumber: string;
  warrantyMonths: number;
  price5PlusExVat: number;
}

export const UNITECH_PRICELIST: readonly UnitechPricelistLine[] = [
  { partNumber: '612A 24', warrantyMonths: 25, price5PlusExVat: 1010 },
  { partNumber: '615A 24 With lip', warrantyMonths: 25, price5PlusExVat: 820 },
  { partNumber: '615A 24 Without lip', warrantyMonths: 25, price5PlusExVat: 820 },
  { partNumber: '616AP 24 With lip', warrantyMonths: 25, price5PlusExVat: 820 },
  { partNumber: '616A 24 Without lip', warrantyMonths: 25, price5PlusExVat: 820 },
  { partNumber: '618AP 24', warrantyMonths: 25, price5PlusExVat: 850 },
  { partNumber: '621 24', warrantyMonths: 25, price5PlusExVat: 1050 },
  { partNumber: '622 24', warrantyMonths: 25, price5PlusExVat: 1050 },
  { partNumber: '628A 24', warrantyMonths: 25, price5PlusExVat: 950 },
  { partNumber: '630A 24', warrantyMonths: 25, price5PlusExVat: 880 },
  { partNumber: '631A 24', warrantyMonths: 25, price5PlusExVat: 880 },
  { partNumber: '636A 24', warrantyMonths: 25, price5PlusExVat: 895 },
  { partNumber: '638A 24', warrantyMonths: 25, price5PlusExVat: 1350 },
  { partNumber: '639A 24', warrantyMonths: 25, price5PlusExVat: 1350 },
  { partNumber: '646A 24', warrantyMonths: 25, price5PlusExVat: 1080 },
  { partNumber: '646AGM 24', warrantyMonths: 25, price5PlusExVat: 2050 },
  { partNumber: '647A 24', warrantyMonths: 25, price5PlusExVat: 1250 },
  { partNumber: '650A 24', warrantyMonths: 25, price5PlusExVat: 1750 },
  { partNumber: '650 CR 24', warrantyMonths: 25, price5PlusExVat: 1370 },
  { partNumber: '650 AM 24 90A/H', warrantyMonths: 25, price5PlusExVat: 1750 },
  { partNumber: '652A 24', warrantyMonths: 25, price5PlusExVat: 1175 },
  { partNumber: '652A AGM', warrantyMonths: 25, price5PlusExVat: 2350 },
  { partNumber: '657A 24', warrantyMonths: 25, price5PlusExVat: 1250 },
  { partNumber: '658A 24', warrantyMonths: 25, price5PlusExVat: 1750 },
  { partNumber: '658A AGM 24', warrantyMonths: 25, price5PlusExVat: 2900 },
  { partNumber: '659A 24', warrantyMonths: 25, price5PlusExVat: 1650 },
  { partNumber: '668A 24', warrantyMonths: 25, price5PlusExVat: 1580 },
  { partNumber: '668A AGM 24', warrantyMonths: 25, price5PlusExVat: 2530 },
  { partNumber: '669 A 24', warrantyMonths: 25, price5PlusExVat: 1580 },
  { partNumber: '674 SAB POST', warrantyMonths: 18, price5PlusExVat: 1850 },
  { partNumber: '674 SAS SCREW', warrantyMonths: 18, price5PlusExVat: 1850 },
  { partNumber: '674 SAD DUAL', warrantyMonths: 18, price5PlusExVat: 1850 },
  { partNumber: '682 AB', warrantyMonths: 18, price5PlusExVat: 2150 },
  { partNumber: '683 AB', warrantyMonths: 18, price5PlusExVat: 2150 },
  { partNumber: '688 AB', warrantyMonths: 18, price5PlusExVat: 3150 },
  { partNumber: '689 AB', warrantyMonths: 18, price5PlusExVat: 2450 },
  { partNumber: '695 AB', warrantyMonths: 18, price5PlusExVat: 3300 },
  { partNumber: '696 AB', warrantyMonths: 18, price5PlusExVat: 2825 },
];
