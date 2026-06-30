import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

const Header = ({ navigation, options, back }: NativeStackHeaderProps) => {
  const insets = useSafeAreaInsets();
  const title = typeof options.title === 'string' ? options.title : '';
  const backLabel = options.headerBackTitle ?? 'Retour';

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: '#111827' }}>
      <View className="h-12 flex-row items-center justify-center px-4">
        {back ? (
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            className="absolute left-4 z-10"
          >
            <Text className="text-base text-white">‹ {backLabel}</Text>
          </Pressable>
        ) : null}
        <Text
          className="text-lg text-white"
          style={{ fontFamily: 'Merriweather_700Bold' }}
          numberOfLines={1}
        >
          {title}
        </Text>
        {options.headerRight ? (
          <View className="absolute right-4 z-10">
            {options.headerRight({ canGoBack: !!back })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Header;
