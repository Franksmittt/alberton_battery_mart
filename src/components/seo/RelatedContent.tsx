import RelatedLinks from "@/components/seo/RelatedLinks";
import { HubSection } from "@/components/seo/HubSection";
import { DEFAULT_HUB_RELATED_LINKS } from "@/lib/hub-pages";

type RelatedLinkItem = {
  href: string;
  label: string;
  description?: string;
};

type RelatedContentProps = {
  title?: string;
  links?: RelatedLinkItem[];
  description?: string;
  className?: string;
};

export function RelatedContent({
  title = "Related pages",
  links = DEFAULT_HUB_RELATED_LINKS,
  description = "Explore more battery services, size guides, and local support.",
  className = "container py-12",
}: RelatedContentProps) {
  return (
    <HubSection className={className} aria-label="Related content">
      <RelatedLinks title={title} links={links} description={description} />
    </HubSection>
  );
}
