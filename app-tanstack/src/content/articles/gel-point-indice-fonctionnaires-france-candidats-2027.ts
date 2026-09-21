import type { Article } from '~/types/article';
import { candidatesCount, getAnswerDistribution } from '~/utils/seo';

const salairesDistribution = getAnswerDistribution('question-2027-dep-08');

export const article: Article = {
  slug: 'gel-point-indice-fonctionnaires-france-candidats-2027',
  title: `Salaires des fonctionnaires : le gel du point d'indice et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
  excerpt:
    "Sébastien Lecornu a confirmé le gel du point d'indice dans le budget 2027. La CGT parle de « scandale » et appelle à une journée de mobilisation. Où se situe chaque candidat à 2027 ?",
  date: '2026-09-21',
  tag: 'Analyse',
  content: `
<p>Le 17 septembre 2026, Sébastien Lecornu a présenté les grandes lignes de son budget 2027 : un effort de <strong>54 milliards d'euros</strong> d'économies, <a href="https://echosplus.com/2026/09/17/budget-2027-lecornu-annonce-54-milliards-deuros-deffort-pour-viser-5-de-deficit/" target="_blank" rel="noopener noreferrer">le double de ce qui avait été annoncé initialement</a>. Parmi les mesures confirmées, <a href="https://www.toutsurmesfinances.com/actualites/a/point-d-indice-des-fonctionnaires-sebastien-lecornu-confirme-le-gel-en-2027" target="_blank" rel="noopener noreferrer">le gel du point d'indice des fonctionnaires</a>, qui doit rapporter <strong>2 milliards d'euros</strong>. Deux jours plus tard, la secrétaire générale de la CGT Sophie Binet dénonçait <a href="https://www.franceinfo.fr/economie/budget/sophie-binet-promet-une-journee-noire-le-29-septembre-apres-la-decision-du-gouvernement-de-geler-le-point-d-indice-des-fonctionnaires-dans-le-budget_8198573.html" target="_blank" rel="noopener noreferrer">un « scandale »</a> et appelait à une « journée noire » le 29 septembre.</p>

<h2>Le point d'indice, c'est quoi ?</h2>
<p>Le <strong>point d'indice</strong> est la valeur de référence qui sert à calculer le traitement de tous les fonctionnaires : chaque grade correspond à un nombre de points, multiplié par la valeur du point pour obtenir le salaire brut. Une <a href="https://fr.wikipedia.org/wiki/Point_d%27indice_salarial_en_France" target="_blank" rel="noopener noreferrer">revalorisation du point</a> augmente donc, d'un coup, le salaire de l'ensemble des 5,7 millions d'agents publics (État, hôpitaux, collectivités). Le geler ne baisse pas les salaires, mais les fige : sans revalorisation, chaque année d'inflation réduit le pouvoir d'achat réel des agents, sauf mesures ciblées (primes, avancement de grade, points supplémentaires pour les plus bas salaires).</p>

<p>Chronologie récente :</p>
<ul>
<li><strong>1er juillet 2022</strong> : <a href="https://www.transformation.gouv.fr/ministre/actualite/augmentation-generalisee-du-point-dindice-des-agents-publics" target="_blank" rel="noopener noreferrer">hausse de 3,5 %</a>, la plus forte depuis 1985.</li>
<li><strong>1er juillet 2023</strong> : <a href="https://www.senat.fr/rap/a22-121-5/a22-121-51.html" target="_blank" rel="noopener noreferrer">hausse de 1,5 %</a>, dernière revalorisation générale en date.</li>
<li><strong>1er janvier 2024</strong> : attribution de 5 points d'indice majoré supplémentaires à tous les agents, sans nouvelle revalorisation générale depuis.</li>
<li><strong>17 septembre 2026</strong> : Sébastien Lecornu confirme le gel pour 2027 dans le cadre de l'effort de 54 milliards, en ouvrant des négociations pour protéger les agents les moins bien rémunérés de l'inflation.</li>
<li><strong>19 septembre 2026</strong> : Sophie Binet (CGT) qualifie la mesure de <a href="https://www.europe1.fr/societe/remuneration-des-fonctionnaires-sophie-binet-denonce-un-scandale-et-promet-une-journee-noire-le-29-septembre-1084898" target="_blank" rel="noopener noreferrer">« scandale »</a> et confirme la mobilisation intersyndicale (CGT, FO, CFDT, UNSA, FSU, Solidaires, CFE-CGC, FA-FP) du 29 septembre.</li>
</ul>

<h2>Pourquoi la mesure divise</h2>

<h3>1. Un effort budgétaire sans précédent</h3>
<p>Sans économies nouvelles, le déficit public de 2027 <a href="https://www.boursorama.com/actualite-economique/actualites/budget-2027-le-gouvernement-vise-5-de-deficit-un-objectif-ambitieux-mais-realisable-selon-roland-lescure-e4ccf3d8b857998467da5e29caa56576" target="_blank" rel="noopener noreferrer">avoisinerait 6,5 % du PIB</a>. Avec les 54 milliards d'économies, l'objectif du gouvernement est de le ramener à 4,8 % hors nouvelle hausse du budget des armées, ou 5 % en l'intégrant. Le point d'indice n'est qu'une ligne parmi d'autres (retraites, jour de carence pour les étrangers, dépenses de fonctionnement), mais c'est la plus visible pour 5,7 millions d'agents.</p>

<h3>2. Une perte de pouvoir d'achat qui s'accumule</h3>
<p>Pour la CGT, le compte est déjà négatif : selon Sophie Binet, <a href="https://www.franceinfo.fr/economie/budget/sophie-binet-promet-une-journee-noire-le-29-septembre-apres-la-decision-du-gouvernement-de-geler-le-point-d-indice-des-fonctionnaires-dans-le-budget_8198573.html" target="_blank" rel="noopener noreferrer">les fonctionnaires ont perdu plus de 16 % de pouvoir d'achat depuis 2017</a> à cause des gels successifs du point d'indice, un chiffre syndical que l'exécutif ne reprend pas à son compte. Le gouvernement met en avant les mesures ponctuelles (hausses de 2022 et 2023, points supplémentaires de 2024) et des négociations à venir pour cibler les bas salaires.</p>

<h3>3. Attractivité de la fonction publique</h3>
<p>Au-delà du seul pouvoir d'achat, une partie de la gauche et des syndicats de la fonction publique pointe des difficultés de recrutement dans l'enseignement, l'hôpital et les services déconcentrés, et réclame une revalorisation qui dépasse la simple indexation sur l'inflation.</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Sur la <a href="/question-politique/salaires-fonctionnaires-point-indice-france">question posée dans le Quizz du Berger</a>, les ${candidatesCount} candidats se répartissent en quatre familles.</p>

<h3>Famille 1 — Geler les salaires pour maîtriser la dépense publique (${salairesDistribution[1]} candidats)</h3>
<p>Cette famille rejoint la ligne du gouvernement : dans un contexte de déficit et de dette élevés, le gel du point d'indice est un effort jugé nécessaire, éventuellement complété par des suppressions de postes.</p>
<ul>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Va plus loin que le gouvernement : son programme prévoit <a href="https://www.letribunaldunet.fr/politique/gabriel-attal-mesures-choc-deficit-zero-2037.html" target="_blank" rel="noopener noreferrer">100 000 suppressions de postes de fonctionnaires</a> pour viser le déficit zéro en 2037.</li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> (Renaissance) — Pragmatique sur les comptes publics, soutient l'effort de maîtrise de la masse salariale de l'État.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — Priorité constante au redressement des comptes publics depuis Matignon, cohérent avec le gel.</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — Veut <a href="https://renseignementeconomique.fr/budget-2027-bruno-retailleau-reclame-le-retour-de-la-reforme-des-retraites-dans-le-texte" target="_blank" rel="noopener noreferrer">120 milliards d'économies par la seule baisse de la dépense</a>, sans hausse d'impôts : le gel du point d'indice s'inscrit dans cette ligne.</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — Défend une réduction structurelle de la dépense publique, y compris la masse salariale de l'État.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> (LR) — Ligne de rigueur budgétaire assumée, favorable à la maîtrise des rémunérations publiques.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> (Nouvelle Énergie) — Libéral assumé, porte de longue date une critique du poids de la masse salariale publique.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Combine baisse des dépenses publiques et refus de toute hausse d'impôts, cohérent avec le gel.</li>
</ul>

<h3>Famille 2 — Suivre l'inflation, sans plus (${salairesDistribution[2]} candidats)</h3>
<p>Ces candidats défendent une indexation automatique sur l'inflation : ni gel, ni rattrapage, un statu quo qui préserve le pouvoir d'achat sans peser davantage sur le budget.</p>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — Défend le pouvoir d'achat des agents publics tout en récusant une explosion de la dépense.</li>
<li><a href="/candidat/jordan-bardella">Jordan Bardella</a> (RN) — Même ligne que Marine Le Pen sur ce point.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Souverainiste attaché au service public, favorable à une indexation qui suit l'inflation.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> (MoDem) — Ligne centriste : ni gel prolongé, ni rattrapage massif.</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> (La Convention) — Défend une indexation raisonnable, dans le cadre d'une trajectoire de comptes publics maîtrisée.</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> (PS) — Position d'équilibre entre soutien au service public et sérieux budgétaire.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Défend un État fort et ses agents, sans rupture budgétaire.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Favorable à une revalorisation alignée sur le coût de la vie.</li>
<li><a href="/candidat/clara-egger">Clara Egger</a> (Solution démocratique) — Défend une indexation qui protège le pouvoir d'achat des agents.</li>
<li><a href="/candidat/benoit-mathieu">Benoît Mathieu</a> — Favorable à un ajustement sur l'inflation.</li>
</ul>

<h3>Famille 3 — Rattraper le pouvoir d'achat perdu (${salairesDistribution[3]} candidats)</h3>
<p>Cette famille, la plus nombreuse, estime que les gels successifs depuis 2017 justifient une revalorisation supérieure à la seule inflation, pour compenser les pertes accumulées.</p>
<ul>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Défend les agents publics comme pilier de la souveraineté de l'État.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Réclame un rattrapage pour les métiers du service public écologique et social.</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — Ligne socialiste classique de défense du pouvoir d'achat des agents.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — Défend un rattrapage, notamment pour les métiers en tension écologique et sociale.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place Publique) — Dénonce l'érosion du pouvoir d'achat des agents publics depuis plusieurs années.</li>
<li><a href="/candidat/francis-lalanne">Francis Lalanne</a> (France Libre) — Défend une revalorisation des agents publics.</li>
<li><a href="/candidat/florian-philippot">Florian Philippot</a> (Les Patriotes) — Souverainiste, favorable à un rattrapage du pouvoir d'achat des fonctionnaires.</li>
<li><a href="/candidat/karim-bouamrane">Karim Bouamrane</a> (PS) — Défend un rattrapage salarial pour la fonction publique.</li>
<li><a href="/candidat/segolene-royal">Ségolène Royal</a> (PS) — Ligne de gauche classique sur la défense du pouvoir d'achat des agents.</li>
<li><a href="/candidat/philippe-brun">Philippe Brun</a> (PS) — Défend un rattrapage au-delà de l'inflation.</li>
<li><a href="/candidat/antoine-mikolajczak">Antoine Mikolajczak</a> (Équinoxe) — Favorable à une revalorisation au-delà de l'inflation.</li>
<li><a href="/candidat/lydie-massard">Lydie Massard</a> (UDB) — Défend un rattrapage du pouvoir d'achat des agents publics.</li>
<li><a href="/candidat/olivier-faure">Olivier Faure</a> (PS) — Réclame une revalorisation qui compense les pertes accumulées depuis 2017.</li>
<li><a href="/candidat/emmanuel-maurel">Emmanuel Maurel</a> (GRS) — Ligne de gauche favorable à un rattrapage substantiel.</li>
<li><a href="/candidat/fabien-verdier">Fabien Verdier</a> — Défend un rattrapage du pouvoir d'achat des agents.</li>
<li><a href="/candidat/parti-animaliste">Parti animaliste</a> (PA) — Favorable à une revalorisation au-delà de l'inflation.</li>
<li><a href="/candidat/parti-pirate">Parti pirate</a> (PP) — Défend un rattrapage du pouvoir d'achat des agents publics.</li>
<li><a href="/candidat/sylvain-durif">Sylvain Durif</a> — Favorable à un rattrapage au-delà de l'inflation.</li>
</ul>

<h3>Famille 4 — Une revalorisation massive, la fonction publique n'attire plus (${salairesDistribution[4]} candidats)</h3>
<p>Cette famille va plus loin qu'un simple rattrapage : elle défend une hausse significative des salaires, jugés trop bas pour attirer et retenir les agents dans l'enseignement, la santé ou les services publics de proximité.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — Défend une revalorisation massive des salaires de la fonction publique, pilier de son programme social.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — Porte la question des salaires des « premiers de corvée », enseignants et soignants en tête.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — Alignée sur la ligne LFI de revalorisation forte du service public.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — Défend une hausse significative des salaires des agents publics.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — Défend les travailleurs du public comme du privé face à l'érosion des salaires.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Dénonce l'austérité imposée aux agents publics, plaide pour une revalorisation forte.</li>
<li><a href="/candidat/anasse-kazib">Anasse Kazib</a> (Révolution permanente) — Défend une hausse générale des salaires, public compris.</li>
<li><a href="/candidat/selma-labib">Selma Labib</a> (NPA-R) — Ligne anticapitaliste de défense des salaires des agents publics.</li>
</ul>

<h2>Arguments pour et arguments contre le gel</h2>

<table>
<tr><th>Arguments pour le gel</th><th>Arguments contre le gel</th></tr>
<tr><td>Économie immédiate de 2 milliards d'euros sur un effort total de 54 milliards.</td><td>Perte de pouvoir d'achat qui s'accumule d'année en année pour 5,7 millions d'agents.</td></tr>
<tr><td>La masse salariale de l'État est l'une des rares dépenses que l'exécutif contrôle directement d'une année sur l'autre.</td><td>Selon la CGT, plus de 16 % de pouvoir d'achat déjà perdu depuis 2017 par les gels successifs.</td></tr>
<tr><td>Négociations annoncées pour protéger les agents les moins bien payés de l'inflation.</td><td>Risque accru de difficultés de recrutement dans l'enseignement et l'hôpital.</td></tr>
<tr><td>Effort jugé nécessaire face à un déficit qui atteindrait 6,5 % du PIB sans économies nouvelles.</td><td>Un effort perçu comme inégalement réparti par rapport à d'autres pistes (fiscalité du capital, dépenses fiscales).</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<p>Le gel du point d'indice n'est qu'une pièce du budget 2027, qui touche aussi les retraites et les arrêts maladie. Sur le Quizz du Berger :</p>
<ul>
<li><a href="/theme/depenses-et-dette-publiques">Dépenses et dette publiques</a> — le thème complet, dette, budget à l'équilibre, dépenses de l'État.</li>
<li><a href="/question-politique/salaires-fonctionnaires-point-indice-france">Salaires des fonctionnaires</a> — la question complète du quiz et toutes les réponses des candidats.</li>
<li><a href="/question-politique/dette-publique-france">Dette publique</a> — l'autre grand chantier du budget 2027.</li>
<li><a href="/question-politique/desindexation-pensions-retraite-inflation">Désindexation des retraites</a> — la même logique de gel appliquée aux pensions.</li>
<li><a href="/question-politique/jours-de-carence-arrets-maladie-france">Jours de carence</a> — une autre piste d'économies du même budget.</li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Salaires des fonctionnaires : le gel du point d'indice et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
    description:
      `Gel du point d'indice, budget 2027, réaction de la CGT : le dossier et les positions détaillées des ${candidatesCount} candidats à l'élection présidentielle 2027 sur les salaires de la fonction publique.`,
    author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
    datePublished: '2026-09-21',
    about: [
      { '@type': 'Thing', name: "Point d'indice" },
      { '@type': 'Thing', name: 'Budget 2027' },
      { '@type': 'Thing', name: 'Fonction publique' },
      { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
    ],
  },
};
