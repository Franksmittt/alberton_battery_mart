// C:\Users\User1\abm2\src\app\layout.tsx
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GTM_ID, hasValidGtmId } from "@/lib/gtm-constants";
import {
  GOOGLE_ADS_ID,
  getInlineConversionActionIds,
  getInlineConversionSendTos,
} from "@/lib/google-ads-conversions";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MobileStickyFooter } from "@/components/layout/MobileStickyFooter";
import { Metadata } from "next";
import Script from "next/script"; // --- NEW: Import next/script
import { Suspense } from "react";
import RouteChangeTracker from "@/components/analytics/RouteChangeTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  BASE_URL,
  BUSINESS_ADDRESS,
  BUSINESS_CONTACT,
  BUSINESS_SAME_AS,
  DEFAULT_HERO_IMAGE,
  DEFAULT_LOGO,
  DEFAULT_OPENING_HOURS,
  EMAIL_ADMIN,
  GOOGLE_BUSINESS_PROFILE_URL,
  LOCAL_BUSINESS_ID,
  ORG_ID,
  PRICE_RANGE,
  SERVICE_AREAS,
  STORE_COORDINATES,
  STRUCTURED_AREA_SERVED,
} from "@/lib/seo-constants";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'arial']
});
const ENVIRONMENT = process.env.NODE_ENV ?? "development";
const ADS_CONVERSION_ACTION_IDS = getInlineConversionActionIds();
const ADS_CONVERSION_SEND_TOS = getInlineConversionSendTos();

// --- SEO: Root Metadata with Open Graph & Twitter Cards ---
export const metadata: Metadata = {
  title: {
    default:
      "Alberton Battery Mart | Mobile Battery Replacement & Fitment Service",
    template: "%s | Alberton Battery Mart",
  },
  description:
    "Drive-in battery testing and same-day fitment at 28 St Columb Rd, New Redruth. Willard & Exide in stock. Mobile replacement on request. Call 010 109 6211.",
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  keywords: [
    "battery replacement Alberton",
    "car battery Alberton",
    "mobile battery service",
    "Willard batteries",
    "Exide batteries",
    "battery fitment Alberton",
    "car battery New Redruth",
    "battery testing Alberton",
    "AGM battery Alberton",
    "EFB battery Alberton",
  ],
  authors: [{ name: "Alberton Battery Mart" }],
  creator: "Alberton Battery Mart",
  publisher: "Alberton Battery Mart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: BASE_URL,
    siteName: "Alberton Battery Mart",
    title:
      "Alberton Battery Mart | Mobile Battery Replacement & Fitment Service",
    description:
      "Drive-in battery testing and same-day fitment at 28 St Columb Rd, New Redruth. Willard & Exide in stock. Mobile replacement on request. Call 010 109 6211.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alberton Battery Mart - Mobile Battery Replacement Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Alberton Battery Mart | Mobile Battery Replacement & Fitment Service",
    description:
      "Drive-in battery testing and same-day fitment at 28 St Columb Rd, New Redruth. Call 010 109 6211.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      "text/markdown": `${BASE_URL}/index.md`,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: 'your-verification-code',
  },
};

// --- LocalBusiness Schema ---
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoPartsStore", "AutoRepair"],
  "@id": LOCAL_BUSINESS_ID,
  name: "Alberton Battery Mart",
  image: DEFAULT_LOGO,
  url: BASE_URL,
  telephone: BUSINESS_CONTACT.telephone,
  email: BUSINESS_CONTACT.email,
  priceRange: PRICE_RANGE,
  currenciesAccepted: "ZAR",
  paymentAccepted: "Cash, Card, EFT",
  hasMap: GOOGLE_BUSINESS_PROFILE_URL,
  parentOrganization: { "@id": ORG_ID },
  address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
  geo: {
    "@type": "GeoCoordinates",
    latitude: STORE_COORDINATES.latitude,
    longitude: STORE_COORDINATES.longitude,
  },
  areaServed: STRUCTURED_AREA_SERVED,
  brand: [
    { "@type": "Brand", name: "Willard" },
    { "@type": "Brand", name: "Exide" },
    { "@type": "Brand", name: "Enertec" },
    { "@type": "Brand", name: "Power Plus" },
    { "@type": "Brand", name: "Eco Plus" },
  ],
  knowsAbout: [
    "Car battery replacement",
    "AGM batteries",
    "EFB batteries",
    "Willard batteries",
    "Exide batteries",
    "Mobile battery fitment",
    "Battery testing",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Battery services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Drive-in battery testing and fitment",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile battery replacement",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AGM battery coding",
        },
      },
    ],
  },
  openingHoursSpecification: DEFAULT_OPENING_HOURS.map((entry) => ({
    "@type": "OpeningHoursSpecification",
    ...entry,
  })),
  sameAs: BUSINESS_SAME_AS,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Alberton Battery Mart",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: DEFAULT_LOGO,
  },
  image: DEFAULT_HERO_IMAGE,
  email: BUSINESS_CONTACT.email,
  address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
  location: { "@id": LOCAL_BUSINESS_ID },
  sameAs: BUSINESS_SAME_AS,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: BUSINESS_CONTACT.telephone,
      email: BUSINESS_CONTACT.email,
      contactType: "customer service",
      areaServed: SERVICE_AREAS,
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      email: EMAIL_ADMIN,
      contactType: "customer support",
      areaServed: SERVICE_AREAS,
      availableLanguage: ["English"],
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Alberton Battery Mart",
  url: BASE_URL,
  inLanguage: "en-ZA",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/products/results?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldLoadGtm = hasValidGtmId;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        {/* --- MODIFIED: Removed the manual <script> tag for GTM --- */}

        {/* --- Add LocalBusiness Schema to HEAD --- */}
        <link rel="describedby" href={`${BASE_URL}/llms.txt`} />
        <JsonLd data={localBusinessSchema} id="local-business-schema" />
        <JsonLd data={organizationSchema} id="organization-schema" />
        <JsonLd data={websiteSchema} id="website-schema" />
      </head>

      <body className={`${inter.className} overflow-x-clip`}>
        {/* --- GTM fallback for no-JS browsers --- */}
        {shouldLoadGtm && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {/* --- Google Ads (gtag.js) - Deferred for performance --- */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-ads-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>

        {/* --- Google Tag Manager - Deferred for performance --- */}
        {shouldLoadGtm && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
        <Script id="abm-log-context" strategy="afterInteractive">
          {`
            window.__abmEnv = '${ENVIRONMENT}';
          `}
        </Script>
        <Script id="abm-link-click-tracking" strategy="afterInteractive">
          {`
            (function() {
              if (typeof window === "undefined" || typeof document === "undefined") return;
              window.dataLayer = window.dataLayer || [];

              var ADS_ID = ${JSON.stringify(GOOGLE_ADS_ID)};
              var ACTION_IDS = {
                call: ${JSON.stringify(ADS_CONVERSION_ACTION_IDS.call)},
                directions: ${JSON.stringify(ADS_CONVERSION_ACTION_IDS.directions)},
                whatsapp: ${JSON.stringify(ADS_CONVERSION_ACTION_IDS.whatsapp)}
              };
              var SEND_TOS = {
                call: ${JSON.stringify(ADS_CONVERSION_SEND_TOS.call)},
                directions: ${JSON.stringify(ADS_CONVERSION_SEND_TOS.directions)},
                whatsapp: ${JSON.stringify(ADS_CONVERSION_SEND_TOS.whatsapp)}
              };

              function fireGtagConversion(sendTo, conversionActionId) {
                if (!sendTo) return;
                var params = { send_to: sendTo };
                if (conversionActionId) {
                  params.conversion_action_id = conversionActionId;
                }
                if (typeof window.gtag === "function") {
                  window.gtag("event", "conversion", params);
                  return;
                }
                window.dataLayer.push(["event", "conversion", params]);
              }

              function push(eventName, payload) {
                var details = payload || {};
                var row = {
                  event: eventName,
                  href: details.href || "",
                  form_action: details.form_action || "",
                  form_id: details.form_id || "",
                  tracking_label: details.tracking_label || "",
                  tracking_id: details.tracking_id || "",
                  google_ads_id: ADS_ID,
                  page_path: window.location.pathname
                };
                if (details.conversion_action_id) {
                  row.conversion_action_id = details.conversion_action_id;
                }
                window.dataLayer.push(row);
              }

              function pushConversion(kind, href) {
                var actionId = ACTION_IDS[kind] || "";
                var eventName =
                  kind === "call"
                    ? "phone_call_click"
                    : kind === "directions"
                      ? "map_directions_click"
                      : "whatsapp_click";
                push(eventName, {
                  href: href,
                  conversion_action_id: actionId
                });
                fireGtagConversion(SEND_TOS[kind] || "", actionId);
              }

              document.addEventListener("click", function(event) {
                var target = event.target;
                if (!target || !target.closest) return;
                var link = target.closest("a");
                if (!link) return;

                var href = link.getAttribute("href") || "";
                if (!href) return;

                var customEvent = link.getAttribute("data-track-event");
                if (customEvent) {
                  push(customEvent, {
                    href: href,
                    tracking_label: link.textContent ? link.textContent.trim() : ""
                  });
                  return;
                }

                // Buttons with trackingId emit cta_click + mapped conversion events themselves
                if (link.getAttribute("data-cta-tracked") === "true") {
                  return;
                }

                if (href.indexOf("tel:") === 0) {
                  pushConversion("call", href);
                  return;
                }

                if (href.indexOf("https://wa.me/") === 0 || href.indexOf("https://api.whatsapp.com/") === 0) {
                  pushConversion("whatsapp", href);
                  return;
                }

                if (href.indexOf("google.com/maps") !== -1 || href.indexOf("maps.google.com") !== -1) {
                  pushConversion("directions", href);
                  return;
                }

                if (href.indexOf("mailto:") === 0) {
                  push("email_click", { href: href });
                  return;
                }

                if (href.indexOf("writereview") !== -1 || href.indexOf("/reviews") !== -1) {
                  push("review_intent_click", { href: href });
                }
              }, true);

              document.addEventListener("submit", function(event) {
                var form = event.target;
                if (!form || form.tagName !== "FORM") return;
                if (form.getAttribute("data-track-skip-form-submit") === "true") return;

                var action = form.getAttribute("action") || window.location.pathname;
                var formId = form.getAttribute("id") || "";
                push("form_submit", {
                  form_action: action,
                  form_id: formId
                });

                if (action.indexOf("/products/results") !== -1) {
                  push("search_form_submit", {
                    form_action: action,
                    form_id: formId
                  });
                }
              }, true);
            })();
          `}
        </Script>
        <Suspense fallback={null}>
          <RouteChangeTracker />
        </Suspense>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          <div className="pt-16 md:pt-28 pb-20 md:pb-0 overflow-x-clip">
            {children}
          </div>
          <Footer />
          {/* Mobile Sticky Footer - Action Bar */}
          <MobileStickyFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}