import { Text, View, StyleSheet } from "react-native";
import { ModalContract, CollectionFarcaster } from "../icon";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { useDotCount } from "@/hooks/useDotCount";

interface ContractBtnProps {
  boxOpacity?: any;
  callback?: () => void;
  apply?: boolean;
  recieve?: boolean;
  farcaster?: boolean;
}

const ContractBtn: React.FC<ContractBtnProps> = ({
  boxOpacity,
  callback,
  recieve,
  apply,
  farcaster,
}) => {
  const dotCount = useDotCount({ recieve });

  return (
    <Animated.View style={[boxOpacity, styles.btnContainer]}>
      {!recieve ? (
        <TouchableOpacity onPress={callback}>
          <View
            style={[
              {
                backgroundColor: apply
                  ? "#DF5555"
                  : "rgba(242, 242, 247, 0.10)",
              },
              styles.colorContainer,
            ]}
          >
            {!apply && !farcaster && <ModalContract isActive />}
            {farcaster && <CollectionFarcaster />}
            <Text
              style={{
                fontFamily: apply
                  ? "SFPro-ExpandedSemibold"
                  : "SFPro-ExpandedRegular",
                fontSize: apply ? 17 : 13,
                color: "white",
              }}
            >
              {!farcaster
                ? apply
                  ? "Apply"
                  : "Contract Address"
                : "View on Farcaster"}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.receivingBtn}>
          <Text style={styles.receivingText}>
            {`Receiving${".".repeat(dotCount)}`}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

export default ContractBtn;

const styles = StyleSheet.create({
  colorContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
    height: 60,
    borderRadius: 13,
    borderCurve: "continuous",
    overflow: "hidden",
    marginTop: "auto",
  },
  btnContainer: {
    position: "absolute",
    padding: 5,
    paddingRight: 100,
    backgroundColor: "rgba(60, 60, 67, 0.6)",
    bottom: -5,
    left: -5,
    right: -5,
    borderRadius: 17,
    borderCurve: "continuous",
  },
  receivingBtn: {
    borderRadius: 14,
    borderCurve: "continuous",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(60, 60, 67, 0.6)",
  },
  receivingText: {
    fontFamily: "SFPro-Semibold",
    color: "rgba(142, 142, 147, 1)",
    fontSize: 17,
  },
});
