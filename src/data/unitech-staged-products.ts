/**
 * Unitech product records staged for go-live. Back office only.
 *
 * These mirror the shape of data/products.json entries so publishing is a copy
 * once images arrive, but they are NOT in the public catalogue, sitemaps,
 * product pages or Blob. Nothing outside /admin may import this file.
 *
 * Going live still needs: supplier images, catalogue ids, 'Unitech' added to
 * ProductCardData['brandName'], and the open questions below answered.
 */
import type { ProductCardData } from '@/data/products';
import {
  findDatasheetRow,
  UNITECH_DATASHEET,
  type TerminalLayout,
  type UnitechDatasheetRow,
} from '@/data/unitech-datasheet';
import { UNITECH_PRICELIST } from '@/data/unitech-pricelist';
import { formatZAR } from '@/lib/formatting';
import { centsToRands, priceUnitechLine } from '@/lib/unitech-pricing';

export type UnitechStagedProduct = Omit<ProductCardData, 'id' | 'brandName' | 'imagePath'> & {
  brandName: 'Unitech';
  /** Null until the supplier sends product images. */
  imagePath: string | null;
  pricelistPartNumber: string;
  datasheetPartNumber: string;
  terminalLayout: TerminalLayout;
  terminalSize: 'STD' | 'SML';
  hasHoldDownLip: boolean;
  notes: string[];
  goLiveBlockers: string[];
};

export const UNITECH_GO_LIVE_OPEN_QUESTIONS: readonly string[] = [
  'Warranty: the pricelist says 25 months for the 6xxA range, the datasheet says 24 months. Staged records use the datasheet (24 / 18).',
];

type TruckTerminal = 'Post Terminals' | 'Screw Terminals' | 'Dual Terminals';

interface StagingMapEntry {
  datasheetPartNumber: string;
  terminalSize?: 'STD' | 'SML';
  popularFits: string;
  lipLabel?: 'With Hold-Down Lip' | 'Without Lip';
  truckTerminal?: TruckTerminal;
  notes?: string[];
  blockers?: string[];
}

const COMMERCIAL_FITS = 'Trucks, buses, construction and fleet vehicles';

/** Pricelist part number -> datasheet row and catalogue copy inputs. */
const STAGING_MAP: Record<string, StagingMapEntry> = {
  '612A 24': { datasheetPartNumber: '612A 24', popularFits: 'Hatchbacks, sedans, and light SUVs' },
  '615A 24 With lip': { datasheetPartNumber: '615AP 24', popularFits: 'Compact cars', lipLabel: 'With Hold-Down Lip' },
  '615A 24 Without lip': { datasheetPartNumber: '615A 24', popularFits: 'Compact cars', lipLabel: 'Without Lip' },
  '616AP 24 With lip': { datasheetPartNumber: '616AP 24', popularFits: 'Compact cars', lipLabel: 'With Hold-Down Lip' },
  '616A 24 Without lip': { datasheetPartNumber: '616A 24', popularFits: 'Compact cars', lipLabel: 'Without Lip' },
  '618AP 24': {
    datasheetPartNumber: '618A 24',
    popularFits: 'Toyota Tazz, VW Polo Vivo, Opel Corsa',
    notes: ['Pricelist says 618AP 24; the datasheet only lists 618A 24 (with hold-down lip).'],
  },
  '621 24': { datasheetPartNumber: '621A 24', popularFits: 'Medium sedans' },
  '622 24': { datasheetPartNumber: '622A 24', popularFits: 'Medium sedans' },
  '628A 24': { datasheetPartNumber: '628A 24', popularFits: 'Hyundai Grand i10, Renault Clio' },
  '630A 24': { datasheetPartNumber: '630A 24', popularFits: 'Compact hatchbacks' },
  '631A 24': {
    datasheetPartNumber: '631A 24',
    terminalSize: 'STD',
    popularFits: 'Compact hatchbacks',
    blockers: ['Datasheet lists 631A 24 with STD and SML terminals; confirm which one the pricelist line supplies.'],
  },
  '636A 24': { datasheetPartNumber: '636A 24', popularFits: 'Compact hatchbacks' },
  '638A 24': { datasheetPartNumber: '638A 24', popularFits: 'Family sedans, SUVs' },
  '639A 24': { datasheetPartNumber: '639A 24', popularFits: 'Family sedans, SUVs' },
  '646A 24': { datasheetPartNumber: '646A 24', popularFits: 'Nissan NP200, Renault Sandero, Toyota Yaris' },
  '646AGM 24': { datasheetPartNumber: '646A AGM 24', popularFits: 'VW Polo TSI, Ford EcoSport (Start/Stop)' },
  '647A 24': { datasheetPartNumber: '647A 24', popularFits: 'Bakkies, SUVs' },
  '650A 24': { datasheetPartNumber: '650A 24', popularFits: 'Heavy duty bakkies' },
  '650 CR 24': { datasheetPartNumber: '650ACR 24', popularFits: 'Heavy duty bakkies' },
  '650 AM 24 90A/H': {
    datasheetPartNumber: '650AM 24',
    popularFits: 'Heavy duty bakkies',
    blockers: ['Pricelist says 90A/H, datasheet says 95 Ah. Staged record uses 95 Ah; confirm with Unitech.'],
  },
  '652A 24': { datasheetPartNumber: '652A 24', popularFits: 'Toyota Hilux (Petrol), Ford Ranger (Diesel)' },
  '652A AGM': { datasheetPartNumber: '652A AGM 24', popularFits: 'Hyundai Tucson, VW Tiguan (Start/Stop)' },
  '657A 24': { datasheetPartNumber: '657A 24', popularFits: 'Toyota Hilux, Ford Ranger' },
  '658A 24': { datasheetPartNumber: '658A 24', popularFits: 'Toyota Land Cruiser, Heavy Duty Bakkies' },
  '658A AGM 24': { datasheetPartNumber: '658A AGM 24', popularFits: 'BMW, Mercedes, Audi (BMS Coding Required)' },
  '659A 24': { datasheetPartNumber: '659A 24', popularFits: 'SUVs, bakkies' },
  '668A 24': { datasheetPartNumber: '668A 24', popularFits: 'Heavy Duty Petrol/Diesel SUV' },
  '668A AGM 24': { datasheetPartNumber: '668A AGM 24', popularFits: 'BMW, Mercedes, Audi (BMS Coding Required)' },
  '669 A 24': { datasheetPartNumber: '669A 24', popularFits: 'Heavy duty SUVs' },
  '674 SAB POST': { datasheetPartNumber: '674SAB', popularFits: 'Commercial trucks', truckTerminal: 'Post Terminals' },
  '674 SAS SCREW': { datasheetPartNumber: '674SAS', popularFits: 'Commercial trucks', truckTerminal: 'Screw Terminals' },
  '674 SAD DUAL': { datasheetPartNumber: '674SAD', popularFits: 'Commercial trucks', truckTerminal: 'Dual Terminals' },
  '682 AB': { datasheetPartNumber: '682AB', popularFits: COMMERCIAL_FITS },
  '683 AB': { datasheetPartNumber: '683AB', popularFits: COMMERCIAL_FITS },
  '688 AB': { datasheetPartNumber: '688AB', popularFits: COMMERCIAL_FITS },
  '689 AB': { datasheetPartNumber: '689AB', popularFits: COMMERCIAL_FITS },
  '695 AB': { datasheetPartNumber: '695AB', popularFits: COMMERCIAL_FITS },
  '696 AB': { datasheetPartNumber: '696AB', popularFits: COMMERCIAL_FITS },
};

const STORE_LINE = 'Tested and fitted at 28 St Columb Rd, New Redruth, Alberton.';

function modelFrom(datasheetPartNumber: string): string {
  return datasheetPartNumber.replace(/\s+24$/, '');
}

function categoryFor(row: UnitechDatasheetRow): ProductCardData['category'] {
  if (row.warrantyMonths === 18) return 'Truck & Commercial';
  if (/AGM/.test(row.partNumber)) return 'Performance AGM/EFB';
  return 'Standard Automotive';
}

function formatKg(kg: number): string {
  return `${kg} kg`;
}

function buildStagedProduct(pricelistPartNumber: string): UnitechStagedProduct {
  const line = UNITECH_PRICELIST.find((l) => l.partNumber === pricelistPartNumber);
  const entry = STAGING_MAP[pricelistPartNumber];
  if (!line || !entry) throw new Error(`No staging entry for Unitech ${pricelistPartNumber}`);

  const row = findDatasheetRow(entry.datasheetPartNumber, entry.terminalSize);
  if (!row) throw new Error(`No datasheet row for Unitech ${entry.datasheetPartNumber}`);

  const model = modelFrom(row.partNumber);
  const category = categoryFor(row);
  const isAGM = category === 'Performance AGM/EFB';
  const isTruck = category === 'Truck & Commercial';
  const hasHoldDownLip = row.holdDown === 'F';

  const notes = [...(entry.notes ?? []), ...(row.datasheetNotes ?? [])];
  const blockers = ['Waiting for supplier product image.', ...(entry.blockers ?? [])];

  const sizeIsSuspect = row.partNumber === '668A 24';
  if (sizeIsSuspect) {
    blockers.push('Datasheet width/height look wrong (355 x 175 mm). Case size left off until Unitech confirms.');
  }

  const kind = isTruck ? 'Truck Battery' : isAGM ? 'Battery' : 'Car Battery';
  const suffix = entry.lipLabel ?? entry.truckTerminal;
  const name = `Unitech ${model} ${kind}${suffix ? ` (${suffix})` : ''}`;

  const caseSize = sizeIsSuspect
    ? `Length: ${row.lengthMm} mm, ${formatKg(row.weightKg)}.`
    : `Case size: ${row.lengthMm} x ${row.widthMm} x ${row.heightMm} mm, ${formatKg(row.weightKg)}.`;

  let typeSentence: string;
  if (isTruck) {
    const terminals = entry.truckTerminal ? ` with ${entry.truckTerminal.toLowerCase()}` : '';
    typeSentence = `The Unitech ${model} is a 12V heavy-duty commercial battery${terminals}, rated ${row.ahCapacity}Ah and ${row.cca} CCA.`;
  } else if (isAGM) {
    typeSentence = `The Unitech ${model} is a 12V AGM battery for start-stop and high-demand vehicles, rated ${row.ahCapacity}Ah and ${row.cca} CCA.`;
  } else {
    typeSentence = `The Unitech ${model} is a 12V car battery rated ${row.ahCapacity}Ah and ${row.cca} CCA.`;
  }

  const lipSentence = entry.lipLabel
    ? hasHoldDownLip
      ? ' This version has a hold-down lip on the base.'
      : ' This version has no hold-down lip.'
    : '';
  const bmsSentence = isAGM ? ' BMS coding is done at fitment where the vehicle needs it.' : '';

  const article = row.warrantyMonths === 18 ? 'an' : 'a';
  const seoDescription =
    `${typeSentence} ${caseSize}${lipSentence} Popular fits: ${entry.popularFits}.` +
    ` Backed by ${article} ${row.warrantyMonths}-month warranty.${bmsSentence} ${STORE_LINE}`;

  const subtitleKind = isTruck ? 'Truck Battery' : isAGM ? 'AGM Battery' : 'Car Battery';
  const pricing = priceUnitechLine(line.price5PlusExVat);

  return {
    name,
    sku: `UT-${model.replace(/\s+/g, '-')}`,
    category,
    brandName: 'Unitech',
    ahCapacity: row.ahCapacity,
    cca: row.cca,
    warrantyMonths: row.warrantyMonths,
    sellingPrice_OUTPUT: formatZAR(centsToRands(pricing.sellingPriceCents)),
    isAGM,
    imagePath: null,
    popularFits: entry.popularFits,
    isScrapPrice: true,
    seoSubtitle: `Unitech ${subtitleKind} (${row.ahCapacity}Ah)`,
    seoDescription,
    lengthMm: row.lengthMm,
    widthMm: sizeIsSuspect ? undefined : row.widthMm,
    heightMm: sizeIsSuspect ? undefined : row.heightMm,
    weightKg: row.weightKg,
    pricelistPartNumber,
    datasheetPartNumber: row.partNumber,
    terminalLayout: row.terminalLayout,
    terminalSize: row.terminalSize,
    hasHoldDownLip,
    notes,
    goLiveBlockers: blockers,
  };
}

export const UNITECH_STAGED_PRODUCTS: readonly UnitechStagedProduct[] = UNITECH_PRICELIST.map((line) =>
  buildStagedProduct(line.partNumber)
);

/** Datasheet parts Unitech supplies that are not on the pricelist, so not staged. */
export const UNITECH_UNPRICED_DATASHEET_PARTS: readonly string[] = (() => {
  const staged = new Set(Object.values(STAGING_MAP).map((e) => e.datasheetPartNumber));
  return Array.from(new Set(UNITECH_DATASHEET.map((r) => r.partNumber).filter((p) => !staged.has(p))));
})();
