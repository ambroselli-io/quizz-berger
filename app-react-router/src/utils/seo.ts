import rawQuizzData from '~/shared/quizz-2027.json';
import candidatesData from '~/shared/candidates-answers.json';
import type { QuizzTheme, QuizzQuestion } from '@app/types/quizz';

const quizz: QuizzTheme[] = rawQuizzData as QuizzTheme[];

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
    seoTitle: 'Guerre en Ukraine : que pensent les candidats à la présidentielle 2027 ?',
    seoDescription: 'Découvrez les positions des 24 candidats à la présidentielle 2027 sur la guerre en Ukraine et le rôle de la France.',
  },
  'question-2027-ae-02': {
    slug: 'france-otan-alliance',
    seoTitle: 'OTAN : les positions des candidats à la présidentielle 2027',
    seoDescription: 'France et OTAN : sortir, rester, renforcer ? Comparez les positions des candidats à la présidentielle 2027.',
  },
  'question-2027-ae-04': {
    slug: 'construction-europeenne-avenir',
    seoTitle: 'Construction européenne : que proposent les candidats 2027 ?',
    seoDescription: 'Europe fédérale, souveraineté ou Frexit ? Les positions des candidats à la présidentielle 2027 sur l\'Europe.',
  },
  'question-2027-agri-01': {
    slug: 'pesticides-agriculture-france',
    seoTitle: 'Pesticides : les positions des candidats à la présidentielle 2027',
    seoDescription: 'Interdiction des pesticides, agriculture raisonnée ou laisser-faire ? Les candidats répondent.',
  },
  'question-2027-agri-03': {
    slug: 'agriculture-biologique-france',
    seoTitle: 'Agriculture biologique : les positions des candidats 2027',
    seoDescription: 'Quelle place pour le bio en France ? Découvrez les positions des 24 candidats à la présidentielle 2027.',
  },
  'question-2027-climat-01': {
    slug: 'nucleaire-france-avenir',
    seoTitle: 'Nucléaire en France : que proposent les candidats à la présidentielle 2027 ?',
    seoDescription: 'Relancer le nucléaire ou en sortir ? Comparez les positions des 24 candidats à la présidentielle 2027.',
  },
  'question-2027-climat-03': {
    slug: 'voiture-electrique-interdiction-thermique',
    seoTitle: 'Voiture électrique : les positions des candidats 2027',
    seoDescription: 'Interdiction des voitures thermiques en 2035 : pour ou contre ? Les candidats à la présidentielle répondent.',
  },
  'question-2027-immigration-01': {
    slug: 'immigration-france-2027',
    seoTitle: 'Immigration : les positions des candidats à la présidentielle 2027',
    seoDescription: 'Immigration en France : régularisation, quotas ou immigration zéro ? Comparez les positions des 24 candidats.',
  },
  'question-2027-immigration-03': {
    slug: 'droit-du-sol-nationalite',
    seoTitle: 'Droit du sol : les positions des candidats à la présidentielle 2027',
    seoDescription: 'Droit du sol, droit du sang, naturalisation : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-depenses-01': {
    slug: 'dette-publique-france',
    seoTitle: 'Dette publique : les propositions des candidats à la présidentielle 2027',
    seoDescription: 'Réduire la dette, austérité ou relance ? Comparez les positions des candidats à la présidentielle 2027.',
  },
  'question-2027-fiscal-01': {
    slug: 'impot-sur-le-revenu-reforme',
    seoTitle: 'Impôt sur le revenu : les positions des candidats 2027',
    seoDescription: 'Réforme fiscale, flat tax, ISF : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-gouvernance-01': {
    slug: 'proportionnelle-elections',
    seoTitle: 'Proportionnelle : quel candidat est pour ? Présidentielle 2027',
    seoDescription: 'Scrutin proportionnel aux législatives : qui est pour, qui est contre ? Les positions des candidats 2027.',
  },
  'question-2027-gouvernance-03': {
    slug: 'referendum-initiative-citoyenne-ric',
    seoTitle: 'RIC (Référendum d\'Initiative Citoyenne) : les candidats 2027',
    seoDescription: 'RIC : les candidats à la présidentielle 2027 sont-ils pour ou contre le référendum d\'initiative citoyenne ?',
  },
  'question-2027-sante-03': {
    slug: 'euthanasie-loi-france',
    seoTitle: 'Euthanasie : les positions des candidats à la présidentielle 2027',
    seoDescription: 'Fin de vie, euthanasie, suicide assisté : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-sante-05': {
    slug: 'deserts-medicaux-france',
    seoTitle: 'Déserts médicaux : les propositions des candidats 2027',
    seoDescription: 'Déserts médicaux en France : contraindre les médecins, inciter, télémédecine ? Les candidats répondent.',
  },
  'question-2027-societe-01': {
    slug: 'legalisation-cannabis-france',
    seoTitle: 'Légalisation du cannabis : les positions des candidats 2027',
    seoDescription: 'Cannabis : légalisation, dépénalisation ou répression ? Comparez les positions des candidats à la présidentielle.',
  },
  'question-2027-societe-03': {
    slug: 'laicite-religion-france',
    seoTitle: 'Laïcité : les positions des candidats à la présidentielle 2027',
    seoDescription: 'Laïcité, port du voile, signes religieux : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-societe-07': {
    slug: 'gpa-pma-france',
    seoTitle: 'GPA et PMA : les positions des candidats à la présidentielle 2027',
    seoDescription: 'GPA, PMA pour toutes : les candidats à la présidentielle 2027 sont-ils pour ou contre ?',
  },
  'question-2027-police-01': {
    slug: 'police-securite-france',
    seoTitle: 'Sécurité : les propositions des candidats à la présidentielle 2027',
    seoDescription: 'Police, sécurité, vidéosurveillance : comparez les positions des candidats à la présidentielle 2027.',
  },
  'question-2027-pouvoir-achat-01': {
    slug: 'smic-augmentation-salaires',
    seoTitle: 'SMIC et salaires : les propositions des candidats 2027',
    seoDescription: 'Augmentation du SMIC, pouvoir d\'achat : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-logement-01': {
    slug: 'crise-logement-france',
    seoTitle: 'Crise du logement : les propositions des candidats 2027',
    seoDescription: 'Logement, loyers, construction : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-education-01': {
    slug: 'ecole-education-reforme',
    seoTitle: 'Éducation : les propositions des candidats à la présidentielle 2027',
    seoDescription: 'Réforme de l\'école, uniforme, programmes : comparez les positions des candidats 2027.',
  },
  'question-2027-numerique-01': {
    slug: 'intelligence-artificielle-regulation',
    seoTitle: 'Intelligence artificielle : les positions des candidats 2027',
    seoDescription: 'Régulation de l\'IA, souveraineté numérique : que proposent les candidats à la présidentielle 2027 ?',
  },
  'question-2027-economie-01': {
    slug: 'reindustrialisation-france',
    seoTitle: 'Réindustrialisation : les propositions des candidats 2027',
    seoDescription: 'Relocalisation, industrie française : que proposent les candidats à la présidentielle 2027 ?',
  },
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
        seoTitle: hotTopic?.seoTitle || `${question.fr} — Les candidats à la présidentielle 2027 répondent`,
        seoDescription: hotTopic?.seoDescription || `Découvrez les positions des 24 candidats à la présidentielle 2027 : ${question.fr}`,
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
