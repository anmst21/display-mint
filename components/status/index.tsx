import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Loader, StatusPlay, StatusRejected, StatusSuccess } from "../icon";
import { useEffect, useContext, useRef } from "react";
import { Context } from "@/context/FeedContext";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import StatusWrapper from "./status-wrapper";
import HideBtn from "./hide-btn";

const Status: React.FC = () => {
  const {
    state: {
      mintingStatus: { status, name },
    },
    setMintingStatus,
  } = useContext(Context);
  const statusRef = useRef<any>(null);

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (status === "minting") {
      // Start the rotation animation when isOpen is true
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 1000, // 1 second per rotation
          easing: Easing.linear,
        }),
        -1 // Infinite repeat
      );
    } else {
      // Delay stopping the animation by 0.5 seconds when isOpen is false
      const timer = setTimeout(() => {
        cancelAnimation(rotation); // Stop the animation
        rotation.value = 0; // Reset rotation value after stopping the animation
      }, 500); // 0.5 seconds delay

      // Clear the timer if isOpen changes before 0.5s
      return () => clearTimeout(timer);
    }
  }, [status]);

  const spinnerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }], // Directly use rotation value for the transform
    };
  });

  return (
    <StatusWrapper
      ref={statusRef}
      callback={() => {}}
      status={status === "minting"}
      minting
    >
      <BlurView
        tint="systemThinMaterialDark"
        intensity={80}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[spinnerStyle]}>
        <Loader grey />
      </Animated.View>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        Minting {name}
      </Text>
      {/* <HideBtn
        callback={() => {
          statusRef.current?.onClose();
        }}
      /> */}
    </StatusWrapper>
  );
};

export default Status;
const styles = StyleSheet.create({
  text: {
    fontFamily: "SF-Pro",
    color: "#8E8E93",
    fontSize: 13,
    overflow: "hidden",
    flexShrink: 1,
  },
});
