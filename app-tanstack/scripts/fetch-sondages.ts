/**
 * Refreshes src/content/sondages-2027.json from the MieuxVoter open dataset.
 * Run: npm run fetch-sondages   (weekly, via .github/workflows/refresh-sondages.yml)
 *
 * Source: https://github.com/MieuxVoter/presidentielle2027 (MIT). One entry per
 * poll hypothesis, each holding the first- or second-round voting intentions of
 * every tested candidate. Only first-round entries are kept: the second round is
 * a different question and mixing them would distort the averages.
 *
 * The output is a small, pre-aggregated file — the raw dataset is ~700 KB and has
 * no business being shipped in the browser bundle.
 */

import { writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { candidateSlugMap } from '../src/utils/seo';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCE_URL =
  'https://raw.githubusercontent.com/MieuxVoter/presidentielle2027/main/presidentielle2027.json';
const SOURCE_REPO = 'https://github.com/MieuxVoter/presidentielle2027';
const OUTPUT = resolve(__dirname, '../src/content/sondages-2027.json');

/** Monthly points older than this are dropped: the campaign only became readable in 2025. */
const FIRST_MONTH = '2025-01';
const LATEST_POLLS_KEPT = 12;

interface RawCandidate {
  candidat: string;
  parti: string | null;
  intentions: number | null;
}

interface RawPoll {
  poll_id: string;
  institut: string;
  commanditaire: string | null;
  debut_enquete: string;
  fin_enquete: string;
  echantillon: number | null;
  hypothese: string | null;
  tour: string;
  candidats: RawCandidate[];
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function average(values: number[]): number {
  return Math.round((values.reduce((sum, v) => sum + v, 0) / values.length) * 10) / 10;
}

async function main() {
  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(`Could not download the poll dataset: HTTP ${response.status}`);
  }
  const raw = (await response.json()) as RawPoll[];
  const firstRound = raw
    .filter((poll) => poll.tour === '1er Tour')
    .sort((a, b) => a.fin_enquete.localeCompare(b.fin_enquete));

  if (firstRound.length === 0) throw new Error('The dataset holds no first-round poll.');

  const lastPollDate = firstRound[firstRound.length - 1].fin_enquete;

  // candidate name -> { parti, monthly buckets, values of the most recent month }
  const byCandidate = new Map<
    string,
    { parti: string | null; months: Map<string, number[]>; appearances: number }
  >();

  for (const poll of firstRound) {
    const month = poll.fin_enquete.slice(0, 7);
    for (const candidate of poll.candidats) {
      if (candidate.intentions == null) continue;
      let entry = byCandidate.get(candidate.candidat);
      if (!entry) {
        entry = { parti: candidate.parti || null, months: new Map(), appearances: 0 };
        byCandidate.set(candidate.candidat, entry);
      }
      entry.appearances += 1;
      if (!entry.parti && candidate.parti) entry.parti = candidate.parti;
      if (month < FIRST_MONTH) continue;
      const bucket = entry.months.get(month) || [];
      bucket.push(candidate.intentions);
      entry.months.set(month, bucket);
    }
  }

  const siteSlugByName = new Map(candidateSlugMap.map((c) => [slugify(c.pseudo), c.slug]));

  const candidates = [...byCandidate.entries()]
    .map(([name, entry]) => {
      const series = [...entry.months.entries()]
        .sort(([m1], [m2]) => m1.localeCompare(m2))
        .map(([month, values]) => ({ month, value: average(values), polls: values.length }));
      const last = series[series.length - 1];
      return {
        candidat: name,
        parti: entry.parti,
        /** Slug of the matching /candidat page, null when the site does not cover them. */
        slug: siteSlugByName.get(slugify(name)) || null,
        appearances: entry.appearances,
        latest: last ? last.value : null,
        latestMonth: last ? last.month : null,
        series,
      };
    })
    .filter((c) => c.series.length > 0)
    .sort((a, b) => (b.latest ?? 0) - (a.latest ?? 0));

  const polledSlugs = new Set(candidates.map((c) => c.slug).filter(Boolean));
  const notPolled = candidateSlugMap
    .filter((c) => !polledSlugs.has(c.slug))
    .map((c) => ({ pseudo: c.pseudo, slug: c.slug }));

  const latestPolls = firstRound
    .slice(-LATEST_POLLS_KEPT)
    .reverse()
    .map((poll) => ({
      institut: poll.institut,
      commanditaire: poll.commanditaire,
      debut: poll.debut_enquete,
      fin: poll.fin_enquete,
      echantillon: poll.echantillon,
      hypothese: poll.hypothese,
      resultats: poll.candidats
        .filter((c) => c.intentions != null)
        .sort((a, b) => (b.intentions as number) - (a.intentions as number))
        .map((c) => ({ candidat: c.candidat, intentions: c.intentions as number })),
    }));

  const months = [...new Set(candidates.flatMap((c) => c.series.map((p) => p.month)))].sort();

  const output = {
    // Date of the run, not of the data: lastPollDate is the one that matters editorially.
    fetchedAt: new Date().toISOString().slice(0, 10),
    source: { name: 'MieuxVoter / presidentielle2027', url: SOURCE_REPO, licence: 'MIT' },
    pollCount: firstRound.length,
    lastPollDate,
    months,
    candidates,
    notPolled,
    latestPolls,
  };

  writeFileSync(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
  console.log(
    `sondages-2027.json: ${firstRound.length} first-round polls, ${candidates.length} candidates, last poll ${lastPollDate}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
