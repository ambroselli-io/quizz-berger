# Context

Political quiz for the 2022 French presidential election. Users answer questions across topics (agriculture, health, etc.). Real candidates took the same quiz. An algorithm compares answers: exact match = 5 points, close = fewer, nothing in common = 0. This reveals unexpected political affinities.

Goal: show people that politics isn't black and white — make them relax, make them think.

# Architecture

- **App**: `app-react-router/` — React 19 + React Router v7 + Vite + Tailwind CSS v4 + Zustand + shadcn/Radix UI
- **API**: `api-express/` — Express, JWT cookies, CORS, Postgres via Prisma (user answers stored in `Answer` table, keyed by `themeId` + `questionId`)
- **Mobile**: `expo/` — Expo / React Native version
- **Shared code**: duplicated in `app-react-router/src/shared/`, `api-express/src/shared/` AND `expo/src/shared/` (no sync script — manual copy-paste between the three)
- **Candidates data**: `api-express/src/shared/candidates-answers.json` is the source of truth for candidate answers (static JSON, not DB). Text files in `api-express/src/shared/candidates-answers/*.txt` are human-readable versions. When updating candidates, edit the JSON and copy to `app-react-router/src/shared/` and `expo/src/shared/`.
- **Candidate pictures**: PNGs in `app-react-router/public/candidates/{slug}.png`. To generate: fetch portrait from Wikipedia API (`action=query&prop=pageimages&pithumbsize=800`), remove background with `rembg` (`pip install "rembg[cpu]"`), resize to max 800px, save as PNG.

# Conventions

- French UI strings, English code/comments
- Tailwind mobile-first, `max-lg:` for mobile overrides
- Path alias: `@app` → `app-react-router/src` (tsconfig + vite)
- Image CDN: `https://quizz-du-berger-og.cellar-c2.services.clever-cloud.com/`
- API host: dev = `localhost:5179`, prod = `api.quizz-du-berger.com`

# Dev

- App: `cd app-react-router && npm run dev` (port 5178)
- API: `cd api-express && npm run dev` (port 5179)
- Type check: `cd app-react-router && npx tsc --noEmit --project tsconfig.app.json`
- Build: `cd app-react-router && npx vite build`

# Modifying a question

Quiz questions live in `quizz-2027.json`, **duplicated in 3 places** (no sync script):
- `api-express/src/shared/quizz-2027.json`
- `app-react-router/src/shared/quizz-2027.json`
- `expo/src/shared/quizz-2027.json`

Question shape: `{ _id, fr, help?, answers: string[], scores: number[][] }`. **Invariant: `scores.length === answers.length` AND every `scores[i].length === answers.length`** — the scoring algorithm in `*/shared/utils/score.ts` indexes `question.scores[answer.answerIndex]` and will silently break otherwise.

Type definitions are also duplicated, not shared: `api-express/src/types/quizz.ts`, `app-react-router/src/types/quizz.ts`, `expo/src/types/quizz.ts`.

## Adding a question

1. Add the entry inside the right theme's `questions[]` in **all 3** `quizz-2027.json` files.
2. For each candidate in **all 3** `candidates-answers.json` files: add `{ themeId, questionId, answerIndex }` to their `answers[]` (otherwise the candidate is considered as not having answered).
3. Regenerate `api-express/src/shared/candidates-answers/*.txt` via `node api-express/scripts/extract-all-answers.js` (human-readable export, optional but keep it in sync).
4. If it's a "hot topic" question that should have its own SEO page: add an entry in `hotTopicSlugs` in `app-react-router/src/utils/seo.ts` (maps `_id` → `{ slug, seoTitle }`).
5. Regenerate the sitemap: `npx tsx app-react-router/scripts/generate-sitemap.ts`.
6. Question/theme/candidate counts shown in marketing copy are derived dynamically: `quizzQuestionsCount` and `quizzThemesCount` from `app-react-router/src/utils/quizz.ts`, `candidatesCount` from `app-react-router/src/utils/seo.ts`. Use those when adding new copy — don't hard-code numbers.

## Removing a question

1. Delete the entry in **all 3** `quizz-2027.json`.
2. Delete the matching `{ questionId }` entries in **all 3** `candidates-answers.json` for every candidate.
3. Regenerate the `.txt` candidate files.
4. Remove the `_id` from `hotTopicSlugs` in `app-react-router/src/utils/seo.ts` if it was there.
5. Regenerate sitemap.
6. Orphaned user answers remain in the Prisma `Answer` table (keyed by `questionId`) — harmless but consider a cleanup script if the volume matters.
7. The URL `/question/{themeId}/{questionId}` (React Router) and the slug-based `/question-politique/{slug}` (SEO) become 404 — acceptable for old shares.

## Changing a question's `_id`

Treat this as **remove + add** with the same `fr`/`answers`/`scores`. The `_id` is the primary key used by:
- URL routing (`/question/{themeId}/{questionId}`)
- Candidate answers (`candidates-answers.json` `questionId` field)
- User answers in DB (`Answer.questionId`)
- SEO slug mapping (`hotTopicSlugs` key in `seo.ts`)

Find/replace the old `_id` everywhere above. User answers in DB referencing the old `_id` become orphaned.

## Changing the answer list of an existing question

1. Update `answers[]` in **all 3** `quizz-2027.json`.
2. **Update `scores[][]` accordingly** — the matrix must stay square and match the new `answers.length`. Verify visually.
3. For **every** candidate in **all 3** `candidates-answers.json`: their `answerIndex` for this question is now potentially invalid (refers to the old order/list). Re-map manually or re-collect the candidate's answer.
4. User answers in DB (`Answer.answerIndex`) referencing the old indexes are now wrong. No automatic migration — accept the breakage or write a migration.
5. Regenerate `.txt` candidate exports.

## Changing only the scores matrix (rebalancing)

Just update `scores[][]` in **all 3** `quizz-2027.json`. Verify the square-matrix invariant. No other file needs updating — user/candidate answer indexes stay valid.
