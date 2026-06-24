// C:\Users\User1\abm2\src\app\layout.tsx
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GTM_ID, hasValidGtmId } from "@/lib/gtm-constants";
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
  DEFAULT_HERO_IMAGE,
  DEFAULT_LOGO,
  DEFAULT_OPENING_HOURS,
  LOCAL_BUSINESS_ID,
  ORG_ID,
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
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-969671559";

// --- SEO: Root Metadata with Open Graph & Twitter Cards ---
export const metadata: Metadata = {
  title: {
    default:
      "Alberton Battery Mart | Mobile Battery Replacement & Fitment Service",
    template: "%s | Alberton Battery Mart",
  },
  description:
    "Fast, certified mobile battery replacement service in Alberton, New Redruth, and Meyersdal. We bring the Willard & Exide battery to you. Call for a quote!",
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
      "Fast, certified mobile battery replacement service in Alberton, New Redruth, and Meyersdal. We bring the Willard & Exide battery to you. Call for a quote!",
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
      "Fast, certified mobile battery replacement service in Alberton, New Redruth, and Meyersdal.",
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
  priceRange: "R R R",
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
  ],
  openingHoursSpecification: DEFAULT_OPENING_HOURS.map((entry) => ({
    "@type": "OpeningHoursSpecification",
    ...entry,
  })),
  sameAs: [BUSINESS_CONTACT.whatsapp].filter(Boolean),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Alberton Battery Mart",
  url: BASE_URL,
  logo: DEFAULT_LOGO,
  image: DEFAULT_HERO_IMAGE,
  address: { "@type": "PostalAddress", ...BUSINESS_ADDRESS },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: BUSINESS_CONTACT.telephone,
      contactType: "customer service",
      areaServed: SERVICE_AREAS,
      availableLanguage: ["English"],
    },
  ],
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
        <JsonLd data={localBusinessSchema} id="local-business-schema" />
        <JsonLd data={organizationSchema} id="organization-schema" />
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

              function push(eventName, payload) {
                var details = payload || {};
                window.dataLayer.push({
                  event: eventName,
                  href: details.href || "",
                  form_action: details.form_action || "",
                  form_id: details.form_id || "",
                  tracking_label: details.tracking_label || "",
                  page_path: window.location.pathname
                });
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

                if (link.getAttribute("data-cta-tracked") === "true") {
                  return;
                }

                if (href.indexOf("tel:") === 0) {
                  push("phone_call_click", { href: href });
                  return;
                }

                if (href.indexOf("https://wa.me/") === 0 || href.indexOf("https://api.whatsapp.com/") === 0) {
                  push("whatsapp_click", { href: href });
                  return;
                }

                if (href.indexOf("google.com/maps") !== -1 || href.indexOf("maps.google.com") !== -1) {
                  push("map_directions_click", { href: href });
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