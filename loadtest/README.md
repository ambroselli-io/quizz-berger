# Load test: twice Elyze 2022

## Sizing

Elyze (the "Tinder of politics", 2022) passed **1.2 million downloads in about 15 days** in January 2022
and stayed #1 on the App Store. They never published hourly figures, so the peak below is an estimate.

| | Elyze 2022 (estimate) | Target x2 |
|---|---|---|
| Average per day over the launch fortnight | 80 k users | 160 k |
| Peak day (≈ 2.5x the average, press + TV) | 200 k | 400 k |
| Peak hour (≈ 12 % of the peak day, evening) | 25 k | **50 k quiz takers / h** |
| TV spike (3x the peak hour for a few minutes) | | **≈ 150 k / h for 5 min** |

For reference, Quizz du Berger 2027 peaked at 132 new users/day and 38/h (prod DB, Sept 2026):
the x2 target is roughly **1 300x** today's peak hour.

What one user costs, measured on the prod DB: **62 answers per user** on average → 62 `POST /answer`.

| | Sustained | TV spike |
|---|---|---|
| New visitors / s (75 % start the quiz) | 18 | 55 |
| `POST /answer` / s | ≈ 870 | ≈ 2 600 |
| SQL queries / s (≈ 4 per answer: JWT user lookup, findFirst, create, maybe user update) | ≈ 3 500 | ≈ 10 000 |
| Concurrent users (≈ 3 min per session) | ≈ 3 000 | ≈ 9 000 |

## The scenario (`elyze-x2.js`)

One iteration = one visitor, following what the web app actually calls:

1. SSR `GET /` + every `/assets/*.js|css` of the home page (no browser cache), `GET /public/count`, `POST /user/me` (401 when anonymous).
2. 25 % leave. The others: `POST /user` (anonymous user), `GET /answer`, `GET /answer/candidates`.
3. 62 × `POST /answer`, 1–4 s apart, on random questions and answers.
4. `GET /answer/friends` on the result page.

Profile: 5 min ramp → 20 min at 18 visitors/s → 1 min jump → 5 min at 55/s → 4 min ramp-down (35 min).

Pass criteria: < 1 % errors, API p95 < 500 ms, SSR p95 < 1 s.

## Run it

```sh
brew upgrade k6
# smoke, 5 %, against a local stack
k6 run -e SCALE=0.05 loadtest/elyze-x2.js
# full run
k6 run -e APP_URL=… -e API_URL=… loadtest/elyze-x2.js
```

Ladder, with `-e PROFILE=short` (12 min: 2 min ramp, 5 min plateau, 1 min jump, 3 min spike, 1 min down):
`SCALE=0.1`, `0.25`, `0.5`, `1`. Then one 35 min run (default profile) at the highest scale that held. Stop at the first failing step: that is the capacity, and the
next step is pointless until the bottleneck is fixed.

The full run needs ≈ 9 000 VUs: run k6 from a machine with 8+ vCPU / 16 GB in the same region, not from
a laptop on Wi-Fi (the laptop becomes the bottleneck).

## Before running

- Put the same random `LOAD_TEST_TOKEN` in the API `.env` on the VPS (`openssl rand -hex 32`) and pass it to k6
  (`-e LOAD_TEST_TOKEN=…`). Users created with it get `isLoadTest = true`, and their errors skip Sentry.
- Afterwards: `cd api-express && npx tsx scripts/delete-load-test-users.ts` (dry run), then `--confirm`.
  Remove `LOAD_TEST_TOKEN` from the `.env` once done.

- Run it at night: the goal is to find the breaking point, so the site goes down for real visitors too.
- **Rate limiter**: `POST /user` is limited to 300/h per IP (`api-express/src/utils/rate-limit.ts`) and the
  load test does not bypass it. From a single IP, every visitor after the 300th gets a 429.
- Watch the server during the run: `htop`, `pm2 monit`, and in Postgres
  `select count(*), state from pg_stat_activity group by state;`.
