import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator, TextInput, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "~/types/navigation";
import { quizz, quizzQuestions } from "~/utils/quizz";
import getUserThemes from "~/utils/getUserThemes";
import useUser from "~/hooks/useUser";
import useUserAnswers from "~/hooks/useUserAnswers";
import useCandidates from "~/hooks/useCandidates";
import useFriends from "~/hooks/useFriends";
import { getCandidatesScorePerThemes } from "~/shared/utils/score";
import { getPodium } from "~/shared/utils/podium";
import Podium from "~/components/Podium";
import PodiumSkeleton from "~/components/PodiumSkeleton";
import QuizzButton from "~/components/QuizzButton";
import useStore from "~/zustand/store";
import API from "~/services/api";
import storage from "~/utils/storage";
import * as StoreReview from "expo-store-review";
import type { Answer, UserAnswerWithScorePerThemeAndMax } from "~/types/quizz";

const REVIEW_REQUESTED_KEY = "app-review-requested";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, "Result">;

export default function ResultScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const userPseudo = route.params?.userPseudo;
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

  const selectedThemes = useMemo(() => getUserThemes(answersToShow), [answersToShow]);

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

  // Ask for an app store review once the user has reached their results, at most
  // once per install (the OS throttles further and may show nothing).
  const reviewAsked = useRef(false);
  useEffect(() => {
    if (reviewAsked.current) return;
    if (!answersToShow.length || candidatesLoading) return;
    if (storage.getString(REVIEW_REQUESTED_KEY)) return;
    reviewAsked.current = true;
    const timeout = setTimeout(async () => {
      try {
        if (!(await StoreReview.hasAction())) return;
        await StoreReview.requestReview();
        storage.set(REVIEW_REQUESTED_KEY, "1");
      } catch {
        // never block the UI on a review prompt
      }
    }, 2500);
    return () => clearTimeout(timeout);
  }, [answersToShow.length, candidatesLoading]);

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
    [answersToShow, selectedThemes, candidates]
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
    [answersToShow, selectedThemes, friends]
  );

  const filteredPersons: UserAnswerWithScorePerThemeAndMax[] = useMemo(
    () => [
      ...candidatesScorePerThemes.filter((c) => !hiddenCandidates.includes(c.pseudo)),
      ...friendsScorePerThemes.filter((f) => selectedFriends.includes(f.pseudo))
    ],
    [candidatesScorePerThemes, friendsScorePerThemes, hiddenCandidates, selectedFriends]
  );

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

  const showSaveButton = !publicPage && !userToShow?.pseudo;

  const podiumLoading = candidatesLoading;

  if (!answersToShow.length) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#111827" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="px-4 pt-4">
        <Text className="mb-2 text-2xl font-bold text-quizz-dark" style={{ fontFamily: "Merriweather_700Bold" }}>
          {title}
        </Text>
        <Text className="mb-4 rounded-md bg-amber-50 px-3 py-1.5 text-xs text-amber-800">
          Appuyez sur le nom d'un candidat pour voir ses réponses
        </Text>
      </View>

      {/* Main podium */}
      <View style={{ height: 300 }}>
        {podiumLoading ? <PodiumSkeleton maxBarHeight={240} /> : <Podium podiumised={getPodium(filteredPersons)} />}
      </View>

      {/* Action buttons */}
      {!publicPage && (
        <View className="mt-4 flex-row flex-wrap gap-2 px-4">
          {showSaveButton && (
            <Pressable
              onPress={() => navigation.navigate("Login")}
              className="flex-row items-center rounded-lg border-2 border-yellow-400 bg-yellow-400 px-4 py-2.5"
            >
              <Text className="text-sm font-semibold text-black">Enregistrer</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => {
              if (!userToShow?.pseudo) navigation.navigate("Login");
              else navigation.navigate("Share");
            }}
            className="flex-row items-center rounded-lg border-2 border-gray-800 bg-white px-4 py-2.5"
          >
            <Text className="text-sm font-medium text-gray-800">Partager</Text>
          </Pressable>
          <Pressable
            onPress={() => setShowFriends((s) => !s)}
            className="flex-row items-center rounded-lg border-2 border-gray-800 px-4 py-2.5"
            style={{ backgroundColor: !user?.friends?.length ? "#1f2937" : "white" }}
          >
            <Text
              className="text-sm font-medium"
              style={{ color: !user?.friends?.length ? "white" : "#1f2937" }}
            >
              Comparer avec mes amis
            </Text>
          </Pressable>
        </View>
      )}

      {/* Friends comparison panel */}
      {!publicPage && showFriends && (
        <View className="mt-3 px-4">
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
              N'oubliez pas de cliquer sur « Partager » pour permettre à vos amis de faire la même chose avec vous !
            </Text>
          )}
        </View>
      )}

      {/* Per-theme podiums */}
      <View className="mt-8 px-4">
        <Text className="mb-4 text-2xl font-bold text-quizz-dark" style={{ fontFamily: "Merriweather_700Bold" }}>
          Thème par thème
        </Text>
      </View>
      {podiumLoading
        ? selectedThemes.map((themeId) => (
            <View key={themeId} className="h-[300px]">
              <PodiumSkeleton maxBarHeight={190} title={quizz.find((t) => t._id === themeId)?.fr} />
            </View>
          ))
        : podiumsPerTheme.map(({ personsScore, themeId }) => (
            <View key={themeId} className="h-[300px]">
              <Podium podiumised={getPodium(personsScore)} title={quizz.find((t) => t._id === themeId)?.fr} />
            </View>
          ))}
    </ScrollView>
  );
}
