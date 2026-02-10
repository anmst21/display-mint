import { View, StyleSheet } from "react-native";
import { storage } from "@/context/storage";
import { Image } from "expo-image";
import { Redirect, useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import { useIsWalletInstalled } from "@/hooks/useIsWalletInstalled";
import { LoadingMain } from "@/components/icon";
import { usePrivy } from "@privy-io/expo";
import * as SplashScreen from "expo-splash-screen";

const LoginPage = () => {
  const { loading, isWalletInstalled } = useIsWalletInstalled();

  const cachedAddress = useCallback(() => storage.getString("address"), [])();
  // const refreshToken = useMemo(() => storage.getString("refreshToken"), []);
  const accessToken = useMemo(() => storage.getString("accessToken"), []);
  const testing = useMemo(() => storage.getString("testing"), []);
  // console.log("accessToken", accessToken, typeof testing);

  if (testing) {
    return <Redirect href={"/swipe"} />;
  }

  if (accessToken && cachedAddress && isWalletInstalled) {
    return <Redirect href={"/swipe"} />;
  }
  if (!loading && !isWalletInstalled && !cachedAddress && !accessToken) {
    return <Redirect href={"/login/install-coinbase"} />;
  }
  if (!cachedAddress && isWalletInstalled && !accessToken) {
    return <Redirect href={"/login/connect-wallet"} />;
  }
  if (!accessToken && cachedAddress && isWalletInstalled) {
    return <Redirect href={"/login/sign-signature"} />;
  }

  // const bg = require("../assets/images/splash.png");
  // return (
  //   <View style={styles.container}>
  //     {/* {  (
  //       <View style={styles.loading}>
  //         <LoadingMain />
  //       </View>
  //     )} */}
  //     <Image source={bg} style={StyleSheet.absoluteFill} />
  //     {!isWalletInstalled && !cachedAddress && !refreshToken && (
  //       <Redirect href={"/login/install-coinbase"} />
  //     )}
  //     {!cachedAddress && isWalletInstalled && !refreshToken && (
  //       <Redirect href={"/login/connect-wallet"} />
  //     )}
  //     {!refreshToken && cachedAddress && isWalletInstalled && (
  //       <Redirect href={"/login/sign-signature"} />
  //     )}

  //     {refreshToken && cachedAddress && isWalletInstalled && (
  //       <Redirect href={"/swipe"} />
  //     )}
  //     {/* {testing && <Redirect href={"/swipe"} />} */}
  //   </View>
  // );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative", backgroundColor: "black" },
  loading: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    zIndex: 100,
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
