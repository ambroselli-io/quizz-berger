---
description: Draft a news-reactive SEO blog post about a hot French political topic, add it to the quiz if it's missing, and open a draft PR
argument-hint: "[sujet imposé — laisser vide pour laisser l'agent choisir]"
---

# Draft a hot-topic blog post (and grow the quiz)

You are drafting a blog article for quizz-du-berger.com, a neutral French political quiz site comparing users' answers to the candidates' positions for the 2027 presidential election. The article format is: "what is going on with [hot topic], and what does each candidate think about it".

**Important context on the data**: the candidates did NOT answer the quiz themselves. Arnaud (the site owner) filled in each candidate's answers based on their public positions, votes and statements — the whole dataset is already careful human estimation. So estimating a candidate's position is normal practice here; what matters is that every estimate is (a) grounded in their actual track record, and (b) flagged for review so Arnaud can veto it. A human reviews every PR before anything goes live.

## 1. Load context

Read these files first:

- `app-tanstack/src/content/articles/` — one file per article, named `{slug}.ts`, all listed in `index.ts`. Read `index.ts` for the existing slugs, then `accord-ue-mercosur-france-candidats-2027.ts` as the reference template (format, tone).
- `app-tanstack/src/shared/quizz-2027.json` — quiz themes and questions.
- `app-tanstack/src/shared/candidates-answers.json` — the candidates' quiz answers.
- `app-tanstack/src/utils/seo.ts` — candidate slugs, theme slugs, hot-topic question slugs (for internal links).
- `CLAUDE.md` at the repo root — especially the "Adding a question" and "Candidate proximity" sections; follow them exactly if step 3 applies.
- `.claude/skills/no-ai-slop/SKILL.md` + `french.md` + `eval.md` — the writing rules for this site. Non-negotiable: the article gets checked against them before the PR opens (step 6).

## 2. Scout for a topic

**If a topic was passed as an argument (`$ARGUMENTS` is non-empty), use it — do not scout.** Run only the coverage check:

1. Read `app-tanstack/src/content/articles/index.ts` and compare against every existing article, by subject rather than by wording.
2. **Already covered** → stop. Do not write, do not branch, do not open a PR. Report which article covers it (slug + title + date) and ask whether to proceed anyway with a genuinely new angle. Wait for the answer.
3. **Not covered** → skip the hot/substantive tests below. The topic was chosen deliberately; a quiet or niche subject is a valid request, not a reason to refuse. Go to the theme-mapping check.

Web-search the topic anyway to gather current facts and sources — steps 4–5 still need dated, sourced material.

**If no argument was passed**, scout as usual. Web-search French political news from the last 7 days (e.g. "actualité politique France", "présidentielle 2027", plus themes from the quiz). Build a shortlist of 3–5 topics, then pick one that is:

1. **Genuinely hot**: covered by several major French outlets (Le Monde, Le Figaro, France Info, Les Échos, Libération…) this week.
2. **Not already covered**: no existing article in `app-tanstack/src/content/articles/` covers it (a new major development on an old topic is acceptable only if the angle is genuinely new).
3. **Politically substantive**: a real dividing line between candidates — not a pure fait divers, poll horse-race, or personality story with no policy content.

Then check whether the topic maps to an existing theme/question in `quizz-2027.json`:

- **It maps** → write the article (steps 4–5), linking to the existing question pages.
- **It doesn't map but it's a durable political question** → even better: **add it to the quiz as a new question** (step 3), then write the article around that new question. Growing the quiz with the news cycle is a goal, not a problem.

Skip entirely (no PR, just a short report of rejected topics) only when nothing this week is hot + new + substantive. Skipping is a valid outcome, not a failure. This applies to the scouting path only — never skip a topic that was passed as an argument.

## 3. If the topic is missing: add a question to the quiz

Follow `CLAUDE.md` → "Adding a question" precisely:

1. Choose the most fitting existing theme in `quizz-2027.json`. New `_id` follows the pattern of that theme's questions (e.g. `question-2027-ae-07` — theme initials + next number).
2. Write the question in French with 4–6 answer options spanning the whole political spectrum, nuanced like existing questions (read several for tone). Add a `help` URL (Wikipedia or a solid explainer) when useful.

   **One axis per question — this has been gotten wrong repeatedly and Arnaud has called it out more than once.** A question must let the reader move along a single dimension (e.g. "how much should effectifs/moyens increase, from a lot to not at all"). Do NOT build the answer list by combining several independent choices — a financing mechanism (which tax), a status/legal question (volunteer vs statutory), AND a quantity (how much) are three separate axes, and mashing them into one 6-way list makes every answer describe a different, unrelated decision, so no reader or candidate mapping is coherent. Before finalizing the answers, write down in one sentence what the *single* thing the answer index is meant to measure. If you can't state that in one sentence without "and", split it or drop the secondary axis — never fold it in as extra clauses inside each answer option ("financé par X, sans nouvelle mesure Y, tout en préservant Z"). When in doubt, cut it down to the axis the news hook is actually about and leave the rest as scene-setting prose in the article, not as answer-differentiating content.
3. Build the `scores` matrix. **Invariant: `scores.length === answers.length` and every row has `answers.length` entries.** Model it on a similar existing question: 5 on the diagonal (exact match), decreasing values for ideologically closer answers, 0 for nothing in common. The matrix should be symmetric unless there's a good reason.
4. Add the entry to the theme's `questions[]` in **all 3** copies: `api-express/src/shared/quizz-2027.json`, `app-tanstack/src/shared/quizz-2027.json`, `expo/src/shared/quizz-2027.json` (they must stay identical).
5. For **every** candidate in **all 3** `candidates-answers.json` files, add `{ themeId, questionId, answerIndex }` — see step 4 below for how to choose each `answerIndex`.
6. Regenerate the human-readable exports: `node api-express/scripts/extract-all-answers.js`.
7. Add the question to `hotTopicSlugs` in `app-tanstack/src/utils/seo.ts` (`_id` → `{ slug, seoTitle }`) so it gets its own SEO page — it's a hot topic by definition.
8. Do NOT regenerate the sitemap (built at deploy time). Do NOT touch the DB or Prisma.
9. **Adding a question silently invalidates the `{candidat}-droite-ou-gauche` articles.** They quote proximity percentages and identical-answer counts as prose, computed over the whole question set, so one more question moves all of them. Nothing conflicts textually and git reports nothing. Step 6 has the repair procedure; it is not optional.

## 4. Establish candidate positions

For each candidate, in priority order:

1. **Existing quiz answers** in `candidates-answers.json` (resolve `answerIndex` against the question's `answers[]`).
2. **Public record found this session**: votes, interviews, communiqués, party platforms — searched during research.
3. **Educated estimate**: if nothing explicit exists, infer the most defensible position from the candidate's ideology, party line, and track record on adjacent issues — exactly as Arnaud does when filling the quiz. Pick the answer option they would most plausibly choose. Never leave a candidate out just because they haven't spoken on the topic.

Every position must be tagged internally as `data` / `sourced` / `estimated` — you'll report this in the PR body so the reviewer can veto estimates quickly.

Group candidates into 2–4 "familles" of positions like the Mercosur article, each with a short justification per candidate. In the article text, phrase sourced positions affirmatively and estimated ones with appropriately conditional French ("fidèle à sa ligne souverainiste, il devrait…", "sa position publique laisse penser que…").

## 5. Write the article

Create ONE new file `app-tanstack/src/content/articles/{slug}.ts`, then register it in `app-tanstack/src/content/articles/index.ts` (one `import { article as article{SlugInPascalCase} } from './{slug}';` line plus one entry at the top of the `articles` array — the array is sorted newest first).

The new file exports a single `article` object, matching the existing shape exactly:

```ts
import type { Article } from '~/types/article';
import { candidatesCount } from '~/utils/seo';

export const article: Article = { … };
```

Import `quizzQuestionsCount` / `quizzThemesCount` from `~/utils/quizz` only if the text uses them — `noUnusedLocals` is on and an unused import fails the type-check.

Fields:

- `slug`: kebab-case, descriptive, ending in `-france-candidats-2027` when it fits (e.g. `taxe-zucman-france-candidats-2027`).
- `title`: French, includes `${candidatesCount}` (template variable, do not hard-code the number) — e.g. `` `Taxe Zucman : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027` ``.
- `excerpt`: 1–2 sentences, question-styled hooks work well.
- `date`: today, `YYYY-MM-DD`.
- `tag`: `'Analyse'`.
- `content`: an HTML template string with this structure:
  - intro paragraph (why this is in the news now);
  - `<h2>` sections explaining the topic: definition, dated chronology (`<ul>` with `<strong>` dates), why it divides France (`<h3>` sub-angles);
  - `<h2>Les positions des ${candidatesCount} candidats…</h2>` with the familles as `<h3>` + `<ul>`, each candidate linked to `/candidat/{slug}` (slugs from `seo.ts`);
  - a `<table>` of arguments pour/contre;
  - `<h2>Pour aller plus loin</h2>` linking related `/theme/{slug}` and `/question-politique/{slug}` pages — including the new question's page if step 3 applied;
  - final CTA: `<p><a href="/themes">→ Faire le quiz</a></p>`.
- `schema`: Article JSON-LD like the existing entries (author `Arnaud Ambroselli`, `datePublished` = today, relevant `about` entries).

All facts (dates, numbers, votes) must come from sources actually read this session. Tone: sober, factual, neutral — explain every side fairly, zero editorializing. French UI text.

**Cite inline, in the body text — not only in the PR description.** This has been flagged more than once: listing sources in the PR body is not enough, the reader of the published article never sees the PR. Every dated fact, quote, or statistic that comes from a specific source must be a hyperlink at the point it's stated, `<a href="{source URL}" target="_blank" rel="noopener noreferrer">{the fact or quote itself, or a few words of it}</a>` — wrap the claim, not a generic "source" or "ici" link. Aim for most of the URLs gathered during research to end up linked somewhere in the article body; if a research URL never became an inline citation, that's a sign either the claim it supported got cut or the citation got forgotten — check before opening the PR. Internal links (`/candidat/…`, `/theme/…`, `/question-politique/…`) stay as before and don't need `target="_blank"`.

**Write it under the `no-ai-slop` rules, not as a cleanup pass afterwards.** The traps this format walks into, all documented with real examples in `.claude/skills/no-ai-slop/french.md`:

- **The intro machine.** Do not open with a comma-spliced list of noun phrases, a colon, then "Voici ce qu'il faut savoir / Voici les éléments à connaître". Six articles opened that way before this rule existed and the series read as generated. Open on the single most concrete fact, in a plain sentence, and vary the shape from the last article.
- **Prose em dashes: 2 per article, max.** The `Nom</a> (Parti) — description` separator in candidate bullets doesn't count; it's a list format. Everything else should be a comma, a parenthesis, or a second sentence.
- **No "Fait notable :" / "Fait remarquable," / "Important :".** State the fact; if it's surprising, the reader will notice.
- **No colon reveals** ("La peine : trois ans de prison"). Give it a verb.
- **No recap paragraph before the CTA.** End on the links and `→ Faire le quiz`.
- **Name every source, or cut the claim** — no "selon certains analystes". Honest hedges about disputed figures ("le bilan exact est disputé") are the opposite of weasel wording: keep those.

Keep the section skeleton and the search-query headings — that's SEO and reader convention. Vary the sentences inside it.

## 6. Validate

The CI that runs on `main` (`.github/workflows/deploy.yml`) runs **type-check AND tests**, and a failing test blocks the production deploy. Run both here, in this order:

```
cd app-tanstack && npm install && npm run typecheck && npm test
```

Fix any type errors. If a question was added, double-check: the 3 `quizz-2027.json` are identical, the 3 `candidates-answers.json` each gained one entry per candidate, and the scores matrix is square. Also re-read the `answers[]` you just wrote and confirm out loud (in your PR body) what single axis they measure — if two answers differ on more than that one axis, rewrite before moving on.

**Adding a question always breaks three things — that is by design, and repairing them is part of the job.** Two are snapshots you accept, one needs real edits:

- `src/pages/__snapshots__/Themes.test.tsx.snap` — per-theme question counts (the new question's theme gains 1).
- `src/pages/__snapshots__/Result.test.tsx.snap` — candidate percentages shift by a point or two, since the score is computed over one more question.
- `src/content/articles/proximity-figures.test.ts` — **not a snapshot, never fix it with `-u`.** It only fails if an article hard-codes a proximity figure; see "Check the positioning articles" below.

When (and only when) the remaining failures are exactly those two snapshots and the diff matches what you changed, accept them:

```
cd app-tanstack && npx vitest run -u && npm test
```

Then read `git diff` on both `.snap` files and sanity-check it before committing:

- Themes: **exactly one** theme's `questionCount` went up by 1, and it's the theme you added to. Nothing else moved.
- Result: percentages move by a few points at most, the pinned candidate stays at `100`, and no candidate disappears from the list.

If the diff is bigger than that — a theme you didn't touch changed, a candidate vanished, a percentage swings wildly — you broke something (usually a non-square `scores` matrix, a wrong `answerIndex`, or a candidate missing the new question). Fix the data and re-run; do **not** paper over it with `-u`.

Commit the updated `.snap` files in the same PR as the question. A PR that adds a question without them will fail CI on merge and block the deploy.

### Check the positioning articles (only if you added a question)

The `{candidat}-droite-ou-gauche` articles quote proximity figures, and those figures **update themselves**: the articles call `proximityListHtml()`, `proximityPercent()`, `proximityRank()` and friends from `src/utils/proximity.ts` inside their template strings. Your new question changes the numbers with no edit from you, and `proximity-figures.test.ts` fails if anyone ever pastes a literal back in.

Two things the renderers cannot do, so read for them:

1. **Counts scoped to a theme.** Your question landed in one, and sentences like "sur les dix questions de sécurité, huit de ses réponses sont identiques à celles de Laurent Wauquiez" are plain prose. Grep the positioning articles for that shape and recount by hand.
2. **Sentences whose argument depends on the ranking.** "Le patron de son parti d'origine n'arrive qu'en 6e position" stays true only while he does. Adding a candidate can insert someone into a top-6 and make a "devant X, puis Y" sentence skip a name. Render the articles and read the intro paragraphs:

```
cd app-tanstack && npx tsx --tsconfig ./tsconfig.app.json -e "import('./src/content/articles/index.ts').then(m => m.articles.filter(a => a.slug.endsWith('-droite-ou-gauche')).forEach(a => console.log(a.slug, '\n', a.content.replace(/<[^>]+>/g, '').slice(0, 700))))"
```

Then run the article through `.claude/skills/no-ai-slop/eval.md` plus the French checks in `french.md` yourself, and fix what fails before opening the PR. Count the prose em dashes explicitly (total `—` minus one per candidate bullet) and confirm it lands at 0–2.

## 7. Open a draft PR

- Create a branch `blog/<slug>` from main.
- Commit all the files changed above (article, and quiz/answers/seo files + the two updated `.snap` files if a question was added).
- Push the branch and open a **draft PR** to `main` (use `gh pr create --draft` if available; otherwise push and report the branch name).
- PR title: `blog: <article title>` (add `+ new question` if step 3 applied).
- PR body must include:
  - why this topic was chosen, and which topics were rejected;
  - all sources consulted, with URLs — this list is a convenience for the reviewer, it does **not** replace the inline citations required in the article body itself (see step 5);
  - if a question was added: the full question, answers, scores matrix and which theme it joined;
  - a per-candidate table: chosen position, and whether it's backed by **quiz data**, a **linked public statement**, or an **estimate** (with one line of reasoning) — so the reviewer can fact-check or veto each estimate fast;
  - if a question was added: confirmation that you re-read the positioning articles for theme-scoped counts and ranking-dependent sentences (the figures themselves update on their own).

**NEVER push to `main` directly — pushing to main deploys production.** The human reviews and merges the PR.
