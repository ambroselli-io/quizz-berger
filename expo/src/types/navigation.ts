import type { ChatMode } from '~/utils/chatModes';

export type FeedbackKind = 'question' | 'testimony' | 'contact';

export type RootStackParamList = {
  Home: undefined;
  Themes: undefined;
  /** importantOnly: next/previous walk the starred questions across themes. */
  Question: { themeId: string; questionId: string; importantOnly?: boolean };
  Result: { userPseudo?: string } | undefined;
  /** themeId / importantOnly: show only the questions the podium tapped on was computed on. */
  AllQuestions: { candidatePseudo?: string; themeId?: string; importantOnly?: boolean } | undefined;
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
