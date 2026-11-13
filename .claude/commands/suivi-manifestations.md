---
description: Daily in-place update of the living article on the protest crisis (bans, rulings, investigations, strikes) on a rolling draft PR — research through Claude in Chrome
---

# Living article: protests and the right to demonstrate

You maintain ONE living article: `app-tanstack/src/content/articles/manifestations-interdites-droit-de-manifester-france-candidats-2027.ts`. It covers the French protest crisis that began on 17 October 2026: bans on demonstrations, court rulings, looting, police violence investigations, the Trappes attack, strikes. Update it IN PLACE. Never create a second article on this crisis.

Read first, and follow them:
- `.claude/routines/recherche-web-chrome.md` — how to search and read the web (Chrome, not WebFetch).
- `.claude/routines/git-et-pr.md` — clean tree check, rolling branch, commit, draft PR. Branch: `blog/suivi-manifestations-interdites` (rolling).
- `.claude/commands/draft-blog-post.md` and `~/.claude/skills/no-ai-slop/` (SKILL.md, french.md, eval.md): their writing, neutrality, sourcing and inline-citation rules apply. Their "already covered: stop" rule does not: updating this article is the job.

## Steps

1. If the article is not on `origin/main`, stop: report that it is not merged yet. Change nothing.
2. Set up the branch (rolling branch rules), then read the article, including the date of its last update.
3. Search everything since that date (at most the last 72 hours): new bans, rulings of the Conseil d'État and administrative courts, official figures for demonstrations and strikes (ministère de l'Intérieur and unions), IGPN and PNAT investigations, statements by the President and the government, statements by quiz candidates on banning protests. Read the relevant pages in Chrome.
4. Nothing new and verifiable → stop: no commit, no PR. Report one line. This is a normal outcome.
5. Otherwise update the article:
   - add dated bullets to the chronology;
   - correct figures that have been superseded;
   - move a candidate between familles only with a linked statement, and then change their `answerIndex` for `question-2027-pol-16` in ALL 3 `candidates-answers.json`, then run `node api-express/scripts/extract-all-answers.js`;
   - set the visible "Dernière mise à jour" date and `schema.dateModified` to today. Keep `date` and `datePublished` unchanged;
   - keep every future-tense sentence true: an event that has now happened is rewritten in the past, with its figures.
6. Accuracy:
   - Every new fact has a source read in Chrome this session and an inline link around the claim.
   - Contested figures: give both sides and their authors.
   - Presumption of innocence for suspects and police officers: "mis en examen", "selon la plainte", "aurait"; no suspect surname.
   - Never apply a political label such as "extrême droite" to a candidate or party in your own voice.
   - Do not state a candidate's position as fact when it is an estimate.
   - Do not add quiz questions here: propose them in the PR body.
7. Validate: `cd app-tanstack && npm run typecheck && npm test`. Use `npx vitest run -u` only if you changed a candidate answer, and then read the `.snap` diff.
8. Commit and push. New PR title: `blog: suivi manifestations interdites (YYYY-MM-DD)`. Body (or comment on the existing PR): what changed, every source URL, any fact that rests on a single or low-reliability source.
