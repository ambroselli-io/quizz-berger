export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tag?: string;
  content: string;
  schema?: Record<string, unknown>;
}

export const articles: Article[] = [
  {
    slug: 'candidats-presidentielles-2027',
    title: 'Présidentielle 2027 : tous les candidats et leurs programmes',
    excerpt:
      "Découvrez les 26 candidats à l'élection présidentielle 2027 et comparez leurs positions sur 21 thèmes politiques majeurs.",
    date: '2026-02-11',
    tag: 'Candidats',
    content: `
<p>L'élection présidentielle 2027 s'annonce comme l'une des plus disputées de la Ve République. Avec <strong>26 candidats potentiels</strong>, les électeurs font face à un choix complexe. Plutôt que de les classer sur un axe politique, nous vous invitons à découvrir leurs positions thème par thème.</p>

<h2>Les 26 candidats</h2>
<ul>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> — UPR</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> — Renaissance</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> — Lutte Ouvrière</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a></li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> — Génération Écologie</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> — MoDem</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> — Les Républicains</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a></li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a></li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> — Debout la France</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> — Place Publique</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> — Parti Socialiste</li>
<li><a href="/candidat/francois-hollande">François Hollande</a></li>
<li><a href="/candidat/juan-branco">Juan Branco</a></li>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> — Rassemblement National</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a></li>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> — La France Insoumise</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> — Horizons</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a></li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> — Parti Communiste Français</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a></li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a></li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> — Les Écologistes</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a></li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> — Les Républicains</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> — Reconquête</li>
</ul>

<h2>Ne les classez pas : comparez-les à vous</h2>
<p>La politique ne se résume pas à un axe gauche-droite. Chaque candidat a des positions nuancées sur des dizaines de sujets. Le Quizz du Berger vous permet de comparer vos idées avec celles des 26 candidats sur <strong>21 thèmes</strong> et <strong>119 questions</strong>, thème par thème. Vous pourriez être surpris.</p>
<p><a href="/themes">→ Répondre au quiz et découvrir quel candidat pense comme vous</a></p>
`,
  },
  {
    slug: 'comment-fonctionne-le-quizz-du-berger',
    title: 'Comment fonctionne le Quizz du Berger ? Méthodologie et transparence',
    excerpt:
      "Découvrez l'algorithme, la construction des questions et la méthodologie derrière le Quizz du Berger.",
    date: '2026-02-11',
    tag: 'Méthodologie',
    content: `
<p>Le Quizz du Berger est un outil d'aide au choix électoral pour l'élection présidentielle. Plus de <strong>207 000 personnes</strong> l'ont déjà utilisé en 2022, on vise le million en 2027. Voici comment il fonctionne.</p>

<h2>L'algorithme de comparaison</h2>
<p>Le principe est simple : vous répondez aux questions qui vous intéressent, et un algorithme compare vos réponses à celles des 26 candidats.</p>
<p>Pour chaque question, les réponses sont échelonnées du plus radical d'un côté au plus radical de l'autre, en passant par des nuances intermédiaires. Quand vous répondez :</p>
<ul>
<li><strong>Réponse identique</strong> à celle d'un candidat = 5 points</li>
<li><strong>Réponse proche</strong> = 2 à 4 points selon la nuance</li>
<li><strong>Réponse opposée</strong> = 0 ou 1 point</li>
<li><strong>"Pas d'avis"</strong> = 0 point (la question est ignorée)</li>
</ul>
<p>Le candidat qui cumule le plus de points est celui dont les positions sont les plus proches des vôtres.</p>

<h2>La construction des questions</h2>
<p>Les <strong>119 questions</strong> réparties en <strong>21 thèmes</strong> ont été construites à partir des thèmes qui intéressent les Français. Les réponses possibles sont aussi celles des Français, et non celles des candidats. Chaque question propose entre 3 et 6 réponses possibles.</p>
<p>L'objectif est de couvrir l'ensemble des possibilités de réponse, et de permettre à chacun de se retrouver dans au moins une réponse.</p>

<h2>La construction des réponses des candidats</h2>
<p>En 2022, nous avons envoyé un mail à chacun des candidats pour leur demander de répondre, nous n'avons eu aucune réponse.</p>
<p>Nous en avons déduit que, si tant est qu'ils aient lu le mail, d'une part ils n'avaient probablement le temps de répondre, d'autre part ce n'était peut-être pas dans leur intérêt de s'engager sur des positions politiques dans ce genre de questionnaire.</p>
<p>Ainsi, nous avons décidé de ne pas les solliciter, et d'imaginer leurs réponses selon leurs opinions partagées sur le web ou dans les médias.</p>
<p>Toutefois, si l'un ou l'une d'entre eux se prend soudain d'envie de répondre, nous serons ravis de les intégrer à la base de données des candidats.</p>

<h2>Pourquoi c'est mieux qu'un simple "d'accord / pas d'accord"</h2>
<p>Contrairement à d'autres quiz politiques qui proposent seulement deux options (d'accord / pas d'accord), le Quizz du Berger offre <strong>jusqu'à 6 nuances</strong> par question. Cela permet de refléter la complexité réelle des opinions politiques.</p>
<p>Votre réalité est souvent plus complexe que "je suis pour" ou "je suis contre". Le Quizz du Berger vous permet de le refléter.</p>

<h2>Les résultats thème par thème</h2>
<p>es résultats ne sont pas seulement globaux, mais aussi <strong>thème par thème</strong>. Vous pouvez ainsi découvrir que vous êtes proche d'un candidat sur l'économie mais d'un autre sur les questions de société.</p>
<p>Cette approche multi-dimensionnelle montre que la pensée politique est complexe et ne se résume pas à un axe gauche-droite.</p>

<h2>Anonymat et données</h2>
<p>Vos réponses sont <strong>anonymes</strong>. Vous pouvez optionnellement sauvegarder vos résultats sous un pseudonyme pour les partager avec vos amis et comparer vos convictions.</p>

<p><a href="/themes">→ Essayez le quiz maintenant</a></p>
`,
  },
  {
    slug: '10-themes-cles-presidentielle-2027',
    title: 'Les 10 thèmes clés de la présidentielle 2027',
    excerpt:
      "Immigration, pouvoir d'achat, climat, retraites, sécurité... Les grands thèmes qui vont structurer le débat présidentiel.",
    date: '2026-02-11',
    tag: 'Analyse',
    content: `
<p>L'élection présidentielle 2027 s'articulera autour de grandes questions qui divisent et passionnent les Français. Voici les 10 thèmes qui structureront le débat.</p>

<h2>1. Immigration et identité</h2>
<p>Sujet brûlant depuis des années, la question migratoire reste au cœur du débat. Régularisation, quotas, droit du sol — les 26 candidats ont des positions très variées.</p>
<p><a href="/theme/demographie-et-question-migratoire">→ Les positions des candidats sur l'immigration</a></p>

<h2>2. Pouvoir d'achat et vie quotidienne</h2>
<p>Inflation, prix de l'énergie, logement : le pouvoir d'achat reste la préoccupation n°1 des Français.</p>
<p><a href="/theme/pouvoir-dachat-et-vie-quotidienne">→ Les positions des candidats sur le pouvoir d'achat</a></p>

<h2>3. Climat, énergie et écologie</h2>
<p>Nucléaire, énergies renouvelables, transition écologique : un thème transversal qui touche tous les pans de la politique.</p>
<p><a href="/theme/climat-energie-et-ecologie">→ Les positions des candidats sur le climat</a></p>

<h2>4. Travail, chômage et retraites</h2>
<p>L'abrogation de la retraite à 64 ans, le plein emploi, le temps de travail — des questions qui concernent tous les actifs.</p>
<p><a href="/theme/travail-chomage-retraite">→ Les positions des candidats sur le travail et la retraite</a></p>

<h2>5. Sécurité et justice</h2>
<p>Police, vidéosurveillance, peines planchers, délinquance : un thème qui cristallise les clivages.</p>
<p><a href="/theme/police-justice-et-securite">→ Les positions des candidats sur la sécurité</a></p>

<h2>6. Santé</h2>
<p>Déserts médicaux, euthanasie, hôpital public — le système de santé est au cœur des préoccupations.</p>
<p><a href="/theme/sante">→ Les positions des candidats sur la santé</a></p>

<h2>7. Éducation et recherche</h2>
<p>Réforme de l'école, uniforme, programmes, universités : un sujet qui engage l'avenir du pays.</p>
<p><a href="/theme/recherche-et-education">→ Les positions des candidats sur l'éducation</a></p>

<h2>8. Économie et industrie</h2>
<p>Réindustrialisation, libre-échange, protectionnisme, Mercosur : le modèle économique de la France est en question.</p>
<p><a href="/theme/economie-et-industrie">→ Les positions des candidats sur l'économie</a></p>

<h2>9. Gouvernance et institutions</h2>
<p>Proportionnelle, référendum d'initiative citoyenne (RIC), VIe République : comment réformer la démocratie ?</p>
<p><a href="/theme/gouvernance-et-republique">→ Les positions des candidats sur la gouvernance</a></p>

<h2>10. Questions de société</h2>
<p>Cannabis, laïcité, GPA/PMA, fin de vie : les sujets qui touchent aux valeurs et aux libertés individuelles.</p>
<p><a href="/theme/societe">→ Les positions des candidats sur la société</a></p>

<h2>Explorez tous les thèmes</h2>
<p>Le Quizz du Berger couvre <strong>21 thèmes</strong> en tout, avec <strong>119 questions</strong> détaillées. Découvrez quel candidat pense comme vous.</p>
<p><a href="/themes">→ Faire le quiz</a></p>
`,
  },
  {
    slug: 'alternative-elyze-2027',
    title: 'Quizz du Berger : la meilleure alternative à Elyze pour 2027',
    excerpt:
      "Pourquoi le Quizz du Berger est plus complet, plus nuancé et plus profond qu'Elyze pour choisir votre candidat à la présidentielle 2027.",
    date: '2026-02-11',
    tag: 'Comparatif',
    content: `
<p>Elyze a popularisé les quiz politiques en France lors de la présidentielle 2022. Pour 2027, le <strong>Quizz du Berger</strong> va beaucoup plus loin.</p>

<h2>Comparatif : Quizz du Berger vs Elyze</h2>

<table>
<tr><th>Critère</th><th>Quizz du Berger</th><th>Elyze</th></tr>
<tr><td>Nombre de questions</td><td><strong>119 questions</strong></td><td>~300 questions</td></tr>
<tr><td>Nuances de réponse</td><td><strong>3 à 6 nuances</strong> par question</td><td>D'accord / Pas d'accord</td></tr>
<tr><td>Thèmes couverts</td><td><strong>21 thèmes</strong></td><td>Mélangés</td></tr>
<tr><td>Résultats par thème</td><td><strong>Oui, thème par thème</strong></td><td>Global uniquement</td></tr>
<tr><td>Comparaison avec amis</td><td><strong>Oui</strong></td><td>Non</td></tr>
<tr><td>Candidats</td><td><strong>26 candidats</strong></td><td>Variable</td></tr>
<tr><td>Open-source</td><td><strong>Oui</strong></td><td>Non</td></tr>
</table>

<h2>Plus nuancé</h2>
<p>Elyze propose seulement "d'accord" ou "pas d'accord" — le Quizz du Berger offre <strong>jusqu'à 6 réponses</strong> par question, du plus radical d'un côté au plus radical de l'autre, avec des nuances intermédiaires. Cela reflète bien mieux la complexité des opinions politiques.</p>

<h2>Plus profond : les résultats thème par thème</h2>
<p>Avec Elyze, vous obtenez un classement global. Avec le Quizz du Berger, en plus du classement global, vous découvrez vos affinités <strong>thème par thème</strong>. Vous pouvez être proche de Mélenchon sur l'économie et de Le Pen sur la sécurité — on vous le montre.</p>

<h2>Plus complet</h2>
<p>119 questions sur 21 thèmes vs ~300 questions mélangées. Le Quizz du Berger couvre davantage de sujets et va plus en profondeur sur chacun d'entre eux.</p>

<h2>Comparaison avec vos amis</h2>
<p>Fonctionnalité unique : enregistrez vos résultats sous un pseudonyme et comparez vos convictions avec celles de vos amis. Pour un débat sain et profond !</p>

<h2>207 000+ utilisateurs en 2022</h2>
<p>Le Quizz du Berger a déjà convaincu plus de 207 000 personnes lors de la présidentielle 2022, avec plus de 9,7 millions de réponses. Un quart des utilisateurs a répondu aux 119 questions en entier.</p>

<p><a href="/themes">→ Essayez le Quizz du Berger maintenant</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Quizz du Berger : la meilleure alternative à Elyze pour 2027',
      description:
        "Comparatif détaillé entre le Quizz du Berger et Elyze pour l'élection présidentielle 2027.",
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-02-11',
    },
  },
  {
    slug: 'comparatif-quiz-politiques-2027',
    title: 'Comparatif des quiz politiques 2027 : Elyze, Quizz du Berger, Boussole Présidentielle',
    excerpt:
      'Quel quiz politique choisir pour la présidentielle 2027 ? Comparaison détaillée des principales applications.',
    date: '2026-02-11',
    tag: 'Comparatif',
    content: `
<p>Plusieurs outils en ligne permettent de trouver le candidat qui vous correspond le mieux. Voici un comparatif objectif.</p>

<h2>Les quiz politiques disponibles</h2>

<h3>Le Quizz du Berger</h3>
<p><strong>Points forts :</strong> 119 questions, 21 thèmes, jusqu'à 6 nuances de réponse, résultats thème par thème, comparaison avec amis, open-source.</p>
<p><strong>Points faibles :</strong> Plus long à compléter (mais on répond à ce qu'on veut).</p>
<p><strong>Idéal pour :</strong> Ceux qui veulent une analyse en profondeur de leur pensée politique.</p>

<h3>Elyze</h3>
<p><strong>Points forts :</strong> Interface type Tinder simple et rapide, popularité.</p>
<p><strong>Points faibles :</strong> Seulement d'accord/pas d'accord, pas de résultats par thème, moins de questions.</p>
<p><strong>Idéal pour :</strong> Ceux qui veulent s'amuser.</p>

<h3>La Boussole Présidentielle (Sciences Po)</h3>
<p><strong>Points forts :</strong> Méthodologie académique, axe gauche-droite et libéral-autoritaire.</p>
<p><strong>Points faibles :</strong> Résultats en 2D seulement, moins de granularité par thème.</p>
<p><strong>Idéal pour :</strong> Ceux qui veulent se situer sur un axe politique traditionnel.</p>

<h2>Notre recommandation</h2>
<p>Les trois outils sont complémentaires. Si vous n'en faites qu'un, le Quizz du Berger offre l'analyse la plus complète grâce à ses résultats thème par thème et ses nuances de réponse.</p>

<p><a href="/themes">→ Essayez le Quizz du Berger</a></p>
`,
  },
  {
    slug: 'quizz-du-berger-vs-boussole-presidentielle',
    title: 'Quizz du Berger vs Boussole Présidentielle : quelle différence ?',
    excerpt:
      'Analyse multi-thèmes vs axe gauche-droite : deux approches complémentaires pour trouver votre candidat.',
    date: '2026-02-11',
    tag: 'Comparatif',
    content: `
<p>La Boussole Présidentielle de Sciences Po et le Quizz du Berger sont deux outils sérieux pour l'élection 2027, mais avec des approches très différentes.</p>

<h2>Deux philosophies différentes</h2>
<p>La <strong>Boussole Présidentielle</strong> vous situe sur deux axes : gauche-droite et libéral-autoritaire. C'est une approche traditionnelle de la science politique qui permet de se positionner dans un espace bidimensionnel.</p>
<p>Le <strong>Quizz du Berger</strong> ne vous place pas sur un axe. Il compare vos réponses question par question avec celles des candidats, et vous montre les résultats <strong>thème par thème</strong>. L'approche est plus pragmatique : pas de catégorisation, mais une mesure de proximité directe.</p>

<h2>Pourquoi l'approche thème par thème est plus riche</h2>
<p>La politique est multidimensionnelle. Vous pouvez être :</p>
<ul>
<li>Libéral sur l'économie mais conservateur sur les questions de société</li>
<li>Écologiste mais souverainiste sur l'Europe</li>
<li>Progressiste sur la santé mais sécuritaire sur la justice</li>
</ul>
<p>Un axe 2D ne capture pas cette complexité. 21 thèmes séparés, si.</p>

<h2>En pratique</h2>
<p>Faites les deux ! La Boussole vous donne une vue d'ensemble de votre positionnement, le Quizz du Berger vous montre dans le détail quels candidats pensent comme vous, et sur quels sujets.</p>

<p><a href="/themes">→ Essayez le Quizz du Berger</a></p>
`,
  },
  {
    slug: 'accord-ue-mercosur-france-candidats-2027',
    title: 'Accord UE-Mercosur : tout comprendre et les positions des 26 candidats à la présidentielle 2027',
    excerpt:
      "Mercosur, c'est quoi ? Que contient l'accord UE-Mercosur ? Pourquoi divise-t-il la France ? Le détail et les positions de chaque candidat à 2027.",
    date: '2026-04-23',
    tag: 'Analyse',
    content: `
<p>Le <strong>Mercosur</strong> est redevenu l'un des sujets les plus brûlants du débat politique français. Signature de l'accord commercial avec l'Union européenne fin 2024, mobilisation des agriculteurs, vote à l'Assemblée nationale, prises de position des candidats à la présidentielle 2027 : tout le monde a un avis. Voici ce qu'il faut savoir, et ce que pense <strong>chacun des 26 candidats</strong>.</p>

<h2>Mercosur : c'est quoi, exactement ?</h2>
<p>Le <strong>Mercosur</strong> (<em>Mercado Común del Sur</em>, « Marché commun du Sud ») est une union douanière créée en 1991 par le traité d'Asunción. Elle regroupe aujourd'hui <strong>quatre pays membres à part entière</strong> : l'Argentine, le Brésil, le Paraguay et l'Uruguay. La Bolivie est en cours d'adhésion, le Venezuela est suspendu depuis 2016, et plusieurs pays (Chili, Colombie, Pérou, Équateur, Guyana, Suriname) sont associés.</p>
<p>Ensemble, les pays du Mercosur représentent environ <strong>270 millions d'habitants</strong> et la 5ᵉ économie mondiale si on les agrège. Leur spécialité : l'exportation de matières premières et de produits agricoles, en particulier le bœuf, le soja, le maïs, le sucre, la volaille et l'éthanol.</p>

<h2>L'accord UE-Mercosur : 25 ans de négociations</h2>
<p>L'accord UE-Mercosur est un <strong>traité de libre-échange</strong> négocié entre l'Union européenne et les quatre pays du Mercosur. Son objectif : supprimer ou réduire les droits de douane sur l'essentiel des échanges commerciaux entre les deux blocs et ouvrir des quotas agricoles en Europe.</p>
<p>Chronologie :</p>
<ul>
<li><strong>1999</strong> : ouverture des négociations.</li>
<li><strong>2019</strong> : accord politique « de principe » annoncé entre la Commission européenne et le Mercosur.</li>
<li><strong>2020-2023</strong> : la France, plusieurs pays européens et le Parlement européen bloquent la ratification en raison d'enjeux environnementaux et agricoles.</li>
<li><strong>6 décembre 2024</strong> : à Montevideo, Ursula von der Leyen annonce la conclusion politique de l'accord avec les présidents du Mercosur.</li>
<li><strong>2025-2026</strong> : début du processus de ratification, avec une division en deux parties (commerciale et politique) pour tenter de contourner les États membres récalcitrants.</li>
</ul>
<p>Concrètement, l'accord prévoit l'importation en Europe de <strong>99 000 tonnes</strong> de bœuf sud-américain à droits réduits, <strong>180 000 tonnes</strong> de volaille, <strong>190 000 tonnes</strong> de sucre, ainsi que du maïs, du soja et de l'éthanol, en échange d'un meilleur accès pour l'automobile, les vins, les spiritueux, les produits laitiers et les biens industriels européens.</p>

<h2>Pourquoi l'accord divise la France</h2>

<h3>1. L'agriculture : la ligne de front</h3>
<p>Les syndicats agricoles français (FNSEA, Coordination Rurale, Confédération paysanne) sont unanimement opposés à l'accord. Leur argument principal : <strong>distorsion de concurrence</strong>. Le bœuf brésilien est produit avec des antibiotiques activateurs de croissance interdits en Europe, le soja argentin utilise des pesticides (atrazine, glyphosate à forte dose) bannis dans l'UE, et les normes de bien-être animal sont incomparables. Importer ces produits reviendrait, selon eux, à importer une concurrence déloyale et à condamner des pans entiers de l'élevage français.</p>

<h3>2. Le climat et la déforestation</h3>
<p>Les ONG environnementales pointent le risque d'accélération de la <strong>déforestation amazonienne</strong> : plus d'exportations agricoles = plus de terres cultivées = plus de forêt défrichée. L'accord prévoit bien des engagements sur l'Accord de Paris, mais les critiques jugent les mécanismes de contrôle insuffisants. Les ONG réclament des <strong>clauses miroirs</strong> — c'est-à-dire l'obligation pour les produits importés de respecter les mêmes normes sanitaires et environnementales que les produits européens.</p>

<h3>3. L'industrie et les exportateurs</h3>
<p>À l'inverse, l'industrie automobile allemande, le secteur du vin, des spiritueux, du luxe et de la chimie voient dans l'accord une <strong>opportunité de croissance</strong>. Le Medef, la CCI France International et les grands groupes exportateurs soutiennent la signature, arguant que refuser l'accord reviendrait à laisser le marché sud-américain à la Chine.</p>

<h3>4. La souveraineté alimentaire</h3>
<p>Au-delà du clivage gauche-droite, la question de l'<strong>indépendance alimentaire</strong> traverse tout le spectre politique. Pour beaucoup, importer massivement de la nourriture d'un autre continent est à la fois un non-sens écologique (transport) et stratégique (dépendance).</p>

<h2>Le Mercosur à l'Assemblée nationale</h2>
<p>Le <strong>26 novembre 2024</strong>, l'Assemblée nationale française a voté une résolution symbolique rejetant l'accord UE-Mercosur en l'état, à une très large majorité transpartisane (<strong>484 voix pour, 70 contre</strong>). Ont voté contre l'accord : le Rassemblement National, La France Insoumise, le Parti Socialiste, Les Écologistes, le Parti Communiste, LR, les non-inscrits et une majorité du groupe Renaissance. Ce vote n'a pas de valeur juridique contraignante mais exprime la volonté politique de la représentation nationale.</p>
<p>Côté Sénat, une résolution similaire avait été adoptée le <strong>5 novembre 2024</strong>. Fin 2024, le gouvernement français a réaffirmé officiellement son opposition à l'accord « en l'état ».</p>

<h2>Les positions des 26 candidats à la présidentielle 2027</h2>
<p>Ce qui rend le débat Mercosur particulièrement intéressant, c'est qu'il <strong>traverse les clivages habituels</strong>. Pour y voir clair, nous avons regroupé les 26 candidats en quatre familles selon leurs positions publiques et leurs réponses aux questions du Quizz du Berger sur le <a href="/question-politique/reindustrialisation-france">libre-échange</a> et l'<a href="/theme/agriculture-et-alimentation">indépendance alimentaire</a>.</p>

<h3>Famille 1 — Opposants déclarés à l'accord, au nom du protectionnisme ou de l'écologie</h3>
<p>Ces candidats rejettent l'accord UE-Mercosur sans ambiguïté. Leurs motifs varient (souveraineté, écologie, défense des classes populaires, anti-libéralisme) mais leur conclusion converge : non à la ratification.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — Opposant historique aux traités de libre-échange. Parle du Mercosur comme d'un « hold-up » au profit des multinationales et prône le protectionnisme solidaire.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — Figure médiatique du rejet de l'accord, multiplie les déplacements aux côtés des agriculteurs. Défend l'indépendance alimentaire et la relocalisation.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — Alignée sur la ligne LFI : opposition frontale, critique du libre-échange généralisé.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — Rejet au nom des travailleurs français et de la souveraineté agricole.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — Dénonce un accord au service du capital international, quelles que soient ses modalités.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Opposition frontale au traité, dénoncé comme un exemple de l'hégémonie technocratique.</li>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — Opposition totale au nom du « patriotisme économique ». A fait voter son groupe contre l'accord à l'Assemblée et au Parlement européen.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Rejet ferme, argumentation centrée sur la souveraineté nationale et la défense du monde rural français.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Souverainiste historique, opposé à tous les traités de libre-échange, Mercosur compris.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Frexiteur, dénonce l'accord comme une preuve supplémentaire que l'UE ne défend pas les intérêts français.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — Rejet au nom du climat, de la déforestation amazonienne et des normes sanitaires. Réclame des clauses miroirs strictes comme préalable à toute négociation.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Opposition écologique, met en avant l'incohérence climatique et la menace sur la biodiversité.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place Publique / PS) — A voté contre l'accord au Parlement européen. Défend l'idée d'une Europe qui protège ses agriculteurs et ses normes.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Prend position contre l'accord au nom du monde rural et de la défense des éleveurs.</li>
</ul>

<h3>Famille 2 — Favorables au commerce, mais à condition de clauses miroirs et de protections</h3>
<p>Ces candidats ne rejettent pas le principe d'un accord commercial avec le Mercosur, mais exigent des garanties fortes : normes sanitaires et environnementales identiques, clauses miroirs, filets de sécurité pour les agriculteurs.</p>
<ul>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — Position nuancée : favorable au commerce international mais opposé à l'accord « en l'état », demande des clauses miroirs et des compensations pour les filières sensibles.</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — Rejet de l'accord tel qu'il est, mais pas du principe. Insiste sur la protection de l'élevage français et les normes sanitaires.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> — Ligne similaire : opposé à la version actuelle, favorable à un accord rééquilibré.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> (MoDem) — Position centriste : reconnaît l'intérêt du commerce international mais demande que l'accord soit conditionné à des réciprocités environnementales et sanitaires.</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> — Souligne les insuffisances de l'accord sur le climat et l'agriculture, appelle à une renégociation.</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> — Opposé à l'accord en l'état, invoque à la fois la protection de l'agriculture française et la cohérence climatique de l'UE.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Critique de la mondialisation dérégulée, plaide pour un multilatéralisme qui protège les peuples et les écosystèmes.</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — Ligne socialiste classique : non à l'accord sans clauses miroirs, oui à un commerce juste.</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> — Opposé à la ratification actuelle, notamment pour protéger l'élevage et la ruralité, tout en restant partisan d'une économie ouverte.</li>
</ul>

<h3>Famille 3 — Plutôt favorables au libre-échange régulé, mais prudents sur le Mercosur</h3>
<p>Ces candidats défendent le principe du libre-échange et l'ouverture commerciale, tout en reconnaissant les problèmes spécifiques posés par l'accord UE-Mercosur. Leur position : oui sur le fond, mais après modifications.</p>
<ul>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Défend une Europe commerciale forte, mais s'est aligné sur la position française officielle : pas de ratification « en l'état » sans garanties sanitaires et environnementales.</li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — Pragmatique, insiste sur la nécessité d'un cadre européen qui protège les agriculteurs tout en maintenant l'ouverture commerciale.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> — Libéral assumé, mais prudent : demande des clauses miroirs robustes avant toute ratification.</li>
</ul>

<h3>Un consensus français, des nuances à l'étranger</h3>
<p>Fait remarquable : sur les 26 candidats du Quizz du Berger, <strong>aucun ne défend la ratification de l'accord UE-Mercosur dans sa version actuelle</strong>. Les différences portent sur l'intensité du rejet (refus de principe vs. demande de renégociation) et sur les motifs (souveraineté, écologie, agriculture, libéralisme équitable). Cette quasi-unanimité française contraste avec la position de l'Allemagne, de l'Espagne et du Portugal, favorables à l'accord.</p>

<h2>Arguments pour et arguments contre l'accord UE-Mercosur</h2>

<table>
<tr><th>Arguments en faveur de l'accord</th><th>Arguments contre l'accord</th></tr>
<tr><td>Accès pour l'industrie européenne (automobile, chimie, machines) à un marché de 270 millions de consommateurs.</td><td>Concurrence déloyale pour les agriculteurs français : normes plus laxistes au Mercosur.</td></tr>
<tr><td>Débouchés pour les vins, spiritueux, fromages AOP et produits de luxe européens.</td><td>Risque d'accélération de la déforestation amazonienne et d'atteinte à la biodiversité.</td></tr>
<tr><td>Renforcement du lien géopolitique avec l'Amérique du Sud face à la Chine.</td><td>Incohérence avec le Green Deal européen et les engagements climatiques de l'UE.</td></tr>
<tr><td>Clauses environnementales inscrites dans l'accord (Accord de Paris, lutte contre la déforestation).</td><td>Mécanismes de contrôle jugés insuffisants et non contraignants.</td></tr>
<tr><td>Baisse potentielle des prix de certains produits pour le consommateur européen.</td><td>Menace sur la souveraineté alimentaire et sur des filières d'élevage déjà fragilisées.</td></tr>
</table>

<h2>Et vous, où vous situez-vous ?</h2>
<p>Le Mercosur n'est qu'une pièce d'un débat plus large sur le libre-échange, la souveraineté alimentaire et le modèle agricole français. Le Quizz du Berger vous permet de comparer vos positions à celles des 26 candidats sur ces questions précises :</p>
<ul>
<li><a href="/theme/economie-et-industrie">Thème : Économie et industrie</a> — libre-échange, réindustrialisation, protectionnisme.</li>
<li><a href="/theme/agriculture-et-alimentation">Thème : Agriculture et alimentation</a> — pesticides, bio, indépendance alimentaire, élevage.</li>
<li><a href="/theme/climat-energie-et-ecologie">Thème : Climat, énergie et écologie</a> — la cohérence climatique de l'accord.</li>
</ul>
<p>Plutôt que de se ranger derrière une étiquette, répondez question par question : vous pourriez découvrir que sur le Mercosur, vous pensez comme un candidat auquel vous ne vous attendiez pas.</p>

<p><a href="/themes">→ Faire le quiz et découvrir quel candidat pense comme vous</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Accord UE-Mercosur : tout comprendre et les positions des 26 candidats à la présidentielle 2027',
      description:
        "Mercosur, définition, contenu de l'accord UE-Mercosur, enjeux pour la France et positions détaillées des 26 candidats à l'élection présidentielle 2027.",
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-04-23',
      about: [
        { '@type': 'Thing', name: 'Mercosur' },
        { '@type': 'Thing', name: 'Accord UE-Mercosur' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
];
