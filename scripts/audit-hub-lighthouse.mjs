#!/usr/bin/env node
/**
 * Lighthouse hub audit — mobile + desktop, min score 0.98 all categories.
 * Usage:
 *   node scripts/audit-hub-lighthouse.mjs --port 3000
 *   node scripts/audit-hub-lighthouse.mjs --base https://www.albertonbatterymart.co.za
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { HUB_PATHS } from "./hub-paths.mjs";

const MIN_SCORE = 0.98;

function parseArgs() {
  const args = process.argv.slice(2);
  let base = "http://127.0.0.1:3000";
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--port" && args[i + 1]) {
      base = `http://127.0.0.1:${args[i + 1]}`;
      i++;
    } else if (args[i] === "--base" && args[i + 1]) {
      base = args[i + 1].replace(/\/$/, "");
      i++;
    }
  }
  return base;
}

const FORM_FACTORS = [
  { name: "mobile", config: { extends: "lighthouse:default", settings: { formFactor: "mobile", screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2, disabled: false }, throttling: { rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4 } } } },
  { name: "desktop", config: { extends: "lighthouse:default", settings: { formFactor: "desktop", screenEmulation: { mobile: false, width: 1280, height: 800, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 } } } },
];

async function runLh(url, config) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"] });
  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
    }, config);
    return result?.lhr;
  } finally {
    await chrome.kill();
  }
}

async function main() {
  const base = parseArgs();
  const results = [];
  const failures = [];

  for (const path of HUB_PATHS) {
    const url = `${base}${path}`;
    for (const ff of FORM_FACTORS) {
      process.stdout.write(`Lighthouse ${path} [${ff.name}]... `);
      const lhr = await runLh(url, ff.config);
      if (!lhr) {
        failures.push({ path, viewport: ff.name, error: "No LHR result" });
        console.log("FAIL (no result)");
        continue;
      }
      const scores = {
        performance: lhr.categories.performance?.score ?? 0,
        accessibility: lhr.categories.accessibility?.score ?? 0,
        "best-practices": lhr.categories["best-practices"]?.score ?? 0,
        seo: lhr.categories.seo?.score ?? 0,
      };
      const row = { path, viewport: ff.name, url, scores };
      results.push(row);

      const below = Object.entries(scores).filter(([, s]) => s < MIN_SCORE);
      if (below.length > 0) {
        failures.push({ ...row, below: below.map(([k, v]) => `${k}=${(v * 100).toFixed(0)}%`) });
        console.log(`FAIL ${below.map(([k, v]) => `${k} ${(v * 100).toFixed(0)}%`).join(", ")}`);
      } else {
        console.log("PASS");
      }
    }
  }

  const outDir = join(process.cwd(), "lhci-reports/hub-audit");
  await mkdir(outDir, { recursive: true });
  const summary = { base, minScore: MIN_SCORE, results, failures };
  await writeFile(join(outDir, "summary.json"), JSON.stringify(summary, null, 2));

  console.log("\n--- Lighthouse summary ---");
  console.log("| Path | Viewport | Perf | A11y | BP | SEO |");
  console.log("|------|----------|------|------|----|-----|");
  for (const r of results) {
    const s = r.scores;
    console.log(
      `| ${r.path} | ${r.viewport} | ${(s.performance * 100).toFixed(0)}% | ${(s.accessibility * 100).toFixed(0)}% | ${(s["best-practices"] * 100).toFixed(0)}% | ${(s.seo * 100).toFixed(0)}% |`
    );
  }

  if (failures.length > 0) {
    console.error(`\n❌ Lighthouse FAILED — ${failures.length} run(s) below ${MIN_SCORE * 100}%\n`);
    process.exit(1);
  }
  console.log(`\n✅ Lighthouse PASSED — all hubs ≥ ${MIN_SCORE * 100}% on mobile + desktop\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
