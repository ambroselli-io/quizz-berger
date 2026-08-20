import type { Article } from '~/types/article';
import { candidatesCount } from '~/utils/seo';
import { quizzQuestionsCount } from '~/utils/quizz';
import { proximityListHtml, furthestLinksHtml, proximityPercent, proximitySameAnswers } from '~/utils/proximity';

export const article: Article = {
  slug: 'nicolas-dupont-aignan-droite-ou-gauche',
  title: 'Nicolas Dupont-Aignan, droite ou gauche ? Un gaulliste au programme économique très étatiste',
  excerpt:
    "Renationaliser EDF et les autoroutes, revenir à la retraite à 62 ans, taxer les transactions financières : sur l'économie, le président de Debout la France répond parfois comme la gauche. Sur la société, il est le plus conservateur des candidats souverainistes.",
  date: '2026-08-16',
  tag: 'Analyse',
  content: `
<p>Nicolas Dupont-Aignan et Marine Le Pen donnent la même réponse à ${proximitySameAnswers('nicolas-dupont-aignan', 'marine-le-pen')} des ${quizzQuestionsCount} questions du Quizz du Berger, soit ${proximityPercent('nicolas-dupont-aignan', 'marine-le-pen')} % de proximité. C'est le score le plus élevé du président de Debout la France, devant Jordan Bardella à ${proximityPercent('nicolas-dupont-aignan', 'jordan-bardella')} %, puis François Asselineau à ${proximityPercent('nicolas-dupont-aignan', 'francois-asselineau')} % et Éric Zemmour à ${proximityPercent('nicolas-dupont-aignan', 'eric-zemmour')} %. Cette hiérarchie dit déjà quelque chose : il est plus proche de Marine Le Pen que d'Éric Zemmour, et l'écart se joue sur l'économie.</p>

<h2>Sur l'économie, un étatisme que la droite libérale refuse</h2>
<p>Interrogé sur les entreprises publiques, Nicolas Dupont-Aignan répond qu'il faut renationaliser les entreprises stratégiques bradées, EDF et les autoroutes en tête. Sur le rôle de l'État dans l'industrie, il veut que l'État investisse, soit actionnaire et pilote les industries stratégiques. Sur la <a href="/question-politique/reindustrialisation-france">réindustrialisation</a>, il accepte les barrières douanières. Sur les chaînes d'approvisionnement, il parle de survie nationale.</p>
<p>Ce sont les réponses de Fabien Roussel et de François Asselineau, pas celles de Bruno Retailleau ni de David Lisnard. La fiscalité suit une logique proche : le niveau d'imposition des plus riches lui paraît correct en l'état, il veut sanctionner durement l'évasion fiscale des multinationales, il accepte une taxe sur les transactions financières, et il veut rééquilibrer la fiscalité des entreprises en faveur des PME contre les multinationales.</p>
<p>Sur les retraites, il revient à 62 ans, quand Xavier Bertrand et Édouard Philippe maintiennent 64. La différence avec la gauche se voit ailleurs : il conditionne le RSA à des heures d'activité et veut assouplir les 35 heures par accords sectoriels.</p>

<h2>Sur l'immigration, la réponse la plus dure du quiz</h2>
<p>Sur l'<a href="/question-politique/expulsion-etrangers-condamnes-double-peine">expulsion des étrangers condamnés</a>, il coche l'option la plus large disponible : expulsion systématique dès la première condamnation, y compris pour les personnes arrivées enfants ou nées en France. Xavier Bertrand et François Asselineau s'arrêtent au crime ou au délit grave. Il veut aussi sortir de Schengen, réduire fortement l'immigration et refuser le droit de vote aux étrangers.</p>
<p>Sur la sécurité, il choisit le tout-répressif, l'approche identitaire et répressive contre le terrorisme, le durcissement des peines contre <a href="/blog/loi-ripost-securite-quotidien-france-candidats-2027">les nuisances du quotidien</a>, et le soutien à <a href="/blog/presomption-legitime-defense-policiers-france-candidats-2027">la loi sur la présomption de légitime défense</a>.</p>

<h2>Sur la société, il est le plus conservateur des souverainistes</h2>
<p>C'est ce qui le distingue le plus nettement de François Asselineau, avec qui il partage pourtant ${proximitySameAnswers('nicolas-dupont-aignan', 'francois-asselineau')} réponses. Sur l'égalité femmes-hommes, il répond que la société est déjà suffisamment égalitaire et que l'État n'a plus besoin d'intervenir. Sur la <a href="/question-politique/gpa-pma-france">PMA</a>, il veut la réserver aux couples hétérosexuels ayant des problèmes de fertilité, quand Asselineau, Bertrand et Philippe gardent la loi actuelle. Sur l'IVG dans la Constitution, il juge qu'on est allé trop loin. Sur les droits des personnes LGBT+, il s'en tient au statu quo sans que l'État en fasse plus.</p>
<p>Sur le climat, il est également le plus en retrait des cinq : les mesures écologistes pénalisent selon lui les gens modestes pour pas grand-chose, la France ne peut rien faire seule face à la Chine et aux États-Unis, et la <a href="/question-politique/nucleaire-france-avenir">sobriété énergétique</a> lui apparaît comme une manière de faire accepter un appauvrissement.</p>

<h2>Un souverainiste qui ne veut pas sortir de l'Union européenne</h2>
<p>La différence avec François Asselineau se lit ligne par ligne sur l'Europe. Nicolas Dupont-Aignan veut rester dans l'UE et la réformer en profondeur, renégocier les traités pour récupérer la souveraineté sur les frontières, le budget et la monnaie, mais il refuse de sortir de l'euro, qu'il juge trop risqué. Asselineau coche le Frexit et le retour au franc.</p>
<p>Même écart sur la défense. Dupont-Aignan sort du commandement intégré de l'OTAN et garde le reste, position gaullienne classique, quand Asselineau sort de l'OTAN et de la plupart des alliances. Et en Afrique, Dupont-Aignan veut renforcer la présence militaire française au nom de la lutte antiterroriste, là où Asselineau la réduit et où Juan Branco la supprime.</p>

<h2>De quels candidats Nicolas Dupont-Aignan est-il le plus proche ?</h2>
${proximityListHtml('nicolas-dupont-aignan')}
<p>Les plus éloignés : ${furthestLinksHtml('nicolas-dupont-aignan')}. Son écart avec la gauche radicale reste plus faible que celui de Xavier Bertrand, dont la proximité avec Nathalie Arthaud tombe à ${proximityPercent('xavier-bertrand', 'nathalie-arthaud')} %, effet direct de ses positions économiques.</p>

<h2>Alors, droite ou gauche ?</h2>
<p>À droite sur l'immigration, la sécurité et les questions de société, où il est le plus conservateur des candidats souverainistes du quiz. Plutôt à gauche sur le rôle de l'État dans l'économie, les nationalisations et l'âge de départ à la retraite. Cette combinaison porte un nom déjà ancien en France, le gaullisme social, et elle explique pourquoi il tient à la fois ${proximityPercent('nicolas-dupont-aignan', 'marine-le-pen')} % avec Marine Le Pen et ${proximityPercent('nicolas-dupont-aignan', 'fabien-roussel')} % avec Fabien Roussel.</p>
<p>Ces positions ont été estimées à partir de ses programmes successifs, de ses votes à l'Assemblée nationale et de ses déclarations publiques. Il n'a pas répondu lui-même. La page <a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> liste les ${quizzQuestionsCount} réponses retenues.</p>

<h2>Alors vous en pensez quoi ?</h2>
<p>Renationaliser EDF tout en durcissant l'immigration : beaucoup d'électeurs pensent exactement cela, et aucun bulletin ne le dit clairement. Répondez aux mêmes questions, et voyez lequel des ${candidatesCount} candidats se rapproche le plus de votre propre mélange.</p>
<p><a href="/themes">→ Faire le quiz</a></p>
`,
};
