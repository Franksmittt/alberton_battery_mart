// src/lib/seo-constants.ts

export const BASE_URL = "https://www.albertonbatterymart.co.za";
export const ORG_ID = `${BASE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${BASE_URL}/#local-business`;
export const DEFAULT_LOGO =
  "https://www.albertonbatterymart.co.za/images/logo-schema.jpg";
export const DEFAULT_HERO_IMAGE =
  "https://www.albertonbatterymart.co.za/images/og-image.jpg";

export const STORE_TIMEZONE = "Africa/Johannesburg";

export const BUSINESS_ADDRESS = {
  streetAddress: "28 St Columb Rd",
  addressLocality: "New Redruth",
  addressRegion: "Alberton",
  postalCode: "1450",
  addressCountry: "ZA",
};

export const STORE_ADDRESS_LINE =
  "28 St Columb Rd, New Redruth, Alberton, 1450";
export const STORE_ADDRESS_SHORT = "28 St Columb Rd, New Redruth, Alberton";
export const STORE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE_ADDRESS_LINE)}`;
export const STORE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.340005537548!2d28.12132331503201!3d-26.28291418340356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950ab84596b6ab%3A0x60c03f02e6f6634!2s28%20St%20Columb%20Rd%2C%20New%20Redruth%2C%20Alberton%2C%201450!5e0!3m2!1sen!2sza!4v1671234567890!5m2!1sen!2sza";

export const PHONE_DISPLAY = "010 109 6211";
export const PHONE_TEL = "0101096211";

export const WHATSAPP_E164 = "27101096211";
export const WHATSAPP_DISPLAY = "010 109 6211";
export const WHATSAPP_PREFILL_TEXT =
  "Hi Alberton Battery Mart, I need a battery quote";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(WHATSAPP_PREFILL_TEXT)}`;

export const STORE_HOURS_WEEKDAY = { opens: "08:00", closes: "17:00" };
export const STORE_HOURS_SATURDAY = { opens: "08:00", closes: "12:00" };
export const STORE_HOURS_DISPLAY =
  "Mon–Fri: 08:00–17:00 | Sat: 08:00–12:00 | Sun: Closed";
export const STORE_HOURS_DISPLAY_LONG =
  "Mon - Fri: 8:00am - 5:00pm | Sat: 8:00am - 12:00pm | Sun: Closed";

export const AD_PRICE_ANCHORS_LINE =
  "Power Plus from R1,150 | Eco Plus from R1,050";
export const PRICE_ANCHOR_POWER_PLUS = "R1,150";
export const PRICE_ANCHOR_ECO_PLUS = "R1,050";

export const BUSINESS_CONTACT = {
  telephone: "+27101096211",
  whatsapp: WHATSAPP_URL,
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
    opens: STORE_HOURS_WEEKDAY.opens,
    closes: STORE_HOURS_WEEKDAY.closes,
  },
  {
    dayOfWeek: "Saturday",
    opens: STORE_HOURS_SATURDAY.opens,
    closes: STORE_HOURS_SATURDAY.closes,
  },
];

export const SERVICE_AREAS = [
  "Alberton",
  "Alberton Central",
  "Alberton North",
  "New Redruth",
  "Newmarket Park",
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
  "Albertsdal",
  "Elandshaven",
  "Mayberry Park",
  "General Alberts Park",
];
