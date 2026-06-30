import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, Alert, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "~/types/navigation";
import API from "~/services/api";
import QuizzButton from "~/components/QuizzButton";
import useUserAnswers from "~/hooks/useUserAnswers";
import useUser from "~/hooks/useUser";
import useStore from "~/zustand/store";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { userAnswers } = useUserAnswers();
  const { logout } = useUser();
  const hasResults = userAnswers.length > 0;

  const handleRestart = () => {
    Alert.alert("Recommencer", "Voulez-vous vraiment effacer vos réponses et recommencer à zéro ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Recommencer",
        style: "destructive",
        onPress: async () => {
          await logout();
          useStore.getState().setUserAnswers([]);
          useStore.getState().setHiddenCandidates([]);
        }
      }
    ]);
  };
  const [countUsers, setCountUsers] = useState(207569);
  const [countAnswers, setCountAnswers] = useState(9721827);

  useEffect(() => {
    API.get({ path: "/public/count" }).then((res) => {
      if (res.data) {
        setCountUsers((res.data.countUsers || 0) + 207569);
        setCountAnswers((res.data.countAnswers || 0) + 9721827);
      }
    });
  }, []);

  return (
    <ScrollView className="flex-1 bg-quizz-dark">
      {/* Hero */}
      <View
        className="min-h-[600px] items-center px-5 pb-16"
        style={{ paddingTop: Dimensions.get("window").height * 0.3 }}
      >
        <Text className="mb-8 text-center text-4xl font-bold text-white" style={{ fontFamily: "Merriweather_700Bold" }}>
          QUI est mon candidat{"\u00A0"}idéal{"\u00A0"}?
        </Text>

        <QuizzButton onPress={() => navigation.navigate("Themes")}>Répondre au Quizz</QuizzButton>

        {hasResults && (
          <Pressable
            className="mt-4 rounded-full border-2 border-white/80 px-6 py-3"
            onPress={() => navigation.navigate("Result", undefined)}
          >
            <Text
              className="text-center text-base font-bold text-white"
              style={{ fontFamily: "MerriweatherSans_700Bold" }}
            >
              Aller aux résultats
            </Text>
          </Pressable>
        )}

        <View className="items-center">
          <Text
            className="mt-10 px-4 text-center text-base leading-8 text-white/80"
            style={{ fontFamily: "MerriweatherSans_300Light" }}
          >
            70% des électeurs demanderont l'avis d'une Intelligence Artificielle pour savoir quoi voter.
          </Text>
          <Text className="text-base leading-8 font-bold text-white">Pas vous.</Text>
        </View>
      </View>

      {/* Stats */}
      <View className="items-center bg-quizz-dark px-5">
        <Text className="text-center text-2xl font-bold text-white" style={{ fontFamily: "Merriweather_700Bold" }}>
          {Intl.NumberFormat("fr").format(countUsers)} quizz effectués
        </Text>
        <Text className="mt-4 text-center text-2xl font-bold text-white" style={{ fontFamily: "Merriweather_700Bold" }}>
          {Intl.NumberFormat("fr").format(countAnswers)} réponses données
        </Text>
      </View>

      {/* Restart */}
      <View className="items-center bg-quizz-dark px-5 pb-16 gap-4 pt-16">
        <Pressable className="mt-8" onPress={() => navigation.navigate("Login")}>
          <Text className="text-center text-sm text-white/70" style={{ fontFamily: "MerriweatherSans_400Regular" }}>
            Vous avez enregistré vos résultats ? <Text className="font-bold text-white/90">Connectez-vous</Text>
          </Text>
        </Pressable>
        <Pressable onPress={handleRestart} hitSlop={8}>
          <Text
            className="text-center text-sm text-white/50 underline"
            style={{ fontFamily: "MerriweatherSans_400Regular" }}
          >
            Je veux recommencer
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
