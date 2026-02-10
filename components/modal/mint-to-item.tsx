import { storage } from "@/context/storage";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ModalSwitch, BaseIconSm, WalletFeed } from "../icon";
import { truncateEthAddress } from "@/utils";
import { useMemo } from "react";
import { useEmbeddedWallet } from "@privy-io/expo";

interface MintToItemProps {
  callback: () => void;
  type: "coinbase" | "embedded";
  isActive: boolean;
}

const MintToItem: React.FC<MintToItemProps> = ({
  callback,
  isActive,
  type,
}) => {
  const wallet = useEmbeddedWallet();
  const cachedAddress = useMemo(() => storage.getString("address"), []);

  return (
    <TouchableOpacity onPress={callback} style={styles.box}>
      {type === "coinbase" ? <BaseIconSm /> : <WalletFeed isActive />}
      <View style={styles.textWrapper}>
        <Text style={styles.boxHeader}>
          {type === "coinbase" ? "CBW Wallet" : "Embedded wallet"}
        </Text>
        <Text style={styles.boxAddress}>
          {type === "coinbase"
            ? truncateEthAddress(cachedAddress as string)
            : truncateEthAddress(
                wallet?.account?.address.toLowerCase() as string
              )}
        </Text>
      </View>
      <ModalSwitch isActive={isActive} />
    </TouchableOpacity>
  );
};

export default MintToItem;

const styles = StyleSheet.create({
  textWrapper: { gap: 5, flex: 1 },

  boxAddress: {
    fontSize: 13,
    fontFamily: "SF-Pro",
    color: "rgba(142, 142, 147, 1)",
  },
  boxHeader: {
    fontFamily: "SFPro-BoldItalic",
    color: "white",
    fontSize: 13,
  },
  box: {
    height: 50,
    padding: 10,
    gap: 10,
    borderRadius: 13,
    borderCurve: "continuous",
    alignItems: "center",
    flexDirection: "row",
  },
});
