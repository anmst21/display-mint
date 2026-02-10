import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Copy, BaseCoin, ChevModal, ChevRight } from "../icon";
import * as Haptics from "expo-haptics";
import ModalCloseBar from "../modal/modal-close-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import moment from "moment";

import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import ContractBtn from "../modal/contract-btn";

interface CollectionModalProps {
  modalState: boolean;
  viewWidth: number;
  setLargeModalVisible: (value: boolean) => void;
}

const CollectionModal: React.FC<CollectionModalProps> = ({
  modalState,
  viewWidth,
  setLargeModalVisible,
}) => {
  const modalHeight = useSharedValue(60);
  const modalWidth = useSharedValue(90);
  const modalBorderRadius = useSharedValue(13);
  const modalRight = useSharedValue(0);
  const modalBottom = useSharedValue(0);
  const modalColor = useSharedValue("rgba(0, 0, 0, 0)");
  const modalOpacity = useSharedValue(0);
  const scrollOpacity = useSharedValue(0);
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
      // opacity: modalOpacity.value,
    };
  });

  const useHaptic = async () =>
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

  const makeInvisible = useCallback(() => {
    setLargeModalVisible(false);
  }, []);

  useEffect(() => {
    if (!modalState) {
      useHaptic();
      modalHeight.value = withTiming(
        60,
        {
          duration: 200,
        },
        () => {
          runOnJS(makeInvisible)();
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
        duration: 50,
      });
    } else {
      useHaptic();

      modalHeight.value = withTiming(270, {
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
      scrollOpacity.value = withDelay(
        150,
        withTiming(1, {
          duration: 300,
        })
      );
    }
  }, [modalState]);

  const scrollOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollOpacity.value,
    };
  });

  return (
    <Animated.View style={[animatedStyles, styles.modalContainer]}>
      <Animated.View style={[scrollOpacityStyle, styles.opacityContainer]}>
        <ModalCloseBar />
        <View style={styles.profileContainer}>
          <View style={styles.pfpPlaceholder} />
          <View>
            <Text style={styles.name}>RBW Club</Text>
            <Text style={styles.userName}>@rv666.eth</Text>
          </View>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>
            https://www.oracl3.net/swap?toChainId=8453&toCoinAddress=0x5B5dee44552546ECEA05EDeA01DCD7Be7aa6144A
          </Text>
        </View>
        <ContractBtn callback={() => {}} farcaster />
      </Animated.View>
    </Animated.View>
  );
};

export default CollectionModal;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
  },
  opacityContainer: { flex: 1 },
  modalContainer: {
    overflow: "hidden",
    position: "absolute",
    borderCurve: "continuous",
    zIndex: 1,
    padding: 25,
    paddingTop: 0,
  },
  bioContainer: { marginTop: 20 },
  pfpPlaceholder: {
    width: 36,
    height: 36,
    backgroundColor: "grey",
    borderRadius: 1000,
  },
  name: {
    color: "#FFF8E7",
    fontSize: 17,
    fontFamily: "SFPro-ExpandedBold",
  },
  userName: {
    color: "#93918E",
    fontSize: 17,
    fontFamily: "SFPro-Medium",
  },
  bioText: {
    color: "#FFCC00",
    fontSize: 13,
    fontFamily: "SFPro-RegularItalic",
  },
});
