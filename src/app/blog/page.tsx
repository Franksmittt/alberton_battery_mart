// src/app/blog/page.tsx
import { ALL_POSTS } from "@/data/blog-posts";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Calendar } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import AtomicAnswers from "@/components/seo/AtomicAnswers";
import { Separator } from "@/components/ui/separator";

// --- SEO Metadata for the main blog page ---
export const metadata: Metadata = {
  title: "Battery Blog & Expert Guides | Alberton Battery Mart",
  description: "Read expert guides from Alberton Battery Mart on car battery maintenance, AGM vs. EFB technology, mobile fitment, and load shedding solutions.",
  keywords: [
    'battery blog Alberton',
    'car battery guides',
    'battery maintenance tips',
    'AGM battery advice',
    'mobile battery service guides',
  ],
  openGraph: {
    title: "Battery Blog & Expert Guides | Alberton Battery Mart",
    description: "Read expert guides from Alberton Battery Mart on car battery maintenance, AGM vs. EFB technology, mobile fitment, and load shedding solutions.",
    url: 'https://www.albertonbatterymart.co.za/blog',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Battery Blog - Alberton Battery Mart',
      },
    ],
    locale: 'en_ZA',
    siteName: 'Alberton Battery Mart',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Battery Blog & Expert Guides | Alberton Battery Mart",
    description: "Read expert guides from Alberton Battery Mart on car battery maintenance, AGM vs. EFB technology, mobile fitment, and load shedding solutions.",
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.albertonbatterymart.co.za/blog',
  },
};

export default function BlogHubPage() {
  // Sort posts by date, newest first
  const sortedPosts = ALL_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Battery Blog & Expert Guides",
    "description": "Expert guides from Alberton Battery Mart on car battery maintenance, AGM vs. EFB technology, mobile fitment, and load shedding solutions",
    "url": "https://www.albertonbatterymart.co.za/blog",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": sortedPosts.length,
      "itemListElement": sortedPosts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Article",
          "headline": post.title,
          "url": `https://www.albertonbatterymart.co.za/blog/${post.slug}`,
        },
      })),
    },
  };

  return (
    <div className="container py-16 space-y-12">
      <JsonLd data={collectionSchema} id="blog-collection-schema" />
      {/* Page Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground">
          The <span className="text-battery">Expert Hub</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Expert guides, local service explainers, and technical advice from Alberton's battery specialists.
        </p>
      </div>

      {/* Grid of Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden bg-card border-border shadow-lg hover:shadow-battery/30 transition-shadow h-full">
            {/* Make the entire card a link to the post */}
            <Link href={`/blog/${post.slug}`} className="flex flex-col flex-grow">
              
              <CardHeader className="flex-grow">
                <CardTitle className="text-2xl font-bold text-foreground hover:text-battery transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {post.description}
                </p>
              </CardContent>

              <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <span className="flex items-center text-battery font-semibold">
                  Read More <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>

      <Separator />

      {/* --- Atomic Answers for AI Overviews --- */}
      <AtomicAnswers
        answers={[
          {
            question: "What topics does the blog cover?",
            answer: "Our blog covers car battery maintenance, AGM vs. EFB technology, mobile fitment services, load shedding solutions, vehicle-specific guides, and troubleshooting tips for Alberton drivers.",
          },
          {
            question: "How often do you publish new articles?",
            answer: "We regularly publish expert guides and local service explainers. Check back monthly for new content on battery technology, maintenance, and service updates.",
          },
          {
            question: "Can I request a specific topic?",
            answer: "Yes! Contact us at 010 109 6211 or visit our store to suggest topics. We prioritize questions from our local Alberton customers.",
          },
        ]}
      />

      <Separator />

      {/* --- Quick Links to Services --- */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground text-center">Ready to Take Action?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/services/mobile-battery-replacement/alberton" className="border border-border rounded-lg p-6 bg-card hover:border-battery transition-colors text-center">
            <h3 className="text-lg font-semibold text-battery mb-2">Mobile Service</h3>
            <p className="text-sm text-muted-foreground">Fast on-site battery replacement</p>
          </Link>
          <Link href="/products/type/automotive" className="border border-border rounded-lg p-6 bg-card hover:border-battery transition-colors text-center">
            <h3 className="text-lg font-semibold text-battery mb-2">Browse Products</h3>
            <p className="text-sm text-muted-foreground">View our full battery range</p>
          </Link>
          <Link href="/contact" className="border border-border rounded-lg p-6 bg-card hover:border-battery transition-colors text-center">
            <h3 className="text-lg font-semibold text-battery mb-2">Get Expert Advice</h3>
            <p className="text-sm text-muted-foreground">Contact our specialists</p>
          </Link>
        </div>
      </div>
    </div>
  );
}