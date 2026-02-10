import { View, Text, Switch, StyleSheet } from "react-native";

interface SwitchSectionProps {
  switchPosition: boolean;
  setSwitchPosition: (value: boolean) => void;
  text?: string;
  title: string;
  grey?: boolean;
}

const SwitchSection: React.FC<SwitchSectionProps> = ({
  switchPosition,
  setSwitchPosition,
  text,
  title,
  grey,
}) => {
  return (
    <View style={{ gap: 5 }}>
      <View style={styles.container}>
        <Text
          style={[
            styles.text,
            { color: grey ? "rgba(142, 142, 147, 1)" : "white" },
          ]}
        >
          {title}
        </Text>
        <Switch
          style={styles.switch}
          ios_backgroundColor={"#000000"}
          thumbColor={switchPosition ? "#DF5555" : "#FFFFFF"}
          trackColor={{ false: "black", true: "black" }}
          value={switchPosition}
          onValueChange={setSwitchPosition}
        />
      </View>
      {text && <Text style={styles.textGrey}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  textGrey: {
    fontFamily: "SF-Pro",
    fontSize: 13,
    color: "#8E8E93",
    lineHeight: 16,
  },
  text: {
    fontFamily: "SFPro-Medium",

    fontSize: 15,
    marginRight: "auto",
  },
  switch: {
    borderWidth: 1,
    borderColor: "#DF5555",
    backgroundColor: "black",
  },
  container: {
    borderRadius: 13,
    borderCurve: "continuous",
    padding: 10,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default SwitchSection;
