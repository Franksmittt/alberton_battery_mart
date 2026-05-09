// src/app/products/[slug]/page.tsx
import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import { getProductDetail, getAllProductSlugs } from "@/data/product-detail";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const product = getProductDetail(params.slug);

  if (!product) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/products/id/${product.id}`,
    },
  };
}

export default function ProductDetailPage({ params }: { params: Params }) {
  const product = getProductDetail(params.slug);

  if (!product) {
    notFound();
  }

  permanentRedirect(`/products/id/${product.id}`);
}

