import { toAbsoluteUrl } from "@/lib/seo/canonical";

type BreadcrumbItemInput = {
  name: string;
  item: string;
};

type FaqItemInput = {
  question: string;
  answer: string;
};

type ProductPropertyInput = {
  name: string;
  value: string | number;
};

type ProductSchemaInput = {
  id?: string;
  name: string;
  description: string;
  sku: string;
  brand: string;
  image: string;
  url: string;
  price: string | number;
  priceCurrency?: string;
  availability?: string;
  additionalProperty?: ProductPropertyInput[];
  manufacturerId?: string;
  aggregateRating?: {
    ratingValue: string | number;
    reviewCount: string | number;
  };
};

const markdownTokenPattern = /\*\*|__|`/g;

function stripMarkdown(text: string): string {
  return text.replace(markdownTokenPattern, "").trim();
}

export function createBreadcrumbSchema(items: BreadcrumbItemInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.item),
    })),
  };
}

export function createFaqSchema(items: FaqItemInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: stripMarkdown(faq.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripMarkdown(faq.answer),
      },
    })),
  };
}

export function createProductSchema(input: ProductSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    ...(input.id ? { "@id": toAbsoluteUrl(input.id) } : {}),
    name: input.name,
    description: input.description,
    sku: input.sku,
    image: toAbsoluteUrl(input.image),
    brand: {
      "@type": "Brand",
      name: input.brand,
    },
    ...(input.manufacturerId ? { manufacturer: { "@id": input.manufacturerId } } : {}),
    offers: {
      "@type": "Offer",
      price: String(input.price),
      priceCurrency: input.priceCurrency || "ZAR",
      availability: input.availability || "https://schema.org/InStock",
      url: toAbsoluteUrl(input.url),
    },
    ...(input.additionalProperty && input.additionalProperty.length > 0
      ? {
          additionalProperty: input.additionalProperty.map((property) => ({
            "@type": "PropertyValue",
            name: property.name,
            value: String(property.value),
          })),
        }
      : {}),
    ...(input.aggregateRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(input.aggregateRating.ratingValue),
            reviewCount: String(input.aggregateRating.reviewCount),
          },
        }
      : {}),
  };
}
