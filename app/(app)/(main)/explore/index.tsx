import { View, StyleSheet } from "react-native";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { ExploreContext } from "@/context/ExploreContext";
import CardText from "@/components/swipable-card/card-text";
import NftList from "@/components/nft-list";
import { useFocusEffect } from "expo-router";

function Page() {
  const {
    state: {
      isLoadingExplore,
      exploreFeed,
      exploreFeedState,
      isLoadingMoreExplore,
      isHudOpen,
    },
    setIsHudOpen,
    getExploreFeed,
  } = useContext(ExploreContext);
  const memoUsers = useMemo(() => exploreFeed, [exploreFeed]);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (!isHudOpen) {
  //       setIsHudOpen(true);
  //     }
  //   }, [setIsHudOpen])
  // );

  const fetchExploreFeed = useCallback(
    (offset: number, type: string, refresh?: boolean) => {
      getExploreFeed(30, offset, type, refresh);
    },
    [getExploreFeed]
  );

  useEffect(() => {
    if (memoUsers.length === 0 && exploreFeedState === "history") {
      fetchExploreFeed(0, "history");
    }
    if (memoUsers.length === 0 && exploreFeedState === "collection") {
      fetchExploreFeed(0, "mints");
    }
  }, [exploreFeedState]);

  return (
    <View style={styles.container}>
      {exploreFeedState === "explore" && (
        <View style={[StyleSheet.absoluteFill, styles.centerText]}>
          <CardText
            isLoading={false}
            name={"Nothing here yet!"}
            collection={"Try sorting for your mints or history instead"}
          />
        </View>
      )}
      {(exploreFeedState === "history" ||
        exploreFeedState === "collection") && (
        <NftList
          createLink={(tokenId: any, index) => `/explore/${index}`}
          onEndReached={() =>
            memoUsers.length % 30 === 0 &&
            !isLoadingExplore &&
            !isLoadingMoreExplore &&
            fetchExploreFeed(
              memoUsers.length + 1,
              exploreFeedState === "history"
                ? "history"
                : exploreFeedState === "collection"
                ? "mints"
                : "explore"
            )
          }
          onRefresh={() =>
            fetchExploreFeed(
              0,
              exploreFeedState === "history"
                ? "history"
                : exploreFeedState === "collection"
                ? "mints"
                : "explore",
              true
            )
          }
          isLoadingMore={isLoadingMoreExplore}
          isLoading={isLoadingExplore}
          users={memoUsers}
        />
      )}
    </View>
  );
}

export default Page;

const styles = StyleSheet.create({
  centerText: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
