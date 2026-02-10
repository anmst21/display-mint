import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useState, memo } from "react";

interface ExploreImageProps {
  uri: string | undefined;
  imageSize: number;
  index: number;
  link: string;
  blurhash: string;
}

const ExploreImage: React.FC<ExploreImageProps> = ({
  uri,
  imageSize,
  index,
  link,
  blurhash,
}) => {
  const [isError, setIsError] = useState(false);
  return (
    <TouchableOpacity
      disabled={isError}
      key={index}
      onPress={() => router.push(link as any)}
    >
      <View
        style={[styles.imgContainer, { width: imageSize, height: imageSize }]}
      >
        <Image
          placeholder={{ blurhash }}
          contentFit="cover"
          onError={() => setIsError(true)}
          style={[StyleSheet.absoluteFill]}
          source={
            isError ? require("@/assets/images/logo-no-image.svg") : { uri }
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(ExploreImage);

const styles = StyleSheet.create({
  imgContainer: {
    position: "relative",
    borderRadius: 15,
    borderCurve: "continuous",
    overflow: "hidden",
  },
});
