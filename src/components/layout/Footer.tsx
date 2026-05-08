import Link from "next/link";
import { MessageSquare } from "lucide-react";

const Footer = () => {
  const WHATSAPP_NUMBER_LINK = "27823046926";

  return (
    <footer className="w-full bg-[#0a0a0a] text-white">
      <div className="border-b border-[#2a2a2a] px-6 py-24 text-center">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-10 text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-[-2px] leading-[1.05]">
            Stranded?
            <br />
            We are on it.
          </h2>
          <a
            href="tel:0101096211"
            className="inline-flex items-center justify-center rounded-full bg-white px-14 py-5 text-[1.2rem] font-black uppercase tracking-[0.5px] text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E53935] hover:text-white hover:shadow-[0_10px_20px_rgba(229,57,53,0.2)]"
          >
            Dispatch Technician
          </a>
        </div>
      </div>

      <div className="bg-[#121212] py-20 pb-8">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="mb-16 grid gap-12 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1.5fr]">
            <div className="space-y-6 md:col-span-2 xl:col-span-1">
              <h3 className="text-[1.8rem] font-black tracking-[-1px]">Alberton Battery Mart.</h3>
              <p className="max-w-[320px] text-[#888888] leading-relaxed md:max-w-full">
                Ekurhuleni&apos;s apex mobile fitment service. Delivering 60-minute roadside rescue and advanced BMS
                coding directly to your location.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER_LINK}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-[#E53935] px-6 py-3 font-extrabold uppercase tracking-[1px] text-white transition-colors hover:bg-[#C62828]"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp Rescue
              </a>
            </div>

            <div>
              <h4 className="mb-6 text-[1.1rem] font-bold text-white">Categories</h4>
              <ul className="space-y-3 text-[0.95rem] text-[#888888]">
                <li>
                  <Link href="/products/type/automotive" className="transition-all hover:pl-1 hover:text-[#E53935]">
                    Passenger & Sedans
                  </Link>
                </li>
                <li>
                  <Link href="/products/type/performance" className="transition-all hover:pl-1 hover:text-[#E53935]">
                    Start/Stop (AGM)
                  </Link>
                </li>
                <li>
                  <Link href="/products/type/automotive" className="transition-all hover:pl-1 hover:text-[#E53935]">
                    Bakkie & SUV
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/type/truck-commercial"
                    className="transition-all hover:pl-1 hover:text-[#E53935]"
                  >
                    Commercial Fleet
                  </Link>
                </li>
                <li>
                  <Link href="/products/type/motorcycle" className="transition-all hover:pl-1 hover:text-[#E53935]">
                    Powersports
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-[1.1rem] font-bold text-white">Service Hubs</h4>
              <ul className="space-y-3 text-[0.95rem] text-[#888888]">
                <li>
                  <Link href="/local/alberton-central" className="transition-all hover:pl-1 hover:text-[#E53935]">
                    Alberton Central
                  </Link>
                </li>
                <li>
                  <Link href="/local/meyersdal" className="transition-all hover:pl-1 hover:text-[#E53935]">
                    Meyersdal
                  </Link>
                </li>
                <li>
                  <Link href="/local/brackenhurst" className="transition-all hover:pl-1 hover:text-[#E53935]">
                    Brackenhurst
                  </Link>
                </li>
                <li>
                  <Link href="/local/alrode-south" className="transition-all hover:pl-1 hover:text-[#E53935]">
                    Alrode Industrial
                  </Link>
                </li>
                <li>
                  <Link href="/local/new-redruth" className="transition-all hover:pl-1 hover:text-[#E53935]">
                    New Redruth
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-[1.1rem] font-bold text-white">Contact Us</h4>
              <ul className="space-y-3 text-[0.95rem] text-[#888888]">
                <li>
                  <a href="tel:0101096211" className="transition-all hover:pl-1 hover:text-[#E53935]">
                    Tel: 010 109 6211
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER_LINK}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all hover:pl-1 hover:text-[#E53935]"
                  >
                    WhatsApp Support
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps/place/Alberton+Battery+Mart/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all hover:pl-1 hover:text-[#E53935]"
                  >
                    28 St Columb Rd, Alberton
                  </a>
                </li>
                <li>
                  <span>Mon - Fri: 08:00 AM - 5:00 PM | Sat: 08:00 AM - 12:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-[#2a2a2a] pt-8 text-center text-[0.85rem] text-[#555555] md:flex-row md:text-left">
            <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
              <span>
                © 2026 Alberton Battery Mart. Designed, Developed and Maintained By{" "}
                <a
                  href="https://www.endpointmedia.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888888] transition-colors hover:text-white"
                >
                  Endpoint Media
                </a>
                .
              </span>
              <Link
                href="/login"
                className="inline-flex items-center rounded border border-[#2a2a2a] px-3 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.5px] text-[#888888] transition-colors hover:border-[#444444] hover:text-white"
              >
                Login
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="transition-colors hover:text-white">
                POPIA Compliance
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
