import { View, StyleSheet, Text, Button } from "react-native";
import { useMemo } from "react";
import { storage } from "@/context/storage";
import ConnectButton from "@/components/connect-button";
import OnboardingText from "@/components/onboarding/text";
import { usePersonalSignature } from "@/hooks/usePersonalSignature";
import { Redirect, router } from "expo-router";
import {
  useEmbeddedWallet,
  isConnected,
  isNotCreated,
  usePrivy,
} from "@privy-io/expo";
import { useState, useEffect } from "react";

export default function Page() {
  const cachedAddress = useMemo(() => storage.getString("address"), []);
  const cachedToken = useMemo(() => storage.getString("accessToken"), []);
  const wallet = useEmbeddedWallet();
  const { user } = usePrivy();

  const { isLoading, signMessageHandler, showLogs } =
    usePersonalSignature(cachedAddress);

  console.log(
    "isConnected(wallet)",
    isConnected(wallet),
    isNotCreated(wallet),
    user
  );

  const [accessToken, setAccessToken] = useState(cachedToken);

  useEffect(() => {
    // Add listener for storage changes
    const listener = storage.addOnValueChangedListener((key) => {
      if (key === "accessToken") {
        const newValue = storage.getString("accessToken");
        setAccessToken(newValue);
      }
    });

    // Cleanup the listener on component unmount
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {user && accessToken && !isNotCreated(wallet) && (
        <Redirect href={"/swipe"} />
      )}

      {user && isNotCreated(wallet) && accessToken && (
        <Redirect href={"/login/create-wallet"} />
      )}

      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          top: 100,
          left: 0,
          zIndex: 1000,
          right: 0,
        }}
      >
        <Button
          onPress={() => router.push("/login/connect-wallet")}
          title="Show Logs"
        />
        {/* <Button
          onPress={() => router.push("/login/create-wallet")}
          title="Go to create"
        />
        <Button
          onPress={async () =>
            await Clipboard.setStringAsync(JSON.stringify(showLogs))
          }
          title="Copy Log"
        /> */}
        <Text
          style={{
            color: "black",
          }}
        >
          {showLogs ? JSON.stringify(showLogs) : "Logs will appear here"}
        </Text>
      </View>

      <ConnectButton isLoading={isLoading} sign callback={signMessageHandler} />

      <OnboardingText
        textHeader="Personal Signature"
        textHero="For your security, we need your signature. This ensures that you are in control of your assets and can interact with the app securely."
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

//connect wallet
