// Load test sized on twice Elyze's 2022 launch (see loadtest/README.md for the maths).
//
//   k6 run -e LOAD_TEST_TOKEN=… -e PROFILE=short -e SCALE=0.1 loadtest/elyze-x2.js   # prod, 12 min, 10 %
//   k6 run -e LOAD_TEST_TOKEN=… loadtest/elyze-x2.js                                  # prod, 35 min, full x2
//   k6 run -e APP_URL=http://localhost:5178 -e API_URL=http://localhost:5179 …        # local stack
//
// SCALE=1 is the full x2 target. Every rate and VU budget is multiplied by it.
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Counter } from 'k6/metrics';

// www is the canonical host: the bare domain only redirects, which would double every page request.
const APP = __ENV.APP_URL || 'https://www.quizz-du-berger.com';
const API = __ENV.API_URL || 'https://api.quizz-du-berger.com';
const SCALE = Number(__ENV.SCALE || 1);
// Same value as LOAD_TEST_TOKEN in the API .env: flags the users for deletion, keeps errors out of Sentry
// and skips the per-IP rate limits.
const LOAD_TEST_TOKEN = __ENV.LOAD_TEST_TOKEN;
if (!LOAD_TEST_TOKEN) throw new Error('LOAD_TEST_TOKEN is required: without it the test users cannot be cleaned up.');

// Average answers per user measured on the prod DB (314k answers / 5k users, Sept 2026).
const ANSWERS_PER_USER = 62;
// Share of visitors who start the quiz; the others read the home page and leave.
const QUIZ_START_RATE = 0.75;

const questions = new SharedArray('questions', () =>
  JSON.parse(open('../api-express/src/shared/quizz-2027.json')).flatMap((theme) =>
    theme.questions.map((q) => ({ themeId: theme._id, questionId: q._id, answersCount: q.answers.length })),
  ),
);

const quizzesCompleted = new Counter('quizzes_completed');

const rate = (perSecond) => Math.max(1, Math.round(perSecond * SCALE));

const PROFILES = {
  // The plateaus last longer than one session (≈ 3 min), so each one reaches a steady state.
  short: [
    { duration: '2m', target: rate(18) },
    { duration: '5m', target: rate(18) },
    { duration: '1m', target: rate(55) },
    { duration: '3m', target: rate(55) },
    { duration: '1m', target: 0 },
  ],
  long: [
    { duration: '5m', target: rate(18) }, // ramp to 65k visitors/h (≈ 50k quiz takers/h)
    { duration: '20m', target: rate(18) }, // sustained evening peak
    { duration: '1m', target: rate(55) }, // TV / viral spike: 3x in one minute
    { duration: '5m', target: rate(55) },
    { duration: '4m', target: 0 },
  ],
};
const stages = PROFILES[__ENV.PROFILE || 'long'];
if (!stages) throw new Error(`PROFILE must be one of: ${Object.keys(PROFILES).join(', ')}`);

export const options = {
  scenarios: {
    visitors: {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      timeUnit: '1s',
      // Generous: a VU created mid-test takes time to start, and k6 drops the visitors that arrive meanwhile.
      preAllocatedVUs: rate(3000),
      maxVUs: rate(9000),
      stages,
    },
  },
  thresholds: {
    // Stops by itself after 1 min above 5 % errors, so real users are not left with a dead site.
    http_req_failed: ['rate<0.01', { threshold: 'rate<0.05', abortOnFail: true, delayAbortEval: '1m' }],
    'http_req_duration{kind:api}': ['p(95)<500', 'p(99)<1500'],
    'http_req_duration{kind:ssr}': ['p(95)<1000', 'p(99)<3000'],
    'http_req_duration{kind:asset}': ['p(95)<500'],
  },
  summaryTrendStats: ['avg', 'med', 'p(90)', 'p(95)', 'p(99)', 'max'],
};

export function setup() {
  const home = http.get(`${APP}/`);
  const assets = [...new Set([...home.body.matchAll(/(?:src|href)="(\/assets\/[^"]+\.(?:js|css))"/g)].map((m) => m[1]))];
  if (!assets.length) console.warn('No /assets/*.js|css found in the home page: assets will not be loaded.');
  return { assets };
}

const ssr = { tags: { kind: 'ssr' }, headers: { 'Accept-Encoding': 'gzip, br' } };
const asset = { tags: { kind: 'asset' }, headers: { 'Accept-Encoding': 'gzip, br' } };
const api = (token, name) => ({
  tags: { kind: 'api', name },
  headers: token
    ? { 'Content-Type': 'application/json', 'x-load-test': LOAD_TEST_TOKEN, Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json', 'x-load-test': LOAD_TEST_TOKEN },
});

export default function ({ assets }) {
  // Landing: SSR home, its bundle (no browser cache), then the calls Home.tsx makes on mount.
  check(http.get(`${APP}/`, ssr), { 'home 200': (r) => r.status === 200 });
  http.batch(assets.map((path) => ['GET', `${APP}${path}`, null, asset]));
  http.get(`${API}/public/count`, api(null, 'GET /public/count'));
  http.post(`${API}/user/me`, null, Object.assign(api(null, 'POST /user/me'), { responseCallback: http.expectedStatuses(200, 401) }));

  sleep(2 + Math.random() * 6);
  if (Math.random() > QUIZ_START_RATE) return;

  // The API skips its rate limits for requests carrying LOAD_TEST_TOKEN.
  const created = http.post(`${API}/user`, null, api(null, 'POST /user'));
  if (!check(created, { 'anonymous user created': (r) => r.status === 200 })) return;
  const token = created.json('token');

  http.get(`${API}/answer`, api(token, 'GET /answer'));
  http.get(`${API}/answer/candidates`, api(null, 'GET /answer/candidates'));

  const start = Math.floor(Math.random() * questions.length);
  for (let i = 0; i < ANSWERS_PER_USER; i++) {
    const q = questions[(start + i) % questions.length];
    sleep(1 + Math.random() * 3);
    const res = http.post(
      `${API}/answer`,
      JSON.stringify({ themeId: q.themeId, questionId: q.questionId, answerIndex: Math.floor(Math.random() * q.answersCount) }),
      api(token, 'POST /answer'),
    );
    check(res, { 'answer saved': (r) => r.status === 200 });
  }

  http.get(`${API}/answer/friends`, api(token, 'GET /answer/friends'));
  quizzesCompleted.add(1);
}
