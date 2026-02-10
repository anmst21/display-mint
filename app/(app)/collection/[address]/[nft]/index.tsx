import { View, StyleSheet } from "react-native";
import { useFocusEffect, useLocalSearchParams, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useCallback, useContext } from "react";
import { LoadingMain } from "@/components/icon";
import { CollectionContext } from "@/context/CollectionContext";
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import LinksSection from "@/components/explore/links-section";
import GalleryImage from "@/components/explore/gallery-image";
import GradientBg from "@/components/onboarding/gradient-bg";
import { ExploreContext } from "@/context/ExploreContext";
import { useAnimatedHud } from "@/hooks/useAnimatedHud";
export default function Page() {
  const { nft, address } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const {
    state: { isHudOpen },
    setIsHudOpen,
  } = useContext(ExploreContext);
  const pathname = usePathname();

  const {
    state: { isError, isLoadingItem, nftItem, isCollectionMintOpen },
    getNftItem,
    clearNftItem,
    setIsCollectionMintOpen,
  } = useContext(CollectionContext);
  console.log("isError", isLoadingItem, isError);

  const getUserPosts = useCallback(async (nft: string, address: string) => {
    try {
      await getNftItem(nft, address);
    } catch (err: any) {
      console.log("error", err);
    }
  }, []);

  const creatItem = useCallback(() => {
    return () => {
      clearNftItem();
      backgroundColor.value = withTiming(bgDefault);
      detailColor.value = withTiming(detailDefault);
    };
  }, []);
  useFocusEffect(creatItem);

  useEffect(() => {
    if (nft) {
      getUserPosts(nft as string, address as string);
    }
  }, [nft]);
  // console.log("isLoadingItem, nftItem", isLoadingItem, nftItem);

  const bgDefault = "rgba(141, 135, 145, 1)";
  const detailDefault = "rgba(61, 55, 67, 1)";
  const backgroundColor = useSharedValue<string>(bgDefault);
  const detailColor = useSharedValue<string>(detailDefault);

  const colorValue = useDerivedValue(() => {
    return [backgroundColor.value, detailColor.value];
  }, []);

  useEffect(() => {
    if (nftItem) {
      backgroundColor.value = withTiming(nftItem.backgroundColor);
      detailColor.value = withTiming(nftItem.primaryColor);
    }
  }, [nftItem]);

  const setMintOpen = useCallback(() => setIsCollectionMintOpen(true), []);
  const animatedHud = useAnimatedHud({ isHudOpen });

  const onTap = useCallback(() => {
    setIsHudOpen(!isHudOpen);
  }, [setIsHudOpen]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!isHudOpen) {
          setIsHudOpen(true);
        }
      };
    }, [setIsHudOpen])
  );
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 110,
        },
      ]}
    >
      <GradientBg colorValue={colorValue} />
      <View style={styles.centerImage}>
        {isLoadingItem ? (
          <View style={[StyleSheet.absoluteFill, styles.loadingPage]}>
            <LoadingMain />
          </View>
        ) : (
          <GalleryImage
            onTap={onTap}
            mimeType={nftItem?.mimeType}
            aspectRatio={nftItem?.imageAspectRatio || 1}
            blurhash={nftItem?.blurhash}
            uri={nftItem?.fullUriMd}
          />
        )}
      </View>
      <Animated.View style={[animatedHud, styles.overlayContainer]}>
        <BlurView
          tint="systemThinMaterialDark"
          intensity={70}
          style={StyleSheet.absoluteFill}
        />
        <LinksSection
          disabled={!isHudOpen || isLoadingItem}
          firstCtaCallback={setMintOpen}
          shareLink={`https://h3llcat.app` + pathname}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingPage: { alignItems: "center", justifyContent: "center" },
  centerImage: {
    position: "absolute",
    alignItems: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "flex-end",
    flexDirection: "column",
    paddingTop: 156,
  },
  overlayContainer: {
    overflow: "hidden",
    padding: 5,
    marginHorizontal: 35,
    borderRadius: 17,
    borderCurve: "continuous",
    //   flexDirection: "row",
    gap: 5,
  },
});
