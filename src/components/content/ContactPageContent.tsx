"use client";

import { Mail, MapPin, Clock, Phone, MessageSquare, Navigation } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/content/ContactForm";
import QuoteTrackingWrapper from "@/components/layout/QuoteTrackingWrapper";
import { AdLandingHero } from "@/components/layout/AdLandingHero";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_ADDRESS_LINE,
  STORE_HOURS_DISPLAY_LONG,
  STORE_MAPS_EMBED,
  STORE_MAPS_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/seo-constants";

type ContactPageContentProps = {
  bucket: "control" | "variant";
};

export default function ContactPageContent({ bucket }: ContactPageContentProps) {
  return (
    <QuoteTrackingWrapper
      bucket={bucket}
      viewEventName="contact_page_view"
      ctaEventName="contact_page_cta_click"
    >
      {({ trackCta }) => (
        <div className="space-y-12">
          <AdLandingHero
            title="Contact Alberton's Battery Experts"
            subtitle="Drive in for a free battery test, same-day fitment, and expert advice at our New Redruth storefront."
            trackingPrefix="contact-hero"
            className="border-b-0"
          />

          <div className="container pb-16 space-y-12">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-3xl font-bold text-battery mb-4">
                  Visit Our Store
                </h2>

                <Card className="bg-card border-l-4 border-battery">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-6 w-6 text-battery" />
                      <h3 className="text-xl font-bold text-foreground">
                        Storefront — Walk Ins Welcome
                      </h3>
                    </div>
                    <p className="text-lg text-foreground">{STORE_ADDRESS_LINE}</p>
                    <p className="text-muted-foreground">
                      Free battery, alternator, and starter testing in-store. No
                      appointment needed during trading hours.
                    </p>
                    <Button asChild variant="battery" className="w-full">
                      <a
                        href={STORE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCta("maps")}
                        className="flex items-center justify-center gap-2"
                      >
                        <Navigation className="h-5 w-5" />
                        Get Directions
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-l-4 border-battery">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-6 w-6 text-battery" />
                      <h3 className="text-xl font-bold text-foreground">
                        Shop Line
                      </h3>
                    </div>
                    <p className="text-2xl font-extrabold text-foreground">
                      {PHONE_DISPLAY}
                    </p>
                    <Button asChild variant="battery" className="w-full mt-2">
                      <a
                        href={`tel:${PHONE_TEL}`}
                        onClick={() => trackCta("call")}
                      >
                        Call the Store
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-l-4 border-green-600">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                      <h3 className="text-xl font-bold text-foreground">
                        WhatsApp Quotes
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      Message us your vehicle or battery code for a quick quote.
                    </p>
                    <Button
                      asChild
                      variant="secondary"
                      className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCta("whatsapp")}
                      >
                        WhatsApp {WHATSAPP_DISPLAY}
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-2xl font-bold text-foreground">
                    Location & Hours
                  </h3>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-battery flex-shrink-0" />
                    <p className="text-lg text-foreground">
                      <a
                        href={STORE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-battery"
                        onClick={() => trackCta("maps")}
                      >
                        {STORE_ADDRESS_LINE}
                      </a>
                    </p>
                  </div>

                  <div id="hours" className="flex items-center space-x-4 scroll-mt-28">
                    <Clock className="h-6 w-6 text-battery" />
                    <p className="text-lg text-foreground">
                      {STORE_HOURS_DISPLAY_LONG}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Staff answer the shop line from 07:30 — store opens to the public at 08:00.
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-battery" />
                    <Link
                      href="mailto:admin@albertonbatterymart.co.za"
                      className="text-lg text-foreground hover:text-battery"
                      onClick={() => trackCta("email")}
                    >
                      admin@albertonbatterymart.co.za
                    </Link>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Mobile battery replacement is also available across Alberton —
                    call us to check dispatch availability.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Send Us a Detailed Inquiry
                </h2>
                <ContactForm />
              </div>
            </div>

            <div className="w-full pt-8">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Find Us on the Map
              </h2>
              <div className="bg-card rounded-lg overflow-hidden border border-border aspect-video shadow-xl">
                <iframe
                  src={STORE_MAPS_EMBED}
                  width="100%"
                  height="100%"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                  title="Google Maps Location of Alberton Battery Mart"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </QuoteTrackingWrapper>
  );
}
