import { JsonLd } from "@/components/seo/JsonLd";
import { createFaqSchema } from "@/lib/seo/schema";

type FaqSchemaProps = {
  items: Array<{ question: string; answer: string }>;
  id?: string;
};

export default function FaqSchema({ items, id = "faq-schema" }: FaqSchemaProps) {
  if (items.length === 0) return null;
  return <JsonLd data={createFaqSchema(items)} id={id} />;
}
