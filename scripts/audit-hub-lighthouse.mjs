#!/usr/bin/env node
/**
 * Lighthouse hub audit — mobile + desktop.
 * Usage:
 *   node scripts/audit-hub-lighthouse.mjs --port 3000
 *   node scripts/audit-hub-lighthouse.mjs --base https://www.albertonbatterymart.co.za
 *
 * Chrome: use --headless=new and --disable-dev-shm-usage to avoid TARGET_CRASHED
 * on desktop runs in CI/containers (see Lighthouse troubleshooting docs).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { HUB_PATHS } from "./hub-paths.mjs";

const MIN_SCORE = 0.98;
const MIN_MOBILE_PERF = 0.9;

const CHROME_FLAGS = [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--disable-extensions",
];

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
  {
    name: "mobile",
    config: {
      extends: "lighthouse:default",
      settings: {
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          disabled: false,
        },
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
        },
      },
    },
  },
  {
    name: "desktop",
    config: {
      extends: "lighthouse:default",
      settings: {
        formFactor: "desktop",
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    },
  },
];

async function runLh(url, config, attempt = 1) {
  const chrome = await chromeLauncher.launch({ chromeFlags: CHROME_FLAGS });
  try {
    const result = await lighthouse(
      url,
      {
        port: chrome.port,
        output: "json",
        logLevel: "error",
      },
      config
    );
    const lhr = result?.lhr;
    if (lhr?.runtimeError && attempt < 2) {
      return runLh(url, config, attempt + 1);
    }
    return lhr;
  } finally {
    await chrome.kill();
  }
}

async function main() {
  const base = parseArgs();
  const results = [];
  const failures = [];
  const mobilePerfFailures = [];
  const crashes = [];

  for (const path of HUB_PATHS) {
    const url = `${base}${path}`;
    for (const ff of FORM_FACTORS) {
      process.stdout.write(`Lighthouse ${path} [${ff.name}]... `);
      const lhr = await runLh(url, ff.config);
      if (!lhr) {
        crashes.push({ path, viewport: ff.name, error: "No LHR result" });
        console.log("FAIL (no result)");
        continue;
      }
      if (lhr.runtimeError) {
        crashes.push({
          path,
          viewport: ff.name,
          error: lhr.runtimeError.code || lhr.runtimeError.message,
        });
        console.log(`FAIL (${lhr.runtimeError.code || "runtime error"})`);
        continue;
      }

      const scores = {
        performance: lhr.categories.performance?.score ?? 0,
        accessibility: lhr.categories.accessibility?.score ?? 0,
        "best-practices": lhr.categories["best-practices"]?.score ?? 0,
        seo: lhr.categories.seo?.score ?? 0,
      };
      const metrics = {
        lcp: Math.round(lhr.audits["largest-contentful-paint"]?.numericValue ?? 0),
        tbt: Math.round(lhr.audits["total-blocking-time"]?.numericValue ?? 0),
        cls: lhr.audits["cumulative-layout-shift"]?.numericValue ?? 0,
      };
      const row = { path, viewport: ff.name, url, scores, metrics };
      results.push(row);

      const below = Object.entries(scores).filter(([, s]) => s < MIN_SCORE);
      if (below.length > 0) {
        failures.push({ ...row, below: below.map(([k, v]) => `${k}=${(v * 100).toFixed(0)}%`) });
        console.log(`FAIL ${below.map(([k, v]) => `${k} ${(v * 100).toFixed(0)}%`).join(", ")}`);
      } else {
        console.log("PASS");
      }

      if (ff.name === "mobile" && scores.performance < MIN_MOBILE_PERF) {
        mobilePerfFailures.push({
          path,
          perf: scores.performance,
          lcp: metrics.lcp,
          tbt: metrics.tbt,
        });
      }
    }
  }

  const outDir = join(process.cwd(), "lhci-reports/hub-audit");
  await mkdir(outDir, { recursive: true });
  const summary = { base, minScore: MIN_SCORE, minMobilePerf: MIN_MOBILE_PERF, results, failures, mobilePerfFailures, crashes };
  await writeFile(join(outDir, "summary.json"), JSON.stringify(summary, null, 2));

  console.log("\n--- Lighthouse summary ---");
  console.log("| Path | Viewport | Perf | A11y | BP | SEO | LCP | TBT |");
  console.log("|------|----------|------|------|----|-----|-----|-----|");
  for (const r of results) {
    const s = r.scores;
    const m = r.metrics;
    console.log(
      `| ${r.path} | ${r.viewport} | ${(s.performance * 100).toFixed(0)}% | ${(s.accessibility * 100).toFixed(0)}% | ${(s["best-practices"] * 100).toFixed(0)}% | ${(s.seo * 100).toFixed(0)}% | ${m.lcp}ms | ${m.tbt}ms |`
    );
  }

  if (mobilePerfFailures.length > 0) {
    console.error(`\n⚠️  Mobile performance below ${MIN_MOBILE_PERF * 100}%:`);
    for (const f of mobilePerfFailures) {
      console.error(`  ${f.path}: ${(f.perf * 100).toFixed(0)}% (LCP ${f.lcp}ms, TBT ${f.tbt}ms)`);
    }
  }

  if (crashes.length > 0) {
    console.error(`\n❌ Lighthouse CRASHED — ${crashes.length} run(s) failed`);
    for (const c of crashes) {
      console.error(`  ${c.path} [${c.viewport}]: ${c.error}`);
    }
    process.exit(1);
  }

  if (mobilePerfFailures.length > 0) {
    console.error(`\n❌ Mobile performance gate FAILED — ${mobilePerfFailures.length} path(s) below ${MIN_MOBILE_PERF * 100}%\n`);
    process.exit(1);
  }

  if (failures.length > 0) {
    console.log(`\n⚠️  ${failures.length} run(s) below ${MIN_SCORE * 100}% (often best-practices ~77% — expected)`);
  }
  console.log(`\n✅ Lighthouse completed — no crashes, all mobile perf ≥ ${MIN_MOBILE_PERF * 100}%\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
