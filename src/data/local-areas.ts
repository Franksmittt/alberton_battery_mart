export type LocalArea = {
  slug: string;
  name: string;
  areaSummary: string;
  responseWindow: string;
  roads: string[];
  landmarks: string[];
  keyVehicles: string[];
  focusKeywords: string[];
  nearbySlugs?: string[];
  faq: {
    question: string;
    answer: string;
  }[];
};

export const LOCAL_AREAS: LocalArea[] = [
  {
    slug: "brackenhurst",
    name: "Brackenhurst",
    areaSummary:
      "Family-focused suburb with high commuter demand and frequent early-morning no-start issues.",
    responseWindow: "45-60 minutes",
    roads: ["Hennie Alberts Street", "Swartkoppies Road"],
    landmarks: ["Bracken City Shopping Centre", "Brackenhurst Primary zone"],
    keyVehicles: ["Toyota Fortuner", "VW Tiguan", "Ford Ranger"],
    focusKeywords: [
      "battery replacement Brackenhurst",
      "mobile battery fitment Brackenhurst",
      "car battery near me Brackenhurst",
    ],
    nearbySlugs: ["brackendowns", "randhart", "alberante"],
    faq: [
      {
        question: "Do you service homes in Brackenhurst?",
        answer:
          "Yes, we do driveway and office callouts across Brackenhurst with battery testing and fitment on-site.",
      },
      {
        question: "Can you help if my SUV battery dies at home?",
        answer:
          "Yes. We carry SUV-friendly battery sizes and can test your alternator before final replacement.",
      },
    ],
  },
  {
    slug: "brackendowns",
    name: "Brackendowns",
    areaSummary:
      "Dense residential suburb with high daily school-run and work-commute battery demand.",
    responseWindow: "45-60 minutes",
    roads: ["Kritzinger Road", "Delphinium Street"],
    landmarks: ["Brackendowns Shopping Centre", "Local school corridor"],
    keyVehicles: ["VW Polo Vivo", "Suzuki Swift", "Toyota Starlet"],
    focusKeywords: [
      "battery replacement Brackendowns",
      "car battery Brackendowns",
      "jump start Brackendowns",
    ],
    nearbySlugs: ["brackenhurst", "mayberry-park", "randhart"],
    faq: [
      {
        question: "Do you cover Brackendowns after school pickup times?",
        answer:
          "Yes, during operating hours we prioritize urgent no-start situations in Brackendowns.",
      },
      {
        question: "Can you replace a battery without towing my car?",
        answer:
          "Yes. Our mobile unit does complete fitment at your location including system checks.",
      },
    ],
  },
  {
    slug: "randhart",
    name: "Randhart",
    areaSummary:
      "Busy mixed-use suburb with strong demand for fast response near major Alberton routes.",
    responseWindow: "40-55 minutes",
    roads: ["Michelle Avenue", "Voortrekker Road"],
    landmarks: ["Randhart shopping strip", "Alberton CBD edge"],
    keyVehicles: ["Toyota Corolla", "Nissan NP200", "Hyundai i20"],
    focusKeywords: [
      "battery fitment Randhart",
      "mobile car battery Randhart",
      "battery replacement near Randhart",
    ],
    nearbySlugs: ["florentia", "raceview", "brackenhurst"],
    faq: [
      {
        question: "Can I get same-day battery fitment in Randhart?",
        answer:
          "In most cases yes, especially for common battery sizes for commuter vehicles.",
      },
      {
        question: "Do you test alternators in Randhart callouts?",
        answer:
          "Yes. We include alternator and charging checks on every replacement callout.",
      },
    ],
  },
  {
    slug: "verwoerdpark",
    name: "Verwoerdpark",
    areaSummary:
      "High-traffic commuter area near key highway links, ideal for emergency mobile support.",
    responseWindow: "45-60 minutes",
    roads: ["Hennie Alberts Street", "N17 access routes"],
    landmarks: ["Verwoerdpark retail nodes", "N17 commuter ramps"],
    keyVehicles: ["Ford EcoSport", "Toyota Hilux", "Kia Picanto"],
    focusKeywords: [
      "car battery Verwoerdpark",
      "battery callout Verwoerdpark",
      "mobile battery replacement Verwoerdpark",
    ],
    nearbySlugs: ["south-crest", "randhart", "alberante"],
    faq: [
      {
        question: "Do you service Verwoerdpark highway breakdowns?",
        answer:
          "Yes, we support nearby roadside no-start cases where safe access is possible.",
      },
      {
        question: "Do you stock start-stop batteries for Verwoerdpark customers?",
        answer:
          "Yes. We stock EFB and AGM options and handle BMS registration where required.",
      },
    ],
  },
  {
    slug: "alrode",
    name: "Alrode",
    areaSummary:
      "Industrial and fleet-heavy area where downtime costs are high and response speed matters.",
    responseWindow: "45-60 minutes",
    roads: ["Potgieter Road", "Bosworth Street"],
    landmarks: ["Alrode industrial depots", "R59 freight corridor"],
    keyVehicles: ["Isuzu trucks", "Hino trucks", "Fleet bakkies"],
    focusKeywords: [
      "truck battery Alrode",
      "fleet battery replacement Alrode",
      "commercial battery fitment Alrode",
    ],
    nearbySlugs: ["mayberry-park", "eden-park", "verwoerdpark"],
    faq: [
      {
        question: "Can you support truck and fleet batteries in Alrode?",
        answer:
          "Yes. We provide heavy-duty battery supply and scheduled fleet service in Alrode.",
      },
      {
        question: "Do you issue documentation for fleet maintenance?",
        answer:
          "Yes. We provide records for battery fitment, testing, and replacement cycles.",
      },
    ],
  },
  {
    slug: "alberante",
    name: "Alberante",
    areaSummary:
      "Affluent residential pocket where premium vehicle battery fitment and diagnostics are in high demand.",
    responseWindow: "40-55 minutes",
    roads: ["Michelle Avenue", "St Columb Road"],
    landmarks: ["Reading Country Club area", "Alberante security estates"],
    keyVehicles: ["BMW 3 Series", "Mercedes C-Class", "Audi Q5"],
    focusKeywords: [
      "battery replacement Alberante",
      "AGM battery Alberante",
      "mobile battery fitment Alberante",
    ],
    nearbySlugs: ["randhart", "verwoerdpark", "brackenhurst"],
    faq: [
      {
        question: "Do you support AGM battery replacements in Alberante?",
        answer:
          "Yes. We supply and fit AGM and EFB batteries with diagnostic checks for modern premium vehicles.",
      },
      {
        question: "Can you do on-site battery testing in gated estates?",
        answer:
          "Yes. We regularly service estate homes and office addresses in Alberante.",
      },
    ],
  },
  {
    slug: "florentia",
    name: "Florentia",
    areaSummary:
      "Established suburb near Alberton CBD with steady commuter and family vehicle battery demand.",
    responseWindow: "45-60 minutes",
    roads: ["Helston Street", "Voortrekker Road"],
    landmarks: ["Florentia shopping strip", "CBD access routes"],
    keyVehicles: ["Toyota Corolla", "VW Polo Vivo", "Nissan Almera"],
    focusKeywords: [
      "car battery Florentia",
      "battery replacement Florentia",
      "mobile battery Florentia",
    ],
    nearbySlugs: ["raceview", "randhart", "general-alberts-park"],
    faq: [
      {
        question: "How quickly can you reach Florentia?",
        answer:
          "Typical response is 45-60 minutes depending on traffic and current dispatch load.",
      },
      {
        question: "Do you fit batteries at office parking lots?",
        answer:
          "Yes. We perform full on-site fitment and testing at homes and business addresses.",
      },
    ],
  },
  {
    slug: "raceview",
    name: "Raceview",
    areaSummary:
      "Residential suburb close to Alberton center where fast no-start response is critical for daily commuting.",
    responseWindow: "40-55 minutes",
    roads: ["Phantom Street", "Voortrekker Road"],
    landmarks: ["Raceview local retail nodes", "Alberton CBD fringe"],
    keyVehicles: ["Suzuki Swift", "Hyundai i10", "Toyota Starlet"],
    focusKeywords: [
      "battery replacement Raceview",
      "mobile battery Raceview",
      "jump start Raceview",
    ],
    nearbySlugs: ["florentia", "general-alberts-park", "randhart"],
    faq: [
      {
        question: "Can you help if my car won’t start in Raceview?",
        answer:
          "Yes. We provide jump-start and full replacement service in Raceview with on-site diagnostics.",
      },
      {
        question: "Do you stock budget-friendly battery options?",
        answer:
          "Yes. We stock multiple battery tiers and confirm the right option for your vehicle and usage.",
      },
    ],
  },
  {
    slug: "south-crest",
    name: "South Crest",
    areaSummary:
      "High-mobility suburb near major routes with recurring emergency battery callout intent.",
    responseWindow: "45-60 minutes",
    roads: ["N17 access roads", "Hennie Alberts Street"],
    landmarks: ["South Crest residential cluster", "Highway feeder roads"],
    keyVehicles: ["Ford EcoSport", "Toyota Hilux", "Kia Rio"],
    focusKeywords: [
      "battery replacement South Crest",
      "car battery South Crest",
      "mobile battery service South Crest",
    ],
    nearbySlugs: ["verwoerdpark", "randhart", "raceview"],
    faq: [
      {
        question: "Do you service South Crest roadside emergencies?",
        answer:
          "Yes, where safe roadside access is available we provide emergency support and replacement.",
      },
      {
        question: "Can I send my location on WhatsApp for dispatch?",
        answer:
          "Yes. Sharing your live pin helps us route the closest technician faster.",
      },
    ],
  },
  {
    slug: "mayberry-park",
    name: "Mayberry Park",
    areaSummary:
      "Residential commuter area with mixed passenger and light commercial battery demand.",
    responseWindow: "45-60 minutes",
    roads: ["Johan Meyer Street", "Kritzinger Road"],
    landmarks: ["Mayberry Park schools", "Alrode-adjacent routes"],
    keyVehicles: ["Toyota Avanza", "Nissan NP200", "VW Polo"],
    focusKeywords: [
      "battery replacement Mayberry Park",
      "mobile battery Mayberry Park",
      "car battery fitment Mayberry Park",
    ],
    nearbySlugs: ["alrode", "eden-park", "brackendowns"],
    faq: [
      {
        question: "Do you cover Mayberry Park homes and complexes?",
        answer:
          "Yes. We provide mobile callouts across Mayberry Park for homes, complexes, and offices.",
      },
      {
        question: "Do you also service small business vehicles?",
        answer:
          "Yes. We support light commercial bakkies and delivery vehicles in the area.",
      },
    ],
  },
  {
    slug: "general-alberts-park",
    name: "General Alberts Park",
    areaSummary:
      "Compact suburb where fast dispatch and accurate diagnostics drive high conversion rates.",
    responseWindow: "40-55 minutes",
    roads: ["Combrinck Street", "Heidelberg Road links"],
    landmarks: ["General Alberts Park residential grid", "Nearby commuter routes"],
    keyVehicles: ["Renault Kwid", "Toyota Etios", "Hyundai i20"],
    focusKeywords: [
      "battery replacement General Alberts Park",
      "car battery General Alberts Park",
      "mobile fitment General Alberts Park",
    ],
    nearbySlugs: ["florentia", "raceview", "randhart"],
    faq: [
      {
        question: "Can you replace my battery at home in General Alberts Park?",
        answer:
          "Yes. We handle full battery replacement and checks at your address.",
      },
      {
        question: "Do you provide warranty documentation after fitment?",
        answer:
          "Yes. All qualifying replacements include proper warranty paperwork.",
      },
    ],
  },
  {
    slug: "eden-park",
    name: "Eden Park",
    areaSummary:
      "High-density suburb with strong demand for practical, value-focused battery solutions.",
    responseWindow: "50-70 minutes",
    roads: ["Eden Park arterial roads", "R554 feeder links"],
    landmarks: ["Eden Park retail corridor", "Community transport routes"],
    keyVehicles: ["Toyota Tazz", "VW Polo Classic", "Nissan Sentra"],
    focusKeywords: [
      "battery replacement Eden Park",
      "budget car battery Eden Park",
      "mobile battery Eden Park",
    ],
    nearbySlugs: ["mayberry-park", "raceview", "florentia"],
    faq: [
      {
        question: "Do you offer budget battery options in Eden Park?",
        answer:
          "Yes. We offer practical battery options matched to your vehicle and budget.",
      },
      {
        question: "How do I know if my alternator is the real issue?",
        answer:
          "We run charging-system checks to confirm whether the battery or alternator is causing the failure.",
      },
    ],
  },
];

export function getAllLocalAreas() {
  return LOCAL_AREAS;
}

export function getLocalAreaBySlug(slug: string) {
  return LOCAL_AREAS.find((area) => area.slug === slug);
}

export function getNearbyLocalAreas(slug: string) {
  const current = getLocalAreaBySlug(slug);
  if (!current?.nearbySlugs?.length) return [];
  return current.nearbySlugs
    .map((nearbySlug) => getLocalAreaBySlug(nearbySlug))
    .filter((area): area is LocalArea => Boolean(area));
}
