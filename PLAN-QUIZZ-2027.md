# Audit du Quizz du Berger 2022 — Plan de mise à jour 2027

## Contexte
Le quizz a été créé en 2022 par des étudiants de Sciences Po Toulouse pour l'élection présidentielle. Il comporte 18 thèmes, 104 questions, 12 candidats. L'objectif : auditer l'équilibre, la couverture et les biais — puis mettre à jour thème par thème pour l'élection 2027. Esprit Thinkerview : profond, indépendant, aucun biais politique.

---

## PARTIE 1 : Audit structurel du quizz 2022

### A. Système de scoring — Constat clé

Le scoring utilise des **matrices de distance entre réponses**. Chaque candidat a aussi répondu au quizz, et le score d'un utilisateur face à un candidat = la proximité de leurs réponses.

**~80% des questions utilisent la MÊME matrice :**
```
[5, 3, 2, 0, 0, 0]
[4, 5, 3, 1, 0, 0]
[2, 3, 5, 3, 2, 0]
[0, 1, 3, 5, 4, 0]
[0, 0, 2, 3, 5, 0]
[0, 0, 0, 0, 0, 0]
```

C'est un **gradient linéaire parfait** — la réponse 1 est maximalement éloignée de la réponse 5. Chaque question est traitée comme un axe unique. C'est structurellement correct pour un quizz de proximité : **le quizz suppose que les positions politiques se situent sur un axe linéaire par question**, ce qui est une simplification raisonnable pour ce format.

**Verdict : le mécanisme de scoring est solide.** Il ne code aucun biais en dur — il mesure la distance entre les choix de l'utilisateur et ceux du candidat. Si les candidats ont répondu honnêtement, les résultats sont aussi justes que les questions le permettent.

### B. Couverture thématique

**18 thèmes, répartition des questions :**
| Thème | Questions | Notes |
|---|---|---|
| Politique fiscale | 8 | Couverture importante |
| Société | 9 | Couverture importante |
| Pandémie Covid 19 | 7 | Obsolète — à supprimer/remplacer |
| Démographie et question migratoire | 7 | Couverture importante |
| Police, Justice et Sécurité | 7 | Bon |
| Économie et Industrie | 7 | Bon |
| Travail, Chômage, Retraite | 6 | Bon |
| Union Européenne | 6 | Bon |
| Recherche et éducation | 6 | Bon |
| Agriculture et alimentation | 5 | Bon |
| Climat, Énergie et Écologie | 5 | Bon |
| Dépenses et dette publiques | 5 | Bon |
| Finance | 5 | Bon |
| Gouvernance et République | 5 | Bon |
| Culture | 5 | Bon |
| Santé | 5 | Bon |
| Affaires étrangères | 4 | Léger — pourrait être étoffé |
| Et si un(e) autre gagnait... | 12 | Méta-question (1 par candidat) |

### C. Audit de couverture et d'équilibre

#### PRINCIPE FONDAMENTAL : il n'y a pas de position « raisonnable »
Chaque opinion portée par de vraies personnes est légitime et mérite d'être représentée. Il n'y a pas d'« extrême » — c'est un jugement relatif, pas absolu. Le quizz doit couvrir le paysage complet de ce que les gens pensent réellement, sans juger aucune position. Quelqu'un qui pense « la France appartient aux Français de souche » exprime une conviction réelle. Quelqu'un qui pense « il n'y a pas de dérèglement climatique causé par l'homme » y croit sincèrement. Ne pas proposer ces options serait manquer de respect à ces opinions. Le quizz doit être ouvert à TOUTES les visions — y compris « le monde est une oligarchie », « c'est le meilleur monde possible », « retournons tous à la ferme » ou « l'IA va nous sauver ».

#### CE QUI FONCTIONNE
- La plupart des questions offrent un spectre de 4 à 6 positions couvrant un large éventail d'opinions
- L'option « Ça ne m'intéresse pas / Je n'ai pas d'avis » est excellente
- Les deux bouts du spectre sont représentés sur la majorité des questions
- Les questions économiques sont particulièrement bien faites

#### CE QU'IL FAUT CORRIGER

**1. Ordre systématique des réponses**
Presque TOUTES les questions ordonnent les réponses dans la même direction sur le spectre. Conséquences :
- Un utilisateur peut détecter le schéma et biaiser ses réponses
- Un ordonnancement constant crée un effet de gradient involontaire

**Correction pour 2027 :** Varier le sens des réponses d'une question à l'autre (pas toujours le même ordre).

**2. Certaines réponses de gauche sonnent trop académiques**
Personne ne dit « reconstituer un secteur public puissant dans le cadre d'une économie mixte ». Les gens disent « il faut renationaliser, l'État doit reprendre la main ». La formulation académique est un travers Sciences Po — ça ne reflète pas comment les gens parlent vraiment. Il faut réécrire ces réponses pour qu'elles sonnent naturelles et humaines.

**3. Positions manquantes / lacunes de couverture**
- **Le souverainisme de gauche** est mal représenté — confondu avec l'euroscepticisme de droite. Certaines personnes veulent sortir de l'UE/OTAN dans une perspective de gauche.
- **La position libertarienne / « foutez-nous la paix »** est quasi absente — le sentiment « ni gauche ni droite, l'État doit sortir de ma vie »
- **La perspective anti-système / populiste** (esprit Gilets Jaunes) — « le système est truqué, tous les politiques se valent » — mal représentée
- **La perspective rurale/périurbaine** — le cadrage est très parisien/urbain dans l'ensemble
- **L'angle oligarchie / corruption systémique** — des gens pensent sincèrement que le système est contrôlé par une petite élite, et cette vision n'a pas de place dans le quizz 2022

**4. La section « Et si un(e) autre gagnait »**
Entièrement spécifique à 2022. À reconstruire avec les candidats/personnalités de 2027.

---

## PARTIE 2 : Restructuration des thèmes pour 2027

### Principes de conception
- Le quizz reflète **comment les vrais gens pensent et parlent** — pas l'offre politique
- Les réponses doivent sonner comme ce qu'on dirait à table, pas dans un mémoire universitaire ou un programme de parti
- Les candidats (et potentiellement des personnalités non-candidates) répondront au quizz séparément et seront matchés aux utilisateurs par proximité
- **Agnostique vis-à-vis des candidats** : les questions portent sur des politiques/valeurs, les candidats répondent ensuite
- Le Covid est mort comme thème, mais son héritage (liberté, santé mentale, vaccins) est distribué dans Santé, Gouvernance et Numérique

### Liste finale des thèmes pour 2027 (21 thèmes)

| # | Thème | Statut | Cible Q | Notes |
|---|---|---|---|---|
| 1 | Affaires étrangères | MAJ | 5-6 | Ukraine/Russie, Afrique, Chine, Moyen-Orient, OTAN |
| 2 | Agriculture et alimentation | MAJ | 5 | Eau/sécheresse, souveraineté |
| 3 | Climat, Énergie et Écologie | MAJ | 5-6 | Évolution du nucléaire, eau, sobriété |
| 4 | **Corruption et lobbying** | **NOUVEAU** | 5 | McKinsey, Uber Files, portes tournantes, financement campagnes, lobbying UE, oligarchie |
| 5 | Culture | MAJ | 4-5 | Rafraîchissement léger |
| 6 | Démographie et question migratoire | MAJ | 6-7 | Toujours très pertinent, mise à jour des formulations |
| 7 | Dépenses et dette publiques | MAJ | 5 | Réalité de la dette post-Covid |
| 8 | Économie et Industrie | MAJ | 6-7 | Réindustrialisation, chaînes d'approvisionnement |
| 9 | Finance | GARDER | 5 | Dollar, trading, bulles, paradis fiscaux, système mondial |
| 10 | Gouvernance et République | MAJ | 5-6 | Dissolution 2024, proportionnelle, autorité de l'État vs libertés |
| 11 | **Logement** | **NOUVEAU** | 5 | Crise du logement, Airbnb, encadrement des loyers, rural vs urbain, construction |
| 12 | **Numérique et IA** | **NOUVEAU** | 5 | Régulation de l'IA, réseaux sociaux et jeunesse, surveillance, souveraineté numérique |
| 13 | Police, Justice et Sécurité | MAJ | 6-7 | Toujours très pertinent |
| 14 | Politique fiscale | MAJ | 7-8 | ISF, flat tax, TVA |
| 15 | **Pouvoir d'achat et vie quotidienne** | **NOUVEAU** | 5 | Inflation, factures d'énergie, coût des transports, prix au supermarché |
| 16 | Recherche et éducation | MAJ | 5-6 | Écrans/IA à l'école, Parcoursup |
| 17 | Santé | MAJ | 5-6 | Ajouter vaccination/antivax, santé mentale des jeunes |
| 18 | Société | MAJ | 7-8 | IVG constitutionnalisée, loi fin de vie, droits des personnes trans |
| 19 | Travail, Chômage, Retraite | MAJ | 6 | Retraite à 64 ans actée, RSA conditionné |
| 20 | Union Européenne | MAJ | 6 | Frexit, pouvoir de la Commission, Ukraine, corruption/lobbying UE |
| 21 | Et si un(e) autre gagnait... | REFONTE | À définir | Reconstruire avec les candidats/personnalités de 2027 |

**Supprimé :** Pandémie Covid 19 (héritage distribué dans Santé, Gouvernance, Numérique)
**Ajouté :** 4 nouveaux thèmes (Corruption, Logement, Numérique/IA, Pouvoir d'achat)
**Cible :** ~115-120 questions au total

---

## PARTIE 3 : Processus de revue thème par thème

Pour chaque thème, on va :
1. Passer en revue chaque question existante — est-elle encore pertinente en 2027 ?
2. Vérifier les formulations — est-ce que ça sonne comme parlent les vrais gens ? (pas académique)
3. Vérifier l'équilibre — est-ce que quelqu'un de N'IMPORTE QUELLE sensibilité politique peut trouver sa position sincère ?
4. Proposer des réécritures pour les questions obsolètes ou trop jargonneuses
5. Proposer de nouvelles questions pour les lacunes de 2027
6. S'accorder sur la liste finale avant de passer au thème suivant

---

## Vérification
- Une fois tous les thèmes terminés : valider la structure JSON
- Type-check : `cd app-react-router && npx tsc --noEmit --project tsconfig.app.json`
- Build : `cd app-react-router && npx vite build`
- Test instinctif par question : « est-ce qu'une vraie personne de [n'importe quelle sensibilité politique] choisirait naturellement une de ces réponses ? »
