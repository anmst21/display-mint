import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

interface UseAnimatedHudProps {
  isHudOpen: boolean;
  duration?: number; // Optional, to allow customization of animation duration
}

export const useAnimatedHud = ({
  isHudOpen,
  duration = 400,
}: UseAnimatedHudProps) => {
  const hudOpacity = useSharedValue(1);

  useEffect(() => {
    if (isHudOpen) {
      hudOpacity.value = withTiming(1, { duration });
    } else {
      hudOpacity.value = withTiming(0, { duration });
    }
  }, [isHudOpen, duration]);

  const animatedHud = useAnimatedStyle(() => {
    return {
      opacity: hudOpacity.value,
    };
  });

  return animatedHud;
};
