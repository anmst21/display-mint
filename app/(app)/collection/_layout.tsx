import { Stack, Tabs, usePathname } from "expo-router";

import { StyleSheet, View } from "react-native";
import HeaderBadge from "@/components/explore/header-badge";
import { CollectionContext } from "@/context/CollectionContext";
import { useContext, useCallback } from "react";
import { SplashScreen } from "expo-router";
import { ExploreContext } from "@/context/ExploreContext";

export default function Layout() {
  const {
    state: { nftItem },
  } = useContext(CollectionContext);

  const {
    state: { isHudOpen },
  } = useContext(ExploreContext);
  const pathname = usePathname();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View onLayout={hideSplash} style={styles.container}>
      <HeaderBadge
        isHudOpen={isHudOpen}
        category={
          pathname.includes("/collection") && !nftItem
            ? "collection"
            : nftItem.category
        }
      />
      <Stack>
        <Stack.Screen
          name="[address]/index"
          options={{
            animation: "slide_from_right",
            headerShown: false,
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="[address]/[nft]/index"
          options={{
            animation: "fade",
            animationDuration: 400,
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="test-notifications"
          options={{ headerShown: false }}
        /> */}
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    position: "relative",
  },
});
