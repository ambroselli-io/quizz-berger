import type { Article } from '~/types/article';
import { candidatesCount } from '~/utils/seo';

const P = 'https://www.edouardphilippe.fr/programme';
const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

export const article: Article = {
  slug: 'programme-edouard-philippe-presidentielle-2027',
  title: `Programme d'Édouard Philippe pour 2027 : retraite à 65 ans, fin des 35 heures, immigration divisée par deux`,
  excerpt:
    `Le candidat Horizons a mis en ligne quinze chapitres de programme, mis à jour le 12 novembre 2026. Ce qu'il propose thème par thème, et où le placer parmi les ${candidatesCount} candidats du quiz.`,
  date: '2026-11-13',
  tag: 'Analyse',
  content: `
<p>Deux cent cinquante mille postes de fonctionnaires en moins sur cinq ans, un départ à la retraite porté à 65 ans et une immigration divisée par deux : Édouard Philippe a réuni ses propositions dans ${ext(P, 'un programme en quinze chapitres')}, dont la dernière mise à jour date du 12 novembre 2026. Le maire du Havre, ancien Premier ministre et candidat du parti Horizons, avait déjà annoncé une partie de ces mesures ${ext('https://fr.euronews.com/2026/10/09/presidentielle-2027-edouard-philippe-mise-sur-le-travail-et-la-reduction-des-depenses-publ', 'sur France 2 le 8 octobre')}. Le site de campagne les détaille désormais thème par thème, avec des questions-réponses pour chaque chapitre.</p>

<p>Le document est organisé en quatre blocs : l'ordre et la protection des Français, l'économie et les comptes publics, l'avenir des enfants, puis les « grands défis » (intelligence artificielle, énergie, climat, outre-mer). Le texte précise qu'il « s'écrit tout au long de la campagne » : d'autres chapitres sont annoncés, la santé, le logement et la culture n'en ont pas encore.</p>

<h2>Économie et finances publiques : le cœur du programme</h2>

<h3>Retraites : 65 ans et 45 annuités</h3>
<p>Édouard Philippe veut ${ext(`${P}/retraites`, `porter l'âge de départ à 65 ans et la durée de cotisation à 45 ans « en moins de dix ans »`)}. Les départs anticipés restent en place pour les carrières longues et les personnes en mauvaise santé (55 ans en situation de handicap, 60 ans en incapacité permanente, 62 ans en invalidité), si bien qu'« un Français sur trois pourra partir avant 65 ans », selon le programme. Il exclut toute hausse des cotisations et toute baisse générale des pensions.</p>
<p>Il ajoute une retraite par capitalisation collective généralisée à tous les salariés, sur le modèle de ce qui existe pour les fonctionnaires, et un plan d'épargne retraite ouvert à chaque Français avec un premier versement de 500 € par l'État au premier emploi. La capitalisation vient en complément de la répartition, sans la remplacer. Une fois le système revenu à l'équilibre, sa gestion serait confiée aux partenaires sociaux.</p>

<h3>Travail : sortir des 35 heures</h3>
<p>Les entreprises pourraient ${ext(`${P}/travail`, 'fixer librement leur temps de travail par accord d\'entreprise')}. Les heures au-delà de 35 h seraient exonérées de cotisations et d'impôt sur le revenu pour le salarié, et l'employeur ne paierait plus de cotisation patronale au-delà de la 37e heure. Le programme chiffre le gain à environ 1 000 € par an pour un salarié au SMIC qui travaille deux heures de plus par semaine.</p>
<p>Côté protection sociale, l'indemnisation chômage serait limitée à 12 mois pour les moins de 50 ans (18 mois aujourd'hui), et trois jours de carence s'appliqueraient aux arrêts maladie dans le privé comme dans le public. Un délai de 3 à 6 mois séparerait un arrêt maladie d'une rupture conventionnelle.</p>

<h3>Dette et dépenses : une règle d'or par référendum</h3>
<p>Le candidat propose d'${ext(`${P}/comptes-publics`, 'inscrire dans la Constitution, par référendum, une règle qui interdirait aux parlementaires de creuser le déficit au-delà de 3 %')}, avec un objectif de 2 % du PIB en fin de quinquennat. Il répartit l'effort ainsi : moitié sur les dépenses sociales (retraites, chômage, arrêts maladie, durée du RSA), un quart sur l'État et les collectivités, un quart attendu de la croissance. Un fonctionnaire sur trois partant à la retraite ne serait pas remplacé, et il promet de ne créer aucun nouvel impôt pendant cinq ans.</p>

<h3>Entreprises : 50 milliards d'impôts de production en moins</h3>
<p>Le programme prévoit ${ext(`${P}/entreprises`, '50 milliards d\'euros d\'impôts de production en moins, financés par 50 milliards d\'aides publiques en moins')}, un moratoire sur les nouvelles normes et la fin de la surtransposition des règles européennes. Il défend le pacte Dutreil, veut doubler les plafonds de donation aux enfants et petits-enfants pendant trois ans, et créer un « livret capital France » pour orienter l'épargne vers les entreprises. Face à la Chine, il propose un prix du carbone aux frontières européennes et, dans les secteurs stratégiques, des transferts de technologie et des coentreprises imposés.</p>

<h2>Sécurité, justice, immigration : un net durcissement</h2>

<h3>Sécurité et justice</h3>
<p>Le chapitre sécurité crée un ${ext(`${P}/securite`, '« état d\'urgence narco »')} : dans les zones les plus touchées et pour une durée limitée, les forces de l'ordre pourraient interpeller la nuit, assigner à résidence, prolonger les gardes à vue et utiliser la reconnaissance faciale de façon ciblée. Les consommateurs de drogue paieraient des amendes plus fortes, prélevées au besoin sur les prestations sociales, comme toutes les amendes impayées. Les maires recevraient un pouvoir de sanction contre les incivilités. Il refuse en revanche d'envoyer l'armée dans les quartiers.</p>
<p>En justice, il veut ${ext(`${P}/justice`, 'rétablir les peines planchers, prononcer des peines de prison courtes dès la première infraction et supprimer le juge d\'application des peines')}, pour qu'une peine prononcée soit une peine exécutée. Le garde des Sceaux pourrait adresser des instructions individuelles aux procureurs, et l'excuse de minorité serait levée pour les faits liés au trafic de drogue.</p>

<h3>Immigration</h3>
<p>L'objectif affiché est de ${ext(`${P}/immigration`, 'diviser l\'immigration par deux')}. Les leviers sont un moratoire sur le regroupement familial pendant tout le quinquennat, des quotas pour l'immigration de travail, la dénonciation de l'accord franco-algérien de 1968, le retour de la double peine et l'expulsion des étrangers condamnés pour un délit. Il exclut toute régularisation massive et propose un « verrou Schengen » pour qu'aucun État européen n'en engage seul. Les aides sociales versées aux étrangers seraient alignées sur la moyenne européenne.</p>
<p>Le droit du sol n'est pas remis en cause en métropole. À ${ext(`${P}/outre-mer`, 'Mayotte')}, il serait suspendu pendant plusieurs années, avec un moratoire total sur l'immigration et la suspension des nouvelles demandes d'asile (aussi en Guyane).</p>

<h3>Défense</h3>
<p>Le chapitre défense prévoit ${ext(`${P}/defense`, 'une loi de « massification » des armées')} : 250 000 réservistes au lieu de 45 000, 50 000 places par an de service militaire volontaire au lieu de 3 000, un plan munitions et des drones en masse. Le soutien à l'Ukraine reste « plein », et les pays européens de l'OTAN devraient consacrer au moins 1 % de leur PIB à des équipements fabriqués en Europe.</p>

<h2>École, famille, enfance</h2>
<p>Pour l'école, il propose ${ext(`${P}/ecole`, 'une hausse de 20 % en moyenne du salaire des enseignants')} sur le quinquennat, des effectifs réduits en maternelle et en primaire, et une large autonomie des établissements : le chef d'établissement pourrait imposer l'uniforme, adapter les horaires ou participer au recrutement. Le portable serait strictement interdit de la primaire au lycée.</p>
<p>Le volet famille remplace les aides actuelles par ${ext(`${P}/famille`, 'une allocation familiale unique de 350 € par mois dès le premier enfant')}, dégressive avec le revenu. Les classes moyennes ne paieraient pas d'impôt sur le revenu pendant les trois premières années de l'enfant, et chaque naissance ouvrirait droit à un prêt à taux zéro. En ${ext(`${P}/protection-de-l-enfance`, 'protection de l\'enfance')}, les crimes sur mineurs deviendraient imprescriptibles et un « droit de savoir » permettrait aux parents de faire vérifier les antécédents d'un adulte proche de leur enfant.</p>

<h2>Énergie, climat, intelligence artificielle</h2>
<p>Il veut lancer ${ext(`${P}/energie`, '8 réacteurs EPR en plus des 6 déjà prévus')}, développer les renouvelables « là où elles sont efficaces » et électrifier les usages. Il refuse ce qu'il appelle l'écologie punitive et propose la même aide pour une voiture électrique d'occasion que pour une neuve. Pour l'${ext(`${P}/adaptation-climatique`, 'adaptation au climat')}, il prévoit un fonds de 2 milliards d'euros par an, la climatisation des lieux qui accueillent des personnes fragiles et l'accélération du stockage de l'eau agricole, réserves comprises.</p>
<p>Sur l'${ext(`${P}/intelligence-artificielle`, 'intelligence artificielle')}, il veut faire de la France le leader européen de la puissance de calcul, simplifier les règles européennes sur l'IA (sans renoncer à la protection des enfants), créer des « zones d'accélération IA » et former 100 000 ingénieurs par an au lieu de 40 000.</p>

<h2>Où se situe Édouard Philippe parmi les ${candidatesCount} candidats ?</h2>
<p>La retraite à 65 ans n'est défendue que par une poignée de candidats, parmi lesquels <a href="/candidat/david-lisnard">David Lisnard</a>, <a href="/candidat/bruno-retailleau">Bruno Retailleau</a> et <a href="/candidat/eric-zemmour">Éric Zemmour</a>. La réduction de la durée d'indemnisation du chômage le rapproche de <a href="/candidat/gabriel-attal">Gabriel Attal</a>, <a href="/candidat/gerald-darmanin">Gérald Darmanin</a> et <a href="/candidat/xavier-bertrand">Xavier Bertrand</a>. Sur l'expulsion des étrangers condamnés et le cannabis, ses propositions rejoignent celles de David Lisnard ou de Gérald Darmanin. Il s'en sépare sur l'Europe, où il demande plus d'intégration (marché unique, préférence européenne dans l'armement et le numérique), et sur le droit du sol, qu'il ne veut modifier qu'à Mayotte.</p>
<p>Ses réponses dans le quiz restent une estimation faite à partir de ses déclarations publiques : Édouard Philippe n'a pas rempli le questionnaire lui-même. Sa fiche détaille chaque réponse : <a href="/candidat/edouard-philippe">Édouard Philippe sur le Quizz du Berger</a>. Pour son positionnement gauche-droite global, voir aussi <a href="/blog/edouard-philippe-droite-ou-gauche">Édouard Philippe, droite ou gauche ?</a></p>

<table>
<tr><th>Ce que ses partisans mettent en avant</th><th>Ce que ses opposants lui reprochent</th></tr>
<tr><td>Un programme chiffré, avec un objectif de déficit (2 %) et une répartition de l'effort annoncée.</td><td>La moitié de l'effort porte sur les dépenses sociales : retraites, chômage, arrêts maladie, RSA.</td></tr>
<tr><td>Des départs anticipés maintenus pour un tiers des Français, sans hausse des cotisations.</td><td>65 ans et 45 annuités, soit plus que la réforme de 2023 contestée dans la rue.</td></tr>
<tr><td>Des mesures de pouvoir d'achat ciblées sur les familles et les heures travaillées.</td><td>La fin des 35 heures obligatoires et des heures au-delà de 37 h sans cotisation patronale fragilisent le financement de la Sécurité sociale.</td></tr>
<tr><td>Une fermeté sur la sécurité et l'immigration qui répond à une demande forte de l'opinion.</td><td>Reconnaissance faciale, instructions individuelles aux procureurs, amendes prélevées sur les prestations sociales : des atteintes aux libertés et à l'indépendance de la justice.</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<p>Les questions du quiz qui recoupent les grandes mesures du programme :</p>
<ul>
<li><a href="/question-politique/age-depart-retraite-62-64-ans">Âge de départ à la retraite</a> et <a href="/question-politique/comment-financer-les-retraites">financement des retraites</a></li>
<li><a href="/question-politique/quel-devrait-etre-le-temps-de-travail-legal-en-france">Temps de travail légal</a>, <a href="/question-politique/assurance-chomage-indemnisation-france">assurance chômage</a> et <a href="/question-politique/jours-de-carence-arrets-maladie-france">jours de carence</a></li>
<li><a href="/question-politique/la-france-devrait-elle-viser-un-budget-a-l-equilibre">Budget à l'équilibre</a> et <a href="/question-politique/que-pensez-vous-de-la-fiscalite-des-entreprises">fiscalité des entreprises</a></li>
<li><a href="/question-politique/immigration-france-2027">Immigration</a>, <a href="/question-politique/expulsion-etrangers-condamnes-double-peine">expulsion des étrangers condamnés</a> et <a href="/question-politique/droit-du-sol-nationalite-france">droit du sol</a></li>
<li><a href="/question-politique/que-pensez-vous-de-la-justice-en-france">Justice</a>, <a href="/question-politique/legalisation-cannabis-france">cannabis</a> et <a href="/question-politique/que-pensez-vous-de-la-surveillance-numerique-cameras-reconnaissance-faciale-fichage">surveillance et reconnaissance faciale</a></li>
<li><a href="/question-politique/nucleaire-france-avenir">Nucléaire</a> et <a href="/question-politique/crise-eau-secheresse-france">gestion de l'eau</a></li>
</ul>
<p>Les thèmes complets : <a href="/theme/travail-chomage-retraite">Travail, chômage, retraite</a>, <a href="/theme/depenses-et-dette-publiques">Dépenses et dette publiques</a>, <a href="/theme/demographie-et-question-migratoire">Démographie et question migratoire</a>, <a href="/theme/police-justice-et-securite">Police, justice et sécurité</a>.</p>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Programme d'Édouard Philippe pour 2027 : retraite à 65 ans, fin des 35 heures, immigration divisée par deux`,
    description:
      `Le programme présidentiel 2027 d'Édouard Philippe (Horizons) thème par thème : retraites, travail, dette, sécurité, immigration, école, famille, énergie, IA.`,
    author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
    datePublished: '2026-11-13',
    about: [
      { '@type': 'Person', name: 'Édouard Philippe' },
      { '@type': 'Organization', name: 'Horizons' },
      { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
    ],
  },
};
