import StatusWrapper from "./status-wrapper";
import HideBtn from "./hide-btn";
import { StyleSheet, Text } from "react-native";

import { BlurView } from "expo-blur";
import { StatusRejected } from "../icon";
import { useContext, useRef } from "react";
import { Context } from "@/context/FeedContext";

const ErrorFunds: React.FC = () => {
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
      status={status === "funds"}
    >
      <BlurView
        tint="systemThinMaterialDark"
        intensity={80}
        style={[StyleSheet.absoluteFill, styles.blurBg]}
      />
      <StatusRejected />
      <Text style={styles.text}>Insuficient funds</Text>
      <HideBtn
        callback={() => {
          statusRef.current?.onClose();

          setMintingStatus(null);
        }}
      />
    </StatusWrapper>
  );
};

export default ErrorFunds;

const styles = StyleSheet.create({
  blurBg: { backgroundColor: "rgba(223, 85, 85, 0.3)" },
  text: {
    fontFamily: "SF-Pro",
    color: "#FF382B",
    fontSize: 13,
  },
});
