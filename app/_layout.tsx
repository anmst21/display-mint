import { Stack, router, usePathname } from "expo-router";
import { PrivyProvider, Chain } from "@privy-io/expo";
import { base, mainnet } from "viem/chains";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useMemo, useContext } from "react";
import { useFonts } from "expo-font";
import { EventProvider } from "react-native-outside-press";
import { Provider, Context } from "@/context/FeedContext";
import { StatusBar } from "expo-status-bar";
import { createClient } from "@reservoir0x/reservoir-sdk";
import { CollectionProvider } from "@/context/CollectionContext";
import {
  configure,
  WalletMobileSDKEVMProvider,
} from "@coinbase/wallet-mobile-sdk";
import { ExploreProvider } from "@/context/ExploreContext";
import { StyleSheet, View } from "react-native";
import * as Notifications from "expo-notifications";
import * as Sentry from "@sentry/react-native";
import { usePrivy } from "@privy-io/expo";
import * as SplashScreen from "expo-splash-screen";
import { useIsWalletInstalled } from "@/hooks/useIsWalletInstalled";

SplashScreen.preventAutoHideAsync();
// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

createClient({
  chains: [
    {
      id: 8453,
      baseApiUrl: "https://api-base.reservoir.tools",
      name: "base",
      active: true,
      marketplaceFees: ["0xEaCee08921a94c45b3BfAB6493D372a394e29371:100"],
    },
  ],
  source: "h3llcat.app",
});
export const provider = new WalletMobileSDKEVMProvider({ chainId: 8453 });
// export const storage = new MMKV();

configure({
  hostURL: new URL("https://wallet.coinbase.com/wsegue"),
  callbackURL: new URL("h3llcat:///login"),
  hostPackageName: "org.toshi",
});

// Sentry.init({
//   dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
//   debug: true,
//   tracesSampleRate: 1.0,
//   profilesSampleRate: 1.0,
//   _experiments: {
//     replaysSessionSampleRate: 1.0,
//     replaysOnErrorSampleRate: 1.0,
//   },
//   integrations: [
//     Sentry.reactNativeTracingIntegration(),
//     Sentry.mobileReplayIntegration(),
//   ],
// });

function AppLayout() {
  const { isReady } = usePrivy();

  const [loadedSfPro, errorSfPro] = useFonts({
    "SF-Pro": require("../assets/fonts/SFPro.ttf"),
    "SFPro-RegularItalic": require("../assets/fonts/SFPro-RegularItalic.ttf"),
    "SFPro-Bold": require("../assets/fonts/SFPro-Bold.ttf"),
    "SFPro-Semibold": require("../assets/fonts/SFPro-Semibold.ttf"),
    "SFPro-BoldItalic": require("../assets/fonts/SFPro-BoldItalic.ttf"),
    "SFPro-SemiboldItalic": require("../assets/fonts/SFPro-SemiboldItalic.ttf"),
    "SFPro-ExpandedBold": require("../assets/fonts/SFPro-ExpandedBold.ttf"),
    "SFPro-ExpandedRegular": require("../assets/fonts/SFPro-ExpandedRegular.ttf"),
    "SFPro-Medium": require("../assets/fonts/SFPro-Medium.ttf"),
    "SFPro-ExpandedMedium": require("../assets/fonts/SFPro-ExpandedMedium.ttf"),
    "SFPro-ExpandedSemibold": require("../assets/fonts/SFPro-ExpandedSemibold.ttf"),
  });

  // useEffect(() => {
  //   if (loadedSfPro || errorSfPro) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loadedSfPro, errorSfPro]);
  // !!!! dont delete
  if (!loadedSfPro && !errorSfPro && !isReady) {
    return null;
  }

  return (
    <PrivyProvider
      clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID!}
      appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!}
      supportedChains={[base, mainnet]}
    >
      <Provider>
        <ExploreProvider>
          <CollectionProvider>
            <EventProvider>
              <GestureHandlerRootView style={styles.container}>
                <View style={{ flex: 1, backgroundColor: "#FFCC00" }}>
                  <Stack
                    initialRouteName="index"
                    screenOptions={{
                      gestureDirection: "horizontal",
                      animation: "fade",
                    }}
                  >
                    <Stack.Screen
                      name="index"
                      options={{
                        presentation: "transparentModal",
                        contentStyle: { backgroundColor: "transparent" },
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="login"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(app)"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                </View>
              </GestureHandlerRootView>
            </EventProvider>
          </CollectionProvider>
        </ExploreProvider>
      </Provider>
    </PrivyProvider>
  );
}
export default AppLayout;

// export default Sentry.wrap(AppLayout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    position: "relative",
  },
});
