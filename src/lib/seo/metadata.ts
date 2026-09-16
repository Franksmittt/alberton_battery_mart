import type { Metadata } from "next";
import { canonicalFor, toAbsoluteUrl } from "@/lib/seo/canonical";
import { metadataTitle, normalizeDocumentTitle } from "@/lib/seo/page-title";

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
  markdownPath?: string;
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
  markdownPath,
}: BuildPageMetadataInput): Metadata {
  const url = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(imagePath);

  const documentTitle = normalizeDocumentTitle(title);

  return {
    title: metadataTitle(title),
    description,
    keywords,
    robots,
    openGraph: {
      title: documentTitle,
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
      title: documentTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      ...canonicalFor(path),
      ...(markdownPath
        ? { types: { "text/markdown": toAbsoluteUrl(markdownPath) } }
        : {}),
    },
  };
}
