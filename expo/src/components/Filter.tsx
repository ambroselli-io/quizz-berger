import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

interface FilterProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Filter = ({ title, children, defaultOpen = false }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <View className="mb-4">
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center rounded-md border border-gray-300 bg-white px-3 py-2"
      >
        <Text className="text-sm font-medium text-gray-700">{title}</Text>
        <Text className="ml-auto text-gray-400">{isOpen ? '▲' : '▼'}</Text>
      </Pressable>
      {isOpen && (
        <View className="mt-2 flex-row flex-wrap gap-2">
          {children}
        </View>
      )}
    </View>
  );
};

export default Filter;
