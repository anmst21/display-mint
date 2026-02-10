import React, { useEffect } from "react";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

function Icon({ grey }: { grey?: boolean }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(-360, {
        duration: 800,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scaleX: -1, // Flip horizontally
        },
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M12 5a7 7 0 0 0-4 12.746V15a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1H4a1 1 0 1 1 0-2h2.343a9 9 0 0 1 9.032-15.345 1 1 0 1 1-.75 1.853A7 7 0 0 0 12 5"
          clipRule="evenodd"
        ></Path>
        <Path
          fill="#fff"
          d="M13 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2M21 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0M19.93 14.268a1 1 0 1 1-1 1.732 1 1 0 0 1 1-1.732M17.368 19.294a1 1 0 1 0-1-1.732 1 1 0 0 0 1 1.732M18.927 8a1 1 0 1 1-1-1.732 1 1 0 0 1 1 1.732"
        ></Path>
      </Svg>
    </Animated.View>
  );
}

export default Icon;
