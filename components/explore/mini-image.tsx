import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  runOnJS,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { useEffect, useState, memo, useMemo } from "react";
import { Skeleton } from "moti/skeleton";

interface MiniImageProps {
  uri: string;
  index: number;
  callback: (value: number) => void;
  activeIndex: number;
}

const MiniImage: React.FC<MiniImageProps> = ({
  uri,
  index,
  activeIndex,
  callback,
}) => {
  const [isImageLoading, setImageLoading] = useState(true);
  const componentWidth = useSharedValue(30);
  const memoActiveIndex = useMemo(() => {
    return activeIndex;
  }, [activeIndex]);

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(callback)(index);
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: componentWidth.value,
    };
  });

  useEffect(() => {
    if (memoActiveIndex === index) {
      componentWidth.value = withTiming(48, {
        duration: 200,
      });
    } else {
      componentWidth.value = withTiming(30, {
        duration: 200,
      });
    }
  }, [memoActiveIndex]);

  return (
    <GestureDetector gesture={tapGesture}>
      <Animated.View style={[animatedStyle, styles.container]}>
        <Skeleton
          show={isImageLoading}
          width={"100%"}
          height={"100%"}
          transition={{
            type: "spring",
            duration: 500,
          }}
          colors={[
            "rgba(142, 142, 147, 1)",
            "rgba(221, 221, 231, 1)",
            "rgba(142, 142, 147, 1)",
          ]}
          backgroundColor="rgba(142, 142, 147, 1)"
          backgroundSize={2}
          radius={0}
        >
          <Image
            onLoad={() => setImageLoading(false)}
            contentFit="contain"
            source={uri}
            style={StyleSheet.absoluteFill}
          />
        </Skeleton>
      </Animated.View>
    </GestureDetector>
  );
};

export default MiniImage;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderCurve: "continuous",
    backgroundColor: "gey",
    flex: 1,
    height: 50,
    overflow: "hidden",
  },
});
