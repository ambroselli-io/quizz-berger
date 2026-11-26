import type { Article } from '~/types/article';
import { candidatesCount } from '~/utils/seo';

const EURONEWS = 'https://fr.euronews.com/2026/11/23/emmanuel-macron-confirme-envisager-ladoption-dune-regle-dor-budgetaire';
const LCP_TEXTE = 'https://lcp.fr/actualites/regle-d-or-que-prevoit-vraiment-le-texte-qu-emmanuel-macron-envisage-de-faire-adopter';
const LCP_LE_PEN = 'https://lcp.fr/actualites/budget-comment-fonctionnerait-la-regle-d-or-que-marine-le-pen-veut-faire-adopter-par';
const PUBLIC_SENAT =
  'https://www.publicsenat.fr/actualites/politique/il-se-fout-de-la-gueule-du-monde-la-regle-dor-budgetaire-evoquee-par-emmanuel-macron-laisse-dubitatif';
const INSOUMISSION = 'https://linsoumission.fr/2026/11/23/regle-dor-budgetaire-macron-le-pen/';

const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const title = `Règle d'or budgétaire dans la Constitution : le projet de Macron et les positions des ${candidatesCount} candidats à la présidentielle 2027`;

export const article: Article = {
  slug: 'regle-d-or-budgetaire-constitution-france-candidats-2027',
  title,
  excerpt:
    "Emmanuel Macron envisage de réunir le Congrès en janvier pour inscrire une « règle d'or » budgétaire dans la Constitution. Que contient le texte de 2011 qu'il veut ressortir, et quels candidats à 2027 y sont favorables ?",
  date: '2026-11-26',
  tag: 'Analyse',
  content: `
<p>« ${ext(EURONEWS, "C'est un débat qui n'est pas illégitime")} », a dit Emmanuel Macron au Figaro le dimanche 22 novembre, à propos d'une « règle d'or » budgétaire inscrite dans la Constitution. Selon La Tribune Dimanche, le président envisage de convoquer le Parlement en Congrès à Versailles en janvier pour faire adopter un texte voté en 2011 et jamais ratifié. La France affiche ${ext(EURONEWS, "un déficit de 5,4 % du PIB et une dette de 119 %")}, et l'écart de taux avec l'Allemagne dépasse 150 points de base, un niveau inédit depuis 2012.</p>

<h2>Qu'est-ce que la règle d'or budgétaire ?</h2>
<p>Le terme ${ext(EURONEWS, "n'a pas de définition unique")}. Il désigne une norme qui limite une variable des finances publiques (le déficit, la dette ou les dépenses) et qui s'impose au gouvernement et au Parlement quand ils votent le budget. Au sens le plus strict, elle interdit tout déficit. D'autres versions fixent seulement une trajectoire de retour à l'équilibre.</p>
<p>Plusieurs pays en ont une. En Suisse, l'État doit dégager des excédents en période de croissance et peut être en déficit en période de récession. L'Allemagne a inscrit un « frein à l'endettement » dans sa Constitution en 2009, puis ${ext(EURONEWS, "l'a assoupli au printemps 2025")} pour financer sa défense et ses infrastructures.</p>

<h3>Ce que prévoit le texte de 2011</h3>
<p>Le projet de loi constitutionnelle « relatif à l'équilibre des finances publiques » a été adopté par l'Assemblée et le Sénat sous Nicolas Sarkozy, puis laissé de côté avant la présidentielle de 2012. ${ext(LCP_TEXTE, "Il n'interdit pas les déficits")}. Il crée des « lois-cadres d'équilibre des finances publiques », votées pour au moins trois ans, qui fixent chaque année un plafond de dépenses et un minimum de recettes nouvelles. Aucun budget de l'État ou de la Sécurité sociale ne pourrait être adopté sans loi-cadre applicable, et le Conseil constitutionnel vérifierait que chaque budget la respecte.</p>
<p>Le texte ayant déjà été voté dans les mêmes termes par les deux chambres, il ne manque qu'un vote du Congrès à la majorité des trois cinquièmes. Selon LCP, ce seuil ${ext(LCP_TEXTE, "est atteignable avec les voix du RN, de la droite et du centre")}. Il faudrait ensuite voter une première loi-cadre avant le 28 février, date à laquelle le Parlement suspend ses travaux pour la campagne, ce que LCP juge très incertain.</p>

<h2>Comment le débat est revenu</h2>
<ul>
<li><strong>Août 2026</strong> : devant le Medef, Marine Le Pen se dit favorable à une règle d'or, ${ext(LCP_LE_PEN, "alors que la « tradition politique » du RN y était opposée")}, reconnaît-elle.</li>
<li><strong>1<sup>er</sup> octobre</strong> : dans une tribune à L'Opinion, elle propose de l'adopter par référendum, avec ${ext(LCP_LE_PEN, "un déficit plafonné à 4,9 % du PIB en 2027, puis 2,4 % en 2033")}, jusqu'à ce que la dette revienne sous 60 % du PIB.</li>
<li><strong>Début novembre</strong> : après le rejet du budget 2027 par l'Assemblée, Marine Le Pen ${ext(PUBLIC_SENAT, "demande au président d'engager en urgence une réforme de la Constitution")}.</li>
<li><strong>22 novembre</strong> : La Tribune Dimanche révèle le projet de Congrès en janvier, et Emmanuel Macron le confirme au Figaro. « ${ext(EURONEWS, "S'il y a encore de la volatilité d'ici janvier, réfléchir à une règle d'or du type de celle de 2011 peut être une idée à explorer")} », dit-il.</li>
<li><strong>23 novembre</strong> : au Sénat, en plein examen du budget, les réactions sont réservées, y compris à droite. L'entourage de Gérard Larcher se dit ${ext(PUBLIC_SENAT, "« favorable sur le principe, comme en 2011 », mais s'interroge sur le moment choisi")}.</li>
</ul>

<h2>Pourquoi la règle d'or divise</h2>

<h3>1. Rassurer les prêteurs</h3>
<p>Pour ses partisans, une règle inscrite dans la Constitution montre aux marchés que la France tiendra sa trajectoire, quel que soit le vainqueur de 2027. Un proche du président, cité par Public Sénat, y voit un moyen de ${ext(PUBLIC_SENAT, "« desserrer l'étau des taux »")} et met en avant des « craintes sur la crédibilité des programmes des candidats favoris ».</p>

<h3>2. Lier les mains du prochain président</h3>
<p>C'est le reproche le plus répandu, et il ne vient pas que de la gauche. En 2011, le socialiste Pierre-Alain Muet demandait déjà comment le gouvernement pouvait ${ext(LCP_TEXTE, "inscrire « pour ses successeurs, des règles qu'il a violées tous les jours »")}. En 2026, le sénateur LR Jean-François Husson parle de ${ext(PUBLIC_SENAT, "« se payer la tête du Parlement et des Français »")}, et le président du groupe socialiste du Sénat, Patrick Kanner, d'un « pompier pyromane ». L'économiste Gabriel Zucman juge ${ext(EURONEWS, "« un peu gonflé »")} de donner des leçons de gestion après les déficits du quinquennat.</p>

<h3>3. La Constitution et les choix économiques</h3>
<p>Une partie de la gauche conteste le principe lui-même. Pour le site L'Insoumission, proche de La France insoumise, ${ext(INSOUMISSION, "la Constitution « ne doit pas devenir l'instrument de sanctuarisation d'une politique économique particulière »")}, et les choix budgétaires doivent rester soumis aux élections. Les défenseurs du texte de 2011 répondent qu'il laisse chaque gouvernement libre de fixer sa propre trajectoire, et contraint seulement à la respecter une fois votée.</p>

<h3>4. Une règle de plus, ou une règle appliquée ?</h3>
<p>La France est déjà soumise aux règles européennes de déficit et de dette. David Lisnard le rappelle : ${ext(PUBLIC_SENAT, "« la règle d'or européenne, on ne l'applique pas »")}, avec une dette de 120 % du PIB pour un plafond de 60 %. Il y voit le risque de « la posture, de l'affichage ». La question de l'équilibre lui-même fait l'objet d'une <a href="/question-politique/la-france-devrait-elle-viser-un-budget-a-l-equilibre">question dédiée du quiz</a>.</p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Le Quizz du Berger ajoute une question sur ce point : <a href="/question-politique/regle-d-or-budgetaire-constitution">faut-il inscrire une règle d'or budgétaire dans la Constitution ?</a> Les réponses vont de l'interdiction pure et simple du déficit au refus de toute règle, européenne comprise. Quand un candidat ne s'est pas exprimé, sa position est estimée à partir de ses réponses au quiz sur la dette et l'équilibre budgétaire, et le texte le signale.</p>

<h3>Famille 1 : une règle d'or dans la Constitution, avec une trajectoire obligatoire</h3>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (Rassemblement national) — propose un déficit toujours inférieur au seuil qui stabilise la dette, avec des exceptions votées aux trois cinquièmes, et l'adoption par référendum. Sur le projet présidentiel : ${ext(PUBLIC_SENAT, "« C'est nous qui l'avons demandée. Ce serait dommage qu'on ne la soutienne pas »")}, tout en jugeant le texte de 2011 moins abouti que le sien.</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (Les Républicains) — ${ext(PUBLIC_SENAT, "« Inscrire la règle d'or dans la Constitution serait une bonne chose »")}, a-t-il écrit sur X. Il avait proposé fin septembre de la faire adopter par référendum.</li>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — défend dans son programme une règle d'or pour ${ext(PUBLIC_SENAT, "« contraindre le gouvernement et le Parlement de revenir vers l'équilibre budgétaire »")}.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — veut ${ext(PUBLIC_SENAT, "« imposer des budgets à l'équilibre d'ici dix ans, sauf crise exceptionnelle »")}.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> (Nouvelle Énergie) — répond ${ext(PUBLIC_SENAT, "« pourquoi pas »")} pour que l'État soit « mieux géré », mais s'étonne du calendrier et rappelle que les règles européennes ne sont pas appliquées.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> (Nous France) — position estimée : ses réponses au quiz font de la réduction de la dette une priorité, dans la ligne de la droite qui défend la règle d'or depuis 2011.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — position estimée, d'après ses réponses au quiz qui visent l'équilibre budgétaire.</li>
<li><a href="/candidat/olivier-becht">Olivier Becht</a> (sans étiquette, centre) — position estimée, proche de celle des candidats issus de la majorité présidentielle.</li>
</ul>

<h3>Famille 2 : encadrer le déficit, sans toucher à la Constitution</h3>
<ul>
<li><a href="/candidat/francois-hollande">François Hollande</a> (Parti socialiste) — position estimée. Son ancien ministre Patrick Kanner, aujourd'hui président du groupe PS au Sénat, rappelle que ce gouvernement ${ext(PUBLIC_SENAT, "a « ramené le déficit à 3 % »")} et ne juge pas l'équilibre « mineur », à condition de le ramener « dans l'équité et la justice fiscale ».</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> (La France humaniste) — position estimée, d'après ses réponses au quiz favorables à un déficit limité.</li>
<li><a href="/candidat/karim-bouamrane">Karim Bouamrane</a> (La France Humaine et Forte) — position estimée, même raisonnement.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (Debout la France) — position estimée, d'après ses réponses au quiz favorables à l'équilibre budgétaire.</li>
<li><a href="/candidat/clara-egger">Clara Egger</a> (Solution démocratique) — position estimée, à partir de ses réponses au quiz.</li>
<li><a href="/candidat/teddy-riner">Teddy Riner</a> (sans étiquette) — position estimée, à partir de ses réponses au quiz.</li>
</ul>

<h3>Famille 3 : le déficit reste un choix du Parlement, voté chaque année</h3>
<ul>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place publique) — position estimée : ses réponses au quiz acceptent un déficit qui finance l'investissement, et le groupe socialiste du Sénat, qui le soutient, critique la démarche du président.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — position estimée, d'après ses réponses au quiz favorables à l'investissement public dans la transition écologique.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — position estimée, même raisonnement.</li>
<li><a href="/candidat/natacha-polony">Natacha Polony</a> (Nous sommes la France) — position estimée, à partir de ses réponses au quiz.</li>
<li><a href="/candidat/antoine-mikolajczak">Antoine Mikolajczak</a> (Équinoxe) — position estimée.</li>
<li><a href="/candidat/benoit-mathieu">Benoît Mathieu</a> (sans étiquette) — position estimée.</li>
<li><a href="/candidat/parti-animaliste">Parti animaliste</a> — position estimée.</li>
<li><a href="/candidat/parti-pirate">Parti pirate</a> — position estimée.</li>
<li><a href="/candidat/sylvain-durif">Sylvain Durif</a> (sans étiquette) — position estimée.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> (sans étiquette) — position estimée.</li>
</ul>

<h3>Famille 4 : pas de règle d'or, et desserrer aussi les règles européennes</h3>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (La France insoumise) — L'Insoumission présente la règle d'or comme un moyen d'${ext(INSOUMISSION, "« empêcher toute alternative au néolibéralisme »")}, et oppose le programme de LFI : circuit du Trésor, impôt sur la fortune, transformation d'une partie de la dette détenue par les banques centrales.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (Parti communiste français) — position estimée. Au Sénat, le communiste Pascal Savoldelli juge ${ext(PUBLIC_SENAT, "« quand même osé »")} d'en parler en plein débat budgétaire.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (Lutte ouvrière) — position estimée, d'après ses réponses au quiz sur la dette.</li>
<li><a href="/candidat/anasse-kazib">Anasse Kazib</a> (Révolution permanente) — position estimée, même raisonnement.</li>
<li><a href="/candidat/selma-labib">Selma Labib</a> (NPA-Révolutionnaires) — position estimée, même raisonnement.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> (Les Ruches) — position estimée.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (Union populaire républicaine) — position estimée : il propose de sortir de l'Union européenne, et donc de ses règles budgétaires.</li>
<li><a href="/candidat/florian-philippot">Florian Philippot</a> (Les Patriotes) — position estimée, même raisonnement.</li>
<li><a href="/candidat/francis-lalanne">Francis Lalanne</a> (France Libre) — position estimée, même raisonnement.</li>
</ul>

<h2>Arguments pour et contre une règle d'or dans la Constitution</h2>
<table>
<thead><tr><th>Pour</th><th>Contre</th></tr></thead>
<tbody>
<tr><td>Une règle constitutionnelle engage tous les gouvernements et peut faire baisser les taux auxquels la France emprunte.</td><td>Elle lie les mains du prochain président, sur un sujet que les électeurs doivent pouvoir trancher en 2027.</td></tr>
<tr><td>Le texte de 2011 ne fixe pas de chiffre : chaque majorité choisit sa trajectoire, mais doit ensuite s'y tenir.</td><td>Un plafond de dépenses voté pour plusieurs années réduit la marge du Parlement en cas de crise ou de changement de majorité.</td></tr>
<tr><td>Le Conseil constitutionnel contrôlerait que chaque budget respecte la trajectoire votée.</td><td>Les règles européennes existent déjà et ne sont pas respectées : une règle de plus ne garantit pas qu'elle sera appliquée.</td></tr>
</tbody>
</table>

<h2>Pour aller plus loin</h2>
<ul>
<li><a href="/question-politique/regle-d-or-budgetaire-constitution">La question du quiz sur la règle d'or budgétaire</a></li>
<li><a href="/question-politique/la-france-devrait-elle-viser-un-budget-a-l-equilibre">La France devrait-elle viser un budget à l'équilibre ?</a></li>
<li><a href="/question-politique/dette-publique-france">Dette publique : que faire ?</a></li>
<li><a href="/blog/budget-2027-rejet-unanime-france-candidats-2027">Budget 2027 rejeté à l'unanimité à l'Assemblée</a></li>
<li><a href="/blog/dette-publique-taux-record-france-candidats-2027">Dette publique et taux record</a></li>
<li><a href="/theme/depenses-et-dette-publiques">Toutes les questions du thème dépenses et dette publiques</a></li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: `Règle d'or budgétaire : le projet de Congrès d'Emmanuel Macron, le texte de 2011, et les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
    author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
    datePublished: '2026-11-26',
    about: [
      { '@type': 'Thing', name: "Règle d'or budgétaire" },
      { '@type': 'Thing', name: 'Dette publique de la France' },
      { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
    ],
  },
};
