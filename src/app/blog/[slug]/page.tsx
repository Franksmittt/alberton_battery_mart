// src/app/blog/[slug]/page.tsx
import { ALL_POSTS, BlogPost } from "@/data/blog-posts";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import AtomicAnswers from "@/components/seo/AtomicAnswers";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/lib/seo-constants";
import { buildPageMetadata } from "@/lib/seo/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FaqSchema from "@/components/seo/FaqSchema";
import RelatedLinks from "@/components/seo/RelatedLinks";
import HighIntentTemplateBlock from "@/components/blog/HighIntentTemplateBlock";

// --- Helper to find the post ---
const getPostBySlug = (slug: string): BlogPost | undefined => {
  return ALL_POSTS.find(p => p.slug === slug);
};

type LinkItem = { href: string; label: string; description: string };

const SERVICE_LINKS: LinkItem[] = [
  {
    href: "/services/mobile-battery-replacement/alberton",
    label: "Mobile battery replacement in Alberton",
    description: "Fast on-site battery fitment for urgent no-start cases.",
  },
  {
    href: "/services/mobile-battery-replacement/meyersdal",
    label: "Mobile battery replacement in Meyersdal",
    description: "Priority local dispatch for Meyersdal callouts.",
  },
  {
    href: "/services/free-battery-testing/new-redruth",
    label: "Free battery testing in New Redruth",
    description: "Diagnostics-first checks before replacing a battery.",
  },
  {
    href: "/services/emergency-jump-start/alberton-central",
    label: "Emergency jump-start in Alberton Central",
    description: "Immediate recovery route when a vehicle cannot crank.",
  },
];

const PRODUCT_OR_FITMENT_LINKS: LinkItem[] = [
  {
    href: "/products/type/automotive",
    label: "Automotive battery options",
    description: "Compare in-stock daily-driver battery options.",
  },
  {
    href: "/products/type/performance",
    label: "AGM and start/stop battery options",
    description: "Match modern vehicle charging systems correctly.",
  },
  {
    href: "/products/type/truck-commercial",
    label: "Commercial and truck battery range",
    description: "Heavy-duty battery options for fleet and load use.",
  },
  {
    href: "/vehicles/bmw",
    label: "BMW fitment guidance",
    description: "Vehicle-specific fitment and technology guidance.",
  },
  {
    href: "/vehicles/mercedes-benz",
    label: "Mercedes-Benz fitment guidance",
    description: "Battery selection and fitment support by model.",
  },
];

const LOCAL_LINKS: LinkItem[] = [
  {
    href: "/local/alberton-central",
    label: "Battery support in Alberton Central",
    description: "Response windows and local dispatch detail.",
  },
  {
    href: "/local/meyersdal",
    label: "Battery support in Meyersdal",
    description: "Service area detail and common local fitments.",
  },
  {
    href: "/local/new-redruth",
    label: "Battery support in New Redruth",
    description: "Suburb-specific callout support and routing.",
  },
];

function slugHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickBySlug(items: LinkItem[], slug: string): LinkItem {
  return items[slugHash(slug) % items.length];
}

function getServiceLink(post: BlogPost): LinkItem {
  if (post.slug.includes("meyersdal")) return SERVICE_LINKS[1];
  if (post.slug.includes("new-redruth")) return SERVICE_LINKS[2];
  if (post.slug.includes("dead") || post.slug.includes("stranded")) return SERVICE_LINKS[3];
  return pickBySlug(SERVICE_LINKS, post.slug);
}

function getProductOrFitmentLink(post: BlogPost): LinkItem {
  if (post.slug.includes("bmw")) return PRODUCT_OR_FITMENT_LINKS[3];
  if (post.slug.includes("mercedes")) return PRODUCT_OR_FITMENT_LINKS[4];
  if (post.slug.includes("agm") || post.slug.includes("efb")) return PRODUCT_OR_FITMENT_LINKS[1];
  if (post.slug.includes("truck") || post.slug.includes("fleet")) return PRODUCT_OR_FITMENT_LINKS[2];
  return pickBySlug(PRODUCT_OR_FITMENT_LINKS, post.slug);
}

function getLocalLink(post: BlogPost): LinkItem {
  if (post.slug.includes("meyersdal")) return LOCAL_LINKS[1];
  if (post.slug.includes("new-redruth")) return LOCAL_LINKS[2];
  return pickBySlug(LOCAL_LINKS, post.slug);
}

function getTemplateVariant(post: BlogPost): "problem-diagnosis" | "battery-comparison" | "local-emergency-guide" {
  if (post.slug.includes("vs") || post.slug.includes("compare")) {
    return "battery-comparison";
  }
  if (post.category === "Local Problem" || post.slug.includes("dead") || post.slug.includes("stranded")) {
    return "local-emergency-guide";
  }
  return "problem-diagnosis";
}

// --- Dynamic SEO Metadata (Perfect for Google) with Open Graph ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return buildPageMetadata({
    title: `${post.title} | Alberton Battery Mart`,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: [
      "battery blog Alberton",
      "car battery advice",
      "battery tips",
      post.category.toLowerCase(),
      ...(post.description.match(/\b\w+\b/g) || []).slice(0, 5),
    ],
    type: "article",
    imageAlt: post.title,
  });
}

// --- Static Page Generation (Builds all posts at once for max speed) ---
export async function generateStaticParams() {
  return ALL_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// --- The Page Component ---
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound(); // 404
  }

  const EMERGENCY_PHONE_DISPLAY = "010 109 6211";
  const EMERGENCY_PHONE_LINK = "0101096211";

  // --- Article Schema for Blog Posts ---
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": `${BASE_URL}/images/og-image.jpg`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "Alberton Battery Mart",
      "url": BASE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "Alberton Battery Mart",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/images/logo-schema.jpg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`
    },
    "articleSection": post.category
  };

  const atomicFaqItems = [
    {
      question: "How do I know if my battery needs replacement?",
      answer:
        "Signs include slow engine cranking, dashboard warning lights, battery age over 3-4 years, or visible corrosion. We offer free battery testing at our store or during mobile callouts to diagnose the issue accurately.",
    },
    {
      question: "Do you offer mobile battery replacement in Alberton?",
      answer:
        "Yes. Our mobile unit reaches Alberton Central, Meyersdal, and New Redruth within 45-60 minutes. We carry Willard and Exide batteries in stock and perform full diagnostics on-site.",
    },
    {
      question: "What warranty do you offer on batteries?",
      answer:
        "All batteries include full manufacturer warranties (typically 24-36 months). Professional fitment is required for warranty coverage. We provide written documentation for all installations.",
    },
  ];

  const serviceLink = getServiceLink(post);
  const productOrFitmentLink = getProductOrFitmentLink(post);
  const localLink = getLocalLink(post);
  const templateVariant = getTemplateVariant(post);

  return (
    <div className="container py-16 space-y-12">
      {/* --- Add Article and Breadcrumb Schema --- */}
      <JsonLd data={articleSchema} id="article-schema" />
      <BreadcrumbSchema
        id="blog-breadcrumb-schema"
        items={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: post.title, item: `/blog/${post.slug}` },
        ]}
      />
      <FaqSchema id="blog-atomic-faq-schema" items={atomicFaqItems} />
      
      <div className="grid lg:grid-cols-12 gap-12">

        {/* --- Main Content (Left Column) --- */}
        <article className="lg:col-span-8">
          {/* Article Header */}
          <div className="space-y-4 border-b border-border pb-6 mb-6">
            <span className="text-battery font-semibold">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
              {post.title}
            </h1>
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* --- This 'prose' class auto-styles your article from Tailwind Typography --- */}
          <div className="prose prose-invert prose-lg max-w-none prose-h2:text-battery prose-h2:font-bold prose-a:text-battery prose-strong:text-foreground">
            {post.content}
          </div>

          <HighIntentTemplateBlock
            variant={templateVariant}
            areaName={localLink.label.replace("Battery support in ", "")}
          />

          <Separator />

          {/* --- Atomic Answers for AI Overviews --- */}
          <div className="mt-8">
            <AtomicAnswers
              answers={atomicFaqItems}
            />
          </div>

          <Separator />

          <div className="mt-8">
            <RelatedLinks
              title="Related services and product pages"
              description="Every guide links directly to one service page, one product or fitment page, and one local area page."
              links={[
                serviceLink,
                productOrFitmentLink,
                localLink,
              ]}
            />
          </div>
        </article>

        {/* --- Sidebar (Right Column) --- */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-card border border-border p-6 rounded-lg shadow-lg text-center space-y-4 lg:sticky lg:top-24">
            <h3 className="text-2xl font-bold text-foreground">
              Need Help <span className="text-battery">Now?</span>
            </h3>
            <p className="text-muted-foreground">
              Get an instant quote or book a mobile callout.
            </p>
            <Button asChild size="lg" variant="battery" className="w-full text-lg" trackingId={`blog-${post.slug}-call`}>
              <a href={`tel:${EMERGENCY_PHONE_LINK}`} className="flex items-center space-x-3">
                <Phone className="h-6 w-6" />
                <span>Call: {EMERGENCY_PHONE_DISPLAY}</span>
              </a>
            </Button>
          </div>
        </aside>

      </div>
    </div>
  );
}