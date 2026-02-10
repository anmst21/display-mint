import { View, StyleSheet } from "react-native";
import ConnectButton from "@/components/connect-button";
import OnboardingText from "@/components/onboarding/text";
import { router } from "expo-router";
import { useCallback } from "react";
import { provider } from "../_layout";
import { storage } from "@/context/storage";

export default function Page() {
  const connectWallet = useCallback(async () => {
    try {
      const accounts: any = await provider.request({
        method: "eth_requestAccounts",
        params: [],
      });
      storage.set("address", accounts[0]);
      router.replace("/login/sign-signature");
    } catch (e: any) {
      console.error(e.message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ConnectButton
        otp
        callback={() => router.push("/login/login-otp")}
        text={["Connect with", "OTP"]}
      />
      <ConnectButton callback={connectWallet} text={["Connect", "CBW"]} />

      <OnboardingText
        textHeader="Connect Wallet"
        textHero="Now that you have the Coinbase Wallet, let’s connect it to start minting NFTs. This will allow you to explore, mint, and manage your assets with ease."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // backgroundColor: "transparent",

    //  flexDirection: "row",
    //  backgroundColor: "red",
  },
});
//connect wallet
