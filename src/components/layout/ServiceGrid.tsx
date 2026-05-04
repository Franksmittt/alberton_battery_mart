"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Car, Zap, ShieldCheck, Clock, Truck, Bike, Battery } from "lucide-react"; 
import { pushDataLayerEvent } from "@/lib/analytics";

// --- UPDATED: New service features with SEO keywords and correct links ---
const SERVICE_FEATURES = [
    {
        title: "Mobile Battery Callout",
        description: "See the full Alberton callout workflow, including Hilux & Ranger fitment examples.",
        icon: Zap,
        href: "/services/mobile-battery-replacement/alberton",
    },
    {
        title: "Car Batteries (AGM/EFB)",
        description: "Compare Willard 652 vs. Exide 668P for Hilux, Ranger, and BMW Start/Stop vehicles.",
        icon: Car,
        href: "/products/type/performance",
    },
    {
        title: "Truck & Commercial",
        description: "Book on-site truck battery fitment for Alrode fleets and see our Willard 658/689 range.",
        icon: Truck,
        href: "/products/type/truck-commercial",
    },
    {
        title: "Motorcycle & Powersport",
        description: "Browse our motorcycle catalog and book a fitment slot for Suzuki Swift or superbike batteries.",
        icon: Bike,
        href: "/products/type/motorcycle",
    },
    {
        title: "Deep Cycle & Solar Power",
        description: "Explore our deep-cycle lineup for inverters and dual-battery setups before visiting the Fortuner guide.",
        icon: Clock,
        href: "/products/type/deep-cycle",
    },
    {
        title: "Golf Cart Batteries",
        description: "Professional golf cart battery replacement and lithium conversions for estate carts. Trojan, Enertec, Club Car, EZGO, Yamaha.",
        icon: Battery,
        href: "/golf-cart-batteries",
    },
    {
        title: "Guaranteed Warranty",
        description: "Understand our 36‑month warranty process and how diagnostics protect your Ranger/Hilux warranties.",
        icon: ShieldCheck,
        href: "/services/free-battery-testing/alberton",
    },
];

const ServiceGrid = () => {
    useEffect(() => {
        pushDataLayerEvent("service_grid_view");
    }, []);

    const handleClick = (title: string, href: string) => {
        pushDataLayerEvent("service_grid_click", { title, href });
    };

    return (
        <section className="electric-section relative py-20">
            <div className="electric-grid-overlay"></div>
            <div className="electric-lightning lightning-one"></div>
            <div className="electric-lightning lightning-two"></div>
            <div className="electric-lightning lightning-three"></div>

            <div className="container relative z-10 space-y-12">
                <div className="text-center space-y-4">
                    <span className="inline-flex items-center justify-center px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase bg-white/5 text-white/70 rounded-full border border-white/10">
                        Energy Field Verified
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Your Trusted <span className="text-battery">Mobile Power</span> Specialists
                    </h2>
                    <p className="text-lg text-white/70 max-w-3xl mx-auto">
                        We don't just sell batteries; we engineer mobile power systems with certified fitment, diagnostics, and technical mastery for every vehicle and energy requirement.
                    </p>
                </div>

                {/* --- UPDATED: Grid now supports 7 items gracefully --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICE_FEATURES.map((feature, index) => (
                        <Link key={index} href={feature.href} passHref className="group block h-full">
                            <Card className="electric-card h-full cursor-pointer border border-white/10 bg-[rgba(12,12,12,0.85)] backdrop-blur">
                                <CardContent className="p-6 space-y-4 relative z-10" onClick={() => handleClick(feature.title, feature.href)}>
                                    <div className="flex items-center justify-between">
                                        <feature.icon className="electric-icon h-8 w-8 text-battery transition-all duration-300" />
                                        <div className="w-2 h-2 rounded-full bg-battery shadow-[0_0_20px_rgba(192,0,0,0.8)] animate-pulse"></div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white transition-all duration-300">
                                         {feature.title}
                                    </h3>
                                    <p className="text-sm text-white/70 leading-relaxed">
                                         {feature.description}
                                    </p>

                                    {/* Electric bolts */}
                                    <span className="electric-bolt"></span>
                                    <span className="electric-bolt"></span>
                                    <span className="electric-bolt"></span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceGrid;