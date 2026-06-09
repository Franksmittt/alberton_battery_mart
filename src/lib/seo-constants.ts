// src/lib/seo-constants.ts

export const BASE_URL = "https://www.albertonbatterymart.co.za";
export const ORG_ID = `${BASE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${BASE_URL}/#local-business`;
export const DEFAULT_LOGO =
  "https://www.albertonbatterymart.co.za/images/logo-schema.jpg";
export const DEFAULT_HERO_IMAGE =
  "https://www.albertonbatterymart.co.za/images/og-image.jpg";

export const BUSINESS_ADDRESS = {
  streetAddress: "28 St Columb Rd",
  addressLocality: "New Redruth",
  addressRegion: "Alberton",
  postalCode: "1450",
  addressCountry: "ZA",
};

export const BUSINESS_CONTACT = {
  telephone: "+27101096211",
  whatsapp: "https://wa.me/27823046926",
  email: "info@albertonbatterymart.co.za",
};

export const STORE_COORDINATES = {
  latitude: -26.28291418340356,
  longitude: 28.12132331503201,
};

export const STRUCTURED_AREA_SERVED = [
  {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: STORE_COORDINATES.latitude,
      longitude: STORE_COORDINATES.longitude,
    },
    geoRadius: 12000,
  },
  { "@type": "Place", name: "Alberton" },
  { "@type": "Place", name: "Alrode" },
  { "@type": "Place", name: "New Redruth" },
  { "@type": "Place", name: "Meyersdal" },
  { "@type": "Place", name: "Brackenhurst" },
  { "@type": "Place", name: "Raceview" },
];

export const DEFAULT_OPENING_HOURS = [
  {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  {
    dayOfWeek: "Saturday",
    opens: "08:00",
    closes: "12:00",
  },
];

export const SERVICE_AREAS = [
  "Alberton",
  "Alberton Central",
  "New Redruth",
  "Meyersdal",
  "Brackenhurst",
  "Brackendowns",
  "Verwoerdpark",
  "Randhart",
  "Florentia",
  "Raceview",
  "South Crest",
  "Alberante",
  "Alrode",
  "Mayberry Park",
  "General Alberts Park",
];

