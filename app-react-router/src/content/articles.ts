import { quizzQuestionsCount, quizzThemesCount } from '~/utils/quizz';
import { candidatesCount } from '~/utils/seo';

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
    excerpt: `Découvrez les ${candidatesCount} candidats à l'élection présidentielle 2027 et comparez leurs positions sur ${quizzThemesCount} thèmes politiques majeurs.`,
    date: '2026-02-11',
    tag: 'Candidats',
    content: `
<p>L'élection présidentielle 2027 s'annonce comme l'une des plus disputées de la Ve République. Avec <strong>${candidatesCount} candidats potentiels</strong>, les électeurs font face à un choix complexe. Plutôt que de les classer sur un axe politique, nous vous invitons à découvrir leurs positions thème par thème.</p>

<h2>Les ${candidatesCount} candidats</h2>
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
<p>La politique ne se résume pas à un axe gauche-droite. Chaque candidat a des positions nuancées sur des dizaines de sujets. Le Quizz du Berger vous permet de comparer vos idées avec celles des ${candidatesCount} candidats sur <strong>${quizzThemesCount} thèmes</strong> et <strong>${quizzQuestionsCount} questions</strong>, thème par thème. Vous pourriez être surpris.</p>
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
<p>Le principe est simple : vous répondez aux questions qui vous intéressent, et un algorithme compare vos réponses à celles des ${candidatesCount} candidats.</p>
<p>Pour chaque question, les réponses sont échelonnées du plus radical d'un côté au plus radical de l'autre, en passant par des nuances intermédiaires. Quand vous répondez :</p>
<ul>
<li><strong>Réponse identique</strong> à celle d'un candidat = 5 points</li>
<li><strong>Réponse proche</strong> = 2 à 4 points selon la nuance</li>
<li><strong>Réponse opposée</strong> = 0 ou 1 point</li>
<li><strong>"Pas d'avis"</strong> = 0 point (la question est ignorée)</li>
</ul>
<p>Le candidat qui cumule le plus de points est celui dont les positions sont les plus proches des vôtres.</p>

<h2>La construction des questions</h2>
<p>Les <strong>${quizzQuestionsCount} questions</strong> réparties en <strong>${quizzThemesCount} thèmes</strong> ont été construites à partir des thèmes qui intéressent les Français. Les réponses possibles sont aussi celles des Français, et non celles des candidats. Chaque question propose entre 3 et 6 réponses possibles.</p>
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
<p>Sujet brûlant depuis des années, la question migratoire reste au cœur du débat. Régularisation, quotas, droit du sol — les ${candidatesCount} candidats ont des positions très variées.</p>
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
<p>Le Quizz du Berger couvre <strong>${quizzThemesCount} thèmes</strong> en tout, avec <strong>${quizzQuestionsCount} questions</strong> détaillées. Découvrez quel candidat pense comme vous.</p>
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
<tr><td>Nombre de questions</td><td><strong>${quizzQuestionsCount} questions</strong></td><td>~300 questions</td></tr>
<tr><td>Nuances de réponse</td><td><strong>3 à 6 nuances</strong> par question</td><td>D'accord / Pas d'accord</td></tr>
<tr><td>Thèmes couverts</td><td><strong>${quizzThemesCount} thèmes</strong></td><td>Mélangés</td></tr>
<tr><td>Résultats par thème</td><td><strong>Oui, thème par thème</strong></td><td>Global uniquement</td></tr>
<tr><td>Comparaison avec amis</td><td><strong>Oui</strong></td><td>Non</td></tr>
<tr><td>Candidats</td><td><strong>${candidatesCount} candidats</strong></td><td>Variable</td></tr>
<tr><td>Open-source</td><td><strong>Oui</strong></td><td>Non</td></tr>
</table>

<h2>Plus nuancé</h2>
<p>Elyze propose seulement "d'accord" ou "pas d'accord" — le Quizz du Berger offre <strong>jusqu'à 6 réponses</strong> par question, du plus radical d'un côté au plus radical de l'autre, avec des nuances intermédiaires. Cela reflète bien mieux la complexité des opinions politiques.</p>

<h2>Plus profond : les résultats thème par thème</h2>
<p>Avec Elyze, vous obtenez un classement global. Avec le Quizz du Berger, en plus du classement global, vous découvrez vos affinités <strong>thème par thème</strong>. Vous pouvez être proche de Mélenchon sur l'économie et de Le Pen sur la sécurité — on vous le montre.</p>

<h2>Plus complet</h2>
<p>${quizzQuestionsCount} questions sur ${quizzThemesCount} thèmes vs ~300 questions mélangées. Le Quizz du Berger couvre davantage de sujets et va plus en profondeur sur chacun d'entre eux.</p>

<h2>Comparaison avec vos amis</h2>
<p>Fonctionnalité unique : enregistrez vos résultats sous un pseudonyme et comparez vos convictions avec celles de vos amis. Pour un débat sain et profond !</p>

<h2>207 000+ utilisateurs en 2022</h2>
<p>Le Quizz du Berger a déjà convaincu plus de 207 000 personnes lors de la présidentielle 2022, avec plus de 9,7 millions de réponses. Un quart des utilisateurs a répondu aux ${quizzQuestionsCount} questions en entier.</p>

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
<p><strong>Points forts :</strong> ${quizzQuestionsCount} questions, ${quizzThemesCount} thèmes, jusqu'à 6 nuances de réponse, résultats thème par thème, comparaison avec amis, open-source.</p>
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
<p>Un axe 2D ne capture pas cette complexité. ${quizzThemesCount} thèmes séparés, si.</p>

<h2>En pratique</h2>
<p>Faites les deux ! La Boussole vous donne une vue d'ensemble de votre positionnement, le Quizz du Berger vous montre dans le détail quels candidats pensent comme vous, et sur quels sujets.</p>

<p><a href="/themes">→ Essayez le Quizz du Berger</a></p>
`,
  },
  {
    slug: 'accord-ue-mercosur-france-candidats-2027',
    title: `Accord UE-Mercosur : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
    excerpt:
      "Mercosur, c'est quoi ? Que contient l'accord UE-Mercosur ? Pourquoi divise-t-il la France ? Le détail et les positions de chaque candidat à 2027.",
    date: '2026-02-27',
    tag: 'Analyse',
    content: `
<p>Le <strong>Mercosur</strong> est redevenu l'un des sujets les plus brûlants du débat politique français. Signature de l'accord commercial avec l'Union européenne fin 2024, mobilisation des agriculteurs, vote à l'Assemblée nationale, prises de position des candidats à la présidentielle 2027 : tout le monde a un avis. Voici ce qu'il faut savoir, et ce que pense <strong>chacun des ${candidatesCount} candidats</strong>.</p>

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
<li><strong>Novembre 2025</strong> : l'Assemblée nationale française adopte une seconde résolution contre l'accord, à la quasi-unanimité (244 voix pour, 1 contre), le groupe macroniste étant le seul à s'abstenir.</li>
<li><strong>9 janvier 2026</strong> : les États membres de l'UE, réunis au Conseil, valident le texte malgré l'opposition française.</li>
<li><strong>17 janvier 2026</strong> : signature officielle de l'accord par Ursula von der Leyen côté européen.</li>
<li><strong>21 janvier 2026</strong> : le Parlement européen, par une majorité étroite (334 pour, 324 contre, 11 abstentions), saisit la Cour de justice de l'Union européenne, ce qui <strong>suspend la ratification</strong> en attendant la décision de la Cour.</li>
<li><strong>Début mars 2026</strong> : le Parlement brésilien approuve de son côté l'accord.</li>
<li><strong>1er mai 2026</strong> : entrée en vigueur provisoire prévue pour la partie commerciale, malgré la saisine.</li>
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
<p>Le <strong>26 novembre 2024</strong>, l'Assemblée nationale française a voté une première résolution rejetant l'accord UE-Mercosur en l'état, à une très large majorité transpartisane (<strong>484 voix pour, 70 contre</strong>). Ont voté contre l'accord : le Rassemblement National, La France Insoumise, le Parti Socialiste, Les Écologistes, le Parti Communiste, LR, les non-inscrits et une majorité du groupe Renaissance. Ce vote n'a pas de valeur juridique contraignante mais exprime la volonté politique de la représentation nationale.</p>
<p>Côté Sénat, une résolution similaire avait été adoptée le <strong>5 novembre 2024</strong>. Fin 2024, le gouvernement français a réaffirmé officiellement son opposition à l'accord « en l'état ».</p>
<p>En <strong>novembre 2025</strong>, à la veille des votes européens décisifs, l'Assemblée nationale a récidivé avec une <strong>seconde résolution à la quasi-unanimité</strong> (244 voix pour, 1 contre), appelant le gouvernement à adopter une « minorité de blocage » au Conseil de l'UE. Fait remarquable, <strong>le groupe macroniste est le seul à s'être abstenu</strong>, creusant un écart politique entre la majorité présidentielle et l'ensemble des autres groupes.</p>
<p>Malgré la pression parlementaire française, la France n'est pas parvenue à réunir une minorité de blocage suffisante au Conseil de l'UE le 9 janvier 2026. L'accord a donc été formellement signé le 17 janvier 2026 par Ursula von der Leyen, avant d'être partiellement suspendu par la saisine de la Cour de justice de l'UE le 21 janvier.</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Ce qui rend le débat Mercosur particulièrement intéressant, c'est qu'il <strong>traverse les clivages habituels</strong>. Pour y voir clair, nous avons regroupé les ${candidatesCount} candidats en quatre familles selon leurs positions publiques et leurs réponses aux questions du Quizz du Berger sur le <a href="/question-politique/reindustrialisation-france">libre-échange</a> et l'<a href="/theme/agriculture-et-alimentation">indépendance alimentaire</a>.</p>

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
<p>Fait remarquable : sur les ${candidatesCount} candidats du Quizz du Berger, <strong>aucun ne défend la ratification de l'accord UE-Mercosur dans sa version actuelle</strong>. Les différences portent sur l'intensité du rejet (refus de principe vs. demande de renégociation) et sur les motifs (souveraineté, écologie, agriculture, libéralisme équitable). Cette quasi-unanimité française contraste avec la position de l'Allemagne, de l'Espagne et du Portugal, favorables à l'accord — qui ont d'ailleurs permis sa signature au Conseil de l'UE le 9 janvier 2026 malgré la pression française.</p>

<h3>Et maintenant ? Les recours qui restent</h3>
<p>Avec la signature du 17 janvier 2026, le front s'est déplacé. Les opposants misent désormais sur quatre recours :</p>
<ul>
<li>La <strong>saisine de la Cour de justice de l'UE</strong> par le Parlement européen (21 janvier 2026), qui conteste la manière dont la Commission a scindé l'accord en deux volets pour éviter une ratification par les 27 parlements nationaux.</li>
<li>Le <strong>blocage possible par le Parlement européen</strong> lors du vote de ratification une fois la question juridique tranchée.</li>
<li>Le vote éventuel des parlements nationaux sur le volet politique (Portugal, Italie, Pologne et Irlande pourraient basculer).</li>
<li>Les mesures nationales d'accompagnement : clauses de sauvegarde, soutiens aux filières sensibles, renforcement des contrôles sanitaires à l'importation.</li>
</ul>

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
<p>Le Mercosur n'est qu'une pièce d'un débat plus large sur le libre-échange, la souveraineté alimentaire et le modèle agricole français. Le Quizz du Berger vous permet de comparer vos positions à celles des ${candidatesCount} candidats sur ces questions précises :</p>
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
      headline: `Accord UE-Mercosur : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
      description:
        `Mercosur, définition, contenu de l'accord UE-Mercosur, enjeux pour la France et positions détaillées des ${candidatesCount} candidats à l'élection présidentielle 2027.`,
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-02-27',
      about: [
        { '@type': 'Thing', name: 'Mercosur' },
        { '@type': 'Thing', name: 'Accord UE-Mercosur' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
  {
    slug: 'affaire-epstein-france-candidats-2027',
    title: 'Affaire Epstein : tout comprendre, le volet français et les enjeux pour la présidentielle 2027',
    excerpt:
      "Qu'est-ce que l'affaire Epstein ? Qui est sur la liste Epstein ? Quel volet français ? Décryptage complet et positions des candidats à la présidentielle 2027 sur les sujets qu'elle soulève.",
    date: '2026-03-01',
    tag: 'Analyse',
    content: `
<p>Peu d'affaires judiciaires ont autant alimenté les théories, les enquêtes et les débats politiques que l'<strong>affaire Epstein</strong>. Réseau de trafic sexuel de mineures, clients milliardaires et chefs d'État, suicide contesté en prison, documents judiciaires rendus publics : l'affaire touche aux élites mondiales, à la justice, à la presse et — par ricochet — à la politique française. Voici un point complet, et ce que les ${candidatesCount} candidats à la présidentielle 2027 disent des enjeux qu'elle soulève.</p>

<h2>Affaire Epstein : c'est quoi, en résumé ?</h2>
<p>L'<strong>affaire Epstein</strong> désigne l'ensemble des enquêtes, procès et révélations autour du financier américain <strong>Jeffrey Epstein</strong> (1953-2019) et de sa complice <strong>Ghislaine Maxwell</strong>. Tous deux sont accusés — et condamnés, dans le cas de Maxwell — d'avoir organisé pendant plus de vingt ans un <strong>réseau de trafic sexuel de mineures</strong>, en recrutant, transportant et livrant des adolescentes à Epstein et à son cercle d'amis puissants, dans ses différentes résidences (Manhattan, Palm Beach, Nouveau-Mexique, et son île privée de Little Saint James).</p>
<p>L'affaire est devenue un symbole mondial de l'impunité des élites. Elle mêle justice pénale, lutte contre les violences sexuelles sur mineurs, transparence judiciaire, influence politique et financière, et liberté de la presse.</p>

<h2>Qui était Jeffrey Epstein ?</h2>
<p>Jeffrey Epstein est un financier américain né en 1953 à Brooklyn. Ancien professeur de mathématiques, il devient banquier d'affaires chez Bear Stearns dans les années 1970, avant de créer sa propre société de gestion de fortune réservée aux clients pesant plus d'un milliard de dollars. Son patrimoine estimé à sa mort : <strong>plus de 500 millions de dollars</strong>. Son réseau mondain, aussi, est immense : il fréquente des milliardaires, des universitaires de Harvard et du MIT, des personnalités politiques (dont plusieurs présidents américains) et des membres de familles royales européennes.</p>

<h2>Chronologie de l'affaire Epstein</h2>
<ul>
<li><strong>2005</strong> : la police de Palm Beach (Floride) ouvre une enquête après le témoignage d'une mère de victime mineure.</li>
<li><strong>2008</strong> : Epstein plaide coupable dans un accord controversé (« non-prosecution agreement ») négocié par le procureur Alexander Acosta. Il purge 13 mois avec permissions quotidiennes.</li>
<li><strong>2018</strong> : le <em>Miami Herald</em>, via l'enquête de la journaliste <strong>Julie K. Brown</strong>, publie la série « Perversion of Justice » qui relance l'affaire.</li>
<li><strong>6 juillet 2019</strong> : Epstein est arrêté à New York pour trafic sexuel de mineures.</li>
<li><strong>10 août 2019</strong> : Epstein est retrouvé mort dans sa cellule du Metropolitan Correctional Center. Sa mort est officiellement classée « suicide par pendaison » — conclusion contestée par une partie de sa famille et de l'opinion publique.</li>
<li><strong>Juillet 2020</strong> : Ghislaine Maxwell est arrêtée.</li>
<li><strong>Décembre 2021</strong> : Maxwell est reconnue coupable de cinq chefs d'accusation, dont trafic sexuel de mineurs. Elle est condamnée à <strong>20 ans de prison</strong>.</li>
<li><strong>Janvier 2024</strong> : la justice américaine rend publics <strong>plus de 900 pages</strong> de documents judiciaires dans l'affaire Giuffre v. Maxwell, contenant les noms de dizaines de personnalités associées à Epstein.</li>
<li><strong>Fin 2025</strong> : le Congrès américain adopte l'<strong>Epstein Files Transparency Act</strong> à la quasi-unanimité (427 voix pour contre 1 à la Chambre, adoption à l'unanimité au Sénat).</li>
<li><strong>30 janvier 2026</strong> : le Department of Justice publie, en application de la loi, <strong>plus de 3 millions de pages</strong> de documents, <strong>plus de 2 000 vidéos</strong> et <strong>180 000 images</strong>. C'est la plus grande déclassification de l'histoire de l'affaire.</li>
<li><strong>Février-mars 2026</strong> : multiplication des enquêtes dans le monde, arrestation d'Andrew Mountbatten-Windsor (ex-prince Andrew) le 18 février au Royaume-Uni, ouverture d'enquêtes françaises, premières mises en cause publiques.</li>
</ul>

<h2>La « liste Epstein » : qu'est-ce que c'est exactement ?</h2>
<p>Il n'existe pas <em>une</em> unique « liste Epstein ». L'expression recouvre en réalité plusieurs documents distincts :</p>
<ul>
<li>Le <strong>« petit carnet noir »</strong> (<em>little black book</em>) : carnet d'adresses personnel d'Epstein, contenant plusieurs centaines de noms de contacts professionnels, mondains et personnels. Être dans ce carnet ne signifie ni complicité ni culpabilité.</li>
<li>Les <strong>carnets de vol</strong> du « Lolita Express » (son Boeing 727 et Gulfstream) : ils listent les passagers transportés par Epstein, parmi lesquels d'anciens présidents, des familles royales, des scientifiques et des milliardaires.</li>
<li>Les <strong>documents judiciaires</strong> de l'affaire Virginia Giuffre v. Ghislaine Maxwell (déposés en 2015, descellés en 2024) : plus de 900 pages qui citent les noms de tiers mentionnés par les parties lors des dépositions.</li>
<li>Les <strong>« Epstein files »</strong> déclassifiés par le Congrès américain et le DoJ en 2025-2026 : notes d'enquête, interrogatoires, pièces du FBI.</li>
</ul>
<p>Important : figurer dans l'un de ces documents ne vaut pas accusation. La présence d'un nom peut simplement signaler une relation professionnelle, mondaine ou une fréquentation ponctuelle.</p>

<h2>Les « Epstein files » : que révèlent les documents judiciaires ?</h2>
<p>Les documents descellés en 2024, 2025 puis massivement en <strong>janvier 2026</strong> révèlent :</p>
<ul>
<li>L'ampleur du <strong>réseau de recrutement</strong> de victimes, souvent mineures, par Ghislaine Maxwell et d'autres complices.</li>
<li>La <strong>complaisance de certaines autorités</strong> locales américaines, notamment lors de l'accord de 2008.</li>
<li>Les <strong>liens entre Epstein et plusieurs institutions académiques et financières</strong> (Harvard, MIT, banques d'affaires).</li>
<li>Des <strong>témoignages directs de victimes</strong> citant des hommes puissants, dont le prince Andrew d'York — qui a réglé à l'amiable une plainte civile pour 12 millions de livres en 2022, avant d'être finalement arrêté le <strong>18 février 2026</strong> au Royaume-Uni pour soupçons de partage de documents confidentiels avec Epstein.</li>
<li>De nouveaux noms internationaux rendus publics en 2026 : la future reine de Norvège Mette-Marit, l'ancien Premier ministre norvégien Thorbjørn Jagland, l'ancien ministre slovaque des Affaires étrangères Miroslav Lajčák, et plusieurs personnalités françaises (voir ci-dessous).</li>
</ul>
<p>Comme pour les précédentes vagues, figurer dans ces documents ne vaut pas accusation : il peut s'agir d'une fréquentation mondaine, d'un contact professionnel ou d'une mention faite par un tiers.</p>

<h2>Le volet français de l'affaire Epstein : Brunel, Jack Lang, Gérald Marie</h2>
<p>La France n'est pas restée à l'écart de l'affaire. La publication massive des « Epstein Files » le 30 janvier 2026 a au contraire ouvert un <strong>volet français inédit</strong>, avec plusieurs noms désormais dans le viseur de la justice.</p>

<h3>Jean-Luc Brunel : le pilier historique du dossier français</h3>
<p>Ancien agent de mannequins, fondateur de MC2 Model Management, <strong>Jean-Luc Brunel</strong> est considéré comme un collaborateur central d'Epstein côté français.</p>
<ul>
<li><strong>Décembre 2020</strong> : ouverture d'une information judiciaire pour viol sur mineur, agression sexuelle et trafic d'êtres humains.</li>
<li><strong>Décembre 2021</strong> : Brunel est arrêté à Roissy et placé en détention provisoire à la prison de la Santé.</li>
<li><strong>19 février 2022</strong> : Brunel est retrouvé mort dans sa cellule, officiellement par pendaison.</li>
<li><strong>20 février 2026</strong> : à la suite de la publication des « Epstein Files », le parquet de Paris <strong>rouvre l'enquête</strong> sur les associés d'Epstein en France, Brunel compris, pour éclaircir les complicités.</li>
</ul>

<h3>Jack Lang : enquête du PNF pour blanchiment aggravé de fraude fiscale</h3>
<p>C'est l'onde de choc politique de 2026. L'ancien ministre de la Culture de François Mitterrand <strong>Jack Lang</strong> est cité <strong>673 fois</strong> dans les « Epstein Files » publiés le 30 janvier 2026.</p>
<ul>
<li><strong>6 février 2026</strong> : le <strong>Parquet national financier (PNF)</strong> ouvre une enquête pour « blanchiment aggravé de fraude fiscale » visant Jack Lang et sa fille Caroline Lang. À ce stade, aucune accusation de violences sexuelles n'est portée contre lui.</li>
<li><strong>10 février 2026</strong> : Jack Lang démissionne de la présidence de l'Institut du Monde Arabe, qu'il occupait depuis 2013. Le siège parisien de l'Institut est perquisitionné.</li>
<li><strong>14 février 2026</strong> : dans sa première interview, Jack Lang conteste vigoureusement les accusations, se dit « plus blanc que blanc », dénonce un « tsunami de calomnies » et affirme n'avoir « jamais reçu un centime » d'Epstein.</li>
</ul>
<p>D'autres Français sont cités par France 24 (17 février 2026) comme étant « dans le viseur de la justice » : <strong>Fabrice Aidan</strong>, homme d'affaires mentionné dans les échanges, et plusieurs intermédiaires.</p>

<h3>Gérald Marie et les anciennes mannequins d'Elite</h3>
<p>Le <strong>19 mars 2026</strong>, <strong>15 anciennes mannequins</strong> demandent à la justice française d'enquêter sur <strong>Gérald Marie</strong>, ancien patron de l'agence Elite, et sur <strong>Daniel Siad</strong>, recruteur. Les plaignantes affirment détenir des « documents judiciaires et des e-mails » prouvant la collaboration entre Gérald Marie, Jean-Luc Brunel et Jeffrey Epstein, via les agences MC2 et E Model Management.</p>
<p>Le parquet de Paris a ouvert deux enquêtes-cadre : l'une pour <strong>infractions de traite d'êtres humains</strong>, l'autre pour <strong>infractions financières</strong>, afin d'analyser méthodiquement les dénonciations liées à Epstein.</p>
<p>L'Office central pour la répression des violences aux personnes (OCRVP) continue parallèlement de recueillir des témoignages. Plusieurs mannequins et anciens modèles ont déposé plainte pour dénoncer un système d'exploitation et de recrutement de jeunes filles, parfois mineures.</p>

<h2>Ce que l'affaire Epstein dit de notre époque</h2>
<p>Au-delà du cas pénal, l'affaire Epstein agit comme un révélateur. Elle met en lumière :</p>
<ul>
<li><strong>La question de l'impunité des puissants</strong> : la justice a-t-elle les moyens de poursuivre des hommes dotés d'un patrimoine, d'un réseau et d'une armée d'avocats ?</li>
<li><strong>La protection des mineurs</strong> dans des industries où la porosité est forte : mannequinat, cinéma, nuit, élites financières.</li>
<li><strong>Le rôle du journalisme d'investigation</strong> : sans le travail de Julie K. Brown et du <em>Miami Herald</em>, l'affaire ne serait jamais ressortie.</li>
<li><strong>La culture du silence</strong> autour des violences sexuelles, avec des victimes qui ont mis parfois 20 ans à être écoutées.</li>
<li><strong>La transparence judiciaire</strong> : faut-il publier plus, et plus vite, les documents liés aux affaires touchant les personnalités publiques ?</li>
</ul>

<h2>Les ${candidatesCount} candidats à la présidentielle 2027 et les enjeux soulevés par l'affaire Epstein</h2>
<p>Peu de candidats ont commenté directement l'affaire Epstein — c'est une affaire essentiellement américaine. En revanche, les <strong>sujets qu'elle soulève</strong> — impunité des élites, protection des mineurs, indépendance de la justice, liberté de la presse — traversent tous les programmes. Voici comment les ${candidatesCount} candidats du Quizz du Berger se positionnent sur ces enjeux, en quatre axes.</p>

<h3>1. Lutte contre la pédocriminalité et les violences sexuelles</h3>
<p>Un consensus transpartisan existe sur le principe : il faut renforcer la lutte contre la pédocriminalité et les violences sexuelles. Les divergences portent sur les moyens (imprescriptibilité, formation des magistrats, budgets, victimologie).</p>
<ul>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> et <a href="/candidat/delphine-batho">Delphine Batho</a> (écologistes) portent des propositions fortes sur les violences faites aux femmes et aux enfants, en lien avec les mouvements féministes.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — figure féministe historique, notamment autour du mouvement #MeToo en France.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — met en avant la honte sociale et l'impunité comme moteurs des violences.</li>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> et <a href="/candidat/eric-zemmour">Éric Zemmour</a> insistent sur le durcissement des peines, notamment pour les crimes sexuels sur mineurs.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a>, <a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a>, <a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — alourdissement des sanctions et perpétuité réelle pour les crimes les plus graves contre les mineurs.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a>, <a href="/candidat/edouard-philippe">Édouard Philippe</a>, <a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — continuité des plans gouvernementaux sur les violences faites aux femmes et aux enfants, avec un accent sur la formation des policiers et magistrats.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> — porte le sujet au Parlement européen, notamment sur les images pédopornographiques et la régulation des plateformes.</li>
</ul>

<h3>2. Indépendance de la justice face aux puissants</h3>
<p>L'affaire Epstein illustre la difficulté de poursuivre des personnes ultra-riches. Les candidats se divisent sur les remèdes.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a>, <a href="/candidat/francois-ruffin">François Ruffin</a>, <a href="/candidat/fabien-roussel">Fabien Roussel</a>, <a href="/candidat/juan-branco">Juan Branco</a> — plaident pour un vrai statut pénal des élus et des puissants, le renforcement du parquet national financier, l'inéligibilité en cas de condamnation pour corruption ou violences.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — dénonce un système judiciaire de classe, favorable aux riches.</li>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a>, <a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a>, <a href="/candidat/francois-asselineau">François Asselineau</a> — dénoncent l'« oligarchie » et demandent plus de transparence et de contrôle citoyen.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> — critique une justice « à deux vitesses » mais centre davantage son propos sur la délinquance quotidienne que sur les élites.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a>, <a href="/candidat/francois-bayrou">François Bayrou</a>, <a href="/candidat/dominique-de-villepin">Dominique de Villepin</a>, <a href="/candidat/francois-hollande">François Hollande</a>, <a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> — défendent l'indépendance institutionnelle du parquet et davantage de moyens pour les magistrats.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a>, <a href="/candidat/gerald-darmanin">Gérald Darmanin</a>, <a href="/candidat/david-lisnard">David Lisnard</a> — prônent un renforcement des effectifs, de la formation et des moyens d'enquête financière.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a>, <a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a>, <a href="/candidat/jerome-guedj">Jérôme Guedj</a> — réforme institutionnelle pour garantir l'indépendance des procureurs.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a>, <a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a>, <a href="/candidat/bruno-retailleau">Bruno Retailleau</a> — davantage d'autorité de l'exécutif pour garantir l'efficacité pénale, tout en respectant la séparation des pouvoirs.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — expression d'une défiance populaire envers les élites judiciaires et politiques.</li>
</ul>

<h3>3. Transparence, liberté de la presse et lanceurs d'alerte</h3>
<p>Sans enquêtes longues et libres, des affaires comme Epstein ne sortiraient jamais. Tous les candidats reconnaissent cette nécessité, avec des intensités variables.</p>
<ul>
<li><a href="/candidat/francois-ruffin">François Ruffin</a>, <a href="/candidat/clementine-autain">Clémentine Autain</a>, <a href="/candidat/juan-branco">Juan Branco</a> — défense offensive de la liberté de la presse, soutien aux lanceurs d'alerte, critique de la concentration médiatique.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a>, <a href="/candidat/delphine-batho">Delphine Batho</a>, <a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> — plaident pour une loi anti-concentration renforcée et la protection des sources journalistiques.</li>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a>, <a href="/candidat/fabien-roussel">Fabien Roussel</a>, <a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> — dénoncent un paysage médiatique dominé par quelques milliardaires.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a>, <a href="/candidat/francois-bayrou">François Bayrou</a>, <a href="/candidat/francois-hollande">François Hollande</a>, <a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a>, <a href="/candidat/dominique-de-villepin">Dominique de Villepin</a>, <a href="/candidat/jerome-guedj">Jérôme Guedj</a> — défense institutionnelle du pluralisme et de l'indépendance de l'audiovisuel public.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a>, <a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — soutien à la loi contre les manipulations de l'information et à l'encadrement des plateformes.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a>, <a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a>, <a href="/candidat/bruno-retailleau">Bruno Retailleau</a>, <a href="/candidat/david-lisnard">David Lisnard</a> — attachement à la liberté de la presse, tout en insistant sur la responsabilité juridique des médias.</li>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a>, <a href="/candidat/eric-zemmour">Éric Zemmour</a>, <a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a>, <a href="/candidat/francois-asselineau">François Asselineau</a> — critique des « médias mainstream » et demande d'un meilleur accès pour les médias alternatifs.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — se présente comme défenseur d'une parole libre face au « politiquement correct ».</li>
</ul>

<h3>4. Corruption, lobbying et impunité des élites</h3>
<p>C'est l'angle le plus directement saillant : le Quizz du Berger consacre un thème entier à la corruption et au lobbying, avec des positions tranchées.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a>, <a href="/candidat/francois-ruffin">François Ruffin</a>, <a href="/candidat/clementine-autain">Clémentine Autain</a>, <a href="/candidat/fabien-roussel">Fabien Roussel</a>, <a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a>, <a href="/candidat/juan-branco">Juan Branco</a> — le système est structurellement corrompu ; il faut un choc démocratique (VIᵉ République, RIC, interdiction stricte du pantouflage).</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a>, <a href="/candidat/delphine-batho">Delphine Batho</a>, <a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a>, <a href="/candidat/jerome-guedj">Jérôme Guedj</a> — renforcer la HATVP, encadrer le lobbying, créer un registre européen contraignant.</li>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a>, <a href="/candidat/eric-zemmour">Éric Zemmour</a>, <a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a>, <a href="/candidat/francois-asselineau">François Asselineau</a> — dénoncent une oligarchie mondialisée ; proposent un contrôle renforcé des élus et un retour de la souveraineté nationale.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a>, <a href="/candidat/francois-bayrou">François Bayrou</a>, <a href="/candidat/francois-hollande">François Hollande</a>, <a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a>, <a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — ligne institutionnelle : la loi Sapin 2 a fait ses preuves, il faut l'approfondir sans remettre en cause le cadre général.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a>, <a href="/candidat/gerald-darmanin">Gérald Darmanin</a>, <a href="/candidat/david-lisnard">David Lisnard</a> — renforcer les moyens des juges financiers et les obligations de transparence, sans stigmatiser les réussites individuelles.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a>, <a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a>, <a href="/candidat/bruno-retailleau">Bruno Retailleau</a> — fermeté pénale sur la corruption publique ; exigence d'exemplarité des élus.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — expression de la défiance populaire, position peu structurée sur le plan programmatique.</li>
</ul>

<h2>Les questions du Quizz du Berger directement liées à l'affaire Epstein</h2>
<p>Si l'affaire Epstein vous interroge, le Quizz du Berger propose plusieurs questions qui touchent directement à ses enjeux :</p>
<ul>
<li><a href="/theme/corruption-et-lobbying">Corruption et lobbying</a> — 5 questions, dont le lobbying, les « portes tournantes » entre politique et privé, et le financement des campagnes.</li>
<li><a href="/theme/police-justice-et-securite">Police, justice et sécurité</a> — notamment « Que pensez-vous de la justice en France ? » et « Que pensez-vous de la situation dans les prisons françaises ? ».</li>
<li><a href="/theme/societe">Société</a> — les questions liées aux droits des victimes et aux violences sexuelles.</li>
<li><a href="/theme/affaires-etrangeres">Affaires étrangères</a> — la relation de la France avec les grandes puissances, dont les États-Unis, d'où est parti le dossier.</li>
</ul>

<h2>En résumé</h2>
<p>L'affaire Epstein n'est pas un dossier que les candidats français commentent tous les jours. Mais les <strong>questions qu'elle soulève</strong> — protection des mineurs, impunité des puissants, indépendance de la justice, rôle de la presse — structurent en profondeur le débat de la présidentielle 2027. En répondant aux ${quizzQuestionsCount} questions du Quizz du Berger, vous pouvez voir lequel des ${candidatesCount} candidats est le plus proche de vos convictions sur ces sujets, <strong>sans vous laisser enfermer dans une étiquette partisane</strong>.</p>

<p><a href="/themes">→ Faire le quiz et découvrir quel candidat pense comme vous</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Affaire Epstein : tout comprendre, le volet français et les enjeux pour la présidentielle 2027',
      description:
        `Affaire Epstein : chronologie, liste Epstein, volet français (Jean-Luc Brunel) et positions des ${candidatesCount} candidats à la présidentielle 2027 sur les enjeux soulevés.`,
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-03-01',
      about: [
        { '@type': 'Thing', name: 'Affaire Epstein' },
        { '@type': 'Thing', name: 'Jeffrey Epstein' },
        { '@type': 'Thing', name: 'Ghislaine Maxwell' },
        { '@type': 'Thing', name: 'Jean-Luc Brunel' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
  {
    slug: 'guerre-iran-detroit-ormuz-france-candidats-2027',
    title: `Guerre Iran-Israël et détroit d'Ormuz : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
    excerpt:
      "Guerre Iran-Israël, programme nucléaire iranien, détroit d'Ormuz et prix du pétrole : le décryptage complet et les positions de chaque candidat à 2027 sur l'Iran et la diplomatie française.",
    date: '2026-04-23',
    tag: 'Analyse',
    content: `
<p>Massacres de manifestants en janvier, guerre ouverte avec Israël et les États-Unis à partir du 28 février, mort du Guide suprême, fermeture effective du <strong>détroit d'Ormuz</strong> début mars, baril au-dessus de 100 dollars : 2026 a fait basculer le Moyen-Orient et, avec lui, les prix de l'énergie en Europe. Voici ce qu'il faut savoir sur la <strong>guerre Iran-Israël-États-Unis</strong> et ce qu'en disent les ${candidatesCount} candidats à la présidentielle 2027.</p>

<h2>Le détroit d'Ormuz : c'est quoi ?</h2>
<p>Le <strong>détroit d'Ormuz</strong> est un bras de mer de <strong>55 km de large</strong> (à son point le plus resserré, seulement 33 km) qui relie le golfe Persique au golfe d'Oman et à l'océan Indien. Il borde au nord l'Iran, au sud le sultanat d'Oman et les Émirats arabes unis.</p>
<p>C'est l'un des plus importants passages stratégiques de la planète :</p>
<ul>
<li><strong>Environ 20 % du pétrole mondial</strong> y transite chaque jour (soit près de <strong>20 millions de barils</strong>).</li>
<li><strong>Près d'un tiers du gaz naturel liquéfié (GNL) mondial</strong> y passe, notamment depuis le Qatar.</li>
<li>Les principaux fournisseurs du monde — Arabie saoudite, Iran, Irak, Koweït, Émirats, Qatar — exportent tous par ce seul couloir.</li>
</ul>
<p>Toute fermeture — même partielle, même temporaire — ferait immédiatement exploser les cours mondiaux du pétrole et du gaz, avec un effet direct sur l'inflation en Europe et sur la facture énergétique des ménages français.</p>

<h2>Acte I : la guerre éclair de juin 2025 (« Douze Jours »)</h2>
<p>Un premier conflit direct a éclaté à l'été 2025, prélude à la guerre ouverte de 2026. Rappel des dates :</p>
<ul>
<li><strong>13 juin 2025</strong> : Israël lance l'opération « Rising Lion », une série de frappes aériennes massives contre les installations nucléaires iraniennes (Natanz, Ispahan), des sites militaires, des chefs du corps des Gardiens de la Révolution et plusieurs scientifiques atomistes.</li>
<li><strong>13-21 juin 2025</strong> : l'Iran riposte par des salves de missiles balistiques et de drones contre Israël. Des missiles atteignent Tel-Aviv, Haïfa et Beer-Sheva. Israël intercepte la majorité des projectiles grâce au Dôme de fer et à la Fronde de David.</li>
<li><strong>22 juin 2025</strong> : les États-Unis entrent directement dans le conflit avec l'opération « Midnight Hammer ». Des bombardiers B-2 larguent des bombes anti-bunker GBU-57 sur les sites enfouis de <strong>Fordo, Natanz et Ispahan</strong>. C'est la première utilisation opérationnelle de cette arme.</li>
<li><strong>22 juin 2025</strong> : le Parlement iranien vote symboliquement la fermeture du <strong>détroit d'Ormuz</strong>. La décision finale revient au Conseil suprême de sécurité nationale, qui ne l'applique pas.</li>
<li><strong>23 juin 2025</strong> : l'Iran frappe la base américaine d'Al-Udeid au Qatar en représailles, en prévenant à l'avance les autorités du Qatar pour éviter les pertes.</li>
<li><strong>24 juin 2025</strong> : cessez-le-feu annoncé par Donald Trump, entré en vigueur après quelques heures de tensions.</li>
</ul>

<h2>Acte II : les massacres de janvier 2026</h2>
<p>Fin 2025, une <strong>vague de manifestations populaires</strong> éclate en Iran, déclenchée par l'effondrement du rial et la paupérisation brutale de la classe moyenne. La contestation s'étend à des dizaines de villes, franchit les lignes ethniques, et se radicalise en appel au renversement du régime. La réponse des autorités est d'une brutalité extrême.</p>
<ul>
<li><strong>8 et 9 janvier 2026</strong> : les forces de sécurité tirent sur des cortèges dans plusieurs provinces. Amnesty International et Human Rights Watch parlent de <strong>massacres de manifestants</strong> à grande échelle.</li>
<li>Le bilan exact est <strong>disputé et probablement sous-estimé</strong> : l'ONG HRAI dénombrait <strong>5 848 morts vérifiés</strong> au 25 janvier 2026 et enquêtait sur 17 000 autres cas. Certaines estimations internes citées par les services iraniens évoqueraient jusqu'à 36 500 morts. Les autorités iraniennes contestent ces chiffres et parlent d'« émeutes fomentées par l'étranger ».</li>
<li><strong>Répression numérique et militaire</strong> : coupure totale d'Internet pendant plusieurs jours, couvre-feu nocturne, patrouilles lourdement armées, arrestations dans les hôpitaux, usage massif de gaz lacrymogènes et d'armes à létalité contestée.</li>
<li><strong>Onde de choc internationale</strong> : Amnesty parle de la « période de répression la plus meurtrière en Iran depuis des décennies ». L'ONU dénonce une « brutalité persistante ». C'est dans ce contexte que Washington place ses options militaires sur la table, le 13 janvier, à la Maison-Blanche.</li>
</ul>

<h2>Acte III : la guerre Iran-Israël-États-Unis de 2026</h2>
<p>La bascule militaire se produit fin février. Rappel des dates clés :</p>
<ul>
<li><strong>25 janvier 2026</strong> : le groupe aéronaval de l'<strong>USS Abraham Lincoln</strong> est déployé vers le golfe Persique, accompagné de renforts aériens américains.</li>
<li><strong>3 février 2026</strong> : six canonnières des Gardiens de la Révolution tentent d'arraisonner le pétrolier <strong>Stena Imperative</strong> dans le détroit d'Ormuz. Le navire poursuit sa route sous escorte du destroyer américain USS McFaul. La crise du détroit commence.</li>
<li><strong>28 février 2026</strong> : les États-Unis et Israël lancent une opération conjointe massive contre l'Iran — frappes coordonnées sur des dizaines de sites militaires, les stocks de missiles, les lanceurs et les installations nucléaires. Le <strong>Guide suprême Ali Khamenei est tué</strong> pendant l'attaque ; un conseil provisoire prend le contrôle du régime. Donald Trump affirme publiquement que l'objectif inclut un <strong>changement de régime</strong>, en plus de l'arrêt du programme nucléaire.</li>
<li><strong>1er mars 2026</strong> : le front libanais s'ouvre. Tsahal lance une campagne de bombardements contre le Hezbollah. Une frappe de missile iranien sur la ville de <strong>Beit Shemesh</strong> tue 9 civils israéliens — bilan le plus lourd côté civils en ce début de guerre.</li>
<li><strong>2 mars 2026</strong> : un haut responsable des Gardiens de la Révolution annonce officiellement la <strong>fermeture du détroit d'Ormuz</strong>. Tout navire tentant la traversée est menacé d'interception.</li>
<li><strong>Mars 2026</strong> : l'Iran tire plus de <strong>450 missiles balistiques</strong> sur Israël. Le Dôme de fer et la Fronde de David interceptent environ 92 % des projectiles visant des zones habitées.</li>
<li><strong>21 mars 2026</strong> : nouvelle série de frappes américaines sur le site nucléaire enfoui de <strong>Natanz</strong>, à nouveau avec des bombes anti-bunker GBU-57. L'Iran suspend la coopération avec l'AIEA pour les sites bombardés.</li>
<li><strong>Avril 2026</strong> : le détroit reste fermé, des négociations discrètes reprennent via le Qatar et Oman, tandis que des affrontements limités se poursuivent en mer d'Oman et au Liban.</li>
</ul>

<h2>Le programme nucléaire iranien : où en est-on ?</h2>
<p>Officiellement, l'Iran a toujours défendu un programme nucléaire <strong>exclusivement civil</strong>. Dans les faits, plusieurs éléments expliquent la crise actuelle :</p>
<ul>
<li>L'Iran enrichissait fin 2025 de l'uranium à <strong>60 %</strong>, très au-delà des besoins civils (5 %) et à un pas technique du niveau militaire (90 %).</li>
<li>Les sites de Fordo et Natanz sont enfouis à plus de 80 m sous la montagne, ce qui rend leur neutralisation très difficile sauf pour les bombes anti-bunker GBU-57 américaines — utilisées à nouveau le 21 mars 2026.</li>
<li>Après les frappes conjointes de juin 2025 puis de février-mars 2026, le retard imposé au programme est estimé entre <strong>plusieurs mois et plusieurs années</strong>, selon les sources (Pentagone, AIEA, services israéliens). Les évaluations divergent largement.</li>
<li>Depuis les frappes du 28 février 2026, Téhéran <strong>refuse à l'AIEA l'accès</strong> aux sites bombardés. Mohammad Eslami, chef de l'Organisation iranienne de l'énergie atomique, conditionne toute inspection à l'adoption de règles internationales sur les « installations attaquées militairement » et à une condamnation des frappes par l'Agence.</li>
</ul>
<p>Le dossier nucléaire n'est donc pas clos : il est <strong>en pleine recomposition</strong>. Les connaissances scientifiques n'ont pas été détruites, la volonté politique iranienne s'est peut-être durcie, et la communauté internationale reste divisée entre fermeté et retour à un cadre diplomatique de type JCPoA.</p>

<h2>La fermeture d'Ormuz fait exploser les prix de l'énergie</h2>
<p>Contrairement à juin 2025, où la fermeture était restée une menace, Téhéran l'a <strong>effectivement mise en œuvre</strong> le 2 mars 2026 en réponse aux frappes du 28 février. Les conséquences sont immédiates et massives :</p>
<ul>
<li><strong>Brent au-dessus de 100 dollars</strong> le baril dès la première semaine de mars, avec un pic observé <strong>proche de 120 dollars</strong>. Le 21 mars, le directeur exécutif de l'<strong>Agence internationale de l'énergie (AIE)</strong> qualifie cette fermeture prolongée de « <em>plus grande menace pour la sécurité énergétique mondiale de toute l'histoire</em> ».</li>
<li>Projections des analystes : environ 105 $ le baril après 1 mois, <strong>140 $ après 2 mois</strong>, autour de <strong>165 $ après 3 mois</strong> si la fermeture se prolonge.</li>
<li>Flambée des prix à la pompe et de la facture d'électricité en Europe, retour brutal de l'inflation.</li>
<li>Pression accrue sur la Banque centrale européenne et risque de remontée des taux, avec effet récessif.</li>
<li>Tensions d'approvisionnement en Asie : Chine, Inde, Japon, Corée — plusieurs pays asiatiques signalent déjà des manques.</li>
<li>Recomposition accélérée des routes énergétiques : plus de GNL américain et qatari transitant par d'autres routes, plus d'hydrocarbures russes via l'Asie.</li>
</ul>

<h2>Les enjeux pour la France</h2>
<p>La France n'est pas directement sur la ligne de front, mais la crise iranienne touche plusieurs points sensibles de la politique hexagonale :</p>
<ul>
<li><strong>Énergie</strong> : la France importe une part de son gaz via le GNL qatari, qui passe par Ormuz. La fermeture effective du détroit fait exploser les prix de l'énergie pour les ménages et l'industrie, avec un effet direct sur l'inflation.</li>
<li><strong>Diplomatie</strong> : la France est membre permanent du Conseil de sécurité de l'ONU et signataire de l'accord de Vienne de 2015 (JCPoA). Elle doit choisir entre l'alignement sur Washington, la médiation européenne avec Berlin et Londres, ou une voie plus indépendante, après la mort de Khamenei et les frappes sur Natanz.</li>
<li><strong>Défense</strong> : la marine française est présente dans la zone (base interarmées des Émirats, mission européenne Aspides, Agenor). La fermeture d'Ormuz pose directement la question du budget militaire et du partage du fardeau avec l'OTAN.</li>
<li><strong>Communautés</strong> : en France vivent une diaspora iranienne active et une communauté juive attentive à la sécurité d'Israël. Les prises de position officielles sont suivies de près, et les massacres de janvier 2026 ont ravivé la mobilisation des Iraniennes et Iraniens de France.</li>
<li><strong>Nucléaire civil</strong> : l'épisode ravive le débat intérieur sur l'indépendance énergétique via le parc nucléaire français, au moment où le débat sur les EPR2 et la place des renouvelables devient central pour la présidentielle 2027.</li>
</ul>

<h2>Les ${candidatesCount} candidats à la présidentielle 2027 face à l'Iran et à Ormuz</h2>
<p>Sur ce dossier, les clivages classiques gauche-droite ne suffisent pas. Il faut croiser au moins trois lignes de fracture : <strong>alliance occidentale vs. non-alignement</strong>, <strong>soutien à Israël vs. équidistance</strong>, et <strong>fermeté militaire vs. diplomatie et désescalade</strong>. Voici les ${candidatesCount} candidats regroupés en quatre familles.</p>

<h3>Famille 1 — Atlantistes et partisans d'une ligne ferme face à l'Iran</h3>
<p>Ces candidats considèrent que l'Iran représente une menace majeure pour la paix régionale, qu'il faut continuer à soutenir Israël face au Hezbollah et aux Gardiens de la Révolution, et rester coordonnés avec les États-Unis et l'OTAN.</p>
<ul>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> — atlantiste assumé, pro-Ukraine, ferme contre toutes les dictatures ; position claire en faveur d'une Europe de la défense alignée avec Washington face à Téhéran.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> — soutien appuyé à Israël, vision civilisationnelle du conflit ; favorable à une ligne dure contre Téhéran, y compris militaire.</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a>, <a href="/candidat/bruno-retailleau">Bruno Retailleau</a>, <a href="/candidat/xavier-bertrand">Xavier Bertrand</a> (LR) — soutien constant à Israël, fermeté sur le programme nucléaire iranien, vigilance contre l'ingérence iranienne en Europe.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a>, <a href="/candidat/gerald-darmanin">Gérald Darmanin</a>, <a href="/candidat/david-lisnard">David Lisnard</a> — fermeté sur le nucléaire iranien, sanctions ciblées, soutien à Israël tout en rappelant la nécessité d'un cadre de droit international.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> — position de gouvernance : solidarité atlantique, fermeté sur la non-prolifération, soutien politique à Israël dans son droit à la sécurité.</li>
</ul>

<h3>Famille 2 — Fermeté mais diplomatie, équilibre et désescalade</h3>
<p>Ces candidats reconnaissent la gravité du programme nucléaire iranien mais insistent sur la voie diplomatique, sur l'équilibre entre la sécurité d'Israël et les droits du peuple palestinien, et sur la nécessité de ne pas laisser les États-Unis dicter la ligne européenne.</p>
<ul>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — voix historique du refus de la guerre en Irak en 2003 ; plaide pour une médiation française et une désescalade, contre toute logique d'intervention militaire.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> — ligne centriste et européenne : retour à un JCPoA actualisé, soutien à la diplomatie plutôt qu'aux frappes.</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> — position socialiste classique : fermeté sur le nucléaire, soutien à Israël, mais refus de laisser le conflit déraper en guerre régionale.</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> — accent mis sur la diplomatie multilatérale et la coopération ONU, vigilance sur le retour à la table des négociations.</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — ligne socialiste et pro-européenne ; soutien à Israël mais fermeté sur le respect du droit international à Gaza.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a>, <a href="/candidat/delphine-batho">Delphine Batho</a> (écologistes) — priorité à la désescalade, au climat et à la sortie des énergies fossiles ; critique des frappes préventives, soutien aux mouvements démocratiques iraniens, notamment aux femmes.</li>
</ul>

<h3>Famille 3 — Souverainistes et non-alignés : une France qui parle seule</h3>
<p>Ces candidats refusent que la France s'aligne sur les États-Unis ou l'OTAN. Ils défendent une diplomatie « gaullo-mitterrandienne » ou souverainiste, et la capacité de la France à parler à tous les acteurs, y compris à Téhéran.</p>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> — refus de l'alignement automatique sur Washington ; défense de l'intérêt national français, d'un équilibre au Moyen-Orient et de la lutte contre l'islamisme radical sans ingérence militaire.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> — souverainiste historique, opposé à toute guerre « pour le compte » des États-Unis, partisan d'une diplomatie française indépendante.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Frexit, sortie de l'OTAN, neutralité stricte ; la France ne doit prendre parti ni pour l'Iran ni pour Israël, mais défendre la paix et le droit.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — expression d'un non-alignement populaire : « ce n'est pas notre guerre », priorité aux problèmes des Français.</li>
</ul>

<h3>Famille 4 — Anti-impérialistes et partisans d'une paix négociée</h3>
<p>Ces candidats voient dans l'intervention américaine et israélienne une manifestation de l'impérialisme occidental. Ils appellent à une paix négociée, à la levée des sanctions et au soutien aux sociétés civiles, en Iran comme ailleurs.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> — dénonce les frappes israélo-américaines comme des actes de guerre illégaux ; appelle à un ordre international non aligné, à la fin des guerres et au retour du droit international.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — pacifisme affirmé, critique des va-t-en-guerre, plaidoyer pour la diplomatie et pour parler aux peuples.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — refus de l'escalade militaire, soutien aux mouvements démocratiques et féministes iraniens, opposition à la logique des blocs.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — paix, désarmement, négociations ; refus d'une guerre par procuration.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — analyse anticapitaliste : la guerre sert les intérêts pétroliers et militaires, refus de tout soutien à un État impérialiste.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — dénonciation de l'hégémonie occidentale et plaidoyer pour une refondation du droit international.</li>
</ul>

<h3>Une ligne qui traverse tout le spectre : le soutien aux Iraniennes</h3>
<p>Un point rassemble presque toutes les familles : le soutien aux <strong>femmes iraniennes</strong> et au mouvement « <em>Femme, Vie, Liberté</em> » né en 2022 après la mort de Mahsa Amini. Des Écologistes à LR, en passant par LFI, le PS et Renaissance, tous les candidats ont, à des degrés divers, affiché leur solidarité avec les Iraniennes. Les différences portent sur les moyens : sanctions, soutien politique, accueil des réfugiés, diplomatie.</p>

<h2>Arguments pour une ligne ferme vs. arguments pour la diplomatie</h2>

<table>
<tr><th>Arguments pour une ligne ferme (sanctions, dissuasion, frappes)</th><th>Arguments pour la diplomatie (négociation, désescalade)</th></tr>
<tr><td>L'Iran a enrichi l'uranium à 60 %, seuil incompatible avec un usage civil.</td><td>Les frappes n'éliminent pas les connaissances scientifiques ni la volonté politique.</td></tr>
<tr><td>Le régime iranien finance le Hezbollah, les Houthis et des milices en Irak et en Syrie.</td><td>Toute guerre de grande ampleur déstabilise la région, y compris les alliés arabes modérés.</td></tr>
<tr><td>La sécurité d'Israël ne peut pas être négociée.</td><td>La sécurité durable passe par un accord vérifiable, comme le JCPoA de 2015.</td></tr>
<tr><td>Une fermeture d'Ormuz doit être rendue impossible par la présence militaire occidentale.</td><td>La meilleure protection d'Ormuz est diplomatique : ne pas donner à Téhéran de raison d'y toucher.</td></tr>
<tr><td>La France doit être fiable pour ses alliés.</td><td>La France n'est utile que si elle parle à tous les acteurs, y compris Téhéran.</td></tr>
</table>

<h2>Et vous, où vous situez-vous ?</h2>
<p>L'Iran, Ormuz et la question du nucléaire recoupent plusieurs thèmes du Quizz du Berger :</p>
<ul>
<li><a href="/theme/affaires-etrangeres">Thème : Affaires étrangères</a> — OTAN, Ukraine, Chine, construction européenne, armée européenne commune.</li>
<li><a href="/theme/climat-energie-et-ecologie">Thème : Climat, énergie et écologie</a> — nucléaire civil, énergies renouvelables, sobriété énergétique.</li>
<li><a href="/theme/economie-et-industrie">Thème : Économie et industrie</a> — dépendance énergétique, réindustrialisation, souveraineté.</li>
<li><a href="/theme/depenses-et-dette-publiques">Thème : Dépenses et dette publiques</a> — budget de la défense, arbitrages budgétaires.</li>
</ul>
<p>Répondez aux ${quizzQuestionsCount} questions et comparez-vous aux ${candidatesCount} candidats. Vous pourriez découvrir que, sur le Moyen-Orient et l'énergie, vous êtes plus proche d'un candidat auquel vous ne vous attendiez pas.</p>

<p><a href="/themes">→ Faire le quiz et découvrir quel candidat pense comme vous</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Guerre Iran-Israël et détroit d'Ormuz : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
      description: `Guerre Iran-Israël de juin 2025, programme nucléaire iranien, détroit d'Ormuz, enjeux énergétiques pour la France et positions détaillées des ${candidatesCount} candidats à la présidentielle 2027.`,
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-04-23',
      about: [
        { '@type': 'Thing', name: 'Détroit d\'Ormuz' },
        { '@type': 'Thing', name: 'Iran' },
        { '@type': 'Thing', name: 'Guerre Iran-Israël' },
        { '@type': 'Thing', name: 'Programme nucléaire iranien' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
  {
    slug: 'monvote2027-vs-quizz-du-berger',
    title: 'MonVote2027 vs Quizz du Berger : quand la formulation de la question fait tout',
    excerpt:
      "MonVote2027 propose une échelle d'accord à 5 points sur des questions… qui prennent déjà position. On décortique, on compare avec le Quizz du Berger, et on explique pourquoi la formulation compte autant que l'algorithme.",
    date: '2026-05-14',
    tag: 'Comparatif',
    content: `
<p>Un nouveau quiz politique pour la présidentielle 2027 est apparu : <a href="https://monvote2027.fr/" rel="nofollow">MonVote2027</a>. Outil citoyen indépendant, sans pub, méthodologie publique : sur le papier, tout va bien. On a regardé sous le capot, et il y a une question de fond à poser — pas sur l'algorithme, mais sur <strong>la façon dont les questions sont écrites</strong>.</p>

<h2>Comment fonctionne MonVote2027</h2>
<p>Le principe est classique : une <strong>échelle de Likert à 5 points</strong> (Tout à fait d'accord, Plutôt d'accord, Partagé/Nuancé, Plutôt pas d'accord, Pas du tout d'accord), plus une option "Passer / Je ne sais pas". Deux formats sont proposés : 20 questions (quiz rapide) ou 100 questions (quiz complet), pour 23 candidats à la présidentielle.</p>
<p>L'algorithme calcule un score de concordance linéaire : votre réponse est comparée à la position connue du candidat, et la distance est convertie en score entre −1 et +1. Les positions des candidats sont sourcées depuis leurs programmes, déclarations publiques, votes au Parlement et interviews. Méthodologiquement, c'est propre.</p>

<h2>Le vrai sujet : la formulation des questions</h2>
<p>Voici deux questions issues du quiz :</p>
<blockquote><em>"Il faut interdire progressivement l'élevage intensif."</em></blockquote>
<blockquote><em>"La France doit accueillir davantage de demandeurs d'asile."</em></blockquote>
<p>Lisez-les une deuxième fois. Vous remarquez ? <strong>Ce ne sont pas des questions, ce sont des affirmations</strong>. Et pas des affirmations neutres : elles arrivent déjà avec une direction, une position, un parti pris.</p>
<ul>
<li><strong>"Interdire progressivement l'élevage intensif"</strong> — pourquoi <em>progressivement</em> ? Pourquoi pas "tout de suite", "jamais", ou "seulement dans certains cas" ? L'option de base, déjà, c'est l'interdiction. On vous demande juste à quel rythme.</li>
<li><strong>"Accueillir davantage de demandeurs d'asile"</strong> — bah… <em>ça dépend</em>. Combien ? Dans quelles conditions ? Avec quel système d'instruction des dossiers ? La question écrase tout ça dans un curseur d'accord.</li>
</ul>

<h2>Pourquoi c'est un problème, même avec 5 nuances</h2>
<p>L'échelle de Likert est très utilisée en sciences sociales, et elle est utile <em>quand la question est neutre</em>. Quand la question prend déjà position, l'échelle ne fait que mesurer à quel point vous adhérez ou résistez à <strong>la formulation choisie par l'auteur du quiz</strong> — pas à votre propre pensée.</p>
<p>Concrètement, sur "Il faut interdire progressivement l'élevage intensif" :</p>
<ul>
<li>Vous êtes pour l'élevage intensif tel quel ? Vous êtes "Pas du tout d'accord".</li>
<li>Vous voulez l'interdire tout de suite, pas progressivement ? Vous êtes… aussi "Pas du tout d'accord" ? Ou alors "Plutôt d'accord" ? Personne ne sait.</li>
<li>Vous voulez le réformer profondément mais pas l'interdire ? Vous êtes "Partagé/Nuancé", ce qui ne veut rien dire.</li>
</ul>
<p>Trois opinions très différentes, voire opposées, finissent dans la même case. C'est dommage.</p>

<h2>L'approche du Quizz du Berger : pas une échelle, des réponses</h2>
<p>Le Quizz du Berger fait un autre choix : la question est posée le plus neutre possible, et on vous propose <strong>jusqu'à 6 réponses substantielles</strong>, qui couvrent l'éventail réel des positions des Français. Pas "d'accord/pas d'accord", mais des options concrètes.</p>
<p>Sur l'élevage intensif, par exemple, plutôt que "Il faut l'interdire progressivement, oui ou non ?", on vous propose une grille du type : "Maintenir tel quel" / "Améliorer les conditions sans changer le modèle" / "Sortir de l'élevage intensif sur 20 ans" / "Interdire dès maintenant" / "Supprimer l'élevage tout court". <strong>Chaque réponse est une position autonome</strong>, pas un degré d'adhésion à une seule.</p>
<p>Résultat : vous ne vous positionnez pas <em>par rapport à</em> une affirmation préchargée. Vous choisissez la réponse qui ressemble vraiment à ce que vous pensez.</p>

<h2>Tableau comparatif</h2>
<table>
<tr><th>Critère</th><th>MonVote2027</th><th>Quizz du Berger</th></tr>
<tr><td>Format des questions</td><td>Affirmation à valider/rejeter</td><td><strong>Question neutre + réponses substantielles</strong></td></tr>
<tr><td>Options de réponse</td><td>5 points d'accord (Likert)</td><td><strong>3 à 6 réponses concrètes</strong> par question</td></tr>
<tr><td>Nombre de questions</td><td>20 (rapide) ou 100 (complet)</td><td><strong>${quizzQuestionsCount} questions</strong> sur ${quizzThemesCount} thèmes</td></tr>
<tr><td>Candidats</td><td>23</td><td><strong>26</strong></td></tr>
<tr><td>Résultats par thème</td><td>Oui (pondération possible)</td><td><strong>Oui, détaillé par thème</strong></td></tr>
<tr><td>Sources des positions candidats</td><td>Programmes, déclarations, votes</td><td>Programmes, déclarations, votes</td></tr>
<tr><td>Open-source</td><td>Non documenté</td><td><strong>Oui</strong></td></tr>
</table>

<h2>Ce qui n'enlève rien au mérite de MonVote2027</h2>
<p>Soyons honnêtes : MonVote2027 est un projet sérieux. La méthodologie est publiée, les sources des positions des candidats sont citées, l'outil est gratuit et sans pub, et l'algorithme est transparent. C'est mille fois mieux que la moyenne des "tests politiques" de magazine.</p>
<p>Et il faut aussi reconnaître une chose : <strong>l'utilisateur doit, qu'on le veuille ou non, se positionner par rapport aux messages que font passer les médias et les politiques</strong>. "Faut-il accueillir davantage de demandeurs d'asile ?" est <em>littéralement</em> la formulation utilisée dans les débats publics. Forcer les gens à se prononcer sur ces formulations toutes faites a un intérêt : ça les met face au vocabulaire du débat tel qu'il existe.</p>

<h2>Mais un quiz devrait aider à penser par soi-même</h2>
<p>Notre conviction, derrière le Quizz du Berger, c'est qu'un outil d'aide au vote ne devrait pas se contenter de mesurer l'adhésion à des formulations toutes faites. Il devrait <strong>élargir le champ des possibles</strong> — montrer que sur n'importe quel sujet, il y a souvent 4 ou 5 positions cohérentes, pas juste "pour" ou "contre" avec quelques nuances.</p>
<p>C'est pour ça qu'on a fait le choix des réponses substantielles plutôt que de l'échelle d'accord. C'est plus long à concevoir, plus dur à équilibrer, mais ça respecte mieux la complexité de ce que pensent réellement les gens.</p>

<h2>Notre recommandation</h2>
<p>Faites les deux. MonVote2027 vous donnera une lecture rapide de votre positionnement <em>face au discours politique tel qu'il s'exprime aujourd'hui</em>. Le Quizz du Berger vous donnera une lecture plus fine de <em>ce que vous pensez vraiment</em>, indépendamment du cadrage médiatique. Les deux exercices sont complémentaires — et instructifs surtout quand les résultats divergent.</p>
<p>La politique n'est ni noire ni blanche. Détendez-vous, et réfléchissez.</p>

<p><a href="/themes">→ Faire le Quizz du Berger</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'MonVote2027 vs Quizz du Berger : quand la formulation de la question fait tout',
      description:
        "Comparatif méthodologique entre MonVote2027 (échelle de Likert sur affirmations engagées) et le Quizz du Berger (réponses substantielles sur questions ouvertes) pour la présidentielle 2027.",
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-05-14',
      about: [
        { '@type': 'Thing', name: 'MonVote2027' },
        { '@type': 'Thing', name: 'Quiz politique' },
        { '@type': 'Thing', name: 'Échelle de Likert' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
];
