import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import useCandidates from "~/hooks/useCandidates";
import useStore from "~/zustand/store";

export default function FilterCandidatesScreen() {
  const { candidates } = useCandidates();
  const hiddenCandidates = useStore((s) => s.hiddenCandidates);
  const toggleHiddenCandidate = useStore((s) => s.toggleHiddenCandidate);
  const setHiddenCandidates = useStore((s) => s.setHiddenCandidates);

  const allShown = hiddenCandidates.length === 0;

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <View className="mb-4 flex-row gap-2">
        <Pressable
          onPress={() => setHiddenCandidates([])}
          disabled={allShown}
          className="rounded-lg border border-gray-800 px-3 py-2"
          style={{ opacity: allShown ? 0.4 : 1 }}
        >
          <Text className="text-sm text-gray-800">Tout afficher</Text>
        </Pressable>
        <Pressable
          onPress={() => setHiddenCandidates(candidates.map((c) => c.pseudo))}
          className="rounded-lg border border-gray-800 px-3 py-2"
        >
          <Text className="text-sm text-gray-800">Tout masquer</Text>
        </Pressable>
      </View>

      <View className="flex-row flex-wrap gap-2">
        {candidates.map((candidate) => {
          const isShown = !hiddenCandidates.includes(candidate.pseudo);
          return (
            <Pressable
              key={candidate.pseudo}
              onPress={() => toggleHiddenCandidate(candidate.pseudo)}
              className="rounded-lg border px-4 py-2.5"
              style={{ borderColor: "#111827", backgroundColor: isShown ? "#111827" : "white" }}
            >
              <Text className="text-sm" style={{ color: isShown ? "white" : "#111827" }}>
                {candidate.pseudo}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
