import type { Article } from '~/types/article';
import { candidateSlugMap, candidatesCount, getCandidateParty, getQuestionSlugById, quizz } from '~/utils/seo';

const PUBLIC_SENAT =
  'https://www.publicsenat.fr/actualites/politique/presidentielle-2027-pauvrete-pouvoir-dachat-logement-le-pen-melenchon-glucksmann-retailleau-attal-confrontent-leurs-visions-de-la-solidarite-aux-restos';
const LCP = 'https://lcp.fr/actualites/logement-associations-jeunesse-ce-qu-il-faut-retenir-du-debat-presidentiel-sur-lci';

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const AIDES_SOCIALES = 'question-2027-dep-07';
const LOGEMENT_SOCIAL = 'question-2027-log-09';
const SUCCESSION = 'question-2027-fin-05';
const SMIC = 'question-2027-trav-05';

const debaters = ['marine-le-pen', 'jean-luc-melenchon', 'raphael-glucksmann', 'bruno-retailleau', 'gabriel-attal'];

const allQuestions = quizz.flatMap((t) => t.questions);
const answersOf = (questionId: string) => allQuestions.find((q) => q._id === questionId)?.answers ?? [];
const answerIndexOf = (slug: string, questionId: string) =>
  candidateSlugMap.find((c) => c.slug === slug)?.answers.find((a) => a.questionId === questionId)?.answerIndex;
const candidateLink = (slug: string) => {
  const candidate = candidateSlugMap.find((c) => c.slug === slug);
  if (!candidate) return '';
  const party = getCandidateParty(slug);
  return `<a href="/candidat/${slug}">${candidate.pseudo}</a>${party ? ` (${party})` : ''}`;
};

const debatersTable = () => {
  const columns = [
    { id: AIDES_SOCIALES, label: 'Aides sociales' },
    { id: LOGEMENT_SOCIAL, label: 'Logement social' },
    { id: SMIC, label: 'Smic' },
    { id: SUCCESSION, label: 'Droits de succession' },
  ];
  const head = `<tr><th>Candidat</th>${columns.map((c) => `<th><a href="/question-politique/${getQuestionSlugById(c.id)}">${c.label}</a></th>`).join('')}</tr>`;
  const rows = debaters
    .map((slug) => {
      const cells = columns.map((c) => {
        const index = answerIndexOf(slug, c.id);
        return `<td>${index === undefined ? 'Pas de réponse' : answersOf(c.id)[index]}</td>`;
      });
      return `<tr><td>${candidateLink(slug)}</td>${cells.join('')}</tr>`;
    })
    .join('\n');
  return `<table>\n${head}\n${rows}\n</table>`;
};

const familyLabels = [
  'réduire fortement les aides sociales',
  'mieux les cibler, supprimer les abus et les doublons',
  'maintenir le niveau actuel',
  'les augmenter',
  'une hausse massive et de nouveaux droits sociaux',
];

const familiesHtml = () => {
  let rank = 0;
  return familyLabels
    .map((label, answerIndex) => {
      const slugs = candidateSlugMap.filter((c) => answerIndexOf(c.slug, AIDES_SOCIALES) === answerIndex).map((c) => c.slug);
      if (!slugs.length) return '';
      rank += 1;
      const present = slugs.filter((s) => debaters.includes(s)).length;
      const intro = present
        ? `<p>${present === 1 ? 'Un des cinq candidats du débat a cette position' : `${present} des cinq candidats du débat ont cette position`}.</p>\n`
        : '';
      const items = slugs.map((s) => `<li>${candidateLink(s)}${debaters.includes(s) ? ', sur le plateau le 16 novembre' : ''}</li>`).join('\n');
      return `<h3>Famille ${rank} : ${label} (${slugs.length} candidat${slugs.length > 1 ? 's' : ''})</h3>\n${intro}<ul>\n${items}\n</ul>`;
    })
    .filter(Boolean)
    .join('\n\n');
};

export const article: Article = {
  slug: 'debat-lci-restos-du-coeur-16-novembre-2026-candidats-2027',
  title: `Débat aux Restos du Cœur du 16 novembre 2026 : ce qu'ont dit Le Pen, Mélenchon, Glucksmann, Retailleau et Attal, et les positions des ${candidatesCount} candidats`,
  excerpt:
    "Priorité aux Français pour les HLM, « priorité au travail », 400 000 logements sociaux par an : le débat organisé par LCI dans un entrepôt des Restos du Cœur a surtout opposé cinq définitions de la solidarité. Ce qu'ils ont dit, et où se situent tous les candidats.",
  date: '2026-11-17',
  tag: 'Analyse',
  content: `
<p>David, 53 ans, a dormi quatorze mois dans sa voiture alors qu'il avait un emploi. C'est son témoignage qui a lancé, lundi 16 novembre 2026, l'échange le plus vif du ${ext(LCP, 'débat organisé par LCI dans un entrepôt des Restos du Cœur')}, à la veille de la 42e campagne de l'association. Marine Le Pen a répondu par une « priorité d'accès aux Français » au logement social, Raphaël Glucksmann l'a accusée de proposer « le tri », et la soirée n'a plus vraiment quitté cette ligne de partage.</p>

<h2>Le débat des Restos du Cœur, en pratique</h2>
<p>Cinq candidats étaient face aux bénévoles et aux bénéficiaires de l'association : Marine Le Pen (Rassemblement national), Jean-Luc Mélenchon (La France insoumise), Raphaël Glucksmann (Place publique, soutenu par le Parti socialiste), Bruno Retailleau (Les Républicains) et Gabriel Attal (Renaissance). Les questions étaient posées par des personnes aidées par les Restos, puis relancées par Gilles Bouleau. ${ext(PUBLIC_SENAT, 'Parmi les six candidats les mieux placés dans les sondages, seul Édouard Philippe manquait, retenu par un conseil municipal au Havre')}.</p>
<p>Le décor n'était pas neutre. ${ext(PUBLIC_SENAT, "15,4 % des Français vivaient sous le seuil de pauvreté en 2024 selon l'Insee, et l'association a distribué 186 millions de repas l'an dernier, contre 161 millions un an plus tôt")}.</p>

<p>Repères :</p>
<ul>
<li><strong>27 août 2026</strong> : premier grand débat de la campagne, devant le Medef, à Roland-Garros (<a href="/blog/debat-medef-27-aout-2026-france-candidats-2027">notre résumé</a>).</li>
<li><strong>16 novembre 2026</strong> : deuxième débat, sur LCI, consacré à la pauvreté, au pouvoir d'achat, au logement, aux associations, à la jeunesse et aux retraites.</li>
<li><strong>17 novembre 2026</strong> : lancement de la 42e campagne des Restos du Cœur.</li>
</ul>

<h2>Ce qui a opposé les cinq candidats</h2>

<h3>Logement social : priorité aux Français ou priorité au travail ?</h3>
<p>Marine Le Pen a défendu une « priorité d'accès aux Français » dans l'attribution des HLM, en précisant : ${ext(LCP, "« Ça ne veut pas dire une exclusivité, ça veut dire une priorité »")}. Elle l'a justifiée par l'histoire du parc social, « construit avec les efforts de nos parents, de nos grands-parents ». Elle propose aussi de transformer des bureaux vacants en logements.</p>
<p>Raphaël Glucksmann lui a répondu : ${ext(LCP, "« Vous proposez le tri dans le logement social ! »")}, en l'accusant d'ajouter « un autre tri » avec l'abolition de la loi SRU. Jean-Luc Mélenchon a dit qu'il ne pouvait pas y avoir de tri entre les populations à loger, car « les enfants de l'un sont les enfants de tout le monde ». Il veut construire ${ext(PUBLIC_SENAT, '400 000 logements sociaux par an, financés en partie par l\'épargne du Livret A')}.</p>
<p>Gabriel Attal s'est opposé à la proposition de Marine Le Pen (« Vous faites une différence entre les Français et les étrangers ») mais veut lui aussi changer les critères, en donnant une priorité au ${ext(LCP, "« fait de travailler, notamment pour les services publics »")}. Bruno Retailleau a repris la « priorité au travail » et vise surtout les normes, qu'il rend responsables du manque de logements. Gabriel Attal a ajouté une ${ext(PUBLIC_SENAT, "« banque nationale pour le logement », qui financerait une partie de l'achat d'un logement, remboursée à la revente")}.</p>
<p>Le Quizz du Berger ne pose pas encore la question de l'ordre de priorité dans l'attribution des HLM. Il demande en revanche <a href="/question-politique/${getQuestionSlugById(LOGEMENT_SOCIAL)}">quelle place donner au logement social</a> et s'il faut <a href="/question-politique/${getQuestionSlugById('question-2027-log-10')}">assouplir les règles pour construire plus</a>.</p>

<h3>Pouvoir d'achat : faire baisser les prix, alléger les prélèvements ou redistribuer ?</h3>
<p>La première question venait de Sandrine, mère seule de trois enfants : comment vivre de son travail quand deux salaires ne suffisent plus ? Bruno Retailleau a répondu par le travail : ${ext(PUBLIC_SENAT, "« Si on veut moins de pauvreté en France, il faut plus de travail, créer plus de richesse et travailler un peu plus »")}. Gabriel Attal propose de supprimer la CSG sur les salaires. Marine Le Pen veut agir sur les prix, avec une TVA à 0 % sur les produits de première nécessité et moins de taxes sur l'énergie.</p>
<p>Jean-Luc Mélenchon défend la gratuité des cantines scolaires, l'encadrement des marges de la grande distribution et une hausse du Smic. Raphaël Glucksmann a visé les baisses d'impôts accordées aux plus riches depuis 2017 : ${ext(PUBLIC_SENAT, "« Cette théorie du ruissellement ne fonctionne pas »")}.</p>

<h3>Héritages : jusqu'où taxer ?</h3>
<p>Pour financer leurs mesures, les deux candidats de gauche visent les grosses successions. Jean-Luc Mélenchon veut tout prendre au-dessus de douze millions d'euros, et ${ext(LCP, "financer avec cet argent l'allocation d'autonomie de tous les jeunes de plus de 18 ans")}. Raphaël Glucksmann veut taxer les « méga héritages », ceux du 1 % des héritiers les plus riches. Marine Le Pen a appelé Jean-Luc Mélenchon à « ne pas céder à la facilité », et Bruno Retailleau a jugé ces promesses irréalistes.</p>

<h3>Associations : qui doit recevoir des subventions ?</h3>
<p>Romain Colucci, fils du fondateur des Restos, a demandé aux candidats ce qu'ils feraient si l'association fermait. Les cinq ont promis de ne pas la laisser tomber, puis la discussion a dévié vers les subventions. Marine Le Pen veut ${ext(LCP, "« arrêter de subventionner les associations politisées »")} et a qualifié la Ligue des droits de l'homme de « ramassis de gauchistes ». Gabriel Attal lui a opposé les exemples des mairies RN de Hayange et de Beaucaire, et l'a accusée de vouloir ${ext(PUBLIC_SENAT, "3,7 milliards d'euros d'économies sur le secteur associatif")}. « Les droits de l'homme, c'est un sujet politique, Madame Le Pen », a répondu Jean-Luc Mélenchon.</p>

<h3>Jeunes et retraités</h3>
<p>Pour les étudiants, Marine Le Pen propose une ${ext(LCP, "« prime d'activité étudiante » égale à 20 % du salaire, plafonnée à 200 euros (30 % et 300 euros pour les boursiers)")}. Jean-Luc Mélenchon défend une allocation d'autonomie de 1 337 euros par mois, Raphaël Glucksmann un passe mobilité à un euro par jour pour les moins de 25 ans.</p>
<p>Sur les retraites, Bruno Retailleau veut un âge légal à 65 ans et un pilier de capitalisation : ${ext(LCP, "« Sans cette borne d'âge on fabrique de la pauvreté »")}. Gabriel Attal écarte le débat sur l'âge, garde la durée de cotisation et ajoute lui aussi la capitalisation. Jean-Luc Mélenchon y voit « un piège » et veut porter les petites pensions au niveau du Smic. Raphaël Glucksmann défend la répartition et une hausse des petites retraites au-dessus de l'inflation. Marine Le Pen veut un départ à 60 ans avec 40 annuités pour ceux qui ont commencé avant 20 ans. Le sujet a son <a href="/blog/reforme-retraites-65-ans-capitalisation-france-candidats-2027">propre article</a>.</p>

<h3>Le bilan du quinquennat, adressé à Gabriel Attal</h3>
<p>Seul ancien Premier ministre d'Emmanuel Macron sur le plateau, Gabriel Attal a été visé par Raphaël Glucksmann (« cadeaux fiscaux aux plus riches ») puis par Marine Le Pen, qui lui a reproché d'avoir participé à « créer la plus grosse dette de l'histoire du pays ». Il a répondu : ${ext(LCP, "« J'assume ce qui a été réussi (...), j'assume les échecs »")}, en citant la pauvreté et le logement.</p>
<p>Chacun a fini sur une formule. Bruno Retailleau : ${ext(PUBLIC_SENAT, "« Oui à la solidarité, non à l'assistanat »")}. Jean-Luc Mélenchon : « La règle entre nous doit être le partage. » Raphaël Glucksmann a choisi une promesse précise, ${ext(LCP, 'loger en trois semaines les 3 000 enfants qui dorment dans la rue')} s'il est élu.</p>

<h2>Les cinq candidats du débat dans le Quizz du Berger</h2>
<p>Le tableau donne la réponse retenue pour chacun sur quatre questions du quiz liées au débat. Ces réponses viennent de leurs positions publiques, pas d'un questionnaire qu'ils auraient rempli eux-mêmes.</p>
${debatersTable()}

<h2>Les positions des ${candidatesCount} candidats sur les aides sociales</h2>
<p>La formule de Bruno Retailleau, « non à l'assistanat », et celle de Jean-Luc Mélenchon sur le partage renvoient à la même question du quiz : <a href="/question-politique/${getQuestionSlugById(AIDES_SOCIALES)}">que devrait faire l'État avec le RSA, les allocations familiales, les aides au logement et les minima sociaux ?</a> Les ${candidatesCount} candidats se répartissent ainsi.</p>

${familiesHtml()}

<h2>Priorité aux Français dans le logement social : les arguments échangés</h2>
<table>
<tr><th>Arguments pour la priorité nationale</th><th>Arguments contre</th></tr>
<tr><td>Le parc social a été financé par les générations précédentes de Français, qui devraient en bénéficier d'abord (Marine Le Pen).</td><td>Trier les demandeurs selon leur nationalité est une discrimination, « les enfants de l'un sont les enfants de tout le monde » (Jean-Luc Mélenchon).</td></tr>
<tr><td>Il s'agit d'une priorité dans l'ordre d'attribution, pas d'une exclusion des étrangers (Marine Le Pen).</td><td>Le problème vient du manque de logements, que seule la construction peut régler (Raphaël Glucksmann, Jean-Luc Mélenchon).</td></tr>
<tr><td></td><td>Si l'on change les critères, mieux vaut privilégier ceux qui travaillent, notamment dans les services publics, quelle que soit leur nationalité (Gabriel Attal, Bruno Retailleau).</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<ul>
<li><a href="/question-politique/${getQuestionSlugById(LOGEMENT_SOCIAL)}">Logement social et loi SRU : les positions des candidats</a></li>
<li><a href="/question-politique/${getQuestionSlugById(SUCCESSION)}">Droits de succession : les positions des candidats</a></li>
<li><a href="/question-politique/${getQuestionSlugById(SMIC)}">Smic et salaires : les positions des candidats</a></li>
<li><a href="/blog/smic-1700-euros-hausse-salaires-france-candidats-2027">Smic à 1 700 euros : tout comprendre</a></li>
<li><a href="/blog/debat-medef-27-aout-2026-france-candidats-2027">Le premier débat, face au Medef</a></li>
<li><a href="/theme/logement">Toutes les questions du thème Logement</a></li>
<li><a href="/theme/pouvoir-d-achat-et-vie-quotidienne">Toutes les questions du thème Pouvoir d'achat</a></li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "Débat aux Restos du Cœur du 16 novembre 2026 : ce qu'ont dit Le Pen, Mélenchon, Glucksmann, Retailleau et Attal",
    datePublished: '2026-11-17',
    description: `Débat LCI du 16 novembre 2026 aux Restos du Cœur : logement social, pouvoir d'achat, héritages, associations, retraites. Positions des ${candidatesCount} candidats à la présidentielle 2027 sur les aides sociales.`,
    author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
    about: [
      { '@type': 'Event', name: 'Débat présidentiel LCI aux Restos du Cœur', startDate: '2026-11-16' },
      { '@type': 'Thing', name: 'Logement social' },
      { '@type': 'Thing', name: 'Pauvreté en France' },
      { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
    ],
  },
};
