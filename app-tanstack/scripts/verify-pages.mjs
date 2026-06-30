/**
 * Page verification harness for the React Router -> TanStack Start migration.
 *
 * Fetches every URL in the sitemap and snapshots the server-returned HTML:
 *   status, <title>, meta description, canonical, OG/Twitter tags, JSON-LD @types,
 *   and whether the page shipped per-page SSR content (vs the empty SPA shell).
 *
 * Usage:
 *   node scripts/verify-pages.mjs snapshot [--base=http://localhost:5178] [--sitemap=public/sitemap.xml] [--out=report.json] [--bot]
 *   node scripts/verify-pages.mjs compare <before.json> <after.json>
 *
 * Typical flow:
 *   # before (old SPA still running on :5178)
 *   node scripts/verify-pages.mjs snapshot --base=http://localhost:5178 --out=/tmp/before.json
 *   # after (new TanStack app running on :5178)
 *   node scripts/verify-pages.mjs snapshot --base=http://localhost:5178 --out=/tmp/after.json
 *   node scripts/verify-pages.mjs compare /tmp/before.json /tmp/after.json
 */

import { readFileSync, writeFileSync } from 'fs';

const DEFAULT_TITLE = 'Le Quizz du Berger | Quel est votre candidat idéal ?';
const BOT_UA =
  'Mozilla/5.0 (compatible; facebookexternalhit/1.1; +http://www.facebook.com/externalhit_uatext.php)';
const CONCURRENCY = 16;

function parseArgs(argv) {
  const opts = {};
  const positional = [];
  for (const a of argv) {
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      opts[k] = v === undefined ? true : v;
    } else {
      positional.push(a);
    }
  }
  return { opts, positional };
}

function readSitemapUrls(sitemapPath, base) {
  const xml = readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  // Replace the production origin with the target base origin.
  const baseOrigin = new URL(base).origin;
  return locs.map((loc) => {
    try {
      const u = new URL(loc);
      return baseOrigin + u.pathname + u.search;
    } catch {
      return baseOrigin + loc;
    }
  });
}

function extract(html) {
  const pick = (re) => {
    const m = html.match(re);
    return m ? m[1].trim() : null;
  };
  const title = pick(/<title[^>]*>([^<]*)<\/title>/i);
  const description = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const ogTitle = pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
  const ogDescription = pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i);
  const ogImage = pick(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i);
  const ogUrl = pick(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']*)["']/i);
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const jsonLdTypes = [];
  for (const b of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(b[1].trim());
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      for (const p of arr) if (p && p['@type']) jsonLdTypes.push(p['@type']);
    } catch {
      jsonLdTypes.push('UNPARSEABLE');
    }
  }
  // Heuristic: does the server already contain rendered app content (not just the empty SPA shell)?
  const rootMatch = html.match(/<div id=["']root["'][^>]*>([\s\S]*?)<\/div>/i);
  const rootHasContent = !!(rootMatch && rootMatch[1].replace(/\s/g, '').length > 0);
  const htmlLength = html.length;
  return {
    title,
    titleIsDefault: title === DEFAULT_TITLE || title === null,
    description,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    jsonLdTypes,
    rootHasContent,
    htmlLength,
  };
}

async function fetchOne(url, useBot) {
  try {
    const res = await fetch(url, {
      redirect: 'manual',
      headers: useBot ? { 'User-Agent': BOT_UA } : {},
    });
    const status = res.status;
    const html = status >= 200 && status < 400 ? await res.text() : '';
    const data = html ? extract(html) : {};
    return { url, status, ...data };
  } catch (e) {
    return { url, status: 0, error: String(e?.message || e) };
  }
}

async function runPool(urls, useBot) {
  const results = new Array(urls.length);
  let i = 0;
  let done = 0;
  async function worker() {
    while (i < urls.length) {
      const idx = i++;
      results[idx] = await fetchOne(urls[idx], useBot);
      done++;
      if (done % 50 === 0 || done === urls.length) {
        process.stderr.write(`\r  fetched ${done}/${urls.length}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  process.stderr.write('\n');
  return results;
}

function summarize(results) {
  const total = results.length;
  const non200 = results.filter((r) => r.status !== 200);
  const withRealTitle = results.filter((r) => r.status === 200 && r.title && !r.titleIsDefault);
  const withCanonical = results.filter((r) => r.status === 200 && r.canonical);
  const withJsonLd = results.filter((r) => r.status === 200 && r.jsonLdTypes && r.jsonLdTypes.length);
  const withSsrContent = results.filter((r) => r.status === 200 && r.rootHasContent);
  return {
    total,
    ok: total - non200.length,
    non200: non200.length,
    withRealTitle: withRealTitle.length,
    withCanonical: withCanonical.length,
    withJsonLd: withJsonLd.length,
    withSsrContent: withSsrContent.length,
  };
}

function printSummary(label, s) {
  console.log(`\n=== ${label} ===`);
  console.log(`  total URLs         : ${s.total}`);
  console.log(`  HTTP 200           : ${s.ok}`);
  console.log(`  non-200            : ${s.non200}`);
  console.log(`  per-page <title>   : ${s.withRealTitle}`);
  console.log(`  canonical link     : ${s.withCanonical}`);
  console.log(`  per-page JSON-LD   : ${s.withJsonLd}`);
  console.log(`  SSR'd #root content: ${s.withSsrContent}`);
}

async function cmdSnapshot(opts) {
  const base = opts.base || 'http://localhost:5178';
  const sitemap = opts.sitemap || 'public/sitemap.xml';
  const out = opts.out || 'verify-report.json';
  const useBot = !!opts.bot;
  const urls = readSitemapUrls(sitemap, base);
  console.log(`Snapshotting ${urls.length} URLs from ${sitemap} against ${base}${useBot ? ' (bot UA)' : ''}...`);
  const results = await runPool(urls, useBot);
  const summary = summarize(results);
  writeFileSync(out, JSON.stringify({ base, sitemap, useBot, summary, results }, null, 2));
  printSummary(`snapshot @ ${base}`, summary);
  console.log(`\nWrote ${out}`);
  const broken = results.filter((r) => r.status !== 200);
  if (broken.length) {
    console.log(`\nNon-200 URLs (first 30):`);
    for (const r of broken.slice(0, 30)) console.log(`  ${r.status}  ${r.url}${r.error ? '  ' + r.error : ''}`);
  }
}

function cmdCompare(beforePath, afterPath) {
  const before = JSON.parse(readFileSync(beforePath, 'utf8'));
  const after = JSON.parse(readFileSync(afterPath, 'utf8'));
  const byUrlPath = (snap) => {
    const m = new Map();
    for (const r of snap.results) m.set(new URL(r.url).pathname, r);
    return m;
  };
  const b = byUrlPath(before);
  const a = byUrlPath(after);

  printSummary('BEFORE', before.summary);
  printSummary('AFTER', after.summary);

  const regressions = [];
  const improvements = [];
  const titleChanges = [];
  for (const [path, ra] of a) {
    const rb = b.get(path);
    if (!rb) continue;
    if (rb.status === 200 && ra.status !== 200) {
      regressions.push(`  was 200, now ${ra.status}: ${path}`);
    }
    if (rb.status !== 200 && ra.status === 200) {
      improvements.push(`  was ${rb.status}, now 200: ${path}`);
    }
    if (rb.status === 200 && ra.status === 200) {
      const wasReal = rb.title && !rb.titleIsDefault;
      const nowReal = ra.title && !ra.titleIsDefault;
      if (!wasReal && nowReal) improvements.push(`  gained per-page title: ${path}  -> "${ra.title}"`);
      if (wasReal && !nowReal) regressions.push(`  lost per-page title: ${path}  (was "${rb.title}")`);
      if (wasReal && nowReal && rb.title !== ra.title) titleChanges.push(`  ${path}\n      before: "${rb.title}"\n      after:  "${ra.title}"`);
    }
  }
  const onlyBefore = [...b.keys()].filter((p) => !a.has(p));
  const onlyAfter = [...a.keys()].filter((p) => !b.has(p));

  console.log(`\n=== REGRESSIONS (${regressions.length}) ===`);
  regressions.slice(0, 60).forEach((l) => console.log(l));
  console.log(`\n=== IMPROVEMENTS (${improvements.length}) ===`);
  improvements.slice(0, 60).forEach((l) => console.log(l));
  console.log(`\n=== TITLE CHANGES on shared pages (${titleChanges.length}) ===`);
  titleChanges.slice(0, 40).forEach((l) => console.log(l));
  if (onlyBefore.length) console.log(`\nURLs only in BEFORE sitemap (${onlyBefore.length}):`, onlyBefore.slice(0, 20));
  if (onlyAfter.length) console.log(`\nURLs only in AFTER sitemap (${onlyAfter.length}):`, onlyAfter.slice(0, 20));

  console.log(`\nResult: ${regressions.length === 0 ? 'NO REGRESSIONS ✅' : regressions.length + ' REGRESSIONS ❌'}`);
}

async function main() {
  const { opts, positional } = parseArgs(process.argv.slice(2));
  const cmd = positional[0] || 'snapshot';
  if (cmd === 'snapshot') {
    await cmdSnapshot(opts);
  } else if (cmd === 'compare') {
    cmdCompare(positional[1], positional[2]);
  } else {
    console.error('Unknown command. Use "snapshot" or "compare".');
    process.exit(1);
  }
}

main();
