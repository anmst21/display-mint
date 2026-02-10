import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { StatusPlay } from "../icon";

const HideBtn = ({ callback }: { callback: () => void }) => {
  return (
    <TouchableOpacity onPress={() => callback()} style={styles.hideBtnWrapper}>
      <Text style={styles.hideBtnText}>Hide</Text>
      <StatusPlay />
    </TouchableOpacity>
  );
};

export default HideBtn;

const styles = StyleSheet.create({
  hideBtnText: {
    fontFamily: "SFPro-ExpandedBold",
    color: "white",
    fontSize: 13,
  },
  hideBtnWrapper: {
    borderRadius: 10,
    borderCurve: "continuous",
    height: 40,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(242, 242, 247, 0.20)",
    marginLeft: "auto",
  },
});
