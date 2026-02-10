import { View, StyleSheet } from "react-native";
import ConnectButton from "@/components/connect-button";
import OnboardingText from "@/components/onboarding/text";
import { Redirect } from "expo-router";
import {
  useEmbeddedWallet,
  isCreating,
  isNotCreated,
  isConnected,
} from "@privy-io/expo";

export default function Page() {
  const wallet = useEmbeddedWallet();
  //   console.log("wallet.status", wallet.status, isConnected(wallet));
  return (
    <View style={styles.container}>
      {!isNotCreated(wallet) && <Redirect href={"/swipe"} />}
      <ConnectButton
        isLoading={isCreating(wallet)}
        sign
        create
        callback={async () => await wallet.create({ recoveryMethod: "privy" })}
      />

      <OnboardingText
        textHeader="Create Wallet"
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
