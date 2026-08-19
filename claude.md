# Context

Political quiz for the 2022 French presidential election. Users answer questions across topics (agriculture, health, etc.). Real candidates took the same quiz. An algorithm compares answers: exact match = 5 points, close = fewer, nothing in common = 0. This reveals unexpected political affinities.

Goal: show people that politics isn't black and white — make them relax, make them think.

# Architecture

- **App**: `app-tanstack/` — React 19 + TanStack Start (TanStack Router, SSR) + Vite + Tailwind CSS v4 + Zustand + shadcn/Radix UI. File-based routes in `src/routes/` (thin: `loader`/`head()`/`notFound()`); page components in `src/pages/`. Per-page SEO meta via each route's `head()` + the `seoHead()` helper in `src/utils/seo-head.ts`. Router API is accessed through the compat shim `src/lib/router.tsx` (`Link`/`useNavigate`/`useParams`). Prod is served by `server.mjs` (Express adapter over the `dist/server/server.js` web-fetch handler). `src/routeTree.gen.ts` is generated (gitignored) by the Vite plugin / `tsr generate`.
- **API**: `api-express/` — Express, JWT cookies, CORS, Postgres via Prisma (user answers stored in `Answer` table, keyed by `themeId` + `questionId`)
- **Mobile**: `expo/` — Expo / React Native version. Questions are **fetched from the API at launch** (`GET /quizz/version`, then `GET /quizz` when the hash changed) and cached in AsyncStorage, so a new question reaches installed apps without an App Store release. `expo/src/shared/quizz-2027.json` is still bundled as the first-launch and offline fallback, and `expo/src/shared/__tests__/shared-data.test.ts` fails if it drifts from the API copy.
- **Shared code**: duplicated in `app-tanstack/src/shared/`, `api-express/src/shared/` AND `expo/src/shared/` (no sync script — manual copy-paste between the three)
- **Candidates data**: `api-express/src/shared/candidates-answers.json` is the source of truth for candidate answers (static JSON, not DB). Text files in `api-express/src/shared/candidates-answers/*.txt` are human-readable versions. When updating candidates, edit the JSON and copy to `app-tanstack/src/shared/` and `expo/src/shared/`.
- **Candidate pictures**: PNGs in `app-tanstack/public/candidates/{slug}.png`. To generate: fetch portrait from Wikipedia API (`action=query&prop=pageimages&pithumbsize=800`), remove background with `rembg` (`pip install "rembg[cpu]"`), resize to max 800px, save as PNG.

# Conventions

- French UI strings, English code/comments
- Tailwind mobile-first, `max-lg:` for mobile overrides
- Path alias: `@app` → `app-tanstack/src` (tsconfig + vite)
- Image CDN: `https://quizz-du-berger-og.cellar-c2.services.clever-cloud.com/`
- API host: dev = `localhost:5179`, prod = `api.quizz-du-berger.com`

# Dev

- App: `cd app-tanstack && npm run dev` (port 5178)
- API: `cd api-express && npm run dev` (port 5179)
- Type check: `cd app-tanstack && npm run typecheck` (runs `tsr generate` then `tsc -b` — needed because `routeTree.gen.ts` is gitignored)
- Build: `cd app-tanstack && npm run build` (generates sitemap, then `vite build` → `dist/`)
- Mobile tests: `cd expo && npm test` (Jest + React Native Testing Library, no emulator needed) and `npm run ts:check`. `npm test` also gates the `build-*` / `build-and-upload:*` scripts.

# Polls (sondages)

`app-tanstack/src/content/sondages-2027.json` is **generated**, not hand-written. `npm run fetch-sondages` (`scripts/fetch-sondages.ts`) downloads the MieuxVoter open dataset (`github.com/MieuxVoter/presidentielle2027`, MIT), keeps the first-round entries, and writes monthly averages per candidate plus the last 12 polls. `.github/workflows/refresh-sondages.yml` runs it every Monday and opens a PR when a new poll actually landed (a `fetchedAt`-only diff is discarded).

It feeds `/sondages-presidentielle-2027` (SVG timeline, no chart library) and the "dans les sondages" block on every `/candidat/{slug}`. Candidates the institutes never test are listed explicitly — that is deliberate, it answers the "sondage {candidat}" searches for Branco, Asselineau and the others.

# Candidate proximity

`app-tanstack/src/utils/proximity.ts` ranks every candidate against every other one, reusing `question.scores`. The matrix is asymmetric on purpose (it is authored as "user answer" × "candidate answer"), so a pair averages both directions to stay symmetric. Powers the "candidats les plus proches" section of `/candidat/{slug}` and the figures quoted in the `{candidat}-droite-ou-gauche` articles. **If you change a scores matrix or a candidate answer, those article figures go stale** — they are hard-coded prose, not computed. `src/content/articles/proximity-figures.test.ts` parses each article's ranking list and its inline `Nom (43 %)` mentions, and fails when the percentages, the identical-answer counts or the ORDER stop matching the live computation. Run `npm run fix-proximity-figures` to rewrite those two shapes from the data, then fix the bare figures inside sentences by hand from the list it prints. Never relax the test, and never use `vitest -u` on it: it is not a snapshot. Counts quoted from a single question ("14 des 26 répondent que...") should use `getAnswerDistribution(questionId)` from `utils/seo.ts` instead of a literal.

# Political parties

`app-tanstack/src/content/parties.ts` is the only place that knows which candidate belongs to which party — `candidates-answers.json` has no party field, and the API and the Expo app do not need one. `app-tanstack/src/utils/parties.ts` derives everything else: a party's positions are its candidates' answers, and party-to-party proximity averages `getProximityBetween` over every cross-party candidate pair, so the percentages stay consistent with `/candidat` and `/comparer`.

Pages: `/partis` (hub), `/parti/{slug}`, and `/parti/{slug}/{theme}`. A movement gets an entry only when a quiz candidate belongs to it AND the name is searched for — the one-person movements of the roster (La Convention, Nous France, La France humaniste, Nouvelle Énergie, Debout !, L'Après, Génération écologie) are listed on `/partis` under "les candidats sans grand parti" and link to the candidate page. Theme sub-pages exist only for the parties flagged `hasThemePages` (RN, LFI, LR, PS, Renaissance — the ones where "programme {parti} 2027 {thème}" is a real Google autocomplete) crossed with the ten themes of `PARTY_THEME_LABELS`. Every other couple 404s on purpose: the pairwise `/comparer` tail was mass-demoted to "Crawled - currently not indexed" in July 2026, don't repeat it.

French forces four name forms per party (`name`, `theName`, `theShort`, `ofName`, `ofShort`, plus `plural`): "le RN" but "LFI", "du Parti socialiste" but "des Républicains" and "d'Horizons". Deriving them from `name` with a rule is wrong for half the list, so they are authored. Candidate names use the `deName()` helper for the elision ("d'Éric Zemmour").

**Never write an ideological label on a party or a candidate** — no "droite", "extrême", "populiste", "souverainiste". Party `intro` fields carry founding date, name changes and who leads the party, nothing else. Same rule for the first line of `api-express/src/shared/candidates-answers/*.txt`: party plus a stable factual role. The `{candidat}-droite-ou-gauche` blog articles are the exception — signed editorial analysis of positions computed from the quiz.

When adding a candidate, add their slug to the right party's `candidateSlugs` (or leave them out and they appear under "sans grand parti"), and give them their own colour: the party colour is its first candidate's.

# Blog articles

One file per article in `app-tanstack/src/content/articles/{slug}.ts`, each exporting `article: Article` (type in `app-tanstack/src/types/article.ts`). `articles/index.ts` imports them all and exports the `articles` array, newest first.

To add one: create `{slug}.ts`, then add the import line and the array entry in `index.ts`. The file name must equal the `slug` field — it is the `/blog/{slug}` URL, and the sitemap is generated from the array. `.claude/commands/draft-blog-post.md` holds the full editorial process.

# Modifying a question

Quiz questions live in `quizz-2027.json`, **duplicated in 3 places** (no sync script):
- `api-express/src/shared/quizz-2027.json`
- `app-tanstack/src/shared/quizz-2027.json`
- `expo/src/shared/quizz-2027.json`

Question shape: `{ _id, fr, help?, answers: string[], scores: number[][] }`. **Invariant: `scores.length === answers.length` AND every `scores[i].length === answers.length`** — the scoring algorithm in `*/shared/utils/score.ts` indexes `question.scores[answer.answerIndex]` and will silently break otherwise.

Type definitions are also duplicated, not shared: `api-express/src/types/quizz.ts`, `app-tanstack/src/types/quizz.ts`, `expo/src/types/quizz.ts`.

**Any change to the question set breaks two snapshot tests on purpose** — they exist to force an explicit acknowledgement:
- `app-tanstack/src/pages/__snapshots__/Themes.test.tsx.snap` — per-theme question counts.
- `app-tanstack/src/pages/__snapshots__/Result.test.tsx.snap` — candidate percentages, recomputed over the new question set.

CI (`.github/workflows/deploy.yml`) runs `npm test` before deploying, so stale snapshots block production. After any change below: `cd app-tanstack && npx vitest run -u`, then read the `.snap` diff and confirm it matches what you changed (one theme's count moved by the expected amount; percentages shifted a few points; the pinned candidate still at 100%). A larger diff means the data is wrong — usually a non-square `scores` matrix or a missing/incorrect candidate `answerIndex`. Commit the `.snap` files with the change.

## Adding a question

**One axis per question.** Before writing the `answers[]`, write down in one sentence what single thing the answer index measures (e.g. "how much to increase effectifs/moyens"). If a candidate's real-world position varies independently along a second dimension — which financing mechanism, a legal/status question, an organizational choice — that's a different axis and does not belong in the same answer list. Folding several axes into one question (e.g. "financing technique" + "volunteer status" + "how much") produces answer options that aren't comparable to each other and a candidate mapping nobody can follow. This has gone wrong more than once on this repo — treat it as a hard requirement, not a style preference.

1. Add the entry inside the right theme's `questions[]` in **all 3** `quizz-2027.json` files.
2. For each candidate in **all 3** `candidates-answers.json` files: add `{ themeId, questionId, answerIndex }` to their `answers[]` (otherwise the candidate is considered as not having answered).
3. Regenerate `api-express/src/shared/candidates-answers/*.txt` via `node api-express/scripts/extract-all-answers.js` (human-readable export, optional but keep it in sync).
4. If it's a "hot topic" question that should have its own SEO page: add an entry in `hotTopicSlugs` in `app-tanstack/src/utils/seo.ts` (maps `_id` → `{ slug, seoTitle }`).
5. Regenerate the sitemap: `npx tsx app-tanstack/scripts/generate-sitemap.ts`.
6. Question/theme/candidate counts shown in marketing copy are derived dynamically: `quizzQuestionsCount` and `quizzThemesCount` from `app-tanstack/src/utils/quizz.ts`, `candidatesCount` from `app-tanstack/src/utils/seo.ts`. Use those when adding new copy — don't hard-code numbers.

## Removing a question

1. Delete the entry in **all 3** `quizz-2027.json`.
2. Delete the matching `{ questionId }` entries in **all 3** `candidates-answers.json` for every candidate.
3. Regenerate the `.txt` candidate files.
4. Remove the `_id` from `hotTopicSlugs` in `app-tanstack/src/utils/seo.ts` if it was there.
5. Regenerate sitemap.
6. Orphaned user answers remain in the Prisma `Answer` table (keyed by `questionId`) — harmless but consider a cleanup script if the volume matters.
7. The URL `/question/{themeId}/{questionId}` (app route) and the slug-based `/question-politique/{slug}` (SEO) become 404 — acceptable for old shares.

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
