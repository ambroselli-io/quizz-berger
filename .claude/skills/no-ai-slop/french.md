# No AI slop — French addendum

`SKILL.md` lists English words and patterns. This repo publishes in French. Same principles, French triggers. Examples below are real lines from `app-tanstack/src/content/articles.ts`, kept as the reference for what to catch.

## The house intro machine (worst offender here)

Every news article on this site opened the same way for its first six entries: a comma-spliced list of noun phrases, a colon, one summary sentence, then "Voici ce qu'il faut savoir / Voici les éléments à connaître / Voici un point complet" + "et les positions des N candidats".

> "Signature de l'accord UE-Mercosur fin 2024, mobilisation des agriculteurs, votes à l'Assemblée nationale, ratification européenne en janvier 2026 puis saisine de la Cour de justice de l'UE : le dossier Mercosur structure une partie du débat politique français depuis bientôt deux ans. Voici les éléments à connaître, et les positions des N candidats."

Read three of these back to back and the series reads as generated. The colon-list is a colon reveal, and "Voici ce qu'il faut savoir" is throat-clearing that tells the reader what the page already promises.

Fix: open on the single most concrete fact, in a normal sentence. Keep the dated specifics — they're the value. Drop the "Voici" hinge; the `<h2>` that follows already announces the structure. Vary the shape between articles: sometimes the number, sometimes the vote, sometimes the date, sometimes the disagreement.

An article series needs a recognizable template for its *sections* (`Pourquoi ce dossier divise`, `Les positions des N candidats`, `Pour aller plus loin`). It does not need a recognizable template for its *sentences*. Keep the former, vary the latter.

## Mots à couper

Banned outright: incontournable, révolutionnaire, à l'ère de, au cœur de (as filler), plonger dans, décryptage (as a promise rather than a label), sans précédent, véritable (as intensifier), majeur / crucial / essentiel / fondamental when they replace a fact, riche en enseignements, force est de constater, il convient de noter, il est important de souligner, on ne peut que constater, un tournant, une nouvelle ère, le nerf de la guerre.

Journalistic clichés that go stale on repeat — fine once in a while, slop when the series leans on them: cristalliser (used 3× across these articles), une onde de choc, une ligne de front, hors norme, à bout de souffle, une fuite en avant, un vent de, faire couler beaucoup d'encre, sujet brûlant, en pleine recomposition, un pavé dans la mare.

Often-empty: littéralement, véritablement, tout simplement, purement et simplement, absolument, clairement, notamment when it introduces nothing specific. Cut when they add nothing. Keep when they carry real emphasis or Arnaud's spoken rhythm.

Often-empty openers: en effet, par ailleurs, en outre, ainsi (as a connector reflex), force est de constater que, il n'en reste pas moins que, quoi qu'il en soit, à l'heure où, dans un contexte où.

## Patterns à couper

**Faux-insight markers.** "Fait notable :", "Fait remarquable,", "Important :", "Chose rare", "Ce qui frappe, c'est". They tell the reader what to find interesting instead of letting the fact do it.

> "Fait notable : **aucun** ne rejette catégoriquement toute évolution du droit existant"

Fix: `Aucun des N candidats ne rejette catégoriquement…`. The word "aucun" is already the surprise.

> "Fait remarquable, **le groupe macroniste est le seul à s'être abstenu**, creusant un écart politique entre…"

Fix: drop "Fait remarquable" and the participle. `Le groupe macroniste est le seul à s'être abstenu.`

**Colon reveals.** French loves the deux-points, so this one needs a firm hand. "Leur spécialité : l'exportation de matières premières." / "Son objectif : supprimer les droits de douane." / "La peine : trois ans de prison." / "Le point décisif : les 15 mois ferme sont déjà purgés." / "Leur position : oui sur le fond, mais après modifications."

Fix: make it a sentence with a verb. `La cour a prononcé trois ans de prison, dont deux avec sursis.` Keep the colon for genuine lists, chronologies, labels and quotes — this repo's `<ul>` chronologies and `<strong>date</strong> :` bullets are correct usage, leave them alone.

**Superficial analysis via present participle.** French equivalent of English "-ing" slop: soulignant, illustrant, traduisant, marquant, témoignant, actant, creusant, confirmant — tacked on to explain that something is meaningful.

> "…le groupe macroniste est le seul à s'être abstenu, **creusant un écart politique** entre la majorité présidentielle et l'ensemble des autres groupes."

Fix: either state the consequence concretely, or stop at the fact.

**Importance puffery.** "marque un tournant", "constitue une étape historique", "restera dans les annales", "un moment charnière", "C'est la plus grande X de l'histoire" when the superlative isn't sourced. State the number and let the reader judge.

**Weasel attribution.** "certains juristes soutiennent", "des analystes estiment", "selon certains observateurs", "des sources proches du dossier", "on estime que", "il semblerait que". Name the source or cut the claim. On this site that matters more than usual: the articles carry dated facts about real people and a reader can check them.

> "Projections des analystes : environ 105 $ le baril après 1 mois…"

Fix: name the bank, agency or note, or drop the projection.

Note the honest hedges in these articles that are **not** weasel and must stay: "Le bilan exact est disputé et probablement sous-estimé", "Les évaluations divergent largement", "figurer dans ces documents ne vaut pas accusation". Those are precision about uncertainty, not vagueness.

**Binary contrasts and negative listing.** "Ce n'est pas X, c'est Y", "La question n'est pas X mais Y", "Ni X ni Y : Z".

> `<h3>Famille 3 — Ce n'est ni aux juges ni à la loi : c'est aux électeurs de trancher</h3>`

Fix: `<h3>Famille 3 — Aux électeurs de trancher</h3>`

**Summary-recap endings.** "En conclusion", "Pour résumer", "Au final", "En définitive", "Retenons que" — and the unlabelled version, a closing paragraph that restates the article before the CTA.

> "L'affaire Epstein n'est pas un dossier que les candidats français commentent tous les jours, mais les sujets qu'elle soulève — protection des mineurs, impunité des puissants, indépendance de la justice, rôle de la presse — touchent plusieurs thèmes du Quizz du Berger."

Fix: this restates the section above it. Cut to the concrete pointer: the links plus the CTA.

**Em dashes / tirets cadratins.** The strongest tell in French, because French prose uses them far less than English does. Two distinct uses here:

- **Label separator in candidate bullets** — `<a>Nom</a> (Parti) — description`. This is a consistent list format, not prose rhythm. Keep it.
- **Prose incises** — `Toute fermeture — même partielle, même temporaire — ferait exploser les cours.` Budget: **2 per article, max.** Prefer commas, parentheses, or a second sentence. The six evergreen articles on this site use zero prose em dashes and read better for it; the news articles ran 4 to 12 each.

Count them before shipping: total `—` minus the one-per-candidate-bullet count should land at 0–2.

## Voice to protect on this site

Arnaud's actual voice, which the skill's rules must yield to:

- **"La politique n'est ni noire ni blanche. Détendez-vous, et réfléchissez."** Technically a binary contrast plus a kicker. It is also the site's founding idea and Arnaud's own line. Never edit it, never "improve" it.
- **Plain admissions.** "nous n'avons eu aucune réponse", "Le résultat est parfois différent de ce qu'on imagine", "c'est propre", "à vous de juger ce que vous préférez". Direct, unpolished, slightly spoken. Leave alone.
- **Fair play toward competitors.** "MonVote2027 est un bon outil, rapide, propre, bien documenté." Don't sand this into neutral comparison-table prose.
- **Neutrality is a constraint, not a voice.** On the candidate sections, sober and even-handed is the requirement — no edge, no opinion, no editorializing. Cutting slop there means cutting filler, not adding punch.

## Checks specific to this repo

- Facts are the value: dates, vote counts, tonnages, barrel prices, article numbers. Never smooth a number into an adjective, and never invent one to replace filler you cut.
- Conditional French on estimated candidate positions ("devrait", "laisse penser que", "sa position publique suggère") is deliberate honesty about estimation — see the `draft-blog-post` command. Do not rewrite it into affirmative prose.
- The section skeleton (`c'est quoi`, chronologie, `Pourquoi ça divise`, `Les positions des N candidats`, table pour/contre, `Pour aller plus loin`, CTA) is an SEO and reader convention. Keep it. Vary the prose inside it.
- Headings phrased as search queries ("Le détroit d'Ormuz : c'est quoi ?") are intentional SEO, not slop. Keep them, but don't let every article use the identical formula.
