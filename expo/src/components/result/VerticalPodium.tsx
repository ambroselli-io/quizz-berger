import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "~/types/navigation";
import type { PodiumDataWithPercentAndHeightAndHighest } from "~/types/quizz";
import CandidateAvatar from "~/components/CandidateAvatar";

type Nav = NativeStackNavigationProp<RootStackParamList>;

const MEDAL_COLORS = ["#facc15", "#cbd5e1", "#d6a067"];

interface VerticalPodiumProps {
  podiumised: Array<Pick<PodiumDataWithPercentAndHeightAndHighest, "pseudos" | "pictures" | "colors" | "percent">>;
  title?: string;
  subtitle?: string;
  /** Params of the candidate links, so AllQuestions shows the questions this podium was computed on. */
  linkParams?: { themeId?: string; importantOnly?: boolean };
  visibleCount?: number;
}

// Mirror of app-tanstack/src/components/result/VerticalPodium.tsx.
const VerticalPodium = ({ podiumised, title, subtitle, linkParams, visibleCount = 4 }: VerticalPodiumProps) => {
  const navigation = useNavigation<Nav>();
  const [expanded, setExpanded] = useState(false);
  let rank = 1;
  const rows = podiumised.map((step) => {
    const row = { ...step, rank };
    rank += Math.max(step.pseudos.length, 1);
    return row;
  });
  const shownRows = expanded ? rows : rows.slice(0, visibleCount);

  return (
    <View>
      {!!title && (
        <Text className="mb-1 text-xl font-bold text-quizz-dark" style={{ fontFamily: "Merriweather_700Bold" }}>
          {title}
        </Text>
      )}
      {!!subtitle && <Text className="mb-3 text-sm text-gray-600">{subtitle}</Text>}
      <View className="gap-2">
        {shownRows.map(({ pseudos, pictures, colors, percent, rank }, index) => (
          <View
            key={pseudos.join(",") + percent}
            className="flex-row items-center gap-2 rounded-xl border bg-white px-3 py-2"
            style={{ borderColor: colors[0] ? `${colors[0]}55` : "#e5e7eb" }}
          >
            <View
              className="h-7 w-7 items-center justify-center rounded-full"
              style={{ backgroundColor: MEDAL_COLORS[index] ?? "#f3f4f6" }}
            >
              <Text className="text-sm font-bold text-quizz-dark">{rank}</Text>
            </View>
            {/* Fixed width (two overlapping faces) so every bar starts at the same x; empty past two ex-aequo. */}
            {pseudos.length <= 2 && (
              <View className="w-16 flex-row items-center">
                {pseudos.map((pseudo, i) => (
                  <CandidateAvatar
                    key={pseudo}
                    picture={pictures[i] ?? ""}
                    color={colors[i]}
                    size={40}
                    style={i > 0 ? { marginLeft: -16 } : undefined}
                  />
                ))}
              </View>
            )}
            <View className="flex-1 gap-1">
              <Text className="text-sm font-semibold leading-tight text-quizz-dark">
                {pseudos.map((pseudo, i) => (
                  <Text key={pseudo}>
                    {i > 0 && ", "}
                    <Text
                      className="underline"
                      onPress={() => navigation.navigate("AllQuestions", { candidatePseudo: pseudo, ...linkParams })}
                    >
                      {pseudo}
                    </Text>
                  </Text>
                ))}
              </Text>
              <View className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <View
                  className="h-full rounded-full"
                  style={{ width: `${percent}%`, backgroundColor: colors[0] ?? "#111827" }}
                />
              </View>
            </View>
            <Text className="w-12 text-right text-base font-bold text-quizz-dark">{percent}%</Text>
          </View>
        ))}
      </View>
      {rows.length > visibleCount && (
        <Pressable
          onPress={() => setExpanded((e) => !e)}
          className="mt-3 self-center rounded-lg border border-gray-300 bg-white px-4 py-2"
        >
          <Text className="text-sm font-medium text-gray-700">{expanded ? "Voir moins ▴" : "Voir plus ▾"}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default VerticalPodium;
