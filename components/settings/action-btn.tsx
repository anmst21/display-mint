import { WalletFeed, SettingsRefresh } from "../icon";
import * as Linking from "expo-linking";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SmallBtnProps {
  callback: () => void;
  text: string;
}
//
const ActionBtn: React.FC<SmallBtnProps> = ({ callback, text }) => {
  return (
    <TouchableOpacity onPress={callback} style={styles.actionBtn}>
      {text === "Manage" ? <WalletFeed isActive={true} /> : <SettingsRefresh />}

      <Text style={styles.actionBtnText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionBtnText: {
    fontFamily: "SFPro-ExpandedRegular",
    color: "white",
    fontSize: 13,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(242, 242, 247, 0.1)",
    borderRadius: 8,
    borderCurve: "continuous",
    height: 34,
    width: 200,
    paddingHorizontal: 20,
  },
});

export default ActionBtn;
