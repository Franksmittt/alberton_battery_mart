import Link from "next/link";
import type { ReactNode } from "react";
import { Battery, MapPin, Phone, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import IntentLinks from "@/components/seo/IntentLinks";
import {
  BATTERY_619_SPECS,
  BATTERY_619_VEHICLES,
  type Battery619Suburb,
} from "@/data/battery-619";
import type { ProductCardData } from "@/data/products";
import { formatProductPrice } from "@/lib/formatting";

const PHONE_LINK = "0101096211";
const PHONE_DISPLAY = "010 109 6211";

export function Battery619Hero({
  title,
  subtitle,
  trackingId = "619-hero-call",
}: {
  title: ReactNode;
  subtitle: string;
  trackingId?: string;
}) {
  return (
    <section className="bg-card border-b border-border py-16 md:py-20">
      <div className="container max-w-4xl text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Battery className="h-8 w-8 text-battery" />
          <span className="text-battery font-bold uppercase tracking-wider text-sm">
            619 Battery Specialists · Alberton
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="xl" variant="battery" trackingId={trackingId}>
            <a href={`tel:${PHONE_LINK}`} className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call {PHONE_DISPLAY}
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-green-600 hover:bg-green-700 text-white">
            <a
              href="https://wa.me/27823046926?text=Hi,%20I%20need%20a%20619%20battery%20in%20Alberton."
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp quote
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Battery619TrustStrip() {
  const items = [
    "Free alternator & starter testing",
    "Up to 25-month warranty",
    "Mobile fitment across Alberton",
    "Scrap exchange included",
  ];
  return (
    <section className="container py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-border bg-card/50 px-4 py-3 text-sm font-semibold text-foreground flex items-center gap-2"
          >
            <ShieldCheck className="h-4 w-4 text-battery shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export function Battery619SpecTable() {
  const rows = [
    ["Voltage", BATTERY_619_SPECS.voltage],
    ["Capacity", BATTERY_619_SPECS.ahRange],
    ["Cold cranking amps (CCA)", BATTERY_619_SPECS.ccaRange],
    ["Dimensions (L × W × H)", BATTERY_619_SPECS.dimensions],
    ["Weight", BATTERY_619_SPECS.weight],
    ["Technology", BATTERY_619_SPECS.technology],
    ["Terminal layout", BATTERY_619_SPECS.terminalLayout],
  ];
  return (
    <section className="container py-10">
      <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-foreground">619 Battery Specifications</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm md:text-base border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 font-bold text-foreground">Specification</th>
                <th className="py-3 font-bold text-foreground">619 size</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label} className="border-b border-border/70">
                  <td className="py-3 pr-4 text-muted-foreground">{label}</td>
                  <td className="py-3 font-medium text-foreground">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Need terminal layout or dimension diagrams? See our{" "}
          <Link href="/619-battery-dimensions" className="text-battery font-semibold hover:underline">
            619 battery dimensions guide
          </Link>{" "}
          and{" "}
          <Link href="/619-battery-specs" className="text-battery font-semibold hover:underline">
            full 619 specs page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export function Battery619ProductCards({
  products,
}: {
  products: ProductCardData[];
}) {
  if (!products.length) return null;
  return (
    <section className="container py-10 space-y-6">
      <h2 className="text-3xl font-bold text-foreground">619 Batteries In Stock</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-border bg-card p-6 space-y-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-battery/15 px-2 py-1 text-xs font-bold text-battery uppercase">
                In stock
              </span>
              <span className="text-sm text-muted-foreground">{product.brandName}</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.popularFits}</p>
            <dl className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Capacity</dt>
                <dd className="font-bold">{product.ahCapacity}Ah</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">CCA</dt>
                <dd className="font-bold">{product.cca}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Warranty</dt>
                <dd className="font-bold">{product.warrantyMonths} mo</dd>
              </div>
            </dl>
            <p className="text-2xl font-extrabold text-battery">
              {formatProductPrice(product.sellingPrice_OUTPUT)}
            </p>
            <p className="text-xs text-muted-foreground">Scrap exchange required · Free fitment</p>
            <Button asChild variant="battery">
              <Link href={`/products/id/${product.id}`}>View {product.sku} details</Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Battery619VehicleList() {
  return (
    <section className="container py-10">
      <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Popular 619 Vehicle Fitments</h2>
        <p className="text-muted-foreground">
          The 619 code is the go-to size for compact South African commuters. Common fitments include:
        </p>
        <ul className="grid sm:grid-cols-2 gap-2 text-foreground">
          {BATTERY_619_VEHICLES.map((vehicle) => (
            <li key={vehicle} className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-battery" />
              {vehicle}
            </li>
          ))}
        </ul>
        <Button asChild variant="outline">
          <Link href="/vehicles/volkswagen/polo-vivo">Polo Vivo battery guide</Link>
        </Button>
      </div>
    </section>
  );
}

export function Battery619SuburbGrid() {
  const suburbs = [
    { slug: "brackenhurst", name: "Brackenhurst" },
    { slug: "new-redruth", name: "New Redruth" },
    { slug: "meyersdal", name: "Meyersdal" },
    { slug: "brackendowns", name: "Brackendowns" },
    { slug: "verwoerdpark", name: "Verwoerdpark" },
    { slug: "randhart", name: "Randhart" },
    { slug: "alberante", name: "Alberante" },
    { slug: "new-market", name: "New Market" },
  ];
  return (
    <section className="container py-10 space-y-6">
      <h2 className="text-3xl font-bold text-foreground">619 Battery by Alberton Suburb</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {suburbs.map((suburb) => (
          <Link
            key={suburb.slug}
            href={`/619-car-battery/${suburb.slug}`}
            className="rounded-xl border border-border bg-card/50 p-4 hover:border-battery transition-colors"
          >
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-battery mt-1 shrink-0" />
              <div>
                <p className="font-bold text-foreground">{suburb.name}</p>
                <p className="text-sm text-muted-foreground">619 mobile fitment</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Battery619FaqSection({
  items,
  title = "619 Battery FAQs",
}: {
  items: Array<{ question: string; answer: string }>;
  title?: string;
}) {
  return (
    <section className="container py-10">
      <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <div className="space-y-5">
          {items.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-lg font-bold text-foreground">{faq.question}</h3>
              <p className="text-muted-foreground mt-2">{faq.answer}</p>
              <Separator className="mt-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Battery619IntentLinks() {
  return (
    <IntentLinks
      title="619 battery services in Alberton"
      description="Move from size research to mobile fitment, emergency help, or suburb-specific dispatch."
      columnsClassName="md:grid-cols-3"
      links={[
        { href: "/mobile-battery-fitment-alberton", label: "Mobile 619 battery fitment Alberton" },
        { href: "/emergency-battery-replacement-alberton", label: "Emergency 619 battery replacement" },
        { href: "/619-car-battery-price", label: "619 battery price comparison" },
        { href: "/619-car-battery/willard-619", label: "Willard 619 battery Alberton" },
        { href: "/619-car-battery/exide-619", label: "Exide 619 / 619CE battery" },
        { href: "/services/mobile-battery-replacement/alberton", label: "Mobile battery replacement Alberton" },
        { href: "/services/free-battery-testing/alberton", label: "Free battery testing Alberton" },
        { href: "/products/size/619", label: "Shop all 619 size batteries" },
      ]}
    />
  );
}

export function Battery619SuburbDetails({ suburb }: { suburb: Battery619Suburb }) {
  return (
    <section className="container py-10 grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Coverage in {suburb.name}</h2>
        <p className="text-muted-foreground">{suburb.summary}</p>
        <p className="text-sm font-semibold text-foreground">
          Typical mobile response: {suburb.responseWindow}
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card/40 p-6 space-y-4 text-sm">
        <div>
          <p className="font-bold text-foreground mb-2">Key roads</p>
          <p className="text-muted-foreground">{suburb.roads.join(" · ")}</p>
        </div>
        <div>
          <p className="font-bold text-foreground mb-2">Landmarks</p>
          <p className="text-muted-foreground">{suburb.landmarks.join(" · ")}</p>
        </div>
        <div>
          <p className="font-bold text-foreground mb-2">Common 619 vehicles</p>
          <p className="text-muted-foreground">{suburb.vehicles.join(", ")}</p>
        </div>
      </div>
    </section>
  );
}
