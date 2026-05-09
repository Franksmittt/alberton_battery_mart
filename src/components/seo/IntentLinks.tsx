import RelatedLinks from "@/components/seo/RelatedLinks";

type IntentLink = {
  href: string;
  label: string;
  description?: string;
};

type IntentLinksProps = {
  links: IntentLink[];
  title?: string;
  description?: string;
  columnsClassName?: string;
};

export default function IntentLinks({
  links,
  title = "Next best pages",
  description = "Use these high-intent pages to compare options, book service, or confirm fitment.",
  columnsClassName,
}: IntentLinksProps) {
  return (
    <RelatedLinks
      title={title}
      description={description}
      links={links}
      columnsClassName={columnsClassName}
    />
  );
}
