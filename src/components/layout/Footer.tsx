// src/components/layout/Footer.tsx
import Link from "next/link";
import { Battery, Facebook, Instagram, Phone, Mail, MapPin, MessageSquare, Truck, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const PRIMARY_PHONE = "010 109 6211";
  const EMAIL_ADDRESS = "admin@albertonbatterymart.co.za";
  const ADDRESS = "28 St Columb Rd, New Redruth, Alberton, 1450";
  const WEEKDAY_HOURS = "08:00 AM – 5:00 PM";
  const SATURDAY_HOURS = "08:00 AM – 12:00 PM";
  const WHATSAPP_NUMBER_LINK = "27823046926";
  const AGENCY_NAME = "Endpoint Media";
  const AGENCY_URL = "https://www.endpointmedia.co.za";

  const footerLinks = [
    {
      title: "Products & Services",
      links: [
        { href: "/products/type/automotive", label: "Car Batteries" },
        { href: "/products/type/truck-commercial", label: "Truck & Commercial" }, 
        { href: "/products/type/motorcycle", label: "Motorcycle Batteries" }, 
        { href: "/products/type/deep-cycle", label: "Deep Cycle & Solar" }, 
        { href: "/golf-cart-batteries", label: "Golf Cart Batteries" },
        { href: "/services", label: "Mobile Fitment" },
        { href: "/testing", label: "Free Battery Testing" },
      ],
    },
    {
      title: "Company & Hours",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/faq", label: "FAQ" },
        { href: "/blog", label: "Blog" }, // <-- ADDED THIS
        { href: "/contact", label: "Contact Us" },
        { label: `Mon-Fri: ${WEEKDAY_HOURS}` },
        { label: `Sat: ${SATURDAY_HOURS}` },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-border bg-background pt-16 pb-6 text-muted-foreground">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">

          {/* Column 1: Logo & Mission Statement (CLEANED) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Battery className="h-6 w-6 text-battery-foreground bg-battery rounded-full p-1" />
              <span className="text-xl font-extrabold tracking-tight text-foreground">
                ALBERTON <span className="text-battery">BATTERY MART</span>
              </span>
            </Link>

            <p className="text-sm">
               The most powerful batteries for the lowest prices. Specialists in reliable power, free on-site testing, and guaranteed friendly service. Our mission is to keep Alberton driving.
            </p>

            <p className="flex items-center space-x-2 text-sm pt-1">
              <Mail className="h-4 w-4 text-battery flex-shrink-0" />
              <Link href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-battery transition-colors">
                {EMAIL_ADDRESS}
              </Link>
            </p>

            <div className="flex space-x-4 pt-2">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 hover:text-battery transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                 <Instagram className="h-5 w-5 hover:text-battery transition-colors" />
              </Link>
            </div>
          </div>

          {/* Columns 2 & 3: Navigation Links & Hours */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href || link.label}>
                    {link.href ? (
                        <Link href={link.href} className="text-sm hover:text-battery transition-colors">
                            {link.label}
                        </Link>
                    ) : (
                        <p className="text-sm">{link.label}</p> 
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Contact & Location */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Contact & Location
            </h3>

            <p className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-battery" />
              <Link href={`tel:${PRIMARY_PHONE.replace(/ /g, '')}`} className="hover:text-battery transition-colors">
                 {PRIMARY_PHONE} 
              </Link>
            </p>

            <p className="flex items-start space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-battery mt-1 flex-shrink-0" />
              <span>{ADDRESS}</span>
            </p>

            <Button asChild variant="secondary" className="mt-4 bg-green-600 hover:bg-green-700 text-white shadow-lg">
              <a href={`https://wa.me/${WHATSAPP_NUMBER_LINK}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Send WhatsApp</span>
              </a>
            </Button>
          </div>

        </div>

        {/* Copyright and Agency Credit Row */}
        <div className="mt-16 border-t border-border pt-6 text-center text-xs space-y-1">
          <div>
             ©{currentYear} Alberton Battery Mart. All rights reserved.
          </div>
          <div className="text-xs text-muted-foreground">
            Designed, Developed & Maintained by 
            <a
              href={AGENCY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-battery transition-colors font-medium"
            >
              {AGENCY_NAME}
            </a>.
          </div>
          <div className="text-xs text-muted-foreground pt-2">
            <Link href="/admin/login" className="hover:text-battery transition-colors">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;