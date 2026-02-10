import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback,
  memo,
} from "react";
import {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  runOnJS,
  interpolateColor,
} from "react-native-reanimated";
import SwipableCard from "../../../components/swipable-card";
import MintButtons from "@/components/swipable-card/mint-buttons";
import CardText from "@/components/swipable-card/card-text";
import CardStats from "@/components/swipable-card/card-stats";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Context } from "@/context/FeedContext";
import { truncateEthAddress } from "@/utils";
import { recordAction, ActionType, actionView } from "@/context/actions";
import GradientBg from "@/components/onboarding/gradient-bg";
import HeaderBadge from "@/components/explore/header-badge";

const { width } = Dimensions.get("window");

function Index() {
  const insets = useSafeAreaInsets();
  const activeCardRef = useRef<any>(null);

  const {
    state: {
      isErrorFeed,
      isLoadingFeed,
      mintingStatus: { status },
      isMintOpen,
      nftFeed: users,
      activeNft,
      isLoadingMore,
    },
    setActiveNft,
    setMintOpen,
    getMoreFeed,
    getNtfFeed,
  } = useContext(Context);

  const memoUsers = useMemo(() => users, [users]);

  const [index, setIndex] = useState(0);
  const activeIndex = useSharedValue(0);

  const bgDefault = "rgba(141, 135, 145, 1)";
  const detailDefault = "rgba(61, 55, 67, 1)";

  const backgroundColor = useSharedValue<string>(bgDefault);
  const detailColor = useSharedValue<string>(detailDefault);

  const colorValue = useDerivedValue(() => {
    return [backgroundColor.value, detailColor.value];
  }, []);

  console.log("activeNft", isErrorFeed);

  // useEffect(() => {
  //   if (!activeNft && memoUsers.length > 0) {
  //     setActiveNft(memoUsers[index]);
  //   }
  // }, [memoUsers]);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
      if (activeNft) {
        const bgc = users[index + 1]?.backgroundColor || "#121621";
        const pcc = users[index + 1]?.primaryColor || "#1E222C";
        (backgroundColor.value = interpolateColor(
          activeIndex.value,
          [index, index + 1],
          [activeNft.backgroundColor, bgc]
        )),
          (detailColor.value = interpolateColor(
            activeIndex.value,
            [index, index + 1],
            [activeNft.primaryColor, pcc]
          ));
      }
    }
  );

  const viewLogAction = async (id: string) => {
    await actionView({ postId: id });
  };

  const handleFeed = useCallback(() => {
    setActiveNft(memoUsers[index]);

    if (memoUsers.length !== index && activeNft) {
      viewLogAction(activeNft.id);
    }
    if (index >= memoUsers.length - 5 && !isLoadingMore && !isErrorFeed) {
      console.warn("Last 2 cards remining. Fetch more!");
      getMoreFeed(memoUsers[memoUsers.length - 1].cursor);
    }
  }, [setActiveNft, getMoreFeed, viewLogAction, memoUsers, index]);

  useEffect(() => {
    if (memoUsers.length > 0) {
      handleFeed();
    }
  }, [index, memoUsers]);

  const onResponse = useCallback(
    async (res: boolean) => {
      if (res) {
        setMintOpen(true);

        await recordAction({
          actionType: ActionType.MintModalOpen,
          postId: activeNft.id,
        });
      } else {
        await recordAction({
          actionType: ActionType.Skip,
          postId: activeNft.id,
        });
      }
      //   console.log("on Response: ", res);
    },
    [recordAction, activeNft]
  );

  const handleMint = () => {
    activeCardRef.current?.swipeRight(); // Trigger swipe right only for active card

    // setMintOpen(true);
  };

  const handleSkip = () => {
    activeCardRef.current?.swipeLeft(); // Trigger swipe left only for active card
  };

  const currentTime = Date.now();
  const endTime = new Date(activeNft?.mintEndDatetime).getTime();
  const remainingMilliseconds = Math.max(endTime - currentTime, 0);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.swipeContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom + 112 },
        ]}
      >
        <BlurView
          tint="systemThinMaterialDark"
          intensity={100}
          style={StyleSheet.absoluteFill}
        />
        <GradientBg colorValue={colorValue} />
        {(!isErrorFeed || index < memoUsers.length) && (
          <HeaderBadge
            isLoading={isLoadingFeed || !activeNft}
            category={activeNft?.category}
          />
        )}
        {!isLoadingFeed && isErrorFeed && (
          <View style={[StyleSheet.absoluteFill, styles.centerText]}>
            <CardText
              name={
                isErrorFeed === 404 ? "Smells like 404" : "Thats it for now!"
              }
              collection={
                "Try reloading the app, or come back later for fresh mints!"
              }
            />
            <Text
              onPress={() => {
                setActiveNft(null);
                getNtfFeed();
                setIndex(0);
                activeIndex.value = 0;
              }}
              style={styles.footerTextUri}
            >
              Reload feed
            </Text>
          </View>
        )}

        {(!isErrorFeed || index < memoUsers.length) && (
          <View style={styles.cardsContainer}>
            {Array.from({ length: 5 }).map((_, i) => {
              const dataIndex = Math.floor(activeIndex.value) + i;
              const isWithinLoadedData = dataIndex < memoUsers.length;

              const card =
                isWithinLoadedData && !isLoadingFeed
                  ? memoUsers[dataIndex]
                  : null;

              if (!isWithinLoadedData && isErrorFeed && !isLoadingFeed) {
                return;
              }

              return (
                <SwipableCard
                  isVideo={card?.mimeType === "image/gif"}
                  blurhash={card?.blurhash}
                  isMinted={status === "minted"}
                  isMinting={status === "minting"}
                  isError={status === "funds" || status === "error"}
                  isMintOpen={isMintOpen}
                  key={
                    isWithinLoadedData
                      ? `${card?.id}-${dataIndex}`
                      : `placeholder-${dataIndex}`
                  }
                  uri={card?.fullUriMd || null} // Provide placeholder URI or null
                  ref={
                    dataIndex === Math.floor(activeIndex.value)
                      ? activeCardRef
                      : null
                  }
                  numOfCards={memoUsers.length}
                  index={dataIndex}
                  activeIndex={activeIndex}
                  onResponse={onResponse}
                  isLoading={!isWithinLoadedData || isLoadingFeed} // Show loader for placeholders or during feed loading
                />
              );
            })}
          </View>
        )}
        {(!isErrorFeed || index < memoUsers.length) && (
          <View style={styles.cardInfo}>
            <CardStats
              isLoading={isLoadingFeed || !activeNft}
              timestamp={activeNft?.mintEndDatetime}
              comments={activeNft?.commentsCount}
              mints={activeNft?.mintsCount}
            />
            <CardText
              isLoading={isLoadingFeed || !activeNft}
              name={activeNft?.name}
              collection={
                activeNft?.farcasterIdentity?.data
                  ? "@" + activeNft?.farcasterIdentity.data.userName
                  : truncateEthAddress(activeNft?.creator)
              }
            />
            <View style={styles.mintBtnContainer}>
              <MintButtons
                isLoading={isLoadingFeed || !activeNft || status === "minting"}
                text="Next"
                callback={handleSkip}
              />
              <MintButtons
                isLoading={
                  isLoadingFeed ||
                  !activeNft ||
                  remainingMilliseconds <= 0 ||
                  status === "minting"
                }
                text="Mint"
                active
                callback={handleMint}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Index;

const styles = StyleSheet.create({
  footerTextUri: {
    marginTop: 10,
    width: "100%",
    textAlign: "left",
    color: "#FC0",
    textDecorationLine: "underline",
    fontSize: 15,
  },
  centerText: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  mintBtnContainer: {
    flexDirection: "row",
    gap: 10,
  },
  cardInfo: { marginHorizontal: 35, gap: 30, overflow: "visible" },
  cardsContainer: {
    width: "100%",
    alignItems: "center",
    height: width - 70,
  },
  swipeContainer: {
    overflow: "visible",
    flex: 1,
    backgroundColor: "#3D3743",
    justifyContent: "flex-end",
    gap: 20,
  },
});
