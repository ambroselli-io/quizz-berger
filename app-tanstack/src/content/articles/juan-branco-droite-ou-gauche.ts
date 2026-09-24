import type { Article } from '~/types/article';
import { candidatesCount } from '~/utils/seo';
import { quizzQuestionsCount } from '~/utils/quizz';
import { proximityListHtml, furthestLinksHtml, proximityPercent, proximitySameAnswers } from '~/utils/proximity';

export const article: Article = {
  slug: 'juan-branco-droite-ou-gauche',
  title: 'Juan Branco, droite ou gauche ? Ses positions, question par question',
  excerpt:
    "L'avocat est à la gauche de la gauche sur l'impôt, l'immigration et la police. Sur l'OTAN, l'Ukraine et le référendum révocatoire, il répond comme François Asselineau. Décodage de ses positions pour 2027.",
  date: '2026-08-16',
  tag: 'Analyse',
  content: `
<p>Juan Branco partage ${proximitySameAnswers('juan-branco', 'nathalie-arthaud')} réponses sur ${quizzQuestionsCount} avec Nathalie Arthaud, candidate de Lutte ouvrière, et ${proximitySameAnswers('juan-branco', 'jean-luc-melenchon')} avec Jean-Luc Mélenchon. Sa proximité avec Nathalie Arthaud atteint ${proximityPercent('juan-branco', 'nathalie-arthaud')} %, le score le plus élevé entre deux personnalités de tout le site, et ${proximityPercent('juan-branco', 'jean-luc-melenchon')} % avec Jean-Luc Mélenchon. À l'autre bout, il tombe à ${proximityPercent('juan-branco', 'bruno-retailleau')} % avec Bruno Retailleau. Sur l'axe gauche-droite classique, le cas Branco se règle en trois secondes. Ce qui est intéressant vient après.</p>

<h2>Sur l'argent, la position la plus à gauche du quiz</h2>
<p>Sur les huit questions de politique fiscale, Juan Branco coche presque systématiquement la réponse la plus radicale disponible. Augmenter beaucoup les impôts sur les plus riches. Supprimer ceux des plus modestes et augmenter les aides. <a href="/question-politique/impots-des-plus-riches">Rétablir l'ISF et l'élargir</a> pour financer les services publics. Bloquer la circulation des capitaux pour empêcher l'évasion. Créer un ISF climatique visant les jets privés et les yachts.</p>
<p>Le travail suit la même pente : retour de la retraite à 60 ans ou moins, semaine de 32 heures ou quatre jours, SMIC à 2 000 euros net, emploi garanti par l'État, revenu universel plutôt qu'un RSA conditionné. Sur les services publics, il veut que tous les services essentiels soient publics et que l'État planifie la production industrielle.</p>

<h2>Sur l'immigration et la police, il est seul ou presque</h2>
<p>Là où beaucoup de candidats de gauche nuancent, Juan Branco tranche. Il veut assouplir la politique migratoire, ouvrir davantage les frontières européennes, régulariser massivement et sans condition, accorder le droit de vote à tout résident de longue durée, et <a href="/question-politique/expulsion-etrangers-condamnes-double-peine">supprimer complètement la double peine</a> pour les étrangers condamnés. Sur l'intégration, il répond qu'apprendre le français suffit.</p>
<p>Sur la police, il parle d'un vice profond et systémique de l'institution, juge que le discours sécuritaire est largement exagéré par les médias, mise tout sur la prévention et la réinsertion, veut légaliser le cannabis et accompagner les familles plutôt que les sanctionner. Il demande l'abrogation de la <a href="/blog/presomption-legitime-defense-policiers-france-candidats-2027">loi sur la présomption de légitime défense</a>, qu'il qualifie de permis de tuer, et s'oppose à la <a href="/blog/loi-ripost-securite-quotidien-france-candidats-2027">loi Ripost</a> au nom des causes sociales.</p>

<h2>Le point où il rejoint les souverainistes</h2>
<p>C'est ici que le classement se complique. Sur la politique étrangère, Juan Branco donne plusieurs réponses identiques à celles de François Asselineau, président de l'UPR, dont personne ne le rapprocherait spontanément.</p>
<ul>
<li><strong>Ukraine</strong> : cesser tout soutien et jouer un rôle de médiation avec la Russie. Même réponse qu'Asselineau, que Marine Le Pen et que Nicolas Dupont-Aignan.</li>
<li><a href="/question-politique/france-otan-alliance"><strong>OTAN</strong></a> : sortir de l'OTAN et de la plupart des alliances militaires.</li>
<li><strong>Armée européenne</strong> : chaque pays garde son armée indépendante.</li>
<li><strong>Afrique</strong> : retrait complet des bases et des troupes, sortie de la Françafrique.</li>
<li><strong>Lobbying européen</strong> : l'UE est corrompue jusqu'à la moelle, les lobbies dirigent tout.</li>
<li><a href="/blog/intervention-americaine-venezuela-maduro-france-candidats-2027"><strong>Venezuela</strong></a> : dénoncer l'impérialisme américain et défendre la non-ingérence.</li>
</ul>
<p>Sur les institutions, même croisement. Il demande <a href="/question-politique/referendum-initiative-citoyenne-ric">le référendum d'initiative citoyenne, y compris révocatoire</a>, et <a href="/question-politique/proportionnelle-elections">la proportionnelle intégrale</a>. Ce sont aussi les réponses de François Asselineau et de Nicolas Dupont-Aignan. Résultat mesuré par le quiz : Juan Branco est à ${proximityPercent('juan-branco', 'francois-asselineau')} % de François Asselineau, contre ${proximityPercent('juan-branco', 'edouard-philippe')} % d'Édouard Philippe et ${proximityPercent('juan-branco', 'xavier-bertrand')} % de Xavier Bertrand.</p>
<p>Deux différences majeures l'en séparent malgré tout. Il refuse le Frexit et la sortie de l'euro, jugeant la sortie trop risquée et préférant réformer la zone euro. Et sur l'immigration, ils sont aux deux extrémités exactes du quiz.</p>

<h2>De quels candidats Juan Branco est-il le plus proche ?</h2>
${proximityListHtml('juan-branco')}
<p>Les plus éloignés : ${furthestLinksHtml('juan-branco')}. Curiosité du classement, il est plus proche de Marine Le Pen (${proximityPercent('juan-branco', 'marine-le-pen')} %) que d'Éric Zemmour (${proximityPercent('juan-branco', 'eric-zemmour')} %), écart qui tient à l'économie et à la politique étrangère. Les duels : <a href="/comparer/jean-luc-melenchon-vs-juan-branco">Branco contre Mélenchon</a>, <a href="/comparer/francois-hollande-vs-juan-branco">Branco contre Hollande</a>, <a href="/comparer/francois-asselineau-vs-juan-branco">Branco contre Asselineau</a>.</p>

<h2>Alors, droite ou gauche ?</h2>
<p>À gauche, et à l'extrémité de cette gauche sur le plan économique et social. La nuance utile porte ailleurs : sur la souveraineté militaire et la défiance envers les institutions, ses réponses croisent celles de candidats classés à droite, ce qui est cohérent avec sa position d'avocat anti-système plutôt qu'avec un logiciel de parti.</p>
<p>Ces réponses sont estimées. Juan Branco n'a pas rempli le quiz ; ses positions ont été reconstituées à partir de ses livres, de ses interventions publiques et de ses déclarations de campagne. La page <a href="/candidat/juan-branco">Juan Branco</a> détaille les ${quizzQuestionsCount} réponses, et il reste possible de nous signaler une erreur.</p>

<h2>Alors vous en pensez quoi ?</h2>
<p>Sortir de l'OTAN sans sortir de l'euro, taxer les yachts et légaliser le cannabis : cette combinaison précise n'appartient à aucun parti installé. Elle est peut-être la vôtre, ou pas du tout. Répondez aux mêmes questions et regardez le classement que ça donne chez vous, sur les ${candidatesCount} candidats.</p>
<p><a href="/themes">→ Faire le quiz</a></p>
`,
};
