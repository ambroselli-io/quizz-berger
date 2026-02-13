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
      "Découvrez les 24 candidats à l'élection présidentielle 2027 et comparez leurs positions sur 21 thèmes politiques majeurs.",
    date: '2026-02-11',
    tag: 'Candidats',
    content: `
<p>L'élection présidentielle 2027 s'annonce comme l'une des plus disputées de la Ve République. Avec <strong>24 candidats potentiels</strong>, les électeurs font face à un choix complexe. Plutôt que de les classer sur un axe politique, nous vous invitons à découvrir leurs positions thème par thème.</p>

<h2>Les 24 candidats</h2>
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
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> — Rassemblement National</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a></li>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> — La France Insoumise</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> — Horizons</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a></li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> — Parti Communiste Français</li>
<li><a href="/candidat/francois-ruffin">François Ruffin</a></li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> — Les Écologistes</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a></li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> — Les Républicains</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> — Reconquête</li>
</ul>

<h2>Ne les classez pas : comparez-les à vous</h2>
<p>La politique ne se résume pas à un axe gauche-droite. Chaque candidat a des positions nuancées sur des dizaines de sujets. Le Quizz du Berger vous permet de comparer vos idées avec celles des 24 candidats sur <strong>21 thèmes</strong> et <strong>119 questions</strong>, thème par thème. Vous pourriez être surpris.</p>
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
<p>Le principe est simple : vous répondez aux questions qui vous intéressent, et un algorithme compare vos réponses à celles des 24 candidats.</p>
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
<p>Sujet brûlant depuis des années, la question migratoire reste au cœur du débat. Régularisation, quotas, droit du sol — les 24 candidats ont des positions très variées.</p>
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
<tr><td>Nombre de questions</td><td><strong>119 questions</strong></td><td>~30 questions</td></tr>
<tr><td>Nuances de réponse</td><td><strong>3 à 6 nuances</strong> par question</td><td>D'accord / Pas d'accord</td></tr>
<tr><td>Thèmes couverts</td><td><strong>21 thèmes</strong></td><td>Mélangés</td></tr>
<tr><td>Résultats par thème</td><td><strong>Oui, thème par thème</strong></td><td>Global uniquement</td></tr>
<tr><td>Comparaison avec amis</td><td><strong>Oui</strong></td><td>Non</td></tr>
<tr><td>Candidats</td><td><strong>24 candidats</strong></td><td>Variable</td></tr>
<tr><td>Open-source</td><td><strong>Oui</strong></td><td>Non</td></tr>
</table>

<h2>Plus nuancé</h2>
<p>Elyze propose seulement "d'accord" ou "pas d'accord" — le Quizz du Berger offre <strong>jusqu'à 6 réponses</strong> par question, du plus radical d'un côté au plus radical de l'autre, avec des nuances intermédiaires. Cela reflète bien mieux la complexité des opinions politiques.</p>

<h2>Plus profond : les résultats thème par thème</h2>
<p>C'est la vraie différence. Avec Elyze, vous obtenez un classement global. Avec le Quizz du Berger, vous découvrez vos affinités <strong>thème par thème</strong>. Vous pouvez être proche de Mélenchon sur l'économie et de Le Pen sur la sécurité — le Quizz vous le montre.</p>

<h2>Plus complet</h2>
<p>119 questions sur 21 thèmes vs ~30 questions mélangées. Le Quizz du Berger couvre davantage de sujets et va plus en profondeur sur chacun d'entre eux.</p>

<h2>Comparaison avec vos amis</h2>
<p>Fonctionnalité unique : enregistrez vos résultats sous un pseudonyme et comparez vos convictions avec celles de vos amis. Le débat est garanti !</p>

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
<p><strong>Idéal pour :</strong> Ceux qui veulent un aperçu rapide et ludique.</p>

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
];
