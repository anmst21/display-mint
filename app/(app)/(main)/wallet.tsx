import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import { useMemo, useState, useEffect, useContext } from "react";
import SwitchSection from "@/components/settings/switch-section";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Modalize } from "react-native-modalize";
import * as WebBrowser from "expo-web-browser";
import { storage } from "@/context/storage";
import AboutBtn from "@/components/settings/about-btn";
import * as Linking from "expo-linking";
import { Context } from "@/context/FeedContext";
import ActionBtn from "@/components/settings/action-btn";
import { Image } from "expo-image";
import CBWSection from "@/components/settings/cbw-section";
import * as Haptics from "expo-haptics";
import { useEmbeddedWallet, isNotCreated } from "@privy-io/expo";
import { router } from "expo-router";

export type SettingsBtns = {
  icon: React.JSX.Element;
  name: string;
  callback: () => void;
};

export default function Page() {
  const insets = useSafeAreaInsets();
  const cachedAddress = useMemo(() => storage.getString("address"), []);
  const wallet = useEmbeddedWallet();

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Reset to default",
      "Are you sure you want to revert settings to defaults?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    );
  const createClearCacheAlert = () =>
    Alert.alert(
      "Clear image cache",
      "Are you sure you want remove all image cache assosiated with this application?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await Image.clearDiskCache();
            await Image.clearMemoryCache();
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          },
        },
      ]
    );

  const handleOpenBrowser = async () => {
    await WebBrowser.openBrowserAsync("https://h3llcat.app/privacy");
  };

  const {
    state: {
      embeddedWalletBalance,
      connectedWalletBalance,
      ensName,
      isDisconnectOpen,
    },
    setDisconnectOpen,
    setReportOpen,
  } = useContext(Context);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);

  const [isSwipeHapticsOn, setIsSwipeHapticsOn] = useState(true);
  const [isNavigationHapticsOn, setIsNavigationHapticsOn] = useState(true);
  const [isSecondatyHapticsOn, setIsSecondatyHapticsOn] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Set to true when keyboard opens
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Set to false when keyboard closes
      }
    );

    // Cleanup event listeners on unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback
      disabled={!keyboardVisible}
      onPress={Keyboard.dismiss}
    >
      <View style={styles.pageContainer}>
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: insets.top + 35,
            paddingBottom: insets.bottom + 120,
          }}
        >
          <View>
            <Text style={styles.h1}>Your Wallet</Text>

            <Text style={styles.h3}>
              {embeddedWalletBalance || "0.00000"}{" "}
              <Text style={styles.ethColor}>ETH</Text>
            </Text>
          </View>
          {/* 
          <Button
            onPress={() => router.push("/collection/test-notifications")}
            title="Test Notifications"
          /> */}
          <Button
            title="Press me"
            onPress={() => {
              throw new Error("Hello, again, Sentry!");
            }}
          />

          <View style={styles.sectionContainer}>
            <Text style={styles.h2}>Connected Wallet</Text>

            <CBWSection
              ensName={ensName}
              cachedAddress={cachedAddress}
              connectedWalletBalance={connectedWalletBalance}
            />
            <ActionBtn
              callback={() => Linking.openURL("cbwallet://")}
              text={"Manage"}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.h2}>Settings</Text>

            <SwitchSection
              setSwitchPosition={setIsEnabled}
              switchPosition={isEnabled}
              title={"Confirm Mint modal"}
              text={
                "You won’t need to confirm every mint action, letting the app's flow become more dynamic and uninterrupted."
              }
            />
            <SwitchSection
              setSwitchPosition={setIsNotificationsOn}
              switchPosition={isNotificationsOn}
              title={"Notifications"}
              text={
                "Disabling notifications will ensure you won’t receive any alerts or updates while using the app, creating a distraction-free experience. "
              }
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.h2}>Haptics</Text>
            <Text style={styles.textGrey}>
              Disabling haptics will turn off the physical feedback from your
              device during interactions, making the app feel smoother and
              quieter.
            </Text>
            <SwitchSection
              setSwitchPosition={setIsSwipeHapticsOn}
              switchPosition={isSwipeHapticsOn}
              title={"On Swipe"}
            />
            <SwitchSection
              setSwitchPosition={setIsNavigationHapticsOn}
              switchPosition={isNavigationHapticsOn}
              title={"On Navigation"}
            />
            <SwitchSection
              setSwitchPosition={setIsSecondatyHapticsOn}
              switchPosition={isSecondatyHapticsOn}
              title={"Secondary Actions"}
            />
            <ActionBtn
              callback={() => createTwoButtonAlert()}
              text={"Reset to defaults"}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.h2}>About Hellcat</Text>
            <AboutBtn type="privacy" callback={() => handleOpenBrowser()} />
            <AboutBtn type="report" callback={() => setReportOpen(true)} />
            <AboutBtn type="cache" callback={() => createClearCacheAlert()} />
            <AboutBtn
              type="disconnect"
              callback={() => setDisconnectOpen(!isDisconnectOpen)}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  ethColor: { color: "rgba(142, 142, 147, 1)" },
  sectionContainer: { marginTop: 35, gap: 15 },

  pageContainer: {
    flex: 1,
    backgroundColor: "black",
    gap: 35,
    paddingHorizontal: 35,
  },
  textGrey: {
    fontFamily: "SF-Pro",
    fontSize: 13,
    color: "#8E8E93",
    lineHeight: 16,
  },
  h1: {
    fontFamily: "SFPro-ExpandedBold",
    fontSize: 27,
    color: "white",
  },
  h2: {
    color: "rgba(142, 142, 147, 1)",
    fontSize: 16,
    fontFamily: "SFPro-SemiboldItalic",
  },
  h3: {
    fontFamily: "SFPro-Medium",
    fontSize: 17,
    color: "white",
  },
});
