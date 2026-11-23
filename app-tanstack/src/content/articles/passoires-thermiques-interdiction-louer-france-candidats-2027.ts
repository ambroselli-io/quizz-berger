import type { Article } from '~/types/article';
import { candidatesCount } from '~/utils/seo';

const NP = 'https://nosparlementaires.fr/actualites/passoires-thermiques-interdiction-louer-supprimee-assemblee-rn';
const EXPRESS =
  'https://actu.orange.fr/politique/logement-les-deputes-votent-la-fin-de-l-interdiction-progressive-de-louer-des-passoires-thermiques-l-express-via-6medias-CNT000002tNpT7.html';
const AFP_PHILIPPE =
  'https://www.france24.com/fr/info-en-continu/20261119-%C3%A9douard-philippe-veut-mettre-en-pause-l-interdiction-de-location-des-passoires-thermiques';

const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const title = `Passoires thermiques : fin de l'interdiction de louer ? Le vote des députés et les positions des ${candidatesCount} candidats à la présidentielle 2027`;

export const article: Article = {
  slug: 'passoires-thermiques-interdiction-louer-france-candidats-2027',
  title,
  excerpt:
    "Les députés ont voté par 108 voix contre 102 la suppression de l'interdiction de louer les passoires thermiques, contre l'avis du gouvernement. Que change ce vote, et que veulent les candidats à 2027 ?",
  date: '2026-11-23',
  tag: 'Analyse',
  content: `
<p>Mardi 17 novembre, ${ext(NP, "par 108 voix contre 102, l'Assemblée nationale a adopté un amendement du Rassemblement national")} qui supprime le calendrier d'interdiction de louer les passoires thermiques. Le gouvernement y était opposé. Le projet de loi logement qui le contient passe au vote solennel le mardi 24 novembre, puis devant une commission mixte paritaire avec le Sénat. D'ici là, ${ext(EXPRESS, "les interdictions restent en vigueur")}. Deux jours après le vote, Édouard Philippe a proposé de les suspendre pendant tout le prochain quinquennat.</p>

<h2>Passoire thermique : de quoi parle-t-on ?</h2>
<p>Une passoire thermique est un logement classé F ou G au diagnostic de performance énergétique (DPE), l'étiquette qui va de A (très économe) à G. La loi Climat et résilience du 22 août 2021 a fait de cette étiquette un critère du logement « décent », celui qu'un propriétaire a le droit de louer. ${ext(EXPRESS, "Les logements G ne répondent plus à ce critère depuis le 1<sup>er</sup> janvier 2025")} pour les baux signés, renouvelés ou reconduits depuis cette date. Les logements F devaient suivre en 2028, les E en 2034.</p>
<p>Ce n'est pas une interdiction pénale. ${ext(NP, "Le locataire d'une passoire thermique peut saisir le juge")}, qui peut ordonner des travaux et réduire ou suspendre le loyer. En pratique, le bailleur ne peut plus signer de nouveau bail pour ces logements.</p>

<h2>Ce que les députés ont voté le 17 novembre</h2>
<ul>
<li><strong>7 et 8 juillet 2026</strong> : le Sénat adopte le projet de loi « relance et décentralisation du logement ». Son article 6 garde le calendrier mais ajoute des sursis : ${ext(NP, "un logement reste réputé décent pendant les travaux, jusqu'à trois ans, et cinq ans en copropriété")}.</li>
<li><strong>Septembre 2026</strong> : en commission, à l'Assemblée, 34 amendements du RN sur le calendrier sont rejetés.</li>
<li><strong>17 novembre 2026</strong> : en séance, la gauche échoue d'abord à supprimer l'article 6, par 166 voix contre 46. Un amendement de la Droite républicaine qui revenait au droit d'avant 2021 est rejeté par 110 voix contre 105. Puis l'amendement n° 85 de Frédéric Falcon (RN, Aude) passe par 108 voix contre 102 et 7 abstentions. ${ext(NP, "Le RN (76 voix), la Droite républicaine (15) et l'UDR (7) fournissent 98 des 108 voix pour")}. Les macronistes, le MoDem et la gauche votent contre, à quelques exceptions près.</li>
<li><strong>Après le scrutin</strong> : trois députés comptés pour voulaient voter contre, et un quatrième voulait s'abstenir. Avec ces mises au point, ${ext(NP, "l'amendement aurait été rejeté par 105 voix contre 104")}. Une mise au point ne change pas le résultat d'un scrutin.</li>
<li><strong>24 novembre 2026</strong> : vote solennel sur l'ensemble du texte. Le gouvernement peut encore demander une seconde délibération pour faire revoter l'article.</li>
</ul>
<p>L'amendement fait tomber les trois échéances, y compris celle de 2025 qui écarte déjà les logements G. Le logement décent garde un critère énergétique, mais exprimé en consommation d'énergie par mètre carré et par an, sans référence aux étiquettes du DPE. L'exposé de l'amendement assume ce changement : ${ext(NP, "« Un logement peut être sain, entretenu, habitable et ne présenter aucun danger pour ses occupants tout en étant classé F ou G par le DPE. »")}</p>
<p>Le ministre du Logement, Vincent Jeanbrun, avait donné un avis défavorable. Après le vote, il a résumé : ${ext(NP, "« Le gouvernement propose, le Parlement dispose. »")}</p>

<h2>Pourquoi l'interdiction de louer divise</h2>

<h3>1. La pénurie de logements à louer</h3>
<p>Le gouvernement de Sébastien Lecornu juge le calendrier trop rigide face à la pénurie et voulait ${ext(AFP_PHILIPPE, "donner plus de temps aux propriétaires pour rénover")}. Frédéric Falcon va plus loin : selon lui, ${ext(EXPRESS, "les règles actuelles aggravent les tensions sur le marché locatif")}. Édouard Philippe avance le même argument pour justifier une pause : ${ext(AFP_PHILIPPE, "qu'« aucun logement ne sorte du marché locatif durant le quinquennat »")}.</p>

<h3>2. Les factures des locataires</h3>
<p>Les associations de locataires voient le vote à l'inverse. Manuel Domergue, directeur des études de la Fondation pour le logement, parle d'${ext(EXPRESS, "« une catastrophe pour les locataires »")}. Damien Barbosa, du collectif Rénovons, reproche aux députés de favoriser les propriétaires au détriment des ménages modestes, plus exposés aux factures de chauffage l'hiver et aux fortes chaleurs l'été.</p>

<h3>3. Interdire ou inciter</h3>
<p>Le RN veut faire du DPE un simple outil d'information, et ${ext(NP, "l'exposé de son amendement")} préfère « l'incitation, l'accompagnement et l'innovation » à l'interdiction. Les écologistes, qui voulaient supprimer jusqu'aux sursis prévus par le gouvernement, refusent ${ext(NP, "« que la crise du logement serve de prétexte à ce recul à la fois climatique et social »")}. La question de l'argent public pour les travaux reste ouverte des deux côtés : le quiz la pose séparément, dans <a href="/question-politique/que-faire-face-aux-logements-insalubres-et-aux-passoires-thermiques">que faire face aux logements insalubres et aux passoires thermiques ?</a></p>

<h2>Les positions des ${candidatesCount} candidats à la présidentielle 2027</h2>
<p>Le quiz pose la question telle quelle : <a href="/question-politique/que-faire-de-l-interdiction-de-louer-les-passoires-thermiques-g-depuis-2025-f-en-2028-e-en-2034">que faire de l'interdiction de louer les passoires thermiques ?</a> Les positions ci-dessous viennent des réponses au quiz, établies à partir des prises de position publiques de chaque candidat. Peu d'entre eux ont commenté le vote du 17 novembre ; nous le signalons quand c'est le cas.</p>

<h3>Famille 1 : supprimer l'interdiction</h3>
<ul>
<li><a href="/candidat/marine-le-pen">Marine Le Pen</a> (RN) — C'est un député de son groupe qui a déposé l'amendement, et les 76 députés RN présents l'ont voté.</li>
<li><a href="/candidat/eric-zemmour">Éric Zemmour</a> (Reconquête) — Pour la suppression, selon le quiz.</li>
<li><a href="/candidat/nicolas-dupont-aignan">Nicolas Dupont-Aignan</a> (DLF) — Même position dans le quiz.</li>
<li><a href="/candidat/florian-philippot">Florian Philippot</a> (Les Patriotes) — Même position dans le quiz.</li>
<li><a href="/candidat/francois-asselineau">François Asselineau</a> (UPR) — Même position dans le quiz.</li>
</ul>

<h3>Famille 2 : repousser le calendrier</h3>
<p>Cette famille garde le principe d'une interdiction, mais plus tard.</p>
<ul>
<li><a href="/candidat/edouard-philippe">Édouard Philippe</a> (Horizons) — Propose ${ext(AFP_PHILIPPE, "un « moratoire sur l'interdiction de location des passoires thermiques sur la durée du quinquennat »")}, présenté le 19 novembre au Sommet de la construction. L'AFP note qu'il va moins loin que le RN.</li>
<li><a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (LR) — Pour un report, selon le quiz. Les députés de la Droite républicaine ont voté la suppression.</li>
<li><a href="/candidat/gabriel-attal">Gabriel Attal</a> (Renaissance) — Pour un report, selon le quiz. Son groupe a voté contre l'amendement RN, à 26 voix sur 28.</li>
<li><a href="/candidat/xavier-bertrand">Xavier Bertrand</a> (LR) — Même position dans le quiz.</li>
<li><a href="/candidat/david-lisnard">David Lisnard</a> (Nouvelle Énergie) — Même position dans le quiz.</li>
<li><a href="/candidat/olivier-becht">Olivier Becht</a> — Même position dans le quiz.</li>
<li><a href="/candidat/natacha-polony">Natacha Polony</a> (Nous sommes la France) — Même position dans le quiz.</li>
<li><a href="/candidat/teddy-riner">Teddy Riner</a> — Même position dans le quiz.</li>
<li><a href="/candidat/clara-egger">Clara Egger</a> (Solution démocratique) — Même position dans le quiz.</li>
<li><a href="/candidat/patrick-sebastien">Patrick Sébastien</a> — Même position dans le quiz.</li>
</ul>

<h3>Famille 3 : garder le calendrier actuel</h3>
<ul>
<li><a href="/candidat/raphael-glucksmann">Raphaël Glucksmann</a> (Place publique) — Pour le calendrier de la loi Climat, selon le quiz.</li>
<li><a href="/candidat/francois-hollande">François Hollande</a> (PS) — Même position dans le quiz. Les députés socialistes ont voté contre l'amendement RN, à 18 voix sur 19.</li>
<li><a href="/candidat/karim-bouamrane">Karim Bouamrane</a> (PS) — Même position dans le quiz.</li>
<li><a href="/candidat/fabien-roussel">Fabien Roussel</a> (PCF) — Même position dans le quiz.</li>
<li><a href="/candidat/dominique-de-villepin">Dominique de Villepin</a> — Même position dans le quiz.</li>
<li><a href="/candidat/antoine-mikolajczak">Antoine Mikolajczak</a> (Équinoxe) — Même position dans le quiz.</li>
<li><a href="/candidat/francis-lalanne">Francis Lalanne</a> (France Libre) — Même position dans le quiz.</li>
<li><a href="/candidat/benoit-mathieu">Benoît Mathieu</a> — Même position dans le quiz.</li>
<li><a href="/candidat/parti-pirate">Parti pirate</a> — Même position dans le quiz.</li>
</ul>

<h3>Famille 4 : accélérer le calendrier</h3>
<ul>
<li><a href="/candidat/jean-luc-melenchon">Jean-Luc Mélenchon</a> (LFI) — Pour aller plus vite que la loi Climat, selon le quiz. Les insoumis ont voté la suppression de l'article 6, dont les sursis constituaient déjà un recul à leurs yeux.</li>
<li><a href="/candidat/marine-tondelier">Marine Tondelier</a> (Les Écologistes) — Même position dans le quiz. Une députée de son groupe, Julie Laernoes, a déposé l'un des amendements de suppression de l'article 6.</li>
<li><a href="/candidat/delphine-batho">Delphine Batho</a> (Génération Écologie) — Même position dans le quiz.</li>
<li><a href="/candidat/nathalie-arthaud">Nathalie Arthaud</a> (LO) — Même position dans le quiz.</li>
<li><a href="/candidat/anasse-kazib">Anasse Kazib</a> (Révolution permanente) — Même position dans le quiz.</li>
<li><a href="/candidat/selma-labib">Selma Labib</a> (NPA-R) — Même position dans le quiz.</li>
<li><a href="/candidat/juan-branco">Juan Branco</a> — Même position dans le quiz.</li>
<li><a href="/candidat/parti-animaliste">Parti animaliste</a> (PA) — Même position dans le quiz.</li>
<li><a href="/candidat/sylvain-durif">Sylvain Durif</a> — Même position dans le quiz.</li>
</ul>

<p>Ceux qui ont renoncé à se présenter gardent leurs réponses dans le quiz. Jordan Bardella y est pour la suppression. Laurent Wauquiez, François Bayrou et Gérald Darmanin y sont pour un report. Bernard Cazeneuve, François Ruffin, Olivier Faure, Ségolène Royal, Jérôme Guedj, Philippe Brun, Emmanuel Maurel et Fabien Verdier défendent le calendrier actuel. Clémentine Autain et Lydie Massard veulent l'accélérer.</p>

<h2>Arguments pour et contre la fin de l'interdiction de louer</h2>
<table>
<thead><tr><th>Pour supprimer ou repousser</th><th>Pour garder ou accélérer</th></tr></thead>
<tbody>
<tr><td>Des logements sortent du marché locatif alors que l'offre manque.</td><td>Les locataires modestes paient les factures de chauffage d'un logement mal isolé et subissent les fortes chaleurs.</td></tr>
<tr><td>Un logement classé F ou G peut être sain et sans danger, selon l'exposé de l'amendement RN.</td><td>Les associations de locataires y voient un recul social, et les écologistes un recul climatique.</td></tr>
<tr><td>La rénovation doit passer par l'incitation et l'accompagnement des propriétaires plutôt que par l'interdiction.</td><td>Le gouvernement prévoyait déjà des sursis pendant les travaux, sans abandonner l'objectif de rénovation.</td></tr>
</tbody>
</table>

<h2>Pour aller plus loin</h2>
<ul>
<li><a href="/question-politique/que-faire-de-l-interdiction-de-louer-les-passoires-thermiques-g-depuis-2025-f-en-2028-e-en-2034">La question du quiz sur l'interdiction de louer les passoires thermiques</a></li>
<li><a href="/question-politique/que-faire-face-aux-logements-insalubres-et-aux-passoires-thermiques">Logements insalubres et passoires thermiques : qui doit payer les travaux ?</a></li>
<li><a href="/question-politique/que-pensez-vous-de-l-encadrement-des-loyers">Que pensez-vous de l'encadrement des loyers ?</a></li>
<li><a href="/blog/programme-edouard-philippe-presidentielle-2027">Le programme d'Édouard Philippe pour 2027</a></li>
<li><a href="/theme/logement">Toutes les questions du thème logement</a></li>
<li><a href="/theme/climat-energie-et-ecologie">Toutes les questions du thème climat, énergie et écologie</a></li>
</ul>

<p><a href="/themes">→ Faire le quiz</a></p>
`,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: `Fin de l'interdiction de louer les passoires thermiques votée à l'Assemblée le 17 novembre 2026 : ce que change l'amendement, le calendrier du DPE et les positions des ${candidatesCount} candidats à la présidentielle 2027.`,
    author: { '@type': 'Person', name: 'Arnaud Ambroselli' },
    datePublished: '2026-11-23',
    about: [
      { '@type': 'Thing', name: 'Passoire thermique' },
      { '@type': 'Thing', name: 'Diagnostic de performance énergétique' },
      { '@type': 'Thing', name: 'Élection présidentielle française de 2027' },
    ],
  },
};
