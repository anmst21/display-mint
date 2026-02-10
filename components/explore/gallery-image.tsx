import { useState, memo, useCallback, useContext } from "react";
import { RenderItemInfo } from "react-native-awesome-gallery";
import { Skeleton } from "moti/skeleton";
import { Image } from "expo-image";
import { StyleSheet, View, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import Animated, {
  runOnJS,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Gesture, GestureDetector } from "react-native-gesture-handler";

const GalleryImage = ({
  mimeType,
  uri,
  blurhash,
  aspectRatio,
  onTap,
}: {
  onTap: () => void;
  mimeType: string;
  uri: string;
  blurhash: string;
  aspectRatio: number;
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const windowWidth = Dimensions.get("window").width;
  const maxHeight = 360;
  const maxWidth = windowWidth - 70;

  // Calculate the dimensions of the image
  let imageWidth, imageHeight;
  if (maxWidth / aspectRatio <= maxHeight) {
    imageWidth = maxWidth;
    imageHeight = maxWidth / aspectRatio;
  } else {
    imageHeight = maxHeight;
    imageWidth = maxHeight * aspectRatio;
  }

  const tap = Gesture.Tap().onEnd(() => {
    runOnJS(onTap)();
  });

  return (
    <View style={styles.galleryImage}>
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[
            {
              width: imageWidth,
              height: imageHeight,
            },
          ]}
        >
          {mimeType === "image/gif" ? (
            <Video
              source={{
                uri: uri.replace(".webp", ".mp4"),
              }}
              rate={1.0}
              //  onLoad={() => setIsImageLoading(false)}
              volume={1.0}
              isMuted={false}
              resizeMode={ResizeMode.COVER}
              shouldPlay
              isLooping
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <Image
              placeholder={{ blurhash }}
              transition={400}
              source={uri}
              contentFit="cover"
              style={StyleSheet.absoluteFill}
              onLoad={() => setIsImageLoading(false)}
            />
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default GalleryImage;

const styles = StyleSheet.create({
  galleryImage: {
    height: 360,
    marginHorizontal: 35,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
});
