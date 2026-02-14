import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { candidateImages } from '~/utils/candidateImages';

interface CandidateAvatarProps {
  picture: string;
  color?: string;
  size?: number;
  style?: ViewStyle;
}

const CandidateAvatar = ({ picture, color, size = 40, style }: CandidateAvatarProps) => {
  // Extract slug from "candidates/slug.png"
  const slug = picture.replace('candidates/', '').replace('.png', '');
  const imageSource = candidateImages[slug];

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: color || '#ccc',
          overflow: 'hidden',
          backgroundColor: color || '#f0f0f0',
        },
        style,
      ]}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          style={{ width: size - 4, height: size - 4 }}
          contentFit="cover"
        />
      ) : null}
    </View>
  );
};

export default CandidateAvatar;
