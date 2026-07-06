import type { ReactNode } from "react";

type HubSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
};

/** Major content section with HtmlRAG chunk boundary marker */
export function HubSection({
  children,
  className = "",
  id,
  "aria-label": ariaLabel,
}: HubSectionProps) {
  return (
    <section
      id={id}
      data-chunk-boundary="true"
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </section>
  );
}
