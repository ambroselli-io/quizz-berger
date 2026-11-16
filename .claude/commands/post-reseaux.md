---
description: Prepare the next social post (LinkedIn page, X, Bluesky) every 3 days, ready for Arnaud to click "Publish"
---

# Post réseaux (tous les 3 jours)

The campaign plan lives outside the public repo: `../communication-2027/social/CAMPAGNE.md` (post types, rotation, feature list, writing rules). Read it first. The log is `../communication-2027/social/posts/log.md`.

## 0. Like our own posts and replies

On https://x.com/QuizzDuBerger/with_replies and on the Bluesky profile quizzduberger.bsky.social, like every post or reply of ours that is not liked yet (check the active account first). Liking is allowed; replying and posting stay for Arnaud.

## 1. Is a post due?

Read the last line of the log. If the last post is less than 3 days old (compare with `date +%F`), stop: "rien à poster aujourd'hui (prochain le JJ/MM)". A press mention found during today's other routines overrides this and is due now.

## 2. Pick the subject

Next type in the rotation after the last logged one, per `CAMPAGNE.md`. Skip a type with nothing new since its last post:
- **Réserve** : before following the rotation, check "Idées de posts en réserve" in `CAMPAGNE.md`; an idea there may replace the next type.
- **Retour utilisateur**: the newest entry of `app-tanstack/src/utils/temoignages.ts` not yet in the log.
- **Fonctionnalité**: the next feature of the list not yet in the log. Always start the text with "NOUVEAU".
- **Candidats**: `git log --since=<last post of this type> --oneline -- app-tanstack/src/content/candidacies.ts` + the counts from `utils/candidacies.ts` (`declaredCount`, `withdrawnCount`) and the number of candidates in the quiz.
- **Question**: `git log --since=<last post of this type> -p -- app-tanstack/src/shared/quizz-2027.json`, pick one added or reworded question.
- **Presse**: anything found by the other routines or by a quick search "Quizz du Berger".

## 3. Make the visual (1200×1200 PNG)

HTML rendered with headless Chrome, fonts Merriweather / Merriweather Sans, colours #111827 / #facc15, logo `app-tanstack/public/logo512.png`. Start from the previous post's HTML in `../communication-2027/social/posts/`. A screenshot of a result page comes from the local dev app (`localhost:5178`, local DB, never prod) with every candidate anonymised in the DOM before the capture. Save `postN-<slug>.png` + its `.html` in `../communication-2027/social/posts/`.

## 4. Write the three texts

The text must never read as AI-written (the visual may). One or two plain sentences, the visual carries the message, no hook / body / closing-question structure, no marketing phrase. Reference, what Arnaud kept for post 1 on LinkedIn: "Venez nous dire ce que vous en pensez, comme Camille / -> quizz-du-berger.com". Same text on the three networks unless one needs it shorter. Read `CAMPAGNE.md` "Règles d'écriture" and the `no-ai-slop` skill.

## 5. Open the three composers, ready to publish

With Claude in Chrome, in your own tabs:
- LinkedIn: page admin `https://www.linkedin.com/company/145469061/admin/page-posts/published/` → "Create" → "Start a post", posting **as the page** (check the author shown is "Le Quizz du Berger").
- X: `https://x.com/compose/post`, active account must be **@QuizzDuBerger** (never @ambroselli_io).
- Bluesky: `https://bsky.app`, account **quizzduberger.bsky.social**, "New post".

Paste the text, attach the image (file input interception if no input exists: patch `HTMLInputElement.prototype.click` to append the input to the DOM, upload, restore). **Never click Publish / Post / Send**: leave the three tabs open for Arnaud.

## 6. Log and report

Append a line to `posts/log.md` (date, type, subject, visual, "préparé" ×3). Report in French: the subject, the three texts, the image path, and "3 onglets prêts, à toi de publier".
