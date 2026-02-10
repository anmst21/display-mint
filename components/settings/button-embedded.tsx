import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonEmbeddedProps {
  callback: () => void;
  isRecieving: boolean;
}

const ButtonEmbedded: React.FC<ButtonEmbeddedProps> = ({
  callback,
  isRecieving,
}) => {
  return (
    <TouchableOpacity
      onPress={callback}
      style={[
        {
          backgroundColor: isRecieving ? "rgba(60, 60, 67, 0.6)" : "#DF5555",
        },
        styles.embeddedBtn,
      ]}
    >
      <Text style={styles.text}>
        {isRecieving ? "Recieving..." : "Add Funds"}
      </Text>
    </TouchableOpacity>
  );
};
export default ButtonEmbedded;

const styles = StyleSheet.create({
  text: { color: "white", fontSize: 17, fontWeight: 600 },
  embeddedBtn: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    marginBottom: 15,
    width: "100%",
  },
});
