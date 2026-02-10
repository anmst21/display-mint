import { View, Text, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";
import TextTicker from "react-native-text-ticker";

interface CardTextProps {
  name: string;
  collection: string;
  isLoading?: boolean;
}

const CardText: React.FC<CardTextProps> = ({ name, collection, isLoading }) => {
  return (
    <View style={styles.container}>
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
        width={"80%"}
        height={33}
        radius={6}
      >
        <TextTicker
          duration={10000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}
          style={styles.textTick}
        >
          {name || "anton"}
        </TextTicker>
      </Skeleton>
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
        width={"45%"}
        //  height={38}
        radius={6}
      >
        <Text style={styles.collection} numberOfLines={2} ellipsizeMode="tail">
          {collection || "anton"}
        </Text>
      </Skeleton>
    </View>
  );
};

export default CardText;

const styles = StyleSheet.create({
  collection: {
    fontFamily: "SFPro-ExpandedMedium",
    color: "#8E8E93",
    fontSize: 16,
    fontWeight: 400,
  },
  textTick: {
    fontFamily: "SFPro-ExpandedBold",
    color: "white",
    fontSize: 27,
    fontWeight: "700",
    height: 33,
  },
  container: { gap: 5, overflow: "visible", width: "100%" },
});
