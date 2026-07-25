import type { Metadata } from "next";
import { Inter, Montserrat, Oswald, Poppins, Teko } from "next/font/google";
import StudioGate from "@/components/studio/StudioGate";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
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

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const teko = Teko({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-teko",
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
    <div
      className={`${montserrat.variable} ${oswald.variable} ${inter.variable} ${poppins.variable} ${teko.variable}`}
    >
      <StudioGate>{children}</StudioGate>
    </div>
  );
}
