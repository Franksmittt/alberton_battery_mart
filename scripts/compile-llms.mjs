#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = "https://www.albertonbatterymart.co.za";

const HUB_LINKS = [
  { title: "Home", path: "/", desc: "Alberton Battery Mart — drive-in testing and same-day battery fitment." },
  { title: "About", path: "/about", desc: "Local multi-brand battery specialists in Alberton." },
  { title: "Contact", path: "/contact", desc: "Store at 28 St Columb Rd — call 010 109 6211." },
  { title: "Services", path: "/services", desc: "Mobile and in-store battery replacement across Alberton." },
  { title: "Products", path: "/products", desc: "Car, truck, motorcycle, and solar batteries for sale." },
  { title: "Free testing", path: "/testing", desc: "Free battery, starter, and alternator diagnostic." },
  { title: "FAQ", path: "/faq", desc: "Warranty, fitment, and AGM/EFB answers." },
];

const SIZE_CODES = ["616", "619", "628", "646", "652", "658", "668"];

const lines = [
  "# Alberton Battery Mart",
  "> Independent battery specialists in Alberton — drive-in testing, same-day fitment, Willard, Exide, Power Plus, and Eco Plus in stock.",
  "",
  "## Primary hubs",
  ...HUB_LINKS.map(
    (h) => `- [${h.title}](${BASE_URL}${h.path === "/" ? "" : h.path}): ${h.desc}`
  ),
  "",
  "## Popular battery sizes",
  ...SIZE_CODES.map(
    (code) =>
      `- [${code} car battery Alberton](${BASE_URL}/${code}-car-battery): In-stock ${code} batteries with free fitment and testing at our New Redruth store.`
  ),
  "",
  "## Contact",
  `- [Contact & store hours](${BASE_URL}/contact): Visit 28 St Columb Rd, New Redruth — call 010 109 6211 or WhatsApp 082 304 6926.`,
  `- [Free battery testing](${BASE_URL}/testing): No-obligation 3-point battery, starter, and alternator diagnostic.`,
  "",
  "## Optional",
  `- [Sitemap](${BASE_URL}/sitemap.xml): Full URL index for crawlers and agents.`,
];

writeFileSync(join(process.cwd(), "public/llms.txt"), lines.join("\n") + "\n", "utf8");
console.log("Wrote public/llms.txt");
