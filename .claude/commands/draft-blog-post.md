---
description: Draft a news-reactive SEO blog post about a hot French political topic, add it to the quiz if it's missing, and open a draft PR
---

# Draft a hot-topic blog post (and grow the quiz)

You are drafting a blog article for quizz-du-berger.com, a neutral French political quiz site comparing users' answers to the candidates' positions for the 2027 presidential election. The article format is: "what is going on with [hot topic], and what does each candidate think about it".

**Important context on the data**: the candidates did NOT answer the quiz themselves. Arnaud (the site owner) filled in each candidate's answers based on their public positions, votes and statements — the whole dataset is already careful human estimation. So estimating a candidate's position is normal practice here; what matters is that every estimate is (a) grounded in their actual track record, and (b) flagged for review so Arnaud can veto it. A human reviews every PR before anything goes live.

## 1. Load context

Read these files first:

- `app-tanstack/src/content/articles.ts` — existing articles (slugs, format, tone). The Mercosur article (`accord-ue-mercosur-france-candidats-2027`) is the reference template.
- `app-tanstack/src/shared/quizz-2027.json` — quiz themes and questions.
- `app-tanstack/src/shared/candidates-answers.json` — the candidates' quiz answers.
- `app-tanstack/src/utils/seo.ts` — candidate slugs, theme slugs, hot-topic question slugs (for internal links).
- `CLAUDE.md` at the repo root — especially the "Adding a question" section; follow it exactly if step 3 applies.

## 2. Scout for a topic

Web-search French political news from the last 7 days (e.g. "actualité politique France", "présidentielle 2027", plus themes from the quiz). Build a shortlist of 3–5 topics, then pick one that is:

1. **Genuinely hot**: covered by several major French outlets (Le Monde, Le Figaro, France Info, Les Échos, Libération…) this week.
2. **Not already covered**: no existing article in `articles.ts` covers it (a new major development on an old topic is acceptable only if the angle is genuinely new).
3. **Politically substantive**: a real dividing line between candidates — not a pure fait divers, poll horse-race, or personality story with no policy content.

Then check whether the topic maps to an existing theme/question in `quizz-2027.json`:

- **It maps** → write the article (steps 4–5), linking to the existing question pages.
- **It doesn't map but it's a durable political question** → even better: **add it to the quiz as a new question** (step 3), then write the article around that new question. Growing the quiz with the news cycle is a goal, not a problem.

Skip entirely (no PR, just a short report of rejected topics) only when nothing this week is hot + new + substantive. Skipping is a valid outcome, not a failure.

## 3. If the topic is missing: add a question to the quiz

Follow `CLAUDE.md` → "Adding a question" precisely:

1. Choose the most fitting existing theme in `quizz-2027.json`. New `_id` follows the pattern of that theme's questions (e.g. `question-2027-ae-07` — theme initials + next number).
2. Write the question in French with 4–6 answer options spanning the whole political spectrum, nuanced like existing questions (read several for tone). Add a `help` URL (Wikipedia or a solid explainer) when useful.
3. Build the `scores` matrix. **Invariant: `scores.length === answers.length` and every row has `answers.length` entries.** Model it on a similar existing question: 5 on the diagonal (exact match), decreasing values for ideologically closer answers, 0 for nothing in common. The matrix should be symmetric unless there's a good reason.
4. Add the entry to the theme's `questions[]` in **all 3** copies: `api-express/src/shared/quizz-2027.json`, `app-tanstack/src/shared/quizz-2027.json`, `expo/src/shared/quizz-2027.json` (they must stay identical).
5. For **every** candidate in **all 3** `candidates-answers.json` files, add `{ themeId, questionId, answerIndex }` — see step 4 below for how to choose each `answerIndex`.
6. Regenerate the human-readable exports: `node api-express/scripts/extract-all-answers.js`.
7. Add the question to `hotTopicSlugs` in `app-tanstack/src/utils/seo.ts` (`_id` → `{ slug, seoTitle }`) so it gets its own SEO page — it's a hot topic by definition.
8. Do NOT regenerate the sitemap (built at deploy time). Do NOT touch the DB or Prisma.

## 4. Establish candidate positions

For each candidate, in priority order:

1. **Existing quiz answers** in `candidates-answers.json` (resolve `answerIndex` against the question's `answers[]`).
2. **Public record found this session**: votes, interviews, communiqués, party platforms — searched during research.
3. **Educated estimate**: if nothing explicit exists, infer the most defensible position from the candidate's ideology, party line, and track record on adjacent issues — exactly as Arnaud does when filling the quiz. Pick the answer option they would most plausibly choose. Never leave a candidate out just because they haven't spoken on the topic.

Every position must be tagged internally as `data` / `sourced` / `estimated` — you'll report this in the PR body so the reviewer can veto estimates quickly.

Group candidates into 2–4 "familles" of positions like the Mercosur article, each with a short justification per candidate. In the article text, phrase sourced positions affirmatively and estimated ones with appropriately conditional French ("fidèle à sa ligne souverainiste, il devrait…", "sa position publique laisse penser que…").

## 5. Write the article

Add ONE new entry to the `articles` array in `app-tanstack/src/content/articles.ts`, matching the existing shape exactly:

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

## 6. Validate

```
cd app-tanstack && npm install && npm run typecheck
```

Fix any errors. If a question was added, double-check: the 3 `quizz-2027.json` are identical, the 3 `candidates-answers.json` each gained one entry per candidate, and the scores matrix is square.

## 7. Open a draft PR

- Create a branch `blog/<slug>` from main.
- Commit all the files changed above (article, and quiz/answers/seo files if a question was added).
- Push the branch and open a **draft PR** to `main` (use `gh pr create --draft` if available; otherwise push and report the branch name).
- PR title: `blog: <article title>` (add `+ new question` if step 3 applied).
- PR body must include:
  - why this topic was chosen, and which topics were rejected;
  - all sources consulted, with URLs;
  - if a question was added: the full question, answers, scores matrix and which theme it joined;
  - a per-candidate table: chosen position, and whether it's backed by **quiz data**, a **linked public statement**, or an **estimate** (with one line of reasoning) — so the reviewer can fact-check or veto each estimate fast.

**NEVER push to `main` directly — pushing to main deploys production.** The human reviews and merges the PR.
