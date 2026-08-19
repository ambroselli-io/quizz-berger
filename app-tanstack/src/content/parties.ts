/**
 * Registry of the political parties that at least one candidate of the quiz belongs to.
 *
 * Deliberately factual: founding date, official name changes, who leads the party, official
 * site. No political label ("droite", "extrême", "populiste"...) — the site compares answers,
 * it does not classify people. Everything else on a party page is computed from the quiz.
 *
 * A movement only gets an entry when a candidate of `candidates-answers.json` belongs to it
 * AND the name is actually searched for. The one-person movements of the roster (La Convention,
 * Nous France, La France humaniste, Nouvelle Énergie, Debout !, L'Après, Génération écologie)
 * are listed on /partis as "autres mouvements" and link to the candidate page instead: a page
 * of their own would be thin content nobody searches for.
 *
 * French needs the article baked into the data: "le RN" but "LFI", "du Parti socialiste" but
 * "des Républicains" and "d'Horizons". Hence the four name forms below — building them from
 * `name` with a rule would be wrong for half the list.
 */

export interface Party {
  /** URL segment: /parti/{slug} */
  slug: string;
  /** "Rassemblement national" */
  name: string;
  /** Acronym or short form used in tight UI. "RN", "LFI", "Renaissance". */
  shortName: string;
  /** Subject form of the full name: "le Rassemblement national", "La France insoumise". */
  theName: string;
  /** Subject form of the short name: "le RN", "LFI", "les Républicains". */
  theShort: string;
  /** Genitive of the full name: "du Rassemblement national", "des Républicains". */
  ofName: string;
  /** Genitive of the short name: "du RN", "de LFI", "d'Horizons". */
  ofShort: string;
  /** True for the grammatically plural names ("Les Républicains proposent", not "propose"). */
  plural?: boolean;
  foundedYear: number;
  /** 2 to 4 factual sentences. Origin, name changes, current leadership. */
  intro: string;
  officialSite: string;
  /** Slugs from `candidateSlugMap`, in the order they should be displayed. */
  candidateSlugs: string[];
  /**
   * Whether /parti/{slug}/{theme} pages are generated for this party. Reserved for the
   * five parties where "programme {parti} 2027" is an autocompleted Google query with a
   * theme tail ("... retraite", "... immigration"). Keeps the crawl budget on pages that
   * answer a real search.
   */
  hasThemePages?: boolean;
}

export const parties: Party[] = [
  {
    slug: 'rassemblement-national',
    name: 'Rassemblement national',
    shortName: 'RN',
    theName: 'le Rassemblement national',
    theShort: 'le RN',
    ofName: 'du Rassemblement national',
    ofShort: 'du RN',
    foundedYear: 1972,
    intro:
      "Fondé en 1972 sous le nom de Front national, le parti prend le nom de Rassemblement national en 2018. Marine Le Pen l'a présidé de 2011 à 2021. Jordan Bardella lui a succédé à la présidence en novembre 2022.",
    officialSite: 'https://rassemblementnational.fr',
    candidateSlugs: ['marine-le-pen', 'jordan-bardella'],
    hasThemePages: true,
  },
  {
    slug: 'la-france-insoumise',
    name: 'La France insoumise',
    shortName: 'LFI',
    theName: 'La France insoumise',
    theShort: 'LFI',
    ofName: 'de La France insoumise',
    ofShort: 'de LFI',
    foundedYear: 2016,
    intro:
      "La France insoumise est lancée en février 2016 par Jean-Luc Mélenchon, alors député européen, en vue de la présidentielle de 2017. Le mouvement structure depuis son programme autour du texte « L'Avenir en commun ».",
    officialSite: 'https://lafranceinsoumise.fr',
    candidateSlugs: ['jean-luc-melenchon'],
    hasThemePages: true,
  },
  {
    slug: 'les-republicains',
    name: 'Les Républicains',
    shortName: 'LR',
    theName: 'Les Républicains',
    theShort: 'les Républicains',
    ofName: 'des Républicains',
    ofShort: 'des Républicains',
    plural: true,
    foundedYear: 2015,
    intro:
      "Les Républicains naissent en 2015 du changement de nom de l'UMP, elle-même fondée en 2002. Bruno Retailleau en a été élu président en mai 2025. Laurent Wauquiez avait déjà dirigé le parti de 2017 à 2019.",
    officialSite: 'https://republicains.fr',
    candidateSlugs: ['bruno-retailleau', 'laurent-wauquiez'],
    hasThemePages: true,
  },
  {
    slug: 'parti-socialiste',
    name: 'Parti socialiste',
    shortName: 'PS',
    theName: 'le Parti socialiste',
    theShort: 'le PS',
    ofName: 'du Parti socialiste',
    ofShort: 'du PS',
    foundedYear: 1969,
    intro:
      "Le Parti socialiste est fondé en 1969 et prend sa forme actuelle au congrès d'Épinay en 1971. Il a donné deux présidents de la République à la France : François Mitterrand en 1981 et François Hollande en 2012.",
    officialSite: 'https://parti-socialiste.fr',
    candidateSlugs: ['francois-hollande', 'jerome-guedj'],
    hasThemePages: true,
  },
  {
    slug: 'renaissance',
    name: 'Renaissance',
    shortName: 'Renaissance',
    theName: 'Renaissance',
    theShort: 'Renaissance',
    ofName: 'de Renaissance',
    ofShort: 'de Renaissance',
    foundedYear: 2016,
    intro:
      "Le parti est créé en avril 2016 sous le nom d'En marche, devient La République en marche en 2017, puis Renaissance en septembre 2022. C'est le parti d'Emmanuel Macron, élu président de la République en 2017 et réélu en 2022.",
    officialSite: 'https://parti-renaissance.fr',
    candidateSlugs: ['gabriel-attal'],
    hasThemePages: true,
  },
  {
    slug: 'reconquete',
    name: 'Reconquête',
    shortName: 'Reconquête',
    theName: 'Reconquête',
    theShort: 'Reconquête',
    ofName: 'de Reconquête',
    ofShort: 'de Reconquête',
    foundedYear: 2021,
    intro:
      "Reconquête est fondé en décembre 2021 par Éric Zemmour, journaliste et essayiste, pour porter sa candidature à la présidentielle de 2022. Il en est le président.",
    officialSite: 'https://parti-reconquete.fr',
    candidateSlugs: ['eric-zemmour'],
  },
  {
    slug: 'horizons',
    name: 'Horizons',
    shortName: 'Horizons',
    theName: 'Horizons',
    theShort: 'Horizons',
    ofName: "d'Horizons",
    ofShort: "d'Horizons",
    foundedYear: 2021,
    intro:
      "Horizons est fondé en octobre 2021 par Édouard Philippe, maire du Havre et Premier ministre de 2017 à 2020. Le parti participe aux majorités présidentielles successives tout en gardant son organisation propre.",
    officialSite: 'https://horizonsleparti.fr',
    candidateSlugs: ['edouard-philippe'],
  },
  {
    slug: 'les-ecologistes',
    name: 'Les Écologistes',
    shortName: 'Les Écologistes',
    theName: 'Les Écologistes',
    theShort: 'les Écologistes',
    ofName: 'des Écologistes',
    ofShort: 'des Écologistes',
    plural: true,
    foundedYear: 1984,
    intro:
      "Le parti est fondé en 1984 sous le nom Les Verts, devient Europe Écologie Les Verts en 2010, puis Les Écologistes en 2023. Marine Tondelier en est la secrétaire nationale depuis décembre 2022.",
    officialSite: 'https://lesecologistes.fr',
    candidateSlugs: ['marine-tondelier'],
  },
  {
    slug: 'parti-communiste-francais',
    name: 'Parti communiste français',
    shortName: 'PCF',
    theName: 'le Parti communiste français',
    theShort: 'le PCF',
    ofName: 'du Parti communiste français',
    ofShort: 'du PCF',
    foundedYear: 1920,
    intro:
      "Le PCF est fondé au congrès de Tours en décembre 1920. C'est le plus ancien parti représenté dans le quiz. Fabien Roussel en est le secrétaire national depuis 2018.",
    officialSite: 'https://www.pcf.fr',
    candidateSlugs: ['fabien-roussel'],
  },
  {
    slug: 'place-publique',
    name: 'Place publique',
    shortName: 'Place publique',
    theName: 'Place publique',
    theShort: 'Place publique',
    ofName: 'de Place publique',
    ofShort: 'de Place publique',
    foundedYear: 2018,
    intro:
      "Place publique est lancé en novembre 2018 par un collectif dont Raphaël Glucksmann, essayiste devenu député européen en 2019. Le mouvement se présente aux élections en alliance avec d'autres formations de gauche.",
    officialSite: 'https://place-publique.eu',
    candidateSlugs: ['raphael-glucksmann'],
  },
  {
    slug: 'modem',
    name: 'Mouvement démocrate',
    shortName: 'MoDem',
    theName: 'le Mouvement démocrate',
    theShort: 'le MoDem',
    ofName: 'du Mouvement démocrate',
    ofShort: 'du MoDem',
    foundedYear: 2007,
    intro:
      "Le Mouvement démocrate est fondé en 2007 par François Bayrou, dans la continuité de l'UDF. François Bayrou en est le président et a été Premier ministre en 2024-2025.",
    officialSite: 'https://mouvementdemocrate.fr',
    candidateSlugs: ['francois-bayrou'],
  },
  {
    slug: 'debout-la-france',
    name: 'Debout la France',
    shortName: 'DLF',
    theName: 'Debout la France',
    theShort: 'DLF',
    ofName: 'de Debout la France',
    ofShort: 'de DLF',
    foundedYear: 1999,
    intro:
      "Le parti est fondé en 1999 par Nicolas Dupont-Aignan sous le nom Debout la République, et prend le nom Debout la France en 2014. Nicolas Dupont-Aignan en est le président.",
    officialSite: 'https://www.debout-la-france.fr',
    candidateSlugs: ['nicolas-dupont-aignan'],
  },
  {
    slug: 'upr',
    name: 'Union populaire républicaine',
    shortName: 'UPR',
    theName: "l'Union populaire républicaine",
    theShort: "l'UPR",
    ofName: "de l'Union populaire républicaine",
    ofShort: "de l'UPR",
    foundedYear: 2007,
    intro:
      "L'UPR est fondée en mars 2007 par François Asselineau, ancien haut fonctionnaire. Le parti construit tout son programme autour de la sortie de la France de l'Union européenne, de l'euro et de l'OTAN.",
    officialSite: 'https://www.upr.fr',
    candidateSlugs: ['francois-asselineau'],
  },
  {
    slug: 'lutte-ouvriere',
    name: 'Lutte ouvrière',
    shortName: 'LO',
    theName: 'Lutte ouvrière',
    theShort: 'LO',
    ofName: 'de Lutte ouvrière',
    ofShort: 'de LO',
    foundedYear: 1968,
    intro:
      "Lutte ouvrière porte ce nom depuis 1968, après avoir existé sous le nom Voix ouvrière. Nathalie Arthaud en est la porte-parole depuis 2008 et a porté ses couleurs aux présidentielles de 2012, 2017 et 2022.",
    officialSite: 'https://www.lutte-ouvriere.org',
    candidateSlugs: ['nathalie-arthaud'],
  },
];
