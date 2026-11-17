import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator, TextInput, Alert, Share } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "~/types/navigation";
import getUserThemes from "~/utils/getUserThemes";
import useQuizz from "~/hooks/useQuizz";
import useUser from "~/hooks/useUser";
import useUserAnswers from "~/hooks/useUserAnswers";
import useCandidates from "~/hooks/useCandidates";
import useFriends from "~/hooks/useFriends";
import { getCandidatesScorePerThemes } from "~/shared/utils/score";
import { getPodium } from "~/shared/utils/podium";
import VerticalPodium from "~/components/result/VerticalPodium";
import QuizzFeedback, { getStoredQuizzFeedback, type QuizzFeedbackState } from "~/components/result/QuizzFeedback";
import ShareResults from "~/components/result/ShareResults";
import QuestionByQuestion, { type QuestionPerson } from "~/components/result/QuestionByQuestion";
import useStore from "~/zustand/store";
import API from "~/services/api";
import { chatModes } from "~/utils/chatModes";
import { isInQuickQuizz } from "~/utils/quickQuizz";
import type { Answer, UserAnswerWithScorePerThemeAndMax } from "~/types/quizz";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, "Result">;

export default function ResultScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const userPseudo = route.params?.userPseudo;
  const { quizz, quizzQuestions } = useQuizz();
  const { user, mutate } = useUser();
  const { userAnswers } = useUserAnswers();
  const { candidates, isLoading: candidatesLoading } = useCandidates();
  const { friends, mutateFriends } = useFriends();

  const [publicUser, setPublicUser] = useState<{ pseudo?: string; isPublic?: boolean; friends?: string[] } | null>(
    null
  );
  const [publicUserAnswers, setPublicUserAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    if (!userPseudo || userPseudo === user?.pseudo) return;
    API.get({ path: `/user/${userPseudo}` }).then((res) => {
      if (res.ok) setPublicUser(res.data);
    });
    API.get({ path: `/answer/${userPseudo}` }).then((res) => {
      if (res.ok) setPublicUserAnswers(res.data);
    });
  }, [userPseudo, user?.pseudo]);

  const publicPage = useMemo(() => {
    if (!userPseudo) return false;
    if (userPseudo === user?.pseudo) return false;
    if (!publicUser?.isPublic) return false;
    return true;
  }, [userPseudo, user, publicUser]);

  const answersToShow = useMemo(() => {
    if (userPseudo === user?.pseudo) return userAnswers;
    if (publicPage) return publicUserAnswers;
    return userAnswers;
  }, [publicUserAnswers, publicPage, userAnswers, userPseudo, user?.pseudo]);

  const userToShow = useMemo(() => {
    if (!publicPage) return user;
    if (userPseudo === user?.pseudo) return user;
    return publicUser;
  }, [user, publicUser, publicPage, userPseudo]);

  // Same text as the web's "Télécharger mes réponses" file; the native share sheet saves or sends it.
  const downloadAnswers = () => {
    const answersByQuestion = new Map(answersToShow.map((a) => [a.questionId, a]));
    const text = quizz
      .map((theme) => {
        const lines = theme.questions
          .filter((question) => answersByQuestion.has(question._id))
          .map((question) => {
            const answer = answersByQuestion.get(question._id)!;
            const answerText = question.answers[answer.answerIndex] ?? "Pas de réponse";
            return `${question.fr}${answer.isImportant ? " (question importante pour moi)" : ""}\n→ ${answerText}`;
          });
        return lines.length ? `${theme.fr.toUpperCase()}\n\n${lines.join("\n\n")}` : "";
      })
      .filter(Boolean)
      .join("\n\n\n");
    Share.share({ message: text, title: "Mes réponses au Quizz du Berger" });
  };

  const selectedThemes = useMemo(() => getUserThemes(answersToShow, quizz), [answersToShow, quizz]);

  const title = useMemo(() => {
    if (!publicPage && !userToShow?.pseudo) return "Voici vos résultats";
    const name = (userToShow?.pseudo?.charAt(0).toUpperCase() ?? "") + (userToShow?.pseudo?.slice(1) ?? "");
    if (!publicPage) return `${name}, voici vos résultats`;
    return `Voici les résultats de ${name}`;
  }, [publicPage, userToShow]);

  const hiddenCandidates = useStore((s) => s.hiddenCandidates);

  const shownCandidatesCount = useMemo(
    () => candidates.filter((c) => !hiddenCandidates.includes(c.pseudo)).length,
    [candidates, hiddenCandidates]
  );

  useLayoutEffect(() => {
    if (!candidates.length) return;
    const allShown = shownCandidatesCount === candidates.length;
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate("FilterCandidates")} hitSlop={8}>
          <Text className="text-base text-white">{allShown ? "Filtrer" : `Filtrer (${shownCandidatesCount})`}</Text>
        </Pressable>
      )
    });
  }, [navigation, candidates.length, shownCandidatesCount]);

  const allFriendPseudos = useMemo(() => friends.map((f) => f.pseudo), [friends]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const friendsInitialized = useRef(false);
  const [showFriends, setShowFriends] = useState(false);
  const [newFriend, setNewFriend] = useState("");
  const [loadingFriend, setLoadingFriend] = useState(false);
  const [noFriend, setNoFriend] = useState<string | null>(null);
  const newFriendTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!friendsInitialized.current && allFriendPseudos.length) {
      setSelectedFriends(allFriendPseudos);
      friendsInitialized.current = true;
    }
  }, [allFriendPseudos]);

  const toggleFriend = (pseudo: string) => {
    setSelectedFriends((prev) => (prev.includes(pseudo) ? prev.filter((p) => p !== pseudo) : [...prev, pseudo]));
  };

  const setNewFriendRequest = (text: string) => {
    setNoFriend(null);
    setNewFriend(text);
    if (text.length < 3 || allFriendPseudos.includes(text) || userToShow?.pseudo === text) {
      setLoadingFriend(false);
      setNoFriend(null);
      if (newFriendTimeout.current) clearTimeout(newFriendTimeout.current);
      return;
    }
    if (newFriendTimeout.current) clearTimeout(newFriendTimeout.current);
    newFriendTimeout.current = setTimeout(async () => {
      setNoFriend(null);
      setLoadingFriend(true);
      const response = await API.get({ path: `/user/friends/${text}` });
      if (response.ok) {
        setLoadingFriend(false);
        Alert.alert("Ajouter un ami", `Voulez-vous ajouter ${response.data.pseudo} à vos amis ?`, [
          { text: "Annuler", style: "cancel" },
          {
            text: "Ajouter",
            onPress: async () => {
              setLoadingFriend(true);
              await API.put({
                path: "/user",
                body: { friends: [...(userToShow?.friends || []), response.data._id] }
              });
              setSelectedFriends((prev) => [...prev, response.data.pseudo]);
              await mutate();
              await mutateFriends();
              setLoadingFriend(false);
              setNewFriend("");
            }
          }
        ]);
      } else {
        setLoadingFriend(false);
        if (response.code === "NOT_PUBLIC") {
          Alert.alert("", `${text} n'a pas cliqué sur "Partager". Demandez-lui !`);
        } else {
          setNoFriend(text);
        }
      }
    }, 500);
  };

  const candidatesScorePerThemes = useMemo(
    () =>
      getCandidatesScorePerThemes(
        answersToShow.filter((a) => selectedThemes.includes(a.themeId)),
        candidates.map((c) => ({
          ...c,
          _id: (c as any).id ?? c._id,
          id: (c as any).id ?? c._id,
          answers: c.answers.filter((a: Answer) => selectedThemes.includes(a.themeId))
        })) as any,
        quizzQuestions
      ),
    [answersToShow, selectedThemes, candidates, quizzQuestions]
  );

  const friendsScorePerThemes = useMemo(
    () =>
      getCandidatesScorePerThemes(
        answersToShow.filter((a) => selectedThemes.includes(a.themeId)),
        friends.map((f) => ({
          ...f,
          _id: (f as any).id ?? f._id,
          id: (f as any).id ?? f._id,
          answers: f.answers.filter((a: Answer) => selectedThemes.includes(a.themeId))
        })) as any,
        quizzQuestions
      ),
    [answersToShow, selectedThemes, friends, quizzQuestions]
  );

  const filteredPersons: UserAnswerWithScorePerThemeAndMax[] = useMemo(
    () => [
      ...candidatesScorePerThemes.filter((c) => !hiddenCandidates.includes(c.pseudo)),
      ...friendsScorePerThemes.filter((f) => selectedFriends.includes(f.pseudo))
    ],
    [candidatesScorePerThemes, friendsScorePerThemes, hiddenCandidates, selectedFriends]
  );

  // "Questions importantes pour moi": same scoring, restricted to the questions the user starred.
  const importantAnswers = useMemo(
    () => answersToShow.filter((a) => a.isImportant && selectedThemes.includes(a.themeId)),
    [answersToShow, selectedThemes]
  );
  const importantPersons: UserAnswerWithScorePerThemeAndMax[] = useMemo(() => {
    if (!importantAnswers.length) return [];
    const score = (persons: Array<{ _id?: string; answers: Answer[] }>) =>
      getCandidatesScorePerThemes(
        importantAnswers,
        persons.map((p) => ({ ...p, _id: (p as any).id ?? p._id, id: (p as any).id ?? p._id })) as any,
        quizzQuestions
      );
    return [
      ...score(candidates).filter((c) => !hiddenCandidates.includes(c.pseudo)),
      ...score(friends).filter((f) => selectedFriends.includes(f.pseudo))
    ];
  }, [importantAnswers, candidates, friends, hiddenCandidates, selectedFriends, quizzQuestions]);

  const podiumsPerTheme = useMemo(
    () =>
      selectedThemes.map((themeId) => ({
        themeId,
        personsScore: filteredPersons.map((c) => ({
          id: c.id,
          pseudo: c.pseudo,
          picture: c.picture,
          color: c.color,
          total: c.scorePerThemes?.find((score) => themeId === score.themeId)?.percent ?? 0,
          totalMax: 100
        }))
      })),
    [selectedThemes, filteredPersons]
  );


  const questionPersons: QuestionPerson[] = useMemo(
    () => [
      ...candidates.filter((c) => !hiddenCandidates.includes(c.pseudo)),
      ...friends.filter((f) => selectedFriends.includes(f.pseudo))
    ],
    [candidates, friends, hiddenCandidates, selectedFriends]
  );

  const [feedback, setFeedback] = useState<QuizzFeedbackState>(getStoredQuizzFeedback);
  const [visibleThemes, setVisibleThemes] = useState(1);

  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const generalY = useRef(0);
  const compareWithFriends = () => {
    setShowFriends(true);
    scrollRef.current?.scrollTo({ y: generalY.current, animated: true });
  };

  const showSaveButton = !publicPage && !userToShow?.pseudo;
  // The "full version" box shows only while every answer belongs to the web's quick quiz.
  const onlyQuickQuizzAnswers =
    !publicPage && answersToShow.length > 0 && answersToShow.every((a) => isInQuickQuizz(a.questionId));
  const quizzQuestionsCount = quizzQuestions.length;
  const quizzThemesCount = quizz.length;

  const podiumLoading = candidatesLoading;

  if (!answersToShow.length) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#111827" />
      </View>
    );
  }

  const card = "rounded-2xl border border-gray-200 bg-white p-4";
  const merriweather = { fontFamily: "Merriweather_700Bold" };

  // Nothing left to do (full quiz, results saved): no box at all.
  const fullQuizzCta = (onlyQuickQuizzAnswers || showSaveButton) && (
    <View className="gap-5 rounded-2xl border-2 border-yellow-400 bg-yellow-50 p-5">
      {onlyQuickQuizzAnswers && (
        <View className="items-start gap-3">
          <Text className="text-xl font-bold text-quizz-dark" style={merriweather}>
            Vous avez fait le test rapide
          </Text>
          <Text className="text-sm text-gray-700">
            Ce résultat repose sur {answersToShow.length} question{answersToShow.length > 1 ? "s" : ""}. La version
            intégrale en compte {quizzQuestionsCount}, sur {quizzThemesCount} thèmes&nbsp;: répondez à celles que vous
            voulez, votre classement s'affine à chaque réponse.
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Themes")}
            className="rounded-lg border-2 border-gray-800 bg-gray-800 px-4 py-2.5"
          >
            <Text className="text-sm font-semibold text-white">Faire la version intégrale</Text>
          </Pressable>
        </View>
      )}
      {showSaveButton && (
        <View className={`items-start gap-3 ${onlyQuickQuizzAnswers ? "border-t border-yellow-300 pt-5" : ""}`}>
          <Text className="text-xl font-bold text-quizz-dark" style={merriweather}>
            Enregistrez vos résultats
          </Text>
          <Text className="text-sm text-gray-700">
            Sans enregistrement, vos résultats seront perdus dans une heure. Enregistrez-les de façon anonyme avec un
            pseudo et un mot de passe, sans email.
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            className={`rounded-lg border-2 border-gray-800 px-4 py-2.5 ${onlyQuickQuizzAnswers ? "bg-white" : "bg-gray-800"}`}
          >
            <Text className={`text-sm font-semibold ${onlyQuickQuizzAnswers ? "text-gray-800" : "text-white"}`}>
              Enregistrer mes résultats
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  const feedbackBox = !publicPage && (
    <View className={card}>
      <QuizzFeedback state={feedback} setState={setFeedback} answersCount={answersToShow.length} />
    </View>
  );

  const shareBox = !publicPage && (
    <View className={card}>
      <ShareResults onRequestLogin={() => navigation.navigate("Login")} onCompare={compareWithFriends} />
    </View>
  );

  const remainingThemes = podiumsPerTheme.length - visibleThemes;

  return (
    <ScrollView
      ref={scrollRef}
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ padding: 16, paddingBottom: 40, gap: 32 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      automaticallyAdjustKeyboardInsets
    >
      <Text className="text-2xl font-bold text-quizz-dark" style={merriweather}>
        {title}
      </Text>

      {fullQuizzCta}

      <View className={card} onLayout={(e) => (generalY.current = e.nativeEvent.layout.y)}>
        <Text className="mb-1 text-2xl font-bold text-quizz-dark" style={merriweather}>
          Votre classement général
        </Text>
        <Text className="mb-4 text-sm text-gray-600">Appuyez sur le nom d'un candidat pour voir ses réponses.</Text>
        {podiumLoading ? (
          <ActivityIndicator color="#111827" />
        ) : (
          <VerticalPodium podiumised={getPodium(filteredPersons, true)} />
        )}

        {!publicPage && (
          <View className="mt-5 flex-row flex-wrap gap-2 border-t border-gray-100 pt-4">
            {showSaveButton && (
              <Pressable
                onPress={() => navigation.navigate("Login")}
                className="flex-row items-center rounded-lg border-2 border-yellow-400 bg-yellow-400 px-4 py-2.5"
              >
                <Text className="text-sm font-semibold text-black">Enregistrer</Text>
              </Pressable>
            )}
            <Pressable
              onPress={() => setShowFriends((s) => !s)}
              className="flex-row items-center rounded-lg border-2 border-gray-800 bg-white px-4 py-2.5"
            >
              <Text className="text-sm font-medium text-gray-800">Comparer avec mes amis</Text>
            </Pressable>
            <Pressable
              onPress={downloadAnswers}
              className="flex-row items-center rounded-lg border-2 border-gray-800 bg-white px-4 py-2.5"
            >
              <Text className="text-sm font-medium text-gray-800">Télécharger mes réponses</Text>
            </Pressable>
          </View>
        )}

        {!publicPage && showFriends && (
          <View className="mt-3">
            {friendsScorePerThemes.length > 0 && (
              <View className="mb-3 flex-row flex-wrap gap-2">
                {friendsScorePerThemes.map((friend) => {
                  const isSelected = selectedFriends.includes(friend.pseudo);
                  return (
                    <Pressable
                      key={friend.pseudo}
                      onPress={() => toggleFriend(friend.pseudo)}
                      className="rounded-lg border px-4 py-2"
                      style={{ borderColor: "#111827", backgroundColor: isSelected ? "#111827" : "white" }}
                    >
                      <Text className="text-sm" style={{ color: isSelected ? "white" : "#111827" }}>
                        {friend.pseudo}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 rounded-lg border border-gray-200 px-3 py-3 text-base"
                placeholder={loadingFriend ? `Ajout de ${newFriend}...` : "Tapez le pseudo d'un ami"}
                value={newFriend}
                onChangeText={setNewFriendRequest}
                autoComplete="name"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {loadingFriend && <ActivityIndicator className="ml-2" color="#111827" />}
            </View>
            {noFriend && noFriend === newFriend && (
              <Text className="mt-1 text-xs text-red-500">
                Il n'y a pas de pseudo « {newFriend} » existant. Vérifiez les majuscules ?
              </Text>
            )}
            {!user?.isPublic && (
              <Text className="mt-2 text-xs text-gray-500">
                Pour que vos amis puissent aussi se comparer à vous, partagez votre lien (bloc « Partagez vos
                résultats »).
              </Text>
            )}
          </View>
        )}
      </View>

      {feedbackBox}

      {shareBox}

      <View className="rounded-2xl bg-quizz-dark p-4">
        <Text className="mb-1 text-2xl font-bold text-white" style={merriweather}>
          Et si vous en discutiez avec l'IA&nbsp;?
        </Text>
        <Text className="mb-4 text-sm text-white/80">
          Une IA qui n'a pas le droit de vous dire pour qui voter. Elle est là pour vous aider à réfléchir, pas pour
          penser à votre place.
        </Text>
        <View className="gap-3">
          {chatModes.map((chatMode) => (
            <Pressable
              key={chatMode.mode}
              onPress={() => navigation.navigate("Chat", { mode: chatMode.mode })}
              className="rounded-xl border-2 border-white/20 p-4"
            >
              <Text className="mb-1 text-lg font-bold text-white" style={merriweather}>
                {chatMode.title}
              </Text>
              <Text className="text-sm leading-relaxed text-white/80">{chatMode.description}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="gap-4">
        <Text className="text-2xl font-bold text-quizz-dark" style={merriweather}>
          Thème par thème
        </Text>
        <View className={card}>
          <Text className="mb-1 text-xl font-bold text-quizz-dark" style={merriweather}>
            <Text style={{ color: "#facc15" }}>★ </Text>
            Questions importantes pour moi
          </Text>
          {importantPersons.length > 0 ? (
            <VerticalPodium
              podiumised={getPodium(importantPersons, true)}
              linkParams={publicPage ? undefined : { importantOnly: true }}
              subtitle={`Résultats calculés uniquement sur ${
                importantAnswers.length === 1 ? "la question" : `les ${importantAnswers.length} questions`
              } ${publicPage ? "marquée" : "que vous avez marquée"}${importantAnswers.length > 1 ? "s" : ""} comme importante${
                importantAnswers.length > 1 ? "s" : ""
              }.`}
            />
          ) : (
            <Text className="text-sm text-gray-600">
              {publicPage
                ? "Aucune question marquée comme importante."
                : "Sur chaque question, appuyez sur « Marquer comme importante pour moi » : vous verrez ici avec qui vous êtes d'accord sur ce qui compte le plus pour vous."}
            </Text>
          )}
        </View>
        {podiumsPerTheme.slice(0, visibleThemes).map(({ personsScore, themeId }) => (
          <View key={themeId} className={card}>
            <VerticalPodium
              podiumised={getPodium(personsScore)}
              title={quizz.find((t) => t._id === themeId)?.fr}
              linkParams={{ themeId }}
            />
          </View>
        ))}
        {remainingThemes > 0 && (
          <Pressable
            onPress={() => setVisibleThemes((v) => v + 3)}
            className="self-center rounded-lg border border-gray-300 bg-white px-4 py-2"
          >
            <Text className="text-sm font-medium text-gray-700">
              Voir plus ({remainingThemes} thème{remainingThemes > 1 ? "s" : ""} restant
              {remainingThemes > 1 ? "s" : ""}) ▾
            </Text>
          </Pressable>
        )}
      </View>

      <QuestionByQuestion
        quizz={quizz}
        answers={answersToShow.filter((a) => selectedThemes.includes(a.themeId))}
        persons={questionPersons}
      />

      {feedbackBox}

      {shareBox}

      {fullQuizzCta}
    </ScrollView>
  );
}
