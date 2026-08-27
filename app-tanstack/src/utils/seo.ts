import rawQuizzData from '~/shared/quizz-2027.json';
import candidatesData from '~/shared/candidates-answers.json';
import type { QuizzTheme, QuizzQuestion } from '@app/types/quizz';

const quizz: QuizzTheme[] = rawQuizzData as QuizzTheme[];

// --- Native app (App Store) ---

export const APP_STORE_ID = '6786041827';
export const APP_STORE_URL = `https://apps.apple.com/fr/app/quizz-du-berger-vote-2027/id${APP_STORE_ID}`;
export const APP_NAME = 'Quizz du Berger – Vote 2027';
/** Custom URL scheme declared in expo app.config.js (`scheme`). */
export const APP_URL_SCHEME = 'quizz-du-berger';

// --- Theme slug mappings ---

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface ThemeSlugEntry {
  slug: string;
  themeId: string;
  fr: string;
  questions: QuizzQuestion[];
}

export const themeSlugMap: ThemeSlugEntry[] = quizz
  .filter((t) => t.questions.length > 0)
  .map((t) => ({
    slug: slugify(t.fr),
    themeId: t._id,
    fr: t.fr,
    questions: t.questions,
  }));

export function getThemeBySlug(slug: string): ThemeSlugEntry | undefined {
  return themeSlugMap.find((t) => t.slug === slug);
}

// --- Candidate slug mappings ---

export interface CandidateSlugEntry {
  slug: string;
  id: string;
  pseudo: string;
  color: string;
  picture: string;
  answers: Array<{ themeId: string; questionId: string; answerIndex: number }>;
}

export const candidateSlugMap: CandidateSlugEntry[] = candidatesData.map((c) => ({
  slug: slugify(c.pseudo),
  id: c.id,
  pseudo: c.pseudo,
  color: c.color,
  picture: c.picture || '',
  answers: c.answers,
}));

export const candidatesCount = candidateSlugMap.length;

export function getCandidateBySlug(slug: string): CandidateSlugEntry | undefined {
  return candidateSlugMap.find((c) => c.slug === slug);
}

// --- Question slug mappings for hot-topic pages ---

export interface QuestionSlugEntry {
  slug: string;
  questionId: string;
  themeId: string;
  themeName: string;
  fr: string;
  answers: string[];
  scores: number[][];
  help?: string;
  seoTitle: string;
  seoDescription: string;
}

// Manually curated hot-topic question slugs with SEO-optimized titles
const hotTopicSlugs: Record<string, { slug: string; seoTitle: string; seoDescription: string }> = {
  'question-2027-ae-01': {
    slug: 'guerre-ukraine-france',
    seoTitle: 'Guerre en Ukraine : que pensent les candidats 2027 ?',
    seoDescription: `Découvrez les positions des ${candidatesCount} candidats à la présidentielle 2027 sur la guerre en Ukraine et le rôle de la France.`,
  },
  'question-2027-ae-02': {
    slug: 'france-otan-alliance',
    seoTitle: 'OTAN : les positions des candidats à la présidentielle 2027',
    seoDescription: 'France et OTAN : sortir, rester, renforcer ? Comparez les positions des candidats à la présidentielle 2027.',
  },
  'question-2027-ae-11': {
    slug: 'intervention-americaine-venezuela-maduro-france',
    seoTitle: 'Capture de Maduro : que pensent les candidats 2027 ?',
    seoDescription: `Intervention américaine au Venezuela et capture de Maduro : soutien, neutralité ou condamnation ? Comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-ae-12': {
    slug: 'france-rivalite-etats-unis-chine-taiwan',
    seoTitle: 'États-Unis, Chine, Taïwan : la France en 2027',
    seoDescription: `S'aligner sur Washington, rester autonome ou se rapprocher de Pékin ? Les positions des ${candidatesCount} candidats à la présidentielle 2027 face à la rivalité sino-américaine.`,
  },
  'question-2027-ae-04': {
    slug: 'construction-europeenne-avenir',
    seoTitle: 'Construction européenne : que proposent les candidats 2027 ?',
    seoDescription: 'Europe fédérale, souveraineté ou Frexit ? Les positions des candidats à la présidentielle 2027 sur l\'Europe.',
  },
  'question-2027-agri-01': {
    slug: 'pesticides-agriculture-france',
    seoTitle: 'Pesticides : les positions des candidats 2027',
    seoDescription: 'Interdiction des pesticides, agriculture raisonnée ou laisser-faire ? Les candidats répondent.',
  },
  'question-2027-agri-03': {
    slug: 'agriculture-biologique-france',
    seoTitle: 'Agriculture biologique : les positions des candidats 2027',
    seoDescription: `Quelle place pour le bio en France ? Découvrez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-agri-02': {
    slug: 'crise-eau-secheresse-france',
    seoTitle: 'Crise de l\'eau et sécheresse : les candidats 2027',
    seoDescription: `Bassines, restrictions, sobriété : comment gérer la sécheresse ? Comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-climat-02': {
    slug: 'nucleaire-france-avenir',
    seoTitle: 'Nucléaire : que proposent les candidats 2027 ?',
    seoDescription: `Relancer le nucléaire ou en sortir ? Comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-climat-04': {
    slug: 'voiture-electrique-interdiction-thermique',
    seoTitle: 'Voiture électrique : les positions des candidats 2027',
    seoDescription: 'Voiture individuelle, électrique, fin du thermique : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-immi-01': {
    slug: 'immigration-france-2027',
    seoTitle: 'Immigration : les positions des candidats 2027',
    seoDescription: `Immigration en France : régularisation, quotas ou immigration zéro ? Comparez les positions des ${candidatesCount} candidats.`,
  },
  'question-2027-dep-04': {
    slug: 'dette-publique-france',
    seoTitle: 'Dette publique : les propositions des candidats 2027',
    seoDescription: 'Réduire la dette, austérité ou relance ? Comparez les positions des candidats à la présidentielle 2027.',
  },
  'question-2027-fisc-01': {
    slug: 'impots-des-plus-riches',
    seoTitle: 'Impôts des plus riches : les positions des candidats 2027',
    seoDescription: 'Faut-il augmenter les impôts des plus riches ? ISF, taxation du capital : les candidats à la présidentielle 2027 répondent.',
  },
  'question-2027-gouv-03': {
    slug: 'proportionnelle-elections',
    seoTitle: 'Proportionnelle : quel candidat est pour ? 2027',
    seoDescription: 'Scrutin proportionnel aux législatives : qui est pour, qui est contre ? Les positions des candidats 2027.',
  },
  'question-2027-gouv-04': {
    slug: 'referendum-initiative-citoyenne-ric',
    seoTitle: 'RIC (Référendum d\'Initiative Citoyenne) : les candidats 2027',
    seoDescription: 'RIC : les candidats à la présidentielle 2027 sont-ils pour ou contre le référendum d\'initiative citoyenne ?',
  },
  'question-2027-soc-07': {
    slug: 'euthanasie-loi-france',
    seoTitle: 'Aide à mourir : les positions des candidats 2027',
    seoDescription: 'Fin de vie, euthanasie, suicide assisté : que proposent les candidats à la présidentielle 2027 sur la loi sur l\'aide à mourir ?',
  },
  'question-2027-san-03': {
    slug: 'deserts-medicaux-france',
    seoTitle: 'Déserts médicaux : les propositions des candidats 2027',
    seoDescription: 'Déserts médicaux en France : contraindre les médecins, inciter, télémédecine ? Les candidats répondent.',
  },
  'question-2027-pol-07': {
    slug: 'legalisation-cannabis-france',
    seoTitle: 'Légalisation du cannabis : les positions des candidats 2027',
    seoDescription: 'Cannabis : légalisation, dépénalisation ou répression ? Comparez les positions des candidats à la présidentielle.',
  },
  'question-2027-soc-03': {
    slug: 'laicite-religion-france',
    seoTitle: 'Laïcité : les positions des candidats 2027',
    seoDescription: 'Laïcité, port du voile, signes religieux : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-soc-05': {
    slug: 'gpa-pma-france',
    seoTitle: 'GPA : les positions des candidats 2027',
    seoDescription: 'GPA, PMA pour toutes : les candidats à la présidentielle 2027 sont-ils pour ou contre ?',
  },
  'question-2027-pol-05': {
    slug: 'police-securite-france',
    seoTitle: 'Terrorisme et sécurité : les propositions des candidats 2027',
    seoDescription: 'Lutte contre le terrorisme : approche sécuritaire, renseignement ou prévention ? Comparez les positions des candidats à la présidentielle 2027.',
  },
  'question-2027-immi-09': {
    slug: 'expulsion-etrangers-condamnes-double-peine',
    seoTitle: 'Expulsion des étrangers condamnés : les candidats 2027',
    seoDescription: `Double peine, OQTF, expulsion après une condamnation : comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-trav-05': {
    slug: 'smic-augmentation-salaires',
    seoTitle: 'SMIC et salaires : les propositions des candidats 2027',
    seoDescription: 'Augmentation du SMIC, pouvoir d\'achat : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-log-06': {
    slug: 'crise-logement-france',
    seoTitle: 'Crise du logement : les propositions des candidats 2027',
    seoDescription: 'Logement, loyers, construction : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-edu-01': {
    slug: 'ecole-education-reforme',
    seoTitle: 'Budget de l\'Éducation nationale : les candidats 2027',
    seoDescription: 'Budget de l\'Éducation nationale, moyens pour l\'école : comparez les positions des candidats 2027.',
  },
  'question-2027-num-01': {
    slug: 'intelligence-artificielle-regulation',
    seoTitle: 'Intelligence artificielle : les positions des candidats 2027',
    seoDescription: 'Impact et régulation de l\'IA, souveraineté numérique : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-eco-02': {
    slug: 'reindustrialisation-france',
    seoTitle: 'Réindustrialisation : les propositions des candidats 2027',
    seoDescription: 'Relocalisation, industrie française : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-corr-06': {
    slug: 'ineligibilite-elus-condamnes',
    seoTitle: 'Inéligibilité des élus condamnés : les candidats 2027',
    seoDescription: `Exécution provisoire, inéligibilité des élus condamnés : que pensent les ${candidatesCount} candidats à la présidentielle 2027 ?`,
  },
  'question-2027-num-02': {
    slug: 'interdiction-reseaux-sociaux-mineurs-15-ans',
    seoTitle: 'Réseaux sociaux et mineurs : les candidats 2027',
    seoDescription: `Réseaux sociaux et écrans chez les jeunes : comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-pol-09': {
    slug: 'loi-ripost-securite-quotidien-france',
    seoTitle: 'Loi Ripost et sécurité du quotidien : candidats 2027',
    seoDescription: `Rodéos motorisés, free parties, protoxyde d'azote : comparez les positions des ${candidatesCount} candidats à la présidentielle 2027 sur la loi Ripost.`,
  },
  'question-2027-climat-07': {
    slug: 'feux-foret-securite-civile-france',
    seoTitle: 'Feux de forêt et sécurité civile : les candidats 2027',
    seoDescription: `Moyens des pompiers, flotte aérienne, adaptation des forêts au changement climatique : comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-pol-10': {
    slug: 'presomption-legitime-defense-policiers',
    seoTitle: 'Légitime défense des policiers : les candidats 2027',
    seoDescription: `Loi sur la présomption de légitime défense pour les forces de l'ordre : comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-gouv-07': {
    slug: 'reduction-nombre-parlementaires',
    seoTitle: 'Réduire le nombre de parlementaires : les candidats 2027',
    seoDescription: `Réduire le nombre de députés et de sénateurs : comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-pol-11': {
    slug: 'crise-pompiers-financement-recrutement-france',
    seoTitle: 'Crise des pompiers et Sdis : les candidats 2027',
    seoDescription: `Effectifs, moyens matériels et recrutement des Sdis : comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-trav-01': {
    slug: 'age-depart-retraite-62-64-ans',
    seoTitle: 'Retraite à 62 ou 64 ans : les candidats 2027',
    seoDescription: `Suspension de la réforme de 2023, retour à 62 ou 60 ans, maintien à 64 : comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
  'question-2027-trav-07': {
    slug: 'desindexation-pensions-retraite-inflation',
    seoTitle: 'Désindexation des retraites : les candidats 2027',
    seoDescription: `Gel ou sous-indexation des pensions sur l'inflation dans le budget 2027 : comparez les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
  },
};

// Questions that already collect impressions in Search Console but kept an auto-generated
// slug. Google cuts a title around 60 characters, so a title built as "<question text> — Les
// candidats ... répondent" never showed the promise: the whole suffix fell past the cut.
// These titles lead with the searched topic and keep the promise inside the budget.
// Everything else falls back to the raw question text (see buildQuestionSlugMap).
const searchedQuestionTitles: Record<string, string> = {
  'question-2027-fin-05': 'Droits de succession : les positions des candidats 2027',
  'question-2027-climat-05': 'Efforts pour le climat : qui doit payer ? Candidats 2027',
  'question-2027-trav-02': 'Temps de travail légal : les positions des candidats 2027',
  'question-2027-edu-05': 'Parcoursup : les positions des candidats 2027',
  'question-2027-cult-03': 'Pass Culture : les positions des candidats 2027',
  'question-2027-agri-04': 'Indépendance alimentaire : les candidats 2027',
  'question-2027-fisc-07': 'Fiscalité verte : les propositions des candidats 2027',
  'question-2027-agri-05': 'Élevage et viande : les positions des candidats 2027',
  'question-2027-gouv-05': 'Bureaucratie : les propositions des candidats 2027',
  'question-2027-san-06': 'Santé mentale des jeunes : les candidats 2027',
  'question-2027-ae-09': 'Israël-Palestine : que doit faire la France ? 2027',
  'question-2027-log-08': 'Réquisition des logements vacants : les candidats 2027',
  'question-2027-eco-05': 'Attractivité économique : les candidats 2027',
  'question-2027-immi-08': 'Intégration des étrangers : les candidats 2027',
  'question-2027-ae-03': 'Armée française en Afrique : les candidats 2027',
  'question-2027-log-03': 'Airbnb et locations touristiques : les candidats 2027',
  'question-2027-pa-05': 'Pouvoir d\'achat : les propositions des candidats 2027',
  'question-2027-ae-06': 'Face à la Chine : les positions des candidats 2027',
  'question-2027-immi-05': 'Régularisation des sans-papiers : les candidats 2027',
  'question-2027-fin-03': 'Patrimoine des candidats : faut-il le publier ? 2027',
  'question-2027-soc-02': 'Droits LGBT+ : les positions des candidats 2027',
  'question-2027-fisc-02': 'Impôts de la classe moyenne : les candidats 2027',
  'question-2027-pol-01': 'Violences policières : les positions des candidats 2027',
  'question-2027-san-05': 'Remboursement des soins : les positions des candidats 2027',
  'question-2027-edu-03': 'Écrans et IA à l\'école : les positions des candidats 2027',
  'question-2027-log-04': 'Zones rurales : les propositions des candidats 2027',
  'question-2027-ae-08': 'Conflit Israël-Palestine : où sont les candidats 2027 ?',
  'question-2027-ae-10': 'Reconnaissance de la Palestine : les candidats 2027',
  'question-2027-san-07': 'Prévention ou soins : les positions des candidats 2027',
  'question-2027-soc-04': 'PMA : les positions des candidats 2027',
  'question-2027-pol-04': 'Doctrine pénale : fermeté ou réinsertion ? Candidats 2027',
};

// Also auto-generate slugs for all remaining questions
function buildQuestionSlugMap(): QuestionSlugEntry[] {
  const entries: QuestionSlugEntry[] = [];
  for (const theme of quizz) {
    for (const question of theme.questions) {
      const hotTopic = hotTopicSlugs[question._id];
      const slug = hotTopic?.slug || slugify(question.fr);
      entries.push({
        slug,
        questionId: question._id,
        themeId: theme._id,
        themeName: theme.fr,
        fr: question.fr,
        answers: question.answers,
        scores: question.scores,
        help: question.help,
        seoTitle: hotTopic?.seoTitle || searchedQuestionTitles[question._id] || question.fr,
        seoDescription: hotTopic?.seoDescription || `Découvrez les positions des ${candidatesCount} candidats à la présidentielle 2027 : ${question.fr}`,
      });
    }
  }
  return entries;
}

export const questionSlugMap: QuestionSlugEntry[] = buildQuestionSlugMap();

export const hotTopicQuestions: QuestionSlugEntry[] = questionSlugMap.filter((q) =>
  Object.keys(hotTopicSlugs).includes(q.questionId),
);

export function getQuestionBySlug(slug: string): QuestionSlugEntry | undefined {
  return questionSlugMap.find((q) => q.slug === slug);
}

export function getQuestionSlugById(questionId: string): string | undefined {
  return questionSlugMap.find((q) => q.questionId === questionId)?.slug;
}

export function getQuestionsByThemeId(themeId: string): QuestionSlugEntry[] {
  return questionSlugMap.filter((q) => q.themeId === themeId);
}

// --- Candidate comparison pairs (top matchups) ---

export interface ComparisonPair {
  slug: string;
  candidate1Slug: string;
  candidate2Slug: string;
  candidate1Name: string;
  candidate2Name: string;
}

const topPairSlugs = [
  ['marine-le-pen', 'edouard-philippe'],
  ['marine-le-pen', 'jean-luc-melenchon'],
  ['marine-le-pen', 'eric-zemmour'],
  ['edouard-philippe', 'gabriel-attal'],
  ['edouard-philippe', 'laurent-wauquiez'],
  ['jean-luc-melenchon', 'francois-ruffin'],
  ['jean-luc-melenchon', 'raphael-glucksmann'],
  ['marine-le-pen', 'bruno-retailleau'],
  ['francois-ruffin', 'marine-tondelier'],
  ['edouard-philippe', 'francois-bayrou'],
  ['gabriel-attal', 'raphael-glucksmann'],
  ['marine-le-pen', 'gerald-darmanin'],
  ['edouard-philippe', 'bernard-cazeneuve'],
  ['jean-luc-melenchon', 'fabien-roussel'],
  ['laurent-wauquiez', 'bruno-retailleau'],
  ['eric-zemmour', 'nicolas-dupont-aignan'],
  ['francois-hollande', 'bernard-cazeneuve'],
  ['raphael-glucksmann', 'marine-tondelier'],
  ['edouard-philippe', 'dominique-de-villepin'],
  ['francois-ruffin', 'raphael-glucksmann'],
  ['marine-le-pen', 'francois-asselineau'],
  ['gabriel-attal', 'laurent-wauquiez'],
  ['jean-luc-melenchon', 'nathalie-arthaud'],
  ['xavier-bertrand', 'edouard-philippe'],
  ['delphine-batho', 'marine-tondelier'],
  ['jerome-guedj', 'raphael-glucksmann'],
  ['clementine-autain', 'jean-luc-melenchon'],
  ['david-lisnard', 'laurent-wauquiez'],
  ['gabriel-attal', 'gerald-darmanin'],
  ['francois-bayrou', 'dominique-de-villepin'],
];

export const comparisonPairs: ComparisonPair[] = topPairSlugs.map(([c1slug, c2slug]) => {
  const c1 = candidateSlugMap.find((c) => c.slug === c1slug);
  const c2 = candidateSlugMap.find((c) => c.slug === c2slug);
  return {
    slug: `${c1slug}-vs-${c2slug}`,
    candidate1Slug: c1slug,
    candidate2Slug: c2slug,
    candidate1Name: c1?.pseudo || c1slug,
    candidate2Name: c2?.pseudo || c2slug,
  };
});

// --- All possible candidate pairs (C(n, 2)) — canonical form ---

function pairKey(s1: string, s2: string): string {
  return [s1, s2].sort().join('|');
}

const curatedPairsByKey = new Map<string, ComparisonPair>(
  comparisonPairs.map((p) => [pairKey(p.candidate1Slug, p.candidate2Slug), p]),
);

export const allComparisonPairs: ComparisonPair[] = (() => {
  const out: ComparisonPair[] = [];
  for (let i = 0; i < candidateSlugMap.length; i++) {
    for (let j = i + 1; j < candidateSlugMap.length; j++) {
      const a = candidateSlugMap[i];
      const b = candidateSlugMap[j];
      const key = pairKey(a.slug, b.slug);
      const curated = curatedPairsByKey.get(key);
      if (curated) {
        out.push(curated);
      } else {
        const [first, second] = a.slug < b.slug ? [a, b] : [b, a];
        out.push({
          slug: `${first.slug}-vs-${second.slug}`,
          candidate1Slug: first.slug,
          candidate2Slug: second.slug,
          candidate1Name: first.pseudo,
          candidate2Name: second.pseudo,
        });
      }
    }
  }
  return out;
})();

export function getCanonicalPairSlug(c1Slug: string, c2Slug: string): string {
  if (c1Slug === c2Slug) return '';
  const key = pairKey(c1Slug, c2Slug);
  const curated = curatedPairsByKey.get(key);
  if (curated) return curated.slug;
  const [first, second] = c1Slug < c2Slug ? [c1Slug, c2Slug] : [c2Slug, c1Slug];
  return `${first}-vs-${second}`;
}

export function getComparisonPairsForCandidate(candidateSlug: string): ComparisonPair[] {
  return allComparisonPairs.filter(
    (p) => p.candidate1Slug === candidateSlug || p.candidate2Slug === candidateSlug,
  );
}

// --- Candidate party labels ---

/**
 * Party label per candidate slug, for display next to a name. Factual party names
 * only, never a positioning label. An empty string means the affiliation is unclear
 * or disputed (someone who left a party without joining another): nothing is shown
 * rather than something wrong.
 */
const partyBySlug: Record<string, string> = {
  'nathalie-arthaud': 'LO',
  'francois-asselineau': 'UPR',
  'delphine-batho': 'Génération Écologie',
  'xavier-bertrand': 'LR',
  'nicolas-dupont-aignan': 'DLF',
  'jerome-guedj': 'PS',
  'marine-le-pen': 'RN',
  'jordan-bardella': 'RN',
  'edouard-philippe': 'Horizons',
  'laurent-wauquiez': 'LR',
  'clementine-autain': '',
  'francois-ruffin': '',
  'marine-tondelier': 'Les Écologistes',
  'david-lisnard': 'Nouvelle Énergie',
  'gabriel-attal': 'Renaissance',
  'francois-bayrou': 'MoDem',
  'bernard-cazeneuve': 'La Convention',
  'gerald-darmanin': 'Renaissance',
  'raphael-glucksmann': 'Place publique',
  'francois-hollande': 'PS',
  'jean-luc-melenchon': 'LFI',
  'bruno-retailleau': 'LR',
  'fabien-roussel': 'PCF',
  'eric-zemmour': 'Reconquête',
  'dominique-de-villepin': '',
  'juan-branco': '',
  'patrick-sebastien': '',
  'francis-lalanne': 'France Libre',
  'florian-philippot': 'Les Patriotes',
  'karim-bouamrane': 'PS',
  'segolene-royal': 'PS',
  'philippe-brun': 'PS',
  'anasse-kazib': 'Révolution permanente',
  'selma-labib': 'NPA-R',
  'clara-egger': 'Solution démocratique',
  'antoine-mikolajczak': 'Équinoxe',
  'lydie-massard': 'UDB',
};

export function getCandidateParty(slug: string): string {
  return partyBySlug[slug] || '';
}

// --- Helper: how many candidates picked each answer of a question ---

/**
 * Counts, per answer index, how many candidates chose it. Lets an article quote a
 * split ("14 des 26 répondent que...") without hard-coding a number that goes stale
 * the next time a candidate answer is corrected.
 */
export function getAnswerDistribution(questionId: string): number[] {
  const question = quizz.flatMap((t) => t.questions).find((q) => q._id === questionId);
  if (!question) return [];
  const counts = new Array<number>(question.answers.length).fill(0);
  for (const candidate of candidateSlugMap) {
    const answer = candidate.answers.find((a) => a.questionId === questionId);
    if (answer && counts[answer.answerIndex] !== undefined) counts[answer.answerIndex] += 1;
  }
  return counts;
}

// --- Helper: get candidate answer text for a question ---

export function getCandidateAnswerForQuestion(
  candidateAnswers: Array<{ themeId: string; questionId: string; answerIndex: number }>,
  questionId: string,
  questionAnswers: string[],
): string | null {
  const answer = candidateAnswers.find((a) => a.questionId === questionId);
  if (answer === undefined) return null;
  return questionAnswers[answer.answerIndex] || null;
}

// Re-export for convenience
export { quizz, candidatesData, slugify };
