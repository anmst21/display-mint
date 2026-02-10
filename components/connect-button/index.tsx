import {
  View,
  TouchableOpacity,
  Linking,
  Text,
  StyleSheet,
} from "react-native";
import { BaseIcon, ChevRight, OnboardingOtp } from "../icon";
import { useDotCount } from "@/hooks/useDotCount";
import { BlurView } from "expo-blur";

interface ConnectButtonProps {
  callback?: () => void;
  text?: string[];
  sign?: boolean;
  isLoading?: boolean;
  create?: boolean;
  otp?: boolean;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({
  callback,
  text,
  sign,
  create,
  isLoading,
  otp,
}) => {
  const dotCount = useDotCount({ recieve: true });
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={callback}
      style={[
        styles.container,
        {
          marginBottom: otp ? 20 : 55,

          backgroundColor: !sign || isLoading ? "transparent" : "#FFCC00",
        },
      ]}
    >
      {(!sign || isLoading) && (
        <BlurView
          tint="systemThinMaterialDark"
          intensity={70}
          style={[StyleSheet.absoluteFill]}
        />
      )}
      {!sign && text ? (
        <>
          {otp ? <OnboardingOtp /> : <BaseIcon />}
          <Text style={styles.btnText}>
            {text[0]} <Text style={styles.text}>{text[1]}</Text> {text[2]}
          </Text>
          <View style={styles.chevLeft}>
            <ChevRight color={"rgba(142, 142, 147, 1)"} />
          </View>
        </>
      ) : !isLoading ? (
        <Text style={styles.text}>
          {create ? "Create Ebedded Wallet" : "Continue"}
        </Text>
      ) : (
        <Text style={styles.loadingText}>
          {`Loading${".".repeat(dotCount)}`}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// "ultralight" |
//   "thin" |
//   "light" |
//   "medium" |
//   "regular" |
//   "semibold" |
//   "condensedBold" |
//   "condensed" |
//   "heavy" |
//   "black";

const styles = StyleSheet.create({
  btnText: {
    color: "rgba(255, 255, 255, 0.70)",
    marginLeft: 15,
    fontFamily: "SFPro-ExpandedSemibold",
    fontSize: 17,
  },
  loadingText: {
    fontFamily: "SFPro-Semibold",
    color: "rgba(142, 142, 147, 1)",
    fontSize: 17,
  },
  container: {
    justifyContent: "center",
    // marginTop: "auto",
    zIndex: 5,
    overflow: "hidden",
    //  marginTop: 10,
    borderCurve: "continuous",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    height: 70,
    marginHorizontal: 44,
  },
  text: {
    fontFamily: "SFPro-ExpandedSemibold",
    color: "#ffffff",
    fontSize: 17,
  },
  chevLeft: { marginLeft: "auto" },
});

export default ConnectButton;
{
  /* <View
  style={{
    borderRadius: 14,
    borderCurve: "continuous",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(60, 60, 67, 0.6)",
    // backgroundColor: "red",
    //   width: "100%",
    //marginRight: 110,
    //   marginTop: 8,
  }}
>
  <Text
    style={{
      fontFamily: "SFPro-Semibold",
      color: "rgba(142, 142, 147, 1)",
      fontSize: 17,
    }}
  >
    {`Receiving${".".repeat(dotCount)}`}
  </Text>
</View>; */
}
