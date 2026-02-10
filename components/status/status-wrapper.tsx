import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface StatusWrapperProps {
  children: React.ReactNode;
  status: boolean;
  callback: () => void;
  minting?: boolean;
}

const StatusWrapper = forwardRef(
  ({ status, callback, children, minting }: StatusWrapperProps, ref) => {
    const [statusOpen, setStatusOpen] = useState(status);

    useImperativeHandle(ref, () => ({
      onClose: () => {
        translateY.value = withTiming(200);
        setStatusOpen(false);
      },
    }));

    useEffect(() => {
      if (status) {
        setStatusOpen(true);
      }
    }, [status]);

    const insets = useSafeAreaInsets();

    const translateY = useSharedValue(200);
    useEffect(() => {
      if (statusOpen) {
        translateY.value = withTiming(0); // Set the position when isOpen is true

        // Set a timeout to change isOpen to false after 3 seconds
        const timer = setTimeout(
          () => {
            setStatusOpen(false);
            callback();

            //  setMintingStatus(null);
          },
          !minting ? 2000 : 5000
        ); // 3 seconds

        return () => clearTimeout(timer);
      } else {
        translateY.value = withTiming(200); // Set the position when isOpen is false
      }
    }, [statusOpen]); // Adding all relevant dependencies

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    }, []);

    const gesture = Gesture.Pan()
      .enabled(!minting)
      .onUpdate((e) => {
        if (e.translationY < 0) return;
        translateY.value = e.translationY;
      })
      .onEnd((e) => {
        if (e.velocityY > 500) {
          translateY.value = withTiming(200);
        } else {
          translateY.value = withTiming(0);
        }
      });
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[animatedStyle, { bottom: insets.bottom }, styles.wrapper]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default StatusWrapper;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 20,
    right: 20,
    height: 60,

    borderRadius: 20,
    borderCurve: "continuous",
    overflow: "hidden",
    zIndex: 1000,
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
});
