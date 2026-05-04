// src/data/vehicle-fitment.ts
import { BASE_URL } from "@/lib/seo-constants";

export type VehicleFitment = {
  make: string;
  model: string;
  slug: string;
  years: string;
  engines: string[];
  headline: string;
  description: string;
  painPoints: string[];
  recommendedProducts: {
    title: string;
    slug: string;
    reason: string;
  }[];
  services: {
    label: string;
    href: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  keywords: string[];
  heroImage?: string;
};

export const VEHICLE_FITMENT: VehicleFitment[] = [
  {
    make: "toyota",
    model: "hilux-3-0-d4d",
    slug: "toyota/hilux-3-0-d4d",
    years: "2005 – 2016",
    engines: ["3.0 D-4D (KUN26)", "2.8 GD-6", "2.7 VVTi"],
    headline: "Toyota Hilux Battery Replacement (3.0 D-4D / 2.8 GD-6)",
    description:
      "High-compression diesel Hilux engines require a 70Ah+ battery with deep reserve capacity. We stock Willard and Exide options that match the OEM clamp, terminal layout, and vibration requirements for South African conditions.",
    painPoints: [
      "Slow cold-crank even when voltage looks fine",
      "Auxiliary electronics (fridge/winch) draining starter battery",
      "Start/Stop variants triggering battery warnings after generic replacements",
    ],
    recommendedProducts: [
      {
        title: "Willard 652 (70Ah, 590CCA)",
        slug: "willard-652",
        reason: "Flooded workhorse for non-Start/Stop Hilux models and overland builds.",
      },
      {
        title: "Exide 668P EFB (85Ah, 715CCA)",
        slug: "exide-668p",
        reason: "Enhanced Flooded Battery for Start/Stop Hilux GD-6 and Fortuner models.",
      },
    ],
    services: [
      {
        label: "Mobile Battery Replacement",
        href: "/services/mobile-battery-replacement/alberton",
        description: "We come to your site in Alberton, Meyersdal, or Brackenhurst with the correct battery preloaded.",
      },
      {
        label: "Free Diagnostics",
        href: "/services/free-battery-testing/alberton",
        description: "Confirm alternator and starter health before replacing the battery.",
      },
    ],
    faqs: [
      {
        question: "Can I use a smaller 646 battery?",
        answer:
          "We don’t recommend it for diesel Hilux models. The 646 is ideal for petrol engines, but the D-4D requires higher reserve capacity and CCA, otherwise cold starts suffer.",
      },
      {
        question: "Do GD-6 models need Start/Stop batteries?",
        answer:
          "Only the models with Start/Stop or regenerative braking need an EFB like the Exide 668P. We confirm your VIN before fitment.",
      },
    ],
    keywords: [
      "Hilux battery replacement Alberton",
      "battery for Toyota Hilux 3.0 d4d",
      "Hilux GD6 battery price",
    ],
  },
  {
    make: "ford",
    model: "ranger-2-2-tdci",
    slug: "ford/ranger-2-2-tdci",
    years: "2012 – 2021",
    engines: ["2.2 TDCI", "3.2 TDCI", "2.0 Bi-Turbo"],
    headline: "Ford Ranger Battery Replacement (2.2 / 3.2 TDCI)",
    description:
      "The Ranger’s Battery Monitoring System (BMS) is extremely sensitive. Fitment must include BMS reset/coding and a battery that matches the original chemistry (flooded or EFB).",
    painPoints: [
      "Dash warning after DIY replacement (“Battery saver active”)",
      "Start/Stop not functioning after battery swap",
      "Alternator over-charging due to incorrect BMS reset",
    ],
    recommendedProducts: [
      {
        title: "Willard 652",
        slug: "willard-652",
        reason: "Correct flooded replacement for non-Start/Stop Rangers.",
      },
      {
        title: "Exide 668P EFB",
        slug: "exide-668p",
        reason: "Essential for Start/Stop Rangers (2.0 Bi-Turbo / Everest).",
      },
    ],
    services: [
      {
        label: "Premium Meyersdal Fitment",
        href: "/services/battery-fitment/meyersdal",
        description: "Includes BMS reset, IBS calibration, and fault-code clearing.",
      },
      {
        label: "Mobile Battery Callout",
        href: "/services/mobile-battery-replacement/alberton",
        description: "On-site fitment with memory-saver tools to protect ECU data.",
      },
    ],
    faqs: [
      {
        question: "Do I need battery coding?",
        answer:
          "Yes. Ford Rangers require BMS reset/coding; otherwise the system overcharges and the new battery fails prematurely. We include this with every fitment.",
      },
      {
        question: "Can I downgrade from EFB to flooded?",
        answer:
          "Not on Start/Stop Rangers. Always replace with the same chemistry (EFB) to avoid warranty and performance issues.",
      },
    ],
    keywords: [
      "Ford Ranger battery Alberton",
      "Ranger battery coding",
      "Ford Everest battery replacement",
    ],
  },
  {
    make: "volkswagen",
    model: "polo-vivo",
    slug: "volkswagen/polo-vivo",
    years: "2010 – 2024",
    engines: ["1.4", "1.6", "1.0 TSI"],
    headline: "VW Polo & Polo Vivo Battery Replacement",
    description:
      "Polo Vivo owners often encounter premature battery failures due to short-trip driving and aftermarket sound systems. We stock the exact 619/628 battery sizes with the correct clamp height.",
    painPoints: [
      "Battery fails within 2 years due to short commutes",
      "Aftermarket sound systems causing parasitic drain",
      "Incorrect battery height interfering with bonnet insulation",
    ],
    recommendedProducts: [
      {
        title: "Willard 619",
        slug: "willard-652",
        reason: "Ideal for 1.4 / 1.6 Polo Vivo with standard electrical load (43Ah).",
      },
      {
        title: "Willard 646 / Exide 628C",
        slug: "willard-652",
        reason: "For Polo TSI or vehicles with high electrical demand (55Ah).",
      },
    ],
    services: [
      {
        label: "Free Battery Testing",
        href: "/services/free-battery-testing/alberton",
        description: "Drop into New Redruth for a 10-minute load test before replacing the battery.",
      },
      {
        label: "Mobile Fitment",
        href: "/services/mobile-battery-replacement/alberton",
        description: "We swap the battery at your office or complex.",
      },
    ],
    faqs: [
      {
        question: "Why did my battery fail so quickly?",
        answer:
          "Short trips and aftermarket subs drain batteries faster. We recommend occasional long drives or a maintenance charger if your car is parked for long periods.",
      },
      {
        question: "Can you test for parasitic drain?",
        answer:
          "Yes. Our diagnostics identify whether a radio, tracker, or alarm is draining the battery overnight.",
      },
    ],
    keywords: [
      "VW Polo battery Alberton",
      "Polo Vivo battery price",
      "Polo battery drain test",
    ],
  },
  {
    make: "mercedes",
    model: "c-class-w205",
    slug: "mercedes/c-class-w205",
    years: "2014 – 2021",
    engines: ["C180", "C200", "C220d", "C300"],
    headline: "Mercedes-Benz C-Class Battery & Auxiliary Replacement (W205)",
    description:
      "Modern Mercedes models use an AGM main battery plus an auxiliary battery for the electronics. Replacements must include coding, IBS reset, and optional auxiliary swap to clear warning lights.",
    painPoints: [
      "“Stop vehicle leave engine running” warning after battery swap",
      "Auxiliary battery malfunction light",
      "Start/Stop disabled due to aged AGM battery",
    ],
    recommendedProducts: [
      {
        title: "Exide 668P EFB",
        slug: "exide-668p",
        reason: "Suitable for C-Class models originally fitted with EFB batteries.",
      },
      {
        title: "Willard 658 AGM (import)",
        slug: "willard-658",
        reason: "For AMG or high-electrical-load variants requiring AGM.",
      },
    ],
    services: [
      {
        label: "Premium Meyersdal Fitment",
        href: "/services/battery-fitment/meyersdal",
        description: "Includes IBS reset, auxiliary battery testing, and code clearing.",
      },
      {
        label: "Emergency Jump-Start",
        href: "/services/emergency-jump-start/alberton",
        description: "If the battery is completely flat, we safely boost and replace on-site.",
      },
    ],
    faqs: [
      {
        question: "Do Mercedes batteries need coding?",
        answer:
          "Yes. Every AGM/EFB battery installed in a Mercedes must be registered with the Battery Management System, otherwise charging is incorrect. We include coding in our service.",
      },
      {
        question: "Do you replace auxiliary batteries?",
        answer:
          "Yes. We stock auxiliary batteries and can replace them during the same visit to clear the warning.",
      },
    ],
    keywords: [
      "Mercedes C-Class battery Alberton",
      "Mercedes auxiliary battery replacement",
      "Mercedes battery coding Alberton",
    ],
  },
  {
    make: "bmw",
    model: "3-series-f30",
    slug: "bmw/3-series-f30",
    years: "2012 – 2019",
    engines: ["320i", "320d", "330i", "335i"],
    headline: "BMW 3-Series (F30) Battery Replacement & Coding",
    description:
      "BMW F30 models use IBS-controlled AGM or EFB batteries. When the battery is replaced, the new capacity must be registered and the IBS reset to prevent overcharging.",
    painPoints: [
      "Battery discharge warnings even after replacement",
      "Start/Stop disabled",
      "iDrive resets due to incorrect battery coding",
    ],
    recommendedProducts: [
      {
        title: "Exide 668P EFB",
        slug: "exide-668p",
        reason: "Perfect for 320i/320d models shipped with EFB batteries.",
      },
      {
        title: "Willard 658 (AGM option)",
        slug: "willard-658",
        reason: "For models requiring AGM or owners running high-demand audio setups.",
      },
    ],
    services: [
      {
        label: "Premium Meyersdal Fitment",
        href: "/services/battery-fitment/meyersdal",
        description: "Includes coding, IBS reset, and Start/Stop calibration.",
      },
      {
        label: "Mobile Coding Callout",
        href: "/services/mobile-battery-replacement/alberton",
        description: "We handle the replacement in your garage or office park and code on-site.",
      },
    ],
    faqs: [
      {
        question: "What happens if I don’t code the battery?",
        answer:
          "The car will overcharge or undercharge the battery, causing premature failure and repeated warning lights. Coding tells the IBS to reset the battery age and capacity.",
      },
      {
        question: "How long does coding take?",
        answer:
          "Once the battery is installed, coding takes about 5 minutes using our BMW-compatible diagnostic tools.",
      },
    ],
    keywords: [
      "BMW F30 battery replacement",
      "BMW battery coding Alberton",
      "BMW IBS reset",
    ],
  },
  {
    make: "toyota",
    model: "fortuner-2-8-gd6",
    slug: "toyota/fortuner-2-8-gd6",
    years: "2016 – 2024",
    engines: ["2.8 GD-6", "2.4 GD-6", "4.0 V6"],
    headline: "Toyota Fortuner Battery Replacement (2.8 GD-6)",
    description:
      "Fortuner owners run high electrical loads—spotlights, fridges, tow-car electronics. We install EFB/AGM batteries that handle Start/Stop and off-road vibration without ECU errors.",
    painPoints: [
      "Start/Stop disabled after installing a standard flooded battery",
      "Battery light flicker after off-road trips",
      "Dual-battery setups draining the starter battery",
    ],
    recommendedProducts: [
      {
        title: "Exide 668P EFB",
        slug: "exide-668p",
        reason: "OEM-grade replacement for Start/Stop Fortuner models.",
      },
      {
        title: "Willard 658",
        slug: "willard-658",
        reason: "High-reserve flooded upgrade for overland builds without Start/Stop.",
      },
    ],
    services: [
      {
        label: "Mobile Battery Replacement",
        href: "/services/mobile-battery-replacement/alberton",
        description: "We handle fitment at home before you leave on a trip.",
      },
      {
        label: "Truck & Fleet Division (for Prado/Land Cruiser)",
        href: "/services/truck-battery-fitment/alrode",
        description: "Perfect for corporate fleets or game lodge vehicles.",
      },
    ],
    faqs: [
      {
        question: "Do Fortuners need EFB batteries?",
        answer:
          "If your Fortuner has Start/Stop, yes—always use an EFB like the Exide 668P. Non-Start/Stop models can use Willard 652/658.",
      },
      {
        question: "Can you integrate with dual-battery systems?",
        answer:
          "Yes. We work with national overland installers and can isolate the crank battery while keeping your dual system intact.",
      },
    ],
    keywords: [
      "Toyota Fortuner battery Alberton",
      "Fortuner battery price",
      "Fortuner start stop battery",
    ],
  },
  {
    make: "volkswagen",
    model: "amarok-btdi",
    slug: "volkswagen/amarok-btdi",
    years: "2010 – 2023",
    engines: ["2.0 TDI", "2.0 BiTDI", "3.0 V6"],
    headline: "VW Amarok Battery Replacement",
    description:
      "The Amarok’s engine bay is tight and requires a tall-case battery with high reserve capacity. We stock the Willard 658 and Exide 689 options that fit without bracket mods.",
    painPoints: [
      "Frequent alternator errors after rough roads",
      "Battery height interfering with bonnet insulation",
      "Start/Stop failures on high-spec V6 models",
    ],
    recommendedProducts: [
      {
        title: "Willard 658",
        slug: "willard-658",
        reason: "Flooded upgrade for diesel Amarok with fridges, winches, dual batteries.",
      },
      {
        title: "Exide 668P EFB",
        slug: "exide-668p",
        reason: "For Start/Stop Amarok V6 models needing higher cycle life.",
      },
    ],
    services: [
      {
        label: "Mobile Battery Replacement",
        href: "/services/mobile-battery-replacement/alberton",
        description: "On-site swap with torque-checked clamps.",
      },
      {
        label: "Free Diagnostics",
        href: "/services/free-battery-testing/alberton",
        description: "Battery, alternator, and starter check before long trips.",
      },
    ],
    faqs: [
      {
        question: "Can I use a 652 in the Amarok?",
        answer:
          "It fits but isn’t ideal if you run dual fridges/winches. We recommend the 658 or Exide 668P for better reserve.",
      },
      {
        question: "Do you reinforce the battery bracket?",
        answer:
          "Yes, we check and replace bracket rubbers when needed to prevent vibration cracks.",
      },
    ],
    keywords: [
      "Amarok battery replacement Alberton",
      "VW Amarok battery price",
      "Amarok dual battery setup",
    ],
  },
  {
    make: "audi",
    model: "q5-tdi",
    slug: "audi/q5-tdi",
    years: "2012 – 2022",
    engines: ["2.0 TDI", "3.0 TDI", "2.0 TFSI"],
    headline: "Audi Q5 Battery Replacement (Start/Stop)",
    description:
      "Audi Q5 and Q7 models use AGM/EFB batteries located in the boot. We handle battery coding, IBS reset, and ensure Start/Stop works post install.",
    painPoints: [
      "Boot battery access is complex—requires coding",
      "Warning lights for Start/Stop due to aged AGM",
      "Auxiliary battery faults",
    ],
    recommendedProducts: [
      {
        title: "Exide 668P EFB",
        slug: "exide-668p",
        reason: "Ideal for Q5 models originally shipped with EFB batteries.",
      },
      {
        title: "Willard 658 (AGM import)",
        slug: "willard-658",
        reason: "For Q7 or S-Line upgrades requiring AGM performance.",
      },
    ],
    services: [
      {
        label: "Premium Meyersdal Fitment",
        href: "/services/battery-fitment/meyersdal",
        description: "Includes boot trim removal, coding, and auxiliary checks.",
      },
      {
        label: "Emergency Jump-Start",
        href: "/services/emergency-jump-start/alberton",
        description: "We boost and replace on-site when the car won’t start.",
      },
    ],
    faqs: [
      {
        question: "Where is the Q5 battery located?",
        answer:
          "In the boot under the spare-wheel well. We replace it without damaging trims and handle coding.",
      },
      {
        question: "Does my Q5 use AGM or EFB?",
        answer:
          "Most Q5 models use EFB unless it’s a high-performance variant. We check the VIN before fitment.",
      },
    ],
    keywords: [
      "Audi Q5 battery replacement",
      "Audi battery coding Alberton",
      "Q7 battery price South Africa",
    ],
  },
  {
    make: "land-rover",
    model: "discovery-4",
    slug: "land-rover/discovery-4",
    years: "2010 – 2016",
    engines: ["SDV6", "TDV6"],
    headline: "Land Rover Discovery 4 Battery Upgrade",
    description:
      "Discovery 4 owners battle with voltage drops due to high electrical load (air suspension, compressors). We supply the Willard 658 plus auxiliary batteries with professional fitment.",
    painPoints: [
      "Multiple battery systems causing faults",
      "Battery warning after short trips",
      "Auxiliary battery under driver seat failing",
    ],
    recommendedProducts: [
      {
        title: "Willard 658",
        slug: "willard-658",
        reason: "Primary crank battery replacement.",
      },
      {
        title: "Deep-cycle auxiliary battery (custom)",
        slug: "willard-652",
        reason: "For under-seat or boot dual systems.",
      },
    ],
    services: [
      {
        label: "Truck & Fleet Battery Fitment",
        href: "/services/truck-battery-fitment/alrode",
        description: "Ideal for heavy SUVs requiring dual-technician fitment.",
      },
      {
        label: "Mobile Replacement",
        href: "/services/mobile-battery-replacement/alberton",
        description: "We swap primary and auxiliary batteries at your home.",
      },
    ],
    faqs: [
      {
        question: "Does the Discovery 4 have two batteries?",
        answer:
          "Yes. There’s a main crank battery under the bonnet and often an auxiliary under the passenger seat. We test and replace both.",
      },
    ],
    keywords: [
      "Discovery 4 battery replacement",
      "Land Rover auxiliary battery",
      "Discovery battery Alberton",
    ],
  },
  {
    make: "toyota",
    model: "land-cruiser-200",
    slug: "toyota/land-cruiser-200",
    years: "2008 – 2023",
    engines: ["4.5 V8 D-4D", "4.7 V8", "5.7 V8"],
    headline: "Toyota Land Cruiser 200 Battery Upgrade",
    description:
      "Cruiser owners run dual fridges, winches, and inverters. We install the Willard 658 or dual high-CCA batteries with proper isolation.",
    painPoints: [
      "Standard 652 batteries failing on long trips",
      "Dual-battery isolators not configured correctly",
      "High vibration causing terminal failure",
    ],
    recommendedProducts: [
      {
        title: "Willard 658",
        slug: "willard-658",
        reason: "Primary crank battery upgrade for heavy accessories.",
      },
      {
        title: "Deep-cycle auxiliary (custom)",
        slug: "willard-652",
        reason: "Under-bonnet or rear-mounted auxiliary systems.",
      },
    ],
    services: [
      {
        label: "Truck & Fleet Fitment",
        href: "/services/truck-battery-fitment/alrode",
        description: "Dual-technician fitment with isolator wiring.",
      },
      {
        label: "Mobile Battery Replacement",
        href: "/services/mobile-battery-replacement/alberton",
        description: "We swap batteries at your home before expeditions.",
      },
    ],
    faqs: [
      {
        question: "Can you install dual batteries?",
        answer:
          "Yes. We partner with overland installers and can configure dual-battery systems, DC-DC chargers, and isolators.",
      },
    ],
    keywords: [
      "Land Cruiser 200 battery",
      "Cruiser dual battery Alberton",
      "Land Cruiser V8 battery upgrade",
    ],
  },
  {
    make: "land-rover",
    model: "range-rover-sport",
    slug: "land-rover/range-rover-sport",
    years: "2013 – 2022",
    engines: ["SDV6", "SDV8", "Supercharged Petrol"],
    headline: "Range Rover Sport Battery & Auxiliary Replacement",
    description:
      "Range Rover Sports use AGM main and auxiliary batteries. Our premium fitment includes coding, fault clearing, and auxiliary swaps to remove dash warnings.",
    painPoints: [
      "Auxiliary battery malfunction warnings",
      "Adaptive suspension errors after battery swap",
      "Start/Stop disabled",
    ],
    recommendedProducts: [
      {
        title: "Willard 658 AGM",
        slug: "willard-658",
        reason: "OEM-spec replacement for primary battery.",
      },
      {
        title: "Auxiliary battery kit",
        slug: "willard-652",
        reason: "Under-seat auxiliary swap with coding.",
      },
    ],
    services: [
      {
        label: "Premium Meyersdal Fitment",
        href: "/services/battery-fitment/meyersdal",
        description: "Includes coding, auxiliary testing, and suspension recalibration.",
      },
    ],
    faqs: [
      {
        question: "Do you reset suspension faults?",
        answer:
          "Yes, our diagnostic suite clears adaptive suspension and Start/Stop faults after the new battery is installed.",
      },
    ],
    keywords: [
      "Range Rover Sport battery",
      "Range Rover auxiliary battery",
    ],
  },
  {
    make: "toyota",
    model: "corolla-cross",
    slug: "toyota/corolla-cross",
    years: "2021 – 2024",
    engines: ["1.8 Hybrid", "1.8 Petrol"],
    headline: "Toyota Corolla Cross Hybrid Battery Replacement",
    description:
      "Corolla Cross hybrids use EFB batteries paired with hybrid packs. We replace the 12V battery with EFB technology and ensure the hybrid system resets correctly.",
    painPoints: [
      "Hybrid warning lights after DIY battery swap",
      "12V battery drained due to short trips",
      "Start/Stop complaints",
    ],
    recommendedProducts: [
      {
        title: "Exide 668P EFB",
        slug: "exide-668p",
        reason: "Direct replacement for Corolla Cross Start/Stop systems.",
      },
    ],
    services: [
      {
        label: "Premium Meyersdal Fitment",
        href: "/services/battery-fitment/meyersdal",
        description: "Hybrid-aware fitment with system checks.",
      },
    ],
    faqs: [
      {
        question: "Can you reset hybrid warnings?",
        answer:
          "Yes. We reset 12V battery error codes and verify the hybrid system recognises the new battery.",
      },
    ],
    keywords: [
      "Corolla Cross battery",
      "Corolla hybrid battery replacement",
    ],
  },
  {
    make: "suzuki",
    model: "swift-1-2",
    slug: "suzuki/swift-1-2",
    years: "2014 – 2024",
    engines: ["1.2 GA/GL", "1.4 Sport"],
    headline: "Suzuki Swift Battery Replacement",
    description:
      "Swifts rely on compact batteries. We supply 619/628 size options with higher reserve capacity for upgraded audio systems.",
    painPoints: [
      "Frequent battery failures from short commutes",
      "Upgraded sound systems draining starter battery",
    ],
    recommendedProducts: [
      {
        title: "Willard 619",
        slug: "willard-652",
        reason: "OEM-size battery for GA/GL models.",
      },
      {
        title: "Exide 628C",
        slug: "willard-652",
        reason: "Higher reserve for Swift Sport with accessories.",
      },
    ],
    services: [
      {
        label: "Free Battery Testing",
        href: "/services/free-battery-testing/alberton",
        description: "Identify parasitic drains before replacing the battery.",
      },
      {
        label: "Mobile Replacement",
        href: "/services/mobile-battery-replacement/alberton",
        description: "Perfect for complex parking or estate access.",
      },
    ],
    faqs: [
      {
        question: "Can you test for sound-system drain?",
        answer:
          "Yes. We measure parasitic draw and recommend isolators if needed.",
      },
    ],
    keywords: [
      "Suzuki Swift battery",
      "Swift battery price",
    ],
  },
  {
    make: "audi",
    model: "q7-tdi",
    slug: "audi/q7-tdi",
    years: "2010 – 2023",
    engines: ["3.0 TDI", "4.2 TDI", "3.0 TFSI"],
    headline: "Audi Q7 Battery & Coding",
    description:
      "Audi Q7 batteries live in the boot and require coding plus auxiliary checks. We swap the AGM battery, code it, and verify Start/Stop systems.",
    painPoints: [
      "Boot-located battery is hard to access",
      "Auxiliary battery errors",
    ],
    recommendedProducts: [
      {
        title: "Willard 658 AGM",
        slug: "willard-658",
        reason: "AGM-grade performance for Q7 electronics.",
      },
    ],
    services: [
      {
        label: "Premium Meyersdal Fitment",
        href: "/services/battery-fitment/meyersdal",
        description: "Includes boot trim removal and coding.",
      },
    ],
    faqs: [
      {
        question: "Can you service auxiliary batteries?",
        answer:
          "Yes. We test and replace auxiliary packs to clear dashboard warnings.",
      },
    ],
    keywords: [
      "Audi Q7 battery",
      "Audi Q7 coding",
    ],
  },
];

export function getVehicleFitment(slug: string) {
  return VEHICLE_FITMENT.find((entry) => entry.slug === slug);
}

export function getAllVehicleSlugs() {
  return VEHICLE_FITMENT.map((entry) => entry.slug);
}

