import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BATTERY_619_SPECS } from "@/data/battery-619";
import FaqSchema from "@/components/seo/FaqSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import {
  Battery619Hero,
  Battery619IntentLinks,
  Battery619TrustStrip,
} from "@/components/content/Battery619Sections";

const DIMENSION_FAQ = [
  {
    question: "619 battery dimensions?",
    answer: `Standard 619 batteries measure approximately ${BATTERY_619_SPECS.dimensions} (length × width × height). Always confirm clamp height and terminal orientation before buying a replacement.`,
  },
  {
    question: "619 battery terminal layout?",
    answer:
      "Most 619 batteries sold in South Africa use standard automotive terminal layout with positive and negative posts on the long side. Terminal position can vary by vehicle bracket — we verify fitment before installation.",
  },
  {
    question: "Will a 619 battery fit my bonnet insulation?",
    answer:
      "619 is a low-profile compact code designed for small engine bays. If your vehicle specifies 619, the case height should clear factory bonnet insulation. We measure in-store or on-site if you are unsure.",
  },
];

export const metadata: Metadata = buildPageMetadata({
  title: "619 Battery Dimensions & Terminal Layout | Size Guide",
  description:
    "619 battery dimensions: 207×175×175 mm, terminal layout guide, weight, and fitment notes for Toyota Tazz, Polo Vivo, and compact cars in Alberton.",
  path: "/619-battery-dimensions",
  keywords: [
    "619 battery dimensions",
    "619 battery terminal layout",
    "619 battery size mm",
    "619 battery length width height",
  ],
});

export default function Battery619DimensionsPage() {
  return (
    <div className="space-y-4 pb-16">
      <FaqSchema id="619-dimensions-faq" items={DIMENSION_FAQ} />
      <BreadcrumbSchema
        id="619-dimensions-breadcrumb"
        items={[
          { name: "Home", item: "/" },
          { name: "619 Car Battery", item: "/619-car-battery" },
          { name: "619 Dimensions", item: "/619-battery-dimensions" },
        ]}
      />

      <Battery619Hero
        title="619 Battery Dimensions & Terminal Layout"
        subtitle="Physical size reference for 619 batteries — critical for bonnet clearance, hold-down brackets, and correct terminal orientation."
        trackingId="619-dimensions-call"
      />
      <Battery619TrustStrip />

      <section className="container py-10">
        <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Physical dimensions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border p-5 bg-background">
              <p className="text-sm text-muted-foreground">Length</p>
              <p className="text-3xl font-bold text-foreground">207 mm</p>
            </div>
            <div className="rounded-xl border border-border p-5 bg-background">
              <p className="text-sm text-muted-foreground">Width</p>
              <p className="text-3xl font-bold text-foreground">175 mm</p>
            </div>
            <div className="rounded-xl border border-border p-5 bg-background">
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="text-3xl font-bold text-foreground">175 mm</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Weight: {BATTERY_619_SPECS.weight}. Technology: {BATTERY_619_SPECS.technology}.
          </p>

          <h3 className="text-xl font-bold text-foreground">Terminal layout</h3>
          <p className="text-muted-foreground">{BATTERY_619_SPECS.terminalLayout}</p>
          <p className="text-sm text-muted-foreground">
            If you are replacing an older battery, compare terminal position and hold-down lip height. Our
            technicians verify fitment before installation — especially on imported or modified vehicles.
          </p>
          <Link href="/619-battery-specs" className="text-battery font-semibold hover:underline">
            Full 619 specifications →
          </Link>
        </div>
      </section>

      <section className="container pb-10">
        <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-5">
          <h2 className="text-2xl font-bold text-foreground">619 dimension FAQs</h2>
          {DIMENSION_FAQ.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-bold text-foreground">{faq.question}</h3>
              <p className="text-muted-foreground mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="container">
        <Battery619IntentLinks />
      </div>
    </div>
  );
}
