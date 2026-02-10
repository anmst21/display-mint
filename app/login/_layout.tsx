import { Stack, useFocusEffect } from "expo-router";

import { View, StyleSheet } from "react-native";
import OnboardingBackground from "@/components/onboarding/background";
import { Linking } from "react-native";
import { useEffect, useCallback } from "react";
import { handleResponse } from "@coinbase/wallet-mobile-sdk";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
  useEffect(function setupDeeplinkHandling() {
    // Pass incoming deeplinks into Mobile SDK
    const subscription = Linking.addEventListener("url", ({ url }) => {
      console.log("-- handleResponse --", url);
      handleResponse(url as any);
    });

    return function cleanup() {
      subscription.remove();
    };
  }, []);

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View onLayout={hideSplash} style={styles.container}>
      <OnboardingBackground />

      <Stack
        //    initialRouteName="index"
        screenOptions={{
          //  presentation: "card",
          // gestureDirection: "horizontal",
          animation: "fade",
          animationDuration: 400,
          headerShown: false,
          //   presentation: "transparentModal",

          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen
          name="install-coinbase"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="connect-wallet" options={{ headerShown: false }} />
        <Stack.Screen name="sign-signature" options={{ headerShown: false }} />
        <Stack.Screen name="logs" options={{ headerShown: false }} />
        <Stack.Screen
          name="login-otp"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        {/* <Stack.Screen
          name="nft"
          options={{
            //   presentation: "transparentModal",
            headerShown: false,
            gestureEnabled: false,
          }}
        /> */}
      </Stack>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
