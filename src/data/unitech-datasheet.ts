/**
 * Unitech battery datasheets, captured as printed:
 * - "UPDATED 24 DATA SHEET 2026.pdf" (24 month warranty)
 * - "UPDATED 18 MONTH DATA SHEET 2026.pdf" (18 month warranty)
 *
 * Back office only. Values are not corrected here; known datasheet issues are
 * listed in `datasheetNotes` and surfaced as go-live blockers.
 */
export type TerminalLayout = '- +' | '+ -';

export interface UnitechDatasheetRow {
  /** Row number on the sheet (the 24-month sheet prints row 12 twice). */
  sheetRow: number;
  partNumber: string;
  warrantyMonths: number;
  volts: number;
  /** 20-hour rate capacity. */
  ahCapacity: number;
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  /** CCA (SAE). */
  cca: number;
  terminalLayout: TerminalLayout;
  weightKg: number;
  color: 'BLK';
  /** "F" on the sheet means a hold-down lip (flange); null when blank. */
  holdDown: 'F' | null;
  terminalSize: 'STD' | 'SML';
  datasheetNotes?: string[];
}

const W24 = 24;
const W18 = 18;

export const UNITECH_DATASHEET: readonly UnitechDatasheetRow[] = [
  { sheetRow: 1, partNumber: '610A 24', warrantyMonths: W24, volts: 12, ahCapacity: 45, lengthMm: 230, widthMm: 177, heightMm: 205, cca: 420, terminalLayout: '+ -', weightKg: 12.5, color: 'BLK', holdDown: null, terminalSize: 'STD' },
  { sheetRow: 2, partNumber: '612A 24', warrantyMonths: W24, volts: 12, ahCapacity: 50, lengthMm: 247, widthMm: 174, heightMm: 195, cca: 440, terminalLayout: '- +', weightKg: 12.25, color: 'BLK', holdDown: null, terminalSize: 'STD' },
  { sheetRow: 3, partNumber: '615A 24', warrantyMonths: W24, volts: 12, ahCapacity: 35, lengthMm: 197, widthMm: 128, heightMm: 221, cca: 330, terminalLayout: '+ -', weightKg: 10, color: 'BLK', holdDown: null, terminalSize: 'SML' },
  { sheetRow: 4, partNumber: '615AP 24', warrantyMonths: W24, volts: 12, ahCapacity: 35, lengthMm: 197, widthMm: 128, heightMm: 221, cca: 330, terminalLayout: '+ -', weightKg: 10, color: 'BLK', holdDown: 'F', terminalSize: 'SML' },
  { sheetRow: 5, partNumber: '616A 24', warrantyMonths: W24, volts: 12, ahCapacity: 35, lengthMm: 197, widthMm: 128, heightMm: 221, cca: 330, terminalLayout: '- +', weightKg: 10, color: 'BLK', holdDown: null, terminalSize: 'SML' },
  { sheetRow: 6, partNumber: '616AP 24', warrantyMonths: W24, volts: 12, ahCapacity: 35, lengthMm: 180, widthMm: 128, heightMm: 225, cca: 330, terminalLayout: '- +', weightKg: 9.3, color: 'BLK', holdDown: 'F', terminalSize: 'SML' },
  { sheetRow: 7, partNumber: '618A 24', warrantyMonths: W24, volts: 12, ahCapacity: 40, lengthMm: 208, widthMm: 175, heightMm: 175, cca: 340, terminalLayout: '- +', weightKg: 10.9, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 8, partNumber: '621A 24', warrantyMonths: W24, volts: 12, ahCapacity: 50, lengthMm: 225, widthMm: 180, heightMm: 220, cca: 400, terminalLayout: '- +', weightKg: 14.4, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 9, partNumber: '622A 24', warrantyMonths: W24, volts: 12, ahCapacity: 50, lengthMm: 225, widthMm: 180, heightMm: 220, cca: 400, terminalLayout: '+ -', weightKg: 14.2, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 10, partNumber: '628A 24', warrantyMonths: W24, volts: 12, ahCapacity: 50, lengthMm: 245, widthMm: 175, heightMm: 175, cca: 440, terminalLayout: '- +', weightKg: 13.2, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 11, partNumber: '630A 24', warrantyMonths: W24, volts: 12, ahCapacity: 45, lengthMm: 230, widthMm: 125, heightMm: 223, cca: 380, terminalLayout: '+ -', weightKg: 11.5, color: 'BLK', holdDown: null, terminalSize: 'STD' },
  {
    sheetRow: 12, partNumber: '631A 24', warrantyMonths: W24, volts: 12, ahCapacity: 45, lengthMm: 230, widthMm: 125, heightMm: 223, cca: 380, terminalLayout: '- +', weightKg: 11.6, color: 'BLK', holdDown: null, terminalSize: 'STD',
    datasheetNotes: ['Row 12 is printed twice: once with STD terminals (11.6 kg) and once with SML terminals (11.5 kg).'],
  },
  {
    sheetRow: 12, partNumber: '631A 24', warrantyMonths: W24, volts: 12, ahCapacity: 45, lengthMm: 230, widthMm: 125, heightMm: 223, cca: 380, terminalLayout: '- +', weightKg: 11.5, color: 'BLK', holdDown: null, terminalSize: 'SML',
    datasheetNotes: ['Row 12 is printed twice: once with STD terminals (11.6 kg) and once with SML terminals (11.5 kg).'],
  },
  { sheetRow: 13, partNumber: '634A 24', warrantyMonths: W24, volts: 12, ahCapacity: 45, lengthMm: 236, widthMm: 137, heightMm: 225, cca: 400, terminalLayout: '+ -', weightKg: 10.8, color: 'BLK', holdDown: null, terminalSize: 'STD' },
  { sheetRow: 14, partNumber: '636A 24', warrantyMonths: W24, volts: 12, ahCapacity: 45, lengthMm: 229, widthMm: 120, heightMm: 225, cca: 380, terminalLayout: '- +', weightKg: 11.5, color: 'BLK', holdDown: null, terminalSize: 'STD' },
  { sheetRow: 15, partNumber: '638A 24', warrantyMonths: W24, volts: 12, ahCapacity: 70, lengthMm: 253, widthMm: 175, heightMm: 220, cca: 600, terminalLayout: '+ -', weightKg: 16.75, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 16, partNumber: '639A 24', warrantyMonths: W24, volts: 12, ahCapacity: 70, lengthMm: 252, widthMm: 175, heightMm: 220, cca: 560, terminalLayout: '- +', weightKg: 17.4, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 17, partNumber: '643A 24', warrantyMonths: W24, volts: 12, ahCapacity: 60, lengthMm: 245, widthMm: 175, heightMm: 190, cca: 530, terminalLayout: '+ -', weightKg: 13.5, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 18, partNumber: '646A 24', warrantyMonths: W24, volts: 12, ahCapacity: 55, lengthMm: 245, widthMm: 175, heightMm: 190, cca: 580, terminalLayout: '- +', weightKg: 14.9, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 19, partNumber: '646A AGM 24', warrantyMonths: W24, volts: 12, ahCapacity: 60, lengthMm: 245, widthMm: 175, heightMm: 190, cca: 675, terminalLayout: '- +', weightKg: 18.1, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 20, partNumber: '647A 24', warrantyMonths: W24, volts: 12, ahCapacity: 63, lengthMm: 280, widthMm: 177, heightMm: 175, cca: 550, terminalLayout: '- +', weightKg: 15.6, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 21, partNumber: '650A 24', warrantyMonths: W24, volts: 12, ahCapacity: 70, lengthMm: 298, widthMm: 180, heightMm: 220, cca: 600, terminalLayout: '+ -', weightKg: 18.4, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 22, partNumber: '650ACR 24', warrantyMonths: W24, volts: 12, ahCapacity: 70, lengthMm: 298, widthMm: 180, heightMm: 220, cca: 600, terminalLayout: '- +', weightKg: 18.6, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 23, partNumber: '650AM 24', warrantyMonths: W24, volts: 12, ahCapacity: 95, lengthMm: 295, widthMm: 173, heightMm: 220, cca: 730, terminalLayout: '+ -', weightKg: 22, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 24, partNumber: '652A 24', warrantyMonths: W24, volts: 12, ahCapacity: 66, lengthMm: 278, widthMm: 175, heightMm: 190, cca: 620, terminalLayout: '- +', weightKg: 16.4, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 25, partNumber: '652A AGM 24', warrantyMonths: W24, volts: 12, ahCapacity: 70, lengthMm: 275, widthMm: 175, heightMm: 190, cca: 800, terminalLayout: '- +', weightKg: 20.95, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 26, partNumber: '656A 24', warrantyMonths: W24, volts: 12, ahCapacity: 60, lengthMm: 278, widthMm: 175, heightMm: 175, cca: 500, terminalLayout: '+ -', weightKg: 18.3, color: 'BLK', holdDown: null, terminalSize: 'STD' },
  { sheetRow: 27, partNumber: '657A 24', warrantyMonths: W24, volts: 12, ahCapacity: 66, lengthMm: 278, widthMm: 175, heightMm: 190, cca: 620, terminalLayout: '+ -', weightKg: 16.6, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 28, partNumber: '658A 24', warrantyMonths: W24, volts: 12, ahCapacity: 100, lengthMm: 354, widthMm: 175, heightMm: 190, cca: 880, terminalLayout: '- +', weightKg: 22.5, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 29, partNumber: '658A AGM 24', warrantyMonths: W24, volts: 12, ahCapacity: 95, lengthMm: 354, widthMm: 175, heightMm: 190, cca: 900, terminalLayout: '- +', weightKg: 26.9, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 30, partNumber: '659A 24', warrantyMonths: W24, volts: 12, ahCapacity: 95, lengthMm: 354, widthMm: 175, heightMm: 190, cca: 860, terminalLayout: '+ -', weightKg: 22, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  {
    sheetRow: 31, partNumber: '668A 24', warrantyMonths: W24, volts: 12, ahCapacity: 80, lengthMm: 315, widthMm: 355, heightMm: 175, cca: 760, terminalLayout: '- +', weightKg: 18.8, color: 'BLK', holdDown: 'F', terminalSize: 'STD',
    datasheetNotes: ['Sheet prints width 355 mm and height 175 mm. The 668A AGM 24 twin is 175 mm wide and 188 mm high, so this looks like a typo. Confirm with Unitech.'],
  },
  { sheetRow: 32, partNumber: '668A AGM 24', warrantyMonths: W24, volts: 12, ahCapacity: 80, lengthMm: 315, widthMm: 175, heightMm: 188, cca: 885, terminalLayout: '- +', weightKg: 23.65, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },
  { sheetRow: 33, partNumber: '669A 24', warrantyMonths: W24, volts: 12, ahCapacity: 80, lengthMm: 312, widthMm: 175, heightMm: 188, cca: 740, terminalLayout: '+ -', weightKg: 19.4, color: 'BLK', holdDown: 'F', terminalSize: 'STD' },

  { sheetRow: 1, partNumber: '674SAB', warrantyMonths: W18, volts: 12, ahCapacity: 105, lengthMm: 330, widthMm: 170, heightMm: 240, cca: 720, terminalLayout: '- +', weightKg: 22.3, color: 'BLK', holdDown: null, terminalSize: 'STD' },
  { sheetRow: 2, partNumber: '674SAD', warrantyMonths: W18, volts: 12, ahCapacity: 105, lengthMm: 330, widthMm: 170, heightMm: 240, cca: 720, terminalLayout: '- +', weightKg: 22.5, color: 'BLK', holdDown: null, terminalSize: 'STD' },
  { sheetRow: 3, partNumber: '674SAS', warrantyMonths: W18, volts: 12, ahCapacity: 105, lengthMm: 330, widthMm: 170, heightMm: 240, cca: 740, terminalLayout: '- +', weightKg: 22.7, color: 'BLK', holdDown: null, terminalSize: 'SML' },
  { sheetRow: 4, partNumber: '682AB', warrantyMonths: W18, volts: 12, ahCapacity: 120, lengthMm: 480, widthMm: 175, heightMm: 233, cca: 900, terminalLayout: '- +', weightKg: 30.5, color: 'BLK', holdDown: null, terminalSize: 'SML' },
  { sheetRow: 5, partNumber: '683AB', warrantyMonths: W18, volts: 12, ahCapacity: 120, lengthMm: 480, widthMm: 175, heightMm: 233, cca: 900, terminalLayout: '+ -', weightKg: 30.5, color: 'BLK', holdDown: null, terminalSize: 'SML' },
  { sheetRow: 6, partNumber: '688AB', warrantyMonths: W18, volts: 12, ahCapacity: 200, lengthMm: 500, widthMm: 255, heightMm: 245, cca: 1180, terminalLayout: '+ -', weightKg: 46.2, color: 'BLK', holdDown: null, terminalSize: 'SML' },
  { sheetRow: 7, partNumber: '689AB', warrantyMonths: W18, volts: 12, ahCapacity: 150, lengthMm: 485, widthMm: 218, heightMm: 235, cca: 1060, terminalLayout: '+ -', weightKg: 37.2, color: 'BLK', holdDown: null, terminalSize: 'STD' },
  { sheetRow: 8, partNumber: '695AB', warrantyMonths: W18, volts: 12, ahCapacity: 225, lengthMm: 509, widthMm: 264, heightMm: 217, cca: 1470, terminalLayout: '+ -', weightKg: 46.1, color: 'BLK', holdDown: null, terminalSize: 'STD' },
  { sheetRow: 9, partNumber: '696AB', warrantyMonths: W18, volts: 12, ahCapacity: 180, lengthMm: 480, widthMm: 218, heightMm: 236, cca: 1140, terminalLayout: '+ -', weightKg: 38.6, color: 'BLK', holdDown: null, terminalSize: 'STD' },
];

export function findDatasheetRow(partNumber: string, terminalSize?: 'STD' | 'SML'): UnitechDatasheetRow | undefined {
  return UNITECH_DATASHEET.find(
    (row) => row.partNumber === partNumber && (terminalSize === undefined || row.terminalSize === terminalSize)
  );
}
