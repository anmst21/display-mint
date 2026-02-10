import { View, StyleSheet, Platform } from "react-native";
import { Tabs, useFocusEffect } from "expo-router";
import { useState, useRef, useEffect, useCallback } from "react";
import * as Device from "expo-device";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import api from "@/context/api";
import { StatusBar } from "expo-status-bar";
import { SplashScreen } from "expo-router";

export default function Layout() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (token: string) => {
    try {
      const { data } = await api.post("/user/update-token", {
        tokenType: 0,
        token,
      });
      // console.warn("token saved succesfully", token, data);
    } catch (err: any) {
      console.error("Error saving push token:", err.message);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      token && setExpoPushToken(token);
      token && savePushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        //   console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View onLayout={hideSplash} style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen name="swipe" options={{ headerShown: false }} />
        <Tabs.Screen name="explore" options={{ headerShown: false }} />
        <Tabs.Screen name="wallet" options={{ headerShown: false }} />
      </Tabs>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (await Notifications.getDevicePushTokenAsync()).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
