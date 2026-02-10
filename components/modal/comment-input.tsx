import { useRef } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { Disabled } from "../icon";

interface CommentInputProps {
  setCommentText: (text: string) => void;
  commentText: string;
  inactive?: boolean;
  ensName: string;
  isModalLg?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({
  setCommentText,
  commentText,
  ensName,
  inactive,
  isModalLg,
}) => {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.commentContainer}>
      {isModalLg && (
        <>
          <View style={styles.pfpPlaceholder} />
          <Text style={styles.textEns}>{ensName}</Text>
        </>
      )}
      <TextInput
        editable={!inactive}
        ref={inputRef}
        placeholder={
          inactive ? "Mint to leave a comment" : "Leave your comment"
        }
        placeholderTextColor="#8E8E93"
        style={styles.commentInput}
        onChangeText={setCommentText}
        value={commentText}
      />
      {inactive && <Disabled />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  commentInput: {
    fontFamily: "SFPro-Medium",
    fontSize: 13,
    color: "white",
    flex: 1,
  },
  textEns: {
    fontFamily: "SFPro-BoldItalic",
    fontSize: 13,
    color: "white",
  },
  pfpPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: "grey",
    borderRadius: 100,
  },
  commentContainer: {
    height: 50,
    alignItems: "center",
    padding: 10,
    gap: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 13,
    borderCurve: "continuous",
    flexDirection: "row",
  },
});

export default CommentInput;
