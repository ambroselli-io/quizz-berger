// Mirrored in expo/src/utils/chatModes.ts. `mode` is the API's identifier, `slug` the /ia/{slug} URL.
export type ChatMode = 'president' | 'convaincre' | 'contre-moi-meme';

export interface ChatModeEntry {
  mode: ChatMode;
  slug: string;
  title: string;
  description: string;
}

export const chatModes: ChatModeEntry[] = [
  {
    mode: 'president',
    slug: 'si-j-etais-president',
    title: "Si j'étais président",
    description:
      "Discute avec une IA des mesures que tu mettrais en place si tu étais président : elle essaiera de t'aider à affiner tes idées.",
  },
  {
    mode: 'convaincre',
    slug: 'convaincre-un-candidat',
    title: 'Je veux convaincre un candidat',
    description:
      "Basée sur les réponses au Quizz du Berger, l'IA se met à la place du candidat de ton choix. À toi de le faire changer d'avis : ici, les candidats sont tes moutons.",
  },
  {
    mode: 'contre-moi-meme',
    slug: 'je-pense-contre-moi-meme',
    title: 'Je pense contre moi-même',
    description:
      "Dis ce que tu penses, et l'IA te poussera dans tes retranchements, seulement en te posant des questions. Tu verras si tout ça tient debout !",
  },
];

export const getChatModeBySlug = (slug: string) => chatModes.find((m) => m.slug === slug);

export const AI_DISCLAIMER =
  "C'est une IA : on ne contrôle pas tout ce qu'elle dit. Elle peut se tromper ou inventer, prends ses réponses avec des pincettes.";

export const CANDIDATE_DISCLAIMER =
  "Ce n'est pas le vrai candidat. L'IA ne connaît que ses réponses au quizz, que nous avons nous-mêmes estimées à partir de ses positions publiques. Ne lui prête pas des propos qu'il n'a jamais tenus.";

// The creator's Tipeee page. Empty: the "Faire un don sur Tipeee" button is hidden.
export const DONATION_URL = 'https://fr.tipeee.com/quizz-du-berger/';
