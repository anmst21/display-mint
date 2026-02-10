import StatusWrapper from "./status-wrapper";
import HideBtn from "./hide-btn";
import { StyleSheet, Text } from "react-native";

import { BlurView } from "expo-blur";
import { StatusRejected } from "../icon";
import { useContext, useRef } from "react";
import { Context } from "@/context/FeedContext";

interface ErrorMintProps {}

const ErrorMint: React.FC<ErrorMintProps> = () => {
  const {
    state: {
      mintingStatus: { status, name },
    },
    setMintingStatus,
  } = useContext(Context);

  const statusRef = useRef<any>(null);

  return (
    <StatusWrapper
      ref={statusRef}
      callback={() => setMintingStatus(null)}
      status={status === "error"}
    >
      <BlurView
        tint="systemThinMaterialDark"
        intensity={80}
        style={[StyleSheet.absoluteFill, styles.blurBg]}
      />
      <StatusRejected />

      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        Error Minting {name}
      </Text>
      <HideBtn
        callback={() => {
          statusRef.current?.onClose();

          setMintingStatus(null);
        }}
      />
    </StatusWrapper>
  );
};

export default ErrorMint;

const styles = StyleSheet.create({
  blurBg: { backgroundColor: "rgba(223, 85, 85, 0.3)" },

  text: {
    fontFamily: "SF-Pro",
    color: "#8E8E93",
    fontSize: 13,
    overflow: "hidden",
    flexShrink: 1,
  },
});
