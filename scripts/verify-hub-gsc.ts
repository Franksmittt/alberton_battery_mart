#!/usr/bin/env node
/**
 * Static GSC readiness gate for primary marketing hub pages.
 * Usage: tsx scripts/verify-hub-gsc.ts [baseUrl]
 * Default baseUrl: http://127.0.0.1:3000
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  EXPLICIT_SCHEMA_ID_PREFIXES,
  HUB_PAGES,
  hubAbsoluteUrl,
} from "../src/lib/hub-pages";
import { getStaticSitemapEntries } from "../src/lib/seo/sitemap-data";
import { pageTitleForSchema } from "../src/lib/seo/page-title";

const BASE = process.argv[2]?.replace(/\/$/, "") || "http://127.0.0.1:3000";
const MIN_DESC = 120;
const MAX_DESC = 160;

type Failure = { path: string; check: string; detail: string };

const failures: Failure[] = [];

function fail(path: string, check: string, detail: string) {
  failures.push({ path, check, detail });
}

function decodeHtml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? decodeHtml(m[1].trim()) : null;
}

function extractCanonical(html: string): string | null {
  const m = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
  );
  return m ? m[1] : null;
}

function normalizeFaqText(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function countChunkBoundaries(html: string): number {
  return (html.match(/data-chunk-boundary/g) || []).length;
}

function hasJsonLd(html: string): boolean {
  return /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
}

function hasPageJsonLd(html: string, path: string): boolean {
  const expectedUrl = hubAbsoluteUrl(path);
  return (
    html.includes('"@type":"WebPage"') ||
    html.includes('"@type": "WebPage"') ||
    html.includes('"@type":"ContactPage"') ||
    html.includes('"@type": "ContactPage"') ||
    html.includes('"@type":"FAQPage"') ||
    html.includes('"@type": "FAQPage"') ||
    html.includes('"@type":"CollectionPage"') ||
    html.includes('"@type": "CollectionPage"') ||
    html.includes(expectedUrl)
  );
}

function extractFaqQuestionsFromJsonLd(html: string): string[] {
  const scripts = Array.from(
    html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
  );
  const questions: string[] = [];
  for (const [, raw] of scripts) {
    try {
      const data = JSON.parse(raw);
      const nodes = Array.isArray(data) ? data : [data];
      for (const node of nodes) {
        if (node["@type"] === "FAQPage" && Array.isArray(node.mainEntity)) {
          for (const q of node.mainEntity) {
            if (q.name) questions.push(String(q.name).trim().toLowerCase());
          }
        }
      }
    } catch {
      /* ignore parse errors */
    }
  }
  return questions;
}

function extractVisibleFaqQuestions(html: string): string[] {
  const questions: string[] = [];
  const summaries = Array.from(html.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/gi));
  for (const [, inner] of summaries) {
    const text = normalizeFaqText(inner);
    if (text.includes("?")) questions.push(text);
  }
  const accordionTriggers = Array.from(
    html.matchAll(/<button[^>]*data-state[^>]*>([\s\S]*?)<\/button>/gi)
  );
  for (const [, inner] of accordionTriggers) {
    const text = normalizeFaqText(inner);
    if (text.length > 5 && text.includes("?")) questions.push(text);
  }
  if (questions.length === 0) {
    const h3s = Array.from(html.matchAll(/<h3[^>]*>([^<]+)<\/h3>/gi));
    for (const [, t] of h3s) {
      if (t.includes("?")) questions.push(normalizeFaqText(t));
    }
  }
  return questions;
}

function hasRelatedLinks(html: string): boolean {
  return (
    html.includes("Related pages") ||
    html.includes("Related content") ||
    html.includes('aria-label="Related content"')
  );
}

async function fetchHtml(path: string): Promise<string> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function main() {
  console.log(`\n🔍 Hub GSC static gate — ${BASE}\n`);

  // llms.txt check
  try {
    const llmsPath = join(process.cwd(), "public/llms.txt");
    const llms = readFileSync(llmsPath, "utf8");
    if (!/^# .+/m.test(llms)) fail("/llms.txt", "llms-h1", "Missing H1 (# Site Name)");
    if (!/^> .+/m.test(llms)) fail("/llms.txt", "llms-blockquote", "Missing blockquote summary");
    if (!/\]\(https?:\/\//.test(llms)) {
      fail("/llms.txt", "llms-links", "No spec-compliant markdown links [Title](https://url)");
    }
    if (/\[https?:\/\/[^\]]+\]:/.test(llms)) {
      fail("/llms.txt", "llms-bad-format", "Found [url]: text format — use [Title](url): desc");
    }
  } catch {
    fail("/llms.txt", "llms-exists", "public/llms.txt missing — run pnpm compile:llms");
  }

  // Sitemap coverage
  const sitemapPaths = new Set(
    getStaticSitemapEntries().map((e) => new URL(e.url!).pathname)
  );
  for (const hub of HUB_PAGES) {
    if (!sitemapPaths.has(hub.path)) {
      fail(hub.path, "sitemap", `Missing from static sitemap entries`);
    }
    const descLen = hub.description.length;
    if (descLen < MIN_DESC || descLen > MAX_DESC) {
      fail(
        hub.path,
        "meta-description-length",
        `Description ${descLen} chars (want ${MIN_DESC}–${MAX_DESC})`
      );
    }
  }

  // Per-page HTML checks
  for (const hub of HUB_PAGES) {
    let html: string;
    try {
      html = await fetchHtml(hub.path);
    } catch (e) {
      fail(hub.path, "fetch", String(e));
      continue;
    }

    const title = extractTitle(html);
    const expectedTitle = pageTitleForSchema(hub.title);
    if (!title) {
      fail(hub.path, "title", "No <title> found");
    } else if (!title.includes(expectedTitle.split("|")[0].trim().slice(0, 20))) {
      // Flexible match — size hubs use generateMetadata title
      const titleOk =
        title === hub.title ||
        title.includes(hub.title.split("|")[0].trim()) ||
        (hub.path.includes("-car-battery") && title.includes(hub.path.replace("/", "").replace("-car-battery", "")));
      if (!titleOk) {
        fail(hub.path, "title-parity", `Got "${title}", expected parity with "${hub.title}"`);
      }
    }

    const canonical = extractCanonical(html);
    const expectedCanonical = hubAbsoluteUrl(hub.path);
    if (!canonical) {
      fail(hub.path, "canonical", "Missing canonical link");
    } else if (canonical !== expectedCanonical) {
      fail(hub.path, "canonical", `Got ${canonical}, want ${expectedCanonical}`);
    }

    if (!hasJsonLd(html)) fail(hub.path, "json-ld", "No JSON-LD script found");
    if (!hasPageJsonLd(html, hub.path)) {
      fail(hub.path, "page-json-ld", "No WebPage/ContactPage/FAQPage/CollectionPage JSON-LD");
    }

    const chunks = countChunkBoundaries(html);
    if (chunks < 2) {
      fail(hub.path, "chunk-boundary", `Only ${chunks} data-chunk-boundary sections (need ≥2)`);
    }

    if (!hasRelatedLinks(html)) {
      fail(hub.path, "related-content", "Missing related content / internal links block");
    }

    if (hub.hasFaq) {
      const schemaQs = extractFaqQuestionsFromJsonLd(html);
      const visibleQs = extractVisibleFaqQuestions(html);
      if (schemaQs.length === 0) {
        fail(hub.path, "faq-schema", "FAQ page but no FAQPage JSON-LD questions");
      }
      if (visibleQs.length === 0) {
        fail(hub.path, "faq-visible", "FAQ page but no visible FAQ questions");
      }
      const missing = schemaQs.filter(
        (q) =>
          !visibleQs.some((v) => {
            const a = q.slice(0, 24);
            const b = v.slice(0, 24);
            return v.includes(a) || q.includes(b) || v.includes(q.slice(0, 15));
          })
      );
      if (missing.length > 0 && visibleQs.length > 0) {
        fail(
          hub.path,
          "faq-parity",
          `${missing.length} schema FAQ(s) not matched in visible HTML: ${missing.slice(0, 2).join("; ")}`
        );
      }
    }

    const schemaIds = Array.from(html.matchAll(/id=["']([^"']+)["']/g)).map((m) => m[1]);
    const hasExplicit = EXPLICIT_SCHEMA_ID_PREFIXES.some((prefix) =>
      schemaIds.some((id) => id.includes(prefix))
    );
    if (!hasExplicit) {
      fail(hub.path, "schema-id", "No explicit schema script id from prefix list");
    }
  }

  if (failures.length > 0) {
    console.error(`❌ GSC gate FAILED — ${failures.length} issue(s):\n`);
    for (const f of failures) {
      console.error(`  [${f.path}] ${f.check}: ${f.detail}`);
    }
    process.exit(1);
  }

  console.log(`✅ GSC static gate PASSED — ${HUB_PAGES.length} hubs verified\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
