export type Theme = {
  _id: string;
  fr: string;
  questions: Array<Question>;
};

export type Question = {
  _id: string;
  fr: string;
  help?: string;
  answers: Array<string>;
  scores: Array<Array<number>>;
};

export type ThemeFr =
  | "Affaires étrangères"
  | "Agriculture et alimentation"
  | "Climat, Énergie et Écologie"
  | "Culture"
  | "Démographie et question migratoire"
  | "Dépenses et dette publiques"
  | "Économie et Industrie"
  | "Finance"
  | "Gouvernance et République"
  | "Pandémie Covid 19"
  | "Police, Justice et Sécurité"
  | "Politique fiscale"
  | "Recherche et éducation"
  | "Santé"
  | "Société"
  | "Travail, Chômage, Retraite"
  | "Union Européenne"
  | "Et si un(e) autre gagnait...";
