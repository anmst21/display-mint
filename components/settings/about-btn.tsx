import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Disconnect, ModalContract, Report, SettingsTrash } from "../icon";

interface AboutBtnProps {
  callback: () => void;
  type: string;
}

const AboutBtn: React.FC<AboutBtnProps> = ({ type, callback }) => {
  let btn: { icon: React.ReactNode; text: string };

  switch (type) {
    case "privacy":
      btn = {
        icon: <ModalContract isActive />,
        text: "Privacy & Security",
      };
      break;
    case "report":
      btn = {
        icon: <Report />,
        text: "Report",
      };
      break;
    case "disconnect":
      btn = {
        icon: <Disconnect />,
        text: "Disconnect",
      };
      break;
    case "cache":
      btn = {
        icon: <SettingsTrash />,
        text: "Clear Image Chache",
      };
      break;
    default:
      btn = {
        icon: null,
        text: "Unknown",
      };
      break;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={callback}>
      {btn.icon}
      <Text style={styles.text}>{btn.text}</Text>
    </TouchableOpacity>
  );
};

export default AboutBtn;

const styles = StyleSheet.create({
  text: {
    fontFamily: "SFPro-ExpandedRegular",
    fontSize: 15,
    color: "white",
  },
  container: {
    padding: 10,
    alignItems: "center",
    gap: 10,
    height: 50,
    backgroundColor: "rgba(242, 242, 247, 0.1)",
    flexDirection: "row",
    borderRadius: 13,
    borderCurve: "continuous",
  },
});
