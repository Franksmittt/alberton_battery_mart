#!/usr/bin/env node
/**
 * WCAG 2.1 AA axe audit for hub pages (mobile + desktop).
 * Usage: node scripts/audit-hub-axe.mjs [baseUrl]
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { HUB_PATHS } from "./hub-paths.mjs";

const BASE = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 800 },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  let totalViolations = 0;

  for (const path of HUB_PATHS) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();
      const url = `${BASE}${path}`;
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const violations = axe.violations;
      totalViolations += violations.length;
      results.push({
        path,
        viewport: vp.name,
        url,
        violationCount: violations.length,
        violations: violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
          help: v.help,
        })),
      });
      await context.close();
      const status = violations.length === 0 ? "PASS" : "FAIL";
      console.log(`${status} ${path} [${vp.name}] — ${violations.length} violation(s)`);
    }
  }

  await browser.close();

  const outDir = join(process.cwd(), "test-results");
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, "hub-axe-audit.json");
  await writeFile(
    outPath,
    JSON.stringify({ base: BASE, totalViolations, results }, null, 2)
  );
  console.log(`\nWrote ${outPath}`);

  if (totalViolations > 0) {
    console.error(`\n❌ Axe audit FAILED — ${totalViolations} total violation(s)\n`);
    process.exit(1);
  }
  console.log(`\n✅ Axe audit PASSED — 0 violations on ${HUB_PATHS.length} hubs × ${VIEWPORTS.length} viewports\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
