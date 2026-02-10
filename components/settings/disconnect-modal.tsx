import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useState, useCallback, useEffect, useContext } from "react";
import { Xbutton, DragX, ArrowSlider } from "@/components/icon";
import api from "@/context/api";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import ModalCloseBar from "../modal/modal-close-bar";
import SwitchSection from "./switch-section";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Context } from "@/context/FeedContext";
const { height: screenHeight } = Dimensions.get("window");
import OutsidePressHandler from "react-native-outside-press";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import useResetConnection from "@/hooks/useResetConnection";
import { storage } from "@/context/storage";

interface DisconnectModalProps {
  setIsModalVisible: (value: boolean) => void;
}

const DisconnectModal: React.FC<DisconnectModalProps> = ({
  setIsModalVisible,
}) => {
  const insets = useSafeAreaInsets();
  const {
    state: { isDisconnectOpen },
    setDisconnectOpen,
  } = useContext(Context);
  const [isEnabled, setIsEnabled] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [containerHeight, setContainerHeight] = useState(0);
  const offset = useSharedValue(0);

  const useHaptics = async () =>
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

  useEffect(() => {
    if (isDisconnectOpen) {
      useHaptics();
    }
  }, [isDisconnectOpen]);
  const onClose = useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setDisconnectOpen(false);
  }, []);

  const onAnimationEnd = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const { containerAnimatedStyle, containerPan } = useBottomSheet({
    onAnimationEnd,
    onClose,
    isOpen: isDisconnectOpen,
    screenHeight: screenHeight / 2,
    containerHeight,
  });

  const onDisconnect = async () => {
    if (isEnabled) {
      await api.delete("/privacy/personal-data");
    }
    storage.delete("testing");

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setDisconnectOpen(false);
    resetConnection();
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });
  const widthIcon = 68;

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = Math.max(
        0,
        Math.min(e.translationX, dimensions.width - widthIcon - 8)
      );
    })
    .onEnd(() => {
      if (offset.value < dimensions.width) {
        offset.value = withTiming(0);
      }
      if (offset.value >= dimensions.width - widthIcon - 8) {
        offset.value = withTiming(dimensions.width + 500);
        runOnJS(onDisconnect)();
      }
    });

  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height); // Save the height
  };

  const resetConnection = useResetConnection();

  return (
    <OutsidePressHandler
      style={styles.onTop}
      disabled={!isDisconnectOpen}
      onOutsidePress={onClose}
    >
      <GestureDetector gesture={containerPan}>
        <Animated.View
          onLayout={handleLayout}
          style={[
            containerAnimatedStyle,
            styles.modalContainer,
            { bottom: insets.bottom },
          ]}
        >
          <ModalCloseBar />
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Disconnect</Text>
          </View>
          <View style={styles.switchSectionWrapper}>
            <SwitchSection
              grey
              title="Delete my personal data"
              switchPosition={isEnabled}
              setSwitchPosition={setIsEnabled}
            />
          </View>
          <View
            style={styles.dragContainer}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setDimensions({ width, height });
            }}
          >
            <View style={styles.absoluteBg} />
            <GestureDetector gesture={pan}>
              <Animated.View style={[styles.xBtnContainer, animatedStyles]}>
                <DragX />
              </Animated.View>
            </GestureDetector>
            <Text
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setTextWidth(width);
              }}
              style={[
                styles.slideText,
                {
                  transform: [{ translateX: -textWidth / 2 }],
                },
              ]}
            >
              Slide to disconnect
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </OutsidePressHandler>
  );
};

const styles = StyleSheet.create({
  absoluteBg: {
    backgroundColor: "rgba(137, 136, 136, 0.2)",
    borderRadius: 13,
    borderCurve: "continuous",
    position: "absolute",
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
  switchSectionWrapper: { width: "100%", marginBottom: 20 },
  header: {
    fontFamily: "SFPro-ExpandedSemibold",
    fontSize: 22,
    color: "white",
  },
  onTop: { zIndex: 1000 },
  slideText: {
    fontFamily: "SFPro-Semibold",
    fontSize: 20,
    color: "rgba(142, 142, 147, 1)",
    position: "absolute",
    left: "55%",
  },
  modalContainer: {
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "rgba(28, 28, 29, 1)",
    borderRadius: 25,
    borderCurve: "continuous",
    zIndex: 100,
    paddingBottom: 25,
    left: 20,
    right: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginBottom: 40,
  },

  closeBtn: {
    borderRadius: 100,
    backgroundColor: "rgba(60, 60, 67, 0.40)",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1C1C1D",
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  dragContainer: {
    backgroundColor: "rgba(60, 60, 67, 0.6)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 17,
    borderCurve: "continuous",
    position: "relative",
    padding: 4,
    overflow: "hidden",
    width: "100%",
  },
  xBtnContainer: {
    zIndex: 10,
    width: 68,
    height: 68,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    borderCurve: "continuous",
  },
});

export default DisconnectModal;
