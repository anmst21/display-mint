import { truncateEthAddress } from "@/utils";
import { View, Text, StyleSheet } from "react-native";

interface CBWSectionProps {
  ensName: string;
  cachedAddress: string | undefined;
  connectedWalletBalance?: string;
}

const CBWSection: React.FC<CBWSectionProps> = ({
  connectedWalletBalance,
  cachedAddress,
  ensName,
}) => {
  return (
    <View style={styles.balanceContainer}>
      <View style={styles.pfpPlaceholder} />
      <Text style={styles.ensName}>
        {ensName || truncateEthAddress(cachedAddress as string)}
      </Text>
      {connectedWalletBalance && (
        <Text style={styles.coinbaseBalance}>
          {connectedWalletBalance || "0.00000"}{" "}
          <Text style={styles.ethColor}>ETH</Text>
        </Text>
      )}
    </View>
  );
};

export default CBWSection;

const styles = StyleSheet.create({
  ethColor: { color: "rgba(142, 142, 147, 1)" },
  balanceContainer: {
    width: "100%",
    borderRadius: 13,
    borderCurve: "continuous",
    padding: 10,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  ensName: {
    fontFamily: "SFPro-Medium",
    color: "#8E8E93",
    fontSize: 13,
  },
  coinbaseBalance: {
    marginLeft: "auto",
    fontFamily: "SFPro-Medium",
    color: "white",
    fontSize: 13,
  },
  pfpPlaceholder: {
    backgroundColor: "grey",
    width: 24,
    height: 24,
    borderRadius: 1000,
  },
});
