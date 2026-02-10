import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MintBtn = ({
  callback,
  value,
}: {
  callback: () => void;
  value?: string;
}) => {
  return (
    <TouchableOpacity onPress={callback} style={styles.container}>
      <Text style={styles.text}>{value ? value : "Mint"}</Text>
    </TouchableOpacity>
  );
};

export default MintBtn;

const styles = StyleSheet.create({
  text: {
    fontFamily: "SFPro-ExpandedSemibold",
    fontSize: 17,
    color: "white",
  },
  container: {
    width: "100%",
    borderRadius: 13,
    borderCurve: "continuous",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DF5555",
  },
});
