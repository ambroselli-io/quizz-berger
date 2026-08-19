import type { Article } from '~/types/article';
import { candidatesCount, getAnswerDistribution } from '~/utils/seo';

const honnetete = getAnswerDistribution('question-2027-corr-04');
const financement = getAnswerDistribution('question-2027-corr-05');

export const article: Article = {
  slug: 'salaire-patrimoine-elus-france',
  title: 'Combien gagnent les responsables politiques français, et où vérifier leur patrimoine',
  excerpt:
    "Un député touche 5 953,34 € net par mois, chiffre publié par l'Assemblée nationale. La « fortune » d'un candidat, elle, n'est publiée nulle part, et la loi punit sa divulgation de 45 000 € d'amende. Ce qui est vérifiable, et comment le vérifier.",
  date: '2026-08-18',
  tag: 'Analyse',
  content: `
<p>Tapez le nom d'un candidat suivi du mot « fortune » et vous trouverez un chiffre. Il ne viendra d'aucune source. Les rémunérations des élus, elles, sont fixées par la loi et publiées au centime près par les assemblées elles-mêmes. Le patrimoine obéit à une règle différente, et beaucoup plus stricte.</p>

<h2>Ce que gagne un député : 5 953,34 € net par mois</h2>
<p>L'Assemblée nationale publie le détail de l'indemnité parlementaire. Au 1er janvier 2026, elle se compose ainsi :</p>
<ul>
<li><strong>Indemnité de base</strong> : 5 931,95 € brut</li>
<li><strong>Indemnité de résidence</strong> (3 % de la base) : 177,96 € brut</li>
<li><strong>Indemnité de fonction</strong> (25 % des deux précédentes) : 1 527,48 € brut</li>
<li><strong>Total</strong> : 7 637,39 € brut, soit <strong>5 953,34 € net</strong> avant impôt sur le revenu</li>
</ul>
<p>Un sénateur perçoit exactement la même indemnité brute, 7 637,39 €, puisqu'elle repose sur la même base légale. Son net diffère, à 5 676,12 €, parce que ses cotisations retraite ne sont pas les mêmes. Le Sénat publie ce calcul ligne par ligne, cotisation par cotisation.</p>

<h3>Deux enveloppes qu'on confond souvent avec le salaire</h3>
<p>À côté de l'indemnité, un député dispose de deux budgets qui ne lui appartiennent pas et qu'il ne peut pas garder :</p>
<ul>
<li>La <strong>dotation de fonctionnement parlementaire</strong>, 7 238,04 € par mois depuis le 1er janvier 2026, destinée aux frais de mandat (permanence, déplacements, documentation). Les dépenses sont contrôlées et le reliquat est restitué.</li>
<li>Le <strong>crédit collaborateurs</strong>, 11 463 € par mois, qui sert à payer jusqu'à cinq assistants parlementaires. Cet argent va sur leurs fiches de paie, pas sur celle du député.</li>
</ul>
<p>Additionner ces trois lignes pour annoncer qu'un député « gagne 26 000 € par mois » est l'erreur la plus répandue sur le sujet. C'est précisément ce mélange qui était en cause dans <a href="/blog/ineligibilite-marine-le-pen-france-candidats-2027">l'affaire des assistants d'eurodéputés</a> : l'argent des collaborateurs employé à autre chose que le travail parlementaire.</p>

<h2>Le président, le Premier ministre et les ministres</h2>
<p>Leur rémunération est fixée par décret, le décret n° 2012-983, et indexée sur les grilles de la haute fonction publique. Un président ne décide donc pas de sa propre augmentation. Le président de la République et le Premier ministre perçoivent le même montant, de l'ordre de 16 000 € brut par mois, et un ministre environ 10 700 € brut. Ces montants suivent la valeur du point d'indice et bougent avec elle, ce qui explique les écarts entre les chiffres publiés d'une année sur l'autre.</p>

<h2>Le patrimoine : consultable, mais interdit de publication</h2>
<p>C'est le point que presque personne n'explique, et il change tout. La France distingue deux régimes.</p>
<p><strong>Ce que la Haute Autorité pour la transparence de la vie publique (HATVP) publie en ligne</strong>, librement consultable par tous sur hatvp.fr : les déclarations de situation patrimoniale du président de la République et des membres du gouvernement, ainsi que les déclarations d'intérêts et d'activités des députés, des sénateurs, des députés européens, des présidents de région et de département. Une déclaration d'intérêts liste les activités, les participations et les fonctions annexes. Elle ne donne pas la valeur du patrimoine.</p>
<p><strong>Ce qui n'est pas publié</strong> : la déclaration de situation patrimoniale d'un député ou d'un sénateur. Elle existe, elle est vérifiée par la HATVP, mais elle n'est consultable qu'en préfecture, uniquement par un électeur inscrit dans le département concerné, sur présentation d'une pièce d'identité et d'une preuve d'inscription sur les listes électorales. La consultation se fait sur place, sans photographie ni copie, pendant la durée du mandat et six mois après.</p>
<p>Et surtout, l'article LO 135-2 du code électoral interdit de publier ou de divulguer, de quelque manière que ce soit, tout ou partie de ces déclarations. La sanction est de <strong>45 000 € d'amende</strong>. L'interdiction tombe seulement si l'élu a lui-même rendu sa déclaration publique.</p>

<h2>Pourquoi les chiffres de « fortune » qui circulent ne valent rien</h2>
<p>Aucun média sérieux ne peut publier le patrimoine d'un parlementaire sans s'exposer à cette amende. Les pages qui affichent « fortune de X : 2,5 millions d'euros » ne citent donc aucune source, pour une raison simple : il n'y en a pas. Ce sont des estimations produites par des sites d'audience, souvent recopiées les unes sur les autres, parfois calculées à partir du seul salaire multiplié par le nombre d'années de mandat.</p>
<p>Nous ne publions pas ces chiffres, et nous n'en produirons pas. Si vous voulez vérifier le patrimoine d'un ministre ou du président, allez sur hatvp.fr. Pour un député ou un sénateur, prenez rendez-vous à la préfecture de son département. C'est contraignant, et c'est le seul chemin légal.</p>

<h2>Ce que les candidats pensent, eux, de l'honnêteté du système</h2>
<p>Le Quizz du Berger pose la question directement : « Pensez-vous que le système politique français est globalement honnête ? » Sur les ${candidatesCount} personnalités du site, la répartition est nette. Elles sont ${honnetete[0]} à répondre que le système est pourri jusqu'à la moelle et au service des riches et des lobbies, ${honnetete[1]} à voir de vrais problèmes de corruption appelant une grande opération de nettoyage, et ${honnetete[2]} à estimer qu'il y a des brebis galeuses mais que l'ensemble fonctionne. ${honnetete[3] === 0 ? 'Aucune ne choisit' : `Seules ${honnetete[3]} choisissent`} la réponse la plus rassurante, celle qui décrit une démocratie solide n'ayant pas besoin d'être remise en cause.</p>
<p>Le thème <a href="/theme/corruption-et-lobbying">Corruption et lobbying</a> pose cinq autres questions du même ordre : le recours aux cabinets de conseil privés, le lobbying, les allers-retours entre politique et secteur privé, le financement des campagnes, et <a href="/question-politique/ineligibilite-elus-condamnes">l'inéligibilité immédiate des élus condamnés</a>. Sur le financement des campagnes, ${financement[0]} candidats veulent un financement exclusivement public à parts égales, ${financement[1]} un financement principalement public avec un plafond très bas pour les dons privés, et ${financement[2]} jugent le système actuel équilibré.</p>
<p>Sur le nombre d'élus, le débat est encore ailleurs : <a href="/blog/reduction-nombre-parlementaires-france-candidats-2027">faut-il réduire le nombre de parlementaires</a> pour faire des économies, ou est-ce affaiblir le Parlement face à l'exécutif ?</p>

<h2>Où vérifier, en trois liens</h2>
<ul>
<li><a href="https://www.assemblee-nationale.fr/dyn/synthese/deputes-groupes-parlementaires/la-situation-materielle-du-depute" target="_blank" rel="noreferrer">Assemblée nationale</a> : le détail officiel de l'indemnité d'un député, mis à jour à chaque revalorisation.</li>
<li><a href="https://www.senat.fr/connaitre-le-senat/role-et-fonctionnement/lindemnite-parlementaire.html" target="_blank" rel="noreferrer">Sénat</a> : le même calcul pour un sénateur, cotisation par cotisation.</li>
<li><a href="https://www.hatvp.fr/" target="_blank" rel="noreferrer">HATVP</a> : les déclarations d'intérêts des parlementaires et les déclarations de patrimoine des ministres et du président.</li>
</ul>

<h2>Alors vous en pensez quoi ?</h2>
<p>Un député à 5 953 € net, est-ce trop, trop peu, ou le prix normal d'un mandat à plein temps ? Faut-il rendre publiques les déclarations de patrimoine des parlementaires comme celles des ministres ? Le quiz pose ces questions, et compare vos réponses à celles des ${candidatesCount} candidats à la présidentielle 2027.</p>
<p><a href="/themes">→ Faire le quiz</a></p>
`,
};
