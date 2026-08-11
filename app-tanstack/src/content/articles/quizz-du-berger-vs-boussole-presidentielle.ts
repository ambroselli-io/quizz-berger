import type { Article } from '~/types/article';
import { quizzThemesCount } from '~/utils/quizz';

export const article: Article = {
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
};
