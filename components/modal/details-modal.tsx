import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import DetailsItem from "./details-item";
import { ModalContract } from "../icon";
import { center } from "@shopify/react-native-skia";
import * as Haptics from "expo-haptics";
import { ModalState } from "../navigation/types";
import LargeModalDetails from "./large-modal-details";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import { useEffect, useContext } from "react";
import SmallModalDetails from "./small-modal-details";
import { Context } from "@/context/FeedContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

interface DetailsModalProps {
  viewWidth: number;
  modalState: ModalState;
  activeNft: any;
  setLargeModalVisible: any;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const DetailsModal: React.FC<DetailsModalProps> = ({
  viewWidth,
  modalState,
  activeNft,
  setLargeModalVisible,
}) => {
  const { contractAddress, tokenId, chain, tokenStandard } = activeNft;
  // const [renderComponent, setRenderComponent] = useState(false);
  const isVisible = useSharedValue<"flex" | "none">("none");

  const items = [
    {
      name: "contract",
      value: contractAddress,
      greyBg: true,
    },
    { name: "hash", value: tokenId, greyBg: false },

    { name: "chain", value: chain, greyBg: true },
    { name: "standard", value: tokenStandard, greyBg: false },
  ];

  const modalHeight = useSharedValue(60);
  const modalWidth = useSharedValue(90);
  const modalBorderRadius = useSharedValue(13);
  const modalRight = useSharedValue(0);
  const modalBottom = useSharedValue(0);
  const modalColor = useSharedValue("rgba(0, 0, 0, 0)");
  const modalOpacity = useSharedValue(0);
  const scrollOpacity = useSharedValue(0);
  const scrollDisplay = useSharedValue<"none" | "flex">("none");
  const translateY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: modalColor.value,
      bottom: modalBottom.value,
      right: modalRight.value,
      borderRadius: modalBorderRadius.value,
      width: modalWidth.value,
      height: modalHeight.value,
      transform: [{ translateY: translateY.value }],
      display: isVisible.value,

      // opacity: modalOpacity.value,
    };
  });

  const displayValue = useDerivedValue(() => {
    return isVisible.value;
  });
  const boxOpacity = useAnimatedStyle(() => {
    return {
      opacity: modalOpacity.value,
    };
  });
  const scrollOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollOpacity.value,
      display: scrollDisplay.value,
    };
  });

  const useHaptic = async () =>
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

  useEffect(() => {
    if (modalState === ModalState.initial) {
      useHaptic();

      if (modalHeight.value === 300) {
        modalHeight.value = withTiming(
          50,
          {
            duration: 200,
          },
          () => {
            runOnJS(setLargeModalVisible)(false);
          }
        );
        modalWidth.value = withTiming(90, {
          duration: 200,
        });
        modalBorderRadius.value = withTiming(13, {
          duration: 200,
        });
        modalRight.value = withTiming(0, {
          duration: 200,
        });
        modalBottom.value = withTiming(0, {
          duration: 200,
        });
        modalColor.value = withTiming("rgba(0, 0, 0, 0)", {
          duration: 200,
        });
        modalOpacity.value = withTiming(0, {
          duration: 50,
        });
        scrollOpacity.value = withTiming(0, {
          duration: 200,
        });
      } else {
        translateY.value = withTiming(screenHeight, { duration: 200 }, () => {
          translateY.value = 0;
          modalHeight.value = 60;
          modalWidth.value = 106;
          modalBorderRadius.value = 13;
          modalRight.value = 0;
          modalBottom.value = 0;
          modalColor.value = "rgba(0, 0, 0, 0)";
          modalOpacity.value = 0;
          scrollOpacity.value = 0;
          runOnJS(setLargeModalVisible)(false);
        });
      }
    } else if (modalState === ModalState.small) {
      useHaptic();
      isVisible.value = "flex";
      modalHeight.value = withTiming(300, {
        duration: 200,
      });
      modalWidth.value = withTiming(viewWidth - 50, {
        duration: 200,
      });
      modalBorderRadius.value = withTiming(25, {
        duration: 200,
      });
      modalRight.value = withTiming(-25, {
        duration: 200,
      });
      modalBottom.value = withTiming(-25, {
        duration: 200,
      });
      modalColor.value = withTiming("rgba(28, 28, 29, 1)", {
        duration: 200,
      });
      modalOpacity.value = withDelay(
        100,
        withTiming(1, {
          duration: 300,
        })
      );
    } else if (modalState === ModalState.large) {
      useHaptic();
      scrollDisplay.value = "flex";

      modalHeight.value = withTiming(screenHeight, {
        duration: 200,
      });
      modalWidth.value = withTiming(screenWidth, {
        duration: 200,
      });
      modalRight.value = withTiming(-50, {
        duration: 200,
      });
      modalBottom.value = withTiming(-60, {
        duration: 200,
      });

      modalBorderRadius.value = withTiming(50, {
        duration: 200,
      });

      modalColor.value = withTiming("rgba(28, 28, 29, 1)", {
        duration: 200,
      });
      modalOpacity.value = withTiming(0, {
        duration: 100,
      });
      scrollOpacity.value = withDelay(
        150,
        withTiming(1, {
          duration: 300,
        })
      );
    }
  }, [modalState]);
  const insets = useSafeAreaInsets();

  return (
    <Animated.ScrollView
      scrollEnabled={modalState === ModalState.large}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: modalState === ModalState.large ? insets.top : 0,
      }} // Ensures children fill available space
      style={[
        animatedStyles,
        styles.container,
        // { display: displayValue.value },
      ]}
    >
      <LargeModalDetails
        activeNft={activeNft}
        modalState={modalState}
        scrollOpacity={scrollOpacityStyle}
      />

      <SmallModalDetails boxOpacity={boxOpacity} modalItems={items} />
    </Animated.ScrollView>
  );
};

export default DetailsModal;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "absolute",
    flex: 1,
    borderCurve: "continuous",
    zIndex: 1,
    padding: 25,
  },
});
