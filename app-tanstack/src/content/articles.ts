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
<p>${candidatesCount} candidats potentiels à la présidentielle 2027. Plutôt que de les classer sur un axe gauche-droite, on les liste ici par ordre alphabétique, avec un lien vers leur page de positions thème par thème.</p>

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

<h2>Comparez-les à vous</h2>
<p>Chaque candidat a des positions nuancées sur des dizaines de sujets. Le Quizz du Berger permet de comparer vos réponses aux leurs sur ${quizzThemesCount} thèmes et ${quizzQuestionsCount} questions, thème par thème. Le résultat est parfois différent de ce qu'on imagine.</p>
<p><a href="/themes">→ Faire le quiz</a></p>
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

<h2>Plusieurs réponses possibles, pas juste d'accord / pas d'accord</h2>
<p>Certains quiz politiques fonctionnent en oui/non ou en échelle d'accord. Le Quizz du Berger propose 3 à 6 réponses concrètes par question, chacune étant une position cohérente. On essaie de couvrir l'éventail des positions qu'on entend dans le débat, pour que chacun puisse retrouver la sienne sans avoir à choisir un degré d'adhésion à une formulation préchargée.</p>

<h2>Les résultats thème par thème</h2>
<p>Les résultats sont aussi affichés <strong>thème par thème</strong>, en plus du résultat global. On peut être proche d'un candidat sur l'économie et d'un autre sur les questions de société, et c'est intéressant à voir séparément.</p>

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
<p>Voici les 10 thèmes qui vont structurer le débat de la présidentielle 2027, avec un lien direct vers la page du Quizz du Berger pour voir les positions des candidats sur chacun.</p>

<h2>1. Immigration et identité</h2>
<p>La question migratoire structure le débat depuis des années. Sur la régularisation, les quotas et le droit du sol, les ${candidatesCount} candidats ont des positions très variées.</p>
<p><a href="/theme/demographie-et-question-migratoire">→ Les positions des candidats sur l'immigration</a></p>

<h2>2. Pouvoir d'achat et vie quotidienne</h2>
<p>Inflation, prix de l'énergie, logement : le pouvoir d'achat reste la préoccupation n°1 des Français.</p>
<p><a href="/theme/pouvoir-dachat-et-vie-quotidienne">→ Les positions des candidats sur le pouvoir d'achat</a></p>

<h2>3. Climat, énergie et écologie</h2>
<p>Nucléaire, énergies renouvelables, transition écologique. Un thème qui croise économie, industrie, agriculture et géopolitique.</p>
<p><a href="/theme/climat-energie-et-ecologie">→ Les positions des candidats sur le climat</a></p>

<h2>4. Travail, chômage et retraites</h2>
<p>L'abrogation de la retraite à 64 ans, le plein emploi et le temps de travail concernent tous les actifs.</p>
<p><a href="/theme/travail-chomage-retraite">→ Les positions des candidats sur le travail et la retraite</a></p>

<h2>5. Sécurité et justice</h2>
<p>Police, vidéosurveillance, peines planchers, délinquance : l'un des thèmes les plus clivants de la campagne.</p>
<p><a href="/theme/police-justice-et-securite">→ Les positions des candidats sur la sécurité</a></p>

<h2>6. Santé</h2>
<p>Déserts médicaux, euthanasie, avenir de l'hôpital public : le système de santé revient dans tous les programmes.</p>
<p><a href="/theme/sante">→ Les positions des candidats sur la santé</a></p>

<h2>7. Éducation et recherche</h2>
<p>Réforme de l'école, uniforme, programmes, universités, financement de la recherche.</p>
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

<h2>Et les autres thèmes</h2>
<p>Le Quizz du Berger en couvre ${quizzThemesCount} au total, sur ${quizzQuestionsCount} questions. Vous pouvez répondre uniquement aux thèmes qui vous intéressent.</p>
<p><a href="/themes">→ Faire le quiz</a></p>
`,
  },
  {
    slug: 'alternative-elyze-2027',
    title: 'Elyze et Quizz du Berger : les différences pour 2027',
    excerpt:
      "Elyze a popularisé les quiz politiques en 2022 avec son interface façon Tinder. Le Quizz du Berger fait des choix de design différents : plus de nuances par réponse, résultats par thème, comparaison avec amis. Voici les différences.",
    date: '2026-02-11',
    tag: 'Comparatif',
    content: `
<p>Elyze a popularisé les quiz politiques en France lors de la présidentielle 2022, avec son interface façon Tinder et son côté ludique. Pour 2027, le Quizz du Berger fait des choix de design différents. À vous de juger ce que vous préférez.</p>

<h2>Tableau comparatif</h2>

<table>
<tr><th>Critère</th><th>Quizz du Berger</th><th>Elyze</th></tr>
<tr><td>Nombre de questions</td><td>${quizzQuestionsCount}</td><td>~300</td></tr>
<tr><td>Format des réponses</td><td>3 à 6 réponses par question</td><td>D'accord / Pas d'accord</td></tr>
<tr><td>Thèmes</td><td>${quizzThemesCount} thèmes, résultats par thème</td><td>Mélangés, résultat global</td></tr>
<tr><td>Comparaison avec amis</td><td>Oui</td><td>Non</td></tr>
<tr><td>Candidats</td><td>${candidatesCount}</td><td>Variable</td></tr>
<tr><td>Open-source</td><td>Oui</td><td>Non</td></tr>
</table>

<h2>Réponses oui/non ou réponses substantielles</h2>
<p>Elyze fonctionne sur du "d'accord / pas d'accord" pour chaque carte. C'est rapide et lisible. Le Quizz du Berger propose 3 à 6 réponses concrètes par question, chacune étant une position cohérente plutôt qu'un degré d'adhésion. Le choix entre les deux dépend de ce que vous cherchez : rapide et fun, ou plus détaillé.</p>

<h2>Résultat global ou résultat par thème</h2>
<p>Avec Elyze, vous obtenez un classement global. Avec le Quizz du Berger, vous obtenez aussi un classement <strong>thème par thème</strong>. Utile si vous pensez par exemple comme un candidat sur l'économie et comme un autre sur la sécurité.</p>

<h2>Comparer ses résultats avec ses amis</h2>
<p>Sur le Quizz du Berger, vous pouvez enregistrer vos résultats sous un pseudonyme et comparer avec vos amis. C'est l'occasion d'une discussion qui part de vraies réponses plutôt que d'étiquettes.</p>

<h2>Ce qui s'est passé en 2022</h2>
<p>Le Quizz du Berger a été utilisé par plus de 207 000 personnes lors de la présidentielle 2022, avec 9,7 millions de réponses. Un quart des utilisateurs a répondu à l'ensemble des questions.</p>

<p><a href="/themes">→ Essayer le Quizz du Berger</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Elyze et Quizz du Berger : les différences pour 2027',
      description:
        "Comparatif entre le Quizz du Berger et Elyze pour la présidentielle 2027.",
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-02-11',
    },
  },
  {
    slug: 'comparatif-quiz-politiques-2027',
    title: 'Les quiz politiques de la présidentielle 2027 : tour d\'horizon',
    excerpt:
      'Quizz du Berger, Elyze, Boussole Présidentielle, MonVote2027 : quatre approches différentes pour se positionner. Voici les différences, à vous de choisir.',
    date: '2026-02-11',
    tag: 'Comparatif',
    content: `
<p>Plusieurs quiz politiques existent en ligne pour la présidentielle 2027. Chacun a sa philosophie. Voici un tour d'horizon.</p>

<h3>Le Quizz du Berger</h3>
<p><strong>Format :</strong> ${quizzQuestionsCount} questions sur ${quizzThemesCount} thèmes, 3 à 6 réponses concrètes par question, résultats par thème, comparaison avec amis, open-source.</p>
<p><strong>Approche :</strong> chaque question propose plusieurs réponses substantielles, chacune étant une position cohérente. Plus long à remplir, mais on peut ne répondre qu'aux thèmes qui nous intéressent.</p>

<h3>Elyze</h3>
<p><strong>Format :</strong> interface façon Tinder, swipe d'accord / pas d'accord sur chaque carte.</p>
<p><strong>Approche :</strong> rapide, ludique, très populaire. Pas de résultats par thème, format binaire qui ne capture pas les nuances.</p>

<h3>La Boussole Présidentielle (Sciences Po)</h3>
<p><strong>Format :</strong> questionnaire académique, restitution sur deux axes (gauche-droite, libéral-autoritaire).</p>
<p><strong>Approche :</strong> méthodologie de science politique classique, utile pour se situer dans l'espace politique. Moins de granularité par thème.</p>

<h3>MonVote2027</h3>
<p><strong>Format :</strong> 20 ou 100 questions, échelle d'accord à 5 points sur chaque affirmation, 23 candidats.</p>
<p><strong>Approche :</strong> méthodologie publique, sources des positions des candidats citées. Les questions sont parfois des affirmations qui prennent déjà position, voir <a href="/blog/monvote2027-vs-quizz-du-berger">notre comparatif détaillé</a>.</p>

<h2>Lequel choisir</h2>
<p>Ça dépend de ce que vous cherchez. Si vous voulez quelque chose de rapide et fun : Elyze. Pour vous situer sur un axe politique classique : la Boussole. Pour confronter vos opinions aux formulations du débat public : MonVote2027. Pour une lecture détaillée par thème avec des réponses substantielles : le Quizz du Berger. Ils sont complémentaires, faire les deux ou trois donne souvent des résultats intéressants à comparer.</p>

<p><a href="/themes">→ Essayer le Quizz du Berger</a></p>
`,
  },
  {
    slug: 'quizz-du-berger-vs-boussole-presidentielle',
    title: 'Boussole Présidentielle et Quizz du Berger : deux approches différentes',
    excerpt:
      'La Boussole Présidentielle de Sciences Po vous situe sur deux axes politiques. Le Quizz du Berger compare vos réponses thème par thème aux candidats. Deux philosophies, deux usages.',
    date: '2026-02-11',
    tag: 'Comparatif',
    content: `
<p>La Boussole Présidentielle de Sciences Po et le Quizz du Berger sont deux outils sérieux pour la présidentielle 2027. Leurs approches sont différentes, et ils répondent à des questions différentes.</p>

<h2>Deux philosophies</h2>
<p>La <strong>Boussole Présidentielle</strong> vous situe sur deux axes : gauche-droite et libéral-autoritaire. C'est l'approche classique de la science politique, qui place chaque personne et chaque candidat dans un espace bidimensionnel. Utile pour avoir une vue d'ensemble de son positionnement.</p>
<p>Le <strong>Quizz du Berger</strong> ne vous place pas sur un axe. Il compare vos réponses question par question à celles des candidats, et affiche les résultats <strong>thème par thème</strong>. Pas de catégorisation, juste une mesure de proximité directe.</p>

<h2>Quand l'approche thème par thème est plus utile</h2>
<p>Sur un axe gauche-droite et libéral-autoritaire, on est forcément réduit à une position globale. En thèmes séparés, on peut être :</p>
<ul>
<li>Libéral sur l'économie mais conservateur sur les questions de société.</li>
<li>Écologiste mais souverainiste sur l'Europe.</li>
<li>Progressiste sur la santé mais sécuritaire sur la justice.</li>
</ul>
<p>Avec ${quizzThemesCount} thèmes, le Quizz du Berger garde cette granularité.</p>

<h2>Faites les deux</h2>
<p>La Boussole donne une vue d'ensemble, le Quizz du Berger donne le détail thème par thème. Les deux sont complémentaires.</p>

<p><a href="/themes">→ Faire le Quizz du Berger</a></p>
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
<p>L'accord UE-Mercosur a été signé le 17 janvier 2026, huit jours après que les États membres de l'UE l'ont validé malgré l'opposition de la France. Quatre jours plus tard, le Parlement européen saisissait la Cour de justice de l'UE, ce qui suspend la ratification. En novembre 2025, l'Assemblée nationale avait voté contre le texte par 244 voix contre 1. Sur les ${candidatesCount} candidats à la présidentielle 2027, aucun ne défend la ratification de l'accord en l'état.</p>

<h2>Mercosur : c'est quoi, exactement ?</h2>
<p>Le <strong>Mercosur</strong> (<em>Mercado Común del Sur</em>, « Marché commun du Sud ») est une union douanière créée en 1991 par le traité d'Asunción. Elle regroupe aujourd'hui <strong>quatre pays membres à part entière</strong> : l'Argentine, le Brésil, le Paraguay et l'Uruguay. La Bolivie est en cours d'adhésion, le Venezuela est suspendu depuis 2016, et plusieurs pays (Chili, Colombie, Pérou, Équateur, Guyana, Suriname) sont associés.</p>
<p>Ensemble, les pays du Mercosur représentent environ <strong>270 millions d'habitants</strong> et la 5ᵉ économie mondiale si on les agrège. Ils exportent surtout des matières premières et des produits agricoles : bœuf, soja, maïs, sucre, volaille et éthanol.</p>

<h2>L'accord UE-Mercosur : 25 ans de négociations</h2>
<p>L'accord UE-Mercosur est un <strong>traité de libre-échange</strong> négocié entre l'Union européenne et les quatre pays du Mercosur. Il supprime ou réduit les droits de douane sur l'essentiel des échanges commerciaux entre les deux blocs et ouvre des quotas agricoles en Europe.</p>
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
<p>Les ONG environnementales pointent le risque d'accélération de la <strong>déforestation amazonienne</strong> : plus d'exportations agricoles = plus de terres cultivées = plus de forêt défrichée. L'accord prévoit bien des engagements sur l'Accord de Paris, mais les critiques jugent les mécanismes de contrôle insuffisants. Les ONG réclament des <strong>clauses miroirs</strong>, c'est-à-dire l'obligation pour les produits importés de respecter les mêmes normes sanitaires et environnementales que les produits européens.</p>

<h3>3. L'industrie et les exportateurs</h3>
<p>À l'inverse, l'industrie automobile allemande, le secteur du vin, des spiritueux, du luxe et de la chimie voient dans l'accord une <strong>opportunité de croissance</strong>. Le Medef, la CCI France International et les grands groupes exportateurs soutiennent la signature, arguant que refuser l'accord reviendrait à laisser le marché sud-américain à la Chine.</p>

<h3>4. La souveraineté alimentaire</h3>
<p>Au-delà du clivage gauche-droite, la question de l'<strong>indépendance alimentaire</strong> traverse tout le spectre politique. Pour beaucoup, importer massivement de la nourriture d'un autre continent est à la fois un non-sens écologique (transport) et stratégique (dépendance).</p>

<h2>Le Mercosur à l'Assemblée nationale</h2>
<p>Le <strong>26 novembre 2024</strong>, l'Assemblée nationale française a voté une première résolution rejetant l'accord UE-Mercosur en l'état, à une très large majorité transpartisane (<strong>484 voix pour, 70 contre</strong>). Ont voté contre l'accord : le Rassemblement National, La France Insoumise, le Parti Socialiste, Les Écologistes, le Parti Communiste, LR, les non-inscrits et une majorité du groupe Renaissance. Ce vote n'a pas de valeur juridique contraignante mais exprime la volonté politique de la représentation nationale.</p>
<p>Côté Sénat, une résolution similaire avait été adoptée le <strong>5 novembre 2024</strong>. Fin 2024, le gouvernement français a réaffirmé officiellement son opposition à l'accord « en l'état ».</p>
<p>En <strong>novembre 2025</strong>, à la veille des votes européens décisifs, l'Assemblée nationale a récidivé avec une <strong>seconde résolution à la quasi-unanimité</strong> (244 voix pour, 1 contre), appelant le gouvernement à adopter une « minorité de blocage » au Conseil de l'UE. <strong>Le groupe macroniste a été le seul à s'abstenir</strong>, face à tous les autres groupes.</p>
<p>Malgré la pression parlementaire française, la France n'est pas parvenue à réunir une minorité de blocage suffisante au Conseil de l'UE le 9 janvier 2026. L'accord a donc été formellement signé le 17 janvier 2026 par Ursula von der Leyen, avant d'être partiellement suspendu par la saisine de la Cour de justice de l'UE le 21 janvier.</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Le débat Mercosur traverse les clivages habituels gauche-droite. Pour y voir clair, on a regroupé les ${candidatesCount} candidats en quatre familles selon leurs positions publiques et leurs réponses aux questions du Quizz du Berger sur le <a href="/question-politique/reindustrialisation-france">libre-échange</a> et l'<a href="/theme/agriculture-et-alimentation">indépendance alimentaire</a>.</p>

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
<p>Sur les ${candidatesCount} candidats du Quizz du Berger, aucun ne défend la ratification de l'accord UE-Mercosur dans sa version actuelle. Les différences portent sur l'intensité du rejet (refus de principe ou demande de renégociation) et sur les motifs (souveraineté, écologie, agriculture, libéralisme équitable). Cette quasi-unanimité française contraste avec la position de l'Allemagne, de l'Espagne et du Portugal, favorables à l'accord, qui ont permis sa signature au Conseil de l'UE le 9 janvier 2026 malgré la pression française.</p>

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

<h2>Pour aller plus loin</h2>
<p>Le Mercosur n'est qu'une pièce d'un débat plus large sur le libre-échange, la souveraineté alimentaire et le modèle agricole français. Sur le Quizz du Berger, les thèmes qui touchent à ces sujets :</p>
<ul>
<li><a href="/theme/economie-et-industrie">Économie et industrie</a> — libre-échange, réindustrialisation, protectionnisme.</li>
<li><a href="/theme/agriculture-et-alimentation">Agriculture et alimentation</a> — pesticides, bio, indépendance alimentaire, élevage.</li>
<li><a href="/theme/climat-energie-et-ecologie">Climat, énergie et écologie</a> — la cohérence climatique de l'accord.</li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
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
<p>Le 30 janvier 2026, le ministère de la Justice américain a publié plus de 3 millions de pages de documents sur Jeffrey Epstein. Trois semaines plus tard, le parquet de Paris rouvrait son enquête sur les associés français du financier, et le Parquet national financier ouvrait une procédure visant Jack Lang, cité 673 fois dans ces documents. L'affaire est américaine, mais elle a désormais un volet français, et elle touche à des sujets que les ${candidatesCount} candidats à la présidentielle 2027 traitent tous : impunité des puissants, protection des mineurs, indépendance de la justice, liberté de la presse.</p>

<h2>Affaire Epstein : c'est quoi, en résumé ?</h2>
<p>L'<strong>affaire Epstein</strong> désigne l'ensemble des enquêtes, procès et révélations autour du financier américain <strong>Jeffrey Epstein</strong> (1953-2019) et de sa complice <strong>Ghislaine Maxwell</strong>. Tous deux sont accusés d'avoir organisé pendant plus de vingt ans un réseau de trafic sexuel de mineures, en recrutant, transportant et livrant des adolescentes à Epstein et à son cercle d'amis puissants, dans ses différentes résidences (Manhattan, Palm Beach, Nouveau-Mexique, et son île privée de Little Saint James). Ghislaine Maxwell a été condamnée pour ces faits ; Epstein est mort avant son procès.</p>
<p>L'affaire croise plusieurs sujets : justice pénale, violences sexuelles sur mineurs, transparence judiciaire, influence politique et financière, liberté de la presse.</p>

<h2>Qui était Jeffrey Epstein ?</h2>
<p>Jeffrey Epstein est un financier américain né en 1953 à Brooklyn. Ancien professeur de mathématiques, il devient banquier d'affaires chez Bear Stearns dans les années 1970, avant de créer sa propre société de gestion de fortune réservée aux clients pesant plus d'un milliard de dollars. Son patrimoine estimé à sa mort : <strong>plus de 500 millions de dollars</strong>. Son réseau mondain, aussi, est immense : il fréquente des milliardaires, des universitaires de Harvard et du MIT, des personnalités politiques (dont plusieurs présidents américains) et des membres de familles royales européennes.</p>

<h2>Chronologie de l'affaire Epstein</h2>
<ul>
<li><strong>2005</strong> : la police de Palm Beach (Floride) ouvre une enquête après le témoignage d'une mère de victime mineure.</li>
<li><strong>2008</strong> : Epstein plaide coupable dans un accord controversé (« non-prosecution agreement ») négocié par le procureur Alexander Acosta. Il purge 13 mois avec permissions quotidiennes.</li>
<li><strong>2018</strong> : le <em>Miami Herald</em>, via l'enquête de la journaliste <strong>Julie K. Brown</strong>, publie la série « Perversion of Justice » qui relance l'affaire.</li>
<li><strong>6 juillet 2019</strong> : Epstein est arrêté à New York pour trafic sexuel de mineures.</li>
<li><strong>10 août 2019</strong> : Epstein est retrouvé mort dans sa cellule du Metropolitan Correctional Center. Sa mort est officiellement classée « suicide par pendaison », une conclusion contestée par une partie de sa famille et de l'opinion publique.</li>
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
<p>Figurer dans l'un de ces documents ne vaut pas accusation. La présence d'un nom peut simplement signaler une relation professionnelle, mondaine ou une fréquentation ponctuelle.</p>

<h2>Les « Epstein files » : que révèlent les documents judiciaires ?</h2>
<p>Les documents descellés en 2024, 2025 puis massivement en <strong>janvier 2026</strong> révèlent :</p>
<ul>
<li>L'ampleur du <strong>réseau de recrutement</strong> de victimes, souvent mineures, par Ghislaine Maxwell et d'autres complices.</li>
<li>La <strong>complaisance de certaines autorités</strong> locales américaines, notamment lors de l'accord de 2008.</li>
<li>Les <strong>liens entre Epstein et plusieurs institutions académiques et financières</strong> (Harvard, MIT, banques d'affaires).</li>
<li>Des <strong>témoignages directs de victimes</strong> citant des hommes puissants, dont le prince Andrew d'York, qui a réglé à l'amiable une plainte civile pour 12 millions de livres en 2022, avant d'être arrêté le <strong>18 février 2026</strong> au Royaume-Uni pour soupçons de partage de documents confidentiels avec Epstein.</li>
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
<p>L'ancien ministre de la Culture de François Mitterrand <strong>Jack Lang</strong> est cité <strong>673 fois</strong> dans les « Epstein Files » publiés le 30 janvier 2026.</p>
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

<h2>Les enjeux soulevés par l'affaire</h2>
<p>L'affaire touche à plusieurs sujets qui dépassent le seul cas pénal :</p>
<ul>
<li><strong>L'impunité des puissants</strong> : la justice a-t-elle les moyens de poursuivre des hommes dotés d'un patrimoine, d'un réseau et d'une armée d'avocats ?</li>
<li><strong>La protection des mineurs</strong> dans des industries où la porosité est forte : mannequinat, cinéma, nuit, élites financières.</li>
<li><strong>Le rôle du journalisme d'investigation</strong> : sans le travail de Julie K. Brown et du <em>Miami Herald</em>, l'affaire ne serait jamais ressortie.</li>
<li><strong>La culture du silence</strong> autour des violences sexuelles, avec des victimes qui ont mis parfois 20 ans à être écoutées.</li>
<li><strong>La transparence judiciaire</strong> : faut-il publier plus, et plus vite, les documents liés aux affaires touchant les personnalités publiques ?</li>
</ul>

<h2>Les ${candidatesCount} candidats à la présidentielle 2027 et les enjeux soulevés par l'affaire Epstein</h2>
<p>Peu de candidats ont commenté directement l'affaire Epstein, essentiellement américaine. En revanche, les <strong>sujets qu'elle soulève</strong> traversent tous les programmes : impunité des élites, protection des mineurs, indépendance de la justice, liberté de la presse. Les ${candidatesCount} candidats du Quizz du Berger se positionnent sur ces enjeux selon quatre axes.</p>

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
<p>L'affaire Epstein n'aurait jamais ressurgi sans le travail de presse au long cours. Tous les candidats reconnaissent l'importance de cette liberté, avec des intensités variables.</p>
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
<p>C'est l'angle le plus directement lié à l'affaire. Le Quizz du Berger consacre un thème entier à la corruption et au lobbying, avec des positions tranchées.</p>
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

<h2>Pour aller plus loin</h2>
<p>Les ${quizzQuestionsCount} questions du Quizz du Berger vous permettent de comparer vos positions à celles des ${candidatesCount} candidats sur ces thèmes.</p>

<p><a href="/themes">→ Faire le quiz</a></p>
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
<p>Le 2 mars 2026, l'Iran a fermé le <strong>détroit d'Ormuz</strong>, par où passe environ 20 % du pétrole mondial. Le Brent a franchi les 100 dollars dans la semaine, avec un pic proche de 120. Deux jours plus tôt, une opération américano-israélienne avait tué le Guide suprême Ali Khamenei ; en janvier, la répression des manifestations avait fait plusieurs milliers de morts. Cette <strong>guerre Iran-Israël-États-Unis</strong> pèse directement sur la facture énergétique des Français, et les ${candidatesCount} candidats à la présidentielle 2027 en tirent des conclusions opposées.</p>

<h2>Le détroit d'Ormuz : c'est quoi ?</h2>
<p>Le <strong>détroit d'Ormuz</strong> est un bras de mer de <strong>55 km de large</strong> (à son point le plus resserré, seulement 33 km) qui relie le golfe Persique au golfe d'Oman et à l'océan Indien. Il borde au nord l'Iran, au sud le sultanat d'Oman et les Émirats arabes unis.</p>
<p>C'est l'un des plus importants passages stratégiques de la planète :</p>
<ul>
<li><strong>Environ 20 % du pétrole mondial</strong> y transite chaque jour (soit près de <strong>20 millions de barils</strong>).</li>
<li><strong>Près d'un tiers du gaz naturel liquéfié (GNL) mondial</strong> y passe, notamment depuis le Qatar.</li>
<li>Les principaux fournisseurs du monde (Arabie saoudite, Iran, Irak, Koweït, Émirats, Qatar) exportent tous par ce seul couloir.</li>
</ul>
<p>Toute fermeture, même partielle et temporaire, fait immédiatement exploser les cours mondiaux du pétrole et du gaz, avec un effet direct sur l'inflation en Europe et sur la facture énergétique des ménages français.</p>

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
<li><strong>28 février 2026</strong> : les États-Unis et Israël lancent une opération conjointe massive contre l'Iran : frappes coordonnées sur des dizaines de sites militaires, les stocks de missiles, les lanceurs et les installations nucléaires. Le <strong>Guide suprême Ali Khamenei est tué</strong> pendant l'attaque ; un conseil provisoire prend le contrôle du régime. Donald Trump affirme publiquement que l'objectif inclut un <strong>changement de régime</strong>, en plus de l'arrêt du programme nucléaire.</li>
<li><strong>1er mars 2026</strong> : le front libanais s'ouvre. Tsahal lance une campagne de bombardements contre le Hezbollah. Une frappe de missile iranien sur la ville de <strong>Beit Shemesh</strong> tue 9 civils israéliens, le bilan le plus lourd côté civils depuis le début de la guerre.</li>
<li><strong>2 mars 2026</strong> : un haut responsable des Gardiens de la Révolution annonce officiellement la <strong>fermeture du détroit d'Ormuz</strong>. Tout navire tentant la traversée est menacé d'interception.</li>
<li><strong>Mars 2026</strong> : l'Iran tire plus de <strong>450 missiles balistiques</strong> sur Israël. Le Dôme de fer et la Fronde de David interceptent environ 92 % des projectiles visant des zones habitées.</li>
<li><strong>21 mars 2026</strong> : nouvelle série de frappes américaines sur le site nucléaire enfoui de <strong>Natanz</strong>, à nouveau avec des bombes anti-bunker GBU-57. L'Iran suspend la coopération avec l'AIEA pour les sites bombardés.</li>
<li><strong>Avril 2026</strong> : le détroit reste fermé, des négociations discrètes reprennent via le Qatar et Oman, tandis que des affrontements limités se poursuivent en mer d'Oman et au Liban.</li>
</ul>

<h2>Le programme nucléaire iranien : où en est-on ?</h2>
<p>Officiellement, l'Iran a toujours défendu un programme nucléaire <strong>exclusivement civil</strong>. Dans les faits, plusieurs éléments expliquent la crise actuelle :</p>
<ul>
<li>L'Iran enrichissait fin 2025 de l'uranium à <strong>60 %</strong>, très au-delà des besoins civils (5 %) et à un pas technique du niveau militaire (90 %).</li>
<li>Les sites de Fordo et Natanz sont enfouis à plus de 80 m sous la montagne, ce qui rend leur neutralisation très difficile sauf pour les bombes anti-bunker GBU-57 américaines, utilisées à nouveau le 21 mars 2026.</li>
<li>Après les frappes conjointes de juin 2025 puis de février-mars 2026, le retard imposé au programme est estimé entre <strong>plusieurs mois et plusieurs années</strong>, selon les sources (Pentagone, AIEA, services israéliens). Les évaluations divergent largement.</li>
<li>Depuis les frappes du 28 février 2026, Téhéran <strong>refuse à l'AIEA l'accès</strong> aux sites bombardés. Mohammad Eslami, chef de l'Organisation iranienne de l'énergie atomique, conditionne toute inspection à l'adoption de règles internationales sur les « installations attaquées militairement » et à une condamnation des frappes par l'Agence.</li>
</ul>
<p>Le dossier nucléaire n'est donc pas clos. Les connaissances scientifiques n'ont pas été détruites, la volonté politique iranienne s'est peut-être durcie, et la communauté internationale reste divisée entre fermeté et retour à un cadre diplomatique de type JCPoA.</p>

<h2>La fermeture d'Ormuz fait exploser les prix de l'énergie</h2>
<p>Contrairement à juin 2025, où la fermeture était restée une menace, Téhéran l'a <strong>effectivement mise en œuvre</strong> le 2 mars 2026 en réponse aux frappes du 28 février. Les conséquences sont immédiates et massives :</p>
<ul>
<li><strong>Brent au-dessus de 100 dollars</strong> le baril dès la première semaine de mars, avec un pic observé <strong>proche de 120 dollars</strong>. Le 21 mars, le directeur exécutif de l'<strong>Agence internationale de l'énergie (AIE)</strong> qualifie cette fermeture prolongée de « <em>plus grande menace pour la sécurité énergétique mondiale de toute l'histoire</em> ».</li>
<li>Projections des analystes : environ 105 $ le baril après 1 mois, <strong>140 $ après 2 mois</strong>, autour de <strong>165 $ après 3 mois</strong> si la fermeture se prolonge.</li>
<li>Flambée des prix à la pompe et de la facture d'électricité en Europe, retour brutal de l'inflation.</li>
<li>Pression accrue sur la Banque centrale européenne et risque de remontée des taux, avec effet récessif.</li>
<li>Tensions d'approvisionnement en Asie : la Chine, l'Inde, le Japon et la Corée signalent déjà des manques.</li>
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

<h2>Pour aller plus loin</h2>
<p>L'Iran, Ormuz et la question du nucléaire recoupent plusieurs thèmes du Quizz du Berger :</p>
<ul>
<li><a href="/theme/affaires-etrangeres">Affaires étrangères</a> — OTAN, Ukraine, Chine, construction européenne, armée européenne commune.</li>
<li><a href="/theme/climat-energie-et-ecologie">Climat, énergie et écologie</a> — nucléaire civil, énergies renouvelables, sobriété énergétique.</li>
<li><a href="/theme/economie-et-industrie">Économie et industrie</a> — dépendance énergétique, réindustrialisation, souveraineté.</li>
<li><a href="/theme/depenses-et-dette-publiques">Dépenses et dette publiques</a> — budget de la défense, arbitrages budgétaires.</li>
</ul>
<p>Les ${quizzQuestionsCount} questions du Quizz du Berger permettent de comparer vos positions à celles des ${candidatesCount} candidats sur ces sujets.</p>

<p><a href="/themes">→ Faire le quiz</a></p>
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
    title: 'MonVote2027 et Quizz du Berger : deux quiz politiques, deux approches',
    excerpt:
      "MonVote2027 est un nouveau quiz politique pour la présidentielle 2027. Méthodo propre, bon nombre de questions, plusieurs nuances de réponses. Voici les différences avec le Quizz du Berger, à vous de choisir.",
    date: '2026-05-14',
    tag: 'Comparatif',
    content: `
<p>Un nouveau quiz politique pour la présidentielle 2027 est apparu : <a href="https://monvote2027.fr/" rel="nofollow">MonVote2027</a>. Outil citoyen indépendant, sans pub, méthodologie publique, c'est propre. Bon nombre de questions, plusieurs nuances de réponses, ça se rapproche de la qualité du Quizz du Berger. Quelques différences existent, à vous de juger ce que vous préférez.</p>

<h2>Comment ça marche</h2>
<p>20 questions pour le quiz rapide, 100 pour le quiz complet, 23 candidats. Pour chaque question, vous indiquez votre niveau d'accord sur une échelle à 5 points : Tout à fait d'accord, Plutôt d'accord, Partagé/Nuancé, Plutôt pas d'accord, Pas du tout d'accord. Plus une option "Passer / Je ne sais pas" si vous préférez ne pas répondre.</p>
<p>L'algorithme calcule la distance entre votre réponse et la position du candidat, puis la convertit en score entre 0 et 100%. Les positions des candidats viennent de leurs programmes, déclarations publiques, votes au Parlement et interviews, avec les sources citées sur la page de chaque candidat.</p>

<h2>Les questions sont orientées</h2>
<p>Une partie des questions sont en fait des affirmations qui prennent position. Par exemple :</p>
<blockquote><em>"Il faut interdire progressivement l'élevage intensif."</em></blockquote>
<blockquote><em>"La France doit accueillir davantage de demandeurs d'asile."</em></blockquote>
<p>Sur "interdire progressivement l'élevage intensif", pourquoi <em>progressivement</em> ? Si vous voulez l'interdire tout de suite, vous êtes d'accord ou pas d'accord ? Si vous voulez le réformer en profondeur sans interdire, vous êtes Partagé ? Si vous voulez le laisser tel quel, vous êtes Pas d'accord. Trois positions assez différentes peuvent atterrir dans la même case.</p>
<p>Sur "accueillir davantage de demandeurs d'asile", la formulation est aussi très large. Combien de plus ? Dans quelles conditions ? Avec quel système d'instruction des dossiers ? L'échelle d'accord écrase tout ça en un curseur.</p>
<p>Cela dit, ces phrases sont aussi celles que les Français entendent tous les jours dans les médias et dans la bouche des politiques. Devoir se positionner face à ces formulations telles qu'elles existent dans le débat public a un intérêt en soi.</p>

<h2>Échelle d'accord ou choix de réponse</h2>
<p>C'est la principale différence avec le Quizz du Berger. MonVote2027 propose 5 niveaux d'accord par question. Le Quizz du Berger propose 3 à 6 réponses concrètes par question, chacune étant une position cohérente.</p>
<p>Sur l'élevage intensif par exemple, plutôt que de demander si on est d'accord avec "l'interdire progressivement", on propose plusieurs options du type : maintenir tel quel, améliorer les conditions sans changer le modèle, sortir de l'élevage intensif sur plusieurs années, interdire dès maintenant. Vous choisissez celle qui ressemble vraiment à ce que vous pensez.</p>
<p>Les deux approches ont leurs avantages. L'échelle est plus rapide à remplir et plus simple à concevoir. Les réponses substantielles demandent plus de travail à équilibrer mais reflètent mieux la diversité des positions sur un sujet.</p>

<h2>Tableau comparatif</h2>
<table>
<tr><th>Critère</th><th>MonVote2027</th><th>Quizz du Berger</th></tr>
<tr><td>Format des questions</td><td>Affirmation + échelle d'accord</td><td>Question + réponses substantielles</td></tr>
<tr><td>Options de réponse</td><td>5 niveaux d'accord</td><td>3 à 6 réponses concrètes</td></tr>
<tr><td>Nombre de questions</td><td>20 ou 100</td><td>${quizzQuestionsCount}</td></tr>
<tr><td>Thèmes</td><td>Plusieurs, pondération possible</td><td>${quizzThemesCount} thèmes, résultats détaillés par thème</td></tr>
<tr><td>Candidats</td><td>23</td><td>${candidatesCount}</td></tr>
<tr><td>Sources des positions candidats</td><td>Programmes, déclarations, votes</td><td>Programmes, déclarations, votes</td></tr>
</table>

<h2>Faites les deux</h2>
<p>MonVote2027 est un bon outil, rapide, propre, bien documenté. Le Quizz du Berger est plus long mais propose une lecture plus détaillée, avec des réponses substantielles plutôt qu'une échelle d'accord. Les deux sont complémentaires, et c'est souvent intéressant de comparer les résultats quand ils divergent.</p>
<p>La politique n'est ni noire ni blanche. Détendez-vous, et réfléchissez.</p>

<p><a href="/themes">→ Faire le Quizz du Berger</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'MonVote2027 et Quizz du Berger : deux quiz politiques, deux approches',
      description:
        "Comparatif entre MonVote2027 et le Quizz du Berger pour la présidentielle 2027 : échelle d'accord vs réponses substantielles.",
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-05-14',
      about: [
        { '@type': 'Thing', name: 'MonVote2027' },
        { '@type': 'Thing', name: 'Quiz politique' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
  {
    slug: 'loi-aide-a-mourir-france-candidats-2027',
    title: `Loi sur l'aide à mourir : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
    excerpt:
      "Après trois ans de navette parlementaire, l'Assemblée nationale a définitivement adopté le droit à l'aide à mourir le 15 juillet 2026. Que contient la loi, pourquoi divise-t-elle, et où se situent les candidats à la présidentielle 2027 ?",
    date: '2026-07-18',
    tag: 'Analyse',
    content: `
<p>Le <strong>15 juillet 2026</strong>, les députés ont définitivement adopté le droit à l'aide à mourir par <strong>291 voix pour, 241 contre et 29 abstentions</strong>. Le Sénat avait rejeté le texte trois fois ; il a fallu la procédure du « dernier mot » pour le faire passer. Le Premier ministre Sébastien Lecornu et le président du Sénat Gérard Larcher ont chacun saisi le Conseil constitutionnel dans les jours qui ont suivi, si bien que la loi n'est toujours pas promulguée.</p>

<h2>Que change la loi sur l'aide à mourir ?</h2>
<p>Le texte crée un <strong>droit à l'aide à mourir</strong>, distinct du cadre existant de sédation profonde et continue jusqu'au décès. Pour y avoir accès, une personne doit cumuler plusieurs conditions strictes :</p>
<ul>
<li>Être atteinte d'une <strong>affection grave et incurable</strong> engageant le pronostic vital, en phase avancée ou terminale ;</li>
<li>Présenter une <strong>souffrance physique ou psychologique réfractaire</strong> aux traitements, ou jugée insupportable par la personne lorsqu'elle a choisi de ne pas ou plus être traitée ;</li>
<li>Être en capacité d'exprimer sa volonté de façon <strong>libre et éclairée</strong>.</li>
</ul>
<p>Le texte instaure une <strong>clause de conscience</strong> pour les professionnels de santé impliqués dans l'examen des demandes ou l'administration de la substance létale : ceux qui refusent doivent orienter le patient vers un autre médecin. Les <strong>pharmaciens</strong>, en revanche, n'y sont pas soumis. Un <strong>délit d'entrave</strong> est créé, avec des sanctions doublées par rapport au texte initial, pour punir les actions visant à empêcher l'accès à l'aide à mourir ou à l'information sur ce droit.</p>
<p>Ce texte est le second volet d'un diptyque législatif : la loi garantissant l'égal accès aux soins palliatifs, promulguée dès le <strong>26 mai 2026</strong>, avait fait l'objet d'un consensus bien plus large. C'est bien le volet « aide à mourir » qui a cristallisé les tensions.</p>

<h2>Une navette parlementaire de plus de trois ans</h2>
<ul>
<li><strong>Mai 2025</strong> : l'Assemblée nationale adopte en première lecture les deux propositions de loi (soins palliatifs et aide à mourir).</li>
<li><strong>28 janvier 2026</strong> : le Sénat, où siège une majorité de droite, rejette le texte sur l'aide à mourir en première lecture (181 voix contre, 122 pour).</li>
<li><strong>25 février 2026</strong> : l'Assemblée nationale adopte un texte modifié en deuxième lecture et le retransmet au Sénat.</li>
<li><strong>12 mai 2026</strong> : le Sénat rejette à nouveau le texte en séance plénière.</li>
<li><strong>26 mai 2026</strong> : la loi sur les soins palliatifs, elle, est promulguée (loi n° 2026-404).</li>
<li><strong>2 juin 2026</strong> : la commission mixte paritaire (7 députés, 7 sénateurs) échoue à trouver un accord sur l'aide à mourir.</li>
<li><strong>30 juin 2026</strong> : l'Assemblée nationale adopte à nouveau le texte en nouvelle lecture (295 voix pour, 232 contre).</li>
<li><strong>14 juillet 2026</strong> : le Premier ministre Sébastien Lecornu annonce qu'il saisira le Conseil constitutionnel dès l'adoption définitive.</li>
<li><strong>15 juillet 2026</strong> : dans le cadre de la procédure du « dernier mot » donné à l'Assemblée, les députés adoptent définitivement le texte par <strong>291 voix pour, 241 contre et 29 abstentions</strong>.</li>
<li><strong>16 juillet 2026</strong> : le président du Sénat Gérard Larcher saisit à son tour le Conseil constitutionnel.</li>
</ul>

<h2>Pourquoi cette loi divise la France</h2>

<h3>1. Dignité individuelle contre sacralité de la vie</h3>
<p>Pour les partisans du texte, mourir dans la dignité et choisir le moment de sa mort relève d'une liberté individuelle fondamentale, en particulier pour des malades en fin de vie soumis à des souffrances jugées insupportables. Pour les opposants, la vie ne se négocie pas, et la médecine ne doit jamais avoir pour but de donner la mort ; le cadre existant de sédation profonde et continue leur paraît suffisant.</p>

<h3>2. Le rôle des soignants</h3>
<p>La clause de conscience individuelle fait consensus, mais son absence pour les <strong>établissements</strong> de santé (une clinique ou un EHPAD ne peut refuser collectivement de pratiquer l'acte) inquiète une partie des professionnels et des opposants, qui y voient une obligation imposée à des structures parfois confessionnelles ou engagées dans les soins palliatifs.</p>

<h3>3. Le délai de réflexion, au cœur de la saisine du Conseil constitutionnel</h3>
<p>Le texte prévoit un délai d'au moins deux jours entre la notification de la décision du médecin et la confirmation de la demande par le patient. Les opposants, dont le Premier ministre lui-même dans sa saisine, jugent ce délai trop court pour garantir un consentement <strong>libre, éclairé et persistant</strong>, en particulier pour les <strong>majeurs protégés</strong> (sous tutelle ou curatelle), un point spécifiquement soulevé devant le Conseil constitutionnel.</p>

<h3>4. Un accès aux soins palliatifs encore inégal</h3>
<p>Une partie des critiques ne porte pas sur le principe de l'aide à mourir mais sur son séquençage : plusieurs départements restent dépourvus d'unités de soins palliatifs, ce qui fait craindre qu'un droit à mourir soit ouvert avant qu'un vrai droit à être soigné et accompagné jusqu'au bout ne soit garanti partout sur le territoire.</p>

<h2>Le Conseil constitutionnel, dernière étape avant la promulgation</h2>
<p>La loi n'est pas encore promulguée : elle est actuellement examinée par le <strong>Conseil constitutionnel</strong>, saisi à la fois par le Premier ministre Sébastien Lecornu (14 juillet) et par le président du Sénat Gérard Larcher (16 juillet), rejoints par des sénateurs de la majorité sénatoriale de droite. Les saisines portent notamment sur la brièveté du délai de rétractation, la situation des majeurs protégés et l'absence de clause de conscience pour les établissements. Le Conseil peut valider le texte, le censurer partiellement, ou le renvoyer avec des réserves d'interprétation.</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Sur la question <a href="/question-politique/euthanasie-loi-france">« Que pensez-vous de la fin de vie et de l'euthanasie ? »</a> du Quizz du Berger, les ${candidatesCount} candidats se répartissent en trois familles. <strong>Aucun</strong> ne rejette catégoriquement toute évolution du droit existant : l'option la plus restrictive du quiz (« la vie est sacrée, on ne doit jamais aider quelqu'un à mourir ») ne recueille aucune réponse.</p>

<h3>Famille 1 — Le cadre actuel (sédation profonde) leur paraît suffisant</h3>
<p>Ces candidats jugent que la loi de 2016 sur la sédation profonde et continue répond déjà à l'essentiel des situations de fin de vie, et se sont opposés ou montrés très réservés sur le nouveau texte.</p>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — Le groupe RN a voté quasi unanimement contre le texte le 15 juillet (12 voix pour sur les bancs du groupe, la grande majorité contre) ; priorité donnée au développement des soins palliatifs plutôt qu'à l'aide à mourir.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Opposition de principe, met en avant le risque de dérive vers une « euthanasie de confort ».</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — Président du groupe Droite Républicaine à l'Assemblée, dont les députés ont voté très majoritairement contre le texte (41 contre, 5 pour).</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — Ligne conservatrice sur les questions de société, proche de la majorité sénatoriale de droite qui a rejeté le texte à trois reprises.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> — Prudence assumée sur la fin de vie, priorité aux soins palliatifs avant toute nouvelle étape.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Opposition au nom de la protection des personnes les plus vulnérables.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> — Réserve sur l'aide à mourir, insiste sur le développement préalable des soins palliatifs.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> (MoDem) — Le groupe MoDem s'est divisé au moment du vote (20 pour, 16 contre) ; ligne personnelle marquée par la prudence.</li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — Position prudente, proche de la ligne défendue par la majorité sénatoriale de droite.</li>
</ul>

<h3>Famille 2 — Favorables à une légalisation strictement encadrée : la ligne du texte adopté</h3>
<p>Ces candidats défendent une aide à mourir ouverte, mais assortie de conditions médicales strictes, soit la ligne du texte définitivement adopté le 15 juillet.</p>
<ul>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Le groupe Ensemble pour la République a voté majoritairement pour (64 pour, 18 contre, 9 abstentions) ; soutien à une aide à mourir strictement encadrée.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — Le groupe Horizons s'est divisé (16 pour, 18 contre) ; position personnelle favorable à un encadrement strict des conditions d'accès.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place Publique) — Soutien à un droit à mourir dans la dignité, sous conditions médicales strictes.</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — Le groupe Socialistes a très largement voté pour (60 pour, 4 contre) ; ligne social-démocrate classique sur la fin de vie.</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> — Avait porté le débat sur la fin de vie sous ses deux mandats ; favorable à une évolution encadrée du droit existant.</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> — Soutien à un texte équilibré entre liberté individuelle et protection des personnes fragiles.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — Le groupe Écologiste et Social a voté à une large majorité pour (35 pour, 1 contre) ; défend un droit à mourir dans la dignité couplé à un accès réel aux soins palliatifs partout sur le territoire.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — Soutien à une aide à mourir encadrée, à condition que les soins palliatifs soient renforcés en parallèle.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — Le groupe GDR a majoritairement voté pour (11 pour, 2 contre) ; soutien à une légalisation encadrée.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Plaide pour un encadrement strict, prudent sur les dérives possibles.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Soutien à une légalisation encadrée de l'aide à mourir, indépendamment de ses positions souverainistes sur d'autres sujets.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Soutien de principe à une aide à mourir encadrée.</li>
</ul>

<h3>Famille 3 — Pour un droit fondamental, plus large que le texte adopté</h3>
<p>Ces candidats jugent que le texte définitivement adopté reste trop restrictif et défendent un droit plus étendu, incluant l'euthanasie et le suicide assisté sans les mêmes limites de pronostic vital.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — Le groupe LFI a majoritairement voté pour le texte le 15 juillet, mais défend une conception plus large : mourir dans la dignité comme liberté individuelle pleine et entière.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — Défend le libre choix jusqu'au bout, sur une ligne féministe et libertaire.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — Soutien à un droit plein et entier à mourir dans la dignité.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Défend une loi allant au-delà du texte adopté, jugé encore trop restrictif dans ses conditions d'accès.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Défend une liberté individuelle totale face à la fin de vie.</li>
</ul>

<h2>Arguments pour et arguments contre la loi sur l'aide à mourir</h2>
<table>
<tr><th>Arguments en faveur du texte</th><th>Arguments contre le texte</th></tr>
<tr><td>Reconnaît un droit à disposer de sa fin de vie pour des malades en phase avancée ou terminale.</td><td>La vie humaine ne devrait jamais être abrégée par la médecine, quelles que soient les conditions.</td></tr>
<tr><td>Conditions médicales strictes (pronostic vital engagé, souffrance réfractaire) censées prévenir les dérives.</td><td>Le délai de réflexion de deux jours est jugé trop court pour un consentement vraiment libre et persistant.</td></tr>
<tr><td>Clause de conscience individuelle qui protège les soignants opposés à l'acte.</td><td>Absence de clause de conscience pour les établissements, qui ne peuvent refuser collectivement de pratiquer l'acte.</td></tr>
<tr><td>Fruit de plus de trois ans de débat parlementaire et de deux lectures au Sénat.</td><td>Le Sénat a rejeté le texte à trois reprises ; son adoption repose sur le « dernier mot » donné à l'Assemblée.</td></tr>
<tr><td>Accompagné d'une loi sur les soins palliatifs, déjà promulguée en mai 2026.</td><td>L'accès aux soins palliatifs reste inégal sur le territoire, ce qui fragilise la liberté réelle du choix.</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<p>La fin de vie n'est qu'un des sujets de société qui divisent les candidats à la présidentielle 2027. Sur le Quizz du Berger :</p>
<ul>
<li><a href="/question-politique/euthanasie-loi-france">Fin de vie et euthanasie</a> — la question complète et les réponses détaillées des ${candidatesCount} candidats.</li>
<li><a href="/theme/societe">Société</a> — laïcité, GPA/PMA, cannabis et autres questions de société.</li>
<li><a href="/theme/sante">Santé</a> — soins palliatifs, déserts médicaux, budget hospitalier.</li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Loi sur l'aide à mourir : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
      description:
        "Contenu de la loi sur l'aide à mourir adoptée le 15 juillet 2026, chronologie de la navette parlementaire, saisine du Conseil constitutionnel et positions détaillées des candidats à la présidentielle 2027.",
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-07-18',
      about: [
        { '@type': 'Thing', name: 'Aide à mourir' },
        { '@type': 'Thing', name: 'Fin de vie en France' },
        { '@type': 'Thing', name: 'Euthanasie en France' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
  {
    slug: 'ineligibilite-marine-le-pen-france-candidats-2027',
    title: `Marine Le Pen inéligible ou candidate ? L'arrêt du 7 juillet expliqué, et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
    excerpt:
      "Condamnée en appel le 7 juillet mais éligible, candidate dès le lendemain : que dit exactement l'arrêt de la cour d'appel de Paris ? Et faut-il rendre les élus condamnés immédiatement inéligibles ? Les positions des candidats à 2027.",
    date: '2026-07-18',
    tag: 'Analyse',
    content: `
<p>La cour d'appel de Paris a condamné Marine Le Pen le <strong>7 juillet 2026</strong> dans l'affaire des assistants d'eurodéputés, en réduisant sa peine d'inéligibilité au point qu'elle est de nouveau éligible. Le lendemain, au 20 heures de TF1, elle annonçait sa candidature. Derrière ce cas particulier, une question de fond divise la classe politique depuis mars 2025 : un élu condamné pour atteinte à la probité doit-il être <strong>immédiatement inéligible</strong>, avant même l'épuisement de ses recours ? Les ${candidatesCount} candidats à la présidentielle 2027 ne répondent pas la même chose.</p>

<h2>Ce que la cour d'appel a décidé le 7 juillet</h2>
<p>La cour d'appel de Paris a reconnu Marine Le Pen coupable de <strong>détournement de fonds publics</strong> dans l'affaire des assistants d'eurodéputés du Front national, des collaborateurs rémunérés par le Parlement européen mais employés au service du parti. Elle a prononcé <strong>trois ans de prison</strong>, dont deux avec sursis et un an aménagé sous bracelet électronique, <strong>100 000 euros d'amende</strong>, et <strong>45 mois d'inéligibilité dont 30 avec sursis</strong>.</p>
<p>Les <strong>15 mois ferme</strong> d'inéligibilité sont considérés comme déjà purgés. L'exécution provisoire ordonnée en première instance le 31 mars 2025 avait rendu Marine Le Pen inéligible immédiatement ; ces 15 mois ont expiré le <strong>30 juin 2026</strong>. Elle est donc <strong>éligible pour la présidentielle 2027</strong> (prévue les 18 avril et 2 mai 2027).</p>
<p>La peine est nettement réduite par rapport à la première instance, qui avait prononcé quatre ans de prison dont deux ferme, 100 000 euros d'amende et <strong>cinq ans d'inéligibilité avec exécution provisoire</strong>.</p>

<h2>Chronologie</h2>
<ul>
<li><strong>31 mars 2025</strong> : condamnation en première instance, avec exécution provisoire de l'inéligibilité, qui écarte Marine Le Pen de toute élection du jour au lendemain. Les critiques contre les juges sont telles que le Conseil supérieur de la magistrature appelle publiquement « à la mesure » et au respect de la séparation des pouvoirs.</li>
<li><strong>Avril 2025</strong> : premier débat entre juristes sur les effets d'un futur pourvoi en cassation, autour d'une jurisprudence de 1993.</li>
<li><strong>26 juin 2025</strong> : l'Assemblée nationale examine la proposition de loi d'Éric Ciotti (UDR) visant à supprimer l'exécution provisoire des peines d'inéligibilité. Soutenue par le RN et LR, combattue par tous les autres groupes, elle est vidée de sa substance puis retirée par son auteur.</li>
<li><strong>30 juin 2026</strong> : échéance des 15 mois d'inéligibilité ferme finalement retenus en appel, purgés depuis mars 2025.</li>
<li><strong>7 juillet 2026</strong> : arrêt de la cour d'appel de Paris : culpabilité confirmée, peine réduite, éligibilité retrouvée.</li>
<li><strong>8 juillet 2026</strong> : au 20 heures de TF1, Marine Le Pen annonce : « Ce soir, je suis candidate à l'élection présidentielle et je ne changerai pas d'avis », et confirme son pourvoi en cassation.</li>
</ul>

<h2>Pourquoi le sujet divise</h2>

<h3>1. Exemplarité contre présomption d'innocence</h3>
<p>Pour les partisans de l'exécution provisoire, un élu condamné pour détournement de fonds publics ne peut pas continuer à briguer des mandats comme si de rien n'était : c'est une question d'exemplarité et de confiance dans la vie publique, et la loi doit s'appliquer aux élus comme à tout justiciable. Pour ses adversaires, appliquer une peine avant qu'elle soit définitive contredit la présomption d'innocence : si la personne est relaxée en appel ou en cassation, l'élection manquée, elle, ne se rejoue pas.</p>

<h3>2. « Gouvernement des juges » ou égalité devant la loi ?</h3>
<p>La condamnation de mars 2025 a déclenché une controverse dépassant largement le cas Le Pen : des responsables de droite et d'extrême droite ont dénoncé une justice qui déciderait de l'offre électorale à la place des électeurs. Laurent Wauquiez a par exemple jugé qu'il n'est « pas sain en démocratie qu'un élu soit interdit de se présenter à une élection ». À gauche, on a répliqué que nul n'est au-dessus des lois, l'eurodéputée LFI Manon Aubry allant jusqu'à qualifier Marine Le Pen de « première candidate délinquante de France » après l'arrêt d'appel, tandis qu'Olivier Faure (PS) rappelait qu'elle a été « condamnée à deux reprises, en première instance puis en appel ». Au Rassemblement national, la députée Laure Lavalette a salué « un vent de démocratie » soufflant sur la cour d'appel.</p>

<h3>3. Une incertitude juridique persistante</h3>
<p>Le pourvoi en cassation annoncé par Marine Le Pen rouvre un débat technique : certains juristes soutiennent, en s'appuyant sur une jurisprudence de 1993, que le pourvoi ferait « revivre » la peine de première instance, donc les cinq ans d'inéligibilité avec exécution provisoire. Le procureur général près la Cour de cassation a écarté cette lecture, affirmant que « le pourvoi en cassation suspend l'exécution de l'arrêt ». L'incertitude ne sera totalement levée qu'au fil des décisions à venir, sur fond de campagne présidentielle déjà lancée.</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Au-delà du cas Marine Le Pen, la vraie ligne de fracture porte sur le principe : l'inéligibilité immédiate des élus condamnés. C'est désormais <a href="/question-politique/ineligibilite-elus-condamnes">une question du Quizz du Berger</a>. Trois familles se dessinent.</p>

<h3>Famille 1 — La loi doit s'appliquer immédiatement, aux élus comme à tout le monde</h3>
<p>Ces candidats défendent l'exécution provisoire des peines d'inéligibilité, au nom de l'égalité devant la loi et de l'exemplarité. Lors du débat de juin 2025, la gauche et le bloc central ont unanimement rejeté sa suppression.</p>
<ul>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Le bloc central s'est opposé à la suppression de l'exécution provisoire ; sa ligne défend l'application de la loi commune aux élus.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — Attachée à l'indépendance de la justice, elle devrait défendre l'application immédiate des peines.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — La loi doit s'appliquer aux élus comme aux travailleurs ; aucune complaisance à attendre envers les détournements de fonds.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Ligne constante d'exigence de probité dans la vie publique.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> (MoDem) — Son entourage l'a dit « troublé » par la condamnation, mais il n'a pas soutenu la suppression de l'exécution provisoire portée par la droite.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Sa dénonciation de l'impunité des puissants laisse penser qu'il irait plus loin, jusqu'à l'inéligibilité à vie pour les atteintes à la probité.</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> — Défenseur constant de l'institution judiciaire et de son indépendance.</li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — Au sein du bloc central, il défend le respect des décisions de justice.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place Publique) — La défense de l'État de droit est au cœur de son engagement.</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — Le PS, par la voix d'Olivier Faure, souligne une double condamnation pour « détournement de fonds publics européens ».</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> — Ligne légaliste : les décisions de justice s'appliquent.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — Comme le reste du bloc central, opposé à la suppression de l'exécution provisoire.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — La gauche a fait bloc contre la proposition de loi Ciotti.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — « Comment peut-on imaginer une candidate à l'élection présidentielle qui fait campagne avec un bracelet électronique ? » a-t-il réagi après l'arrêt.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — A défendu les juges face aux attaques qui ont suivi la condamnation de 2025.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Sa ligne institutionnelle laisse penser qu'il défendrait le respect des décisions de justice.</li>
</ul>

<h3>Famille 2 — Inéligibilité seulement après une condamnation définitive</h3>
<p>Ces candidats ne contestent pas le principe d'une peine d'inéligibilité, mais refusent qu'elle s'applique avant l'épuisement des recours. Le RN et LR ont soutenu la proposition de loi de juin 2025 visant à supprimer l'exécution provisoire.</p>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — Première concernée : elle dénonce l'exécution provisoire depuis mars 2025 et s'est pourvue en cassation en clamant son innocence.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Pourfendeur régulier du « gouvernement des juges », il devrait rejoindre cette position sans réserve.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Sa proximité avec le camp national laisse penser qu'il partagerait cette lecture.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Sa ligne légaliste et souverainiste plaide pour attendre une condamnation définitive.</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — A jugé qu'il n'est « pas sain en démocratie qu'un élu soit interdit de se présenter à une élection ».</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — LR a soutenu la suppression de l'exécution provisoire ; il appelle à une justice « impartiale ».</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> — Farouche opposant au RN, mais sa famille politique s'est prononcée contre l'exécution provisoire ; sa position devrait s'aligner sur ce principe.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> — Critique de l'extension du pouvoir des juges, il devrait privilégier la condamnation définitive.</li>
</ul>

<h3>Famille 3 — C'est aux électeurs de trancher</h3>
<p>Une troisième voie récuse les deux options précédentes : écarter un élu serait un acte politique qui ne devrait appartenir qu'au peuple.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — Dès mars 2025 : « La décision de destituer un élu devrait revenir au peuple. C'est à cela que servirait le référendum révocatoire ». Une position de principe qui n'empêche pas LFI de dénoncer sévèrement les faits reprochés à la candidate du RN.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Sa défiance envers les institutions laisse penser qu'il s'en remettrait au seul choix des électeurs.</li>
</ul>

<h2>Exécution provisoire de l'inéligibilité : pour ou contre</h2>

<table>
<tr><th>Arguments pour l'inéligibilité immédiate</th><th>Arguments contre</th></tr>
<tr><td>Égalité devant la loi : un justiciable ordinaire subit aussi des effets de sa condamnation avant l'appel.</td><td>La présomption d'innocence vaut jusqu'à la condamnation définitive.</td></tr>
<tr><td>Exemplarité : répondre à la défiance des citoyens envers leurs élus.</td><td>Une élection manquée ne se rejoue pas, même en cas de relaxe ultérieure.</td></tr>
<tr><td>Éviter qu'un élu condamné pour détournement continue de briguer des mandats pendant des années de recours.</td><td>Le calendrier judiciaire peut de facto écarter un candidat majeur d'un scrutin.</td></tr>
<tr><td>La peine reste individualisée et contrôlée par le juge, et la cour d'appel l'a d'ailleurs réduite.</td><td>Le choix de qui peut gouverner devrait revenir aux électeurs, pas aux tribunaux.</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<p>Cette controverse touche à la probité publique, au fonctionnement de la justice et à l'équilibre de nos institutions. Sur le Quizz du Berger :</p>
<ul>
<li><a href="/question-politique/ineligibilite-elus-condamnes">Inéligibilité immédiate des élus condamnés</a> — la nouvelle question du quiz, avec les réponses des ${candidatesCount} candidats.</li>
<li><a href="/theme/corruption-et-lobbying">Corruption et lobbying</a> — probité des élus, financement de la vie politique.</li>
<li><a href="/theme/gouvernance-et-republique">Gouvernance et République</a> — institutions, référendum, démocratie directe.</li>
<li><a href="/theme/police-justice-et-securite">Police, Justice et Sécurité</a> — le regard des candidats sur la justice.</li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Marine Le Pen inéligible ou candidate ? L'arrêt du 7 juillet expliqué, et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
      description:
        "Arrêt d'appel du 7 juillet 2026, exécution provisoire, pourvoi en cassation : ce que dit le droit sur l'inéligibilité de Marine Le Pen, et les positions des candidats à la présidentielle 2027 sur l'inéligibilité immédiate des élus condamnés.",
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-07-18',
      about: [
        { '@type': 'Thing', name: 'Marine Le Pen' },
        { '@type': 'Thing', name: 'Inéligibilité' },
        { '@type': 'Thing', name: 'Exécution provisoire' },
        { '@type': 'Thing', name: 'Affaire des assistants parlementaires du Front national' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
  {
    slug: 'crise-eau-secheresse-france-candidats-2027',
    title: `Sécheresse historique et loi d'urgence agricole : les positions des ${candidatesCount} candidats à la présidentielle 2027 sur l'eau`,
    excerpt:
      "99 départements sous restrictions d'eau, une sécheresse plus sévère qu'en 2022, et un vote solennel à l'Assemblée nationale ce 20 juillet sur la loi d'urgence agricole : la crise de l'eau s'invite dans la présidentielle 2027. Bassines, sobriété ou statu quo : où se situent les candidats ?",
    date: '2026-07-20',
    tag: 'Analyse',
    content: `
<p>Au 17 juillet 2026, <strong>99 départements</strong> sont sous arrêté de restriction d'eau, dont <strong>48 en situation de crise</strong>. Après le printemps le plus chaud et le mois de juin le plus chaud jamais mesurés en France, la sécheresse de 2026 dépasse celle de 2022, jusqu'ici année de référence. Ce <strong>20 juillet</strong>, l'Assemblée nationale vote solennellement la loi d'urgence agricole, qui prévoit de doubler d'ici 2035 les capacités de stockage d'eau pour l'agriculture, et donc de faciliter la construction de bassines. C'est sur ce point que les ${candidatesCount} candidats à la présidentielle 2027 se séparent.</p>

<h2>Une sécheresse hors norme</h2>
<p>Chronologie d'une crise qui s'aggrave de mois en mois :</p>
<ul>
<li><strong>Printemps 2026</strong> : le printemps le plus chaud jamais mesuré en France (+1,7 °C au-dessus des normales), avec un déficit de précipitations d'environ 30 %.</li>
<li><strong>Fin mai 2026</strong> : un épisode de chaleur précoce et inhabituel touche le pays.</li>
<li><strong>Juin 2026</strong> : le mois de juin le plus chaud jamais observé en France, avec une température moyenne de 22,75 °C (+3,8 °C par rapport aux normales), devançant le record de juin 2003.</li>
<li><strong>1er juillet 2026</strong> : face à la canicule, la ministre de l'Agriculture Annie Genevard annonce un plan de mesures d'urgence (accélération des indemnisations d'assurance récolte, aides à l'équipement des élevages en brumisation et ventilation, soutien au transport de fourrage, fonds hydraulique agricole pour financer des retenues d'eau).</li>
<li><strong>9 juillet 2026</strong> : 95 des 96 départements métropolitains sont concernés par au moins une mesure de restriction d'eau. Seule la Haute-Corse est épargnée.</li>
<li><strong>16 juillet 2026</strong> : députés et sénateurs réunis en commission mixte paritaire (CMP) trouvent un compromis sur la loi d'urgence agricole, adopté par 8 voix (élus centristes, de droite et d'extrême droite) contre 4 (élus de gauche), avec 2 abstentions (macronistes).</li>
<li><strong>17 juillet 2026</strong> : 99 départements sont désormais concernés par une restriction, dont <strong>48 en situation de crise</strong> (le niveau le plus grave) et 23 en alerte renforcée. 206 arrêtés préfectoraux sur l'eau sont en vigueur, un niveau inédit depuis au moins 2013. 93 % des points de suivi des nappes phréatiques affichent un niveau en baisse, 54 % sont sous les normales mensuelles.</li>
<li><strong>20 juillet 2026</strong> : vote solennel du texte à l'Assemblée nationale.</li>
<li><strong>21 juillet 2026</strong> : vote solennel prévu au Sénat, pour une adoption définitive.</li>
</ul>
<p>Ne pas respecter un arrêté de restriction constitue une contravention de 5ᵉ classe, punie d'une amende pouvant aller jusqu'à 1 500 euros, portée à 3 000 euros en cas de récidive.</p>

<h2>Que contient la loi d'urgence agricole ?</h2>
<p>Le texte issu du compromis du 16 juillet prévoit notamment :</p>
<ul>
<li>Le <strong>doublement d'ici 2035</strong> des capacités de stockage d'eau agricole, avec une simplification des procédures de consultation publique pour la construction de retenues d'eau (bassines).</li>
<li>Une <strong>dérogation ministérielle de trois ans maximum</strong>, sur avis de l'Anses, permettant l'usage de deux insecticides néonicotinoïdes interdits en France (flupyradifurone, acétamipride) sur les cultures de betterave, pomme, cerise et noisette, un point hérité du débat sur la <a href="https://fr.wikipedia.org/wiki/Loi_Duplomb">loi Duplomb</a>, promulguée le 12 août 2025 après une censure partielle du Conseil constitutionnel.</li>
<li>Le retrait, par rapport à la version votée au Sénat, d'un principe de « non-régression agricole » qui aurait limité toute nouvelle contrainte sur les prélèvements d'eau agricoles.</li>
</ul>

<h2>Pourquoi ce dossier divise</h2>

<h3>1. Bassines et « guerre de l'eau »</h3>
<p>Depuis les affrontements de <strong>Sainte-Soline</strong> en 2023, les bassines (ou retenues de substitution) opposent frontalement agriculteurs irrigants et défenseurs de l'environnement. Le 28 mars 2026, la Coordination Rurale a manifesté devant la mégabassine de Sainte-Soline, tandis qu'un collectif « Bassines non merci » s'est constitué en Touraine contre un projet de retenue relancé en Indre-et-Loire. Plusieurs élus locaux, dont le représentant de France Urbaine Ludovic Brossard, ont mis en garde contre le risque d'une véritable « guerre de l'eau » entre usages agricoles, industriels et domestiques.</p>

<h3>2. S'adapter à la chaleur : climatiser ou sobriété ?</h3>
<p>Le 19 juin 2026, en pleine canicule, un échange vif a opposé Marine Le Pen et Jean-Luc Mélenchon sur franceinfo. Marine Le Pen a annoncé vouloir mettre en place, si elle est élue, un « plan de climatisation massif », en priorité pour « les hôpitaux, les maisons de retraite, les écoles ». Jean-Luc Mélenchon a rétorqué : « Climatiser partout, ça veut dire augmenter les dégâts », en défendant plutôt son projet d'« écorégions » organisées autour des bassins versants pour « faire entrer l'eau dans le débat ».</p>

<h3>3. Changer de modèle agricole ou le protéger ?</h3>
<p>Pour une partie des candidats, la sécheresse impose de repenser en profondeur les cultures irriguées (maïs, notamment) et l'élevage intensif. Pour d'autres, la priorité est de sécuriser l'approvisionnement en eau des exploitations existantes, quitte à accélérer la construction d'infrastructures de stockage.</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Sur la question <a href="/question-politique/crise-eau-secheresse-france">« Comment la France devrait-elle gérer la crise de l'eau et les sécheresses ? »</a> du Quizz du Berger, les ${candidatesCount} candidats se répartissent en trois familles nettes. <strong>Aucun</strong> ne choisit l'option la plus légère du quiz (« on fait beaucoup de bruit pour pas grand-chose, la France ne manque pas d'eau »).</p>

<h3>Famille 1 — Changer radicalement le modèle agricole, priorité absolue</h3>
<p>Ces candidats jugent que la crise de l'eau impose une transformation en profondeur du modèle agricole français, plutôt que des solutions techniques comme les bassines.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — Défend le projet d'« écorégions » organisées autour des bassins versants ; opposé à la climatisation généralisée comme réponse à la chaleur.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — Alignée sur la ligne LFI : la crise de l'eau appelle une rupture avec le modèle agro-industriel.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — Priorité à la sobriété et à la transformation des pratiques agricoles plutôt qu'à l'infrastructure de stockage.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Ligne écologiste constante : la sécheresse est une conséquence directe d'un modèle à bout de souffle.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — Dénonce un système agro-industriel organisé pour le profit plutôt que pour l'intérêt collectif.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Opposition au modèle agro-industriel actuel, jugé incompatible avec les limites écologiques.</li>
</ul>

<h3>Famille 2 — Mieux partager l'eau, avec des restrictions encadrées</h3>
<p>Ces candidats défendent un partage plus équilibré de la ressource entre agriculture, industrie et particuliers, avec des restrictions en période de sécheresse plutôt qu'un choix radical dans un sens ou dans l'autre. Cette famille traverse tout l'échiquier politique.</p>
<ul>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Ligne gouvernementale : gestion équilibrée de la ressource, articulée au plan Genevard du 1er juillet.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — Position pragmatique : partage de l'eau entre usages, sans rejeter ni les restrictions ni le stockage ciblé.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> (MoDem) — Ligne centriste classique : arbitrage entre les usages plutôt que solution unique.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place Publique) — Défend une gestion de l'eau qui protège à la fois l'agriculture et les écosystèmes.</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — Ligne social-démocrate : régulation des usages de l'eau plutôt que logique d'affrontement.</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> — Plaide pour un partage négocié de la ressource entre les différents usagers.</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> — Position d'équilibre entre soutien aux agriculteurs et préservation de la ressource.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — Défend les agriculteurs tout en soutenant une répartition organisée de l'eau entre usages.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — Sensible à la situation des agriculteurs, privilégie un partage encadré plutôt que la seule fuite en avant vers les bassines.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Ligne institutionnelle : gestion raisonnée et négociée de la ressource en eau.</li>
</ul>

<h3>Famille 3 — Construire des retenues d'eau et des bassines</h3>
<p>Ces candidats jugent prioritaire de sécuriser l'accès à l'eau des exploitations agricoles par des infrastructures de stockage, dans la ligne de la loi d'urgence agricole votée ce 20 juillet.</p>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — A annoncé un « plan de climatisation massif » pour les bâtiments sensibles ; défend aussi les retenues d'eau pour l'agriculture. Le RN a voté le compromis de la CMP du 16 juillet.</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — Soutient le doublement des capacités de stockage d'eau porté par la loi d'urgence agricole, dans la continuité de la loi Duplomb.</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — Défend la sécurisation de l'irrigation par les bassines comme réponse structurelle à la sécheresse.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> — Ligne similaire : priorité aux infrastructures pour que les agriculteurs puissent continuer à produire.</li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — Soutient le compromis de la CMP sur le stockage de l'eau agricole.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> — Libéral assumé, favorable aux solutions d'infrastructure plutôt qu'aux restrictions généralisées.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Défend la souveraineté alimentaire par la sécurisation de l'irrigation, opposé aux contraintes écologistes jugées punitives.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Priorité à l'outil agricole français, favorable aux retenues d'eau.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Défend la souveraineté alimentaire, ce qui passe selon lui par la sécurisation de l'irrigation.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Prend la défense du monde agricole et de ses besoins en eau pour continuer à produire.</li>
</ul>

<h2>Bassines : arguments pour et arguments contre</h2>
<table>
<tr><th>Arguments en faveur des retenues d'eau</th><th>Arguments contre, ou pour la sobriété</th></tr>
<tr><td>Sécurise l'irrigation des exploitations face à des sécheresses de plus en plus fréquentes.</td><td>Prélève l'eau en hiver au détriment de la recharge naturelle des nappes et des cours d'eau.</td></tr>
<tr><td>Le doublement du stockage d'ici 2035 est présenté comme une réponse structurelle, pas seulement d'urgence.</td><td>Favorise le maintien de cultures gourmandes en eau plutôt qu'une évolution des pratiques agricoles.</td></tr>
<tr><td>La loi Duplomb encadre les nouvelles retenues : pas de prélèvement dans les nappes profondes, protection des espèces.</td><td>Le compromis du 16 juillet a supprimé le principe de « non-régression agricole » porté par le Sénat.</td></tr>
<tr><td>Soutenue par la FNSEA et une large partie du monde agricole.</td><td>Contestée par les collectifs écologistes, qui redoutent une « guerre de l'eau » entre usages.</td></tr>
<tr><td>S'accompagne de mesures d'urgence (assurance récolte, aides à l'équipement) pour amortir la crise actuelle.</td><td>Ne répond pas, selon les opposants, à la cause de fond : le dérèglement climatique et l'intensité des cultures irriguées.</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<p>La crise de l'eau recoupe plusieurs thèmes du Quizz du Berger :</p>
<ul>
<li><a href="/question-politique/crise-eau-secheresse-france">Crise de l'eau et sécheresse</a> — la question complète et les réponses détaillées des ${candidatesCount} candidats.</li>
<li><a href="/theme/agriculture-et-alimentation">Agriculture et alimentation</a> — pesticides, bio, indépendance alimentaire, élevage.</li>
<li><a href="/theme/climat-energie-et-ecologie">Climat, énergie et écologie</a> — sobriété énergétique, adaptation au changement climatique.</li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Sécheresse historique et loi d'urgence agricole : les positions des ${candidatesCount} candidats à la présidentielle 2027 sur l'eau`,
      description:
        "Sécheresse 2026, 99 départements sous restrictions d'eau, loi d'urgence agricole votée le 20 juillet : ce qu'il faut savoir et les positions détaillées des candidats à la présidentielle 2027 sur la crise de l'eau.",
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-07-20',
      about: [
        { '@type': 'Thing', name: 'Sécheresse en France' },
        { '@type': 'Thing', name: 'Loi d\'urgence agricole' },
        { '@type': 'Thing', name: 'Bassines' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
  {
    slug: 'interdiction-reseaux-sociaux-mineurs-france-candidats-2027',
    title: `Réseaux sociaux interdits aux moins de 15 ans : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
    excerpt:
      "Le 21 juillet 2026, la France est devenue le premier pays d'Europe à interdire les réseaux sociaux aux moins de 15 ans. Que contient la loi, pourquoi divise-t-elle, et où se situent les candidats à 2027 ?",
    date: '2026-07-23',
    tag: 'Analyse',
    content: `
<p>Après un an et demi de navette parlementaire, le Parlement français a définitivement adopté, le <strong>21 juillet 2026</strong>, une loi interdisant l'accès aux réseaux sociaux aux mineurs de moins de 15 ans. La France devient ainsi le premier pays de l'Union européenne à franchir ce cap. Le texte, porté depuis juin 2025 par Emmanuel Macron, a été voté à une large majorité (279 voix pour, 81 contre à l'Assemblée nationale), mais il continue de diviser sur son efficacité, sa constitutionnalité et son impact sur la vie privée. Les ${candidatesCount} candidats à la présidentielle 2027 ne s'accordent ni sur l'âge, ni sur la méthode.</p>

<h2>Que contient la loi sur les réseaux sociaux et les mineurs ?</h2>
<p>Le texte instaure une <strong>interdiction générale d'accès aux réseaux sociaux</strong> (Instagram, TikTok, Facebook, Snapchat, etc.) pour les mineurs de moins de 15 ans. Des exceptions sont prévues pour les « encyclopédies en ligne » et les « projets numériques à vocation éducative ».</p>
<p>La vérification repose sur un <strong>jeton d'âge anonymisé</strong> : chaque utilisateur, mineur ou majeur, devra prouver son âge auprès d'un tiers de confiance, public (France Identité) ou privé, sans que la plateforme n'ait accès à son identité complète. L'<strong>Arcom</strong> (Autorité de régulation de la communication audiovisuelle et numérique) est chargée de faire respecter l'interdiction.</p>

<h2>Chronologie</h2>
<ul>
<li><strong>10 juin 2025</strong> : après le meurtre d'une surveillante par un élève de 14 ans à Nogent-sur-Seine, Emmanuel Macron relance l'idée d'une interdiction des réseaux sociaux avant 15 ans, en menaçant d'agir au niveau français si l'Union européenne ne bouge pas.</li>
<li><strong>Premier semestre 2026</strong> : la proposition de loi fait la navette entre l'Assemblée nationale et le Sénat, qui la modifie notamment sur le mécanisme de vérification d'âge.</li>
<li><strong>20 juillet 2026</strong> : députés et sénateurs s'accordent en commission mixte paritaire (CMP) sur une version commune du texte, avec un âge minimal fixé à 15 ans.</li>
<li><strong>21 juillet 2026</strong> : adoption définitive par le Parlement. À l'Assemblée nationale, le vote rassemble la majorité présidentielle, la droite et le Rassemblement national (279 voix pour). Seul le groupe LFI vote contre ; les députés socialistes s'abstiennent tout en annonçant vouloir saisir le Conseil constitutionnel.</li>
<li><strong>1er septembre 2026</strong> : entrée en vigueur pour les nouveaux comptes : plus aucune création de compte pour un mineur de moins de 15 ans.</li>
<li><strong>1er janvier 2027</strong> : début de la vérification des comptes déjà existants.</li>
</ul>

<h2>Pourquoi cette loi divise</h2>

<h3>1. Protection de l'enfance contre autonomie numérique</h3>
<p>Pour ses soutiens, la loi répond à une urgence : addiction aux écrans, exposition précoce à des contenus violents ou pornographiques, harcèlement en ligne, mécanismes addictifs des plateformes conçus pour capter l'attention des plus jeunes. Pour ses opposants, une interdiction générale et absolue prive aussi les mineurs d'usages positifs (information, expression, lien social) et traite le symptôme plutôt que la cause.</p>

<h3>2. Une loi difficile à appliquer ?</h3>
<p>La faisabilité technique du dispositif est très discutée. Une étude de l'université de Melbourne publiée en juin 2026 montre qu'en Australie, qui a adopté une interdiction comparable pour les moins de 16 ans, moins de 20 % des mineurs concernés la respectent réellement : VPN, faux documents d'identité ou comptes empruntés aux parents permettent de contourner facilement le contrôle.</p>

<h3>3. Vie privée et anonymat en ligne</h3>
<p>Le mécanisme du jeton d'âge, bien que présenté comme anonymisé, inquiète une partie de la classe politique et des associations de défense des libertés numériques : il implique que <strong>tous les utilisateurs</strong>, pas seulement les mineurs, prouvent leur âge auprès d'un tiers de confiance pour continuer à utiliser les réseaux sociaux. C'est l'un des arguments mis en avant par les députés qui ont voté contre ou se sont abstenus.</p>

<h3>4. Un risque constitutionnel et un bras de fer avec le droit européen</h3>
<p>Les députés socialistes, qui se sont abstenus lors du vote final, ont annoncé vouloir saisir le Conseil constitutionnel : une interdiction générale et absolue pourrait être jugée disproportionnée par rapport à l'objectif de protection des mineurs, certains estimant que seules certaines fonctionnalités des plateformes (recommandation algorithmique, notifications, messagerie) posent réellement problème. Par ailleurs, la plupart des grandes plateformes sont enregistrées en Irlande et relèvent donc, pour une partie de leur régulation, du droit européen : l'application extraterritoriale de la loi française reste un point d'incertitude juridique.</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Sur la question <a href="/question-politique/interdiction-reseaux-sociaux-mineurs-15-ans">« Les réseaux sociaux et les écrans chez les jeunes, ça vous inquiète ? »</a> du <a href="/theme/numerique-et-ia">Quizz du Berger</a>, les ${candidatesCount} candidats se répartissent en trois familles.</p>

<h3>Famille 1 — Interdiction stricte, dans l'esprit de la loi (voire plus loin)</h3>
<p>Ces candidats jugent les réseaux sociaux comme le problème numéro un de la jeunesse actuelle et défendent une interdiction pure et simple avant 16 ans, une position plus stricte encore que la loi votée le 21 juillet (15 ans). Sans surprise, la plupart de ces candidats ou de leurs partis ont voté en faveur du texte le 21 juillet.</p>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — Le Rassemblement national a voté pour le texte à l'Assemblée nationale.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Le texte est porté par la majorité présidentielle dont il est issu ; son groupe a voté pour.</li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — Aligné sur la ligne gouvernementale, favorable à une interdiction ferme.</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — Ligne sécuritaire et protectrice sur les questions liées à l'enfance, son groupe a voté pour le texte.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Défend une ligne ferme sur la protection de la jeunesse face aux plateformes numériques.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Favorable à une interdiction stricte, dans la continuité de ses positions sur la souveraineté numérique.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — Position la plus stricte du quiz, cohérente avec les mises en garde des Écologistes sur la santé mentale des jeunes et l'addiction aux écrans.</li>
</ul>

<h3>Famille 2 — Régulation forte des plateformes, sans interdiction générale</h3>
<p>Majoritaires parmi les candidats, ils jugent le sujet préoccupant et veulent des règles fortes pour protéger les mineurs, sans nécessairement soutenir une interdiction générale et absolue comme celle votée le 21 juillet.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — Sa réponse au quiz reflète une inquiétude réelle sur le sujet. Lors du vote du 21 juillet, le groupe LFI a toutefois voté contre ce texte précis, estimant qu'il ne s'attaque pas aux causes (modèles économiques des plateformes) et redoutant les risques du mécanisme de vérification d'âge pour l'anonymat en ligne.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — Alignée sur la ligne LFI, y compris sur le vote contre le texte du 21 juillet.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — Sensible à la question de la jeunesse et de l'école, mais proche de la ligne LFI d'opposition à ce texte précis.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — Favorable à une régulation forte des plateformes plutôt qu'à une interdiction générale.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place Publique) — Ligne proche du PS : préoccupé par le sujet, mais son camp s'est abstenu lors du vote final et envisage une saisine du Conseil constitutionnel.</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — Le groupe socialiste s'est abstenu le 21 juillet, jugeant le texte potentiellement inconstitutionnel et inapplicable en l'état, tout en partageant l'objectif de mieux protéger les mineurs.</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> — Ligne proche du PS, favorable à une régulation forte plutôt qu'à une interdiction générale jugée fragile juridiquement.</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> — Préoccupé par le sujet, mais prudent sur une interdiction générale aux effets incertains.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — Favorable à une régulation forte des plateformes et à la protection des mineurs.</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — Défend une régulation stricte des plateformes vis-à-vis des mineurs.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> — Ligne proche de Wauquiez, favorable à une régulation forte.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> (MoDem) — Position centriste : régulation forte des plateformes, protection des mineurs.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Préoccupé par l'emprise des plateformes sur la jeunesse, favorable à une régulation forte.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — Dénonce les logiques de profit des plateformes plutôt qu'une simple interdiction d'usage.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Favorable à une régulation forte, notamment au nom de la souveraineté numérique.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Ligne écologiste : préoccupée par l'impact des écrans sur la santé mentale des jeunes, favorable à une régulation forte.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Critique des plateformes et de leurs logiques économiques, favorable à une régulation forte.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Préoccupé par l'impact des écrans sur les jeunes générations, favorable à une régulation forte.</li>
</ul>

<h3>Famille 3 — Aux parents de gérer, pas à l'État</h3>
<p>Une position minoritaire dans le quiz, qui renvoie la responsabilité à la sphère familiale plutôt qu'à la loi.</p>
<ul>
<li><a href="/candidat/david-lisnard">David Lisnard</a> — Ligne libérale assumée : l'encadrement du temps d'écran relève des parents, pas d'une interdiction décidée par l'État.</li>
</ul>

<h2>Arguments pour et arguments contre la loi</h2>
<table>
<tr><th>Arguments en faveur de la loi</th><th>Arguments contre, ou réservés</th></tr>
<tr><td>Répond à une urgence de santé publique : addiction aux écrans, exposition précoce à des contenus violents ou pornographiques.</td><td>Facilement contournable : en Australie, moins de 20 % des mineurs concernés respectent une interdiction comparable.</td></tr>
<tr><td>Premier texte de ce type en Europe, qui peut accélérer une régulation au niveau de l'Union européenne.</td><td>Le mécanisme de vérification d'âge concerne en pratique tous les utilisateurs, pas seulement les mineurs, ce qui inquiète sur la vie privée et l'anonymat en ligne.</td></tr>
<tr><td>Contrôle confié à l'Arcom, autorité indépendante déjà compétente sur le numérique.</td><td>Risque d'inconstitutionnalité : une interdiction générale et absolue pourrait être jugée disproportionnée.</td></tr>
<tr><td>Large majorité parlementaire transpartisane (279 voix pour à l'Assemblée nationale).</td><td>Application juridiquement incertaine face au droit européen, la plupart des plateformes étant enregistrées en Irlande.</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<p>Cette loi s'inscrit dans un débat plus large sur le numérique, l'intelligence artificielle et la protection de la vie privée. Sur le Quizz du Berger, les thèmes et questions qui touchent à ces sujets :</p>
<ul>
<li><a href="/theme/numerique-et-ia">Numérique et IA</a> — IA, souveraineté numérique, surveillance, dématérialisation.</li>
<li><a href="/question-politique/interdiction-reseaux-sociaux-mineurs-15-ans">Réseaux sociaux et écrans chez les jeunes</a> — la question complète et les réponses détaillées des ${candidatesCount} candidats.</li>
<li><a href="/question-politique/intelligence-artificielle-regulation">Intelligence artificielle</a> — comment les candidats voient la régulation de l'IA.</li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Réseaux sociaux interdits aux moins de 15 ans : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
      description:
        "Loi interdisant les réseaux sociaux aux moins de 15 ans, adoptée le 21 juillet 2026 : contenu du texte, chronologie, débats et positions détaillées des candidats à la présidentielle 2027.",
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-07-23',
      about: [
        { '@type': 'Thing', name: 'Réseaux sociaux' },
        { '@type': 'Thing', name: 'Protection des mineurs' },
        { '@type': 'Thing', name: 'Numérique' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
  {
    slug: 'loi-ripost-securite-quotidien-france-candidats-2027',
    title: `Loi Ripost sur la sécurité du quotidien : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
    excerpt:
      "Rodéos motorisés, free parties, protoxyde d'azote : la loi Ripost a été adoptée définitivement le 21 juillet 2026, après un vote qui a opposé le Rassemblement national et la majorité gouvernementale à une gauche unie. Que contient le texte, pourquoi divise-t-il, et où se situent les candidats à la présidentielle 2027 ?",
    date: '2026-07-27',
    tag: 'Analyse',
    content: `
<p>Le Parlement a adopté définitivement la loi Ripost le 21 juillet 2026, par 351 voix contre 179. Le texte crée de nouveaux délits pour les rodéos motorisés, les free parties et l'usage de protoxyde d'azote, renforce des amendes existantes et ouvre la voie à des fermetures administratives. Une semaine plus tôt, en première lecture, le même clivage était déjà net : le Rassemblement national et la majorité gouvernementale ont voté pour, la gauche unie a voté contre. Sur les ${candidatesCount} candidats à la présidentielle 2027, aucun ne nie le problème des nuisances du quotidien, mais leurs réponses divergent nettement sur la méthode.</p>

<h2>La loi Ripost, c'est quoi ?</h2>
<p>La loi Ripost, ou « projet de loi visant à offrir des réponses immédiates aux phénomènes troublant l'ordre public, la sécurité et la tranquillité de nos concitoyens », vise la délinquance du quotidien : rodéos motorisés, free parties, mésusage du protoxyde d'azote et des feux d'artifice. Le texte a été ébauché par Bruno Retailleau lorsqu'il était ministre de l'Intérieur, avant son départ du gouvernement le 12 octobre 2025. Son successeur Place Beauvau, Laurent Nuñez, l'a repris et porté jusqu'à son adoption, en le présentant comme un « choc d'autorité » et un « choc d'efficacité » sur la sécurité du quotidien.</p>

<h2>Chronologie</h2>
<ul>
<li><strong>12 octobre 2025</strong> : Bruno Retailleau quitte le ministère de l'Intérieur ; Laurent Nuñez lui succède et reprend le texte qu'il avait ébauché.</li>
<li><strong>18-20 mai 2026</strong> : le Sénat examine le texte en première lecture et l'adopte à l'issue d'un vote solennel.</li>
<li><strong>7-10 juillet 2026</strong> : l'Assemblée nationale examine le texte en première lecture, sous la houlette du ministre de l'Intérieur Laurent Nuñez.</li>
<li><strong>15 juillet 2026</strong> : première adoption à l'Assemblée nationale, par 366 voix contre 182. Le Rassemblement national vote avec la majorité gouvernementale ; la gauche unie vote contre.</li>
<li><strong>16 juillet 2026</strong> : le Syndicat de la magistrature organise une conférence de presse commune avec La France insoumise, Amnesty International et la militante Assa Traoré pour dénoncer un texte qu'il juge liberticide. Bruno Retailleau accuse le syndicat de connivence avec l'extrême gauche ; la Ligue des libertés et l'Institut pour la justice demandent une saisine à son sujet.</li>
<li><strong>20 juillet 2026</strong> : députés et sénateurs trouvent un compromis en commission mixte paritaire (CMP), qui rétablit le relèvement de l'amende forfaitaire délictuelle pour usage de stupéfiants et la conservation des enregistrements de vidéosurveillance dans les locaux de garde à vue, deux mesures supprimées lors de l'examen à l'Assemblée.</li>
<li><strong>21 juillet 2026</strong> : adoption définitive du texte issu de la CMP, par 351 voix contre 179.</li>
</ul>

<h2>Que contient la loi Ripost ?</h2>
<p>Le texte crée ou durcit plusieurs infractions :</p>
<ul>
<li>Un délit d'<strong>organisation illégale d'un rassemblement musical</strong> (free party), puni de deux ans de prison et 30 000 euros d'amende, avec confiscation du matériel de sonorisation et saisie du véhicule ayant servi à le transporter ; le conducteur risque en plus trois ans d'annulation de permis.</li>
<li>L'extension de l'<strong>amende forfaitaire délictuelle</strong> aux rodéos motorisés, pour sanctionner plus vite sans passer systématiquement par un tribunal.</li>
<li>Un délit d'<strong>inhalation de protoxyde d'azote</strong>, puni d'un an de prison et 3 750 euros d'amende (ou d'une amende forfaitaire de 500 euros), et jusqu'à trois ans de prison et 9 000 euros d'amende en cas de conduite sous son emprise. La vente aux particuliers est interdite, mais l'entrée en vigueur de cette interdiction est reportée au 1ᵉʳ février 2027 pour respecter le droit européen.</li>
<li>Jusqu'à trois ans de prison et 45 000 euros d'amende pour la détention ou le transport de mortiers d'artifice sans motif légitime, et une procédure de fermeture administrative pour les commerces qui en vendent illégalement.</li>
</ul>

<h2>Pourquoi la loi Ripost divise</h2>

<h3>1. Choc d'autorité ou inflation pénale ?</h3>
<p>Pour ses défenseurs, la loi Ripost répond à une demande sociale réelle sur des nuisances qui dégradent le quotidien de nombreux quartiers et zones rurales. Le Syndicat de la magistrature y voit au contraire un texte « liberticide », « répressif » et « gestionnaire », qui multiplie les délits sans s'attaquer aux causes des troubles à l'ordre public.</p>

<h3>2. Une alliance qui a fait des vagues</h3>
<p>La conférence de presse commune du 16 juillet entre le Syndicat de la magistrature, La France insoumise, Amnesty International et Assa Traoré a provoqué une vive réaction à droite. Le député LFI Thomas Portes a qualifié le texte de sorti « du programme de Jean-Marie Le Pen ». Bruno Retailleau a dénoncé une connivence entre magistrats et extrême gauche, tandis que la Ligue des libertés et l'Institut pour la justice ont demandé une saisine visant le syndicat.</p>

<h3>3. Un texte freiné par le droit européen</h3>
<p>L'interdiction de vente de protoxyde d'azote aux particuliers ne peut entrer en vigueur avant le 1ᵉʳ février 2027, le temps de respecter les procédures de notification à la Commission européenne. En attendant cette date, seule la détention ou le transport d'une quantité dépassant un certain seuil est sanctionné.</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Sur la question <a href="/question-politique/loi-ripost-securite-quotidien-france">« Comment répondre aux nuisances du quotidien ? »</a> du <a href="/theme/police-justice-et-securite">Quizz du Berger</a>, les ${candidatesCount} candidats se répartissent en quatre familles.</p>

<h3>Famille 1 — Fermeté : soutenir la loi Ripost, voire durcir encore</h3>
<p>Ces candidats ou leurs partis ont voté pour la loi Ripost, ou défendent une ligne au moins aussi ferme.</p>
<ul>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — Auteur de la version initiale du texte comme ministre de l'Intérieur, avant son départ du gouvernement le 12 octobre 2025 ; sa ligne, plus dure que la version finalement votée, laisse penser qu'il aurait souhaité aller plus loin.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Sa ligne sécuritaire constante laisse penser qu'il jugerait la loi Ripost insuffisante face aux nuisances du quotidien.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Ligne souverainiste proche du RN sur la sécurité, favorable à une fermeté accrue.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Ligne sécuritaire souverainiste, favorable à un durcissement des sanctions.</li>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — Le RN a voté pour la loi Ripost, en première lecture comme à l'adoption définitive.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Le texte a été porté par le gouvernement dont son parti est le pilier, avec le vote de la majorité présidentielle.</li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — Issu de la majorité qui a porté le texte défendu par le ministre de l'Intérieur Laurent Nuñez.</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — Le groupe LR a voté pour la loi Ripost à l'Assemblée nationale.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> — Ligne proche de celle de Wauquiez, le groupe LR ayant voté pour le texte.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> — Maire favorable à la fermeté sur l'ordre public, sa ligne laisse penser qu'il aurait voté pour le texte.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — Horizons est un parti de la majorité gouvernementale qui a porté et voté le texte.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> (MoDem) — Le MoDem, partenaire de la majorité gouvernementale, a très probablement voté pour le texte, même si sa doctrine pénale personnelle est plus mesurée.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Sa ligne populiste sur les nuisances du quotidien laisse penser à un soutien à une réponse ferme.</li>
</ul>

<h3>Famille 2 — Sanctionner sans renoncer à la prévention</h3>
<p>Ces deux candidats n'ont pas de siège à l'Assemblée nationale et n'ont donc pas voté le texte, mais leur ligne cherche un équilibre entre sanction et prévention plutôt qu'un camp tranché.</p>
<ul>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> — Ancien ministre de l'Intérieur à la ligne sécuritaire mesurée, sa position laisse penser à un soutien aux sanctions couplé à des moyens de prévention.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Ligne institutionnelle d'ordre mesuré, entre fermeté et prévention.</li>
</ul>

<h3>Famille 3 — Prévention prioritaire, contre le texte tel qu'adopté</h3>
<p>Ces candidats ou leurs partis ont voté contre la loi Ripost au sein du bloc de gauche uni, en défendant une priorité à la prévention plutôt qu'à de nouveaux délits.</p>
<ul>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — Le groupe socialiste a voté contre la loi Ripost.</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> — Ligne proche du PS, dont le groupe a voté contre le texte.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place Publique) — Sa famille politique a voté contre la loi Ripost au sein du bloc de gauche uni.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — Le groupe communiste a voté contre le texte.</li>
</ul>

<h3>Famille 4 — Opposition frontale à l'inflation pénale</h3>
<p>Ces candidats jugent la loi Ripost disproportionnée et inefficace face aux causes sociales des troubles à l'ordre public, une ligne proche de celle du Syndicat de la magistrature.</p>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — Son groupe a voté contre le texte ; le député LFI Thomas Portes l'a qualifié de sorti « du programme de Jean-Marie Le Pen ».</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — Alignée sur la ligne LFI, y compris le vote contre le texte.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — Proche de la ligne LFI d'opposition à ce texte.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — Le groupe écologiste a voté contre la loi Ripost au sein du bloc de gauche uni.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Ligne écologiste proche de celle des Écologistes, qui ont voté contre le texte.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — Dénonce une réponse pénale qui ne s'attaque pas aux causes sociales du problème.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Ligne radicale opposée à l'inflation pénale, proche de celle de LFI.</li>
</ul>

<h2>Arguments pour et arguments contre la loi Ripost</h2>
<table>
<tr><th>Arguments en faveur de la loi</th><th>Arguments contre, ou réservés</th></tr>
<tr><td>Répond à une demande sociale réelle sur des nuisances qui dégradent la vie quotidienne dans de nombreux quartiers.</td><td>Le Syndicat de la magistrature juge le texte liberticide et gestionnaire, sans action sur les causes des troubles.</td></tr>
<tr><td>Sanctions plus rapides grâce à l'extension de l'amende forfaitaire délictuelle, sans passer systématiquement par un tribunal.</td><td>Risque d'inflation pénale : de nouveaux délits s'ajoutent sans moyens supplémentaires pour les faire appliquer.</td></tr>
<tr><td>Cible des nuisances concrètes et documentées : rodéos motorisés, free parties, protoxyde d'azote, mortiers d'artifice.</td><td>L'interdiction de vente du protoxyde d'azote ne peut entrer en vigueur avant février 2027, faute de compatibilité immédiate avec le droit européen.</td></tr>
<tr><td>Adopté par une majorité parlementaire nette (351 voix contre 179 à l'adoption définitive).</td><td>Vote clivant : toute la gauche unie s'est opposée au texte.</td></tr>
<tr><td>La commission mixte paritaire a rétabli la conservation des enregistrements de vidéosurveillance en garde à vue, utile aux enquêtes.</td><td>Cette même conservation inquiète les défenseurs des libertés individuelles.</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<p>La loi Ripost s'inscrit dans un débat plus large sur la sécurité et la justice pénale. Sur le Quizz du Berger, les thèmes et questions qui touchent à ces sujets :</p>
<ul>
<li><a href="/theme/police-justice-et-securite">Police, Justice et Sécurité</a> — violences policières, doctrine pénale, terrorisme, cannabis.</li>
<li><a href="/question-politique/loi-ripost-securite-quotidien-france">Nuisances du quotidien</a> — la question complète et les réponses détaillées des ${candidatesCount} candidats.</li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Loi Ripost sur la sécurité du quotidien : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
      description:
        "Loi Ripost adoptée définitivement le 21 juillet 2026 : rodéos motorisés, free parties, protoxyde d'azote. Contenu du texte, chronologie et positions détaillées des candidats à la présidentielle 2027.",
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-07-27',
      about: [
        { '@type': 'Thing', name: 'Loi Ripost' },
        { '@type': 'Thing', name: 'Sécurité du quotidien' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
  {
    slug: 'feux-foret-securite-civile-france-candidats-2027',
    title: `Feux de forêt et sécurité civile : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
    excerpt:
      "Feux de Gironde et des Landes, sécurité civile sous tension, flotte de Canadair jugée insuffisante : la crise de l'été 2026 relance le débat sur le financement de la lutte contre les incendies. Où se situent les candidats à la présidentielle 2027 ?",
    date: '2026-07-30',
    tag: 'Analyse',
    content: `
<p>Le 22 juillet 2026, un feu se déclare sur la commune de Saumos, en Gironde, et se propage vers Le Porge puis Lège-Cap-Ferret. Cinq jours plus tard, il a détruit 42 000 hectares, forcé l'évacuation de 220 000 personnes dans 23 communes et coûté la vie à trois sapeurs-pompiers depuis le début de l'été. À l'échelle nationale, plus de 116 000 hectares sont partis en fumée depuis le 1ᵉʳ janvier 2026, un record depuis 2022. Sur les ${candidatesCount} candidats à la présidentielle 2027, aucun ne conteste la gravité de la situation, mais leurs réponses sur le financement de la sécurité civile et l'adaptation au changement climatique divergent nettement.</p>

<h2>Chronologie de l'été 2026</h2>
<ul>
<li><strong>22 juillet 2026</strong> : un feu se déclare à Saumos, en Gironde, et progresse vers Le Porge puis Lège-Cap-Ferret.</li>
<li><strong>Nuit du 23 au 24 juillet</strong> : plus de 10 000 personnes sont évacuées par précaution, dont huit centres de vacances.</li>
<li><strong>23 juillet 2026</strong> : deux propositions de loi sont déposées à l'Assemblée nationale. La première, portée par la députée écologiste Sandra Regol, vise à moderniser le modèle de sécurité civile et prévoit une trajectoire d'investissement pluriannuelle pour la flotte aérienne. La seconde, déposée par le député RN Emmanuel Taché, instaure une réponse pénale ferme et systématique aux incendies volontaires.</li>
<li><strong>25 juillet 2026</strong> : une cellule de crise se tient au ministère des Armées ; 1 500 militaires sont mobilisés en renfort, ainsi qu'un avion de transport A400M en complément des Canadair.</li>
<li><strong>26-27 juillet 2026</strong> : la surface brûlée en Gironde et dans les Landes atteint 42 000 hectares. Le bilan national depuis le 1ᵉʳ janvier grimpe à plus de 116 000 hectares brûlés, 220 000 évacuations préventives, plus de 240 bâtiments détruits et 88 sapeurs-pompiers blessés.</li>
<li><strong>27 juillet 2026</strong> : Emmanuel Macron préside une cellule interministérielle de crise au ministère de l'Intérieur. Le ministre de l'Intérieur Laurent Nuñez défend un budget de la sécurité civile passé de 450 à 800 millions d'euros depuis 2017 (+76 %), ainsi qu'un « pacte capacitaire » de 150 millions d'euros pour l'achat de matériel par les Sdis. Marine Tondelier tient une conférence de presse pour réclamer un « État-providence climatique ».</li>
<li><strong>28 juillet 2026</strong> : le député du Doubs Matthieu Bloch annonce le dépôt d'une troisième proposition de loi, créant une circonstance aggravante pour les incendies volontaires commis en période de risque « très élevé ou extrême ».</li>
<li><strong>29 juillet 2026</strong> : Bruno Retailleau se rend en Gironde à la rencontre des sinistrés et réclame que le gouvernement présente « dans les prochaines semaines » la loi issue du Beauvau de la sécurité civile, qu'il avait lancé comme ministre de l'Intérieur.</li>
</ul>

<h2>Pourquoi la crise divise</h2>

<h3>1. Qui doit payer pour les pompiers ?</h3>
<p>Les Sdis sont financés à 60 % par les départements, via une fiscalité locale dont les recettes dynamiques s'amenuisent. Le Sénat a fait adopter dans le budget 2026 une hausse ciblée de la taxe sur les conventions d'assurance (TSCA) pour mieux financer les Sdis. En novembre 2025, lors de l'examen du budget 2026, un amendement proposant cette même hausse avait pourtant été rejeté, avec le vote contre du Rassemblement national.</p>

<h3>2. Répression des incendiaires ou cause climatique structurelle ?</h3>
<p>Deux lectures s'affrontent sur l'origine du problème. Jean-Luc Mélenchon attribue les incendies à « la stupidité du capitalisme », qu'il présente comme un résultat politique plutôt qu'un phénomène naturel. Marine Tondelier récuse l'idée que des cas individuels d'incendiaires puissent occulter des choix politiques collectifs sur la gestion des forêts. À l'inverse, les trois propositions de loi déposées entre le 23 et le 28 juillet visent en priorité à durcir les sanctions pénales contre les auteurs d'incendies volontaires.</p>

<h3>3. Une flotte aérienne toujours jugée insuffisante</h3>
<p>La France dispose de douze avions bombardiers d'eau (six Canadair, six Dash 8), une flotte jugée insuffisante face à l'intensification des feux liée au changement climatique. Deux nouveaux appareils DHC-515 ont été commandés en juin 2026 pour 209 millions d'euros, portant à terme la flotte à seize appareils. Leur livraison n'est toutefois prévue qu'à partir de 2032, en raison de retards industriels chez le constructeur canadien De Havilland.</p>

<h3>4. Le discours et le vote</h3>
<p>Les critiques sur le manque de moyens ne collent pas toujours avec le bilan des votes parlementaires. En juin 2023, dix-neuf députés de La France insoumise avaient voté contre la loi renforçant la prévention et la lutte contre le risque incendie. En novembre 2025, les députés RN avaient voté contre l'amendement relevant la TSCA pour les Sdis. Interrogé le 28 juillet 2026, le ministre délégué chargé de la Transition écologique Mathieu Lefèvre a résumé cette contradiction : « Les mêmes qui ont refusé de voter les augmentations budgétaires viennent aujourd'hui dire qu'elles ne sont pas assez importantes. »</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Sur la question <a href="/question-politique/feux-foret-securite-civile-france">« Comment adapter la sécurité civile et lutter contre les feux de forêt ? »</a> du <a href="/theme/climat-energie-et-ecologie">Quizz du Berger</a>, les ${candidatesCount} candidats se répartissent en quatre familles.</p>

<h3>Famille 1 — Fermeté d'abord, pas de nouveaux moyens significatifs</h3>
<p>Ces candidats mettent l'accent sur la répression des incendiaires plutôt que sur une hausse des moyens nationaux de la sécurité civile.</p>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — A adressé un message de soutien aux sinistrés et aux pompiers, mais ses députés ont voté contre l'amendement relevant la taxe sur les assurances pour financer les Sdis en novembre 2025.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Sa ligne sécuritaire constante laisse penser qu'il privilégierait la répression des incendiaires à une hausse des moyens.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Ligne souverainiste proche du RN, sa position laisse penser à un accent mis sur la fermeté plutôt que sur de nouveaux financements.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Sa ligne populiste sur l'ordre public laisse penser à un soutien à une réponse ferme contre les incendiaires plutôt qu'à un nouveau plan de dépense.</li>
</ul>

<h3>Famille 2 — Moderniser sans creuser la dépense publique</h3>
<p>Ces candidats soutiennent une modernisation de la sécurité civile (flotte aérienne, statut des pompiers volontaires), financée par une fiscalité ciblée plutôt que par le budget général.</p>
<ul>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — À l'origine du Beauvau de la sécurité civile comme ministre de l'Intérieur, il réclame désormais la loi de modernisation qui en est issue.</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — Ligne proche de celle de Retailleau au sein du groupe LR.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> — Ligne LR similaire, favorable à une modernisation financée sans dérapage budgétaire.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> — Président de l'Association des maires de France, sa ligne de gestionnaire local laisse penser à un soutien à une réforme ciblée du financement des Sdis plutôt qu'à un grand plan national.</li>
<li><a href="/candidat/francois-bayrou">François Bayrou</a> (MoDem) — Ligne centriste, sa position laisse penser à un soutien à la hausse ciblée de la taxe sur les assurances votée au Sénat.</li>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — Garde des Sceaux, sa ligne sécuritaire laisse penser à un soutien à la fois à la modernisation des moyens et au durcissement pénal porté par la proposition de loi RN.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Ligne souverainiste favorable aux fonctions régaliennes de l'État, sans grand plan de dépense nouvelle.</li>
</ul>

<h3>Famille 3 — Un plan d'investissement pluriannuel financé par le budget général</h3>
<p>Ces candidats défendent une hausse des moyens humains et aériens de la sécurité civile financée par le budget général, accompagnée d'une politique d'adaptation des forêts.</p>
<ul>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Son camp gouvernemental défend un budget de la sécurité civile porté de 450 à 800 millions d'euros depuis 2017 et un pacte capacitaire pour les Sdis.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — Ligne centriste proche de la majorité gouvernementale sur l'investissement dans les moyens de la sécurité civile.</li>
<li><a href="/candidat/bernard-cazeneuve">Bernard Cazeneuve</a> — Ancien ministre de l'Intérieur, sa ligne laisse penser à un soutien à un plan d'investissement piloté par l'État plutôt qu'à une nouvelle taxe dédiée.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Ligne gaulliste favorable à un État stratège investissant directement dans l'adaptation climatique.</li>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place Publique) — Ligne social-démocrate européenne, favorable à un investissement public dans l'adaptation climatique.</li>
<li><a href="/candidat/jerome-guedj">Jérôme Guedj</a> (PS) — Ligne proche de celle de Glucksmann au sein du bloc socialiste.</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> — Ligne PS similaire, favorable à un plan d'investissement public.</li>
</ul>

<h3>Famille 4 — Vers un « État-providence climatique », voire une rupture avec le système économique</h3>
<p>Ces candidats réclament un effort budgétaire plus large, financé par une taxation des grandes entreprises polluantes ou des superprofits, certains y ajoutant une critique plus radicale du système économique.</p>
<ul>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — Réclame un « État-providence climatique » financé par une taxe sur les superprofits des compagnies pétrolières et gazières, et critique les monocultures forestières.</li>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — Attribue les incendies à « la stupidité du capitalisme » et appelle à une planification écologique.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — Dans ses vœux 2026, appelait à donner des moyens à la sécurité civile pour adapter la France aux risques de canicule et de sécheresse.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Ligne écologiste proche de celle de Tondelier sur le financement climatique.</li>
<li><a href="/candidat/clementine-autain">Clémentine Autain</a> — Ligne écologiste de gauche, proche de l'État-providence climatique défendu par les Écologistes.</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a> — Ligne proche de celle de Mélenchon sur la responsabilité du système économique.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — Ligne trotskiste, attribue structurellement la crise au système capitaliste plutôt qu'à des choix budgétaires isolés.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Ligne radicale proche de celle de LFI sur la responsabilité du système économique.</li>
</ul>

<h2>Arguments pour un grand plan national et arguments pour la fermeté locale</h2>
<table>
<tr><th>Arguments pour un grand plan de financement national</th><th>Arguments pour la fermeté et la responsabilisation locale</th></tr>
<tr><td>Le changement climatique intensifie durablement les feux : la flotte aérienne (12 appareils) est jugée insuffisante et les nouveaux Canadair n'arriveront qu'en 2032.</td><td>Une partie des feux est d'origine volontaire ou négligente : durcir les sanctions cible directement une cause identifiée.</td></tr>
<tr><td>Plusieurs rapporteurs parlementaires jugent les ressources actuelles des Sdis insuffisantes face à l'ampleur des besoins.</td><td>Les départements et les communes sont les mieux placés pour adapter leurs moyens aux risques locaux, sans transfert de charge vers le budget de l'État.</td></tr>
<tr><td>Une fiscalité dédiée (taxe sur les superprofits ou sur les assurances) ferait contribuer les secteurs les plus concernés ou les plus profitables.</td><td>Augmenter les impôts ou les taxes pour financer un nouveau plan pèserait sur les assurés ou les entreprises, dans un contexte de déficit public déjà élevé.</td></tr>
<tr><td>Un plan de reforestation résiliente réduirait le risque à long terme, au-delà de la seule réponse opérationnelle.</td><td>La gestion forestière relève d'abord des propriétaires privés et des collectivités, pas d'un plan national.</td></tr>
</table>

<h2>Pour aller plus loin</h2>
<p>La crise des feux de forêt s'inscrit dans un débat plus large sur l'adaptation de la France au changement climatique. Sur le Quizz du Berger, les thèmes et questions qui touchent à ces sujets :</p>
<ul>
<li><a href="/theme/climat-energie-et-ecologie">Climat, Énergie et Écologie</a> — nucléaire, renouvelables, sobriété énergétique, répartition de l'effort climatique.</li>
<li><a href="/question-politique/feux-foret-securite-civile-france">Sécurité civile et feux de forêt</a> — la question complète et les réponses détaillées des ${candidatesCount} candidats.</li>
<li><a href="/question-politique/crise-eau-secheresse-france">Crise de l'eau et sécheresse</a> — un autre effet du changement climatique qui touche l'agriculture française.</li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Feux de forêt et sécurité civile : tout comprendre et les positions des ${candidatesCount} candidats à la présidentielle 2027`,
      description:
        `Feux de Gironde et des Landes, financement de la sécurité civile, flotte de Canadair, votes parlementaires et positions détaillées des ${candidatesCount} candidats à l'élection présidentielle 2027.`,
      author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
      datePublished: '2026-07-30',
      about: [
        { '@type': 'Thing', name: 'Feux de forêt' },
        { '@type': 'Thing', name: 'Sécurité civile' },
        { '@type': 'Thing', name: 'Changement climatique' },
        { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
      ],
    },
  },
];
