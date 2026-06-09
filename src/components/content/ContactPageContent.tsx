"use client";

import { ArrowUpRight, Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
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
        <main className="bg-[#0D0D0D] text-white">
          <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(229,57,53,0.22),transparent_32%),linear-gradient(135deg,#0D0D0D_0%,#121212_58%,#050505_100%)]">
            <div className="container px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div className="space-y-10">
                  <div className="space-y-6">
                    <p className="text-xs font-black uppercase tracking-[0.32em] text-[var(--brand-accent)]">
                      Alberton headquarters
                    </p>
                    <h1 className="max-w-3xl text-[clamp(3.2rem,8vw,7.5rem)] font-black leading-[0.9] tracking-[-0.08em] text-white">
                      Talk to the battery team that actually tests first.
                    </h1>
                    <p className="max-w-2xl text-lg font-medium leading-8 text-white/62 md:text-xl">
                      Call for urgent mobile fitment, send a detailed request for a quote, or route directly to 28 St Columb Rd in New Redruth. Every enquiry is handled by the local Alberton team.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href={`tel:${CONTACT_DETAILS.primaryPhone}`}
                      data-cta-tracked="true"
                      onClick={() => trackCta("call")}
                      className="group border border-white/12 bg-white/[0.04] p-5 transition-colors hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)]"
                    >
                      <div className="mb-8 flex items-center justify-between">
                        <Phone className="h-5 w-5 text-[var(--brand-accent)] transition-colors group-hover:text-white" />
                        <ArrowUpRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-white" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45 group-hover:text-white/75">Call now</p>
                      <p className="mt-2 text-2xl font-black tracking-tight text-white">{CONTACT_DETAILS.primaryPhone}</p>
                    </a>

                    <a
                      href={`https://wa.me/${CONTACT_DETAILS.whatsAppLink}`}
                      data-cta-tracked="true"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCta("whatsapp")}
                      className="group border border-white/12 bg-white/[0.04] p-5 transition-colors hover:border-[var(--brand-success)] hover:bg-[var(--brand-success)]"
                    >
                      <div className="mb-8 flex items-center justify-between">
                        <MessageSquare className="h-5 w-5 text-[var(--brand-success)] transition-colors group-hover:text-white" />
                        <ArrowUpRight className="h-5 w-5 text-white/40 transition-colors group-hover:text-white" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45 group-hover:text-white/75">WhatsApp only</p>
                      <p className="mt-2 text-2xl font-black tracking-tight text-white">{CONTACT_DETAILS.whatsAppNumber}</p>
                    </a>
                  </div>

                  <div className="space-y-4 border-t border-white/10 pt-8">
                    {[
                      {
                        icon: MapPin,
                        label: "Visit",
                        value: CONTACT_DETAILS.address,
                        href: CONTACT_DETAILS.mapsLink,
                        action: "maps",
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        value: CONTACT_DETAILS.email,
                        href: `mailto:${CONTACT_DETAILS.email}`,
                        action: "email",
                      },
                      {
                        icon: Clock,
                        label: "Hours",
                        value: CONTACT_DETAILS.hours,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      const content = (
                        <div className="flex gap-4 border border-white/10 bg-black/20 p-4">
                          <Icon className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--brand-accent)]" />
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{item.label}</p>
                            <p className="mt-1 text-base font-bold leading-6 text-white">{item.value}</p>
                          </div>
                        </div>
                      );

                      return item.href ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          data-cta-tracked="true"
                          onClick={() => trackCta(item.action || item.label.toLowerCase())}
                          className="block transition-transform hover:-translate-y-0.5"
                        >
                          {content}
                        </a>
                      ) : (
                        <div key={item.label}>{content}</div>
                      );
                    })}
                  </div>
                </div>

                <div className="border border-white/12 bg-[#121212]/95 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:p-6 lg:sticky lg:top-36">
                  <div className="mb-8 border-b border-white/10 pb-6">
                    <p className="text-xs font-black uppercase tracking-[0.26em] text-[var(--brand-accent)]">Send request</p>
                    <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
                      Get a call back or written quote.
                    </h2>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white px-4 py-10 text-[#0D0D0D] sm:px-6 lg:px-8">
            <div className="container">
              <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--brand-accent)]">Find us</p>
                  <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] md:text-6xl">28 St Columb Rd.</h2>
                </div>
                <Link href="/local/new-redruth" className="font-black uppercase tracking-[0.12em] text-[#0D0D0D] underline decoration-[var(--brand-accent)] decoration-4 underline-offset-8">
                  New Redruth service page
                </Link>
              </div>
              <div className="aspect-[16/9] overflow-hidden border border-black/10 bg-[#121212] shadow-2xl">
                <iframe
                  src={CONTACT_DETAILS.iframeSrc}
                  width="100%"
                  height="100%"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale"
                  title="Google Maps Location of Alberton Battery Mart"
                />
              </div>
            </div>
          </section>
        </main>
      )}
    </QuoteTrackingWrapper>
  );
}

