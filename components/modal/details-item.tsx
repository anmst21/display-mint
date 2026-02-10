import { StyleSheet, Text } from "react-native";
import { ModalContract, ModalChain, ModalHash, ModalStandard } from "../icon";
import Animated from "react-native-reanimated";
import { truncateEthAddress } from "@/utils";

interface DetailsItemProps {
  name: string;
  value: string | number;
  greyBg: boolean;
  boxOpacity: any;
}

const DetailsItem: React.FC<DetailsItemProps> = ({
  name,
  value,
  greyBg,
  boxOpacity,
}) => {
  const getIcon = () => {
    switch (name) {
      case "contract":
        return <ModalContract />;
      case "standard":
        return <ModalStandard />;
      case "hash":
        return <ModalHash />;
      case "chain":
        return <ModalChain />;
    }
  };
  const getName = () => {
    switch (name) {
      case "contract":
        return "Contract";
      case "standard":
        return "Token Standard";
      case "hash":
        return "Token ID";
      case "chain":
        return "Chain";
    }
  };

  return (
    <Animated.View
      style={[
        boxOpacity,
        styles.container,
        {
          backgroundColor: greyBg ? "rgba(255, 255, 255, 0.05)" : "transparent",
        },
      ]}
    >
      {getIcon()}
      <Text style={styles.itemText}>{getName()}</Text>
      <Text style={styles.itemTextSecondary}>
        {name === "contract" ? truncateEthAddress(value as string) : value}
      </Text>
    </Animated.View>
  );
};

export default DetailsItem;

const styles = StyleSheet.create({
  itemTextSecondary: {
    color: "white",
    marginLeft: "auto",
    fontFamily: "SFPro-Medium",
    fontSize: 13,
  },
  itemText: {
    color: "#8E8E93",
    fontFamily: "SFPro-Medium",
    fontSize: 13,
  },
  container: {
    height: 44,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 13,
  },
});
