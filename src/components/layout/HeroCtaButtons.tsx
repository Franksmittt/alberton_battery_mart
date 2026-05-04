"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";
import { pushDataLayerEvent } from "@/lib/analytics";

type HeroCtaButtonsProps = {
  variant: "control" | "variant";
};

const EMERGENCY_PHONE_DISPLAY = "010 109 6211";
const EMERGENCY_PHONE_LINK = "0101096211";
const WHATSAPP_NUMBER_LINK = "27823046926";

export function HeroCtaButtons({ variant }: HeroCtaButtonsProps) {
  useEffect(() => {
    pushDataLayerEvent("hero_view", { bucket: variant });
  }, [variant]);

  const handleClick = (action: "call" | "whatsapp") => {
    pushDataLayerEvent("hero_cta_click", {
      bucket: variant,
      action,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2.5 sm:gap-3">
      {/* Primary CTA: Call - Battery Red, High Contrast, Maximum Urgency */}
      <Button
        asChild
        size="default"
        variant="battery"
        className="shadow-2xl shadow-battery/50 hover:shadow-battery/70 w-full sm:w-auto sm:min-w-[200px] font-black text-sm md:text-base transition-all hover:scale-105 h-11 md:h-12"
      >
        <a
          href={`tel:${EMERGENCY_PHONE_LINK}`}
          className="flex items-center justify-center space-x-2"
          onClick={() => handleClick("call")}
        >
          <Phone className="h-4 w-4 md:h-5 md:w-5" />
          <span>
            {variant === "variant" ? "CALL: Book Diagnostic" : "CALL NOW: Immediate Service"}
          </span>
        </a>
      </Button>

      {/* Secondary CTA: WhatsApp - Brand Green, Platform Association */}
      <Button
        asChild
        size="default"
        variant="secondary"
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white w-full sm:w-auto sm:min-w-[200px] shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 font-black text-sm md:text-base transition-all hover:scale-105 h-11 md:h-12"
      >
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER_LINK}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2"
          onClick={() => handleClick("whatsapp")}
        >
          <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
          <span>WhatsApp Expert: Get Quote</span>
        </a>
      </Button>
    </div>
  );
}

