import { View, Text, StyleSheet } from "react-native";
import { ModalSwitch } from "../icon";
import { TouchableOpacity } from "react-native-gesture-handler";

interface SortingPageItemProps {
  isActive: boolean;
  main: string;
  secondary: string;
  icon: any;
  callback: () => void;
}

const SortingPageItem: React.FC<SortingPageItemProps> = ({
  main,
  secondary,
  icon,
  isActive,
  callback,
}) => {
  return (
    <TouchableOpacity onPress={() => callback()} style={styles.container}>
      {icon}
      <View>
        <Text style={styles.textMain}>{main}</Text>
        <Text style={styles.textSecondary}>{secondary}</Text>
      </View>
      <View style={styles.switchContainer}>
        <ModalSwitch isActive={isActive} />
      </View>
    </TouchableOpacity>
  );
};

export default SortingPageItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  textMain: {
    color: "white",
    fontSize: 13,
    fontFamily: "SFPro-BoldItalic",
  },
  textSecondary: {
    color: "rgba(142, 142, 147, 1)",
    fontSize: 13,
    fontFamily: "SFPro",
  },
  switchContainer: {
    marginLeft: "auto",
  },
});
