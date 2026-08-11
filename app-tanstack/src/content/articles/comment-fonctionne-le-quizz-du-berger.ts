import type { Article } from '~/types/article';
import { quizzQuestionsCount, quizzThemesCount } from '~/utils/quizz';
import { candidatesCount } from '~/utils/seo';

export const article: Article = {
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
};
