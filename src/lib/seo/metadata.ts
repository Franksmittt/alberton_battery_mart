import type { Metadata } from "next";
import { canonicalFor, toAbsoluteUrl } from "@/lib/seo/canonical";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  imagePath?: string;
  imageAlt?: string;
  locale?: string;
  siteName?: string;
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  imagePath = "/images/og-image.jpg",
  imageAlt,
  locale = "en_ZA",
  siteName = "Alberton Battery Mart",
  robots,
}: BuildPageMetadataInput): Metadata {
  const url = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(imagePath);

  return {
    title,
    description,
    keywords,
    robots,
    openGraph: {
      title,
      description,
      url,
      type,
      locale,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: canonicalFor(path),
  };
}
