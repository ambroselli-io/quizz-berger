/**
 * Regenerates the human-readable candidate exports in src/shared/candidates-answers/*.txt
 * from the two source-of-truth JSON files. No database involved: candidate answers live
 * in candidates-answers.json, not in Postgres.
 *
 * The first line of each .txt carries a hand-written party/positioning label that exists
 * nowhere else, so it is preserved as-is and only the body is regenerated.
 *
 * Usage: node api-express/scripts/extract-all-answers.js [--check]
 *   --check  report files that would change, write nothing (for CI)
 */
const fs = require("fs");
const path = require("path");

const sharedDir = path.resolve(__dirname, "../src/shared");
const outDir = path.join(sharedDir, "candidates-answers");
const quizz = require(path.join(sharedDir, "quizz-2027.json"));
const candidates = require(path.join(sharedDir, "candidates-answers.json"));

const checkOnly = process.argv.includes("--check");

function buildBody(candidate) {
  const answerFor = (questionId) => candidate.answers.find((a) => a.questionId === questionId);

  return quizz
    .map((theme) => {
      const blocks = theme.questions
        .map((question) => {
          const answer = answerFor(question._id);
          if (!answer) return null;
          return `${question._id}: ${question.fr}\n[${answer.answerIndex}] ${question.answers[answer.answerIndex]}`;
        })
        .filter(Boolean);
      if (!blocks.length) return null;
      return `${theme.fr}:\n\n\n${blocks.join("\n\n")}`;
    })
    .filter(Boolean)
    .join("\n\n\n");
}

const changed = [];
const missing = [];

for (const candidate of candidates) {
  const file = path.join(outDir, `${candidate.pseudo}.txt`);
  if (!fs.existsSync(file)) {
    missing.push(candidate.pseudo);
    continue;
  }
  const previous = fs.readFileSync(file, "utf8");
  const header = previous.split("\n")[0];
  const next = `${header}\n\n\n${buildBody(candidate)}\n`;
  if (next === previous) continue;
  changed.push(candidate.pseudo);
  if (!checkOnly) fs.writeFileSync(file, next);
}

if (missing.length) {
  console.error(`Aucun .txt pour : ${missing.join(", ")} (en-tête à écrire à la main d'abord)`);
}
console.log(
  changed.length
    ? `${changed.length} fichier(s) ${checkOnly ? "à mettre à jour" : "mis à jour"} : ${changed.join(", ")}`
    : "Tous les .txt sont à jour.",
);
process.exit(missing.length || (checkOnly && changed.length) ? 1 : 0);
