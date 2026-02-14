import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';

interface LoaderProps {
  isLoading: boolean;
  size?: number | 'small' | 'large';
  withBackground?: boolean;
}

const Loader = ({ isLoading, size = 'large', withBackground = false }: LoaderProps) => {
  if (!isLoading) return null;

  if (withBackground) {
    return (
      <Modal transparent visible={isLoading} animationType="fade">
        <View className="flex-1 items-center justify-center bg-quizz-dark/90">
          <ActivityIndicator size={size} color="#facc15" />
        </View>
      </Modal>
    );
  }

  return <ActivityIndicator size={size} color="#111827" />;
};

export default Loader;
