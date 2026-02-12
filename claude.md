# Context

Political quiz for the 2022 French presidential election. Users answer questions across topics (agriculture, health, etc.). Real candidates took the same quiz. An algorithm compares answers: exact match = 5 points, close = fewer, nothing in common = 0. This reveals unexpected political affinities.

Goal: show people that politics isn't black and white — make them relax, make them think.

# Architecture

- **App**: `app-react-router/` — React 19 + React Router v7 + Vite + Tailwind CSS v4 + Zustand + shadcn/Radix UI
- **API**: `api-express/` — Express, JWT cookies, CORS
- **Shared code**: duplicated in `app-react-router/src/shared/` and `api-express/src/shared/` (no separate package)
- **Candidates data**: `api-express/src/shared/candidates-answers.json` is the source of truth for candidate answers (static JSON, not DB). Text files in `api-express/src/shared/candidates-answers/*.txt` are human-readable versions. When updating candidates, edit the JSON and copy to `app-react-router/src/shared/`.
- **Candidate pictures**: PNGs in `app-react-router/public/candidates/{slug}.png`. To generate: fetch portrait from Wikipedia API (`action=query&prop=pageimages&pithumbsize=800`), remove background with `rembg` (`pip install "rembg[cpu]"`), resize to max 800px, save as PNG.

# Conventions

- French UI strings, English code/comments
- Tailwind mobile-first, `max-lg:` for mobile overrides
- Path alias: `@app` → `app-react-router/src` (tsconfig + vite)
- Image CDN: `https://quizz-du-berger-pictures.cellar-c2.services.clever-cloud.com/`
- API host: dev = `localhost:5179`, prod = `api.quizz-du-berger.com`

# Dev

- App: `cd app-react-router && npm run dev` (port 5178)
- API: `cd api-express && npm run dev` (port 5179)
- Type check: `cd app-react-router && npx tsc --noEmit --project tsconfig.app.json`
- Build: `cd app-react-router && npx vite build`
