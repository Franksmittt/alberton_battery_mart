import { JsonLd } from "@/components/seo/JsonLd";
import { createProductSchema } from "@/lib/seo/schema";

type ProductSchemaProps = {
  id?: string;
  name: string;
  description: string;
  sku: string;
  brand: string;
  image: string;
  url: string;
  price?: string | number;
  priceCurrency?: string;
  availability?: string;
  additionalProperty?: Array<{ name: string; value: string | number }>;
  manufacturerId?: string;
  aggregateRating?: {
    ratingValue: string | number;
    reviewCount: string | number;
  };
  scriptId?: string;
};

export default function ProductSchema({
  scriptId = "product-schema",
  ...props
}: ProductSchemaProps) {
  return <JsonLd data={createProductSchema(props)} id={scriptId} />;
}
