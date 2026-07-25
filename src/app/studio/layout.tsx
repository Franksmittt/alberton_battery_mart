import type { Metadata } from "next";
import StudioGate from "@/components/studio/StudioGate";

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
  return <StudioGate>{children}</StudioGate>;
}
