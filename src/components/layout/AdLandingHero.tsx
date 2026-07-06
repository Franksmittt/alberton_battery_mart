import type { ReactNode } from "react";
import { MapPin, MessageSquare, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AD_PRICE_ANCHORS_LINE,
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_ADDRESS_SHORT,
  STORE_MAPS_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/seo-constants";

type AdLandingHeroProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  trackingPrefix?: string;
  className?: string;
};

export function AdLandingHero({
  title,
  subtitle,
  trackingPrefix = "ad-landing",
  className = "",
}: AdLandingHeroProps) {
  return (
    <section
      className={`bg-card border-b border-border py-12 md:py-16 ${className}`}
    >
      <div className="container max-w-4xl text-center space-y-5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        ) : null}
        <p className="text-base md:text-lg font-semibold text-battery">
          {AD_PRICE_ANCHORS_LINE}
        </p>
        <p className="text-base text-foreground flex items-center justify-center gap-2 flex-wrap">
          <MapPin className="h-5 w-5 text-battery shrink-0" />
          <span>{STORE_ADDRESS_SHORT}</span>
        </p>
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <Button
            asChild
            size="lg"
            variant="battery"
            trackingId={`${trackingPrefix}-call`}
          >
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call {PHONE_DISPLAY}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-hub-teal hover:bg-hub-teal-hover text-white"
            trackingId={`${trackingPrefix}-whatsapp`}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            trackingId={`${trackingPrefix}-directions`}
          >
            <a
              href={STORE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Navigation className="h-5 w-5" />
              Get Directions
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
