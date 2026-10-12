import type { ChatMode } from '~/utils/chatModes';

export type FeedbackKind = 'question' | 'testimony' | 'contact';

export type RootStackParamList = {
  Home: undefined;
  Themes: undefined;
  Question: { themeId: string; questionId: string };
  Result: { userPseudo?: string } | undefined;
  AllQuestions: { candidatePseudo?: string } | undefined;
  FilterCandidates: undefined;
  Login: undefined;
  Share: undefined;
  ChatModes: undefined;
  Chat: { mode: ChatMode; chatId?: string };
  Feedback: { kind: FeedbackKind; themeId?: string; questionId?: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
