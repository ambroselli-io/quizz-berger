---
description: Hourly — find 3-5 tweets / Bluesky posts where the quiz genuinely helps, draft a reply for each, leave them ready for Arnaud to send
---

# Réponses réseaux (toutes les heures)

Accounts: X **@QuizzDuBerger** (never @ambroselli_io), Bluesky **quizzduberger.bsky.social**. Claude in Chrome, your own tabs.

**Never click Reply / Post / Send.** Arnaud sends each reply himself. Mass automated replies are spam under X and Bluesky rules and would get the account suspended.

## 0. Like our own posts and replies

On https://x.com/QuizzDuBerger/with_replies and on the Bluesky profile quizzduberger.bsky.social, like every post or reply of ours that is not liked yet (check the active account first). Liking is allowed; replying and posting stay for Arnaud.

## 1. Find candidates (max 5 per network per run)

Search "Latest" (X: `https://x.com/search?q=...&f=live`, Bluesky: `https://bsky.app/search?q=...`), French only, last 2 hours:
- "pour qui voter", "je sais pas pour qui voter", "qui choisir 2027", "indécis présidentielle"
- "test politique", "quiz politique", "boussole électorale", "quel candidat me correspond"
- a hot topic of the day that is a quiz question: take the trends (X "Trending in France" / Explore, Bluesky trending), match them to a question of `app-tanstack/src/shared/quizz-2027.json`, then search posts where someone hesitates or asks for the candidates' positions on it.

Keep a post only if: a real person (not a brand, not a candidate, not a journalist's breaking-news post), sincere question or hesitation, not a heated fight or harassment thread, not already replied to by us (log), fewer than ~50 replies. Skip anything where a link would look out of place.

## 2. Draft the reply

Sound like Arnaud typing on his phone, not like a brand. Reference reply he wrote himself (2026-11-15):
> Faut pas demander à une IA, elles sont toutes biaisées, droite/gauche/ce que tu veux. Comme si tu demandais à Le Pen ou Méluche ou Attal pour qui il faut voter. Viens faire mon quizz

**React, don't sell.** Pick up the person's exact words and react like a human (surprise, joke, self-mockery). Never explain how the quiz works. No "d'accord… sauf que" pivot. Lowercase is fine, a link is rare. Second reference Arnaud sent (2026-11-16), after rejecting a pitch-style draft as "bouillie IA":
> bon dieu, "servez vous de votre propre jugement" ça aurait pu être mon slogan

- Open with a take that surprises: contradict the premise, a punchline, a comparison nobody expects. Never open by rephrasing their question or with "Plutôt que…".
- Tutoiement, spoken French ("faut", "t'as"), first person ("mon quizz"). No emoji, no "🙂", no exclamation marks, no marketing phrase ("les résultats surprennent", "découvrez").
- Naming candidates is fine if it is balanced (always several, from different sides) and never a judgment.
- Short: one or two sentences. The link is optional (the profile carries it); when given, the most precise page: `/question-politique/{slug}`, `/quiz-rapide`, `/candidat/{slug}`, `/comparer/{a}-vs-{b}`.
- Never say who to vote for, no political label. X ≤ 280, Bluesky ≤ 300. Never the same reply twice in the log.
- Before drafting, reread the replies Arnaud actually sent (log column "status") and copy their tone, not the ones he rewrote.

## 3. Leave them ready

For each kept post: open it in a tab, open the reply box, type the draft. Do not send. **Before typing, focus the box with JS (`[data-testid="tweetTextarea_0"]` `.focus()` on X) and check `document.activeElement.isContentEditable` is true**: keystrokes outside the box fire X shortcuts (l = like, t = repost, u = mute, x = block, n = new post). Before opening new ones, close the reply tabs of the previous run that Arnaud did not send (they are stale).

## 4. Log and report

Append to `../communication-2027/social/reponses-log.tsv`: `date<TAB>network<TAB>post URL<TAB>author handle<TAB>reply text<TAB>prepared`. Report in French, one line per draft: network, link to the post, the reply. If nothing worth answering: "rien de pertinent cette heure-ci".
