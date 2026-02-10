import {
  View,
  Text,
  ScrollView,
  Image as RNImage,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useMemo, useEffect, useContext } from "react";
import { cards } from "@/cards";
import { Image } from "expo-image";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import CardStats from "../swipable-card/card-stats";
import { truncateEthAddress } from "@/utils";
import CardText from "../swipable-card/card-text";
import CategoryBadge from "../swipable-card/category-badge";
import DetailsItem from "./details-item";
import ContractBtn from "./contract-btn";
import SmallModalDetails from "./small-modal-details";
import CommentItem from "./comment-item";
import { InfoBar, ModalProfile } from "../icon";
import ExpoImage from "expo-image/build/ExpoImage";
import { useImageAspectRatio } from "@/hooks/useImageAspectRatio";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ModalState } from "../navigation/types";
import { Context } from "@/context/FeedContext";
import CommentInput from "./comment-input";
import * as Linking from "expo-linking";
import { storage } from "@/context/storage";
import { getPostComments } from "@/context/actions";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import ActionBtn from "./action-btn";
import { Skeleton } from "moti/skeleton";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";

interface LargeModalDetailsProps {
  scrollOpacity: any;
  modalState: ModalState;
  activeNft: any;
}

const LargeModalDetails: React.FC<LargeModalDetailsProps> = ({
  scrollOpacity,
  modalState,
  activeNft,
}) => {
  const cachedAddress = storage.getString("address");
  const [postCommets, setPostComments] = useState<any>([]);

  const {
    creator,
    farcasterIdentity,
    uri: cacheUri,
    id,
    mimeType,
    name,
    collection,
    description,
    category,
    contractAddress,
    tokenId,
    chain,
    tokenStandard,
    comments,
    mintEndDatetime,
    imageAspectRatio,
    blurhash,
  } = activeNft;

  const {
    state: { ensName },
  } = useContext(Context);

  useEffect(() => {
    const fetchCommets = async () => {
      const comments = await getPostComments({ postId: id });
      console.log("postCommets", comments);

      setPostComments(comments);
    };
    fetchCommets();
  }, [id]);

  const [commentText, setCommentText] = useState("");

  const items = [
    {
      name: "contract",
      value: contractAddress,
      greyBg: true,
    },
    { name: "hash", value: tokenId, greyBg: false },

    { name: "chain", value: chain, greyBg: true },
    { name: "standard", value: tokenStandard, greyBg: false },
  ];

  const scale = useSharedValue(1);

  const gesture = Gesture.Pinch()
    .onChange((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

  const [aspectRatio, setAspectRatio] = useState<number>(1);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-250}
      //   style={{ zIndex: 100 }}
      behavior="position"
    >
      <Animated.View style={[scrollOpacity, styles.containerStyles]}>
        <View style={styles.commentsContainer}>
          <GestureDetector gesture={gesture}>
            {mimeType === "image/gif" ? (
              <Video
                source={{
                  uri: cacheUri.replace(".webp", ".mp4"),
                }}
                rate={1.0}
                //  onLoad={() => setIsImageLoading(false)}
                volume={1.0}
                isMuted={false}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                style={[styles.nftImage, { aspectRatio: imageAspectRatio }]}
              />
            ) : (
              <Image
                transition={400}
                placeholder={{ blurhash }}
                //  contentFit="contain"
                style={[styles.nftImage, { aspectRatio: imageAspectRatio }]}
                onLoad={(e) => {
                  setAspectRatio(e.source.width / e.source.height);
                }}
                cachePolicy={"memory"}
                source={{ uri: cacheUri }}
              />
            )}
          </GestureDetector>

          <View style={styles.cardFooter}>
            <TouchableOpacity
              onPress={() => router.navigate(`/collection/${contractAddress}`)}
              style={styles.collectionNatigateBtn}
            >
              <View style={styles.imgPlaceholder}>
                {farcasterIdentity?.data?.pfp ? (
                  <Image
                    placeholder={{ blurhash }}
                    transition={100}
                    contentFit="cover"
                    style={[StyleSheet.absoluteFillObject]}
                    source={{ uri: farcasterIdentity?.data?.pfp }}
                    //  onLoad={() => setIsImageLoading(false)}
                  />
                ) : (
                  <ModalProfile />
                )}
              </View>
              {/* farcasterIdentity?.data ? "@" + farcasterIdentity.data.userName :
              truncateEthAddress(collection); */}
              <Text style={styles.addressText}>
                {farcasterIdentity?.data
                  ? "@" + farcasterIdentity.data.userName
                  : truncateEthAddress(creator)}
              </Text>
            </TouchableOpacity>
            <CardStats expandTime timestamp={mintEndDatetime} />
          </View>
        </View>
        <View style={styles.commentsContainer}>
          {modalState === ModalState.large && (
            <CardText
              name={name}
              collection={
                farcasterIdentity?.data?.realName
                  ? farcasterIdentity?.data?.realName
                  : truncateEthAddress(creator)
              }
            />
          )}

          <Text style={styles.descriptionText}>{description}</Text>
          <View>
            <CategoryBadge largeModal category={category} />
          </View>
        </View>
        <View style={styles.commentsContainer}>
          <Text style={styles.sectionHeader}>Additional info</Text>
          <SmallModalDetails smallBtn modalItems={items} boxOpacity={null} />
        </View>

        <View style={styles.commentsContainer}>
          <Text style={styles.sectionHeader}>Comments</Text>

          <View style={styles.commentsContainer}>
            {postCommets &&
              postCommets?.length > 0 &&
              postCommets.map((comment: any, index: number) => {
                const { userId, createdAt, message, userAddress } = comment;
                return (
                  <CommentItem
                    index={index}
                    key={index}
                    userAddress={userAddress}
                    timestamp={createdAt}
                    content={message}
                    numLikes={0}
                  />
                );
              })}
            <View>
              <CommentInput
                isModalLg
                ensName={ensName || truncateEthAddress(cachedAddress as string)}
                inactive
                commentText={commentText}
                setCommentText={setCommentText}
              />
            </View>
          </View>
          {comments && comments?.length > 0 && (
            <ActionBtn
              callback={() =>
                Linking.openURL(
                  `https://basescan.org/token/${contractAddress}?a=${tokenId}`
                )
              }
              type="more"
            />
          )}
        </View>

        <View style={styles.footerContainer}>
          <InfoBar />
          <Text style={styles.footerText} ellipsizeMode="tail">
            We use publicly available data from the blockchain, specifically
            leveraging the{" "}
            <Text
              onPress={() => Linking.openURL(`https://rodeo.club`)}
              style={styles.footerTextUri}
            >
              rodeo.club
            </Text>{" "}
            protocol, to generate your personalized feed. This ensures
            transparency and reliability as the data is securely sourced from a
            decentralized network.
          </Text>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default LargeModalDetails;

const styles = StyleSheet.create({
  sectionHeader: {
    fontFamily: "SFPro-SemiboldItalic",
    color: "#8E8E93",
    fontSize: 16,
    lineHeight: 20,
  },
  descriptionText: {
    fontFamily: "Unbounded-Regular",
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 20,
  },
  nftImage: {
    zIndex: 50,
    width: "100%",

    flex: 1,
  },
  addressText: {
    fontFamily: "SFPro-ExpandedRegular",
    color: "white",
    fontSize: 13,
    marginRight: "auto",
  },
  imgPlaceholder: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 24,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
  },
  collectionNatigateBtn: {
    backgroundColor: "rgba(242, 242, 247, 0.1)",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    marginRight: "auto",
    borderRadius: 8,
    gap: 10,
    borderCurve: "continuous",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    //    backgroundColor: "red",
    gap: 10,
    paddingVertical: 10,
    zIndex: 10,
  },
  containerStyles: {
    padding: 10,
    gap: 35,
  },
  commentsContainer: { gap: 15 },
  footerContainer: { gap: 10, flexDirection: "row" },
  footerTextUri: { color: "white", textDecorationLine: "underline" },
  footerText: {
    fontFamily: "SF-Pro",
    color: "#8E8E93",
    fontSize: 13,
    lineHeight: 16,

    flex: 1,
  },
});
