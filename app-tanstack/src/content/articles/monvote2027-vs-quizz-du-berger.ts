import type { Article } from '~/types/article';
import { quizzQuestionsCount, quizzThemesCount } from '~/utils/quizz';
import { candidatesCount } from '~/utils/seo';

export const article: Article = {
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
};
