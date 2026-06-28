import Link from "next/link";
import type { ReactNode } from "react";
import { Battery, MapPin, Phone, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import IntentLinks from "@/components/seo/IntentLinks";
import type { ProductCardData } from "@/data/products";
import { formatProductPrice } from "@/lib/formatting";
import {
  brandPageSlug,
  getClusterSuburbs,
} from "@/lib/battery-sizes/content";
import { getAllClusterConfigs } from "@/lib/battery-sizes/clusters";
import type {
  BatterySizeClusterConfig,
  ClusterSuburb,
} from "@/lib/battery-sizes/types";
import {
  getPrimaryProductForBrand,
} from "@/lib/battery-sizes/content";
import { getAllProductsSync } from "@/lib/battery-sizes/products-sync";
import { getProductsBySizeCodeSync } from "@/lib/products/by-size";

const PHONE_LINK = "0101096211";
const PHONE_DISPLAY = "010 109 6211";

export function BatterySizeHero({
  cluster,
  title,
  subtitle,
  trackingId,
}: {
  cluster: BatterySizeClusterConfig;
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
            {cluster.code} Battery Specialists · Alberton
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
              href={`https://wa.me/27823046926?text=Hi,%20I%20need%20a%20${cluster.code}%20battery%20in%20Alberton.`}
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

export function BatterySizeTrustStrip() {
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

export function BatterySizeSpecTable({
  cluster,
}: {
  cluster: BatterySizeClusterConfig;
}) {
  const rows = [
    ["Voltage", cluster.specs.voltage],
    ["Capacity", cluster.specs.ahRange],
    ["Cold cranking amps (CCA)", cluster.specs.ccaRange],
    ["Dimensions (L × W × H)", cluster.specs.dimensions],
    ["Weight", cluster.specs.weight],
    ["Technology", cluster.specs.technology],
    ["Terminal layout", cluster.specs.terminalLayout],
  ];
  return (
    <section className="container py-10">
      <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          {cluster.code} Battery Specifications
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm md:text-base border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-4 font-bold text-foreground">Specification</th>
                <th className="py-3 font-bold text-foreground">{cluster.code} size</th>
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
          <Link
            href={`/${cluster.code}-battery-dimensions`}
            className="text-battery font-semibold hover:underline"
          >
            {cluster.code} battery dimensions guide
          </Link>{" "}
          and{" "}
          <Link
            href={`/${cluster.code}-battery-specs`}
            className="text-battery font-semibold hover:underline"
          >
            full {cluster.code} specs page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export function BatterySizeProductCards({
  cluster,
  products,
}: {
  cluster: BatterySizeClusterConfig;
  products: ProductCardData[];
}) {
  if (!products.length) return null;
  return (
    <section className="container py-10 space-y-6">
      <h2 className="text-3xl font-bold text-foreground">
        {cluster.code} Batteries In Stock
      </h2>
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

export function BatterySizeVehicleList({
  cluster,
}: {
  cluster: BatterySizeClusterConfig;
}) {
  return (
    <section className="container py-10">
      <div className="rounded-2xl border border-border bg-card/40 p-6 md:p-8 space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          Popular {cluster.code} Vehicle Fitments
        </h2>
        <p className="text-muted-foreground">
          Common South African vehicles that use the {cluster.code} battery code include:
        </p>
        <ul className="grid sm:grid-cols-2 gap-2 text-foreground">
          {cluster.vehicleFitments.map((vehicle) => (
            <li key={vehicle} className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-battery" />
              {vehicle}
            </li>
          ))}
        </ul>
        <Button asChild variant="outline">
          <Link href={`/products/size/${cluster.code}`}>
            Shop all {cluster.code} size batteries
          </Link>
        </Button>
      </div>
    </section>
  );
}

export function BatterySizeSuburbGrid({
  cluster,
}: {
  cluster: BatterySizeClusterConfig;
}) {
  const suburbs = getClusterSuburbs(cluster);
  return (
    <section className="container py-10 space-y-6">
      <h2 className="text-3xl font-bold text-foreground">
        {cluster.code} Battery by Alberton Suburb
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {suburbs.map((suburb) => (
          <Link
            key={suburb.slug}
            href={`${cluster.hubPath}/${suburb.slug}`}
            className="rounded-xl border border-border bg-card/50 p-4 hover:border-battery transition-colors"
          >
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-battery mt-1 shrink-0" />
              <div>
                <p className="font-bold text-foreground">{suburb.name}</p>
                <p className="text-sm text-muted-foreground">
                  {cluster.code} mobile fitment
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function BatterySizeFaqSection({
  items,
  title,
}: {
  items: Array<{ question: string; answer: string }>;
  title: string;
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

export function BatterySizeIntentLinks({
  cluster,
}: {
  cluster: BatterySizeClusterConfig;
}) {
  const products = getProductsBySizeCodeSync(
    getAllProductsSync(),
    cluster.code
  );

  const brandLinks = cluster.brands
    .map((brand) => {
      const product = getPrimaryProductForBrand(products, brand);
      if (!product) return null;
      return {
        href: `${cluster.hubPath}/${brandPageSlug(brand, cluster.code)}`,
        label: `${product.brandName} ${cluster.code} battery Alberton`,
      };
    })
    .filter(Boolean) as Array<{ href: string; label: string }>;

  const siblingLinks = getAllClusterConfigs()
    .filter((item) => item.code !== cluster.code)
    .map((item) => ({
      href: item.hubPath,
      label: `${item.code} car battery hub`,
    }));

  return (
    <IntentLinks
      title={`${cluster.code} battery services in Alberton`}
      description="Move from size research to mobile fitment, emergency help, or suburb-specific dispatch."
      columnsClassName="md:grid-cols-3"
      links={[
        { href: "/mobile-battery-fitment-alberton", label: `Mobile ${cluster.code} battery fitment Alberton` },
        { href: "/emergency-battery-replacement-alberton", label: `Emergency ${cluster.code} battery replacement` },
        { href: `/${cluster.code}-car-battery-price`, label: `${cluster.code} battery price comparison` },
        ...brandLinks,
        { href: "/services/mobile-battery-replacement/alberton", label: "Mobile battery replacement Alberton" },
        { href: "/services/free-battery-testing/alberton", label: "Free battery testing Alberton" },
        { href: `/products/size/${cluster.code}`, label: `Shop all ${cluster.code} size batteries` },
        ...siblingLinks.slice(0, 4),
      ]}
    />
  );
}

export function BatterySizeSuburbDetails({
  cluster,
  suburb,
}: {
  cluster: BatterySizeClusterConfig;
  suburb: ClusterSuburb;
}) {
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
          <p className="font-bold text-foreground mb-2">
            Common {cluster.code} vehicles
          </p>
          <p className="text-muted-foreground">{suburb.vehicles.join(", ")}</p>
        </div>
      </div>
    </section>
  );
}

export function BatterySizeSiblingLinks() {
  const clusters = getAllClusterConfigs();
  return (
    <section className="container py-8">
      <div className="rounded-xl border border-border bg-card/40 p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Other popular battery sizes</h2>
        <div className="flex flex-wrap gap-3">
          {clusters.map((cluster) => (
            <Link
              key={cluster.code}
              href={cluster.hubPath}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:border-battery hover:text-battery"
            >
              {cluster.code} car battery
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
