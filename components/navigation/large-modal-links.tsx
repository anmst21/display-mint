import { View, StyleSheet, Share, Alert } from "react-native";
import { BlurView } from "expo-blur";
import { ExploreLinks } from "../icon";
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

interface LargeModalLinksProps {
  uri: string;
}

const LargeModalLinks: React.FC<LargeModalLinksProps> = ({ uri }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: uri,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(onShare)();
  });

  return (
    <View style={styles.container}>
      <BlurView
        tint="systemThinMaterialDark"
        intensity={70}
        style={[StyleSheet.absoluteFill]}
      />
      <GestureDetector gesture={tapGesture}>
        <View style={styles.exploreLinks}>
          <ExploreLinks isGrey />
        </View>
      </GestureDetector>
    </View>
  );
};

export default LargeModalLinks;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: -5,
    bottom: -5,
    padding: 5,
    top: -5,
    paddingRight: 100,
    borderRadius: 17,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  exploreLinks: {
    backgroundColor: "rgba(137, 136, 136, 0.2)",
    paddingVertical: 6,
    borderRadius: 13,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    flex: 1,
  },
});
