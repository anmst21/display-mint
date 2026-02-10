import { StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import Animated, {
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
  memo,
  useCallback,
} from "react";
import * as Haptics from "expo-haptics";
import { Skeleton } from "moti/skeleton";
import { ResizeMode, Video } from "expo-av";

const { width: screenWidth } = Dimensions.get("window");
export const tinderCardWidth = screenWidth - 70;

interface SwipableCardProps {
  isVideo: boolean;
  isError: boolean;
  isMinting: boolean;
  isMinted: boolean;
  isMintOpen: boolean;
  uri: string;
  index: number;
  numOfCards: number;
  activeIndex: SharedValue<number>;
  onResponse: (a: boolean) => void;
  isLoading: boolean;
  blurhash: string;
}

const SwipableCard = forwardRef(
  (
    {
      isVideo,
      isError,
      isMinted,
      isMinting,
      isMintOpen,
      uri,
      index,
      numOfCards,
      activeIndex,
      onResponse,
      isLoading,
      blurhash,
    }: SwipableCardProps,
    ref
  ) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const translationX = useSharedValue(0);
    const isSwiped = useSharedValue(false);
    useImperativeHandle(ref, () => ({
      swipeRight: () => {
        onResponse(true);
        translationX.value = withSpring(1000);
      },
      swipeLeft: () => {
        onResponse(false);

        translationX.value = withSpring(-1000);
        activeIndex.value = withTiming(index + 1, { duration: 200 });
      },
    }));
    const hapticSuccess = async () =>
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const hapticError = async () =>
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    useEffect(() => {
      if (Math.floor(activeIndex.value) === index && isError) {
        hapticError();
      }
    }, [isError]);
    useEffect(() => {
      if (Math.floor(activeIndex.value) === index && isMinted) {
        translationX.value = withSpring(1000);
        //onResponse(true);
        isSwiped.value = true;
        activeIndex.value = withTiming(index + 1, { duration: 200 });

        hapticSuccess();
      }
    }, [isMinted]);

    useEffect(() => {
      if (Math.floor(activeIndex.value) === index && !isMintOpen) {
        translationX.value = withTiming(0);
      }
    }, [isMintOpen]);

    const animatedCard = useAnimatedStyle(() => ({
      display: index < Math.floor(activeIndex.value) ? "none" : "flex",
      opacity: index - 6 > activeIndex.value ? 0 : 1,
      transform: [
        {
          scale: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [0.92, 1, 1]
          ),
        },
        {
          translateY: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [-25, 0, 0]
          ),
        },
        {
          translateX: translationX.value,
        },
        {
          rotateZ: `${interpolate(
            translationX.value,
            [-screenWidth / 2, 0, screenWidth / 2],
            [-15, 0, 15]
          )}deg`,
        },
      ],
    }));

    const gesture = Gesture.Pan()
      .enabled(
        index === Math.floor(activeIndex.value) && !isLoading && !isMinting
      )

      .onChange((event) => {
        translationX.value = event.translationX;
        activeIndex.value = interpolate(
          Math.abs(translationX.value),
          [0, 500],
          [index, index + 0.8]
        );
      })
      .onEnd((event) => {
        if (Math.abs(event.velocityX) > 1000) {
          if (event.velocityX < 0) {
            translationX.value = withSpring(Math.sign(event.velocityX) * 2000, {
              velocity: event.velocityX / 20,
            });

            activeIndex.value = withTiming(index + 1, { duration: 200 });

            runOnJS(onResponse)(event.velocityX > 0);
            isSwiped.value = true;
          } else {
            translationX.value = withSpring(Math.sign(event.velocityX) * 2000, {
              velocity: event.velocityX / 20,
            });
            runOnJS(onResponse)(event.velocityX > 0);
          }
        } else {
          translationX.value = withSpring(0);
        }
      });

    const handleImageLoad = useCallback(() => {
      if (index > 0 && index < 4) {
        setTimeout(() => {
          setIsImageLoading(false);
        }, index * 150);
      } else {
        setIsImageLoading(false);
      }
    }, []);

    console.log("skeleton", isLoading || isImageLoading);
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          onLayout={handleImageLoad}
          style={[
            styles.card,
            animatedCard,
            {
              zIndex: numOfCards - index,
              display: index < Math.floor(activeIndex.value) ? "none" : "flex",
            },
          ]}
        >
          <Skeleton
            show={isLoading || isImageLoading}
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
          >
            {!isVideo ? (
              <Image
                placeholder={{ blurhash }}
                transition={100}
                contentFit="cover"
                style={[StyleSheet.absoluteFillObject, styles.image]}
                source={{
                  uri,
                }}
                //  onLoad={() => setIsImageLoading(false)}
              />
            ) : (
              <Video
                source={{
                  uri: uri.replace(".webp", ".mp4"),
                }}
                rate={1.0}
                onLoad={() => setIsImageLoading(false)}
                volume={1.0}
                isMuted={false}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                style={styles.video}
              />
            )}
          </Skeleton>
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default SwipableCard;

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
  container: {
    height: 600,
    borderRadius: 8,
    overflow: "hidden",
    position: "absolute",
    backgroundColor: "red",
  },
  image: {
    borderCurve: "continuous",
    overflow: "hidden",
  },
  card: {
    width: tinderCardWidth,
    height: tinderCardWidth,
    borderCurve: "continuous",
    aspectRatio: 1 / 1.67,
    borderRadius: 25,
    justifyContent: "flex-end",
    overflow: "hidden",
    position: "absolute",
    backgroundColor: "rgba(142, 142, 147, 1)",

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0, // Equivalent to the horizontal shadow offset in the Figma design
      height: 2, // Equivalent to the vertical shadow offset in the Figma design
    },
    shadowOpacity: 0.2, // Equivalent to the opacity of the shadow (rgba(0, 0, 0, 0.20))
    shadowRadius: 16, // Equivalent to the blur radius of the shadow
    elevation: 8,
  },
});
