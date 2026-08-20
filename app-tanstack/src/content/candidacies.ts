/**
 * Who is in the race, who left it, and when.
 *
 * `candidates-answers.json` carries only `withdrawn` / `withdrawnAt`, because the API and the
 * Expo app need nothing else. The dated history, the quotes and the press links live here: they
 * feed the timeline of /qui-est-candidat-2027 and the /candidature/{slug} pages.
 *
 * Same rule as everywhere else on the site: no ideological label on anybody. An event says what
 * the person did and when ("annonce sa candidature", "renonce et soutient X"), nothing more.
 * Every event carries at least one press source, because a date without a source ages badly.
 *
 * `slug` must exist in `candidateSlugMap` (slugified pseudo). The build-time check in
 * `utils/candidacies.ts` fails loudly when a slug drifts.
 */

export type CandidacyStatus =
  /** Declared, and still running. */
  | 'declared'
  /** Was in the race, or was about to enter it, and gave up. Answers stay in the quiz. */
  | 'withdrawn'
  /** Quoted everywhere as a possible candidate, has not declared. */
  | 'potential';

export interface CandidacySource {
  /** Publication name, e.g. "Le Monde". */
  label: string;
  url: string;
  /** ISO day of publication when known. */
  date?: string;
}

export interface CandidacyEvent {
  /** ISO day ("2026-08-17"), or ISO month ("2025-03") when the press only gives the month. */
  date: string;
  type: 'declaration' | 'withdrawal' | 'step';
  /** One factual sentence, no label on the person. */
  label: string;
  sources: CandidacySource[];
}

export interface Candidacy {
  /** Slug of the candidate in `candidateSlugMap`. */
  slug: string;
  status: CandidacyStatus;
  /** Party or movement carrying the candidacy, as a display string. */
  movement: string;
  /** French needs it: "candidate", "elle a renoncé". Not derivable from a first name. */
  feminine?: boolean;
  /** Two or three factual sentences for the top of /candidature/{slug}. */
  summary: string;
  /** Words the person actually said, kept short. */
  quote?: { text: string; source: CandidacySource };
  events: CandidacyEvent[];
}

const WIKI: CandidacySource = {
  label: 'Wikipédia — Candidatures à la présidentielle 2027',
  url: 'https://fr.wikipedia.org/wiki/Candidatures_%C3%A0_l%27%C3%A9lection_pr%C3%A9sidentielle_fran%C3%A7aise_de_2027',
};

export const candidacies: Candidacy[] = [
  // --- Déclarés, par ordre de déclaration ---
  {
    slug: 'francois-asselineau',
    status: 'declared',
    movement: 'Union populaire républicaine',
    summary:
      "François Asselineau a annoncé dès le 31 août 2023, dans un entretien au Dauphiné libéré, qu'il se présenterait de nouveau. C'est la déclaration la plus ancienne de toute la campagne. Il avait déjà été candidat en 2017.",
    events: [
      {
        date: '2023-08-31',
        type: 'declaration',
        label: "Il annonce dans Le Dauphiné libéré qu'il sera de nouveau candidat.",
        sources: [WIKI],
      },
    ],
  },
  {
    slug: 'xavier-bertrand',
    status: 'declared',
    movement: 'Nous France',
    summary:
      "Xavier Bertrand a annoncé sa candidature le 3 février 2024 dans un entretien à Ouest-France, sans attendre la désignation des Républicains. Il porte depuis son propre mouvement, Nous France.",
    quote: {
      text: "J'ai bien l'intention d'être candidat en 2027.",
      source: {
        label: 'Ouest-France',
        url: 'https://www.ouest-france.fr/elections/presidentielle/entretien-xavier-bertrand-a-ouest-france-jai-bien-lintention-detre-candidat-en-2027-d8f5b8a0-c29d-11ee-af40-0572f37cda9b',
        date: '2024-02-03',
      },
    },
    events: [
      {
        date: '2024-02-03',
        type: 'declaration',
        label: "Il annonce sa candidature dans un entretien à Ouest-France.",
        sources: [
          {
            label: 'Ouest-France',
            url: 'https://www.ouest-france.fr/elections/presidentielle/entretien-xavier-bertrand-a-ouest-france-jai-bien-lintention-detre-candidat-en-2027-d8f5b8a0-c29d-11ee-af40-0572f37cda9b',
            date: '2024-02-03',
          },
        ],
      },
    ],
  },
  {
    slug: 'edouard-philippe',
    status: 'declared',
    movement: 'Horizons',
    summary:
      "Édouard Philippe a annoncé sa candidature le 3 septembre 2024 dans Le Point, presque trois ans avant le scrutin. Gérald Darmanin et Laurent Wauquiez se sont depuis rangés derrière lui.",
    quote: {
      text: 'Je serai candidat à la prochaine élection présidentielle.',
      source: {
        label: 'Le Point',
        url: 'https://www.lepoint.fr/politique/exclusif-edouard-philippe-je-serai-candidat-a-la-prochaine-election-presidentielle-03-09-2024-2569359_20.php',
        date: '2024-09-03',
      },
    },
    events: [
      {
        date: '2024-09-03',
        type: 'declaration',
        label: "Il annonce sa candidature dans un entretien au Point.",
        sources: [
          {
            label: 'Le Point',
            url: 'https://www.lepoint.fr/politique/exclusif-edouard-philippe-je-serai-candidat-a-la-prochaine-election-presidentielle-03-09-2024-2569359_20.php',
            date: '2024-09-03',
          },
        ],
      },
      {
        date: '2026-07-01',
        type: 'step',
        label: 'Laurent Wauquiez renonce à se présenter et lui apporte son soutien.',
        sources: [
          {
            label: 'AFP / Orange Actualités',
            url: 'https://actu.orange.fr/politique/presidentielle-2027-laurent-wauquiez-invite-bruno-retailleau-a-se-retirer-et-apporte-son-soutien-a-edouard-philippe-magic-CNT000002qhxbJ.html',
            date: '2026-07-01',
          },
        ],
      },
      {
        date: '2026-08-17',
        type: 'step',
        label: 'Gérald Darmanin renonce à se présenter et lui apporte son soutien.',
        sources: [
          {
            label: 'Le JDD',
            url: 'https://www.lejdd.fr/politique/ne-pas-rajouter-de-la-division-darmanin-renonce-a-se-presenter-en-2027-et-se-range-derriere-philippe-181314',
            date: '2026-08-17',
          },
        ],
      },
    ],
  },
  {
    slug: 'nicolas-dupont-aignan',
    status: 'declared',
    movement: 'Debout la France',
    summary:
      "Nicolas Dupont-Aignan a annoncé sa candidature le 8 mars 2025, devant les militants de Debout la France réunis à Yerres. C'est sa quatrième campagne présidentielle, après 2012, 2017 et 2022.",
    events: [
      {
        date: '2025-03-08',
        type: 'declaration',
        label: "Il annonce sa candidature lors d'une réunion publique à Yerres.",
        sources: [
          {
            label: 'Le Figaro',
            url: 'https://www.lefigaro.fr/politique/nicolas-dupont-aignan-se-declare-candidat-a-la-prochaine-election-presidentielle-20250308',
            date: '2025-03-08',
          },
          {
            label: 'franceinfo',
            url: 'https://www.francetvinfo.fr/politique/nicolas-dupont-aignan/le-souverainiste-nicolas-dupont-aignan-se-lance-pour-la-4e-fois-dans-la-course-a-l-elysee_7118136.html',
            date: '2025-03-08',
          },
        ],
      },
    ],
  },
  {
    slug: 'francois-ruffin',
    status: 'declared',
    movement: 'Debout !',
    summary:
      "François Ruffin s'est déclaré le 1er avril 2025, en demandant que la gauche se choisisse un candidat unique par une primaire. La primaire a été abandonnée en juillet 2026 ; il a maintenu sa candidature et continue de plaider pour une candidature commune.",
    events: [
      {
        date: '2025-04-01',
        type: 'declaration',
        label: "Il annonce sa candidature et propose une primaire à toute la gauche.",
        sources: [WIKI],
      },
      {
        date: '2026-07-09',
        type: 'step',
        label:
          "La primaire de la gauche est abandonnée après le vote du Parti socialiste ; il maintient sa candidature.",
        sources: [
          {
            label: 'Public Sénat',
            url: 'https://www.publicsenat.fr/actualites/politique/presidentielle-2027-a-la-bellevilloise-faure-tondelier-ruffindans-les-sables-mouvants-de-la-primaire',
          },
        ],
      },
    ],
  },
  {
    slug: 'marine-tondelier',
    feminine: true,
    status: 'declared',
    movement: 'Les Écologistes',
    summary:
      "Marine Tondelier s'est déclarée le 22 octobre 2025. Après l'abandon de la primaire, les adhérents des Écologistes ont validé à 65 % une candidature autonome, qu'elle porte.",
    events: [
      {
        date: '2025-10-22',
        type: 'declaration',
        label: 'Elle annonce sa candidature à la présidentielle.',
        sources: [WIKI],
      },
      {
        date: '2026-07-09',
        type: 'step',
        label:
          "Les adhérents des Écologistes valident à 65,13 % le principe d'une candidature autonome.",
        sources: [
          {
            label: 'Public Sénat',
            url: 'https://www.publicsenat.fr/actualites/politique/presidentielle-2027-a-la-bellevilloise-faure-tondelier-ruffindans-les-sables-mouvants-de-la-primaire',
          },
        ],
      },
    ],
  },
  {
    slug: 'delphine-batho',
    feminine: true,
    status: 'declared',
    movement: 'Génération écologie',
    summary:
      "Delphine Batho a annoncé sa candidature le 25 novembre 2025, « pour reconstruire une écologie capable de gouverner ». Elle avait déjà participé à la primaire écologiste de 2021.",
    quote: {
      text: "Je suis candidate à l'élection présidentielle pour reconstruire une écologie capable de gouverner.",
      source: {
        label: "L'Obs",
        url: 'https://www.nouvelobs.com/politique/20251125.OBS110076/delphine-batho-je-suis-candidate-a-l-election-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner.html',
        date: '2025-11-25',
      },
    },
    events: [
      {
        date: '2025-11-25',
        type: 'declaration',
        label: 'Elle annonce sa candidature à la présidentielle.',
        sources: [
          {
            label: "L'Obs",
            url: 'https://www.nouvelobs.com/politique/20251125.OBS110076/delphine-batho-je-suis-candidate-a-l-election-presidentielle-pour-reconstruire-une-ecologie-capable-de-gouverner.html',
            date: '2025-11-25',
          },
          {
            label: 'Ouest-France',
            url: 'https://www.ouest-france.fr/elections/presidentielle/delphine-batho-ancienne-ministre-de-lecologie-annonce-sa-candidature-a-la-presidentielle-2027-df964490-ca3e-11f0-a0e6-83b9718ad3c0',
            date: '2025-11-25',
          },
        ],
      },
    ],
  },
  {
    slug: 'nathalie-arthaud',
    feminine: true,
    status: 'declared',
    movement: 'Lutte ouvrière',
    summary:
      "Nathalie Arthaud a été désignée candidate de Lutte ouvrière le 8 décembre 2025. C'est sa quatrième campagne présidentielle, après 2012, 2017 et 2022.",
    events: [
      {
        date: '2025-12-08',
        type: 'declaration',
        label: 'Elle annonce sa candidature pour Lutte ouvrière.',
        sources: [
          {
            label: 'Le Monde',
            url: 'https://www.lemonde.fr/politique/article/2025/12/08/presidentielle-la-porte-parole-de-lutte-ouvriere-nathalie-arthaud-annonce-sa-candidature_6656468_823448.html',
            date: '2025-12-08',
          },
          {
            label: 'RFI',
            url: 'https://www.rfi.fr/fr/en-bref/20251208-pr%C3%A9sidentielle-2027-en-france-nathalie-arthaud-lutte-ouvri%C3%A8re-annonce-sa-candidature',
            date: '2025-12-08',
          },
        ],
      },
    ],
  },
  {
    slug: 'juan-branco',
    status: 'declared',
    movement: 'Les Ruches',
    summary:
      "Juan Branco a confirmé sa candidature en décembre 2025, sur Sud Radio puis dans un entretien à Thinkerview. Elle est portée par Les Ruches, un mouvement créé en 2024 et organisé en cellules locales.",
    events: [
      {
        date: '2025-12-19',
        type: 'declaration',
        label: 'Il confirme sa candidature sur Sud Radio, portée par Les Ruches.',
        sources: [
          {
            label: 'Sud Radio',
            url: 'https://www.sudradio.fr/sud-radio/lavocat-juan-branco-candidat-a-la-presidentielle',
          },
        ],
      },
    ],
  },
  {
    slug: 'jerome-guedj',
    status: 'declared',
    movement: 'Parti socialiste',
    summary:
      "Jérôme Guedj a annoncé sa candidature le 5 février 2026 sur France Inter, en excluant de passer par la primaire de la gauche.",
    events: [
      {
        date: '2026-02-05',
        type: 'declaration',
        label:
          "Il annonce sa candidature sur France Inter, hors primaire de la gauche unitaire.",
        sources: [WIKI],
      },
    ],
  },
  {
    slug: 'david-lisnard',
    status: 'declared',
    movement: 'Nouvelle Énergie',
    summary:
      "David Lisnard a dit vouloir « être de la compétition » dès ses vœux à la presse du 17 janvier 2025, dans le cadre d'une primaire de la droite. Faute de primaire, il a officialisé sa candidature le 31 mars 2026.",
    events: [
      {
        date: '2025-01-17',
        type: 'step',
        label: "Il annonce vouloir être candidat, dans le cadre d'une primaire de la droite.",
        sources: [
          {
            label: 'Le Parisien',
            url: 'https://www.leparisien.fr/politique/david-lisnard-sort-du-bois-pour-la-presidentielle-de-2027-je-serai-de-la-competition-17-01-2025-37ZNNHHB35HMRIH45QPRIA76AQ.php',
            date: '2025-01-17',
          },
        ],
      },
      {
        date: '2026-03-31',
        type: 'declaration',
        label: 'Il officialise sa candidature à la présidentielle.',
        sources: [WIKI],
      },
    ],
  },
  {
    slug: 'lydie-massard',
    feminine: true,
    status: 'declared',
    movement: 'Union démocratique bretonne',
    summary:
      "Lydie Massard, ancienne députée européenne, s'est déclarée le 2 avril 2026 pour la primaire de la gauche, sur une ligne de République fédérale. La primaire a été abandonnée en juillet 2026.",
    events: [
      {
        date: '2026-04-02',
        type: 'declaration',
        label: "Elle annonce sa candidature à la primaire de la gauche pour l'UDB.",
        sources: [
          {
            label: 'UDB',
            url: 'https://www.udb.bzh/non-classifiee/lydie-massard-candidate-aux-primaires-de-la-gauche/',
          },
        ],
      },
      {
        date: '2026-07-09',
        type: 'step',
        label: "La primaire de la gauche est abandonnée après le vote du Parti socialiste.",
        sources: [WIKI],
      },
    ],
  },
  {
    slug: 'bruno-retailleau',
    status: 'declared',
    movement: 'Les Républicains',
    summary:
      "Bruno Retailleau a été désigné candidat des Républicains le 19 avril 2026 par une consultation des adhérents. Laurent Wauquiez, qui le disait « candidat légitime », lui a demandé de se retirer deux mois et demi plus tard.",
    events: [
      {
        date: '2026-04-19',
        type: 'declaration',
        label: 'Il est désigné candidat par les adhérents des Républicains.',
        sources: [
          {
            label: 'Le Monde',
            url: 'https://www.lemonde.fr/politique/article/2026/04/19/presidentielle-2027-bruno-retailleau-designe-candidat-des-republicains-par-les-adherents-du-parti-au-cours-d-une-consultation_6681477_823448.html',
            date: '2026-04-19',
          },
          {
            label: 'Le Parisien',
            url: 'https://www.leparisien.fr/elections/presidentielle/la-radicalite-raisonnable-officiellement-candidat-de-lr-bruno-retailleau-au-pied-de-la-colline-presidentielle-19-04-2026-6V7M4VIWHRBVFNOVW2TDSC3DG4.php',
            date: '2026-04-19',
          },
        ],
      },
      {
        date: '2026-07-01',
        type: 'step',
        label:
          "Laurent Wauquiez lui demande de « savoir se retirer » et soutient Édouard Philippe.",
        sources: [
          {
            label: 'AFP / Orange Actualités',
            url: 'https://actu.orange.fr/politique/presidentielle-2027-laurent-wauquiez-invite-bruno-retailleau-a-se-retirer-et-apporte-son-soutien-a-edouard-philippe-magic-CNT000002qhxbJ.html',
            date: '2026-07-01',
          },
        ],
      },
    ],
  },
  {
    slug: 'clara-egger',
    feminine: true,
    status: 'declared',
    movement: 'Solution démocratique',
    summary:
      "Clara Egger, enseignante-chercheuse en science politique, s'est déclarée le 20 avril 2026. Son programme tient en deux textes institutionnels — un RIC constituant et la démocratie directe communale — qu'elle s'engage à soumettre à référendum en octobre 2027. Elle avait déjà tenté de se présenter en 2022, sans réunir les 500 parrainages.",
    events: [
      {
        date: '2026-04-20',
        type: 'declaration',
        label: 'Elle annonce sa candidature pour Solution démocratique.',
        sources: [
          {
            label: 'Solution démocratique',
            url: 'https://solutiondemocratique.fr/presidentielle2027-annonce-candidature-clara-egger/',
            date: '2026-04-20',
          },
        ],
      },
    ],
  },
  {
    slug: 'jean-luc-melenchon',
    status: 'declared',
    movement: 'La France insoumise',
    summary:
      "Jean-Luc Mélenchon a annoncé sa candidature le 3 mai 2026 au journal de 20 heures de TF1. C'est sa quatrième campagne présidentielle. Le NPA-Anticapitaliste a renoncé à présenter un candidat pour le soutenir.",
    events: [
      {
        date: '2026-05-03',
        type: 'declaration',
        label: 'Il annonce sa candidature au journal de 20 heures de TF1.',
        sources: [
          {
            label: 'Le Monde',
            url: 'https://www.lemonde.fr/politique/article/2026/05/03/jean-luc-melenchon-annonce-etre-candidat-a-l-election-presidentielle-pour-la-quatrieme-fois-sur-une-ligne-toujours-plus-antisysteme_6685247_823448.html',
            date: '2026-05-03',
          },
        ],
      },
      {
        date: '2026-06-29',
        type: 'step',
        label:
          "Le NPA-Anticapitaliste renonce à présenter un candidat et annonce le soutenir.",
        sources: [
          {
            label: 'franceinfo',
            url: 'https://www.franceinfo.fr/elections/presidentielle/le-npa-anticapitaliste-renonce-a-presenter-un-candidat-a-l-election-presidentielle-2027-et-annonce-soutenir-jean-luc-melenchon_8084936.html',
            date: '2026-06-29',
          },
        ],
      },
    ],
  },
  {
    slug: 'florian-philippot',
    status: 'declared',
    movement: 'Les Patriotes',
    summary:
      "Florian Philippot a annoncé sa candidature le 9 mai 2026 sur France 2. Il a dit être prêt à se retirer si une autre candidature « plus rassembleuse » sur sa ligne venait à émerger.",
    events: [
      {
        date: '2026-05-09',
        type: 'declaration',
        label: 'Il annonce sa candidature sur France 2.',
        sources: [
          {
            label: 'franceinfo',
            url: 'https://www.franceinfo.fr/elections/presidentielle/presidentielle-2027-le-souverainiste-florian-philippot-annonce-sa-candidature-a-l-elysee_7993346.html',
            date: '2026-05-09',
          },
          {
            label: 'BFMTV',
            url: 'https://www.bfmtv.com/politique/elections/presidentielle/presidentielle-2027-le-president-des-patriotes-florian-philippot-annonce-etre-candidat-a-l-elysee_AN-202605090155.html',
            date: '2026-05-09',
          },
        ],
      },
    ],
  },
  {
    slug: 'gabriel-attal',
    status: 'declared',
    movement: 'Renaissance',
    summary:
      "Gabriel Attal a officialisé sa candidature le 22 mai 2026 à Mur-de-Barrez, dans l'Aveyron, sous le slogan « La force d'agir ».",
    quote: {
      text: "J'ai décidé d'être candidat.",
      source: {
        label: 'Le Figaro',
        url: 'https://www.lefigaro.fr/politique/presidentielle-2027-j-ai-decide-d-etre-candidat-annonce-gabriel-attal-20260522',
        date: '2026-05-22',
      },
    },
    events: [
      {
        date: '2026-05-22',
        type: 'declaration',
        label: "Il officialise sa candidature lors d'un déplacement dans l'Aveyron.",
        sources: [
          {
            label: 'Le Monde',
            url: 'https://www.lemonde.fr/politique/article/2026/05/22/presidentielle-2027-gabriel-attal-officialise-sa-candidature-en-aveyron-en-esperant-s-eloigner-de-l-heritage-d-emmanuel-macron_6692277_823448.html',
            date: '2026-05-22',
          },
          {
            label: 'RTL',
            url: 'https://www.rtl.fr/actu/politique/presidentielle-2027-gabriel-attal-officialise-sa-candidature-a-l-election-presidentielle-7900637844',
            date: '2026-05-22',
          },
        ],
      },
    ],
  },
  {
    slug: 'anasse-kazib',
    status: 'declared',
    movement: 'Révolution permanente',
    summary:
      "Anasse Kazib, cheminot et syndicaliste, a annoncé sa candidature le 1er juin 2026 pour Révolution permanente. En 2022, il n'avait réuni que 160 parrainages sur les 500 nécessaires.",
    events: [
      {
        date: '2026-06-01',
        type: 'declaration',
        label: 'Il annonce sa candidature pour Révolution permanente.',
        sources: [
          {
            label: 'franceinfo',
            url: 'https://www.franceinfo.fr/elections/presidentielle/presidentielle-2027-le-cheminot-anasse-kazib-annonce-sa-candidature_8040020.html',
            date: '2026-06-01',
          },
        ],
      },
    ],
  },
  {
    slug: 'karim-bouamrane',
    status: 'declared',
    movement: 'Parti socialiste',
    summary:
      "Karim Bouamrane, maire de Saint-Ouen-sur-Seine, a annoncé sa candidature le 9 juin 2026 sur France Inter, en dehors du processus de désignation du Parti socialiste. Il a refusé de participer à la primaire socialiste d'octobre.",
    quote: {
      text: "Je suis candidat parce que depuis que je suis en responsabilité, j'ai pris conscience de notre force.",
      source: {
        label: 'Le Figaro',
        url: 'https://www.lefigaro.fr/politique/presidentielle-2027-je-suis-candidat-annonce-karim-bouamrane-ps-20260609',
        date: '2026-06-09',
      },
    },
    events: [
      {
        date: '2026-06-09',
        type: 'declaration',
        label: 'Il annonce sa candidature sur France Inter.',
        sources: [
          {
            label: 'Le Figaro',
            url: 'https://www.lefigaro.fr/politique/presidentielle-2027-je-suis-candidat-annonce-karim-bouamrane-ps-20260609',
            date: '2026-06-09',
          },
          {
            label: 'CNEWS',
            url: 'https://www.cnews.fr/france/2026-06-09/karim-bouamrane-maire-ps-de-saint-ouen-annonce-sa-candidature-lelection',
            date: '2026-06-09',
          },
        ],
      },
    ],
  },
  {
    slug: 'selma-labib',
    feminine: true,
    status: 'declared',
    movement: 'NPA – Révolutionnaires',
    summary:
      "Selma Labib, conductrice de bus de 30 ans, a été présentée le 17 juin 2026 comme candidate du NPA – Révolutionnaires.",
    events: [
      {
        date: '2026-06-17',
        type: 'declaration',
        label: 'Le NPA – Révolutionnaires annonce sa candidature.',
        sources: [
          {
            label: 'BFMTV',
            url: 'https://www.bfmtv.com/politique/elections/presidentielle/presidentielle-2027-le-npa-revolutionnaires-annonce-presenter-la-candidature-de-sa-porte-parole-selma-labib_AD-202606170500.html',
            date: '2026-06-17',
          },
          {
            label: 'RTL',
            url: 'https://www.rtl.fr/actu/politique/presidentielle-2027-selma-labib-officiellement-candidate-pour-le-npa-revolutionnaires-7900647117',
            date: '2026-06-17',
          },
        ],
      },
    ],
  },
  {
    slug: 'antoine-mikolajczak',
    status: 'declared',
    movement: 'Équinoxe',
    summary:
      "Antoine Mikolajczak, ingénieur de 28 ans, a été désigné candidat d'Équinoxe le 27 juin 2026 par un vote au jugement majoritaire des adhérents. Il a passé cinq ans à monter des projets d'énergie renouvelable avec des élus, des agriculteurs et des riverains.",
    events: [
      {
        date: '2026-06-27',
        type: 'declaration',
        label: "Il est désigné candidat d'Équinoxe et annonce sa candidature.",
        sources: [
          {
            label: 'Parti Équinoxe',
            url: 'https://parti-equinoxe.fr/qui-est-antoine-mikolajczak/',
          },
        ],
      },
    ],
  },
  {
    slug: 'philippe-brun',
    status: 'declared',
    movement: 'Parti socialiste',
    summary:
      "Philippe Brun, député de l'Eure et spécialiste des questions budgétaires au Parti socialiste, s'est déclaré le 30 juin 2026 pour la primaire socialiste, sous le mot d'ordre « le candidat des salaires ».",
    events: [
      {
        date: '2026-06-30',
        type: 'declaration',
        label: 'Il annonce sa candidature à la primaire socialiste.',
        sources: [
          {
            label: 'CNEWS',
            url: 'https://www.cnews.fr/france/2026-08-19/presidentielle-2027-philippe-brun-loutsider-de-la-primaire-du-ps-devoile-son',
            date: '2026-08-19',
          },
        ],
      },
    ],
  },
  {
    slug: 'marine-le-pen',
    feminine: true,
    status: 'declared',
    movement: 'Rassemblement national',
    summary:
      "La cour d'appel de Paris a ramené le 7 juillet 2026 sa peine d'inéligibilité ferme à 15 mois, échue au 30 juin 2026, ce qui la rend éligible au scrutin. Elle a annoncé sa candidature le soir même sur TF1. Jordan Bardella s'est rangé derrière elle le lendemain.",
    quote: {
      text: "Je suis candidate à l'élection présidentielle.",
      source: {
        label: 'Euronews',
        url: 'https://fr.euronews.com/my-europe/2026/07/07/je-suis-candidate-a-lelection-presidentielle-annonce-marine-le-pen-sur-tf1',
        date: '2026-07-07',
      },
    },
    events: [
      {
        date: '2026-07-07',
        type: 'step',
        label:
          "La cour d'appel de Paris réduit sa peine d'inéligibilité ferme à 15 mois, déjà purgée : elle est éligible en 2027.",
        sources: [
          {
            label: 'Toute l’Europe',
            url: 'https://www.touteleurope.eu/vie-politique-des-etats-membres/proces-des-assistants-du-rn-marine-le-pen-condamnee-en-appel-mais-eligible-a-l-election-presidentielle-2027/',
            date: '2026-07-07',
          },
        ],
      },
      {
        date: '2026-07-07',
        type: 'declaration',
        label: 'Elle annonce sa candidature sur TF1.',
        sources: [
          {
            label: 'Euronews',
            url: 'https://fr.euronews.com/my-europe/2026/07/07/je-suis-candidate-a-lelection-presidentielle-annonce-marine-le-pen-sur-tf1',
            date: '2026-07-07',
          },
        ],
      },
    ],
  },
  {
    slug: 'segolene-royal',
    feminine: true,
    status: 'declared',
    movement: 'Parti socialiste',
    summary:
      "Ségolène Royal est entrée dans la course le 10 juillet 2026, pour la primaire socialiste, sous le slogan « La France tranquille et l'ordre juste ». Elle avait été la candidate du Parti socialiste en 2007.",
    events: [
      {
        date: '2026-07-10',
        type: 'declaration',
        label: 'Elle annonce sa candidature à la primaire socialiste.',
        sources: [
          {
            label: 'CNEWS',
            url: 'https://www.cnews.fr/france/2026-07-10/presidentielle-2027-segolene-royal-annonce-sa-candidature-la-primaire-socialiste',
            date: '2026-07-10',
          },
          {
            label: 'LCP',
            url: 'https://lcp.fr/actualites/presidentielle-2027-segolene-royal-annonce-sa-candidature-a-la-primaire-socialiste',
            date: '2026-07-10',
          },
        ],
      },
    ],
  },
  {
    slug: 'bernard-cazeneuve',
    status: 'declared',
    movement: 'La Convention',
    summary:
      "Bernard Cazeneuve a annoncé sa candidature le 16 juillet 2026 dans un entretien au Parisien, sans passer par la primaire socialiste. Il porte son mouvement, La Convention.",
    events: [
      {
        date: '2026-07-16',
        type: 'declaration',
        label: "Il annonce sa candidature dans un entretien au Parisien, hors primaire.",
        sources: [WIKI],
      },
    ],
  },
  {
    slug: 'francis-lalanne',
    status: 'declared',
    movement: 'France Libre',
    summary:
      "Francis Lalanne a officialisé sa candidature par communiqué le 19 août 2026, avec un premier meeting annoncé à Paris. Son mouvement s'appelle France Libre et l'humoriste Dieudonné, condamné à plusieurs reprises pour provocation à la haine raciale, figure parmi ses soutiens.",
    events: [
      {
        date: '2026-08-19',
        type: 'declaration',
        label: 'Il officialise sa candidature par communiqué, pour France Libre.',
        sources: [
          {
            label: 'franceinfo',
            url: 'https://www.franceinfo.fr/elections/presidentielle/presidentielle-2027-le-chanteur-francis-lalanne-officiellement-candidat-premier-meeting-vendredi-a-paris_8153588.html',
            date: '2026-08-19',
          },
          {
            label: 'CNEWS',
            url: 'https://www.cnews.fr/france/2026-08-19/presidentielle-2027-francis-lalanne-se-porte-officiellement-candidat-1906812',
            date: '2026-08-19',
          },
        ],
      },
    ],
  },

  // --- Ils ont renoncé ---
  {
    slug: 'clementine-autain',
    feminine: true,
    status: 'withdrawn',
    movement: "L'Après",
    summary:
      "Clémentine Autain s'était déclarée en mars 2025, à condition qu'une primaire départage la gauche. Le Parti socialiste ayant réservé sa primaire à ses proches alliés, elle a retiré sa candidature le 11 juillet 2026 pour ne pas ajouter une candidature de plus.",
    quote: {
      text: "Je ne vais pas rajouter une candidature à l'empilement des candidatures à gauche.",
      source: {
        label: 'franceinfo',
        url: 'https://www.franceinfo.fr/elections/presidentielle/presidentielle-la-deputee-clementine-autain-retire-sa-candidature-denoncant-l-empilement-des-candidatures-a-gauche_8103848.html',
        date: '2026-07-11',
      },
    },
    events: [
      {
        date: '2025-03',
        type: 'declaration',
        label: "Elle annonce sa candidature, dans la perspective d'une primaire de la gauche.",
        sources: [WIKI],
      },
      {
        date: '2026-07-11',
        type: 'withdrawal',
        label: 'Elle retire sa candidature après la fin de la primaire de la gauche.',
        sources: [
          {
            label: 'franceinfo',
            url: 'https://www.franceinfo.fr/elections/presidentielle/presidentielle-la-deputee-clementine-autain-retire-sa-candidature-denoncant-l-empilement-des-candidatures-a-gauche_8103848.html',
            date: '2026-07-11',
          },
        ],
      },
    ],
  },
  {
    slug: 'francois-bayrou',
    status: 'withdrawn',
    movement: 'MoDem',
    summary:
      "François Bayrou a été candidat en 2002, 2007 et 2012. Le 10 juin 2026, il a annoncé qu'il ne le serait pas en 2027, et n'a soutenu personne à ce jour.",
    quote: {
      text: "Je ne suis pas candidat.",
      source: {
        label: 'franceinfo',
        url: 'https://www.franceinfo.fr/elections/presidentielle/l-ancien-premier-ministre-francois-bayrou-n-est-pas-candidat-a-l-election-presidentielle-de-2027_8054486.html',
        date: '2026-06-10',
      },
    },
    events: [
      {
        date: '2026-06-10',
        type: 'withdrawal',
        label: "Il annonce qu'il ne sera pas candidat en 2027.",
        sources: [
          {
            label: 'franceinfo',
            url: 'https://www.franceinfo.fr/elections/presidentielle/l-ancien-premier-ministre-francois-bayrou-n-est-pas-candidat-a-l-election-presidentielle-de-2027_8054486.html',
            date: '2026-06-10',
          },
        ],
      },
    ],
  },
  {
    slug: 'laurent-wauquiez',
    status: 'withdrawn',
    movement: 'Les Républicains',
    summary:
      "Laurent Wauquiez a dit vouloir être candidat dès mars 2025. Le 1er juillet 2026, il a renoncé, demandé à Bruno Retailleau de « savoir se retirer » et apporté son soutien à Édouard Philippe.",
    events: [
      {
        date: '2026-07-01',
        type: 'withdrawal',
        label:
          'Il renonce à se présenter et apporte son soutien à Édouard Philippe.',
        sources: [
          {
            label: 'AFP / Orange Actualités',
            url: 'https://actu.orange.fr/politique/presidentielle-2027-laurent-wauquiez-invite-bruno-retailleau-a-se-retirer-et-apporte-son-soutien-a-edouard-philippe-magic-CNT000002qhxbJ.html',
            date: '2026-07-01',
          },
          { ...WIKI },
        ],
      },
    ],
  },
  {
    slug: 'gerald-darmanin',
    status: 'withdrawn',
    movement: 'Renaissance',
    summary:
      "Gérald Darmanin, garde des Sceaux, a renoncé le 17 août 2026 dans un entretien à La Voix du Nord, et s'est rangé derrière Édouard Philippe. Deux de ses proches au gouvernement l'avaient précédé.",
    quote: {
      text: "J'ai décidé de ne pas rajouter de la division et donc de ne pas être candidat.",
      source: {
        label: 'Le JDD',
        url: 'https://www.lejdd.fr/politique/ne-pas-rajouter-de-la-division-darmanin-renonce-a-se-presenter-en-2027-et-se-range-derriere-philippe-181314',
        date: '2026-08-17',
      },
    },
    events: [
      {
        date: '2026-08-17',
        type: 'withdrawal',
        label:
          "Il annonce qu'il ne sera pas candidat et apporte son soutien à Édouard Philippe.",
        sources: [
          {
            label: 'Le JDD',
            url: 'https://www.lejdd.fr/politique/ne-pas-rajouter-de-la-division-darmanin-renonce-a-se-presenter-en-2027-et-se-range-derriere-philippe-181314',
            date: '2026-08-17',
          },
          {
            label: 'France 3 Hauts-de-France',
            url: 'https://france3-regions.franceinfo.fr/hauts-de-france/nord-0/tourcoing/presidentielle-2027-gerald-darmanin-se-propose-d-etre-l-aiguillon-social-d-edouard-philippe-dans-la-course-a-l-elysee-et-renonce-officiellement-a-sa-propre-candidature-3403093.html',
            date: '2026-08-17',
          },
        ],
      },
    ],
  },

  // --- Pas encore candidats ---
  {
    slug: 'eric-zemmour',
    status: 'potential',
    movement: 'Reconquête',
    summary:
      "Éric Zemmour, candidat en 2022, prépare un programme et dit avoir « tout son temps » pour se déclarer. À la mi-août 2026, il n'a pas officialisé sa candidature. Sarah Knafo, sa proche collaboratrice, a dit souhaiter qu'il soit le candidat de Reconquête.",
    events: [],
  },
  {
    slug: 'fabien-roussel',
    status: 'potential',
    movement: 'Parti communiste français',
    summary:
      "Fabien Roussel s'est dit prêt le 11 mai 2026 à « consacrer toute son énergie » à une candidature communiste. Le Parti communiste français, qui refuse la primaire, doit officialiser son choix début septembre 2026.",
    events: [],
  },
  {
    slug: 'dominique-de-villepin',
    status: 'potential',
    movement: 'La France humaniste',
    summary:
      "Dominique de Villepin a dit vouloir être « un candidat du rassemblement » le 10 avril 2026, en marge du forum « Normandie pour la Paix » à Caen. Il n'a pas officialisé sa candidature et cherche des parrainages.",
    events: [
      {
        date: '2026-04-10',
        type: 'step',
        label: "Il indique vouloir être « un candidat du rassemblement », sans se déclarer.",
        sources: [WIKI],
      },
    ],
  },
  {
    slug: 'raphael-glucksmann',
    status: 'potential',
    movement: 'Place publique',
    summary:
      "Raphaël Glucksmann arrive en tête des sondages à gauche mais n'a pas déclaré sa candidature. Il a refusé la primaire de la gauche. Une désignation à gauche est évoquée pour décembre 2026.",
    events: [],
  },
  {
    slug: 'francois-hollande',
    status: 'potential',
    movement: 'Parti socialiste',
    summary:
      "François Hollande, président de la République de 2012 à 2017, refuse le format de la primaire socialiste, qu'il juge trop étroit. Il n'a pas déclaré sa candidature et se tient prêt si la gauche ne trouve pas son candidat.",
    events: [],
  },
  {
    slug: 'jordan-bardella',
    status: 'potential',
    movement: 'Rassemblement national',
    summary:
      "Jordan Bardella, président du Rassemblement national, a préparé une candidature tant que l'inéligibilité de Marine Le Pen n'était pas levée. Depuis l'arrêt d'appel du 7 juillet 2026, il soutient sa candidature et n'est pas candidat.",
    quote: {
      text: "Je me réjouis de la candidature de Marine Le Pen. Elle est notre candidate naturelle.",
      source: {
        label: 'France 24',
        url: 'https://www.france24.com/fr/france/20260708-jordan-bardella-se-r%C3%A9jouit-marine-le-pen-pr%C3%A9sidentielle-2027-extreme-droite-rassemblement-national-campagne',
        date: '2026-07-08',
      },
    },
    events: [
      {
        date: '2026-07-08',
        type: 'step',
        label: 'Il apporte son soutien à la candidature de Marine Le Pen.',
        sources: [
          {
            label: 'France 24',
            url: 'https://www.france24.com/fr/france/20260708-jordan-bardella-se-r%C3%A9jouit-marine-le-pen-pr%C3%A9sidentielle-2027-extreme-droite-rassemblement-national-campagne',
            date: '2026-07-08',
          },
        ],
      },
    ],
  },
  {
    slug: 'patrick-sebastien',
    status: 'potential',
    movement: 'Ça suffit',
    summary:
      "Patrick Sébastien a lancé le mouvement « Ça suffit », une plateforme qui recueille les propositions des Français pour les porter aux candidats de 2027. Interrogé sur une candidature à lui, il répond qu'il ne se présente à rien.",
    quote: {
      text: "Je ne me présente à rien. Je ne veux pas être président de la République.",
      source: {
        label: 'VL Média',
        url: 'https://vl-media.fr/est-ce-que-patrick-sebastien-sera-candidat-a-la-presidentielle-2027/',
      },
    },
    events: [],
  },
];
