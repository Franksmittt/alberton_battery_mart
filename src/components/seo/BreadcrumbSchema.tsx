import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema } from "@/lib/seo/schema";

type BreadcrumbItem = {
  name: string;
  item: string;
};

type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
  id?: string;
};

export default function BreadcrumbSchema({
  items,
  id = "breadcrumb-schema",
}: BreadcrumbSchemaProps) {
  return <JsonLd data={createBreadcrumbSchema(items)} id={id} />;
}
