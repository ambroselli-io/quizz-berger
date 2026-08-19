/**
 * Rewrites the proximity figures quoted in the "{candidat}-droite-ou-gauche" articles
 * from the live data. Run: npm run fix-proximity-figures
 *
 * Why this exists: those articles quote percentages and identical-answer counts as
 * hand-written prose. Adding one question to the quiz shifts every one of them, and
 * git reports no conflict because nothing collides textually. This rewrites the two
 * shapes that are machine-readable, and lists what a human still has to check.
 *
 * Fixed automatically:
 *   - the ranking list  <li><a href="/candidat/x">Nom</a> (Parti) — 91 %…, 107 réponses identiques.</li>
 *     (values AND order, so a reordering is applied too)
 *   - inline mentions   <a href="/candidat/x">Nom</a> (43 %)
 *
 * NOT fixed, only reported: bare figures in sentences ("soit 91 % de proximité",
 * "il en partage 90"). Those carry an argument, so a human rewrites them.
 *
 * src/content/articles/proximity-figures.test.ts enforces both fixed shapes in CI.
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { candidateSlugMap } from '../src/utils/seo';
import { getCandidateProximityRanking } from '../src/utils/proximity';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = resolve(__dirname, '../src/content/articles');

const SUFFIX = '-droite-ou-gauche.ts';

/** <li><a href="/candidat/slug">Nom</a> (Parti) — 91 % de proximité, 107 réponses identiques.</li> */
const BULLET =
  /<li><a href="\/candidat\/([a-z0-9-]+)">([^<]+)<\/a>([^—]*)— (\d+) %([^,]*), (\d+) réponses identiques\.<\/li>/g;
/** <a href="/candidat/slug">Nom</a> (43 %) */
const INLINE = /(<a href="\/candidat\/([a-z0-9-]+)">[^<]+<\/a>) \((\d+) %\)/g;
/** Any remaining bare figure a human has to judge. */
const BARE = /(?:soit |à |atteint |partage(?:nt)? |en partage )(\d+)(?: %| réponses)/g;

let changedFiles = 0;
const warnings: string[] = [];

for (const file of readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(SUFFIX))) {
  const subjectSlug = file.slice(0, -SUFFIX.length);
  if (!candidateSlugMap.some((c) => c.slug === subjectSlug)) {
    warnings.push(`${file}: no candidate matches "${subjectSlug}", skipped.`);
    continue;
  }

  const path = resolve(ARTICLES_DIR, file);
  const before = readFileSync(path, 'utf8');
  const ranking = getCandidateProximityRanking(subjectSlug);
  const percentBySlug = new Map(ranking.map((c) => [c.slug, c.percent]));

  const bullets = [...before.matchAll(BULLET)];
  let after = before;

  if (bullets.length === 0) {
    warnings.push(`${file}: no ranking list found.`);
  } else {
    // The hand-written label (name + party) is kept; numbers and order come from the data.
    const labelBySlug = new Map(bullets.map((m) => [m[1], { name: m[2], party: m[3] }]));
    const rebuilt = ranking
      .slice(0, bullets.length)
      .map((c, index) => {
        const label = labelBySlug.get(c.slug) || { name: c.pseudo, party: ' ' };
        const suffix = index === 0 ? ' de proximité' : '';
        return `<li><a href="/candidat/${c.slug}">${label.name}</a>${label.party}— ${c.percent} %${suffix}, ${c.sameAnswers} réponses identiques.</li>`;
      })
      .join('\n');
    after = after.replace(bullets.map((m) => m[0]).join('\n'), rebuilt);

    const dropped = [...labelBySlug.keys()].filter(
      (slug) => !ranking.slice(0, bullets.length).some((c) => c.slug === slug),
    );
    for (const slug of dropped) {
      warnings.push(`${file}: ${slug} fell out of the top ${bullets.length}; the prose around it may no longer hold.`);
    }
  }

  after = after.replace(INLINE, (whole, anchor: string, slug: string, quoted: string) => {
    const live = percentBySlug.get(slug);
    if (live === undefined || live === Number(quoted)) return whole;
    return `${anchor} (${live} %)`;
  });

  if (after !== before) {
    writeFileSync(path, after);
    changedFiles += 1;
    console.log(`rewrote ${file}`);
  }

  // A bare figure whose value appears nowhere in this candidate's live ranking cannot
  // be right; one that does may still describe the wrong pair, so it is only flagged.
  const liveValues = new Set<number>();
  for (const entry of ranking) {
    liveValues.add(entry.percent);
    liveValues.add(entry.sameAnswers);
  }
  for (const match of [...after.matchAll(BARE)]) {
    const value = Number(match[1]);
    const stale = !liveValues.has(value);
    const seen = `${file}: ${stale ? 'STALE' : 'verify'} → "${match[0]}…"`;
    if (!warnings.includes(seen)) warnings.push(seen);
  }
}

console.log(`\n${changedFiles} file(s) rewritten.`);
const stale = warnings.filter((w) => w.includes('STALE'));
const rest = warnings.filter((w) => !w.includes('STALE'));
if (stale.length) {
  console.log(
    `\nSuspect (${stale.length}) — the value appears nowhere in this candidate's live ranking.` +
      `\nEither it is stale, or it deliberately quotes another candidate's ranking` +
      `\n(e.g. "Xavier Bertrand, dont la proximité avec Arthaud tombe à 25 %"). Read each one:`,
  );
  for (const warning of stale) console.log(`  - ${warning}`);
}
if (rest.length) {
  console.log(`\nPlausible but unverifiable automatically (${rest.length}) — read them:`);
  for (const warning of rest) console.log(`  - ${warning}`);
}
console.log('\nNow run: npx vitest run src/content/articles/proximity-figures.test.ts');
