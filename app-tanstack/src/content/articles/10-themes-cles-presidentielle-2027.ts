import type { Article } from '~/types/article';
import { quizzQuestionsCount, quizzThemesCount } from '~/utils/quizz';
import { candidatesCount } from '~/utils/seo';

export const article: Article = {
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
};
