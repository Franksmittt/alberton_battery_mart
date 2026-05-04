"use client";

import { ReactNode, useEffect } from "react";
import { pushDataLayerEvent } from "@/lib/analytics";
import { usePathname } from "next/navigation";

type Props = {
  bucket: "control" | "variant";
  viewEventName?: string;
  ctaEventName?: string;
  children: (handlers: { trackCta: (action: string) => void }) => ReactNode;
};

export default function QuoteTrackingWrapper({
  bucket,
  viewEventName = "quote_page_view",
  ctaEventName = "quote_page_cta_click",
  children,
}: Props) {
  const pathname = usePathname();

  useEffect(() => {
    pushDataLayerEvent(viewEventName, { bucket, pathname });
  }, [bucket, pathname, viewEventName]);

  const trackCta = (action: string) => {
    pushDataLayerEvent(ctaEventName, { action, bucket });
  };

  return <>{children({ trackCta })}</>;
}

