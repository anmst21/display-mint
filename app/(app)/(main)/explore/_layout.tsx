import { Stack, Tabs } from "expo-router";

import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

import HeaderBadge from "@/components/explore/header-badge";
import { useContext } from "react";
import { ExploreContext } from "@/context/ExploreContext";
import { usePathname } from "expo-router";

export default function AppLayout() {
  const {
    state: { activeNft, exploreFeedState, isHudOpen },
  } = useContext(ExploreContext);

  const pathname = usePathname();
  return (
    <View style={styles.container}>
      <HeaderBadge
        isHudOpen={isHudOpen}
        category={
          pathname === "/explore" || !activeNft
            ? exploreFeedState
            : activeNft.category
        }
      />
      <Stack
        initialRouteName="index"
        screenOptions={
          {
            //  presentation: "card",
            // gestureDirection: "horizontal",
            //    presentation: "transparentModal",
            // contentStyle: { backgroundColor: "#40404040" },
          }
        }
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="[nft]"
          options={{
            //   presentation: "transparentModal",
            headerShown: false,
            animation: "fade",
            animationDuration: 400,
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative", backgroundColor: "black" },
});
