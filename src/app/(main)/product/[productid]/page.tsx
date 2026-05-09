import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getAllProducts } from "@/data/products";

type Props = {
  params: { productid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = Number.parseInt(params.productid, 10);
  const products = await getAllProducts();
  const product = products.find((item) => item.id === productId);

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
      follow: true,
    },
    alternates: {
      canonical: `/products/id/${product.id}`,
    },
  };
}

export default async function LegacyProductRedirectPage({ params }: Props) {
  const productId = Number.parseInt(params.productid, 10);
  const products = await getAllProducts();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  permanentRedirect(`/products/id/${product.id}`);
}
