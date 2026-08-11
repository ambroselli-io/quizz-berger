import type { Article } from '~/types/article';
import { quizzQuestionsCount, quizzThemesCount } from '~/utils/quizz';

export const article: Article = {
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
};
