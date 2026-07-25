import type { Metadata } from "next";
import { Montserrat, Oswald } from "next/font/google";
import StudioGate from "@/components/studio/StudioGate";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "Studio | Alberton Battery Mart",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${montserrat.variable} ${oswald.variable}`}>
      <StudioGate>{children}</StudioGate>
    </div>
  );
}
