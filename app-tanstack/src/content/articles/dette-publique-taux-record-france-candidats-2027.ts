import type { Article } from '~/types/article';
import { candidatesCount, getAnswerDistribution } from '~/utils/seo';

const detteDistribution = getAnswerDistribution('question-2027-dep-04');

export const article: Article = {
  slug: 'dette-publique-taux-record-france-candidats-2027',
  title: `Dette publique : taux au plus haut depuis 2008, et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
  excerpt:
    "La France emprunte à 10 ans à un taux plus vu depuis 2008. Rembourser vite, continuer d'investir, ou annuler une partie de la dette ? Le détail du dossier et les positions de chaque candidat à 2027.",
  date: '2026-08-24',
  tag: 'Analyse',
  content: `
<p>Le taux auquel la France emprunte à 10 ans a atteint <strong>4,10 %</strong> le 18 août 2026, <a href="https://www.france-epargne.fr/news/oat-10-ans-au-dessus-de-4-la-france-aborde-la-revue-fitch-du-28-aout-sur-la-defensive" target="_blank" rel="noopener noreferrer">son plus haut niveau depuis novembre 2008</a>. Cinq jours plus tôt, Marine Le Pen dénonçait sur les réseaux sociaux « le bilan implacable de dix ans de macronisme » ; dimanche, Jean-Luc Mélenchon proposait à l'inverse que la Banque centrale européenne « gèle » une partie de la dette française. Entre les deux, le gouvernement prépare un budget 2027 qui devra trouver entre <strong>30 et 50 milliards d'euros</strong> d'économies.</p>

<h2>Le taux de la dette française : ce que disent les chiffres</h2>
<p>L'<strong>OAT à 10 ans</strong> (obligation assimilable du Trésor, le taux de référence auquel l'État français emprunte) a franchi la barre des 4 % le 23 juillet 2026 pour la première fois en plus de dix-sept ans, avant d'atteindre <a href="https://www.france-epargne.fr/news/oat-10-ans-au-dessus-de-4-la-france-aborde-la-revue-fitch-du-28-aout-sur-la-defensive" target="_blank" rel="noopener noreferrer">4,10 % le 18 août</a>, un niveau qui n'avait plus été vu depuis le pic de la crise financière de novembre 2008 (autour de 4,20 %). L'écart avec le taux allemand, le <strong>spread OAT-Bund</strong>, s'est lui aussi creusé : il est <a href="https://www.ideal-investisseur.fr/en/markets/oat-bund-spread.html" target="_blank" rel="noopener noreferrer">passé d'environ 76 points de base le 7 août à 83,6 points de base le 21 août 2026</a>.</p>
<p>Conséquence directe sur le budget : la charge d'intérêts de la dette est passée de <strong>58 milliards d'euros en 2024</strong> à <strong>67 milliards en 2025</strong>, puis à <strong>74 milliards prévus pour 2026</strong>, selon les chiffres cités par le président de la Cour des comptes Pierre Moscovici, qui <a href="https://www.publicsenat.fr/actualites/economie/en-2026-le-cout-des-interets-de-la-dette-pourrait-depasser-le-budget-de-leducation-nationale-avertit-pierre-moscovici" target="_blank" rel="noopener noreferrer">avertit que ce montant pourrait dépasser le budget de l'Éducation nationale</a>. En septembre 2025, l'agence Fitch avait déjà dégradé la note de la France de AA- à A+ ; l'agence doit rendre un nouvel avis le <strong>28 août 2026</strong>.</p>

<h2>Chronologie d'un été sous tension budgétaire</h2>
<ul>
<li><strong>2 février 2026</strong> : <a href="https://www.aljazeera.com/news/2026/2/2/france-adopts-2026-budget-after-two-no-confidence-votes-fail" target="_blank" rel="noopener noreferrer">le budget 2026 est adopté après quatre mois de débats, 927 scrutins publics et trois recours à l'article 49.3</a>.</li>
<li><strong>Début juillet 2026</strong> : dans <a href="https://www.publicsenat.fr/actualites/politique/budget-2027-la-lettre-pimentee-de-lecornu-a-ses-ministres-annonce-la-couleur-du-debat-budgetaire" target="_blank" rel="noopener noreferrer">une lettre à ses ministres</a>, le Premier ministre Sébastien Lecornu fixe l'objectif du budget 2027 : entre 30 et 50 milliards d'euros d'économies.</li>
<li><strong>13 août 2026</strong> : Le Monde révèle que <a href="https://actu.orange.fr/politique/budget-2027-sebastien-lecornu-s-oriente-vers-une-baisse-limitee-du-deficit-des-perspectives-pessimistes-pour-2029-magic-CNT000002rjUwe.html" target="_blank" rel="noopener noreferrer">Matignon vise un déficit ramené à environ 4,9 % du PIB en 2027, contre 5 % en 2026</a>, un rythme plus lent que la trajectoire censée passer sous les 3 % en 2029.</li>
<li><strong>18 août 2026</strong> : l'OAT à 10 ans atteint 4,10 %, un plus haut depuis 2008.</li>
<li><strong>19 août 2026</strong> : Marine Le Pen publie un message dénonçant les <a href="https://www.franceinfo.fr/politique/marine-le-pen/il-est-temps-de-nettoyer-les-ecuries-d-augias-un-message-de-marine-le-pen-sur-la-dette-francaise-met-en-colere-le-camp-presidentiel_8155859.html" target="_blank" rel="noopener noreferrer">« taux records » de la dette française</a> et promet de « nettoyer les écuries d'Augias » des comptes publics si elle est élue. L'ancien ministre de l'Économie <a href="https://www.lejdd.fr/politique/presidentielle-le-pen-fustige-le-bilan-de-macron-et-promet-dassainir-les-finances-publiques-181440" target="_blank" rel="noopener noreferrer">Bruno Le Maire lui répond que le Rassemblement national porte sa part de responsabilité, « par la menace permanente de censure de tous les partis d'opposition »</a>.</li>
<li><strong>20 août 2026</strong> : Sébastien Lecornu <a href="https://www.france24.com/fr/info-en-continu/20260820-budget-lecornu-d%C3%A9ment-certaines-pistes-d-%C3%A9conomies" target="_blank" rel="noopener noreferrer">dément certaines pistes d'économies</a> qui circulaient dans la presse.</li>
<li><strong>21 août 2026</strong> : le spread OAT-Bund atteint 83,6 points de base.</li>
<li><strong>23 août 2026</strong> : lors de son discours de clôture des universités d'été de La France insoumise à Châteauneuf-sur-Isère, Jean-Luc Mélenchon propose que <a href="https://atlantico.fr/article/decryptage/annulation-de-la-dette-detenue-par-les-banques-centrales-la-ou-jean-luc-melenchon-a-100-raison-la-ou-il-a-1000-fois-tort-BCE-Europe-France-economie-Don-Diego-de-la-Vega" target="_blank" rel="noopener noreferrer">« la Banque centrale européenne gèle les dettes des États, à commencer par celles de la période Covid »</a>. Le banquier Matthieu Pigasse le soutient, en rappelant qu'<a href="https://www.21news.be/700-milliards-a-effacer-pigasse-et-bardella-secharpent-sur-la-dette-francaise/" target="_blank" rel="noopener noreferrer">environ 700 milliards d'euros de dette française sont détenus par l'Eurosystème</a>. Jordan Bardella qualifie la proposition de « n'importe quoi » ; Pigasse lui répond « l'économie pour les nuls ». <a href="https://x.com/JLMelenchon/status/2059931626218426375" target="_blank" rel="noopener noreferrer">Mélenchon accuse à son tour Marine Le Pen d'être « aussi ignorante que Bardella sur les questions d'économie et de finances publiques »</a>.</li>
<li><strong>28 août 2026</strong> : nouvel avis attendu de l'agence Fitch sur la note de la France.</li>
<li><strong>30 septembre 2026</strong> : date prévue de présentation du budget 2027 à l'Assemblée nationale.</li>
</ul>

<h2>Pourquoi ce dossier divise</h2>

<h3>1. Rembourser vite, ou éviter la casse sociale ?</h3>
<p>Pour une partie de la droite et du centre, la hausse des taux impose un effort budgétaire rapide : chaque point de PIB de déficit supplémentaire se traduit directement en intérêts à payer, au détriment d'autres dépenses. Pour la gauche, un ajustement trop brutal — coupes dans les services publics, gel des prestations — ferait payer la facture aux ménages les plus modestes, alors que la dette a surtout financé le Covid, l'énergie et les baisses d'impôts des dix dernières années.</p>

<h3>2. Qui doit payer les économies ?</h3>
<p>La lettre de Sébastien Lecornu évoque des économies de 30 à 50 milliards d'euros sans encore préciser leur répartition entre baisse des dépenses et hausse des recettes. C'est là que la question <a href="/question-politique/impots-des-plus-riches">de la fiscalité des plus riches</a> rejoint celle de la dette : une partie des candidats veut financer l'effort par une taxation accrue du capital, une autre exclusivement par des économies de fonctionnement de l'État.</p>

<h3>3. Annuler la dette : solution ou fausse bonne idée ?</h3>
<p>La proposition de Jean-Luc Mélenchon relance un débat plus ancien sur les quelque 700 milliards d'euros de dette française détenus par la Banque centrale européenne et les banques centrales nationales de la zone euro. Ses partisans estiment que ces titres, déjà entre les mains de la puissance publique, pourraient être annulés ou gelés sans perte réelle pour l'économie. Ses opposants rétorquent qu'annuler cette dette ne créerait aucune richesse nouvelle et risquerait de saper la crédibilité de la France sur les marchés, au moment même où les agences de notation surveillent son signal.</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Sur le Quizz du Berger, la question <a href="/question-politique/dette-publique-france">« La dette publique française dépasse les 110 % du PIB, qu'en pensez-vous ? »</a> répartit les ${candidatesCount} candidats en quatre familles.</p>

<h3>Famille 1 — La dette est une catastrophe, il faut un plan de rigueur (${detteDistribution[0]} candidats)</h3>
<p>Ces candidats jugent l'endettement actuel intenable et défendent un effort de réduction rapide et prioritaire.</p>
<ul>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — Ligne budgétaire la plus stricte de la droite parlementaire, défend un plan de retour à l'équilibre.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> (Nouvelle Énergie) — Libéral assumé, prône une baisse marquée de la dépense publique.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> (MoDem) — A porté la question de la dette comme priorité de son passage à Matignon.</li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> (Renaissance) — Défend un discours de rigueur budgétaire au sein de la majorité présidentielle.</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — Insiste sur un désendettement rapide comme condition de la souveraineté nationale.</li>
</ul>

<h3>Famille 2 — C'est préoccupant, il faut réduire progressivement par des économies (${detteDistribution[1]} candidats)</h3>
<p>Une position moins radicale que la précédente : réduire le déficit, mais sans plan de choc. C'est la ligne qu'a défendue Marine Le Pen dans son message du 19 août, sans détailler de plan chiffré alternatif à celui du gouvernement.</p>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — A dénoncé les « taux records » de la dette française et le bilan macroniste, sans préciser publiquement un plan d'économies chiffré.</li>
<li><a href="/candidat/jordan-bardella">Jordan Bardella</a> (RN) — Aligné sur la ligne RN de réduction progressive, s'est opposé publiquement à l'annulation de la dette proposée par Jean-Luc Mélenchon.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> — Ligne LR classique de réduction des déficits par les économies plutôt que par la hausse d'impôts.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Défend un désendettement progressif couplé à une politique de réindustrialisation.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — Position centriste : réduction du déficit par étapes plutôt que par un choc unique.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Défend la trajectoire de réduction du déficit engagée par la majorité sortante.</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> — Ligne social-démocrate de sérieux budgétaire sans rupture brutale.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Réduction progressive de la dette adossée à une baisse des dépenses liées à l'immigration.</li>
<li><a href="/candidat/karim-bouamrane">Karim Bouamrane</a> (PS) — Ligne social-démocrate favorable à une trajectoire de réduction du déficit maîtrisée.</li>
</ul>

<h3>Famille 3 — La dette est un outil, ou un investissement pour l'avenir (${detteDistribution[2] + detteDistribution[3]} candidats)</h3>
<p>Cette famille regroupe deux nuances proches : certains jugent la dette gérable tant que les intérêts restent payables, d'autres assument de continuer à emprunter pour financer l'éducation, l'écologie ou la santé.</p>
<ul>
<li><a href="/candidat/francois-hollande">François Hollande</a> — Défend une gestion de la dette qui n'exclut pas l'investissement public.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Plaide pour une vision de long terme de la dette plutôt qu'une lecture purement comptable.</li>
<li><a href="/candidat/clara-egger">Clara Egger</a> (Solution démocratique) — Position pragmatique, tant que la soutenabilité des intérêts est garantie.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Lie la question de la dette à la sortie de l'euro, qui rendrait selon lui les marges de manœuvre plus larges.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Défend l'investissement dans la bifurcation écologique, dette ou non.</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — Ligne social-démocrate classique : investir plutôt que rembourser en priorité.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — Alignée sur la ligne LFI d'investissement public prioritaire.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — Défend l'endettement pour financer la transition écologique.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place Publique / PS) — Assume l'investissement public financé par la dette dans l'éducation et l'écologie.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — Défend l'investissement public contre une logique d'austérité.</li>
<li><a href="/candidat/segolene-royal">Ségolène Royal</a> (PS) — Ligne social-démocrate favorable à l'investissement plutôt qu'au remboursement accéléré.</li>
<li><a href="/candidat/philippe-brun">Philippe Brun</a> (PS) — Spécialiste des finances publiques à l'Assemblée, défend l'investissement plutôt que l'austérité.</li>
<li><a href="/candidat/antoine-mikolajczak">Antoine Mikolajczak</a> (Équinoxe) — Favorable à l'investissement financé par la dette dans les secteurs d'avenir.</li>
<li><a href="/candidat/lydie-massard">Lydie Massard</a> (UDB) — Défend l'investissement public plutôt que la rigueur budgétaire.</li>
</ul>

<h3>Famille 4 — La dette est une arnaque, il faut en annuler une partie (${detteDistribution[4]} candidats)</h3>
<p>C'est la position défendue par Jean-Luc Mélenchon le 23 août : une partie de la dette, notamment celle détenue par la Banque centrale européenne, devrait être gelée ou annulée plutôt que remboursée aux banques.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — A proposé que la BCE gèle les dettes des États, à commencer par celles de la période Covid.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — Dénonce une dette qui profite avant tout aux créanciers et aux banques.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — Aligné sur la ligne d'annulation partielle défendue par la gauche de la gauche.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Dénonce la dette comme un instrument de pression des marchés financiers.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Défend une remise en cause du remboursement au profit des banques.</li>
<li><a href="/candidat/francis-lalanne">Francis Lalanne</a> (France Libre) — Dénonce le système financier et la dette comme outil de domination.</li>
<li><a href="/candidat/florian-philippot">Florian Philippot</a> (Les Patriotes) — Défend une remise en cause de la dette liée à l'euro et aux marchés financiers.</li>
<li><a href="/candidat/anasse-kazib">Anasse Kazib</a> (Révolution permanente) — Réclame l'annulation de la dette au nom de la lutte contre la finance.</li>
<li><a href="/candidat/selma-labib">Selma Labib</a> (NPA-R) — Défend l'annulation de la dette détenue par les créanciers privés.</li>
</ul>

<h2>Arguments pour et contre un effort budgétaire immédiat</h2>
<table>
<tr><th>Arguments pour la rigueur maintenant</th><th>Arguments contre un ajustement brutal</th></tr>
<tr><td>La charge d'intérêts (74 milliards d'euros prévus en 2026) approche déjà le budget de l'Éducation nationale et continuera de grimper si les taux restent élevés.</td><td>Les précédents plans d'économies ont surtout pesé sur les collectivités et les ménages modestes, sans toucher les niches fiscales les plus coûteuses.</td></tr>
<tr><td>Un déficit persistant nourrit la défiance des marchés et des agences de notation, ce qui fait elle-même grimper les taux.</td><td>Une partie de la dette a financé des dépenses exceptionnelles (Covid, énergie) qui ne se reproduiront pas chaque année.</td></tr>
<tr><td>Réduire la dette maintenant laisse plus de marges de manœuvre budgétaires en cas de nouvelle crise.</td><td>Couper dans l'investissement public aujourd'hui (éducation, transition écologique) coûte plus cher à long terme qu'il ne rapporte à court terme.</td></tr>
<tr><td>La comparaison avec l'Allemagne (spread de 83,6 points de base) montre une perte de crédibilité relative de la signature française.</td><td>Une partie de la dette est détenue par les banques centrales elles-mêmes, ce qui ouvre des marges de restructuration inhabituelles.</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<ul>
<li><a href="/question-politique/dette-publique-france">La question sur la dette publique</a> et le détail des réponses des ${candidatesCount} candidats.</li>
<li><a href="/question-politique/impots-des-plus-riches">Impôts des plus riches</a> — le débat sur qui doit financer l'effort budgétaire.</li>
<li><a href="/theme/depenses-et-dette-publiques">Dépenses et dette publiques</a> — l'ensemble des questions du Quizz du Berger sur le sujet.</li>
<li><a href="/theme/politique-fiscale">Politique fiscale</a> — impôts, taxation du capital, financement de l'État.</li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Dette publique : taux au plus haut depuis 2008, et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
    description:
      `La France emprunte à 10 ans à un taux plus vu depuis 2008. Rembourser vite, continuer d'investir, ou annuler une partie de la dette : les positions détaillées des ${candidatesCount} candidats à l'élection présidentielle 2027.`,
    author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
    datePublished: '2026-08-24',
    about: [
      { '@type': 'Thing', name: 'Dette publique de la France' },
      { '@type': 'Thing', name: 'Budget 2027' },
      { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
    ],
  },
};
