import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "~/types/navigation";
import type { Answer, QuizzQuestion, QuizzTheme } from "~/types/quizz";
import CandidateAvatar from "~/components/CandidateAvatar";
import { isInQuickQuizz } from "~/utils/quickQuizz";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export interface QuestionPerson {
  pseudo: string;
  picture?: string | null;
  color?: string | null;
  answers: Array<Pick<Answer, "questionId" | "answerIndex">>;
}

interface QuestionByQuestionProps {
  quizz: QuizzTheme[];
  answers: Array<Pick<Answer, "questionId" | "answerIndex">>;
  persons: QuestionPerson[];
}

// Mirror of app-tanstack/src/components/result/QuestionByQuestion.tsx (its mobile layout).
const FIRST_COUNT = 1;
const STEP = 5;
// From "nothing in common" (0) to "same answer" (5).
const SCORE_COLORS = ["#dc2626", "#f97316", "#f59e0b", "#a3c94a", "#4ade80", "#16a34a"];

const shortName = (pseudo: string) => {
  const space = pseudo.indexOf(" ");
  if (space < 1) return pseudo;
  return `${pseudo[0]}. ${pseudo.slice(space + 1)}`;
};

const points = (score: number) => `${score > 0 ? "+" : ""}${score} pt${score > 1 ? "s" : ""}`;

const ScoreCircle = ({ score }: { score: number }) => (
  <View
    className="h-11 w-11 items-center justify-center rounded-full bg-white"
    style={{ borderWidth: 3, borderColor: SCORE_COLORS[score] ?? "#9ca3af" }}
  >
    <Text className="text-sm font-bold" style={{ color: SCORE_COLORS[score] ?? "#6b7280" }}>
      {score}
    </Text>
  </View>
);

const PersonList = ({ persons }: { persons: QuestionPerson[] }) => {
  const navigation = useNavigation<Nav>();
  return (
    <View className="flex-row flex-wrap gap-x-3 gap-y-2">
      {persons.map((p) => (
        <Pressable
          key={p.pseudo}
          onPress={() => navigation.navigate("AllQuestions", { candidatePseudo: p.pseudo })}
          className="flex-row items-center gap-2"
        >
          <CandidateAvatar picture={p.picture ?? ""} color={p.color ?? undefined} size={32} />
          <Text className="text-sm text-gray-800">{shortName(p.pseudo)}</Text>
        </Pressable>
      ))}
    </View>
  );
};

interface CardProps {
  number: number;
  question: QuizzQuestion;
  theme: QuizzTheme;
  userAnswerIndex: number;
  personsPerAnswer: QuestionPerson[][];
}

const QuestionCard = ({ number, question, theme, userAnswerIndex, personsPerAnswer }: CardProps) => {
  const [open, setOpen] = useState(true);
  const scores = question.scores[userAnswerIndex] ?? [];

  return (
    <View className="rounded-2xl border border-gray-200 bg-white p-4">
      <View className="flex-row items-start gap-3">
        <View className="flex-1">
          <View className="mb-2 flex-row flex-wrap items-center gap-2">
            {!!question.help?.startsWith('http') && (
              <Pressable
                onPress={() => Linking.openURL(question.help!)}
                className="h-7 w-7 items-center justify-center rounded-full border-2 border-gray-700"
                accessibilityLabel="En savoir plus"
              >
                <Text className="text-sm font-bold text-gray-700">?</Text>
              </Pressable>
            )}
            <View className="rounded-md bg-gray-100 px-2 py-0.5">
              <Text className="text-sm font-semibold text-gray-500">Q{number}</Text>
            </View>
            {isInQuickQuizz(question._id) && (
              <View className="rounded-full bg-yellow-100 px-3 py-0.5">
                <Text className="text-xs font-semibold uppercase tracking-wide text-yellow-800">Quiz rapide</Text>
              </View>
            )}
            <View className="rounded-full bg-gray-100 px-3 py-0.5">
              <Text className="text-xs font-semibold uppercase tracking-wide text-quizz-dark">{theme.fr}</Text>
            </View>
          </View>
          <Text className="text-lg font-semibold text-quizz-dark">{question.fr}</Text>
        </View>
        <Pressable onPress={() => setOpen((o) => !o)} hitSlop={8} accessibilityLabel={open ? "Replier" : "Déplier"}>
          <Text className="text-lg text-gray-500">{open ? "▴" : "▾"}</Text>
        </Pressable>
      </View>
      {open && (
        <View className="mt-4 gap-4">
          {question.answers.map((answer, i) => (
            <View key={i} className={`rounded-xl p-3 ${i === userAnswerIndex ? "bg-gray-100" : ""}`}>
              <View className="flex-row items-center gap-3">
                <ScoreCircle score={scores[i] ?? 0} />
                <Text className="flex-1 text-sm text-gray-700">
                  {i === userAnswerIndex && <Text className="font-semibold text-quizz-dark">Vous ▸ </Text>}
                  {answer}
                </Text>
                <Text className="text-sm font-bold text-quizz-dark">{points(scores[i] ?? 0)}</Text>
              </View>
              {personsPerAnswer[i].length > 0 && (
                <View className="mt-3 pl-14">
                  <PersonList persons={personsPerAnswer[i]} />
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const QuestionByQuestion = ({ quizz, answers, persons }: QuestionByQuestionProps) => {
  const [visible, setVisible] = useState(FIRST_COUNT);

  const items = useMemo(() => {
    const userAnswers = new Map(answers.map((a) => [a.questionId, a.answerIndex]));
    const personAnswers = persons.map((p) => ({
      person: p,
      byQuestion: new Map(p.answers.map((a) => [a.questionId, a.answerIndex]))
    }));
    return quizz.flatMap((theme) =>
      theme.questions
        .filter((question) => userAnswers.has(question._id))
        .map((question) => ({
          theme,
          question,
          userAnswerIndex: userAnswers.get(question._id)!,
          personsPerAnswer: question.answers.map((_, i) =>
            personAnswers.filter(({ byQuestion }) => byQuestion.get(question._id) === i).map(({ person }) => person)
          )
        }))
    );
  }, [quizz, answers, persons]);

  if (!items.length) return null;
  const remaining = items.length - visible;

  return (
    <View>
      <Text className="mb-1 text-2xl font-bold text-quizz-dark" style={{ fontFamily: "Merriweather_700Bold" }}>
        Question par question
      </Text>
      <Text className="mb-4 text-sm text-gray-600">
        Pour chaque question, les points que rapporte chaque réponse par rapport à la vôtre, et qui l'a choisie.
      </Text>
      <View className="gap-4">
        {items.slice(0, visible).map((item, index) => (
          <QuestionCard key={item.question._id} number={index + 1} {...item} />
        ))}
      </View>
      {remaining > 0 && (
        <Pressable
          onPress={() => setVisible((v) => v + STEP)}
          className="mt-4 self-center rounded-lg border border-gray-300 bg-white px-4 py-2"
        >
          <Text className="text-sm font-medium text-gray-700">
            Voir plus ({remaining} question{remaining > 1 ? "s" : ""} restante{remaining > 1 ? "s" : ""}) ▾
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default QuestionByQuestion;
