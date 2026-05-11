// src/data/service-pages.ts
import { BASE_URL, SERVICE_AREAS } from "@/lib/seo-constants";
import { getAllLocalAreas } from "@/data/local-areas";

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

const ALL_LOCAL_AREA_SLUGS = getAllLocalAreas().map((area) => area.slug);

const LOCAL_MOBILE_SERVICE_SLUGS = ALL_LOCAL_AREA_SLUGS;

const PRIORITY_SERVICE_AREA_SLUGS = ALL_LOCAL_AREA_SLUGS;

const HERO_SERVICE_AREAS = [
  {
    slug: "alberton-central",
    name: "Alberton Central",
    responseWindow: "30-45 minutes",
    roads: ["Voortrekker Road", "Ring Road West", "Alberton Boulevard"],
    landmarks: ["Alberton City", "Alberton CBD offices", "Civic Centre precinct"],
    focusKeywords: [
      "battery replacement Alberton Central",
      "mobile battery service Alberton City",
      "free battery testing Alberton CBD",
    ],
    keyVehicles: ["Toyota Corolla", "VW Polo Vivo", "Ford Ranger"],
  },
  {
    slug: "new-redruth",
    name: "New Redruth",
    responseWindow: "20-35 minutes",
    roads: ["St Columb Road", "Penzance Street", "Swartkoppies Road"],
    landmarks: ["28 St Columb Rd workshop", "New Redruth Village", "Alberton Netcare corridor"],
    focusKeywords: [
      "battery replacement New Redruth",
      "battery shop New Redruth",
      "free battery testing New Redruth",
    ],
    keyVehicles: ["Hyundai i20", "Toyota Hilux", "Nissan NP200"],
  },
  {
    slug: "meyersdal",
    name: "Meyersdal",
    responseWindow: "35-50 minutes",
    roads: ["Michelle Avenue", "Hennie Alberts Street", "Meyersdal Drive"],
    landmarks: ["Meyersdal Eco Estate", "Meyersdal Mall", "Virgin Active Meyersdal"],
    focusKeywords: [
      "battery replacement Meyersdal",
      "AGM battery fitment Meyersdal",
      "BMW battery coding Meyersdal",
    ],
    keyVehicles: ["BMW 3 Series", "Mercedes C-Class", "Audi Q5"],
  },
];

const generatedLocalMobileServicePages: ServicePageContent[] = getAllLocalAreas()
  .filter((area) => LOCAL_MOBILE_SERVICE_SLUGS.includes(area.slug))
  .map((area) => ({
    serviceSlug: "mobile-battery-replacement",
    areaSlug: area.slug,
    heroEyebrow: `Suburb Dispatch: ${area.name}`,
    title: `Mobile Battery Replacement in ${area.name}`,
    description: `On-site battery replacement, alternator checks, and dispatch support across ${area.name}. Typical response window: ${area.responseWindow}.`,
    keywords: [
      ...area.focusKeywords,
      `battery replacement ${area.name}`,
      `mobile battery ${area.name}`,
      `car battery near me ${area.name}`,
    ],
    intro: `Our mobile team covers ${area.name} with suburb-specific dispatch routing and on-site diagnostics. We confirm battery failure first, then fit the correct replacement to keep you moving.`,
    coverage: [
      `Typical response window in ${area.name}: ${area.responseWindow}`,
      `Frequent routes: ${area.roads.join(", ")}`,
      `Landmark zones serviced: ${area.landmarks.join(", ")}`,
    ],
    benefits: [
      {
        title: "Fast Local Dispatch",
        description:
          "Suburb-aware routing reduces wait time and helps us reach high-priority no-start incidents quickly.",
      },
      {
        title: "Diagnostics Before Replacement",
        description:
          "Every callout includes battery and charging-system checks to avoid unnecessary replacements.",
      },
      {
        title: "On-Site Fitment + Warranty",
        description:
          "We fit on location, verify charging health, and provide proper warranty documentation immediately.",
      },
    ],
    process: [
      {
        title: "01 / Booking",
        description:
          "Share your vehicle details and suburb location so we dispatch with the right battery spec.",
      },
      {
        title: "02 / Arrival & Testing",
        description:
          "Our technician runs a load test and charging-system check before final replacement.",
      },
      {
        title: "03 / Fitment & Handover",
        description:
          "Battery is fitted, terminals secured, system verified, and warranty details handed over.",
      },
    ],
    faqs: area.faq,
    ctas: [
      {
        label: `Call for ${area.name} Dispatch`,
        href: "tel:0101096211",
      },
      {
        label: "WhatsApp Your Location",
        href: `https://wa.me/27823046926?text=Hi,%20I%20need%20battery%20help%20in%20${encodeURIComponent(area.name)}.`,
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: `Mobile Battery Replacement ${area.name}`,
      offers: "On-site battery diagnostics and replacement fitment",
      serviceAreas: [area.name],
    },
    relatedVehicles: [
      { label: "Toyota Hilux battery support", slug: "toyota/hilux-3-0-d4d" },
      { label: "Ford Ranger battery support", slug: "ford/ranger-2-2-tdci" },
      { label: "VW Polo Vivo battery support", slug: "volkswagen/polo-vivo" },
    ],
    relatedProducts: [
      { label: "Willard 652", slug: "willard-652" },
      { label: "Exide 668P", slug: "exide-668p" },
    ],
  }));

const generatedLocalFreeTestingPages: ServicePageContent[] = getAllLocalAreas()
  .filter((area) => PRIORITY_SERVICE_AREA_SLUGS.includes(area.slug))
  .map((area) => ({
    serviceSlug: "free-battery-testing",
    areaSlug: area.slug,
    heroEyebrow: `Suburb Diagnostics: ${area.name}`,
    title: `Free Battery Testing in ${area.name}`,
    description: `Book a free battery, starter, and alternator test in ${area.name}. Typical response window: ${area.responseWindow}.`,
    keywords: [
      ...area.focusKeywords,
      `free battery testing ${area.name}`,
      `alternator test ${area.name}`,
      `battery diagnostics ${area.name}`,
    ],
    intro: `Before replacing any battery in ${area.name}, we run diagnostics first. Our technicians test battery health, starter draw, and alternator charging output so you only spend where necessary.`,
    coverage: [
      `Typical diagnostics response in ${area.name}: ${area.responseWindow}`,
      `High-demand routes covered: ${area.roads.join(", ")}`,
      `Nearby service landmarks: ${area.landmarks.join(", ")}`,
    ],
    benefits: [
      {
        title: "No-Guesswork Diagnosis",
        description:
          "Load testing confirms whether your no-start issue is the battery, alternator, or starter circuit.",
      },
      {
        title: "Report-Back Clarity",
        description:
          "You get a practical pass/fail result and clear replacement guidance for your exact vehicle.",
      },
      {
        title: "Suburb-Specific Dispatch",
        description:
          "We route technicians by suburb to keep diagnostics turnaround times short during peak demand.",
      },
    ],
    process: [
      {
        title: "01 / Symptom Intake",
        description:
          "We capture your no-start symptoms, battery age, and usage pattern before dispatch.",
      },
      {
        title: "02 / Multi-Point Testing",
        description:
          "Battery, alternator, and starter checks are performed with digital test equipment.",
      },
      {
        title: "03 / Next-Step Advice",
        description:
          "You receive a clear action plan: recharge, replace, or investigate charging-system faults.",
      },
    ],
    faqs: [
      ...area.faq,
      {
        question: `Can you do free battery testing at my address in ${area.name}?`,
        answer:
          `Yes. We provide on-site diagnostics in ${area.name} and can proceed with immediate replacement if the battery fails testing.`,
      },
    ],
    ctas: [
      {
        label: `Call for ${area.name} Diagnostics`,
        href: "tel:0101096211",
      },
      {
        label: "WhatsApp for a Test Slot",
        href: `https://wa.me/27823046926?text=Hi,%20I%20need%20a%20free%20battery%20test%20in%20${encodeURIComponent(area.name)}.`,
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: `Free Battery Testing ${area.name}`,
      offers: "Free battery, starter, and alternator diagnostics",
      serviceAreas: [area.name],
    },
    relatedVehicles: [
      { label: "Toyota Hilux battery diagnostics", slug: "toyota/hilux-3-0-d4d" },
      { label: "Ford Ranger alternator checks", slug: "ford/ranger-2-2-tdci" },
      { label: "VW Polo Vivo battery health", slug: "volkswagen/polo-vivo" },
    ],
    relatedProducts: [
      { label: "Willard 652", slug: "willard-652" },
      { label: "Exide 668P", slug: "exide-668p" },
    ],
  }));

const generatedLocalJumpStartPages: ServicePageContent[] = getAllLocalAreas()
  .filter((area) => PRIORITY_SERVICE_AREA_SLUGS.includes(area.slug))
  .map((area) => ({
    serviceSlug: "emergency-jump-start",
    areaSlug: area.slug,
    heroEyebrow: `Rapid Start Support: ${area.name}`,
    title: `Emergency Jump-Start in ${area.name}`,
    description: `Dead battery support in ${area.name} with safe jump-starts, diagnostics, and on-site replacement options.`,
    keywords: [
      ...area.focusKeywords,
      `jump-start ${area.name}`,
      `car won't start ${area.name}`,
      `emergency battery help ${area.name}`,
    ],
    intro: `If your vehicle will not start in ${area.name}, we dispatch with surge-protected equipment for a safe jump-start and immediate diagnostics. If the battery fails, we can replace it on-site.`,
    coverage: [
      `Typical emergency response in ${area.name}: ${area.responseWindow}`,
      `Primary access roads: ${area.roads.join(", ")}`,
      `Most requested zones: ${area.landmarks.join(", ")}`,
    ],
    benefits: [
      {
        title: "Safe Electronic Protection",
        description:
          "Surge-protected boosters reduce risk to ECUs and modern in-car electronics during jump-start procedures.",
      },
      {
        title: "Immediate Root-Cause Check",
        description:
          "We test battery and charging output right after startup to prevent repeated breakdowns.",
      },
      {
        title: "Replacement-Ready Response",
        description:
          "If the battery is beyond recovery, we can install a compatible unit immediately.",
      },
    ],
    process: [
      {
        title: "01 / Location Confirmation",
        description:
          "Share your exact pin so we dispatch the nearest technician quickly.",
      },
      {
        title: "02 / Safe Restart",
        description:
          "We perform a controlled jump-start using surge-protected equipment.",
      },
      {
        title: "03 / Diagnostic Decision",
        description:
          "Battery and alternator test results guide whether to monitor, recharge, or replace.",
      },
    ],
    faqs: [
      ...area.faq,
      {
        question: `Can you jump-start my vehicle in ${area.name} and replace the battery immediately?`,
        answer:
          `Yes. We provide jump-start support in ${area.name} and can fit a replacement battery on-site when diagnostics confirm battery failure.`,
      },
    ],
    ctas: [
      {
        label: `Call for ${area.name} Emergency Help`,
        href: "tel:0101096211",
      },
      {
        label: "Send Live Location on WhatsApp",
        href: `https://wa.me/27823046926?text=Emergency%20jump-start%20needed%20in%20${encodeURIComponent(area.name)}.`,
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: `Emergency Jump Start ${area.name}`,
      offers: "Rapid jump-start, diagnostics, and optional on-site replacement",
      serviceAreas: [area.name],
    },
    relatedVehicles: [
      { label: "Toyota Fortuner no-start support", slug: "toyota/fortuner-2-8-gd6" },
      { label: "VW Polo Vivo jump-start support", slug: "volkswagen/polo-vivo" },
      { label: "Ford Ranger emergency battery support", slug: "ford/ranger-2-2-tdci" },
    ],
    relatedProducts: [
      { label: "Willard 652", slug: "willard-652" },
      { label: "Willard 658", slug: "willard-658" },
    ],
  }));

const generatedHeroMobileServicePages: ServicePageContent[] = HERO_SERVICE_AREAS.map(
  (area) => ({
    serviceSlug: "mobile-battery-replacement",
    areaSlug: area.slug,
    heroEyebrow: `High-Intent Dispatch: ${area.name}`,
    title: `Mobile Battery Replacement in ${area.name}`,
    description: `On-site car battery replacement in ${area.name} with battery testing, alternator checks, and correct-fit Willard, Exide, Enertec, and AGM options. Typical response window: ${area.responseWindow}.`,
    keywords: [
      ...area.focusKeywords,
      `mobile battery replacement ${area.name}`,
      `car battery ${area.name}`,
      `battery callout ${area.name}`,
      ...area.keyVehicles.map((vehicle) => `${vehicle} battery ${area.name}`),
    ],
    intro: `Our mobile battery team covers ${area.name} with fast dispatch from the New Redruth workshop. We confirm the battery failure first, match the correct battery code, and fit on-site so you do not need a tow or risky repeat jump-start.`,
    coverage: [
      `Typical response window in ${area.name}: ${area.responseWindow}`,
      `Frequent routes covered: ${area.roads.join(", ")}`,
      `High-demand landmarks: ${area.landmarks.join(", ")}`,
      `Common vehicles supported: ${area.keyVehicles.join(", ")}`,
    ],
    benefits: [
      {
        title: "Suburb-Specific Dispatch",
        description:
          "We route from the closest available technician and pre-load common battery sizes for your area.",
      },
      {
        title: "Correct Battery Chemistry",
        description:
          "Standard flooded, EFB, AGM, and high-CCA batteries are matched to the vehicle before installation.",
      },
      {
        title: "Diagnostics Before Payment",
        description:
          "Battery, alternator, and starter checks confirm the real fault before the replacement is completed.",
      },
    ],
    process: [
      {
        title: "01 / Confirm Vehicle & Area",
        description:
          "Send your registration/VIN, vehicle model, and pin location so we dispatch with the right battery.",
      },
      {
        title: "02 / Test Before Replacement",
        description:
          "The technician performs load, alternator, and starter checks before removing the old battery.",
      },
      {
        title: "03 / Fit, Verify & Register",
        description:
          "We fit the new battery, check charging output, process payment, and register warranty details.",
      },
    ],
    faqs: [
      {
        question: `Do you come to homes and offices in ${area.name}?`,
        answer: `Yes. We provide mobile battery testing and replacement across ${area.name}, including ${area.landmarks.slice(0, 2).join(" and ")}.`,
      },
      {
        question: `Can you fit AGM or EFB batteries in ${area.name}?`,
        answer:
          "Yes. We stock and fit AGM/EFB batteries for Start/Stop vehicles and can complete battery registration where required.",
      },
      {
        question: "Will you check the alternator?",
        answer:
          "Yes. Every replacement includes a charging-system check so a weak alternator does not damage the new battery.",
      },
    ],
    ctas: [
      {
        label: `Call for ${area.name} Battery Help`,
        href: "tel:0101096211",
      },
      {
        label: "WhatsApp Your Pin Location",
        href: `https://wa.me/27823046926?text=Hi,%20I%20need%20mobile%20battery%20replacement%20in%20${encodeURIComponent(area.name)}.`,
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: `Mobile Battery Replacement ${area.name}`,
      offers: "On-site battery testing, replacement, fitment, and charging-system checks",
      serviceAreas: [area.name],
    },
    relatedVehicles: [
      { label: "Toyota Hilux battery support", slug: "toyota/hilux-3-0-d4d" },
      { label: "Ford Ranger battery support", slug: "ford/ranger-2-2-tdci" },
      { label: "BMW battery coding support", slug: "bmw/3-series-f30" },
    ],
    relatedProducts: [
      { label: "Willard 652", slug: "willard-652" },
      { label: "Exide 668P", slug: "exide-668p" },
      { label: "Willard 658", slug: "willard-658" },
    ],
  })
);

const generatedHeroFreeTestingPages: ServicePageContent[] = HERO_SERVICE_AREAS.map(
  (area) => ({
    serviceSlug: "free-battery-testing",
    areaSlug: area.slug,
    heroEyebrow: `Diagnostics: ${area.name}`,
    title: `Free Battery Testing in ${area.name}`,
    description: `Free battery, starter, and alternator testing for ${area.name} drivers before you replace your battery. Ideal for slow cranking, warning lights, and repeat jump-start issues.`,
    keywords: [
      ...area.focusKeywords,
      `free battery testing ${area.name}`,
      `alternator test ${area.name}`,
      `battery diagnostics ${area.name}`,
      `car battery test ${area.name}`,
    ],
    intro: `Before buying a replacement battery in ${area.name}, get the electrical system tested properly. We check resting voltage, cold-cranking performance, starter draw, and alternator output so you know whether the battery is truly the fault.`,
    coverage: [
      `Diagnostics support for ${area.name}: ${area.responseWindow}`,
      `Coverage routes: ${area.roads.join(", ")}`,
      `Nearby demand points: ${area.landmarks.join(", ")}`,
    ],
    benefits: [
      {
        title: "No Unnecessary Battery Sales",
        description:
          "A test result confirms whether the battery, alternator, starter, or cabling is causing the no-start issue.",
      },
      {
        title: "Useful for Warranty Claims",
        description:
          "Digital readings make it easier to confirm battery condition and avoid guesswork.",
      },
      {
        title: "Mobile or Workshop Options",
        description:
          "Use the New Redruth workshop or request mobile testing where dispatch is available.",
      },
    ],
    process: [
      {
        title: "01 / Symptom Check",
        description:
          "We ask about slow crank, warning lights, recent jump-starts, and driving patterns.",
      },
      {
        title: "02 / Electrical Test",
        description:
          "Battery load, starter draw, alternator charge, and voltage drop are tested in sequence.",
      },
      {
        title: "03 / Clear Recommendation",
        description:
          "You get a practical pass/fail result and the right battery options only if replacement is needed.",
      },
    ],
    faqs: [
      {
        question: `Is battery testing really free in ${area.name}?`,
        answer:
          "The diagnostic test is free. Mobile travel may depend on the callout details, and we confirm that before dispatch.",
      },
      {
        question: "Can a bad alternator look like a bad battery?",
        answer:
          "Yes. That is why alternator output and ripple are checked before recommending a battery replacement.",
      },
      {
        question: "How long does the test take?",
        answer:
          "Most tests take 10-15 minutes; Start/Stop vehicles can take longer if battery management checks are needed.",
      },
    ],
    ctas: [
      {
        label: `Book ${area.name} Battery Test`,
        href: "tel:0101096211",
      },
      {
        label: "WhatsApp Test Request",
        href: `https://wa.me/27823046926?text=Hi,%20I%20need%20a%20free%20battery%20test%20in%20${encodeURIComponent(area.name)}.`,
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: `Battery Testing ${area.name}`,
      offers: "Free battery, starter, and alternator diagnostics",
      serviceAreas: [area.name],
    },
    relatedVehicles: [
      { label: "Toyota Hilux diagnostics", slug: "toyota/hilux-3-0-d4d" },
      { label: "VW Polo Vivo testing", slug: "volkswagen/polo-vivo" },
      { label: "BMW battery coding checks", slug: "bmw/3-series-f30" },
    ],
    relatedProducts: [
      { label: "Willard 652", slug: "willard-652" },
      { label: "Exide 668P", slug: "exide-668p" },
    ],
  })
);

const generatedHeroJumpStartPages: ServicePageContent[] = HERO_SERVICE_AREAS.map(
  (area) => ({
    serviceSlug: "emergency-jump-start",
    areaSlug: area.slug,
    heroEyebrow: `No-Start Support: ${area.name}`,
    title: `Emergency Jump-Start in ${area.name}`,
    description: `Safe emergency jump-start support in ${area.name}, followed by battery and alternator diagnostics so you know if replacement is needed before you drive away.`,
    keywords: [
      ...area.focusKeywords,
      `emergency jump start ${area.name}`,
      `dead battery ${area.name}`,
      `car won't start ${area.name}`,
      `battery rescue ${area.name}`,
    ],
    intro: `If your vehicle will not start in ${area.name}, we can boost it safely and test the battery immediately afterwards. If the battery fails, we can usually replace it during the same visit.`,
    coverage: [
      `Emergency response in ${area.name}: ${area.responseWindow}`,
      `Main response routes: ${area.roads.join(", ")}`,
      `High-demand locations: ${area.landmarks.join(", ")}`,
    ],
    benefits: [
      {
        title: "ECU-Safe Boosting",
        description:
          "Surge-protected jump-start equipment protects sensitive modern electronics.",
      },
      {
        title: "Immediate Failure Check",
        description:
          "A quick battery and alternator check shows whether you can drive safely or need replacement.",
      },
      {
        title: "Replacement Ready",
        description:
          "Common car, bakkie, SUV, and AGM battery sizes can be fitted during the same callout.",
      },
    ],
    process: [
      {
        title: "01 / Share Location",
        description:
          "Call or WhatsApp your pin and vehicle details so we dispatch the right equipment.",
      },
      {
        title: "02 / Safe Jump-Start",
        description:
          "We connect surge-protected boosters and start the vehicle using safe procedure.",
      },
      {
        title: "03 / Test and Decide",
        description:
          "The battery and alternator are checked before you leave so the problem does not repeat.",
      },
    ],
    faqs: [
      {
        question: `Can you jump-start my car in ${area.name}?`,
        answer: `Yes. We assist no-start vehicles across ${area.name}, especially around ${area.landmarks.slice(0, 2).join(" and ")}.`,
      },
      {
        question: "Can a jump-start damage my car?",
        answer:
          "DIY jump-starts can be risky. We use surge-protected boosters and follow safe connection procedures.",
      },
      {
        question: "What if the battery is dead again tomorrow?",
        answer:
          "That is exactly why we test after the boost. If the battery fails, we can replace it before you get stranded again.",
      },
    ],
    ctas: [
      {
        label: `Call for ${area.name} Jump-Start`,
        href: "tel:0101096211",
      },
      {
        label: "WhatsApp Emergency Location",
        href: `https://wa.me/27823046926?text=Emergency%20jump-start%20needed%20in%20${encodeURIComponent(area.name)}.`,
        variant: "secondary",
      },
    ],
    schema: {
      serviceType: `Emergency Jump Start ${area.name}`,
      offers: "Safe jump-start, battery diagnostics, and optional on-site replacement",
      serviceAreas: [area.name],
    },
    relatedVehicles: [
      { label: "VW Polo Vivo jump-start support", slug: "volkswagen/polo-vivo" },
      { label: "Toyota Fortuner no-start support", slug: "toyota/fortuner-2-8-gd6" },
      { label: "Ford Ranger battery support", slug: "ford/ranger-2-2-tdci" },
    ],
    relatedProducts: [
      { label: "Willard 652", slug: "willard-652" },
      { label: "Willard 658", slug: "willard-658" },
    ],
  })
);

function normalizeForSimilarity(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function applyContentQualityGuards(pages: ServicePageContent[]): ServicePageContent[] {
  const seenRouteKeys = new Set<string>();
  const seenCopyKeys = new Set<string>();

  return pages.filter((page) => {
    const routeKey = `${page.serviceSlug}::${page.areaSlug}`;
    if (seenRouteKeys.has(routeKey)) {
      return false;
    }
    seenRouteKeys.add(routeKey);

    const normalizedTitle = normalizeForSimilarity(page.title);
    const normalizedDescription = normalizeForSimilarity(page.description);
    const copyKey = `${normalizedTitle}::${normalizedDescription}`;
    if (seenCopyKeys.has(copyKey)) {
      return false;
    }
    seenCopyKeys.add(copyKey);

    const hasMinimumCopy = normalizedDescription.length >= 80;
    return hasMinimumCopy;
  });
}

const RAW_SERVICES: ServicePageContent[] = [
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
  ...generatedHeroMobileServicePages,
  ...generatedHeroFreeTestingPages,
  ...generatedHeroJumpStartPages,
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
  ...generatedLocalMobileServicePages,
  ...generatedLocalFreeTestingPages,
  ...generatedLocalJumpStartPages,
];
const SERVICES: ServicePageContent[] = applyContentQualityGuards(RAW_SERVICES);

export function getServicePage(serviceSlug: string, areaSlug: string) {
  return SERVICES.find(
    (entry) =>
      entry.serviceSlug === serviceSlug && entry.areaSlug === areaSlug
  );
}

export function getAllServicePages() {
  return SERVICES;
}

