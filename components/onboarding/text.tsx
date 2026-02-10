import { Image } from "expo-image";
import { View, StyleSheet, Text } from "react-native";
import { BlurView } from "expo-blur";
import { TestLogo } from "../icon";

interface OnboardingTextProps {
  textHeader: string;
  textHero: string;
}

const OnboardingText: React.FC<OnboardingTextProps> = ({
  textHeader,
  textHero,
}) => {
  return (
    <View style={styles.container}>
      <TestLogo />
      <Text style={styles.textHeader}>{textHeader}</Text>
      <Text style={styles.textHero}>{textHero}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: "15%",
    zIndex: 10,
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    marginHorizontal: 44,
    backgroundColor: "none",
  },
  textHeader: {
    fontFamily: "SFPro-Bold",
    fontWeight: 700,
    fontSize: 27,
    color: "#ffffff",
    marginBottom: 14,
  },
  textHero: {
    textAlign: "center",
    fontFamily: "SF-Pro",
    fontSize: 17,
    color: "rgba(142, 142, 147, 1)",
  },
});

export default OnboardingText;
