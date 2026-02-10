import { View, Text, StyleSheet } from "react-native";
import { CommentLike } from "../icon";
import { truncateEthAddress } from "@/utils";

interface CommentItemProps {
  userAddress: string;
  timestamp: string;
  content: string;
  numLikes: number;
  index: number;
}

const getHoursAgo = (timestamp: string) => {
  const parsedTimestamp = new Date(timestamp).getTime();
  const currentTime = Date.now();
  const elapsedTime = currentTime - parsedTimestamp;

  return Math.floor(elapsedTime / (1000 * 3600));
};

const CommentItem: React.FC<CommentItemProps> = ({
  userAddress,
  timestamp,
  content,
  numLikes,
  index,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            index % 2 !== 0 ? "transparent" : "rgba(255, 255, 255, 0.05)",
        },
      ]}
    >
      <View style={styles.pfpPlaceholder} />
      <View style={styles.flex}>
        <View style={styles.text}>
          <Text style={styles.textContainer}>
            <Text style={styles.etheriumAddress}>
              {truncateEthAddress(userAddress)}
            </Text>{" "}
            {content}
          </Text>
        </View>
        <Text style={styles.timeStamp}>{getHoursAgo(timestamp)}h</Text>
      </View>
      <View style={styles.likeBtn}>
        <CommentLike />
        <Text style={styles.textNumLikes}>{numLikes}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  text: { flexDirection: "row", gap: 5 },
  flex: { flex: 1 },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 10,
    borderRadius: 13,
    borderCurve: "continuous",
  },
  pfpPlaceholder: {
    backgroundColor: "grey",
    width: 36,
    height: 36,
    borderRadius: 1000,
  },
  textContainer: {
    fontFamily: "SF-Pro",
    color: "#8E8E93",
    fontSize: 13,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  etheriumAddress: {
    fontFamily: "SFPro-BoldItalic",
    color: "white",
    fontSize: 13,
  },
  timeStamp: {
    fontFamily: "SF-Pro",
    color: "#8E8E93",
    fontSize: 13,
  },
  likeBtn: { gap: 5, alignItems: "center" },
  textNumLikes: {
    fontFamily: "SF-Pro",
    color: "#8E8E93",
    fontSize: 13,
  },
});
