import type { Article } from '~/types/article';
import { quizzQuestionsCount, quizzThemesCount } from '~/utils/quizz';
import { candidatesCount } from '~/utils/seo';

export const article: Article = {
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
};
