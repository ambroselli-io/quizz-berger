import type { Article } from '~/types/article';
import { candidatesCount, getAnswerDistribution } from '~/utils/seo';

const fiscaliteEntreprisesDistribution = getAnswerDistribution('question-2027-fisc-08');

export const article: Article = {
  slug: 'debat-medef-27-aout-2026-france-candidats-2027',
  title: `Débat de la présidentielle face au Medef : tout comprendre et les positions des ${candidatesCount} candidats à 2027`,
  excerpt:
    "Sept candidats, trois heures, un court de tennis transformé en plateau de débat : le 27 août 2026, le Medef a organisé le premier grand oral économique de la campagne 2027. Le résumé des échanges et les positions des 37 candidats sur la fiscalité des entreprises.",
  date: '2026-08-31',
  tag: 'Analyse',
  content: `
<p>Le court Philippe-Chatrier de Roland-Garros a accueilli, jeudi 27 août 2026, le premier grand oral économique de la campagne présidentielle. Sept candidats ont débattu pendant trois heures devant les patrons réunis pour la REF, l'université d'été du <a href="https://www.usinenouvelle.com/eco-social/economie/medef/des-patrons-inquiets-et-des-candidats-attendus-au-tournant-avec-son-evenement-estival-annuel-la-ref-le-medef-veut-peser-sur-la-presdentielle-2027.SL5GZ7EIUNEEFA6FZUNLE7MCFE.html" target="_blank" rel="noopener noreferrer">Medef, qui a consulté 66 000 chefs d'entreprise en amont</a> pour bâtir les questions posées aux candidats. Jean-Luc Mélenchon y a défendu l'annulation d'une partie de la dette publique ; Édouard Philippe lui a reproché de <a href="https://www.euronews.com/my-europe/2026/08/27/can-french-debt-really-be-cancelled-melenchons-proposal-sparks-debate" target="_blank" rel="noopener noreferrer">vouloir mener la France à la faillite en « brûlant » la dette</a>. Entre les deux, Marine Le Pen, Bruno Retailleau, Gabriel Attal, Raphaël Glucksmann et Marine Tondelier ont chacun développé leur programme économique.</p>

<h2>Le débat du Medef, en pratique</h2>
<p>La REF (Rencontre des Entrepreneurs de France, ex-université d'été du Medef) s'est tenue les 26 et 27 août 2026 à Roland-Garros, avec <a href="https://www.usinenouvelle.com/eco-social/economie/medef/des-patrons-inquiets-et-des-candidats-attendus-au-tournant-avec-son-evenement-estival-annuel-la-ref-le-medef-veut-peser-sur-la-presdentielle-2027.SL5GZ7EIUNEEFA6FZUNLE7MCFE.html" target="_blank" rel="noopener noreferrer">plus de 13 000 participants, un chiffre d'inscriptions qui a doublé par rapport à l'édition précédente</a>. Le débat du jeudi, sur le court Philippe-Chatrier, a réuni <a href="https://www.franceinfo.fr/elections/presidentielle/direct-attal-le-pen-melenchon-philippe-suivez-le-premier-debat-de-la-presidentielle-organise-par-le-medef-entre-sept-candidats-declares_8162033.html" target="_blank" rel="noopener noreferrer">sept candidats déclarés pendant trois heures</a> : Marine Le Pen (RN), Jean-Luc Mélenchon (LFI), Édouard Philippe (Horizons), Gabriel Attal (Renaissance), Bruno Retailleau (LR), Raphaël Glucksmann (Place publique) et Marine Tondelier (Les Écologistes). Cinq chefs d'entreprise ont posé les questions, construites autour des cinq priorités remontées par les adhérents du Medef : la dette et les dépenses publiques, les retraites, la réindustrialisation, le coût du travail et la simplification, la fiscalité. Un sondage commandé par le Medef avant le débat indiquait que <a href="https://www.franceinfo.fr/elections/presidentielle/presidentielle-2027-plus-de-80-des-chefs-d-entreprise-plaident-pour-reduire-la-fiscalite-et-reindustrialiser-la-france-selon-un-sondage-commande-par-le-medef_8160602.html" target="_blank" rel="noopener noreferrer">plus de 80 % des chefs d'entreprise interrogés plaident pour réduire la fiscalité et réindustrialiser la France</a>.</p>
<p>France Info a présenté l'échéance comme <a href="https://www.franceinfo.fr/elections/presidentielle/c-est-le-lancement-de-la-campagne-pourquoi-le-debat-organise-par-le-medef-avec-sept-candidats-a-la-presidentielle-s-annonce-strategique-pour-chaque-camp_8162018.html" target="_blank" rel="noopener noreferrer">le vrai coup d'envoi de la campagne présidentielle</a>, chaque camp y voyant l'occasion de fixer sa ligne économique avant les mois de meetings. L'ambiance est restée <a href="https://www.franceinfo.fr/elections/presidentielle/de-bruno-retailleau-a-jean-luc-melenchon-un-premier-debat-et-de-premieres-passes-d-armes-entre-sept-candidats-a-la-presidentielle-face-au-medef_8165666.html" target="_blank" rel="noopener noreferrer">cordiale mais tendue, avec plusieurs passes d'armes directes entre candidats</a>, en particulier autour de la dette et des retraites.</p>

<p>Chronologie des jours qui ont précédé et suivi le débat :</p>
<ul>
<li><strong>13 août 2026</strong> : Le Monde révèle que Matignon vise un déficit ramené à environ 4,9 % du PIB en 2027, ouvrant l'été budgétaire dans lequel s'inscrit le débat du Medef.</li>
<li><strong>23 août 2026</strong> : lors de la clôture des universités d'été de La France insoumise, Jean-Luc Mélenchon propose l'annulation d'une partie de la dette détenue par la Banque centrale européenne, un thème qu'il reprendra quatre jours plus tard face au Medef.</li>
<li><strong>26 août 2026</strong> : ouverture de la REF à Roland-Garros.</li>
<li><strong>27 août 2026, en fin d'après-midi</strong> : sur le court Philippe-Chatrier, les sept candidats débattent trois heures devant les chefs d'entreprise, avec le clash Mélenchon-Philippe sur la dette comme moment le plus commenté.</li>
<li><strong>28 août 2026</strong> : la presse dresse le bilan du débat, dont <a href="https://www.usinenouvelle.com/eco-social/au-medef-une-envie-dindustrie-chez-tous-les-candidats-a-la-presidentielle-mais-pas-toujours-les-memes-recettes.R3M44R772RHUTG2TBAYFJZV3RE.html" target="_blank" rel="noopener noreferrer">le décryptage de L'Usine Nouvelle sur les divergences en matière de réindustrialisation</a>.</li>
</ul>

<h2>Les cinq lignes de fracture du débat</h2>

<h3>1. La dette : rembourser vite, ou en annuler une partie ?</h3>
<p>C'est l'échange le plus vif de la soirée. Jean-Luc Mélenchon a défendu l'annulation d'environ <a href="https://www.euronews.com/my-europe/2026/08/27/can-french-debt-really-be-cancelled-melenchons-proposal-sparks-debate" target="_blank" rel="noopener noreferrer">18 % de la dette française, celle détenue par la Banque de France pour le compte de la BCE</a>, une opération qu'il présente comme une simple écriture comptable sans conséquence pour les épargnants. Édouard Philippe lui a répondu que cette stratégie reviendrait à mener la France à la faillite. Marine Le Pen a, de son côté, annoncé qu'elle présenterait <a href="https://www.epochtimes.fr/marine-le-pen-promet-125-milliards-deuros-deconomies-et-defend-une-retraite-a-60-ou-62-ans-3335415.html" target="_blank" rel="noopener noreferrer">une trajectoire de redressement des finances publiques reposant sur 125 milliards d'euros d'économies</a>, juste avant l'ouverture du débat budgétaire. Le sujet fait déjà l'objet d'un <a href="/blog/dette-publique-taux-record-france-candidats-2027">article complet du Quizz du Berger sur les taux d'intérêt records de la dette française</a> et d'une <a href="/question-politique/dette-publique-france">page dédiée aux positions des ${candidatesCount} candidats</a>.</p>

<h3>2. Les retraites : repousser encore l'âge légal ?</h3>
<p>Bruno Retailleau a assumé vouloir indexer l'âge de départ sur l'espérance de vie, déclarant : « <a href="https://www.franceinfo.fr/elections/presidentielle/retraites-contrairement-a-beaucoup-d-autres-j-assumerai-le-fait-de-repousser-l-age-legal-lance-bruno-retailleau-candidat-lr-a-l-election-presidentielle_8166161.html" target="_blank" rel="noopener noreferrer">contrairement à beaucoup d'autres, j'assumerai le fait de repousser l'âge légal</a> ». À l'inverse, Marine Le Pen a défendu un retour à <a href="https://www.epochtimes.fr/marine-le-pen-promet-125-milliards-deuros-deconomies-et-defend-une-retraite-a-60-ou-62-ans-3335415.html" target="_blank" rel="noopener noreferrer">60 ans pour ceux qui ont commencé à travailler avant 20 ans, et 62 ans pour les autres</a>. Ce clivage recoupe une question déjà posée à tous les candidats sur le Quizz du Berger, détaillée dans <a href="/blog/age-depart-retraite-france-candidats-2027">l'article sur l'âge de départ à la retraite</a> et sur <a href="/question-politique/age-depart-retraite-62-64-ans">sa page dédiée</a>.</p>

<h3>3. Réindustrialisation : par les normes, ou par la planification ?</h3>
<p>Tous les candidats présents se disent favorables à la réindustrialisation, mais leurs recettes divergent nettement, comme l'a détaillé <a href="https://www.usinenouvelle.com/eco-social/au-medef-une-envie-dindustrie-chez-tous-les-candidats-a-la-presidentielle-mais-pas-toujours-les-memes-recettes.R3M44R772RHUTG2TBAYFJZV3RE.html" target="_blank" rel="noopener noreferrer">L'Usine Nouvelle au lendemain du débat</a>. Marine Le Pen promet de classer chaque implantation industrielle en « projet d'intérêt national majeur » et de réduire fortement les normes qui s'y appliquent. Édouard Philippe met en avant la compétitivité, la stabilité de l'environnement fiscal et la formation. Jean-Luc Mélenchon parle de planification économique et cite les filières textile, bois et maritime. Raphaël Glucksmann relie la réindustrialisation à la rivalité économique avec la Chine et à la capacité d'action de l'Union européenne. Gabriel Attal a ouvert le débat par un mea culpa, reconnaissant qu'« il y a eu des échecs et des erreurs économiques » durant les deux quinquennats d'Emmanuel Macron. Sur le volet normes et bureaucratie, le Quizz du Berger a une <a href="/question-politique/que-pensez-vous-de-la-bureaucratie-et-de-l-administration-francaise">question dédiée</a>, et sur la réindustrialisation, une <a href="/question-politique/reindustrialisation-france">page à part entière</a>.</p>

<h3>4. Coût du travail et fiscalité des entreprises : qui doit payer l'effort ?</h3>
<p>C'est le thème qui a le plus directement opposé les sept candidats sur le terrain propre au Medef, celui du coût du travail. Bruno Retailleau a promis de mettre fin à ce qu'il présente comme un système qui sur-taxe le travail, et évoqué une réduction d'environ <a href="https://www.franceinfo.fr/elections/presidentielle/de-bruno-retailleau-a-jean-luc-melenchon-un-premier-debat-et-de-premieres-passes-d-armes-entre-sept-candidats-a-la-presidentielle-face-au-medef_8165666.html" target="_blank" rel="noopener noreferrer">250 000 à 300 000 postes de fonctionnaires</a>. Marine Le Pen a chiffré ses économies sur les entreprises à 87 milliards d'euros de suppression de taxes de production, tout en refusant toute hausse générale des salaires. Raphaël Glucksmann a défendu la position inverse, demandant : « <a href="https://fr.tradingview.com/news/afp:99040789ca9a3:0/" target="_blank" rel="noopener noreferrer">on baisse la CSG sur les salaires pour les salariés et on trouve l'argent où ?</a> », en proposant de financer cette baisse par une taxation accrue des très gros héritages, sans <a href="https://fr.tradingview.com/news/afp:99040789ca9a3:0/" target="_blank" rel="noopener noreferrer">« casser le modèle social »</a>. Marine Tondelier a promis un Smic porté à 2 000 euros bruts, assorti d'un plan d'aide massif aux PME. Jean-Luc Mélenchon a averti que la France irait vers la récession si les salaires n'augmentent pas, une responsabilité qu'il attribue directement au patronat.</p>

<h2>Les positions des ${candidatesCount} candidats sur la fiscalité des entreprises</h2>
<p>Sur le Quizz du Berger, la question <a href="/question-politique/que-pensez-vous-de-la-fiscalite-des-entreprises">« Que pensez-vous de la fiscalité des entreprises ? »</a> mesure précisément cet axe, du renforcement de l'impôt sur les grandes entreprises jusqu'à une baisse massive pour toutes les entreprises. Les sept candidats du débat Medef s'y répartissent sur presque tout le spectre des réponses, dans la continuité directe de ce qu'ils ont défendu à Roland-Garros.</p>

<h3>Famille 1 — Alourdir la fiscalité des grandes entreprises (${fiscaliteEntreprisesDistribution[0]} candidats)</h3>
<p>Cette famille veut augmenter les impôts sur les grandes entreprises pour financer les services publics, dans la continuité de l'appel de Jean-Luc Mélenchon à faire porter l'effort sur le capital plutôt que sur le travail.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — A porté cette ligne devant le Medef, en couplant hausse de la fiscalité du capital et annulation partielle de la dette.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — Alignée sur la ligne LFI de mise à contribution des grandes entreprises.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Opposition frontale à toute baisse d'impôts sur les grandes entreprises, qu'il présente comme un cadeau au capital.</li>
<li><a href="/candidat/anasse-kazib">Anasse Kazib</a> (Révolution permanente) — Défend une taxation forte des grandes entreprises dans une logique anticapitaliste.</li>
<li><a href="/candidat/selma-labib">Selma Labib</a> (NPA-R) — Même ligne anticapitaliste, opposée à tout allègement pour les grandes entreprises.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — Rejette toute baisse de la fiscalité des entreprises tant qu'elle profite d'abord aux actionnaires.</li>
</ul>

<h3>Famille 2 — Rééquilibrer entre PME et multinationales, ou statu quo (${fiscaliteEntreprisesDistribution[1] + fiscaliteEntreprisesDistribution[2]} candidats)</h3>
<p>La famille la plus nombreuse : elle ne veut ni alourdir ni baisser massivement la fiscalité des entreprises, mais la rééquilibrer entre PME et multinationales, ou juge le niveau actuel globalement satisfaisant. On y retrouve à la fois le Rassemblement national, la gauche social-démocrate et une bonne partie des souverainistes et régionalistes.</p>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — A détaillé devant le Medef 87 milliards d'euros de baisse ciblée sur les taxes de production, tout en défendant une fiscalité plus dure envers les multinationales étrangères.</li>
<li><a href="/candidat/jordan-bardella">Jordan Bardella</a> (RN) — Même ligne que sa présidente, protection des PME françaises et fermeté envers les grands groupes étrangers.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place publique) — A défendu au débat une baisse de la CSG sur les salaires financée par une fiscalité plus lourde sur les gros héritages, sans toucher à l'imposition générale des entreprises.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — A promis un plan d'aide massif aux PME au débat, tout en réclamant une réforme de l'impôt sur les sociétés pour limiter l'optimisation fiscale des multinationales.</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> — Ligne social-démocrate classique, favorable à un rééquilibrage plutôt qu'à une hausse générale ou une baisse massive.</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — Même ligne PS, rééquilibrage entre petites et grandes entreprises.</li>
<li><a href="/candidat/philippe-brun">Philippe Brun</a> (PS) — Ligne similaire à celle de son parti sur ce dossier.</li>
<li><a href="/candidat/karim-bouamrane">Karim Bouamrane</a> (PS) — Sensibilité réformiste du PS, favorable à un rééquilibrage plutôt qu'à une hausse générale.</li>
<li><a href="/candidat/segolene-royal">Ségolène Royal</a> (PS) — Ligne social-libérale, proche du rééquilibrage PME/multinationales.</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> (La Convention) — Proche de la ligne PS historique sur la fiscalité des entreprises.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — Défend un rééquilibrage plutôt qu'une hausse uniforme, en ciblant surtout les multinationales.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — Cible en priorité les grands groupes plutôt que l'ensemble des entreprises.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Ligne écologiste proche de celle de Tondelier sur la fiscalité des entreprises.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> (MoDem) — Position centriste, ni hausse générale ni baisse massive.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Ligne souverainiste, protection des PME françaises face aux multinationales.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Même logique souverainiste que Dupont-Aignan sur ce point.</li>
<li><a href="/candidat/florian-philippot">Florian Philippot</a> (Les Patriotes) — Ligne souverainiste proche du RN sur la fiscalité des entreprises.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Gaullisme social, favorable à un rééquilibrage plutôt qu'à une baisse massive.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Discours de bon sens populaire, plutôt favorable à protéger les petites entreprises.</li>
<li><a href="/candidat/francis-lalanne">Francis Lalanne</a> (France Libre) — Discours anti-système sans proposition détaillée ; classé prudemment au rééquilibrage.</li>
<li><a href="/candidat/antoine-mikolajczak">Antoine Mikolajczak</a> (Équinoxe) — Pas de proposition publique connue sur ce dossier précis.</li>
<li><a href="/candidat/lydie-massard">Lydie Massard</a> (UDB) — Ligne régionaliste de gauche, plutôt favorable à un rééquilibrage.</li>
<li><a href="/candidat/clara-egger">Clara Egger</a> (Solution démocratique) — Approche pragmatique, considère le niveau actuel comme un compromis acceptable.</li>
</ul>

<h3>Famille 3 — Poursuivre la baisse pour la compétitivité et l'emploi (${fiscaliteEntreprisesDistribution[3]} candidats)</h3>
<p>Cette famille, majoritairement macroniste et LR, veut continuer à baisser les impôts des entreprises, dans la ligne défendue par Édouard Philippe et Gabriel Attal au débat.</p>
<ul>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — A mis la compétitivité au centre de son intervention sur la réindustrialisation, dans la continuité de sa ligne de baisse des impôts de production engagée quand il était Premier ministre.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Malgré son mea culpa sur les échecs économiques du quinquennat, il défend la poursuite de la baisse des impôts de production.</li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> (Renaissance) — Même ligne que son camp, priorité à la compétitivité des entreprises.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> (LR) — Ligne LR classique, favorable à la poursuite des baisses de charges et d'impôts de production.</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — Même ligne de fermeté budgétaire et de baisse de la fiscalité des entreprises que le reste de LR.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Ligne libérale sur l'entreprise, cohérente avec ses positions de fermeté budgétaire ailleurs dans le quiz.</li>
</ul>

<h3>Famille 4 — Baisser massivement les impôts de toutes les entreprises (${fiscaliteEntreprisesDistribution[4]} candidats)</h3>
<p>La position la plus offensive, incarnée au débat par Bruno Retailleau et sa promesse de mettre fin à ce qu'il présente comme un système qui sur-taxe le travail et les entreprises.</p>
<ul>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — Le plus offensif des candidats présents au débat sur la baisse de la fiscalité des entreprises et la réduction des effectifs publics.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> (Nouvelle Énergie) — Libéral assumé, défend une baisse générale de la fiscalité pour toutes les tailles d'entreprises.</li>
</ul>

<h2>Débat Medef : arguments pour et contre une baisse massive de la fiscalité des entreprises</h2>

<table>
<tr><th>Arguments pour une baisse</th><th>Arguments contre</th></tr>
<tr><td>Le coût du travail et la fiscalité freinent l'embauche et la compétitivité face aux voisins européens.</td><td>Les baisses de fiscalité des dix dernières années n'ont pas empêché la hausse du chômage et de la dette.</td></tr>
<tr><td>Les PME, en particulier, manquent de trésorerie pour investir et recruter.</td><td>Baisser massivement la fiscalité des entreprises prive l'État de recettes au moment où il cherche 30 à 50 milliards d'euros d'économies.</td></tr>
<tr><td>Une fiscalité stable et prévisible rassure les investisseurs étrangers, utile à la réindustrialisation.</td><td>Sans contrepartie sur les salaires, une baisse de charges profite d'abord aux marges des entreprises, pas aux salariés.</td></tr>
<tr><td>Réduire les normes et la fiscalité des grands groupes limite le risque de délocalisation industrielle.</td><td>Les multinationales pratiquent déjà l'optimisation fiscale ; une baisse générale les avantagerait davantage que les PME locales.</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<ul>
<li><a href="/question-politique/que-pensez-vous-de-la-fiscalite-des-entreprises">Fiscalité des entreprises</a> — la question complète du Quizz du Berger et le détail des réponses candidat par candidat.</li>
<li><a href="/question-politique/dette-publique-france">Dette publique</a> — le match Mélenchon-Philippe sur l'annulation de la dette, et les positions des ${candidatesCount} candidats.</li>
<li><a href="/question-politique/age-depart-retraite-62-64-ans">Âge de départ à la retraite</a> — Retailleau contre Le Pen, l'autre clivage retraites du débat.</li>
<li><a href="/question-politique/reindustrialisation-france">Réindustrialisation</a> — les différentes recettes présentées à Roland-Garros.</li>
<li><a href="/theme/politique-fiscale">Politique fiscale</a> — le thème complet, avec l'ISF, les impôts sur les plus riches et les droits de succession.</li>
<li><a href="/blog/dette-publique-taux-record-france-candidats-2027">Dette publique : taux au plus haut depuis 2008</a> — l'article complet du Quizz du Berger sur la crise de la dette qui a précédé le débat du Medef.</li>
<li><a href="/blog/jours-de-carence-arrets-maladie-france-candidats-2027">Jours de carence et arrêts maladie</a> — la proposition d'Édouard Philippe annoncée dans les jours qui ont précédé le débat.</li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Débat de la présidentielle face au Medef : tout comprendre et les positions des ${candidatesCount} candidats à 2027`,
    description:
      `Premier débat de la campagne 2027, organisé par le Medef le 27 août 2026 devant sept candidats : dette publique, retraites, réindustrialisation, coût du travail et fiscalité des entreprises. Positions détaillées des ${candidatesCount} candidats à l'élection présidentielle 2027.`,
    author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
    datePublished: '2026-08-31',
    about: [
      { '@type': 'Thing', name: 'Medef' },
      { '@type': 'Thing', name: 'Débat présidentiel' },
      { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
    ],
  },
};
