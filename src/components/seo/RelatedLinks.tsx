import Link from "next/link";

type RelatedLinkItem = {
  href: string;
  label: string;
  description?: string;
};

type RelatedLinksProps = {
  title: string;
  links: RelatedLinkItem[];
  description?: string;
  columnsClassName?: string;
};

export default function RelatedLinks({
  title,
  links,
  description,
  columnsClassName = "md:grid-cols-2",
}: RelatedLinksProps) {
  if (!links.length) return null;

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      {description ? <p className="text-muted-foreground">{description}</p> : null}
      <div className={`grid gap-4 ${columnsClassName}`}>
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            className="rounded-lg border border-border bg-card p-4 hover:border-battery transition-colors"
          >
            <p className="font-semibold text-foreground">{link.label}</p>
            {link.description ? (
              <p className="mt-2 text-sm text-muted-foreground">{link.description}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
