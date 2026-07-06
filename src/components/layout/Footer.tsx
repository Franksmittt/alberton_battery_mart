import Link from "next/link";
import { MapPin, MessageSquare, Phone } from "lucide-react";
import { getAllClusterConfigs } from "@/lib/battery-sizes/clusters";

import {
  PHONE_DISPLAY,
  PHONE_TEL,
  STORE_ADDRESS_SHORT,
  STORE_MAPS_URL,
  WHATSAPP_URL,
} from "@/lib/seo-constants";

const SIZE_HUBS = getAllClusterConfigs();

const SHOP_LINKS = [
  { href: "/products/type/automotive", label: "Car batteries" },
  { href: "/products/type/performance", label: "AGM / Start-Stop" },
  { href: "/products/type/truck-commercial", label: "Commercial" },
  { href: "/products", label: "All products" },
] as const;

const AREA_LINKS = [
  { href: "/local/new-redruth", label: "New Redruth" },
  { href: "/local/meyersdal", label: "Meyersdal" },
  { href: "/local/brackenhurst", label: "Brackenhurst" },
  { href: "/local", label: "All areas" },
] as const;

const footerLinkClass =
  "underline decoration-white/25 underline-offset-2 transition-colors hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-bg)]";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[var(--brand-border)] bg-[var(--brand-bg)] text-white">
      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {/* Brand + quick contact */}
          <div className="space-y-4 lg:col-span-4">
            <div>
              <p className="text-lg font-black tracking-tight">Alberton Battery Mart</p>
              <p className="mt-1 text-sm text-[var(--brand-muted-2)]">
                Mobile fitment available · Free testing · Warranty backed
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-semibold transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
              >
                <Phone className="h-3.5 w-3.5" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-[var(--brand-success)] px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-success-hover)]"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
            <a
              href="https://www.google.com/maps/place/Alberton+Battery+Mart/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 text-sm text-[var(--brand-muted-2)] transition-colors hover:text-white"
            >
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {STORE_ADDRESS_SHORT}
            </a>
            <p className="text-xs text-[var(--brand-muted-3)]">
              Mon–Fri 08:00–17:00 · Sat 08:00–12:00
            </p>
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--brand-muted-3)]">
              Shop
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--brand-muted-2)]">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div className="lg:col-span-2">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--brand-muted-3)]">
              Areas
            </p>
            <ul className="space-y-1.5 text-sm text-[var(--brand-muted-2)]">
              {AREA_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/mobile-battery-fitment-alberton" className={footerLinkClass}>
                  Mobile fitment
                </Link>
              </li>
            </ul>
          </div>

          {/* Size guides — compact inline */}
          <div className="lg:col-span-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--brand-muted-3)]">
              Battery size guides
            </p>
            <div className="flex flex-wrap gap-x-1 gap-y-1 text-sm text-[var(--brand-muted-2)]">
              {SIZE_HUBS.map((cluster, index) => (
                <span key={cluster.code}>
                  <Link
                    href={cluster.hubPath}
                    className={`${footerLinkClass} hover:text-[var(--brand-accent)] hover:decoration-[var(--brand-accent)]`}
                  >
                    {cluster.code}
                  </Link>
                  {index < SIZE_HUBS.length - 1 ? (
                    <span className="text-[var(--brand-muted-3)]"> · </span>
                  ) : null}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--brand-muted-2)]">
              <Link href="/services" className={footerLinkClass}>
                Services
              </Link>
              <Link href="/fitment" className={footerLinkClass}>
                Fitment lookup
              </Link>
              <Link
                href="/reviews"
                data-track-event="footer_reviews_click"
                className={footerLinkClass}
              >
                Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--brand-border)] bg-[var(--brand-bg-soft)]">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-center text-xs text-[var(--brand-muted-3)] sm:px-6 md:flex-row md:text-left">
          <span>
            © {new Date().getFullYear()} Alberton Battery Mart ·{" "}
            <a
              href="https://www.endpointmedia.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[var(--brand-muted-2)] ${footerLinkClass}`}
            >
              Endpoint Media
            </a>
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="#" className={footerLinkClass}>
              Privacy
            </Link>
            <Link href="#" className={footerLinkClass}>
              Terms
            </Link>
            <Link href="#" className={footerLinkClass}>
              POPIA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
