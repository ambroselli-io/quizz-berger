import type { Article } from '~/types/article';
import { quizzQuestionsCount, quizzThemesCount } from '~/utils/quizz';
import { candidatesCount } from '~/utils/seo';

export const article: Article = {
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
};
