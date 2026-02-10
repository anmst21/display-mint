import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import {
  useContext,
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";

import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  useAnimatedRef,
  runOnUI,
  measure,
  scrollTo,
} from "react-native-reanimated";
import GradientBg from "@/components/onboarding/gradient-bg";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GalleryImage from "@/components/explore/gallery-image";
import { ExploreContext } from "@/context/ExploreContext";
import { useAnimatedHud } from "@/hooks/useAnimatedHud";
import LinksSection from "@/components/explore/links-section";

const Nft = () => {
  const {
    state: { isHudOpen, exploreFeed: nftFeed, activeNft },
    setActiveNft,
    setIsHudOpen,
    setIsMintOpen,
  } = useContext(ExploreContext);
  const { nft } = useLocalSearchParams();
  const [activeIndex, setActiveIndex] = useState<number>(Number(nft));
  const memoNftFeed = useMemo(() => {
    return nftFeed;
  }, [nftFeed]);

  const { backgroundColor: bgc, primaryColor: pcc } = useMemo(
    () => memoNftFeed[activeIndex],
    [activeIndex]
  );

  const backgroundColor = useSharedValue<string>(bgc);
  const detailColor = useSharedValue<string>(pcc);

  const colorValue = useDerivedValue(() => {
    return [backgroundColor.value, detailColor.value];
  }, []);

  useEffect(() => {
    backgroundColor.value = withTiming(bgc, {
      duration: 400,
    });
    detailColor.value = withTiming(pcc, {
      duration: 400,
    });
  }, [activeIndex]);
  // console.log("activeNft", activeNft);

  const scrollX = useSharedValue<number>(0);

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  useDerivedValue(() => {
    scrollTo(scrollViewRef, scrollX.value, 0, true);
  });

  useEffect(() => {
    //  console.log("barWidth", barWidth);
    if (scrollViewRef.current) {
      runOnUI(() => {
        const measurement = measure(scrollViewRef);
        if (measurement === null) {
          return;
        }

        scrollX.value = 35 * activeIndex - measurement.width / 2 + 24 + 5;

        //   runOnJS(setGalleryIndex)(activeIndex);
      })();
      //setGalleryIndex(activeIndex);
    }
  }, [activeIndex]);

  const calculateOffsets = useCallback(() => {
    let offsets: number[] = [];
    let totalOffset = 0;

    memoNftFeed.forEach((_: any, i: number) => {
      const itemWidth = i === activeIndex ? 48 : 30; // 48 for the active image, 30 for others
      offsets.push(totalOffset); // Store the current total offset
      totalOffset += itemWidth + 5; // Add item width + gap (5) to the total
    });

    return offsets;
  }, [memoNftFeed, activeIndex]);

  // console.log(snapToOffsets, activeIndex);

  const animatedHud = useAnimatedHud({ isHudOpen });

  const insets = useSafeAreaInsets();

  const onTap = useCallback(() => {
    setIsHudOpen(!isHudOpen);
  }, [setIsHudOpen]);

  const onSwipeClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleOpenMint = useCallback(() => setIsMintOpen(true), []);
  // console.log("activeNft", activeNft);

  const moreBack = useCallback(() => {
    setActiveNft(memoNftFeed[activeIndex]);

    return () => {
      setActiveNft(null);
    };
  }, []);
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!isHudOpen) {
          setIsHudOpen(true);
        }
      };
    }, [setIsHudOpen])
  );
  useFocusEffect(moreBack);
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 110 }]}>
      <GradientBg colorValue={colorValue} />
      <View style={styles.imageWrapper}>
        {activeNft?.imageAspectRatio && (
          <GalleryImage
            onTap={onTap}
            mimeType={activeNft?.mimeType}
            aspectRatio={activeNft?.imageAspectRatio}
            blurhash={activeNft?.blurhash}
            uri={activeNft?.fullUriMd}
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
          disabled={!isHudOpen}
          //     moreBack={moreBack}
          firstCtaCallback={handleOpenMint}
          shareLink={`https://h3llcat.app/collection/${activeNft?.contractAddress}/${activeNft?.tokenId}`}
          // shareLink=""
        />

        {/* <Animated.ScrollView
          removeClippedSubviews
          decelerationRate="fast"
          snapToAlignment="center"
          scrollEventThrottle={16}
          snapToOffsets={snapToOffsets}
          onScrollEndDrag={(e) => {
            // setActiveIndex(Math.floor(scrollOffset.value / 35));
          }}
          // alwaysBounceHorizontal

          //  onScrollBeginDrag={}
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 5,

            padding: 5,
            backgroundColor: "rgba(0, 0, 0, 0.4)", //  height: 60,
          }}
          style={{
            flexShrink: 1,
            alignSelf: "flex-start",
            borderRadius: 11,
            borderCurve: "continuous",
          }}
        >
          {memoNftFeed.map((item: any, index: number) => {
            return (
              <MiniImage
                key={index}
                index={index}
                activeIndex={activeIndex}
                callback={() => miniImageCallback(index)}
                uri={item.fullUriXs}
              />
            );
          })}
        </Animated.ScrollView> */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
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
  overlayBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    borderCurve: "continuous",
    backgroundColor: "rgba(242, 242, 247, 0.05)",
    width: 50,
    height: 50,
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

export default Nft;
