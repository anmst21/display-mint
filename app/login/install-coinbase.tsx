import { View, StyleSheet } from "react-native";
import { Linking } from "react-native";
import ConnectButton from "@/components/connect-button";
import OnboardingText from "@/components/onboarding/text";
import { useIsWalletInstalled } from "@/hooks/useIsWalletInstalled";
import { Redirect, router } from "expo-router";

const appStoreURL =
  "https://apps.apple.com/app/coinbase-wallet-store/id1278383455";

export default function Page() {
  const { loading, isWalletInstalled } = useIsWalletInstalled();

  return (
    <View style={styles.container}>
      {isWalletInstalled && <Redirect href={"/login/connect-wallet"} />}
      <ConnectButton
        otp
        callback={() => router.push("/login/login-otp")}
        text={["Connect with", "OTP"]}
      />
      <ConnectButton
        callback={async () => {
          await Linking.openURL(appStoreURL);
        }}
        text={["Download", "CBW", "App"]}
      />
      <OnboardingText
        textHeader="Download Wallet"
        textHero="To get started, you’ll need the Coinbase Wallet app. With it, you can securely store, mint, and manage your digital assets. Download the wallet now to proceed."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "transparent",
  },
});

//connect walletxq
