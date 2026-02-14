export type RootStackParamList = {
  Home: undefined;
  Themes: undefined;
  Question: { themeId: string; questionId: string };
  Result: { userPseudo?: string } | undefined;
  AllQuestions: { candidatePseudo?: string } | undefined;
  Login: undefined;
  Share: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
