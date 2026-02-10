import StatusWrapper from "./status-wrapper";
import HideBtn from "./hide-btn";
import { StatusSuccess as IconSuccess } from "../icon";
import { Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Context } from "@/context/FeedContext";
import { useContext, useRef } from "react";

const StatusSuccess: React.FC = () => {
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
      status={status === "minted"}
    >
      <BlurView
        tint="systemThinMaterialDark"
        intensity={80}
        style={StyleSheet.absoluteFill}
      />
      <IconSuccess />
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        Successfully Minted {name}
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

export default StatusSuccess;

const styles = StyleSheet.create({
  text: {
    fontFamily: "SF-Pro",
    color: "#8E8E93",
    fontSize: 13,
    overflow: "hidden",
    flexShrink: 1,
  },
});
