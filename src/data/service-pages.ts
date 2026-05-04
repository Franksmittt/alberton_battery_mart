// src/data/service-pages.ts
import { BASE_URL, SERVICE_AREAS } from "@/lib/seo-constants";

export type ServiceCTA = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ServiceStat = {
  title: string;
  description: string;
};

export type ServicePageContent = {
  serviceSlug: string;
  areaSlug: string;
  title: string;
  description: string;
  heroEyebrow?: string;
  ogImage?: string;
  keywords: string[];
  intro: string;
  coverage: string[];
  benefits: ServiceStat[];
  process: ServiceStat[];
  faqs: ServiceFAQ[];
  ctas: ServiceCTA[];
  schema?: {
    serviceType: string;
    offers: string;
    serviceAreas?: string[];
  };
  relatedVehicles?: { label: string; slug: string }[];
  relatedProducts?: { label: string; slug: string }[];
};

const SERVICES: ServicePageContent[] = [
  {
    serviceSlug: "free-battery-testing",
    areaSlug: "alberton",
    heroEyebrow: "Diagnostic Excellence",
    title: "Free Car Battery Testing in Alberton",
    description:
      "Certified technicians delivering free battery, starter, and alternator diagnostics in Alberton, New Redruth, and Meyersdal.",
    ogImage: `${BASE_URL}/images/og-image.jpg`,
    keywords: [
      "free battery testing Alberton",
      "battery diagnostics Alberton",
      "free alternator test Alberton",
      "battery load test Alberton",
      "car battery test near me",
    ],
    intro:
      "Every service starts with accurate diagnostics. Our Alberton testing station delivers digital load tests, starter draw analysis, and alternator checks so you never replace a battery blindly.",
    coverage: [
      "In-store diagnostics: New Redruth HQ (same-day results)",
      "Mobile testing window: Alberton Central, Meyersdal, Brackenhurst",
      "Available for passenger cars, SUVs, bakkies, trucks, motorcycles, and leisure batteries",
    ],
    benefits: [
      {
        title: "Digital Load Testing",
        description:
          "Midtronics-grade testers simulate cold cranking amps to surface hidden failures that a multimeter cannot detect.",
      },
      {
        title: "Starter & Alternator Health",
        description:
          "Voltage-drop analysis confirms whether slow cranks are caused by a weak starter or a failing alternator.",
      },
      {
        title: "Warranty-Grade Reports",
        description:
          "We document every test so you can process manufacturer warranty claims without friction.",
      },
    ],
    process: [
      {
        title: "01 / Intake Interview",
        description:
          "We capture the vehicle symptoms, usage patterns, and any recent jump-start history",
      },
      {
        title: "02 / Multi-point Testing",
        description:
          "Battery resting voltage, CCA simulation, alternator ripple test, and starter draw",
      },
      {
        title: "03 / Action Plan",
        description:
          "You leave with a go/no-go verdict, recommended replacement options, or alternator repair referrals",
      },
    ],
    faqs: [
      {
        question: "How long does the free test take?",
        answer:
          "Most diagnostics are complete within 10 minutes. Complex start/stop vehicles may take up to 20 minutes so we can perform full BMS checks.",
      },
      {
        question: "Do I need to book?",
        answer:
          "Walk-ins are welcome at our New Redruth shop. For mobile testing or fleet diagnostics, call 010 109 6211 so we can allocate a slot.",
      },
      {
        question: "Does the test cover the alternator?",
        answer:
          "Yes. We verify charge voltage, ripple, and voltage drop under load. If your alternator is weak, we’ll share the report so your mechanic can act quickly.",
      },
    ],
    ctas: [
      {
        label: "Call to Book a Diagnostic",
        href: "tel:0101096211",
      },
      {
        label: "WhatsApp the Workshop",
        href: "https://wa.me/27823046926",
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: "Battery Testing Service",
      offers: "Free battery, starter, and alternator diagnostics",
      serviceAreas: SERVICE_AREAS,
    },
    relatedVehicles: [
      { label: "Toyota Hilux battery test", slug: "toyota/hilux-3-0-d4d" },
      { label: "Ford Ranger diagnostics", slug: "ford/ranger-2-2-tdci" },
      { label: "BMW F30 battery check", slug: "bmw/3-series-f30" },
    ],
    relatedProducts: [
      { label: "Willard 652", slug: "willard-652" },
      { label: "Exide 668P", slug: "exide-668p" },
    ],
  },
  {
    serviceSlug: "mobile-battery-replacement",
    areaSlug: "alberton",
    heroEyebrow: "On-Site Response",
    title: "Mobile Battery Replacement & Callout in Alberton",
    description:
      "Certified mobile fitment for cars, SUVs, 4x4s, and trucks across Alberton, Meyersdal, and Brackenhurst. Free fitment, coding, and alternator checks at your driveway.",
    keywords: [
      "mobile battery replacement Alberton",
      "battery callout Alberton",
      "mobile battery Meyersdal",
      "emergency battery replacement Alberton",
      "battery delivery Alberton",
    ],
    intro:
      "When your vehicle is dead at the office or at home, we dispatch a fully equipped fitment specialist with the correct battery, diagnostic tools, and payment terminals. Avoid towing fees and workshop downtime—everything happens at your location.",
    coverage: [
      "Callout guarantee: Alberton Central, Meyersdal, New Redruth, Brackenhurst, Randhart, and South Crest",
      "Mobile window: Mon–Fri 08:00–17:00, Saturdays 08:00–12:00",
      "All power formats: standard flooded, EFB, AGM, LiFePO₄ leisure, and truck batteries",
    ],
    benefits: [
      {
        title: "Exact Battery Ready to Fit",
        description:
          "We pre-qualify your VIN and battery code so we arrive with the correct spec—no generic swaps or cable mods.",
      },
      {
        title: "BMS Coding & Reset",
        description:
          "Start/Stop vehicles (BMW, Mercedes, Audi, Ford) require battery registration—we include coding so the alternator charges correctly.",
      },
      {
        title: "Alternator + Starter Diagnostics",
        description:
          "Post-install testing confirms your electrical system is healthy. If not, you leave with a full report to take to your mechanic.",
      },
    ],
    process: [
      {
        title: "01 / Intake & Verification",
        description:
          "Call us with your vehicle details; we confirm battery code, CCA requirements, and payment method.",
      },
      {
        title: "02 / Dispatch & On-Site Fitment",
        description:
          "Technician arrives with the battery, portable lifts, torque tools, memory savers, and POS terminal.",
      },
      {
        title: "03 / Final Diagnostics & Payment",
        description:
          "Load test + alternator check + coding (if needed), followed by onsite card payment and warranty registration.",
      },
    ],
    faqs: [
      {
        question: "Is there a callout fee?",
        answer:
          "Within 10km of New Redruth the callout is free with battery purchase. For outer Alberton suburbs a small R150 travel fee may apply—confirmed during booking.",
      },
      {
        question: "Do you work after hours?",
        answer:
          "Our official hours mirror the workshop (Mon–Fri 08:00–17:00, Sat 08:00–12:00). For urgent after-hours cases we do our best to assist—call us and we’ll confirm availability.",
      },
      {
        question: "What vehicles do you support?",
        answer:
          "Passenger cars, SUVs, 4x4s, bakkies, delivery vans, and light trucks. For heavy fleet batteries we schedule dual-technician visits.",
      },
    ],
    ctas: [
      {
        label: "Call the Mobile Team",
        href: "tel:0101096211",
      },
      {
        label: "WhatsApp Your Pin Location",
        href: "https://wa.me/27823046926?text=Battery%20Callout%20Request",
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: "Mobile Battery Replacement Service",
      offers: "On-site battery delivery, fitment, alternator test, and BMS coding",
      serviceAreas: SERVICE_AREAS,
    },
    relatedVehicles: [
      { label: "Toyota Hilux mobile fitment", slug: "toyota/hilux-3-0-d4d" },
      { label: "VW Amarok callout", slug: "volkswagen/amarok-btdi" },
      { label: "Mercedes C-Class on-site replacement", slug: "mercedes/c-class-w205" },
    ],
    relatedProducts: [
      { label: "Willard 652", slug: "willard-652" },
      { label: "Willard 658", slug: "willard-658" },
      { label: "Exide 668P", slug: "exide-668p" },
    ],
  },
  {
    serviceSlug: "emergency-jump-start",
    areaSlug: "alberton",
    heroEyebrow: "Rapid Response",
    title: "Emergency Jump-Start & Power Rescue in Alberton",
    description:
      "Stranded with a dead battery? We provide rapid jump-starts, load tests, and optional replacement batteries anywhere in Alberton and Alrode.",
    keywords: [
      "emergency jump start Alberton",
      "24 hour battery help Alberton",
      "battery rescue Alberton",
      "car won’t start Alberton",
    ],
    intro:
      "Flat battery at the mall, office park, or industrial yard? Our jump-start unit dispatches within minutes, using surge-protected boosters and memory-saver tools so your vehicle electronics stay safe.",
    coverage: [
      "Rapid response hub: Alberton CBD, New Redruth, Brackenhurst, Alrode industrial belt",
      "Service window: 07:00–21:00 (extended hours vs. workshop)",
      "Fleet-safe: We support commercial fleets, logistics depots, and refrigerated trucks",
    ],
    benefits: [
      {
        title: "Safe Boost Procedure",
        description:
          "Surge-protected boosters + insulated clamps ensure sensitive ECUs, airbags, and infotainment systems remain protected.",
      },
      {
        title: "On-the-Spot Diagnostics",
        description:
          "Every jump-start includes a quick load test to confirm if the battery needs replacement or if another component failed.",
      },
      {
        title: "Replacement Ready",
        description:
          "If the battery fails the test, we can install a new one immediately—no second visit required.",
      },
    ],
    process: [
      {
        title: "01 / Dispatch",
        description:
          "Share your location via call or WhatsApp; our dispatcher routes the nearest technician.",
      },
      {
        title: "02 / Safety Setup",
        description:
          "We secure the vehicle, connect surge-protected boosters, and safely start the engine.",
      },
      {
        title: "03 / Diagnostics & Decision",
        description:
          "We test battery, alternator, and starter. If the battery is the culprit, we can replace it on site.",
      },
    ],
    faqs: [
      {
        question: "Can you help outside normal hours?",
        answer:
          "Yes. Our jump-start desk operates until 21:00 daily. After that we switch to standby support—call us and we’ll confirm availability.",
      },
      {
        question: "Do you help with trucks or forklifts?",
        answer:
          "Yes. We carry heavy-duty booster packs rated for trucks, forklifts, and industrial equipment. Please specify the voltage when booking.",
      },
      {
        question: "Will a jump-start damage my car?",
        answer:
          "Not when done professionally. We use surge-protected boosters and follow OEM procedures to protect modern electronics.",
      },
    ],
    ctas: [
      {
        label: "Call the Emergency Line",
        href: "tel:0101096211",
      },
      {
        label: "Share Your Location on WhatsApp",
        href: "https://wa.me/27823046926?text=Emergency%20Jump%20Start",
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: "Emergency Jump Start",
      offers: "Rapid battery boost, diagnostics, and optional replacement",
      serviceAreas: ["Alberton", "New Redruth", "Alrode", "Brackenhurst"],
    },
    relatedVehicles: [
      { label: "VW Polo jump-start", slug: "volkswagen/polo-vivo" },
      { label: "Toyota Fortuner emergency help", slug: "toyota/fortuner-2-8-gd6" },
    ],
  },
  {
    serviceSlug: "truck-battery-fitment",
    areaSlug: "alrode",
    heroEyebrow: "Fleet & Logistics",
    title: "Truck & Fleet Battery Fitment in Alrode",
    description:
      "Heavy-duty battery supply, testing, and on-site fitment for Alrode’s logistics fleets, mining equipment, and industrial machinery.",
    keywords: [
      "truck battery Alrode",
      "fleet battery maintenance Alberton",
      "heavy duty battery suppliers",
      "Isuzu truck battery Alberton",
    ],
    intro:
      "Keep deliveries on schedule with proactive fleet battery maintenance. We carry 12V and 24V configurations (689C, 692C, 696C, 658C) and provide torque-correct fitment, dual-battery change-outs, and recycling certificates.",
    coverage: [
      "Industrial corridor: Alrode, Alrode South, Wadeville, Gosforth Park",
      "On-site support for depots, freight yards, cold-chain fleets, mining equipment",
      "Emergency response for breakdowns on the R59 / N12 corridors",
    ],
    benefits: [
      {
        title: "High-CCA Inventory",
        description:
          "Stock includes Exide 689C (132Ah), 696C (180Ah), Optima BlueTop, and AGM deep-cycle solutions for liftgates and auxiliary systems.",
      },
      {
        title: "Fleet Maintenance Plans",
        description:
          "Scheduled testing, battery rotation programs, and KPI reporting to reduce unplanned downtime.",
      },
      {
        title: "Environmental Compliance",
        description:
          "Scrap battery collection and certified recycling documentation for ISO audits.",
      },
    ],
    process: [
      {
        title: "01 / Fleet Assessment",
        description:
          "We audit current batteries, charging systems, and failure history to design a rotation schedule.",
      },
      {
        title: "02 / On-Site Fitment",
        description:
          "Dual-technician team performs safe swaps, torque checks, and voltage verification at your depot.",
      },
      {
        title: "03 / Reporting & Recycling",
        description:
          "You receive a digital report with test values, next due dates, and recycle certificates.",
      },
    ],
    faqs: [
      {
        question: "Do you handle 24V systems?",
        answer:
          "Yes. We service 12V, 24V, and multi-bank configurations for trucks, forklifts, reach stackers, and mining equipment.",
      },
      {
        question: "How fast can you respond to breakdowns?",
        answer:
          "For Alrode and Wadeville we offer priority dispatch. Most breakdowns are resolved within 60 minutes of booking.",
      },
      {
        question: "Can you integrate with our maintenance software?",
        answer:
          "We export CSV or PDF reports with odometer, battery serials, and install dates—easy to import into fleet systems.",
      },
    ],
    ctas: [
      {
        label: "Book a Fleet Assessment",
        href: "tel:0101096211",
      },
      {
        label: "Email Fleet Support",
        href: "mailto:info@albertonbatterymart.co.za?subject=Fleet%20Battery%20Support",
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: "Truck Battery Service",
      offers: "Heavy-duty battery supply, fitment, rotation, and recycling",
      serviceAreas: ["Alrode", "Alrode South", "Wadeville"],
    },
    relatedVehicles: [
      { label: "Land Rover Discovery fleet support", slug: "land-rover/discovery-4" },
      { label: "VW Amarok fleet battery", slug: "volkswagen/amarok-btdi" },
    ],
    relatedProducts: [
      { label: "Willard 658", slug: "willard-658" },
    ],
  },
  {
    serviceSlug: "battery-fitment",
    areaSlug: "meyersdal",
    heroEyebrow: "Premium Suburb Coverage",
    title: "Premium Battery Fitment in Meyersdal & Brackenhurst",
    description:
      "Tailored battery replacement for luxury SUVs, German sedans, and start-stop hybrids in Meyersdal Eco Estate, Brackenhurst, and Randhart.",
    keywords: [
      "battery fitment Meyersdal",
      "Mercedes battery coding Alberton",
      "BMW battery replacement Meyersdal",
      "Audi battery fitment Alberton",
    ],
    intro:
      "High-end vehicles need more than a quick swap. We stock OEM-spec AGM/EFB batteries (Willard, VARTA, Exide EFB) and include battery registration, IBS/BMS resets, and auxiliary battery replacements for Mercedes and Range Rover models.",
    coverage: [
      "On-site service for Meyersdal Ridge, Nature Estate, and Brackenhurst",
      "Workshop appointments at New Redruth with shuttle options",
      "Support for Mercedes (S/GLC/E), BMW (X5/X3/F30), Audi (Q5/Q7), Porsche, Jaguar, Range Rover",
    ],
    benefits: [
      {
        title: "AGM & EFB Specialists",
        description:
          "We match the battery chemistry your vehicle requires—no downgrades that void warranties.",
      },
      {
        title: "Auxiliary Battery Replacement",
        description:
          "Mercedes and Range Rover models often have secondary batteries; we test and replace both to clear dashboard errors.",
      },
      {
        title: "BMS/IBS Coding",
        description:
          "Our diagnostic suite handles battery registration, IBS resets, and clearing Start/Stop errors.",
      },
    ],
    process: [
      {
        title: "01 / VIN & Spec Verification",
        description:
          "We confirm your battery code, IBS requirements, and any auxiliary batteries before arrival.",
      },
      {
        title: "02 / Fitment & Coding",
        description:
          "Memory savers preserve your settings, new battery is installed, and BMS is coded to the new capacity.",
      },
      {
        title: "03 / Final Checks",
        description:
          "We clear fault codes, verify alternator status, and provide digital proof of coding for service history.",
      },
    ],
    faqs: [
      {
        question: "Do you really need to code a battery?",
        answer:
          "Yes—BMW, Mercedes, Audi, and modern Fords adjust charge profiles based on battery age. Without coding, the alternator overcharges the new battery and it fails prematurely.",
      },
      {
        question: "Can you work in basement garages?",
        answer:
          "Yes. Our equipment is portable and designed for estate/complex environments. Please arrange access with security ahead of time.",
      },
      {
        question: "Do you handle hybrid auxiliary batteries?",
        answer:
          "We stock auxiliary batteries for Mercedes S/CLS, Range Rover, and some Toyota/Lexus hybrids. If not in stock we can source within 24 hours.",
      },
    ],
    ctas: [
      {
        label: "Book Premium Fitment",
        href: "tel:0101096211",
      },
      {
        label: "Request a Callback",
        href: "mailto:info@albertonbatterymart.co.za?subject=Meyersdal%20Battery%20Fitment",
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: "Battery Fitment Service",
      offers: "On-site premium battery replacement with coding and diagnostics",
      serviceAreas: ["Meyersdal", "Brackenhurst", "Randhart"],
    },
    relatedVehicles: [
      { label: "Mercedes C-Class coding", slug: "mercedes/c-class-w205" },
      { label: "BMW F30 coding", slug: "bmw/3-series-f30" },
      { label: "Audi Q5 boot battery", slug: "audi/q5-tdi" },
    ],
    relatedProducts: [
      { label: "Exide 668P", slug: "exide-668p" },
      { label: "Willard 658", slug: "willard-658" },
    ],
  },
];

export function getServicePage(serviceSlug: string, areaSlug: string) {
  return SERVICES.find(
    (entry) =>
      entry.serviceSlug === serviceSlug && entry.areaSlug === areaSlug
  );
}

export function getAllServicePages() {
  return SERVICES;
}

