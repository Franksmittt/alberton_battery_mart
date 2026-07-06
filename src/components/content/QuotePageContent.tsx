"use client";

import { Battery, Mail, Phone, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/content/ContactForm";
import QuoteTrackingWrapper from "@/components/layout/QuoteTrackingWrapper";
import { PHONE_TEL } from "@/lib/seo-constants";

const EMAIL_ADDRESS = "admin@albertonbatterymart.co.za";

type QuotePageContentProps = {
  bucket: "control" | "variant";
};

export default function QuotePageContent({ bucket }: QuotePageContentProps) {
  return (
    <QuoteTrackingWrapper
      bucket={bucket}
      viewEventName="quote_page_view"
      ctaEventName="quote_page_cta_click"
    >
      {({ trackCta }) => (
        <div className="container py-16 space-y-12 max-w-4xl">
          <div className="text-center space-y-4">
            <Battery className="h-16 w-16 text-battery mx-auto" />
            <h1 className="text-5xl font-extrabold text-foreground">
              Request a Quote
            </h1>
            <p className="text-2xl text-muted-foreground font-medium">
              For Solar, Inverter, or Bulk Commercial Orders in Alberton.
            </p>
          </div>

          <div className="bg-card border border-border p-8 rounded-lg shadow-lg space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Expert Solutions for Load Shedding & Commercial Needs
            </h2>
            <p className="text-lg text-muted-foreground">
              Don&apos;t just buy a battery; invest in the right power solution.
              Our specialists will analyze your needs—whether for a home inverter,
              full solar setup, or a commercial fleet—and provide a detailed,
              no-obligation quote.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3">
                <Zap className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    AGM & Lithium Experts
                  </h3>
                  <p className="text-muted-foreground">
                    We specialize in Deep Cycle AGM and high-performance Lithium
                    (LiFePO₄) batteries for maximum lifespan.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheck className="h-6 w-6 text-battery flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Multi-Brand Guarantee
                  </h3>
                  <p className="text-muted-foreground">
                    We source from Willard, Enertec, and Exide to build the most
                    cost-effective solution for your budget.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-foreground text-center mb-6">
              Send Us Your Inquiry
            </h3>
            <ContactForm />
          </div>

          <div className="text-center space-y-4 pt-8">
            <p className="text-lg text-foreground">
              For immediate assistance, please call us directly:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="battery">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center space-x-2"
                  onClick={() => trackCta("call")}
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center space-x-2"
                  onClick={() => trackCta("email")}
                >
                  <Mail className="h-5 w-5" />
                  <span>Email Inquiry</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </QuoteTrackingWrapper>
  );
}
