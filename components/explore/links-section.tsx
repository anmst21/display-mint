import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import { ExploreLinks, ExploreBack } from "../icon";
import { router } from "expo-router";

interface LinksSectionProps {
  firstCtaCallback: () => void;
  secondCtaCallback?: () => void;
  shareLink: string;
  showCollection?: boolean;
  moreBack?: () => void;
  disableSecondButton?: boolean;
  disabled: boolean;
}

const LinksSection: React.FC<LinksSectionProps> = ({
  disabled,
  firstCtaCallback,
  secondCtaCallback,
  shareLink,
  showCollection,
  moreBack,
  disableSecondButton,
}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: shareLink,
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
  return (
    <View pointerEvents={disabled ? "none" : "auto"} style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          moreBack && moreBack();
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/swipe");
          }
        }}
        style={styles.overlayBtn}
      >
        <ExploreBack />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={firstCtaCallback}
        style={[
          styles.firstCtaCallback,
          {
            backgroundColor: secondCtaCallback
              ? showCollection
                ? "rgba(137, 136, 136, 0.2)"
                : "#DF5555"
              : "rgba(242, 242, 247, 0.2)",
          },
        ]}
      >
        <Text style={styles.firstCtaCallbackText}>
          {secondCtaCallback ? "Posts" : "Mint"}
        </Text>
      </TouchableOpacity>
      {secondCtaCallback && (
        <TouchableOpacity
          disabled={disableSecondButton}
          onPress={secondCtaCallback}
          style={[
            styles.firstCtaCallback,
            {
              backgroundColor: showCollection
                ? "#DF5555"
                : "rgba(137, 136, 136, 0.2)",
            },
          ]}
        >
          <Text style={styles.firstCtaCallbackText}>Collection</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onShare} style={styles.overlayBtn}>
        <ExploreLinks />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    width: "100%",
  },
  firstCtaCallbackText: {
    fontFamily: "SFPro-ExpandedMedium",
    fontSize: 17,
    color: "white",
  },
  firstCtaCallback: {
    //  width: "100%",
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    borderCurve: "continuous",
  },
  overlayBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    borderCurve: "continuous",
    backgroundColor: "rgba(242, 242, 247, 0.05)",
    width: 50,
    height: 50,
  },
  overlayContainer: {
    overflow: "hidden",
    padding: 5,
    marginHorizontal: 35,
    borderRadius: 17,
    borderCurve: "continuous",
    //   flexDirection: "row",
    gap: 5,
  },
});
export default LinksSection;
