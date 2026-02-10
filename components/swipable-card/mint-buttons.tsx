import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";

interface MintButtonsProps {
  text: string;
  callback: () => void;
  active?: boolean;
  isLoading: boolean;
}

const MintButtons: React.FC<MintButtonsProps> = ({
  text,
  callback,
  active,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[
        styles.btn,
        {
          backgroundColor: active
            ? "rgba(242, 242, 247, 0.20)"
            : "rgba(242, 242, 247, 0.05)",
        },
      ]}
      onPress={callback}
    >
      <Skeleton
        transition={{
          type: "spring",
          duration: 500,
        }}
        colors={[
          "rgba(142, 142, 147, 1)",
          "rgba(221, 221, 231, 1)",
          "rgba(142, 142, 147, 1)",
        ]}
        backgroundColor="rgba(142, 142, 147, 1)"
        backgroundSize={2}
        show={isLoading}
        width={"35%"}
        radius={3}
      >
        <Text style={styles.btnText}>{text}</Text>
      </Skeleton>
    </TouchableOpacity>
  );
};

export default MintButtons;

const styles = StyleSheet.create({
  btn: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,

    flex: 1,
    borderCurve: "continuous",
    borderRadius: 13,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "SFPro-ExpandedSemibold",
    textAlign: "center",
    fontSize: 17,
    color: "white",
  },
});
