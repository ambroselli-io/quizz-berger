---
description: Daily check of the 2027 race (declarations, withdrawals, steps) and update of candidacies.ts as a draft PR — research through Claude in Chrome
---

# Candidacy tracker update

You update the candidacy tracker of the Quizz du Berger: check what changed in the 2027 French presidential race since the last update, and open a draft PR when something changed.

Read first, and follow them:
- `.claude/routines/recherche-web-chrome.md` — how to search and read the web (Chrome, not WebFetch).
- `.claude/routines/git-et-pr.md` — clean tree check, branch, commit, draft PR. Branch: `candidatures/YYYY-MM-DD`.
- `CLAUDE.md`, section "Who is a candidate (in / out)".

## Steps

1. Read `app-tanstack/src/content/candidacies.ts`: list every tracked slug, its status and the date of its latest event.
2. Read `app-tanstack/src/shared/candidates-answers.json`: list every candidate slug of the quiz, and the ones with `picture: ""`.
3. **Discovery — the most important step.**
   a. In Chrome, read https://www.candidatspresidentielles2027.fr/ (main cross-check, the most complete list). Extract EVERY name. List each name absent from the tracker.
   b. Same with https://candidats2027.org/.
   c. WebSearch: "présidentielle 2027 candidature", "présidentielle 2027 nouveau candidat déclaré", "présidentielle 2027 renonce retrait", "présidentielle 2027 primaire".
   d. WebSearch for lesser-known candidates: "présidentielle 2027 petit candidat", "candidature présidentielle 2027 atypique".
   e. For EVERY name found in a–d that is not in the tracker, WebSearch "{name} candidat présidentielle 2027", then read one press article in Chrome to confirm the declaration and its date.
   f. For tracked people, look only for events newer than their latest event.
4. For each confirmed change:
   - Declaration: update the status, add a dated event with its press source.
   - Withdrawal: status `withdrawn`, add the event. Also set `withdrawn` / `withdrawnAt` in **all 3** `candidates-answers.json` (the test compares them).
   - Notable step (rally, ruling, primary result, formal announcement after an earlier intent): add a step event.
   - Outdated summary: update it.
   - Move the entry between the sections of the file (déclarés / ont renoncé / pas encore candidats) to match its status.
5. A NEW person who is not in the quiz: do NOT add them to `candidacies.ts` (every slug must exist in the quiz). Flag them in the PR body: exact name, party/role, press URL.
6. Missing pictures: for each candidate with `picture: ""`, check candidatspresidentielles2027.fr and Wikimedia Commons for a free portrait. Only flag it in the PR body ("portrait libre disponible pour X : URL"). Do not download it.
7. `cd app-tanstack && npx vitest run src/utils/candidacies.test.ts`. Fix until green.
8. If something changed: commit, push, draft PR titled `candidatures: update YYYY-MM-DD`. Body: each change with its source, new people needing quiz entries, available portraits.

## Rules

- Every event has at least one press source with an `https` URL, read in Chrome this session.
- No political labels: party name + factual role only.
- The quiz includes ALL declared candidates, not only mainstream ones. Do not skip someone because they are little known.
- Nothing changed → no PR, report "Candidatures : rien de nouveau".
