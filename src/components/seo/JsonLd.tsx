// src/components/seo/JsonLd.tsx
import React from "react";

type JsonLdProps = {
  data: Record<string, unknown>;
  id?: string;
};

/**
 * Renders sanitized JSON-LD for structured data.
 * Always prefers server components so it can be used anywhere without `use client`.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default JsonLd;

