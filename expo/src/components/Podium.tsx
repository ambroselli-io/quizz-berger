import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/types/navigation';
import type { PodiumDataWithPercentAndHeightAndHighest } from '~/types/quizz';
import { getMaxPersons } from '~/shared/utils/podium';
import CandidateAvatar from './CandidateAvatar';

type Nav = NativeStackNavigationProp<RootStackParamList>;

interface PodiumProps {
  podiumised: PodiumDataWithPercentAndHeightAndHighest[];
  title?: string;
}

const Podium = ({ podiumised, title }: PodiumProps) => {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const maxPersons = useMemo(() => getMaxPersons(podiumised), [podiumised]);
  const heightMultiplier = 1.5;

  const barWidth = Math.max(width / (podiumised.length > 3 ? 4 : 3.5), 60);

  return (
    <View className="flex-1">
      {title && (
        <Text
          className="mb-2 px-4 text-lg font-bold text-quizz-dark"
          style={{ fontFamily: 'Merriweather_700Bold' }}
        >
          {title}
        </Text>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'flex-end',
          paddingHorizontal: 10,
          paddingBottom: 8,
          flexGrow: 1,
        }}
      >
        {podiumised.map(({ pseudos, pictures, height, percent, colors }, index) => {
          const barHeight = Math.max(height * heightMultiplier, 20);
          const barColor =
            index === 0
              ? 'gold'
              : index === 1
                ? 'silver'
                : index === 2
                  ? '#cd7f32'
                  : `rgba(205, 127, 50, ${height / 100})`;

          return (
            <View
              key={`${height}-${pseudos.join(',')}`}
              className="items-center mx-0.5"
              style={{ width: barWidth }}
            >
              {/* Avatar(s) */}
              <View className="mb-1 flex-row items-center justify-center">
                {pictures.filter(Boolean).map((pic, i) => (
                  <CandidateAvatar
                    key={pic}
                    picture={pic}
                    color={colors[i]}
                    size={28}
                    style={i > 0 ? { marginLeft: -10 } : undefined}
                  />
                ))}
              </View>

              {/* Bar */}
              <View
                className="w-full items-center justify-center overflow-hidden rounded-t-lg"
                style={{
                  height: barHeight,
                  backgroundColor: barColor,
                  borderCurve: 'continuous',
                }}
              >
                <Text
                  className="text-center font-bold"
                  style={{ fontSize: Math.max((percent / 100) * 18, 10) }}
                >
                  {percent}%
                </Text>
              </View>

              {/* Names */}
              <View className="mt-1" style={{ height: Math.min(Math.max(maxPersons, 2), 3.2) * 14 }}>
                {pseudos.map((pseudo) => (
                  <Pressable
                    key={pseudo}
                    onPress={() => navigation.navigate('AllQuestions', { candidatePseudo: pseudo })}
                  >
                    <Text className="text-center text-[10px] text-blue-700 underline" numberOfLines={1}>
                      {pseudo}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Podium;
