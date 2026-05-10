export type LocalProofStory = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  area: string;
  service: string;
  vehicleOrUseCase: string;
  batteryFocus: string;
  primaryServiceHref: string;
  secondaryHref: string;
  keywords: string[];
  situation: string;
  diagnosticSteps: string[];
  outcome: string;
  proofChecklist: string[];
  relatedLinks: { href: string; label: string; description?: string }[];
};

export const LOCAL_PROOF_STORIES: LocalProofStory[] = [
  {
    slug: "toyota-hilux-battery-replacement-alberton",
    title: "Toyota Hilux Battery Replacement in Alberton",
    shortTitle: "Toyota Hilux battery Alberton",
    description:
      "A local proof page for Toyota Hilux battery replacement in Alberton, covering 652/668 battery matching, alternator testing, and mobile fitment workflow.",
    area: "Alberton",
    service: "Mobile battery replacement",
    vehicleOrUseCase: "Toyota Hilux 3.0 D-4D / 2.8 GD-6",
    batteryFocus: "652, 668, EFB and heavy-duty bakkie batteries",
    primaryServiceHref: "/services/mobile-battery-replacement/alberton",
    secondaryHref: "/vehicles/toyota/hilux-3-0-d4d",
    keywords: [
      "Toyota Hilux battery Alberton",
      "Hilux battery replacement Alberton",
      "652 battery Hilux Alberton",
      "mobile battery replacement Alberton",
    ],
    situation:
      "Hilux owners in Alberton often need a high-reserve battery that can handle diesel compression, auxiliary loads, and rough daily use. The wrong battery can start the vehicle today but fail early under load.",
    diagnosticSteps: [
      "Confirm Hilux year, engine, and Start/Stop requirements before dispatch.",
      "Run a battery load test and alternator charging check before replacement.",
      "Match the battery code, terminal layout, hold-down, CCA, and reserve capacity.",
      "Verify post-fitment charging voltage and starter draw.",
    ],
    outcome:
      "The customer gets a Hilux-ready battery recommendation, professional fitment, and proof that the alternator is not damaging the new battery.",
    proofChecklist: [
      "Photo of Hilux engine bay or installed battery label.",
      "Battery tester result showing measured CCA and state of health.",
      "Close-up of warranty card or invoice with private details hidden.",
      "Optional customer review mentioning Hilux and Alberton.",
    ],
    relatedLinks: [
      {
        href: "/vehicles/toyota/hilux-3-0-d4d",
        label: "Toyota Hilux battery guide",
        description: "Vehicle-specific battery fitment recommendations.",
      },
      {
        href: "/products/size/652",
        label: "652 battery size options",
        description: "Compare matching 652-size battery stock.",
      },
      {
        href: "/services/free-battery-testing/alberton",
        label: "Free battery testing in Alberton",
        description: "Confirm battery and alternator health first.",
      },
    ],
  },
  {
    slug: "bmw-agm-battery-coding-meyersdal",
    title: "BMW AGM Battery Coding in Meyersdal",
    shortTitle: "BMW AGM coding Meyersdal",
    description:
      "A local proof page for BMW AGM battery replacement and BMS/IBS coding in Meyersdal, focused on premium Start/Stop vehicles.",
    area: "Meyersdal",
    service: "Premium battery fitment and coding",
    vehicleOrUseCase: "BMW 3 Series, X3, X5 and AGM Start/Stop vehicles",
    batteryFocus: "AGM/EFB batteries with battery registration",
    primaryServiceHref: "/services/battery-fitment/meyersdal",
    secondaryHref: "/vehicles/bmw/3-series-f30",
    keywords: [
      "BMW battery coding Meyersdal",
      "BMW AGM battery Alberton",
      "AGM battery fitment Meyersdal",
      "BMW battery replacement Meyersdal",
    ],
    situation:
      "Modern BMW vehicles monitor battery age and chemistry. Replacing the battery without registration can cause incorrect charging, Start/Stop faults, and shorter battery life.",
    diagnosticSteps: [
      "Confirm battery chemistry, Ah rating, and vehicle battery management requirements.",
      "Preserve memory where required and remove the old AGM battery safely.",
      "Fit the correct AGM/EFB replacement and register it to the vehicle.",
      "Clear battery-related faults and verify alternator charging behavior.",
    ],
    outcome:
      "The vehicle leaves with the correct AGM battery fitted, battery registration completed, and Start/Stop charging behavior protected.",
    proofChecklist: [
      "Photo of the boot/engine-bay battery location with private details hidden.",
      "Screenshot/photo of diagnostic tool showing battery registration completed.",
      "Photo of AGM battery label and fitted hold-down.",
      "Customer review mentioning BMW, AGM, coding, or Meyersdal.",
    ],
    relatedLinks: [
      {
        href: "/services/battery-fitment/meyersdal",
        label: "Premium battery fitment in Meyersdal",
        description: "AGM/EFB fitment and coding workflow.",
      },
      {
        href: "/products/type/performance",
        label: "AGM and EFB battery range",
        description: "Start/Stop battery options for premium vehicles.",
      },
      {
        href: "/vehicles/bmw/3-series-f30",
        label: "BMW 3 Series battery guide",
        description: "Vehicle-specific BMW fitment guidance.",
      },
    ],
  },
  {
    slug: "truck-battery-fitment-alrode",
    title: "Truck Battery Fitment in Alrode",
    shortTitle: "Truck battery Alrode",
    description:
      "A local proof page for truck, fleet, and commercial battery fitment in Alrode with high-CCA stock, depot support, and recycling workflow.",
    area: "Alrode",
    service: "Truck and fleet battery fitment",
    vehicleOrUseCase: "Commercial trucks, bakkie fleets, forklifts, and depot vehicles",
    batteryFocus: "High-CCA commercial batteries and dual-battery systems",
    primaryServiceHref: "/services/truck-battery-fitment/alrode",
    secondaryHref: "/products/type/truck-commercial",
    keywords: [
      "truck battery Alrode",
      "fleet battery fitment Alberton",
      "commercial battery Alrode",
      "truck battery replacement Alrode",
    ],
    situation:
      "Fleet downtime in Alrode costs money fast. Commercial batteries need correct CCA, secure fitment, safe handling, and recycling documentation.",
    diagnosticSteps: [
      "Confirm vehicle voltage, battery bank layout, and depot access requirements.",
      "Test current battery state, alternator output, and cabling condition.",
      "Fit high-CCA commercial batteries with correct terminal torque and hold-downs.",
      "Record installed battery details for future maintenance and recycling compliance.",
    ],
    outcome:
      "The fleet gets a documented commercial battery fitment, reduced repeat failures, and a clearer maintenance trail for future replacements.",
    proofChecklist: [
      "Photo of fleet vehicle or battery bay with branding/private details hidden.",
      "Installed battery labels and battery bank layout.",
      "Tester result or maintenance sheet with private details hidden.",
      "Recycling or scrap battery handover photo/document if available.",
    ],
    relatedLinks: [
      {
        href: "/services/truck-battery-fitment/alrode",
        label: "Truck battery fitment in Alrode",
        description: "Fleet and heavy-duty battery service page.",
      },
      {
        href: "/products/type/truck-commercial",
        label: "Truck and commercial battery range",
        description: "High-CCA commercial battery options.",
      },
      {
        href: "/local/alrode",
        label: "Alrode battery support",
        description: "Industrial-area service coverage and response detail.",
      },
    ],
  },
];

export function getLocalProofStory(slug: string) {
  return LOCAL_PROOF_STORIES.find((story) => story.slug === slug);
}

export function getAllLocalProofStories() {
  return LOCAL_PROOF_STORIES;
}
