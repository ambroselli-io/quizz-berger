import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, useWindowDimensions } from 'react-native';

interface PodiumSkeletonProps {
  title?: string;
  barCount?: number;
  maxBarHeight?: number;
}

// Relative heights so the skeleton looks like a real, descending podium.
const HEIGHT_RATIOS = [1, 0.82, 0.72, 0.62];

const PodiumSkeleton = ({ title, barCount = 4, maxBarHeight = 200 }: PodiumSkeletonProps) => {
  const { width } = useWindowDimensions();
  const opacity = useRef(new Animated.Value(0.4)).current;
  const barWidth = Math.max(width / (barCount > 3 ? 4 : 3.5), 60);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

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
      <View
        className="flex-1 flex-row items-end px-2.5 pb-2"
        style={{ overflow: 'hidden' }}
      >
        {Array.from({ length: barCount }).map((_, index) => {
          const barHeight = (HEIGHT_RATIOS[index] ?? 0.6) * maxBarHeight;
          return (
            <View key={index} className="items-center mx-0.5" style={{ width: barWidth }}>
              {/* Avatar placeholder */}
              <Animated.View
                className="mb-1 rounded-full bg-gray-200"
                style={{ width: 28, height: 28, opacity }}
              />
              {/* Bar placeholder */}
              <Animated.View
                className="w-full rounded-t-lg bg-gray-200"
                style={{ height: barHeight, opacity, borderCurve: 'continuous' }}
              />
              {/* Name placeholder */}
              <Animated.View
                className="mt-2 rounded bg-gray-200"
                style={{ width: barWidth * 0.7, height: 8, opacity }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PodiumSkeleton;
