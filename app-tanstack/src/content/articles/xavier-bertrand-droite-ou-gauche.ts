import type { Article } from '~/types/article';
import { candidatesCount } from '~/utils/seo';
import { quizzQuestionsCount } from '~/utils/quizz';

export const article: Article = {
  slug: 'xavier-bertrand-droite-ou-gauche',
  title: 'Xavier Bertrand, droite ou gauche ? La réponse est plus gênante que prévu',
  excerpt:
    "Le président des Hauts-de-France est à droite, personne n'en doute. Mais ses réponses le placent plus près de Gérald Darmanin et de Gabriel Attal que de Bruno Retailleau, patron de son propre camp.",
  date: '2026-08-16',
  tag: 'Analyse',
  content: `
<p>Xavier Bertrand partage 108 réponses sur ${quizzQuestionsCount} avec Gérald Darmanin, soit 91 % de proximité, son score le plus élevé parmi les ${candidatesCount} personnalités du Quizz du Berger. Avec Gabriel Attal, il en partage 90, soit 83 %. Avec Bruno Retailleau, patron des Républicains, le parti dont il vient, il n'en partage que 63, soit 77 %. Le patron de son parti d'origine n'arrive qu'en sixième position.</p>

<h2>Sur l'économie et le travail, une droite libérale classique</h2>
<p>Aucune ambiguïté ici. Xavier Bertrand veut baisser un peu les impôts sur les plus riches pour rester compétitif, refuse le rétablissement de l'ISF au motif qu'il faisait fuir les riches, et veut continuer à baisser les impôts des entreprises pour la compétitivité et l'emploi. Sur l'évasion fiscale des multinationales, il renvoie à un accord international plutôt qu'à des sanctions unilatérales.</p>
<p>Sur le travail, il maintient la retraite à 64 ans, veut assouplir les 35 heures par accords de branche ou d'entreprise, baisser les charges pour favoriser l'embauche, conditionner le RSA à quelques heures d'activité, et laisser le <a href="/question-politique/smic-augmentation-salaires">SMIC</a> stable pour ne pas alourdir les entreprises. Cinq réponses sur six correspondent à la ligne défendue par la droite parlementaire depuis quinze ans.</p>

<h2>Sur l'immigration et la sécurité, il est aussi ferme que la droite dure</h2>
<p>Il veut réduire fortement l'immigration et durcir les conditions d'accueil. Il veut remettre des contrôles dans Schengen et renforcer drastiquement les frontières extérieures. Il refuse le droit de vote aux étrangers. Sur l'<a href="/question-politique/expulsion-etrangers-condamnes-double-peine">expulsion des étrangers condamnés</a>, il coche l'expulsion pour tout crime ou délit grave, avec suppression des protections actuelles.</p>
<p>Sur la sécurité, il choisit la doctrine du tout-répressif, juge la justice trop lente et trop laxiste, veut renforcer la répression du cannabis et suspendre les allocations familiales des parents de mineurs délinquants. Il soutient la <a href="/blog/loi-ripost-securite-quotidien-france-candidats-2027">loi Ripost</a> telle qu'adoptée, et la <a href="/blog/presomption-legitime-defense-policiers-france-candidats-2027">loi sur la présomption de légitime défense</a> de juillet 2026 également. Sur les onze questions de sécurité, neuf de ses réponses sont identiques à celles de Laurent Wauquiez.</p>

<h2>Ce qui le sépare vraiment de la droite dure</h2>
<p>La ligne de partage n'est ni économique ni sécuritaire. Elle est européenne et sociétale.</p>
<p>Xavier Bertrand juge que <a href="/question-politique/construction-europeenne-avenir">l'Union européenne fonctionne plutôt bien</a> et qu'il faut l'améliorer sans tout bouleverser. Il défend l'euro. Il approuve le pacte migratoire européen actuel. Il veut rester pleinement dans l'OTAN et maintenir un soutien militaire fort à l'Ukraine. Marine Le Pen, Nicolas Dupont-Aignan et François Asselineau répondent l'inverse sur chacun de ces points, et c'est ce qui fait chuter sa proximité avec eux autour de 65 %.</p>
<p>Sur la société, il ne demande aucun retour en arrière. La PMA ouverte à toutes les femmes et remboursée, il la garde. L'IVG dans la Constitution, il l'accepte en la jugeant surtout symbolique. Le mariage pour tous, il ne le rouvre pas. Sur l'égalité femmes-hommes, il répond qu'il reste du chemin à faire sur les salaires et les violences, quand Nicolas Dupont-Aignan répond que la société est déjà suffisamment égalitaire.</p>
<p>Une exception conservatrice, tout de même. Interrogé sur la place de la religion, il choisit la formule « la France est laïque mais nos valeurs sont judéo-chrétiennes, il faut les protéger », et non la laïcité d'égalité stricte que retiennent Édouard Philippe ou François Asselineau. Sur la fin de vie, il estime que le cadre actuel de sédation profonde suffit, là où Édouard Philippe va vers <a href="/blog/loi-aide-a-mourir-france-candidats-2027">une aide à mourir encadrée</a>.</p>

<h2>De quels candidats Xavier Bertrand est-il le plus proche ?</h2>
<p>Le classement, calculé sur ses ${quizzQuestionsCount} réponses avec l'algorithme du quiz.</p>
<ul>
<li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — 91 % de proximité, 108 réponses identiques.</li>
<li><a href="/candidat/laurent-wauquiez">Laurent Wauquiez</a> (LR) — 88 %, 99 réponses identiques.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — 87 %, 102 réponses identiques.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — 83 %, 90 réponses identiques.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> (LR) — 80 %, 76 réponses identiques.</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — 77 %, 63 réponses identiques.</li>
</ul>
<p>Plus loin viennent <a href="/candidat/eric-zemmour">Éric Zemmour</a> (69 %) et <a href="/candidat/marine-le-pen">Marine Le Pen</a> (65 %). Tout en bas, <a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (25 %), <a href="/candidat/juan-branco">Juan Branco</a> (25 %) et <a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (26 %). Les duels détaillés sont ici : <a href="/comparer/raphael-glucksmann-vs-xavier-bertrand">Bertrand contre Glucksmann</a>, <a href="/comparer/juan-branco-vs-xavier-bertrand">Bertrand contre Branco</a>.</p>

<h2>Alors, droite ou gauche ?</h2>
<p>À droite, sans hésitation, sur l'impôt, le travail, l'immigration et la sécurité. Mais une droite pro-européenne et atlantiste, qui ne rouvre pas les lois sociétales. Cette combinaison est exactement celle du bloc central macroniste sur les questions institutionnelles, ce qui explique le podium Darmanin-Wauquiez-Philippe et le score plus faible face à Bruno Retailleau, dont la ligne est plus conservatrice sur la société.</p>
<p>Pour situer précisément : Xavier Bertrand est à 77 % du patron de LR, à 83 % de Gabriel Attal, et à 65 % de Marine Le Pen. Le classement gauche-droite en un seul axe rend mal ces trois chiffres à la fois.</p>
<p>Comme pour tous les candidats du site, ces réponses ne viennent pas de lui. Elles ont été estimées à partir de ses déclarations publiques, de son bilan régional et de ses prises de position parlementaires. La page <a href="/candidat/xavier-bertrand">Xavier Bertrand</a> les liste toutes, thème par thème.</p>

<h2>Alors vous en pensez quoi ?</h2>
<p>Vous êtes peut-être d'accord avec lui sur les impôts et en désaccord total sur l'immigration. C'est le cas de beaucoup de gens, et c'est précisément ce que le quiz mesure. Répondez aux ${quizzQuestionsCount} questions et regardez qui arrive en tête chez vous.</p>
<p><a href="/themes">→ Faire le quiz</a></p>
`,
};
