import React, { useRef, useState } from "react";
import { View, Text, Pressable, TextInput, Modal, Alert, Linking, Platform, Share } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import API from "~/services/api";
import useUser from "~/hooks/useUser";
import storage from "~/utils/storage";
import { DONATION_URL } from "~/utils/chatModes";

// Mirror of app-tanstack/src/components/result/QuizzFeedback.tsx.
export const RATINGS = ["Pas du tout", "Plutôt pas", "Mitigé", "Plutôt oui", "Carrément, j'ai adoré !"];
export const QUIZZ_FEEDBACK_STORAGE_KEY = "quizzFeedback";
const LIKED_FROM = 3;
const SITE_URL = "https://www.quizz-du-berger.com";
const SHARE_TEXT = "J'ai fait le Quizz du Berger : à quel candidat de 2027 ressemblent vraiment vos idées ?";

export interface QuizzFeedbackState {
  rating: number | null;
  sent: boolean;
  /** Row of the QuizzFeedback table, created on the first tap. */
  id?: string | null;
}

export const getStoredQuizzFeedback = (): QuizzFeedbackState => {
  try {
    const stored = storage.getString(QUIZZ_FEEDBACK_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // corrupted value: start over
  }
  return { rating: null, sent: false };
};

interface QuizzFeedbackProps {
  state: QuizzFeedbackState;
  setState: (state: QuizzFeedbackState) => void;
  answersCount: number;
}

const input = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base";

const QuizzFeedback = ({ state, setState, answersCount }: QuizzFeedbackProps) => {
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [media, setMedia] = useState({ text: "", email: "", sent: false });
  const [askEmail, setAskEmail] = useState(false);
  const [email, setEmail] = useState("");
  // The comment reaches us before the email is asked: many close the popup, their words still count.
  const silentlySent = useRef<string | null>(null);

  const update = (next: QuizzFeedbackState) => {
    setState(next);
    storage.set(QUIZZ_FEEDBACK_STORAGE_KEY, JSON.stringify(next));
  };

  // The tap alone is saved: most people will never press "Envoyer mon avis".
  const creating = useRef<Promise<string | null> | null>(null);
  const onRate = async (rating: number) => {
    setState({ ...state, rating });
    const id = state.id ?? (await creating.current);
    if (id) {
      API.put({ path: `/quizz-feedback/${id}`, body: { rating } });
      return;
    }
    creating.current = API.post({ path: "/quizz-feedback", body: { rating, answersCount } }).then((res) =>
      res?.ok ? (res.data.id as string) : null
    );
    const newId = await creating.current;
    if (newId) update({ rating, sent: false, id: newId });
  };

  const feedbackMail = (text: string, contactEmail?: string) => {
    if (state.rating === null) return;
    return API.post({
      path: "/feedback",
      body: {
        subject: `Quizz du Berger : avis sur le quiz (${state.rating + 1}/5 - ${RATINGS[state.rating]})${contactEmail ? ` - ${contactEmail}` : ""}`,
        text: [
          `Note : ${state.rating + 1}/5 - ${RATINGS[state.rating]}`,
          `Plateforme : app ${Platform.OS}`,
          `Utilisateur : ${user?.pseudo ?? user?._id ?? "(anonyme)"}`,
          `Questions répondues : ${answersCount}`,
          `Email : ${contactEmail ?? "(pas encore donné)"}`,
          "",
          text
        ].join("\n"),
        email: contactEmail
      }
    });
  };

  const sendRating = async () => {
    if (state.rating === null) return;
    const text = comment.trim();
    if (!text) {
      setIsSending(true);
      await feedbackMail("(pas de commentaire)");
      setIsSending(false);
      update({ ...state, sent: true });
      return;
    }
    if (silentlySent.current !== text) {
      silentlySent.current = text;
      const id = state.id ?? (await creating.current);
      if (id) API.put({ path: `/quizz-feedback/${id}`, body: { rating: state.rating, comment: text } });
      feedbackMail(text);
    }
    setAskEmail(true);
  };

  const sendEmail = async () => {
    const contactEmail = email.trim();
    if (!contactEmail.includes("@")) return;
    setIsSending(true);
    await feedbackMail(comment.trim(), contactEmail);
    setIsSending(false);
    setAskEmail(false);
    update({ ...state, sent: true });
  };

  const sendMedia = async () => {
    if (!media.text.trim()) return;
    setIsSending(true);
    const response = await API.post({
      path: "/feedback",
      body: {
        subject: "Quizz du Berger : des médias à contacter",
        text: [
          `Plateforme : app ${Platform.OS}`,
          `Utilisateur : ${user?.pseudo ?? user?._id ?? "(anonyme)"}`,
          `Email : ${media.email.trim() || "(non renseigné)"}`,
          "",
          media.text.trim()
        ].join("\n"),
        email: media.email.trim() || undefined
      }
    });
    setIsSending(false);
    if (!response?.ok) {
      Alert.alert("Erreur", response?.error || "Le message n'est pas parti, réessayez dans un instant.");
      return;
    }
    setMedia((m) => ({ ...m, sent: true }));
  };

  const onShare = () => {
    Share.share({ title: "Le Quizz du Berger", message: `${SHARE_TEXT} ${SITE_URL}` }).catch(() => {});
  };

  const liked = state.rating !== null && state.rating >= LIKED_FROM;

  return (
    <View className="items-center">
      <Text className="mb-1 text-center text-2xl font-bold text-quizz-dark" style={{ fontFamily: "Merriweather_700Bold" }}>
        {state.sent ? "Merci !" : "Ce quiz vous a plu ?"}
      </Text>
      {!state.sent && (
        <>
          <Text className="mb-4 text-center text-sm text-gray-600">Votre avis nous aide à l'améliorer.</Text>
          <View className="w-full gap-2">
            {RATINGS.map((label, index) => (
              <View key={label} className="w-full gap-2">
                <Pressable
                  onPress={() => onRate(index)}
                  className={`w-full items-center justify-center rounded-lg border px-2.5 py-2.5 ${
                    state.rating === index ? "border-quizz-dark bg-quizz-dark" : "border-gray-200 bg-white"
                  }`}
                  style={{ minHeight: 52 }}
                >
                  <Text className={`text-center text-base ${state.rating === index ? "text-white" : "text-black"}`}>
                    {label}
                  </Text>
                </Pressable>
                {state.rating === index && (
                  <View className="mb-2 w-full gap-2">
                    <TextInput
                      value={comment}
                      onChangeText={setComment}
                      multiline
                      numberOfLines={3}
                      maxLength={2000}
                      placeholder={"Dites-nous en plus !"}
                      className={input}
                      style={{ minHeight: 80, textAlignVertical: "top" }}
                    />
                    <Pressable
                      disabled={isSending}
                      onPress={sendRating}
                      className="items-center rounded-lg bg-quizz-dark px-5 py-3"
                      style={{ opacity: isSending ? 0.5 : 1 }}
                    >
                      <Text className="font-semibold text-white">{isSending ? "Envoi..." : "Envoyer mon avis"}</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))}
          </View>
        </>
      )}
      <Modal visible={askEmail} transparent animationType="fade" onRequestClose={() => setAskEmail(false)}>
        <Pressable className="flex-1 items-center justify-center bg-black/50 px-4" onPress={() => setAskEmail(false)}>
          <Pressable className="w-full max-w-[440px] gap-3 rounded-lg bg-white p-5" onPress={() => {}}>
            <Text className="text-base text-gray-700">
              Par expérience, une clarification est toujours nécessaire pour bien cerner votre propos, votre email est
              donc indispensable pour échanger avec vous.
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoFocus
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              placeholder="vous@exemple.fr"
              className={input}
              onSubmitEditing={sendEmail}
            />
            <Pressable
              disabled={isSending}
              onPress={sendEmail}
              className="items-center rounded-lg bg-quizz-dark px-5 py-3"
              style={{ opacity: isSending ? 0.5 : 1 }}
            >
              <Text className="font-semibold text-white">{isSending ? "Envoi..." : "Envoyer mon avis"}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      {state.sent && (
        <>
          <Text className="mb-4 text-center text-base text-gray-700">
            {liked
              ? "Ça fait vraiment plaisir ! Vous pouvez nous aider à aller plus loin :"
              : "Votre avis est bien reçu, il nous aide à améliorer le quiz."}
          </Text>
          {liked && (
            <View className="w-full gap-3">
              {!!DONATION_URL && (
                <Pressable
                  onPress={() => Linking.openURL(DONATION_URL)}
                  className="flex-row items-center justify-center gap-2 rounded-lg bg-quizz-yellow px-4 py-3"
                >
                  <Ionicons name="heart-outline" size={18} color="#111827" />
                  <Text className="font-semibold text-quizz-dark">Faire un don</Text>
                </Pressable>
              )}
              <Pressable
                onPress={onShare}
                className="flex-row items-center justify-center gap-2 rounded-lg bg-quizz-dark px-4 py-3"
              >
                <Ionicons name="megaphone-outline" size={18} color="white" />
                <Text className="font-semibold text-white">Partager sur les réseaux</Text>
              </Pressable>
              <Pressable
                onPress={() => setShowMedia((s) => !s)}
                className="flex-row items-center justify-center gap-2 rounded-lg border-2 border-quizz-dark bg-white px-4 py-3"
              >
                <Ionicons name="newspaper-outline" size={18} color="#111827" />
                <Text className="font-semibold text-quizz-dark">Je connais des médias</Text>
              </Pressable>
              {showMedia &&
                (media.sent ? (
                  <Text className="text-center text-sm text-gray-700">Merci&nbsp;! On s'en occupe.</Text>
                ) : (
                  <View className="w-full gap-3">
                    <Text className="text-sm text-gray-700">
                      Un journaliste, un média, un créateur de contenu qui pourrait parler du quiz&nbsp;?
                    </Text>
                    <TextInput
                      value={media.text}
                      onChangeText={(text) => setMedia((m) => ({ ...m, text }))}
                      multiline
                      numberOfLines={3}
                      maxLength={2000}
                      placeholder="Un nom, un contact, un lien..."
                      className={input}
                      style={{ minHeight: 80, textAlignVertical: "top" }}
                    />
                    <TextInput
                      value={media.email}
                      onChangeText={(text) => setMedia((m) => ({ ...m, email: text }))}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      placeholder="Votre email, si vous voulez qu'on vous réponde (facultatif)"
                      className={input}
                    />
                    <Pressable
                      disabled={isSending || !media.text.trim()}
                      onPress={sendMedia}
                      className="items-center rounded-lg bg-quizz-dark px-5 py-3"
                      style={{ opacity: isSending || !media.text.trim() ? 0.5 : 1 }}
                    >
                      <Text className="font-semibold text-white">{isSending ? "Envoi..." : "Envoyer"}</Text>
                    </Pressable>
                  </View>
                ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default QuizzFeedback;
