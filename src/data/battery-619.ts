import { getLocalAreaBySlug } from "@/data/local-areas";

export type Battery619Suburb = {
  slug: string;
  name: string;
  responseWindow: string;
  summary: string;
  roads: string[];
  landmarks: string[];
  vehicles: string[];
};

export const BATTERY_619_SPECS = {
  voltage: "12V",
  ahRange: "42–43Ah",
  ccaRange: "314–325 CCA",
  dimensions: "207 × 175 × 175 mm",
  weight: "11.3–11.5 kg",
  terminalLayout: "Standard automotive (positive left, negative right on most SA fitments)",
  technology: "Maintenance-free SMF (flooded)",
  warrantyWillard: "25 months",
  warrantyExide: "24 months",
};

export const BATTERY_619_VEHICLES = [
  "Toyota Tazz",
  "VW Polo Vivo",
  "Opel Corsa",
  "Suzuki Swift",
  "Ford Figo",
  "Hyundai i10 / i20 (selected models)",
];

export const BATTERY_619_HUB_FAQ = [
  {
    question: "What is a 619 car battery?",
    answer:
      "619 is one of South Africa's most common compact-car battery codes. It is a 12V maintenance-free battery typically around 42–43Ah with dimensions of roughly 207 × 175 × 175 mm, used on small hatchbacks and sedans such as Toyota Tazz, VW Polo Vivo, and Opel Corsa.",
  },
  {
    question: "619 battery price in Alberton?",
    answer:
      "At Alberton Battery Mart, Willard 619 and Exide 619CE start from R 1 450.00 with scrap exchange, free fitment, free alternator testing, and up to 25-month warranty on Willard.",
  },
  {
    question: "619 battery price Midas vs Alberton Battery Mart?",
    answer:
      "Midas and Goldwagen usually sell shelf-price batteries without mobile fitment or charging-system diagnostics. Our fitted price includes on-site testing, professional installation, warranty registration, and old-battery disposal.",
  },
  {
    question: "Do you stock 619 batteries near me in Alberton?",
    answer:
      "Yes. We keep Willard 619 and Exide 619CE in stock at 28 St Columb Rd, New Redruth, and dispatch mobile fitment to Brackenhurst, Meyersdal, Brackendowns, Verwoerdpark, Randhart, and surrounding suburbs.",
  },
  {
    question: "619 Exide vs Willard — which is better?",
    answer:
      "Both are correct OEM-size replacements. Willard 619 offers 43Ah and a 25-month warranty. Exide 619CE offers 42Ah with strong cold-start performance for Start/Stop-ready compact cars. We test your vehicle first and recommend the best match.",
  },
  {
    question: "Do you offer mobile 619 battery fitment?",
    answer:
      "Yes. Our mobile team covers Alberton with typical response in 45–60 minutes. We bring the correct 619 battery, test alternator and starter health, fit on-site, and register your warranty.",
  },
  {
    question: "619 battery trade-in discounts?",
    answer:
      "Our listed prices include scrap exchange. Bring your old battery and we handle core disposal as part of the replacement — no hidden environmental fees.",
  },
];

export const BATTERY_619_PRICE_ROWS = [
  {
    retailer: "Alberton Battery Mart (fitted)",
    willard619: "R 1 450.00",
    exide619ce: "R 1 450.00",
    notes: "Includes free fitment, alternator test, mobile call-out available",
  },
  {
    retailer: "Midas (battery only, shelf)",
    willard619: "R 1 200 – R 1 350",
    exide619ce: "R 1 250 – R 1 400",
    notes: "Battery only — fitment, testing, and warranty registration extra",
  },
  {
    retailer: "Goldwagen (battery only, shelf)",
    willard619: "R 1 180 – R 1 320",
    exide619ce: "R 1 220 – R 1 380",
    notes: "Shelf price varies by branch and promotions",
  },
  {
    retailer: "Makro / online retailers",
    willard619: "R 1 100 – R 1 300",
    exide619ce: "R 1 150 – R 1 350",
    notes: "No local mobile fitment or BMS coding support in Alberton",
  },
];

const suburbOverrides: Record<string, Omit<Battery619Suburb, "slug" | "name">> = {
  "new-redruth": {
    responseWindow: "30–45 minutes",
    summary:
      "Our storefront suburb. Fastest dispatch for 619 battery replacements with same-day stock from 28 St Columb Rd.",
    roads: ["St Columb Rd", "Voortrekker Rd", "Ring Road"],
    landmarks: ["Alberton Battery Mart storefront", "New Redruth business strip"],
    vehicles: ["VW Polo Vivo", "Toyota Tazz", "Suzuki Swift"],
  },
  meyersdal: {
    responseWindow: "40–55 minutes",
    summary:
      "Premium suburb with high Start/Stop and SUV mix. We stock 619 for compact cars and EFB/AGM for modern SUVs.",
    roads: ["Meyersdal Blvd", "Kliprivier Dr"],
    landmarks: ["Meyersdal Eco Estate", "Local office parks"],
    vehicles: ["VW Polo", "BMW 3-Series", "Toyota Corolla"],
  },
  "new-market": {
    responseWindow: "45–60 minutes",
    summary:
      "Dense Alberton corridor with strong commuter demand for affordable 619 replacements and fast mobile call-outs.",
    roads: ["Voortrekker Rd", "Du Plessis Rd"],
    landmarks: ["New Market area retail strip", "Alberton CBD access routes"],
    vehicles: ["Toyota Tazz", "Nissan NP200", "VW Polo Vivo"],
  },
};

function suburbFromLocal(slug: string, name: string): Battery619Suburb {
  const local = getLocalAreaBySlug(slug);
  const override = suburbOverrides[slug];
  if (override) {
    return { slug, name, ...override };
  }
  if (local) {
    return {
      slug,
      name: local.name,
      responseWindow: local.responseWindow,
      summary: local.areaSummary,
      roads: local.roads,
      landmarks: local.landmarks,
      vehicles: local.keyVehicles,
    };
  }
  return {
    slug,
    name,
    responseWindow: "45–60 minutes",
    summary: `Mobile 619 battery supply and fitment across ${name}, Alberton.`,
    roads: ["Voortrekker Rd"],
    landmarks: [`${name} residential area`],
    vehicles: BATTERY_619_VEHICLES.slice(0, 3),
  };
}

export const BATTERY_619_SUBURB_SLUGS = [
  "brackenhurst",
  "new-redruth",
  "verwoerdpark",
  "brackendowns",
  "meyersdal",
  "alberante",
  "new-market",
  "randhart",
] as const;

export function getAllBattery619Suburbs(): Battery619Suburb[] {
  const names: Record<string, string> = {
    brackenhurst: "Brackenhurst",
    "new-redruth": "New Redruth",
    verwoerdpark: "Verwoerdpark",
    brackendowns: "Brackendowns",
    meyersdal: "Meyersdal",
    alberante: "Alberante",
    "new-market": "New Market",
    randhart: "Randhart",
  };
  return BATTERY_619_SUBURB_SLUGS.map((slug) =>
    suburbFromLocal(slug, names[slug] || slug)
  );
}

export function getBattery619Suburb(slug: string) {
  return getAllBattery619Suburbs().find((area) => area.slug === slug);
}

export function getBattery619SuburbFaqs(suburb: Battery619Suburb) {
  return [
    {
      question: `619 car battery price in ${suburb.name}?`,
      answer: `Willard 619 and Exide 619CE start from R 1 450.00 fitted with scrap exchange at Alberton Battery Mart. Mobile fitment to ${suburb.name} is available with typical response in ${suburb.responseWindow}.`,
    },
    {
      question: `Do you deliver and fit 619 batteries in ${suburb.name}?`,
      answer: `Yes. We dispatch a mobile technician to ${suburb.name} with the correct 619 battery, perform free alternator testing, and complete professional fitment on-site.`,
    },
    {
      question: `Cheapest 619 battery near ${suburb.name}?`,
      answer:
        "Shelf-price batteries can look cheaper but often exclude fitment, diagnostics, and warranty registration. Our fitted price includes testing, installation, and up to 25-month warranty on Willard 619.",
    },
    {
      question: `Which cars in ${suburb.name} use a 619 battery?`,
      answer: `Common ${suburb.name} vehicles on 619 include ${suburb.vehicles.join(", ")}. We confirm fitment before replacement.`,
    },
  ];
}
