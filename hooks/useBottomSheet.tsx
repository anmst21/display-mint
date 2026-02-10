import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useBottomSheet = ({
  onClose,
  containerHeight,
  isOpen,
  screenHeight,
  onAnimationEnd,
}: {
  onClose: () => void;
  containerHeight: number;
  isOpen: boolean;
  screenHeight: number;
  onAnimationEnd: () => void;
}) => {
  const insets = useSafeAreaInsets();

  const containerTranslateY = useSharedValue(screenHeight);

  useEffect(() => {
    if (isOpen) {
      containerTranslateY.value = withTiming(0, {
        duration: 200,
      });
    } else {
      containerTranslateY.value = withTiming(
        screenHeight,
        {
          duration: 200,
        },
        () => {
          runOnJS(onAnimationEnd)();
        }
      );
    }
  }, [isOpen]);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: containerTranslateY.value }],
    };
  }, []);

  const containerPan = Gesture.Pan()
    .onChange((e) => {
      containerTranslateY.value = Math.max(
        0,
        Math.min(e.translationY, screenHeight)
      );
    })
    .onEnd((e) => {
      const velocityThreshold = 700;
      const isVelocityHigh = e.velocityY > velocityThreshold;

      if (containerTranslateY.value > containerHeight / 1.2 || isVelocityHigh) {
        containerTranslateY.value = withTiming(
          containerHeight + insets.bottom,
          { duration: 100 },
          (finished) => {
            if (finished) {
              runOnJS(onClose)();
            }
          }
        );
      } else {
        containerTranslateY.value = withSpring(0);
      }
    });
  return { containerAnimatedStyle, containerPan };
};
