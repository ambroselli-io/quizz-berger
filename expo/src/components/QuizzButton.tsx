import React from 'react';
import { Pressable, Text } from 'react-native';

interface QuizzButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

const QuizzButton = ({ children, onPress, disabled }: QuizzButtonProps) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    className="items-center rounded-full bg-quizz-yellow px-8 py-3"
    style={{ opacity: disabled ? 0.5 : 1 }}
  >
    <Text
      className="text-base font-semibold text-black"
      style={{ fontFamily: 'MerriweatherSans_700Bold' }}
    >
      {children}
    </Text>
  </Pressable>
);

export default QuizzButton;
