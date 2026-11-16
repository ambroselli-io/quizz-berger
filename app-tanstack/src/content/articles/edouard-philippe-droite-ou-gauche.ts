import type { Article } from '~/types/article';
import { candidatesCount } from '~/utils/seo';
import { quizzQuestionsCount } from '~/utils/quizz';
import { proximityListHtml, furthestLinksHtml, proximityPercent, proximitySameAnswers, proximityRank } from '~/utils/proximity';

export const article: Article = {
  slug: 'edouard-philippe-droite-ou-gauche',
  title: "Édouard Philippe, droite ou gauche ? Son positionnement question par question",
  excerpt:
    `Le maire du Havre vient des Républicains et gouverne avec Emmanuel Macron. Ses réponses le placent à ${proximityPercent('edouard-philippe', 'bruno-retailleau')} % du patron de LR et à ${proximityPercent('edouard-philippe', 'francois-hollande')} % de François Hollande. Où le classer pour 2027 ?`,
  date: '2026-08-16',
  tag: 'Analyse',
  content: `
<p>Sur les ${quizzQuestionsCount} questions du Quizz du Berger, Édouard Philippe partage ${proximitySameAnswers('edouard-philippe', 'bruno-retailleau')} réponses avec Bruno Retailleau, patron des Républicains et donc de sa famille politique d'origine, soit ${proximityPercent('edouard-philippe', 'bruno-retailleau')} % de proximité. Avec François Hollande, ancien président socialiste, il en partage ${proximitySameAnswers('edouard-philippe', 'francois-hollande')}, soit ${proximityPercent('edouard-philippe', 'francois-hollande')} %. Deux scores de ce niveau, l'un avec la droite et l'autre avec la gauche, ne disent pas à eux seuls où le classer. Il faut regarder question par question.</p>

<h2>Sur l'économie et le travail, des réponses de droite</h2>
<p>Baisser un peu les impôts sur les plus riches pour rester compétitif. Refuser le rétablissement de l'ISF. Continuer à baisser les impôts des entreprises. Renvoyer l'évasion fiscale et la taxe sur les transactions financières à un accord international plutôt qu'à une décision française.</p>
<p>Sur le travail, il veut désormais repousser l'âge légal de départ à la retraite à 65-66 ans et porter la durée de cotisation à 45 annuités, au-delà de la réforme à 64 ans qu'il avait lui-même portée comme Premier ministre en 2019 dans une version différente, avec un complément de capitalisation annoncé le 29 septembre 2026. Il veut aussi assouplir les 35 heures par accords d'entreprise, baisser les charges pour l'embauche, conditionner le RSA à des heures d'activité et laisser le <a href="/question-politique/smic-augmentation-salaires">SMIC</a> stable. Sur la désindexation des retraites envisagée pour le budget 2027, il défend, comme Xavier Bertrand, une désindexation ciblée sur les pensions les plus élevées plutôt qu'un gel généralisé. Son <a href="https://www.edouardphilippe.fr/programme/travail" target="_blank" rel="noopener noreferrer">programme du 12 novembre 2026</a> ajoute trois jours de carence pour tous, dans le privé comme dans le public, et une indemnisation chômage limitée à 12 mois pour les moins de 50 ans. Sur les vingt-quatre questions de fiscalité et de travail, ses réponses sont identiques à celles de Xavier Bertrand sur vingt et une. Les trois divergences portent sur l'<a href="/blog/reforme-retraites-65-ans-capitalisation-france-candidats-2027">âge de départ à la retraite</a>, où Édouard Philippe va plus loin que Xavier Bertrand, sur le financement des retraites, où il ajoute une part de capitalisation, et sur les taxes sur ce qui pollue.</p>

<h2>Sur la sécurité et la justice, des réponses de droite aussi</h2>
<p>Il choisit la doctrine du tout-répressif, l'approche sécuritaire contre le terrorisme, la responsabilisation des parents de mineurs délinquants par la suspension des allocations familiales. Il soutient la <a href="/blog/loi-ripost-securite-quotidien-france-candidats-2027">loi Ripost</a> telle qu'adoptée et la <a href="/blog/presomption-legitime-defense-policiers-france-candidats-2027">loi sur la présomption de légitime défense</a> de juillet 2026.</p>
<p>Sur <a href="/question-politique/que-pensez-vous-de-la-justice-en-france">la justice</a>, il la juge trop lente et trop laxiste, comme Xavier Bertrand, Laurent Wauquiez et Nicolas Dupont-Aignan. Son <a href="https://www.edouardphilippe.fr/programme/justice" target="_blank" rel="noopener noreferrer">programme</a> prévoit le retour des peines planchers, des peines de prison courtes dès la première infraction et la suppression du juge d'application des peines. Sur le <a href="/question-politique/legalisation-cannabis-france">cannabis</a>, il veut renforcer la répression, avec des amendes plus fortes pour les consommateurs.</p>

<h2>Sur la société et le climat, des réponses du centre</h2>
<p>C'est sur ce bloc qu'il rejoint le plus François Hollande. Sur la <a href="/question-politique/laicite-religion-france">place de la religion</a>, Édouard Philippe retient la laïcité d'égalité stricte, où l'État traite toutes les croyances de la même façon, et non la formule des valeurs judéo-chrétiennes à protéger que choisissent Xavier Bertrand et Nicolas Dupont-Aignan. Il garde la PMA ouverte à toutes les femmes, accepte l'IVG dans la Constitution, et va vers <a href="/blog/loi-aide-a-mourir-france-candidats-2027">une légalisation encadrée de l'aide à mourir</a>, position que Bertrand et Dupont-Aignan refusent tous les deux.</p>
<p>Sur le climat, il veut transformer sérieusement l'économie vers une croissance durable, accompagner socialement le passage à la voiture électrique, et il juge la sobriété énergétique utile si elle est accompagnée d'aides à l'isolation. Nicolas Dupont-Aignan qualifie cette même sobriété d'arnaque, et Xavier Bertrand refuse de revenir en arrière sur le confort.</p>

<h2>Sur l'immigration, ferme sur les flux, pas sur le droit du sol</h2>
<p>Son <a href="https://www.edouardphilippe.fr/programme/immigration" target="_blank" rel="noopener noreferrer">programme</a> fixe l'objectif de diviser l'immigration par deux, avec un moratoire sur le regroupement familial et des quotas pour l'immigration de travail. Il veut renforcer les contrôles aux frontières européennes. Il refuse toute régularisation massive et s'en tient au cas par cas, comme Xavier Bertrand, Laurent Wauquiez et Bruno Retailleau. Sur <a href="/question-politique/expulsion-etrangers-condamnes-double-peine">l'expulsion des étrangers condamnés</a>, il veut le retour de la double peine pour tout délit, comme Xavier Bertrand.</p>
<p>Il s'écarte de la droite sur <a href="/question-politique/droit-du-sol-nationalite-france">le droit du sol</a>, qu'il veut garder tel quel en métropole et ne suspendre qu'à Mayotte. Sur deux autres questions migratoires, il retient des réponses qui commencent par « c'est un sujet complexe » : un équilibre entre accueil, intégration et fermeté, puis un appel à en débattre sereinement plutôt qu'à s'enfermer dans des positions.</p>

<h2>De quels candidats Édouard Philippe est-il le plus proche ?</h2>
${proximityListHtml('edouard-philippe')}
<p>Bruno Retailleau arrive en ${proximityRank('edouard-philippe', 'bruno-retailleau')} position, à ${proximityPercent('edouard-philippe', 'bruno-retailleau')} %, et François Hollande en ${proximityRank('edouard-philippe', 'francois-hollande')} position, à ${proximityPercent('edouard-philippe', 'francois-hollande')} %. Les plus éloignés sont ${furthestLinksHtml('edouard-philippe')}. Les duels détaillés : <a href="/comparer/edouard-philippe-vs-gabriel-attal">Philippe contre Attal</a>, <a href="/comparer/edouard-philippe-vs-laurent-wauquiez">Philippe contre Wauquiez</a>, <a href="/comparer/bruno-retailleau-vs-edouard-philippe">Philippe contre Retailleau</a>.</p>

<h2>Alors, droite ou gauche ?</h2>
<p>Ses réponses sont à droite sur l'argent, le travail, la sécurité et l'immigration. Elles sont au centre sur la laïcité, la fin de vie, le climat et le droit du sol. C'est sur ces questions de société et sur l'Europe qu'il rejoint François Hollande. À chacun de juger quel bloc compte le plus.</p>
<p>Comme pour les ${candidatesCount} personnalités du site, ces réponses sont des estimations construites à partir de déclarations publiques, de son bilan à Matignon et de ses interventions comme maire du Havre, puis vérifiées en novembre 2026 avec son programme de campagne. La page <a href="/candidat/edouard-philippe">Édouard Philippe</a> les liste toutes.</p>

<h2>Alors vous en pensez quoi ?</h2>
<p>Baisser les impôts des entreprises et légaliser l'aide à mourir : ces deux réponses cohabitent chez lui, et peut-être chez vous. Le quiz ne vous demande pas de choisir un camp, il compare vos réponses une par une.</p>
<p><a href="/themes">→ Faire le quiz</a></p>
`,
};
