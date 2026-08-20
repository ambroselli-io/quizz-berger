import type { Article } from '~/types/article';
import { quizzQuestionsCount, quizzThemesCount } from '~/utils/quizz';
import { candidatesCount } from '~/utils/seo';

export const article: Article = {
  slug: 'comparatif-quiz-politiques-2027',
  title: 'Quel test politique faire pour la présidentielle 2027 ?',
  excerpt: `Quatre tests existent : le Quizz du Berger (${quizzQuestionsCount} questions, ${quizzThemesCount} thèmes, ${candidatesCount} candidats), Elyze, la Boussole Présidentielle et MonVote2027. Voici lequel choisir selon ce que vous cherchez.`,
  date: '2026-02-11',
  tag: 'Comparatif',
  content: `
<p><strong>Réponse courte :</strong> quatre tests politiques sérieux existent pour la présidentielle 2027. Le <a href="/">Quizz du Berger</a> est le plus détaillé (${quizzQuestionsCount} questions sur ${quizzThemesCount} thèmes, ${candidatesCount} candidats, résultats thème par thème, open-source). <a href="https://elyze.app">Elyze</a> est le plus rapide (swipe façon Tinder). La <a href="https://www.laboussolepresidentielle.fr">Boussole Présidentielle</a> vous situe sur deux axes gauche-droite et libéral-autoritaire. <a href="https://monvote2027.fr">MonVote2027</a> propose 20 ou 100 affirmations à noter. Ils sont gratuits et sans inscription.</p>

<p>Chacun a sa philosophie. Voici le détail.</p>

<h3>Le Quizz du Berger</h3>
<p><strong>Format :</strong> ${quizzQuestionsCount} questions sur ${quizzThemesCount} thèmes, 3 à 6 réponses concrètes par question, ${candidatesCount} candidats, résultats par thème, comparaison avec amis, open-source.</p>
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
  schema: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quel test politique faire pour la présidentielle 2027 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Quatre tests politiques gratuits existent pour la présidentielle 2027 : le Quizz du Berger (${quizzQuestionsCount} questions sur ${quizzThemesCount} thèmes, ${candidatesCount} candidats, résultats thème par thème), Elyze (swipe rapide), la Boussole Présidentielle de Sciences Po (positionnement sur deux axes) et MonVote2027 (20 ou 100 affirmations à noter).`,
        },
      },
      {
        '@type': 'Question',
        name: 'Quel est le test politique 2027 le plus détaillé ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Le Quizz du Berger : ${quizzQuestionsCount} questions réparties sur ${quizzThemesCount} thèmes, avec 3 à 6 réponses concrètes par question et un classement des ${candidatesCount} candidats thème par thème. On peut ne répondre qu'aux thèmes qui nous intéressent.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Ces tests politiques 2027 sont-ils gratuits ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui. Le Quizz du Berger, Elyze, la Boussole Présidentielle et MonVote2027 sont gratuits et ne demandent pas de créer un compte pour voir son résultat.',
        },
      },
    ],
  },
};
