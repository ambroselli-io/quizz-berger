# Audit sécurité + bugs — 26 septembre 2026

Aucun fichier du code n'a été modifié. Rien n'a été commité.

## Ce que j'ai fait

- **API (`api-express/`)** : lu à la main tous les contrôleurs, un par un (`user`, `answer`, `quizz`, `quizz-builder`, `feedback`, `public`, `og`), plus `index.ts`, `passport.ts`, `config.ts`, Sentry, le schéma Prisma. `npm audit --omit=dev`.
- **Web (`app-tanstack/`)** : un agent a lu `server.mjs`, les routes, les loaders, les `dangerouslySetInnerHTML`, les secrets du bundle. Il a lancé `typecheck`, `vitest`, `npm audit`, et un `vite dev` temporaire pour tester des URL.
- **Mobile (`expo/`)** : un agent a lu le stockage du token, le flux de synchro du quizz, la synchro des réponses. `npm test` + `ts:check`.
- **Données** : script de vérification (hors du repo) sur les 3 copies de `quizz-2027.json` et `candidates-answers.json`, matrices, réponses manquantes, `hotTopicSlugs`, photos, `.txt`, thème « gagnait », tracker des candidatures.
- J'ai vérifié moi-même les constats principaux des agents (IDOR, réponses manquantes, bug des amis).

**Tests** : `typecheck` OK, `vitest` 37/37 OK, expo `ts:check` OK, expo `npm test` 72/72 OK (mais 4 timeouts au premier lancement, voir plus bas).

### Choix que j'ai faits (à revoir ensemble)

1. **Je n'ai pas interrogé la base de prod.** J'ai essayé des requêtes de comptage en lecture seule. Le mode auto les a refusées (« lecture de prod »). Je n'ai pas contourné. Les requêtes utiles sont en bas du fichier, si tu veux les lancer.
2. Je n'ai pas lancé `npm audit fix`, ni rien installé.
3. Je n'ai pas testé l'API de prod en direct (pas de requête vers `api.quizz-du-berger.com`). Tout vient de la lecture du code.
4. Je n'ai pas pu vérifier la config nginx / Clever (rate limit, en-têtes). Je la considère comme absente. Si nginx fait déjà quelque chose, certains points baissent.

---

## 🔴 À corriger vite

### 1. N'importe quel utilisateur peut écrire les réponses d'un autre (IDOR)
`api-express/src/controllers/answer.ts:54-58`

`POST /answer` prend `userId` **dans le body** (`req.body.userId`), pas dans le JWT (`req.user.id`). Le client l'envoie lui-même (`app-tanstack/src/pages/Question.tsx:72`, `expo/src/screens/QuestionScreen.tsx:89`).

- Un utilisateur connecté (même anonyme, `POST /user` suffit) envoie `userId: <id de la victime>` : il crée ou écrase les réponses de la victime.
- L'id d'un utilisateur, même privé, s'obtient facilement : voir le point 2.
- Le compte des candidats en base (`isCandidate`) est aussi exposé : on pourrait modifier les réponses d'un compte candidat stocké en DB.
- Bonus : la mise à jour de `themes` se fait sur l'attaquant, pas sur la victime.

**Correctif** : `userId: req.user.id`, et ignorer le body. Une ligne.

### 2. Les profils privés ne sont pas vraiment privés
Deux trous qui se combinent :

- `GET /user/:pseudo?ssr=true` (`user.ts:267-274`) saute le contrôle `isPublic`. Il renvoie le `_id`, prénom, nom, parti, thèmes de **n'importe quel** pseudo. Plus aucun client n'utilise `ssr=true` (j'ai grep web + expo) : c'est un reste de l'ancien SSR.
- `PUT /user` avec `friends: [ids]` (`user.ts:189-199`) accepte n'importe quel id, sans vérifier que la personne est publique ni qu'elle est d'accord.
- Ensuite `GET /answer/friends` (`answer.ts:86-116`) renvoie **toutes les réponses** de ces « amis », sans contrôle `isPublic`.

**Scénario** : je connais le pseudo de quelqu'un qui n'a pas cliqué « Partager ». `?ssr=true` → son id. `PUT /user {friends:[id]}` → `GET /answer/friends` → toutes ses réponses politiques. Sur un site d'opinion politique, c'est la fuite la plus gênante (donnée sensible au sens RGPD, art. 9).

Même sans le trou `ssr`, quelqu'un qui a été public puis s'est remis en privé reste lisible par ceux qui l'ont ajouté.

**Correctif** : supprimer la branche `ssr=true` ; dans `/answer/friends`, ne garder que les amis `isPublic || isCandidate` ; dans `PUT /user`, n'accepter que des ids d'utilisateurs publics.

### 3. Les JWT n'expirent jamais (≈ 82 ans)
`user.ts:37`

`jwt.sign(..., { expiresIn: maxAge })` avec `maxAge` en **millisecondes**. `jsonwebtoken` lit un nombre en **secondes**.
- Compte avec pseudo : 2 592 000 000 s ≈ **82 ans** (au lieu de 30 jours).
- Anonyme : 10 800 000 s ≈ **125 jours** (au lieu de 3 h).

Le cookie, lui, expire bien (Express lit `maxAge` en ms). Mais sur mobile le token est un Bearer stocké dans AsyncStorage : il reste valide à vie. Et `logout` ne fait qu'effacer le cookie, le token reste valide.

**Correctif** : `expiresIn: maxAge / 1000` (ou `"30d"` / `"3h"`). Les tokens déjà émis restent valides : pour les invalider, il faut changer `SECRET` (déconnecte tout le monde).

### 4. Mots de passe en MD5 sans sel, et aucune limite de tentatives
`user.ts:91, 123, 174`

- MD5 non salé : en cas de fuite de la base, la majorité des mots de passe se cassent en minutes (tables arc-en-ciel). `bcryptjs` est déjà dans les dépendances, mais n'est pas utilisé.
- Aucun rate limit sur `/user/login`, `/user/signup`, `POST /user`, `/feedback`, `/og/generate`, `/public/charts`.
- `/user/login` dit « Ce compte n'existe pas » vs « mot de passe incorrect » : ça permet de lister les pseudos.
- Changer de mot de passe (`PUT /user`) ne demande pas l'ancien.

**Correctif** : migration douce vers bcrypt (à la connexion : si le hash est en MD5 et correspond, re-hasher en bcrypt). `express-rate-limit` sur login/signup/feedback/og. Même message d'erreur pour « compte inconnu » et « mauvais mot de passe ».

### 5. Les mots de passe et les tokens partent dans Sentry et dans les logs
`api-express/src/utils/error.ts:36-52`, `api-express/src/third-parties/sentry.ts:14`

À chaque erreur 500, `sendError` envoie à Sentry **tous les headers** (donc le cookie `jwt` et `Authorization: Bearer`) et le **body**.
- Le masquage ne couvre que `body.password`, pas `passwordConfirm`.
- Pire : `third-parties/sentry.ts:14` fait `console.log("capture", …context)` **avant** le masquage. Donc un mot de passe en clair finit dans les logs PM2 si `/user/login` ou `/signup` plante.
- `utils/sentry.js` a `sendDefaultPii: true` (IP collectée).

**Correctif** : retirer `headers`/`auth` du contexte (ou filtrer `cookie`/`authorization`), masquer `password*`, logger après le masquage.

---

## 🟠 Bugs réels qui touchent les utilisateurs

### 6. Ajouter un ami efface tous les autres
`app-tanstack/src/pages/Result.tsx:163`, `expo/src/screens/ResultScreen.tsx:155`

Le client envoie `friends: [...userToShow.friends, nouvelId]`. Mais `sanitizeUser` renvoie **toujours** `friends: []` (`api-express/src/utils/user.ts:15`). Et l'API fait un `set` Prisma. Résultat : chaque ajout **remplace** la liste. On ne peut avoir qu'un seul ami à la fois.

**Correctif** : côté API, un `connect` au lieu d'un `set` (endpoint dédié `POST /user/friends/:id` par exemple). Ça règle aussi en partie le point 2.

### 7. Changer une réponse : l'app garde l'ancienne
`answer.ts:62-66`

La route renvoie l'objet d'avant l'`update`. Web et expo stockent cette réponse (`upsertAnswer(response.data)`). Si on revient sur une question pour changer sa réponse, l'écran affiche l'ancien choix jusqu'au prochain rechargement.

Aussi : `findFirst` puis `create` sans contrainte d'unicité `(userId, questionId)` → doublons possibles en cas de double clic.

**Correctif** : `answer = await prisma.answer.update(...)`, ou mieux un `upsert` + `@@unique([userId, questionId])` (à voir avec toi, c'est une migration — je ne touche pas à la table `Answer` sans toi).

### 8. 5 candidats ont une réponse manquante → leur score baisse sans bruit
Vérifié moi-même :
- Olivier Faure, Emmanuel Maurel, Fabien Verdier : `question-2027-immi-10`
- Parti animaliste, Parti pirate : `question-2027-edu-07`

Cause : les candidats et les questions ont été ajoutés dans des branches parallèles (89e875b / a71ffe6 vs #31 / #33). Les snapshots ont accepté la baisse.

**Correctif** : ajouter les 5 `answerIndex` (3 copies), relancer le script « gagnait », l'export `.txt`, `vitest -u`. Et ajouter un test « chaque candidat répond à chaque question » : ce test n'existe pas, et ce bug reviendra avec la routine blog qui ajoute des questions.

### 9. Un `answerIndex` hors limites fait planter la page résultat
`*/shared/utils/score.ts` (les 3 copies)

`question.scores[answer.answerIndex]` → `undefined` → `TypeError` sur `.filter`. L'API ne vérifie ni l'index, ni que la question existe (`POST /answer` accepte n'importe quoi).
- Cas réel : le jour où tu raccourcis une liste de réponses (procédure « Changing the answer list »), tous ceux qui avaient choisi le dernier index ont une page résultat cassée (web + expo) et `/og/generate` en 500.
- Cas malveillant : n'importe qui peut casser sa propre page publique… ou celle d'un autre avec le point 1.

**Correctif** : `?? []` dans score.ts + validation `0 <= answerIndex < answers.length` et `questionId` connu dans `POST /answer`.

### 10. L'image OG n'est jamais régénérée
`api-express/src/controllers/og.ts:35-41`

Le test « l'image existe déjà sur le CDN » renvoie **avant** la comparaison avec `ogPicName`. Donc dès qu'une image existe, elle ne change plus, même si la personne refait le quiz. La vérif `ogPicName` est du code mort.

En plus, `getPicName` (`shared/utils/podium.ts:9`) prend `pic.slice(0, 2)` → toujours `"ca"` (tous les chemins commencent par `candidates/`). Le nom ne dépend donc que des pourcentages, pas des candidats.

Et 12 candidats ont `picture: ""` : `og-image.tsx:20` va alors chercher `https://www.quizz-du-berger.com/` (la page d'accueil HTML) comme avatar. Je n'ai pas vérifié si satori plante ou affiche un trou.

**Correctif** : comparer `ogPicName` avant le HEAD, utiliser le nom du fichier dans `getPicName`, ignorer les photos vides.

### 11. Le mobile perd des réponses hors ligne sans rien dire
`expo/src/hooks/useUserAnswers.ts:23-31`, `QuestionScreen.tsx:88-94`

Le store n'est mis à jour que si le POST réussit, mais l'écran passe quand même à la question suivante. Hors ligne, ou si la création du compte anonyme a échoué (tous les POST en 401 ensuite), les réponses disparaissent. `userAnswers` n'est pas persisté non plus.

**Correctif minimum** : afficher une erreur et ne pas avancer. Idéal : mise à jour optimiste + file d'attente persistée.

---

## 🟡 Moins urgent, mais à savoir

- **Compteurs gonflés ×10** — `public.ts:14-20` : `/public/count` renvoie `n × 10 + somme des chiffres` (« temporary cheating… »). `/public/charts` renvoie les vrais chiffres. Donc `/stats` et la page d'accueil se contredisent, et c'est vérifiable par n'importe qui. Pour un site qui parle de transparence politique et qui a eu de la presse, c'est un vrai risque de réputation. **Choix à faire par toi**, je n'ai rien touché.
- **Usurpation de candidat** — aucune règle sur les pseudos. Quelqu'un peut créer le pseudo public « Marine Le Pen » et partager `/result/Marine Le Pen`, avec une image OG « Résultats de Marine Le Pen ». Aucun caractère n'est filtré non plus (`/`, `..`, `?` passent) : le pseudo va tel quel dans la clé S3 `og/${pseudo}.png` et dans les URL. **Correctif** : réserver les noms des 45 candidats, limiter les caractères.
- **`SECRET` par défaut `"not_so_secret"`** (`config.ts:4`). Si la variable manque un jour en prod, n'importe qui peut forger un JWT. Mieux : planter au démarrage si elle manque en prod.
- **`NODE_ENV` dans `npm start`** — `cross-env NODE_ENV=production npm run prisma-setup && … && tsx ./src/index.ts` : `cross-env` ne s'applique qu'à la première commande. En PM2 ça marche car `ecosystem.config.cjs` fixe `NODE_ENV`. Mais si tu lances `npm start` ailleurs, l'API démarre en mode « non-production » : CORS limité à localhost, pas de Sentry, et **les routes `quizz-builder` (qui écrivent des fichiers) ne sont bloquées que si `NODE_ENV !== "development"`** — donc ça reste bloqué, ouf. À garder en tête quand même.
- **`quizz-builder` est cassé** : il lit `../../../shared/quizz-2027.json`, un chemin qui n'existe plus. À supprimer ou réparer.
- **Sentry en double** : `utils/sentry.js` et `third-parties/sentry.ts`, DSN en dur dans le code, variable `SENTRY_DSN` ignorée. `ecosystem.config.cjs` passe encore `MONGODB_ADDON_URI` (plus utilisé).
- **Body JSON jusqu'à 50 Mo** (`index.ts:46`) sans aucune route qui en a besoin. Avec l'absence de rate limit, c'est un vecteur facile pour saturer l'API. 100 Ko suffisent.
- **`/public/charts`** : 6 requêtes SQL d'agrégation sur toute la base, sans cache, sans auth. Un petit cache mémoire de 5 min suffit.
- **`/feedback`** : sans auth ni limite, envoie un mail à tes deux adresses. N'importe qui peut te bombarder de mails (et consommer ton quota Tipimail).
- **Dépendances API** : `npm audit` = 1 critique (`fast-xml-parser` via AWS SDK), ~15 hautes (`express`, `jsonwebtoken` 8, `prisma`, `path-to-regexp`…). La plupart partent avec `npm audit fix`. Dépendances **inutilisées** (0 import) : `multer`, `node-fetch`, `passport-jwt-cookiecombo`, `crypto-js`, `bcryptjs` (à utiliser, cf. point 4), `@ai-sdk/mistral`, `ai`, `jimp`, `short-unique-id`, `isbot`, `i18n-keyless-node`, `cron`. `helmet` 3 et `passport` 0.4 sont très anciens.
- **Web — `server.mjs`** : pas de `trust proxy`, donc les redirections TanStack (ex. `/blog/` → `/blog`) partent en `http://` puis nginx re-redirige en https. Aucun en-tête de sécurité (CSP, anti-iframe, HSTS) — peut-être déjà mis par nginx, pas vérifiable d'ici.
- **Web — soft 404** : `/question/foo/bar` renvoie 200 avec une page vide (pas de `notFound()`). CLAUDE.md dit que ces URL « deviennent 404 » : c'est faux aujourd'hui.
- **Web — hydratation** : `Themes.tsx:62-72` trie les thèmes selon `new Date().getHours()` → heure UTC sur le serveur, heure locale chez le client → ordre différent → erreur d'hydratation React. Et le filtre `:152` vise un id de thème 2022 : le thème « gagnait » 2027 est donc affiché dans la liste. Voulu ?
- **Web — double décodage** : `/all-questions/%25E0` → `URIError` dans `head()`, page sans title. `decodeURIComponent` en trop dans `result.$userPseudo.tsx` et `all-questions.$candidatePseudo.tsx`.
- **Web — `comparer/x-vs-x`** (même candidat deux fois) donne une page à 100 %. Devrait être 404.
- **Web — `.env`** contient `VITE_EMAIL` / `VITE_PASSWORD`. Rien ne les utilise, mais le préfixe `VITE_` les mettrait dans le bundle public au premier usage. À renommer ou supprimer.
- **Web — fichiers morts** : `app-tanstack/src/shared/candidates-answers/*.txt` = 12 exports de 2022 (Hidalgo, Pécresse…). Rien ne les lit.
- **Mobile — token en AsyncStorage** au lieu de `expo-secure-store`. Combiné au point 3 (token à vie), à corriger ensemble.
- **Mobile — tests instables** : 4 timeouts (5 s) au premier `npm test` à froid, puis 72/72 au relancement. Comme `npm test` bloque les `build-*`, un build peut échouer pour rien. `testTimeout: 15000` dans `jest.config.js`.
- **Mobile — Jordan Bardella** n'a pas d'avatar dans expo (photo présente sur le web, absente de `expo/assets/candidates/` et de `candidateImages.ts`).
- **Mobile — quiz** : un quiz API déjà en cache passe devant un quiz embarqué plus récent après une mise à jour de l'app (hors ligne). Et la synchro ne tourne qu'au lancement, pas au retour au premier plan.
- **Score — « ça ne m'intéresse pas »** (`score.ts:95-97`) : si l'utilisateur choisit cette réponse, la question est ignorée seulement pour les candidats qui ont fait le même choix ; les autres prennent 0/5. Petit biais en faveur des candidats « sans avis ». Cohérent avec `proximity.ts`. **Choix de design à trancher.**

---

## ✅ Vérifié, rien à signaler

- Les 3 copies de `quizz-2027.json` et de `candidates-answers.json` sont identiques (md5).
- 185 questions : toutes les matrices sont carrées, diagonale = maximum de la ligne, pas d'id en double.
- Aucun index candidat hors limites, aucune question orpheline.
- `withdrawn` cohérent avec `candidacies.ts` ; tous les candidats ont une entrée dans le tracker, un parti dans `partyBySlug`.
- Les 45 `hotTopicSlugs` pointent vers des questions qui existent.
- Toutes les photos référencées existent. Les `.txt` sont à jour. Le thème « gagnait » est à jour (0 écart) — à relancer après le point 8.
- `.env` bien gitignoré, jamais commité. Pas de secret dans `app.json` / `eas.json`.
- Web : pas de token en localStorage (cookie httpOnly), pas de XSS trouvé (les 5 `dangerouslySetInnerHTML` ne reçoivent que du contenu du repo), pas de SSRF, pas de path traversal dans `server.mjs`, les loaders des pages SEO font bien des 404.
- Vérification du JWT : `passport-jwt` utilise `jsonwebtoken` 9 (la signature, elle, utilise la v8).
- Les vulnérabilités `npm audit` du web sont toutes dans des outils de build, pas atteignables en prod.
- Mobile : le quiz reçu de l'API est validé (`isValidQuizz`) avant d'être utilisé ; un quiz cassé ne fait pas planter l'app.
- CORS prod limité à `quizz-du-berger.com` et ses sous-domaines. Cookies `httpOnly`, `secure`, `sameSite: lax`.

---

## Ordre proposé

1. Point 1 (IDOR) + point 2 (`ssr=true`, contrôle `isPublic` des amis) : ~15 lignes, gros impact.
2. Point 3 (expiration JWT) + point 5 (Sentry/logs).
3. Point 8 (5 réponses manquantes + test) et point 6 (amis).
4. Points 7, 9, 10.
5. Point 4 (bcrypt + rate limit) : plus long, à faire proprement.
6. Le reste quand tu veux. Le compteur ×10 et « ça ne m'intéresse pas » sont des décisions pour toi.

---

## Requêtes DB à lancer toi-même (lecture seule, comptages uniquement)

Le mode auto m'a bloqué la lecture de la base de prod. Ces comptages diraient si les points 1, 7 et 9 ont déjà laissé des traces :

```sql
SELECT
 (SELECT count(*) FROM "User" WHERE "isAdmin") AS admins,
 (SELECT count(*) FROM "User" WHERE pseudo IS NOT NULL AND NOT "isPublic" AND NOT "isCandidate") AS profils_prives,
 (SELECT count(*) FROM "User" WHERE pseudo ~ '[/\\?#%<>"'' ]' OR pseudo LIKE '%..%') AS pseudos_caracteres_risques,
 (SELECT count(*) FROM (SELECT "userId","questionId" FROM "Answer" GROUP BY 1,2 HAVING count(*)>1) d) AS reponses_en_double,
 (SELECT count(*) FROM "Answer" WHERE "answerIndex" < 0 OR "answerIndex" > 12) AS index_suspects;
```
