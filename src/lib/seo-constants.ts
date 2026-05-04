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

export const SERVICE_AREAS = ["Alberton", "New Redruth", "Meyersdal"];

