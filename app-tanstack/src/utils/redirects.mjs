// Plain JS: imported by server.mjs, which runs without a build step. Every entry is a 301.
// A URL that was once in the sitemap must never 404: when a page goes away, add its old path here.
// redirects.test.ts fails when a slug of content/public-question-slugs.json disappears without an entry here.

/** @type {[string, string][]} */
const REDIRECTS = [
  // AI agents check /about and /privacy to verify legitimacy; the French pages are the canonical ones.
  ['/about', '/qui-sommes-nous'],
  ['/privacy', '/confidentialite'],
  // Merged into the home page, which now answers "pour qui voter en 2027" itself.
  ['/pour-qui-voter-2027', '/'],
  // "Numérique et IA" became "Numérique" when the "IA et robotisation" theme was added.
  ['/theme/numerique-et-ia', '/theme/numerique'],
  // "Comment rendre la fiscalité plus verte ?" was split; its SEO slug stays on fisc-10, only the id-based route moved.
  ['/question/theme-2027-fiscal/question-2027-fisc-07', '/question/theme-2027-fiscal/question-2027-fisc-10'],
  // "Comment réduire le chômage en France ?" was split into three questions; this article covers the three angles.
  ['/question-politique/comment-reduire-le-chomage-en-france', '/blog/hausse-chomage-france-candidats-2027'],

  // Theme "Et si l'autre gagnait" (one question per candidate), removed on 20 Oct 2026.
  ['/theme/et-si-un-e-autre-gagnait', '/candidats'],
  ['/question-politique/si-anasse-kazib-etait-elu-quel-serait-votre-sentiment', '/candidat/anasse-kazib'],
  ['/question-politique/si-antoine-mikolajczak-etait-elu-quel-serait-votre-sentiment', '/candidat/antoine-mikolajczak'],
  ['/question-politique/si-benoit-mathieu-etait-elu-quel-serait-votre-sentiment', '/candidat/benoit-mathieu'],
  ['/question-politique/si-bernard-cazeneuve-etait-elu-quel-serait-votre-sentiment', '/candidat/bernard-cazeneuve'],
  ['/question-politique/si-bruno-retailleau-etait-elu-quel-serait-votre-sentiment', '/candidat/bruno-retailleau'],
  ['/question-politique/si-clara-egger-etait-elue-quel-serait-votre-sentiment', '/candidat/clara-egger'],
  ['/question-politique/si-david-lisnard-etait-elu-quel-serait-votre-sentiment', '/candidat/david-lisnard'],
  ['/question-politique/si-delphine-batho-etait-elue-quel-serait-votre-sentiment', '/candidat/delphine-batho'],
  ['/question-politique/si-dominique-de-villepin-etait-elu-quel-serait-votre-sentiment', '/candidat/dominique-de-villepin'],
  ['/question-politique/si-edouard-philippe-etait-elu-quel-serait-votre-sentiment', '/candidat/edouard-philippe'],
  ['/question-politique/si-emmanuel-maurel-etait-elu-quel-serait-votre-sentiment', '/candidat/emmanuel-maurel'],
  ['/question-politique/si-eric-zemmour-etait-elu-quel-serait-votre-sentiment', '/candidat/eric-zemmour'],
  ['/question-politique/si-fabien-roussel-etait-elu-quel-serait-votre-sentiment', '/candidat/fabien-roussel'],
  ['/question-politique/si-fabien-verdier-etait-elu-quel-serait-votre-sentiment', '/candidat/fabien-verdier'],
  ['/question-politique/si-florian-philippot-etait-elu-quel-serait-votre-sentiment', '/candidat/florian-philippot'],
  ['/question-politique/si-francis-lalanne-etait-elu-quel-serait-votre-sentiment', '/candidat/francis-lalanne'],
  ['/question-politique/si-francois-asselineau-etait-elu-quel-serait-votre-sentiment', '/candidat/francois-asselineau'],
  ['/question-politique/si-francois-hollande-etait-elu-quel-serait-votre-sentiment', '/candidat/francois-hollande'],
  ['/question-politique/si-francois-ruffin-etait-elu-quel-serait-votre-sentiment', '/candidat/francois-ruffin'],
  ['/question-politique/si-gabriel-attal-etait-elu-quel-serait-votre-sentiment', '/candidat/gabriel-attal'],
  ['/question-politique/si-jean-luc-melenchon-etait-elu-quel-serait-votre-sentiment', '/candidat/jean-luc-melenchon'],
  ['/question-politique/si-jerome-guedj-etait-elu-quel-serait-votre-sentiment', '/candidat/jerome-guedj'],
  ['/question-politique/si-jordan-bardella-etait-elu-quel-serait-votre-sentiment', '/candidat/jordan-bardella'],
  ['/question-politique/si-juan-branco-etait-elu-quel-serait-votre-sentiment', '/candidat/juan-branco'],
  ['/question-politique/si-karim-bouamrane-etait-elu-quel-serait-votre-sentiment', '/candidat/karim-bouamrane'],
  ['/question-politique/si-lydie-massard-etait-elue-quel-serait-votre-sentiment', '/candidat/lydie-massard'],
  ['/question-politique/si-marine-le-pen-etait-elue-quel-serait-votre-sentiment', '/candidat/marine-le-pen'],
  ['/question-politique/si-marine-tondelier-etait-elue-quel-serait-votre-sentiment', '/candidat/marine-tondelier'],
  ['/question-politique/si-natacha-polony-etait-elue-quel-serait-votre-sentiment', '/candidat/natacha-polony'],
  ['/question-politique/si-nathalie-arthaud-etait-elue-quel-serait-votre-sentiment', '/candidat/nathalie-arthaud'],
  ['/question-politique/si-nicolas-dupont-aignan-etait-elu-quel-serait-votre-sentiment', '/candidat/nicolas-dupont-aignan'],
  ['/question-politique/si-olivier-becht-etait-elu-quel-serait-votre-sentiment', '/candidat/olivier-becht'],
  ['/question-politique/si-olivier-faure-etait-elu-quel-serait-votre-sentiment', '/candidat/olivier-faure'],
  ['/question-politique/si-parti-animaliste-etait-elu-quel-serait-votre-sentiment', '/candidat/parti-animaliste'],
  ['/question-politique/si-parti-pirate-etait-elu-quel-serait-votre-sentiment', '/candidat/parti-pirate'],
  ['/question-politique/si-patrick-sebastien-etait-elu-quel-serait-votre-sentiment', '/candidat/patrick-sebastien'],
  ['/question-politique/si-philippe-brun-etait-elu-quel-serait-votre-sentiment', '/candidat/philippe-brun'],
  ['/question-politique/si-raphael-glucksmann-etait-elu-quel-serait-votre-sentiment', '/candidat/raphael-glucksmann'],
  ['/question-politique/si-segolene-royal-etait-elue-quel-serait-votre-sentiment', '/candidat/segolene-royal'],
  ['/question-politique/si-selma-labib-etait-elue-quel-serait-votre-sentiment', '/candidat/selma-labib'],
  ['/question-politique/si-sylvain-durif-etait-elu-quel-serait-votre-sentiment', '/candidat/sylvain-durif'],
  ['/question-politique/si-xavier-bertrand-etait-elu-quel-serait-votre-sentiment', '/candidat/xavier-bertrand'],

  // The question was reworded, so its slug (derived from the text) changed: same _id, new slug.
  ['/question-politique/comment-faire-evoluer-les-salaires-des-fonctionnaires', '/question-politique/salaires-fonctionnaires-point-indice-france'],
  ['/question-politique/comment-la-france-devrait-elle-gerer-la-crise-de-l-eau-et-les-secheresses', '/question-politique/crise-eau-secheresse-france'],
  ['/question-politique/comment-lutter-contre-la-delinquance-et-le-terrorisme', '/question-politique/police-securite-france'],
  ['/question-politique/comment-voyez-vous-l-impact-de-l-ia-sur-la-societe', '/question-politique/intelligence-artificielle-regulation'],
  ['/question-politique/de-maniere-generale-que-pensez-vous-de-l-immigration-en-france', '/question-politique/immigration-france-2027'],
  ['/question-politique/faudrait-il-passer-a-la-proportionnelle-pour-les-elections-legislatives', '/question-politique/proportionnelle-elections'],
  ['/question-politique/l-inflation-et-la-hausse-des-prix-c-est-la-faute-de-qui', '/question-politique/pour-lutter-contre-l-inflation-et-la-hausse-des-prix-quelle-serait-la-premiere-chose-a-faire'],
  ['/question-politique/la-dette-publique-francaise-depasse-les-110-du-pib-qu-en-pensez-vous', '/question-politique/dette-publique-france'],
  ['/question-politique/la-france-devrait-elle-reindustrialiser-son-territoire', '/question-politique/reindustrialisation-france'],
  ['/question-politique/la-france-doit-elle-reconnaitre-l-etat-de-palestine', '/question-politique/la-france-a-t-elle-bien-fait-de-reconnaitre-l-etat-de-palestine'],
  ['/question-politique/les-reseaux-sociaux-et-les-ecrans-chez-les-jeunes-ca-vous-inquiete', '/question-politique/interdiction-reseaux-sociaux-mineurs-15-ans'],
  ['/question-politique/loi-ripost-securite-quotidien-france', '/question-politique/rodeos-motorises-sanctions-france'],
  ['/question-politique/que-devrait-faire-l-etat-avec-ses-depenses-de-fonctionnement-salaires-des-fonctionnaires-aides-sociales-budget-des-ministeres', '/question-politique/que-penser-des-frais-de-fonctionnement-de-l-etat-voitures-officielles-frais-de-representation-train-de-vie-des-ministeres'],
  ['/question-politique/que-devrait-faire-l-etat-avec-ses-depenses-publiques', '/question-politique/que-penser-des-frais-de-fonctionnement-de-l-etat-voitures-officielles-frais-de-representation-train-de-vie-des-ministeres'],
  ['/question-politique/que-pensez-vous-de-l-energie-nucleaire', '/question-politique/nucleaire-france-avenir'],
  ['/question-politique/que-pensez-vous-de-la-fin-de-vie-et-de-l-euthanasie', '/question-politique/euthanasie-loi-france'],
  ['/question-politique/que-pensez-vous-de-la-gpa-gestation-pour-autrui', '/question-politique/gpa-pma-france'],
  ['/question-politique/que-pensez-vous-de-la-laicite-et-des-signes-religieux-a-l-ecole', '/question-politique/que-pensez-vous-des-signes-religieux-a-l-ecole'],
  ['/question-politique/que-pensez-vous-de-la-politique-envers-les-personnes-handicapees', '/question-politique/que-pensez-vous-de-ce-que-fait-l-etat-pour-les-personnes-handicapees-accessibilite-allocations-ecole-emploi-accompagnement'],
  ['/question-politique/que-pensez-vous-de-la-politique-envers-les-personnes-handicapees-et-les-personnes-agees', '/question-politique/que-pensez-vous-de-ce-que-fait-l-etat-pour-les-personnes-handicapees-accessibilite-allocations-ecole-emploi-accompagnement'],
  ['/question-politique/que-pensez-vous-de-la-retraite-a-64-ans-votee-en-2023', '/question-politique/age-depart-retraite-62-64-ans'],
  ['/question-politique/que-pensez-vous-de-la-speculation-financiere', '/question-politique/la-speculation-financiere-consiste-a-parier-sur-la-hausse-ou-la-baisse-d-un-prix-action-devise-matiere-premiere-pour-gagner-de-l-argent-sur-cette-variation-plutot-que-sur-les-revenus-de-l-actif-faut-il-l-encadrer-davantage'],
  ['/question-politique/que-pensez-vous-de-la-voiture-individuelle', '/question-politique/voiture-electrique-interdiction-thermique'],
  ['/question-politique/que-pensez-vous-des-deserts-medicaux', '/question-politique/deserts-medicaux-france'],
  ['/question-politique/que-pensez-vous-des-impots-sur-les-plus-riches', '/question-politique/impots-des-plus-riches'],
  ['/question-politique/que-pensez-vous-du-budget-de-l-education-nationale', '/question-politique/ecole-education-reforme'],
  ['/question-politique/que-pensez-vous-du-cannabis-et-de-sa-legalisation', '/question-politique/legalisation-cannabis-france'],
  ['/question-politique/que-pensez-vous-du-referendum-et-de-la-democratie-directe', '/question-politique/referendum-initiative-citoyenne-ric'],
  ['/question-politique/que-pensez-vous-du-smic-et-des-bas-salaires', '/question-politique/smic-augmentation-salaires'],
  ['/question-politique/quelle-place-pour-la-religion-dans-notre-societe', '/question-politique/laicite-religion-france'],
  ['/question-politique/si-l-ia-sait-faire-la-plupart-des-metiers-qualifies-quelle-valeur-auront-les-diplomes-par-rapport-a-aujourd-hui', '/question-politique/si-l-ia-sait-faire-la-plupart-des-metiers-qualifies-quelle-valeur-auront-les-diplomes-sur-le-marche-du-travail-par-rapport-a-aujourd-hui'],

  // The question was deleted: its theme page.
  ['/question-politique/notre-systeme-depense-beaucoup-plus-pour-soigner-que-pour-prevenir-qu-en-pensez-vous', '/theme/sante'],
  ['/question-politique/que-devrait-faire-l-etat-face-a-la-hausse-des-prix-de-l-energie', '/theme/pouvoir-d-achat-et-vie-quotidienne'],
  ['/question-politique/que-pensez-vous-du-traitement-des-familles-de-delinquants', '/theme/demographie-et-question-migratoire'],
  ['/question-politique/quel-role-l-etat-devrait-il-jouer-dans-le-logement', '/theme/logement'],
];

export const redirects = new Map(REDIRECTS);

/**
 * The 301 target for a request URL (path + query), or null. Also folds duplicate slashes and drops a trailing
 * slash, so `/themes/` and `//` get one 301 here instead of TanStack's 307 or its 308 to an http:// URL.
 */
export function findRedirect(url) {
  const queryIndex = url.indexOf('?');
  const rawPath = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const query = queryIndex === -1 ? '' : url.slice(queryIndex);
  const path = rawPath.replace(/\/{2,}/g, '/').replace(/(.)\/+$/, '$1');
  const target = redirects.get(path) ?? (path !== rawPath ? path : null);
  return target === null ? null : target + query;
}
