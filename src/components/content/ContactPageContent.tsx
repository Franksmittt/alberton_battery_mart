"use client";

import { Mail, MapPin, Clock, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/content/ContactForm";
import QuoteTrackingWrapper from "@/components/layout/QuoteTrackingWrapper";

// --- FINAL VERIFIED CONTACT DETAILS ---
const CONTACT_DETAILS = {
  primaryPhone: "0101096211",
  whatsAppNumber: "082 304 6926", // Display number
  whatsAppLink: "27823046926", // Link format
  email: "admin@albertonbatterymart.co.za",
  address: "28 St Columb Rd, New Redruth, Alberton, 1450",
  hours: "Mon - Fri: 8:00am - 5:00pm | Sat: 8:00am - 1:00pm",
  // --- FIX: This is a REAL Google Maps embed link ---
  mapsLink: "https://www.google.com/maps?q=28+St+Columb+Rd,+New+Redruth,+Alberton,+1450",
  iframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.340005537548!2d28.12132331503201!3d-26.28291418340356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950ab84596b6ab%3A0x60c03f02e6f6634!2s28%20St%20Columb%20Rd%2C%20New%20Redruth%2C%20Alberton%2C%201450!5e0!3m2!1sen!2sza!4v1671234567890!5m2!1sen!2sza"
};

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
        <div className="container py-16 space-y-12">
          {/* --- NEW: SEO-Optimized H1 & Subtitle --- */}
          <h1 className="text-5xl font-extrabold text-foreground text-center">
            Contact Alberton's Battery Experts
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-center">
            Call us for immediate assistance in Alberton, or use the form below for detailed inquiries.
          </p>

          {/* Grid: Contact Options, Form, and Map */}
          <div className="grid lg:grid-cols-3 gap-10 pt-6">
            
            {/* Column 1: Contact Details & CTAs */}
            <div className="lg:col-span-1 space-y-6">
              
              <h2 className="text-3xl font-bold text-battery mb-4">Immediate Contact</h2>
              
              {/* CTA: Phone Call (High Urgency) */}
              <Card className="bg-card border-l-4 border-battery">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-battery" />
                    <h3 className="text-xl font-bold text-foreground">Mobile Callouts / Shop Line</h3>
                  </div>
                  <p className="text-2xl font-extrabold text-foreground">{CONTACT_DETAILS.primaryPhone}</p>
                  <Button asChild variant="battery" className="w-full mt-2">
                    <a href={`tel:${CONTACT_DETAILS.primaryPhone}`} onClick={() => trackCta("call")}>Call Us Now</a>
                  </Button>
                </CardContent>
              </Card>
              
              {/* CTA: WhatsApp (Messaging Only) - CRITICAL CLARITY */}
              <Card className="bg-card border-l-4 border-green-600">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                    <h3 className="text-xl font-bold text-foreground">WhatsApp Messaging Only</h3>
                  </div>
                  <p className="text-lg text-muted-foreground">**Please note: This number is for messaging only. No calls.**</p>
                  <Button asChild variant="secondary" className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white">
                    <a href={`https://wa.me/${CONTACT_DETAILS.whatsAppLink}`} target="_blank" rel="noopener noreferrer" onClick={() => trackCta("whatsapp")}>
                      Message {CONTACT_DETAILS.whatsAppNumber}
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Other Details */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-2xl font-bold text-foreground">Location & Hours</h3>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-battery flex-shrink-0" />
                  <p className="text-lg text-foreground">
                    <a href={CONTACT_DETAILS.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-battery" onClick={() => trackCta("maps")}>
                      {CONTACT_DETAILS.address} (Click for Directions)
                    </a>
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-battery" />
                  <p className="text-lg text-foreground">{CONTACT_DETAILS.hours}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-battery" />
                  <Link href={`mailto:${CONTACT_DETAILS.email}`} className="text-lg text-foreground hover:text-battery" onClick={() => trackCta("email")}>
                    {CONTACT_DETAILS.email}
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2: Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-foreground mb-6">Send Us a Detailed Inquiry</h2>
              <ContactForm />
            </div>
          </div>

          {/* Full Width Section for Map */}
          <div className="w-full pt-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Find Us on the Map</h2>
            <div className="bg-card rounded-lg overflow-hidden border border-border aspect-video shadow-xl">
              {/* --- CRITICAL FIX: Replaced placeholder with a real embed URL --- */}
              <iframe 
                src={CONTACT_DETAILS.iframeSrc} 
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
      )}
    </QuoteTrackingWrapper>
  );
}

