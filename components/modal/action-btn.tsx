import { InfoBar, ModalContract, Loader } from "../icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";

const ActionBtn = ({
  type,
  callback,
}: {
  type: "contract" | "more";
  callback: () => void;
}) => {
  return (
    <TouchableOpacity onPress={callback} style={styles.container}>
      {type === "contract" ? <ModalContract isActive /> : <Loader />}
      <Text style={styles.text}>
        {type === "contract" ? "Contract Address" : "Load More"}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionBtn;

const styles = StyleSheet.create({
  text: {
    fontFamily: "SFPro-Medium",
    color: "white",
    fontSize: 13,
  },
  container: {
    backgroundColor: "rgba(242, 242, 247, 0.10)",
    borderRadius: 8,
    borderCurve: "continuous",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    gap: 10,
    flexDirection: "row",
    marginRight: "auto",
    marginTop: 15,
  },
});
