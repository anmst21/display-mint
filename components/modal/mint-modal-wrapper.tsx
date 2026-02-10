import OutsidePressHandler from "react-native-outside-press";
import {
  Dimensions,
  StyleSheet,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  useAnimatedRef,
  scrollTo,
  runOnJS,
  useScrollViewOffset,
  useAnimatedReaction,
} from "react-native-reanimated";
import { useEffect, useState, useMemo, useCallback } from "react";
import * as Haptics from "expo-haptics";
import { recordAction, ActionType } from "@/context/actions";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MintModal from "./mint-modal";
import { ScreenPosition, MintToOptions, PaymentMethod } from "./types";
import MintToModal from "./mint-to-modal";
import { storage } from "@/context/storage";
import { Address } from "viem";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface MintModalWrapperProps {
  activeNft: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsExploreFeedVisible: (value: boolean) => void;
}

const MintModalWrapper: React.FC<MintModalWrapperProps> = ({
  activeNft,
  isOpen,
  setIsOpen,
  setIsExploreFeedVisible,
}) => {
  const mintTo = useMemo(() => storage.getString("mintTo"), []);
  const payWith = useMemo(() => storage.getString("payWith"), []);
  console.log("payWith", payWith);

  const [mintToOption, setMintToOption] = useState<MintToOptions>(
    mintTo as MintToOptions
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    payWith as PaymentMethod
  );

  const [height, setHeight] = useState<number>(0);
  const [secondModalHeight, setSecondModalHeight] = useState(0);
  console.log("height", height);
  const { id } = activeNft;

  const [page, setPage] = useState<ScreenPosition>(ScreenPosition.recieve);
  const insets = useSafeAreaInsets();
  const useHaptics = async () =>
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

  useEffect(() => {
    isOpen && useHaptics();
  }, [isOpen]);

  const onClose = useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setIsOpen(false);
  }, []);
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  const scroll = useSharedValue<number>(0);

  useEffect(() => {
    if (page === ScreenPosition.payment || page === ScreenPosition.recieve) {
      animatedRef.current?.scrollTo({
        x: screenWidth - 25,
        animated: true,
      });
    }
  }, [page]);

  useAnimatedReaction(
    () => {
      return scrollOffset;
    },
    (currentValue, previousValue) => {
      if (currentValue.value === 0) {
        runOnJS(setPage)(ScreenPosition.initial);
      }
    }
  );
  useDerivedValue(() => {
    console.log(scroll.value);
    scrollTo(animatedRef, scroll.value, 0, true);
  });

  const onAnimationEnd = useCallback(() => {
    setIsExploreFeedVisible(false);

    if (page !== ScreenPosition.initial) {
      setPage(ScreenPosition.initial);
    }
  }, []);

  const { containerAnimatedStyle, containerPan } = useBottomSheet({
    onAnimationEnd,
    onClose,
    isOpen,
    screenHeight,
    containerHeight:
      page === ScreenPosition.initial ? height : secondModalHeight,
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height: modalHeight } = event.nativeEvent.layout;
    if (height === 0) {
      setHeight(modalHeight); // Set the height into state
    }
  };

  const onPressOutside = useCallback(async () => {
    setIsOpen(false);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    await recordAction({
      actionType: ActionType.MintModalClose,
      postId: id,
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-210}
        style={styles.modalOnTop}
        behavior="position"
      >
        <OutsidePressHandler disabled={!isOpen} onOutsidePress={onPressOutside}>
          <GestureDetector gesture={containerPan}>
            <Animated.ScrollView
              onLayout={handleLayout}
              ref={animatedRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEnabled={page === ScreenPosition.initial ? false : true}
              contentContainerStyle={[
                styles.scrollContentContainer,
                { paddingBottom: insets.bottom },
              ]}
              style={[
                containerAnimatedStyle,
                styles.scrollView,
                {
                  height:
                    page !== ScreenPosition.initial && secondModalHeight > 0
                      ? secondModalHeight + insets.bottom
                      : "auto",
                },
              ]}
            >
              <MintModal
                paymentMethod={paymentMethod}
                mintTo={mintToOption}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                activeNft={activeNft}
                width={screenWidth - 50}
                page={page}
                setPage={setPage}
              />
              <MintToModal
                mintToOption={mintToOption}
                setMintToOption={setMintToOption}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setHeight={setSecondModalHeight}
                animatedRef={animatedRef}
                page={page}
              />
            </Animated.ScrollView>
          </GestureDetector>
        </OutsidePressHandler>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    overflow: "visible",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10000,
    bottom: 0,
  },
  scrollContentContainer: {
    paddingHorizontal: 25,
    gap: 25,
    alignItems: "flex-end",
  },
  modalOnTop: { zIndex: 100 },
});

export default MintModalWrapper;
