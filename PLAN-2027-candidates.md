# Plan: Generate Candidate Answers — 2027 French Presidential Election

## Context
Rewrite all candidate data for the **2027** election (not 2022). The quiz questions in `quizz-2027.json` stay the same. We generate new answers for new candidates based on Claude's knowledge of their political positions.

## Candidate List (from Wikipedia, Feb 2026)

### Declared candidates
1. Nathalie Arthaud — Lutte ouvrière (far-left, trotskyist)
2. François Asselineau — UPR (sovereignist, Frexit)
3. Delphine Batho — Génération écologie (green, ex-PS)
4. Xavier Bertrand — Nous France / LR (center-right, social gaullist)
5. Nicolas Dupont-Aignan — Debout la France (right, sovereignist)
6. Jérôme Guedj — PS (center-left, social democrat)
7. Marine Le Pen — RN (far-right, national populist) — conditional on appeal
8. Édouard Philippe — Horizons (center-right, liberal conservative)
9. Laurent Wauquiez — LR (right, conservative)

### Candidates for left primary
10. Clémentine Autain — L'Après (left, ex-LFI)
11. François Ruffin — Debout! (left populist, ex-LFI)
12. Marine Tondelier — Les Écologistes (green)

### Intent declared
13. David Lisnard — Nouvelle Énergie / LR (center-right, liberal)

### Key possible candidates (not yet declared)
- Gabriel Attal — Renaissance (macronist)
- François Bayrou — MoDem (center)
- Bernard Cazeneuve — La Convention (center-left, social democrat)
- Gérald Darmanin — Divers centre (center-right, securitaire)
- Raphaël Glucksmann — Place publique (social democrat, pro-EU)
- François Hollande — PS (center-left)
- Jean-Luc Mélenchon — LFI (left, eco-socialist)
- Bruno Retailleau — LR (right, conservative, securitaire)
- Fabien Roussel — PCF (left, communist)
- Éric Zemmour — Reconquête (far-right, identitarian)
- Dominique de Villepin — La France humaniste (center, gaulliste)
- And others...

## Approach
1. **User selects which candidates to include** (TBD)
2. **Update `quizz.ts`** with new candidate IDs and names
3. **Update `quizz-2027.json`** "Et si un(e) autre gagnait..." theme with new candidate names
4. **For each candidate** (one by one):
   a. Claude picks answer indices for all ~102 policy questions + candidate-opinion questions
   b. User reviews and validates
   c. Move to next candidate
5. **Generate `candidates-answers.json`** with the validated data
6. **Update `.txt` files** for human readability
7. **Sync** to `app-react-router/src/shared/` if needed

## Files to modify
- `api-express/src/shared/utils/quizz.ts` — candidate list (IDs, names)
- `api-express/src/shared/quizz-2027.json` — "Et si un(e) autre gagnait..." theme
- `api-express/src/shared/candidates-answers.json` — main output
- `api-express/src/shared/candidates-answers/*.txt` — rewrite all

## Current quiz structure
- **18 themes**, **114 questions** total
- 17 policy themes with 102 questions (foreign affairs, agriculture, climate, culture, immigration, debt, economy, finance, governance, COVID, police/justice, taxes, education, health, society, work/retirement, EU)
- 1 candidate-opinion theme ("Et si un(e) autre gagnait...") with 12 questions (to be rewritten with new candidate names)

## Status
- [ ] Confirm candidate selection with user
- [ ] Update quizz.ts with new candidates
- [ ] Update quizz-2027.json "Et si un(e) autre gagnait..." theme
- [ ] Generate answers for each candidate (one by one, with user validation)
- [ ] Write candidates-answers.json
- [ ] Write .txt files
- [ ] Sync to app-react-router/src/shared/
