import { View, StyleSheet } from "react-native";

const ModalCloseBar = () => {
  return (
    <View style={styles.closeBarContainer}>
      <View style={styles.closeBar} />
    </View>
  );
};

export default ModalCloseBar;

const styles = StyleSheet.create({
  closeBarContainer: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBar: {
    backgroundColor: "white",
    borderRadius: 2,
    borderCurve: "continuous",
    height: 5,
    width: 48,
  },
});
