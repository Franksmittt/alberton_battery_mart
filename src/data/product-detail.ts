// src/data/product-detail.ts
import { BASE_URL } from "@/lib/seo-constants";

export type ProductSpec = {
  id: string;
  slug: string;
  brand: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  chemistry: "Flooded" | "EFB" | "AGM" | "Gel" | "LiFePO4";
  category:
    | "Passenger"
    | "Bakkie"
    | "Truck"
    | "Motorcycle"
    | "Leisure"
    | "Commercial"
    | "SUV";
  ah: number;
  cca: number;
  reserveMinutes?: number;
  warrantyMonths: number;
  dimensions?: string;
  fitmentNotes: string[];
  idealVehicles: string[];
  comparisonTargets: { label: string; slug: string }[];
  highlights: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  keywords: string[];
  heroImage?: string;
  vehicleLinks?: { label: string; slug: string }[];
  serviceLinks?: { label: string; href: string }[];
};

export const PRODUCT_DETAIL: ProductSpec[] = [
  {
    id: "willard-652",
    slug: "willard-652",
    brand: "Willard",
    title: "Willard 652 Battery (12V 70Ah 590CCA)",
    subtitle: "Hilux, Ranger, Fortuner, Amarok Fitment",
    description:
      "Flagship 70Ah flooded battery engineered for South African diesel bakkies. OEM-approved for Toyota Hilux, Ford Ranger, VW Amarok, and Isuzu bakkies with high electrical loads.",
    price: "R 2 150",
    chemistry: "Flooded",
    category: "Bakkie",
    ah: 70,
    cca: 590,
    reserveMinutes: 110,
    warrantyMonths: 25,
    dimensions: "278 x 175 x 190 mm (Left Positive)",
    fitmentNotes: [
      "Left positive terminal; ensure OE cabling is not flipped",
      "Compatible with larger alternators; confirm battery bracket clamp",
      "Ideal upgrade when auxiliary lights, winches, or fridges are installed",
    ],
    idealVehicles: [
      "Toyota Hilux 3.0 D-4D / 2.8 GD-6",
      "Ford Ranger 2.2 / 3.2 TDCi",
      "VW Amarok BiTDI",
      "Isuzu KB / D-Max 3.0",
      "Toyota Fortuner 3.0 D-4D",
    ],
    comparisonTargets: [
      { label: "Willard 646 (55Ah)", slug: "willard-646" },
      { label: "Exide 652C EFB", slug: "exide-652c" },
      { label: "Willard 658 (90Ah)", slug: "willard-658" },
    ],
    highlights: [
      {
        title: "Built for Diesel Cranking",
        description:
          "590 CCA output ensures fast crank speeds for high-compression diesel engines even during winter cold starts.",
      },
      {
        title: "25-Month National Warranty",
        description:
          "Backed by AutoX with national support. We register every battery with Willard before you leave, preserving warranty coverage.",
      },
      {
        title: "Deep Reserve Capacity",
        description:
          "110 minutes of reserve (RC) sustains in-car electronics, dual-battery systems, and off-road accessories without voltage sag.",
      },
    ],
    faqs: [
      {
        question: "Can this battery handle winches and fridges?",
        answer:
          "Yes. The 652 is the most popular heavy-duty flooded option for overlanding setups. For extreme dual-battery systems consider pairing it with a deep-cycle auxiliary battery.",
      },
      {
        question: "Is it Start/Stop compatible?",
        answer:
          "No. Start/Stop vehicles require EFB or AGM technology. For Ranger 2.0 Bi-Turbo or modern Hilux with Start/Stop, use an EFB like Exide 668P.",
      },
      {
        question: "Do you buy the old battery?",
        answer:
          "Yes. Bring your old battery for recycling and we provide an instant trade-in rebate.",
      },
    ],
    keywords: [
      "Willard 652 battery price",
      "Hilux battery replacement",
      "Ford Ranger battery 652",
      "Amarok battery upgrade",
      "Willard 652 specs",
    ],
    heroImage: `${BASE_URL}/images/willard-652-car-battery-alberton.jpg`,
    vehicleLinks: [
      { label: "Toyota Hilux battery guide", slug: "toyota/hilux-3-0-d4d" },
      { label: "Ford Ranger fitment", slug: "ford/ranger-2-2-tdci" },
      { label: "VW Amarok upgrade", slug: "volkswagen/amarok-btdi" },
    ],
    serviceLinks: [
      { label: "Mobile Battery Replacement", href: "/services/mobile-battery-replacement/alberton" },
      { label: "Free Battery Testing", href: "/services/free-battery-testing/alberton" },
    ],
  },
  {
    id: "exide-668p",
    slug: "exide-668p",
    brand: "Exide",
    title: "Exide 668P EFB (12V 85Ah 715CCA)",
    subtitle: "Premium EFB for Start-Stop SUVs and 4x4s",
    description:
      "Enhanced Flooded Battery engineered for modern Start/Stop SUVs like Toyota Fortuner, Ford Everest, Audi Q5, and BMW X series. Delivers twice the cycle life of standard flooded batteries.",
    price: "R 3 450",
    chemistry: "EFB",
    category: "SUV",
    ah: 85,
    cca: 715,
    reserveMinutes: 150,
    warrantyMonths: 24,
    dimensions: "314 x 175 x 190 mm",
    fitmentNotes: [
      "Designed for Start/Stop vehicles that originally shipped with EFB batteries",
      "Can operate in engine bays above 70°C thanks to heat-resistant plate design",
      "Supports regenerative braking charge profiles",
    ],
    idealVehicles: [
      "Toyota Fortuner 3.0 D-4D / 2.8 GD-6",
      "Ford Everest & Ranger 2.0 Bi-Turbo",
      "BMW X3 (F25) / X5 (F15) Start/Stop",
      "Audi Q5 / Q7 TDI",
      "Mercedes-Benz GLC / ML-Class",
    ],
    comparisonTargets: [
      { label: "Willard 652 (Flooded)", slug: "willard-652" },
      { label: "Willard 658 AGM", slug: "willard-658" },
    ],
    highlights: [
      {
        title: "EFB Technology",
        description:
          "Reinforced plates, polyester scrim, and carbon additives deliver up to 2x the cycle life of standard batteries—perfect for Start/Stop traffic.",
      },
      {
        title: "Heat-Optimized",
        description:
          "Built for South African climates; tested to outperform AGM batteries in high-heat environments.",
      },
      {
        title: "Start/Stop Ready",
        description:
          "Maintains charge acceptance required for regenerative braking and Start/Stop systems, preventing dashboard errors.",
      },
    ],
    faqs: [
      {
        question: "Can I replace an AGM battery with this EFB?",
        answer:
          "Only if your manufacturer allows it. Generally, you can downgrade from AGM to EFB only when the vehicle originally shipped with EFB. We’ll confirm during diagnostics.",
      },
      {
        question: "Does it need coding?",
        answer:
          "Fords, BMWs, Mercedes, and Audis require Battery Management System (BMS) registration after replacement. We include coding with every install.",
      },
      {
        question: "Is it suitable for winches?",
        answer:
          "Yes, but if you run demanding accessories plus Start/Stop, consider an AGM like Willard 658 for even higher cycling tolerance.",
      },
    ],
    keywords: [
      "Exide 668P price",
      "EFB battery Fortuner",
      "Start stop battery Alberton",
      "BMW battery coding Alberton",
    ],
    heroImage: `${BASE_URL}/images/exide-668p-battery.jpg`,
    vehicleLinks: [
      { label: "Fortuner Start/Stop battery", slug: "toyota/fortuner-2-8-gd6" },
      { label: "Mercedes C-Class fitment", slug: "mercedes/c-class-w205" },
      { label: "BMW F30 Start/Stop", slug: "bmw/3-series-f30" },
      { label: "Audi Q5 boot battery", slug: "audi/q5-tdi" },
    ],
    serviceLinks: [
      { label: "Premium Meyersdal Fitment", href: "/services/battery-fitment/meyersdal" },
      { label: "Mobile Coding Callout", href: "/services/mobile-battery-replacement/alberton" },
    ],
  },
  {
    id: "willard-658",
    slug: "willard-658",
    brand: "Willard",
    title: "Willard 658 Battery (12V 90Ah 630CCA)",
    subtitle: "Premium Upgrade for Diesel SUVs and 4x4s",
    description:
      "High-capacity battery for demanding diesel SUVs (Land Cruiser, Prado, Discovery, X5). Provides 90Ah reserve and 630CCA starting performance.",
    price: "R 3 050",
    chemistry: "Flooded",
    category: "SUV",
    ah: 90,
    cca: 630,
    reserveMinutes: 140,
    warrantyMonths: 25,
    dimensions: "306 x 175 x 225 mm",
    fitmentNotes: [
      "Taller case (225mm). Confirm bonnet clearance or fit spacer kit",
      "Ideal for dual-battery conversions or vehicles with fridges/inverters",
      "Left Positive configuration",
    ],
    idealVehicles: [
      "Toyota Land Cruiser 70/200 Series",
      "Land Rover Discovery 3 / 4",
      "Range Rover Sport",
      "BMW X5 (E53), X6",
      "Mercedes-Benz ML / GLE Class",
      "VW Touareg",
    ],
    comparisonTargets: [
      { label: "Willard 652", slug: "willard-652" },
      { label: "Exide 668P EFB", slug: "exide-668p" },
    ],
    highlights: [
      {
        title: "High Reserve Capacity",
        description:
          "Perfect for overland vehicles with dual fridges, inverters, or winches.",
      },
      {
        title: "Heavy-Duty Grid Design",
        description:
          "Thick plate construction resists vibration on corrugated roads.",
      },
      {
        title: "25-Month Warranty",
        description:
          "Backed by AutoX with national support; we register your warranty immediately.",
      },
    ],
    faqs: [
      {
        question: "Does it support dual-battery systems?",
        answer:
          "Yes. It’s commonly used as the main crank battery paired with a deep-cycle auxiliary battery.",
      },
      {
        question: "Is it Start/Stop safe?",
        answer:
          "No. For Start/Stop SUVs use Exide 668P (EFB) or Willard AGM options.",
      },
    ],
    keywords: [
      "Willard 658 battery price",
      "Land Cruiser battery Alberton",
      "Discovery 4 battery replacement",
    ],
    vehicleLinks: [
      { label: "Land Cruiser battery upgrade", slug: "land-rover/discovery-4" },
      { label: "Fortuner overland battery", slug: "toyota/fortuner-2-8-gd6" },
      { label: "Amarok high-output battery", slug: "volkswagen/amarok-btdi" },
    ],
    serviceLinks: [
      { label: "Truck & Fleet Fitment", href: "/services/truck-battery-fitment/alrode" },
      { label: "Mobile Battery Replacement", href: "/services/mobile-battery-replacement/alberton" },
    ],
  },
];

export function getProductDetail(slug: string) {
  return PRODUCT_DETAIL.find((product) => product.slug === slug);
}

export function getAllProductSlugs() {
  return PRODUCT_DETAIL.map((product) => product.slug);
}

