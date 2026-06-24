import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BATTERY_619_SPECS, BATTERY_619_VEHICLES } from "@/data/battery-619";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import {
  Battery619FaqSection,
  Battery619Hero,
  Battery619IntentLinks,
  Battery619SpecTable,
  Battery619TrustStrip,
} from "@/components/content/Battery619Sections";

const SPECS_FAQ = [
  {
    question: "619 battery specs 12V 36Ah?",
    answer: `The 619 family is 12V. Willard 619 is rated at 43Ah and Exide 619CE at 42Ah — both above the older 36Ah reference some catalogues use. CCA ratings are ${BATTERY_619_SPECS.ccaRange}.`,
  },
  {
    question: "619 automotive battery cold cranking amps?",
    answer:
      "Willard 619 delivers 325 CCA (SANS) and Exide 619CE delivers 314 CCA. This is sufficient for compact petrol engines in Gauteng winter mornings.",
  },
  {
    question: "Maintenance-free 619 battery?",
    answer:
      "Both Willard 619 and Exide 619CE are maintenance-free sealed SMF batteries. No topping up is required under normal use.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "619 Battery Specs | 12V, Ah, CCA & Dimensions",
  description:
    "Full 619 battery specifications: 12V, 42–43Ah, 314–325 CCA, 207×175×175 mm, maintenance-free. Willard 619 & Exide 619CE specs for Alberton fitment.",
  path: "/619-battery-specs",
  keywords: [
    "619 battery specs 12V 36Ah",
    "619 automotive battery cold cranking amps",
    "maintenance-free 619 battery",
    "619 battery specifications south africa",
  ],
});

export default function Battery619SpecsPage() {
  return (
    <div className="space-y-4 pb-16">
      <FaqSchema id="619-specs-faq" items={SPECS_FAQ} />
      <BreadcrumbSchema
        id="619-specs-breadcrumb"
        items={[
          { name: "Home", item: "/" },
          { name: "619 Car Battery", item: "/619-car-battery" },
          { name: "619 Specs", item: "/619-battery-specs" },
        ]}
      />

      <Battery619Hero
        title="619 Battery Specifications"
        subtitle="Technical reference for the 619 battery code: voltage, amp-hours, cold cranking amps, dimensions, and maintenance-free technology."
        trackingId="619-specs-call"
      />
      <Battery619TrustStrip />
      <Battery619SpecTable />

      <section className="container py-10">
        <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Compatible vehicles</h2>
          <p className="text-muted-foreground">
            The 619 footprint fits compact hatchbacks and sedans including {BATTERY_619_VEHICLES.join(", ")}.
          </p>
          <Link href="/619-battery-dimensions" className="text-battery font-semibold hover:underline">
            View 619 dimensions & terminal layout →
          </Link>
        </div>
      </section>

      <Battery619FaqSection items={SPECS_FAQ} title="619 Technical FAQs" />
      <div className="container">
        <Battery619IntentLinks />
      </div>
    </div>
  );
}
