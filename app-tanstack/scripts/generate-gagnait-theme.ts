/**
 * Regenerates the "Et si un(e) autre gagnait..." theme in the three `quizz-2027.json` and the
 * matching candidate answers in the three `candidates-answers.json`.
 *
 * One question per candidate still in the race ("Si X était élu(e), quel serait votre
 * sentiment ?"), the same six answers everywhere. A withdrawn candidate loses their question
 * (nobody can be glad they won) but keeps answering the others'.
 *
 * Candidate answers are estimated, like every other answer of the file: a candidate is
 * "très content(e)" about their own victory, and their feeling about someone else's derives from
 * the political proximity of the two (`utils/proximity.ts`), which is computed on the other
 * themes only. Re-run after a candidate joins or leaves, or after the question set changes.
 *
 * Usage: npm run generate-gagnait-theme   (from app-tanstack/)
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import * as prettier from 'prettier';
import { candidacies } from '../src/content/candidacies';
import { getProximityBetween } from '../src/utils/proximity';
import { candidateSlugMap } from '../src/utils/seo';
import { gagnaitThemeId } from '../src/utils/quizz';
import type { Answer, QuizzQuestion, QuizzTheme } from '../src/types/quizz';

// The JSON carries `id`, not the `_id` of the `Candidate` type.
type RawCandidate = { id: string; pseudo: string; withdrawn?: boolean; answers: Answer[] };

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');
const sharedDirs = ['api-express/src/shared', 'app-tanstack/src/shared', 'expo/src/shared'].map((dir) =>
  resolve(root, dir),
);

const ANSWERS = [
  'Très content(e)',
  'Plutôt content(e)',
  'Neutre',
  'Plutôt mécontent(e)',
  'Très mécontent(e)',
  "Ça ne m'intéresse pas / Je n'ai pas d'avis",
];
const SCORES = [
  [5, 3, 2, 0, 0, 0],
  [4, 5, 3, 1, 0, 0],
  [2, 3, 5, 3, 2, 0],
  [0, 1, 3, 5, 4, 0],
  [0, 0, 2, 3, 5, 0],
  [0, 0, 0, 0, 0, 0],
];

const VERY_HAPPY = 0;
const RATHER_HAPPY = 1;
const NEUTRAL = 2;
const RATHER_UNHAPPY = 3;
const VERY_UNHAPPY = 4;

// Thresholds sit on the proximity distribution: ~85 is the top decile of pairs, ~45 the bottom
// quarter. Only the candidate themselves gets "très content(e)".
function feelingFromProximity(percent: number): number {
  if (percent >= 85) return RATHER_HAPPY;
  if (percent >= 65) return NEUTRAL;
  if (percent >= 45) return RATHER_UNHAPPY;
  return VERY_UNHAPPY;
}

const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8')) as T;

const sourceCandidates = readJson<RawCandidate[]>(resolve(sharedDirs[0], 'candidates-answers.json'));
const withdrawnIds = new Set(sourceCandidates.filter((c) => c.withdrawn).map((c) => c.id));

const isFeminine = (slug: string) => candidacies.find((c) => c.slug === slug)?.feminine === true;

const running = candidateSlugMap.filter((c) => !withdrawnIds.has(c.id));

const questions: QuizzQuestion[] = running.map((c) => ({
  _id: `question-2027-gagnait-${c.slug}`,
  fr: `Si ${c.pseudo} était élu${isFeminine(c.slug) ? 'e' : ''}, quel serait votre sentiment ?`,
  help: `https://www.quizz-du-berger.com/candidat/${c.slug}`,
  answers: ANSWERS,
  scores: SCORES,
}));

function answersFor(candidate: RawCandidate): Answer[] {
  const self = candidateSlugMap.find((c) => c.id === candidate.id);
  if (!self) throw new Error(`Unknown candidate ${candidate.pseudo}`);
  return running.map((other) => ({
    themeId: gagnaitThemeId,
    questionId: `question-2027-gagnait-${other.slug}`,
    answerIndex:
      other.slug === self.slug ? VERY_HAPPY : feelingFromProximity(getProximityBetween(self, other).percent),
  }));
}

async function main() {
  for (const dir of sharedDirs) {
    const quizzPath = resolve(dir, 'quizz-2027.json');
    const quizz = readJson<QuizzTheme[]>(quizzPath);
    const theme = quizz.find((t) => t._id === gagnaitThemeId);
    if (!theme) throw new Error(`${quizzPath}: theme ${gagnaitThemeId} not found`);
    theme.questions = questions;
    const formatted = await prettier.format(JSON.stringify(quizz), { parser: 'json', printWidth: 110 });
    writeFileSync(quizzPath, formatted);

    const candidatesPath = resolve(dir, 'candidates-answers.json');
    const candidates = readJson<RawCandidate[]>(candidatesPath);
    for (const candidate of candidates) {
      candidate.answers = [
        ...candidate.answers.filter((a) => a.themeId !== gagnaitThemeId),
        ...answersFor(candidate),
      ];
    }
    writeFileSync(candidatesPath, JSON.stringify(candidates, null, 2) + '\n');
  }
  console.log(
    `${questions.length} questions, ${sourceCandidates.length} candidates answered, 3 copies written.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
