import React, { useState } from "react";
import { View, Text, Pressable, Alert, Share } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import API from "~/services/api";
import useUser from "~/hooks/useUser";

interface ShareResultsProps {
  onRequestLogin: () => void;
  onCompare: () => void;
}

// Mirror of the "Votre lien" half of app-tanstack/src/components/result/ShareResults.tsx.
// The result image is web only: drawing it natively needs a new native module.
const ShareResults = ({ onRequestLogin, onCompare }: ShareResultsProps) => {
  const { user, mutate } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const publicLink = user?.pseudo ? encodeURI(`https://www.quizz-du-berger.com/result/${user.pseudo}`) : "";

  // A link only works once the results are public: sharing it is the consent.
  const makePublic = async () => {
    if (user?.isPublic) return true;
    setIsLoading(true);
    const response = await API.put({ path: "/user", body: { isPublic: true } });
    setIsLoading(false);
    if (!response?.ok) {
      Alert.alert("Erreur", response?.error);
      return false;
    }
    mutate(response.data);
    return true;
  };

  const onStopSharing = async () => {
    setIsLoading(true);
    const response = await API.put({ path: "/user", body: { isPublic: false } });
    setIsLoading(false);
    if (!response?.ok) return Alert.alert("Erreur", response?.error);
    mutate(response.data);
  };

  const onSend = async () => {
    if (!(await makePublic())) return;
    Share.share({
      title: "Mes résultats au Quizz du Berger",
      message: `Voici mes affinités politiques pour 2027. Et toi ? ${publicLink}`
    }).catch(() => {});
  };

  return (
    <View>
      <Text className="mb-5 text-center text-2xl font-bold text-quizz-dark" style={{ fontFamily: "Merriweather_700Bold" }}>
        Partagez vos résultats
      </Text>
      <View className="gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <View className="flex-row items-center gap-2">
          <Ionicons name="link-outline" size={24} color="#111827" />
          <Text className="text-xl font-bold text-quizz-dark">Votre lien</Text>
        </View>
        {user?.pseudo ? (
          <>
            <Text
              selectable
              numberOfLines={1}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-700"
            >
              {publicLink}
            </Text>
            <Pressable
              onPress={onSend}
              disabled={isLoading}
              className="items-center rounded-xl bg-quizz-yellow px-4 py-3"
              style={{ opacity: isLoading ? 0.5 : 1 }}
            >
              <Text className="text-base font-semibold text-quizz-dark">Envoyer</Text>
            </Pressable>
            <View className="rounded-xl border border-dashed border-gray-300 bg-white p-4">
              <Text className="text-sm text-gray-700">
                Vos amis peuvent aussi se comparer à vous avec votre pseudo, dans «&nbsp;Comparer avec mes amis&nbsp;»
                {user.isPublic ? "" : ", dès que vous avez envoyé votre lien"}&nbsp;:
              </Text>
              <Text selectable className="mt-2 text-center text-xl font-bold text-quizz-dark">
                {user.pseudo}
              </Text>
            </View>
            {user.isPublic && (
              <Text className="text-sm text-gray-600">
                Votre lien et votre pseudo montrent vos résultats.{" "}
                <Text className="underline" onPress={isLoading ? undefined : onStopSharing}>
                  Arrêter le partage
                </Text>
              </Text>
            )}
          </>
        ) : (
          <>
            <Text className="text-base text-gray-700">
              Pour obtenir un lien vers vos résultats, enregistrez-les d'abord : un pseudo et un mot de passe suffisent.
            </Text>
            <Pressable onPress={onRequestLogin} className="items-center rounded-xl bg-quizz-yellow px-4 py-3">
              <Text className="text-base font-semibold text-quizz-dark">Enregistrer mes résultats</Text>
            </Pressable>
            <Text className="text-sm text-gray-600">Vos proches pourront faire le quiz et se comparer à vous.</Text>
          </>
        )}
      </View>
      <Text className="mt-5 border-t border-gray-200 pt-4 text-center text-base text-gray-700">
        ▸ Vous connaissez le pseudo d'un ami&nbsp;?{" "}
        <Text className="font-bold text-quizz-dark underline" onPress={onCompare}>
          Comparez-vous
        </Text>
      </Text>
    </View>
  );
};

export default ShareResults;
