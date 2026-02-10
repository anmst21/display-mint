import { useFocusEffect, useLocalSearchParams, usePathname } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useEffect, useCallback, useContext } from "react";
import LinksSection from "@/components/explore/links-section";
import { BlurView } from "expo-blur";
import api from "@/context/api";
import { getIpfsUri } from "@/context/actions";
import NftList from "@/components/nft-list";
import { useAnimatedHud } from "@/hooks/useAnimatedHud";
import { ExploreContext } from "@/context/ExploreContext";
import Animated from "react-native-reanimated";
import CardText from "@/components/swipable-card/card-text";

export default function Page() {
  const [userPosts, setUserPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<null | number>(null);
  const [showCollection, setShowCollection] = useState(false);
  const { address } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  console.log(error, showCollection, userPosts);
  const {
    state: { isHudOpen },
  } = useContext(ExploreContext);

  const getUserPosts = useCallback(
    async (showCollection: boolean, offset?: number) => {
      try {
        setError(null);
        if (!offset) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        let response;

        if (showCollection) {
          const { data } = await api.get("/anonymous/rodeo/mints", {
            params: {
              limit: 30,
              offset,
              buyerAddress: address,
            },
          });
          console.log("datadatadata", data);
          response = data;
        } else {
          const { data } = await api.get("/rodeo/collection/posts", {
            params: {
              limit: 30,
              offset,
              collectionAddress: address,
            },
          });
          response = data;
        }

        if (response.posts.length === 0) {
          setError(404);
          setIsLoadingMore(false);
          setIsLoading(false);
          return;
        } else {
        }

        const keysPosts = response.posts.map((post: any) => {
          const uris = getIpfsUri(post.image.ipfsCid);
          return {
            ...post,
            ...uris,
          };
        });

        if (!offset) {
          setUserPosts(keysPosts);
        } else {
          setUserPosts((prevPosts: any) => [...prevPosts, ...keysPosts]);
        }

        setIsLoadingMore(false);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        setIsLoadingMore(false);
        if (!offset) {
          setUserPosts([]);
          setError(400);
        }
      }
    },
    [setUserPosts]
  );

  useEffect(() => {
    if (address) {
      getUserPosts(showCollection);
    }
  }, [showCollection, address]);
  const animatedHud = useAnimatedHud({ isHudOpen });

  return (
    <View style={styles.container}>
      {userPosts.length === 0 && !isLoading && !isLoadingMore && (
        <View style={[StyleSheet.absoluteFill, styles.centerText]}>
          <CardText name={"404"} collection={"No posts found"} />
        </View>
      )}
      <NftList
        createLink={(tokenId: any) => pathname + `/${tokenId}`}
        onEndReached={() =>
          !error &&
          userPosts.length % 30 === 0 &&
          !isLoading &&
          !isLoadingMore &&
          getUserPosts(showCollection, userPosts.length + 1)
        }
        onRefresh={() => getUserPosts(showCollection)}
        isLoadingMore={isLoadingMore}
        isLoading={isLoading}
        users={userPosts}
      />
      <Animated.View
        style={[
          animatedHud,
          styles.tabContainer,
          { bottom: insets.bottom + 110 },
        ]}
      >
        <BlurView
          tint="systemThinMaterialDark"
          intensity={70}
          style={[StyleSheet.absoluteFill, styles.blur]}
        />

        <LinksSection
          disabled={false}
          firstCtaCallback={() => setShowCollection(false)}
          secondCtaCallback={() => setShowCollection(true)}
          shareLink={`https://h3llcat.app/collection/${address}`}
          showCollection={showCollection}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 100,
  },
  loader: {
    width: "100%",
    height: 70,
    borderStartColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperStyle: {
    justifyContent: "space-between",
    marginBottom: 4,
    gap: 4,
  },
  contentStyle: {
    alignItems: "flex-start",

    paddingBottom: 125,
    paddingHorizontal: 8,
  },
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  tabContainer: {
    zIndex: 10,
    position: "absolute",
    left: 35,
    right: 35,
    borderRadius: 17,
    borderCurve: "continuous",
    padding: 5,
    overflow: "hidden",
  },
  blur: { borderRadius: 17, borderCurve: "continuous", overflow: "hidden" },
  loadingPage: { alignItems: "center", justifyContent: "center" },
});
