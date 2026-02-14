import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
}

const ProgressBar = ({ progress, color = '#111827', height = 4 }: ProgressBarProps) => (
  <View className="w-full overflow-hidden rounded-full bg-gray-100" style={{ height }}>
    <View
      className="rounded-full"
      style={{
        width: `${Math.min(Math.max(progress * 100, 0), 100)}%`,
        height,
        backgroundColor: color,
      }}
    />
  </View>
);

export default ProgressBar;
