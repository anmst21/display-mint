import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Copy, BaseCoin } from "../icon";
import { center } from "@shopify/react-native-skia";
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
import { useEffect, useCallback } from "react";
import * as Clipboard from "expo-clipboard";
import { useEmbeddedWallet } from "@privy-io/expo";
import ContractBtn from "../modal/contract-btn";

interface WalletCardModalProps {
  modalState: boolean;
  viewWidth: number;
  setLargeModalVisible: (value: boolean) => void;
}

const WalletCardModal: React.FC<WalletCardModalProps> = ({
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

  const makeInvisible = useCallback(() => {
    setLargeModalVisible(false);
  }, []);

  const useHaptic = async () =>
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

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

      modalHeight.value = withTiming(600, {
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
  const wallet = useEmbeddedWallet();

  const setAddressToClipboard = async () => {
    if (wallet?.account?.address) {
      await Clipboard.setStringAsync(wallet.account.address);
    }
  };

  const scrollOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollOpacity.value,
    };
  });

  return (
    <Animated.View style={[animatedStyles, styles.animatedContainer]}>
      <Animated.View style={[scrollOpacityStyle, styles.opacityContainer]}>
        <ModalCloseBar />
        <Text style={styles.receiveText}>Recieve</Text>
        {/* <BaseEth /> */}
        <View style={styles.networkContainer}>
          <BaseCoin />
          <Text style={styles.textNetwork}>
            ETH <Text style={styles.textWhite}>on</Text> Base Network
          </Text>
        </View>
        <View style={styles.addressCard}>
          <Text style={styles.addressHeader}>Embedded Wallet Address</Text>
          <Text style={styles.addressText}>{wallet?.account?.address}</Text>
          <TouchableOpacity
            onPress={setAddressToClipboard}
            style={styles.copyBtn}
          >
            <Text style={styles.copyText}>Copy</Text>
            <Copy />
          </TouchableOpacity>
        </View>
        <Text style={styles.bottomText}>
          Send only ETH on the Base Network to this address. Sending from other
          networks may result in loss funds.
        </Text>
        <ContractBtn recieve />
      </Animated.View>
    </Animated.View>
  );
};

export default WalletCardModal;

const styles = StyleSheet.create({
  animatedContainer: {
    overflow: "hidden",
    position: "absolute",
    borderCurve: "continuous",
    zIndex: 1,
    padding: 25,
    paddingTop: 0,
  },
  opacityContainer: { flex: 1 },
  receiveText: {
    width: "100%",
    textAlign: "center",
    paddingTop: 35,
    paddingBottom: 40,
    fontSize: 17,
    fontFamily: "SFPro-ExpandedSemibold",
    color: "white",
  },
  networkContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginBottom: 20,
    justifyContent: "center",
  },
  textNetwork: {
    fontSize: 13,
    color: "white",
    fontFamily: "SFPro-Medium",
  },
  textWhite: { color: "rgba(142, 142, 147, 1)" },
  addressCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    width: "100%",
    padding: 25,
    paddingBottom: 21,
    gap: 15,
    borderRadius: 20,
    borderCurve: "continuous",
  },
  addressHeader: {
    color: "rgba(142, 142, 147, 1)",
    fontSize: 13,
    fontFamily: "SFPro-SemiboldItalic",
  },
  addressText: {
    color: "white",
    fontSize: 27,
    fontFamily: "SFPro-Medium",
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(242, 242, 247, 0.2)",
    marginRight: "auto",
    height: 50,
    width: 100,
    borderRadius: 13,
    borderCurve: "continuous",
    gap: 5,
  },
  copyText: { color: "white", fontFamily: "SFPro-ExpandedSemibold" },
  bottomText: {
    marginBottom: 15,
    color: "#8E8E93",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 22,
    marginTop: 20,
  },
});
