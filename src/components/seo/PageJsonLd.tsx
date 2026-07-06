import { JsonLd } from "@/components/seo/JsonLd";
import { BASE_URL } from "@/lib/seo-constants";
import { pageTitleForSchema } from "@/lib/seo/page-title";

type PageJsonLdProps = {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "ContactPage" | "FAQPage" | "CollectionPage";
  id?: string;
};

export function PageJsonLd({
  title,
  description,
  path,
  type = "WebPage",
  id = "page-jsonld",
}: PageJsonLdProps) {
  const url = path === "/" ? BASE_URL : `${BASE_URL}${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    name: pageTitleForSchema(title),
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Alberton Battery Mart",
      url: BASE_URL,
    },
  };

  return <JsonLd data={schema} id={id} />;
}
