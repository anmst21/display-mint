import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ConnectButton from "@/components/connect-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef, useState, useCallback } from "react";
import { StatusType } from "@/components/onboarding/types";
import Animated, { useSharedValue } from "react-native-reanimated";
import { useAnimatedShake } from "@/hooks/useAnimatedShake";
import { router } from "expo-router";
import { ExploreBack } from "@/components/icon";
import { VerificationCode } from "@/components/onboarding/otp";
import api from "@/context/api";
import { storage } from "@/context/storage";

export default function Page() {
  const insets = useSafeAreaInsets();
  const invisibleTextInputRef = useRef<TextInput>(null);
  const [code, setCode] = useState<number[]>([]);
  const verificationStatus = useSharedValue<StatusType>("inProgress");
  const { shake, rShakeStyle } = useAnimatedShake();

  const maxCodeLength = 5;
  const correctCode = 55555;

  const resetCode = useCallback(() => {
    setTimeout(() => {
      verificationStatus.value = "inProgress";
      setCode([]);
      invisibleTextInputRef.current?.clear();
    }, 1000);
  }, [verificationStatus]);

  const onCorrectCode = async () => {
    try {
      const {
        data: { accessToken, refreshToken, userId },
      } = await api.post("/auth/login", {
        authId: process.env.EXPO_PUBLIC_TEST_AUTH_ID,
        signature: process.env.EXPO_PUBLIC_TEST_SIGNATURE,
      });

      if (!accessToken || !refreshToken || !userId) {
        console.error(accessToken, refreshToken, userId);
      }

      storage.set("accessToken", accessToken);
      storage.set("refreshToken", refreshToken);
      storage.set("userId", userId);
      storage.set("testing", "true");

      router.replace("/swipe");
      console.warn("success!", accessToken, refreshToken, userId);
    } catch (err: any) {
      console.error("Error logging in with OTP:", err.message);
    }
  };
  const onWrongCode = () => {};

  // Handler for wrong code entry
  const onWrongCodeWrapper = useCallback(() => {
    verificationStatus.value = "wrong";
    // Trigger the shake animation
    shake();
    resetCode();
    onWrongCode?.();
  }, [onWrongCode, resetCode, shake, verificationStatus]);

  // Handler for correct code entry
  const onCorrectCodeWrapper = useCallback(() => {
    verificationStatus.value = "correct";
    resetCode();
    onCorrectCode?.();
  }, [onCorrectCode, resetCode, verificationStatus]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <View style={styles.textContainer}>
            <Text style={styles.textOtp}>Enter Otp</Text>
            <Text style={styles.textDisclaimer}>
              You can find code in TestFlight description
            </Text>
          </View>
          <View style={styles.otpSection}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <ExploreBack />
            </TouchableOpacity>
            <Animated.View style={[styles.codeContainer, rShakeStyle]}>
              <VerificationCode
                status={verificationStatus}
                code={code}
                maxLength={maxCodeLength}
              />
            </Animated.View>
          </View>
        </View>
      </View>
      {/* <ConnectButton isLoading={false} sign callback={() => {}} /> */}
      <TextInput
        keyboardAppearance="dark"
        ref={invisibleTextInputRef}
        onChangeText={(text) => {
          const newCode = text.split("").map((item) => +item);
          // If the code is longer than the correct code, we don't want to update it
          if (newCode.length > maxCodeLength) {
            return;
          }
          setCode(newCode);

          // If the code is correct, we want to trigger the onCorrectCode callback
          if (newCode.join("") === correctCode.toString()) {
            onCorrectCodeWrapper();
            return;
          }
          // If the code is wrong, we want to trigger the onWrongCode callback
          if (newCode.length === maxCodeLength) {
            onWrongCodeWrapper();
            return;
          }
          // If the code is still in progress, we want to reset the verification status
          verificationStatus.value = "inProgress";
        }}
        keyboardType="number-pad"
        autoFocus
        style={styles.invisibleInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    width: 70,
    borderRadius: 11,
    borderCurve: "continuous",
    backgroundColor: "rgba(137, 136, 136, 0.2)",
    // flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  otpSection: {
    gap: 10,
    width: "100%",
    height: 50,
    //flex: 1,
    flexDirection: "row",
    //  backgroundColor: "blue",
  },
  textDisclaimer: {
    color: "rgba(147, 145, 142, 1)",
    fontSize: 13,
    fontFamily: "SFPro-SemiboldItalic",
  },
  textOtp: {
    color: "rgba(255, 248, 231, 1)",
    fontSize: 27,
    fontFamily: "SFPro-Bold",
  },
  invisibleInput: {
    position: "absolute",
    bottom: -50,
  },
  codeContainer: {
    flex: 1,
  },
  textContainer: {
    gap: 5,
  },
  otpBox: {
    width: "100%",
    borderRadius: 20,
    borderCurve: "continuous",
    backgroundColor: "rgba(34, 37, 47, 0.4)",
    paddingHorizontal: 22,
    paddingVertical: 25,
    gap: 15,
  },
  otpContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 44,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "black",
    paddingBottom: 158,
  },
});
