import { View, Text, Button } from "react-native";
import { Linking } from "react-native";
import ConnectButton from "@/components/connect-button";
import OnboardingText from "@/components/onboarding/text";
import { useIsWalletInstalled } from "@/hooks/useIsWalletInstalled";
import { Redirect, router } from "expo-router";
import useResetConnection from "@/hooks/useResetConnection";
import { storage } from "@/context/storage";
import { useUnlinkWallet, usePrivy } from "@privy-io/expo";
import { useMemo } from "react";

const appStoreURL =
  "https://apps.apple.com/app/coinbase-wallet-store/id1278383455";

const LogItem = () => {
  return <View></View>;
};

export default function Page() {
  const resetConnection = useResetConnection();
  const { unlinkWallet } = useUnlinkWallet();
  const cachedAddress = useMemo(() => storage.getString("address"), []);
  const { user, isReady, logout } = usePrivy();

  const unlink = async () => {
    await unlinkWallet({ address: cachedAddress as string });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <View
        style={{
          backgroundColor: "white",
          left: 50,
          right: 50,
          top: 100,
          bottom: 100,
          position: "absolute",
        }}
      >
        <Button title="Back" onPress={() => router.back()} />
        <Button title="Disconnect" onPress={resetConnection} />
        <Button title="Unlink" onPress={unlink} />
        <Text>{JSON.stringify(user)}</Text>
      </View>
    </View>
  );
}

//connect wallet
