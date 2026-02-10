import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { usePathname, Link, router, useFocusEffect } from "expo-router";
import {
  SwipeFeed,
  WalletFeed,
  ExploreFeed,
  MoreBtn,
  WalletCoin,
  ExploreSort,
  CollectionInfo,
} from "../icon";
import { useEffect, useState, useContext, useCallback } from "react";
import { Context } from "@/context/FeedContext";
import DetailsModal from "../modal/details-modal";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import OutsidePressHandler from "react-native-outside-press";
import { BlurView } from "expo-blur";
import WalletCardModal from "../settings/wallet-card-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NavigationGradient from "./navigation-gradient";
import { useAnimatedHud } from "@/hooks/useAnimatedHud";
import { ExploreContext } from "@/context/ExploreContext";
import { ModalState } from "./types";
import LargeModalLinks from "./large-modal-links";
import {
  Gesture,
  GestureDetector,
  TouchableOpacity as TapOpacity,
} from "react-native-gesture-handler";
import SortingModal from "../explore/sorting-modal";
import CollectionModal from "../collection/collection-modal";
import { CollectionContext } from "@/context/CollectionContext";

interface NavigationHeaderProps {}

type ViewDimentions = {
  width: number;
  height: number;
};

const NavigationHeader: React.FC<NavigationHeaderProps> = () => {
  const {
    state: { isLoadingFeed, activeNft },
  } = useContext(Context);
  const {
    state: { isHudOpen, activeNft: activeExploreNft, isWalletOpen },
    setIsWalletOpen,
  } = useContext(ExploreContext);
  const {
    state: { isCollectionMintOpen, nftItem: activeCollectionNft },
    setIsCollectionMintOpen,
    clearNftItem,
  } = useContext(CollectionContext);

  const [viewDimentions, setViewDimentions] = useState<ViewDimentions>({
    width: 0,
    height: 0,
  });
  const [navigationItemDimentions, setNavigationItemDimentions] =
    useState<ViewDimentions>({
      width: 0,
      height: 0,
    });
  const [modalState, setModalState] = useState<ModalState>(ModalState.initial);

  // useFocusEffect(() => {
  //   return () => {
  //     setModalState(ModalState.initial);
  //   };
  // });
  // const [isWalletOpen, setIsWalletOpen] = useState(false);
  const btnColor = useSharedValue("rgba(242, 242, 247, 0.20)");
  const textColor = useSharedValue("white");
  const pathname = usePathname();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (
      pathname === "/swipe" ||
      pathname.includes("/explore/") ||
      (pathname.includes("/collection") && pathname.split("/").length === 4)
    )
      if (modalState === ModalState.initial) {
        btnColor.value = withTiming("#606064");
        textColor.value = withTiming("white");
      } else if (modalState === ModalState.small) {
        btnColor.value = withTiming("rgba(223, 85, 85, 1)");
        textColor.value = withTiming("white");
      } else if (modalState === ModalState.large) {
        btnColor.value = withTiming("rgba(255, 255, 255, 1)");
        textColor.value = withTiming("black");
      }
  }, [modalState]);

  useEffect(() => {
    if (isWalletOpen) {
      btnColor.value = withTiming("white");
      textColor.value = withTiming("black");
    } else {
      if (pathname.includes("/collection")) {
        btnColor.value = withTiming("rgba(96, 96, 100, 1)");
        textColor.value = withTiming("white");
      } else if (pathname.includes("/wallet")) {
        btnColor.value = withTiming("#DF5555");
        textColor.value = withTiming("white");
      } else {
        btnColor.value = withTiming("#rgba(96, 96, 100, 1)");
        textColor.value = withTiming("white");
      }
    }
  }, [isWalletOpen]);

  useEffect(() => {
    if (!pathname.includes("/wallet") && isWalletOpen) {
      setIsWalletOpen(false);
    }
    if (pathname.includes("/wallet")) {
      btnColor.value = withTiming("#DF5555");
    } else {
      btnColor.value = withTiming("#606064");
    }
    if (pathname.includes("/collection")) {
      textColor.value = withTiming("white");
    }
    if (modalState !== ModalState.initial) {
      setModalState(ModalState.initial);
    }
    if (isWalletOpen) {
      setIsWalletOpen(false);
    }
  }, [pathname]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: btnColor.value,
    };
  });
  const textColorAnimated = useAnimatedStyle(() => {
    return {
      color: textColor.value,
    };
  });

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setViewDimentions({ width, height }); // Save the width of the view
  };
  const onNavigationLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setNavigationItemDimentions({ width, height }); // Save the width of the view
  };

  const isClickOusideDisabled = () => {
    if (
      pathname.includes("/swipe") ||
      (pathname.includes("/explore") && pathname !== "/explore") ||
      (pathname.includes("/collection") && pathname.split("/").length === 4)
    ) {
      return modalState === ModalState.initial;
    } else if (
      (pathname.includes("/explore") && pathname === "/explore") ||
      pathname.includes("/wallet") ||
      (pathname.includes("/collection") && pathname.split("/").length !== 4)
    ) {
      return !isWalletOpen;
    } else return true;
  };
  const isDisabled = isClickOusideDisabled();

  const navigationTranslateX = useSharedValue(0);

  const animatedNavigationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: navigationTranslateX.value }],
    };
  });
  const animatedHud = useAnimatedHud({ isHudOpen });

  const resolveBtnText = () => {
    if (
      pathname.includes("/swipe") ||
      pathname.includes("/explore/") ||
      (pathname.includes("/collection") && pathname.split("/").length === 4)
    ) {
      return modalState === ModalState.large ? "Less" : "More";
    } else if (pathname === "/explore") {
      if (isWalletOpen) {
        return "Less";
      } else {
        return "Sort";
      }
    } else if (pathname.includes("/wallet")) {
      if (isWalletOpen) {
        return "Less";
      } else {
        return "Add";
      }
    } else if (pathname.includes("/collection")) {
      return "Info";
    }
  };
  const [largeModalVisible, setLargeModalVisible] = useState(false);
  const [smallModalVisible, setSmallModalVisible] = useState(false);
  // console.log("largeModalVisible", largeModalVisible, isClickOusideDisabled());
  const handleModalStateChange = () => {
    switch (modalState) {
      case ModalState.initial:
        setModalState(ModalState.small);
        setLargeModalVisible(true);

        break;
      case ModalState.small:
        setModalState(ModalState.large);
        break;
      case ModalState.large:
        setModalState(ModalState.initial);
        break;
    }
  };

  const closeWallet = useCallback((value: boolean) => {
    setIsWalletOpen(value);
    if (!smallModalVisible) {
      setSmallModalVisible(true);
    }
  }, []);

  const moreBtnTap = Gesture.Tap()
    .enabled(
      pathname === "/swipe" ? !isLoadingFeed && Boolean(activeNft) : true
    )
    .onEnd(() => {
      if (
        pathname === "/swipe" ||
        pathname.includes("/explore/") ||
        (pathname.includes("/collection") && pathname.split("/").length === 4)
      ) {
        runOnJS(handleModalStateChange)();
      } else {
        runOnJS(closeWallet)(!isWalletOpen);
      }
    });

  // Helper function to handle modal state changes
  const [activePage, setActivePage] = useState<"swipe" | "explore" | "wallet">(
    "swipe"
  );

  return (
    <Animated.View
      pointerEvents={!isHudOpen ? "none" : "auto"}
      onLayout={onLayout}
      style={[
        styles.tabBarContainer,
        animatedHud,
        { paddingBottom: insets.bottom + 20 },
      ]}
    >
      <NavigationGradient
        width={viewDimentions.width}
        height={viewDimentions.height}
      />
      <View style={styles.container}>
        <BlurView
          tint="systemThinMaterialDark"
          intensity={70}
          style={[StyleSheet.absoluteFill, styles.blurView]}
        />

        <View style={styles.innerContainer}>
          <Animated.View
            style={[
              animatedNavigationStyle,
              styles.navigationBackground,
              {
                width: navigationItemDimentions.width,
                height: navigationItemDimentions.height,
              },
            ]}
          />

          <TouchableOpacity
            onPress={() => {
              setActivePage("swipe");
              navigationTranslateX.value = withTiming(0, { duration: 200 });
              router.navigate("/swipe");
            }}
            onLayout={onNavigationLayout}
            style={styles.navBtn}
          >
            <SwipeFeed isActive={activePage === "swipe"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActivePage("explore");
              navigationTranslateX.value = withTiming(
                navigationItemDimentions.width + 5,
                { duration: 200 }
              );
              if (
                pathname.includes("/explore") &&
                pathname.split("/").length === 3
              ) {
                router.back();
              } else if (pathname === "/explore") {
                return;
              } else {
                router.navigate("/explore");
              }
            }}
            style={styles.navBtn}
          >
            <ExploreFeed isActive={activePage === "explore"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActivePage("wallet");

              navigationTranslateX.value = withTiming(
                navigationItemDimentions.width * 2 + 10,
                { duration: 200 }
              );
              router.navigate("/wallet");
            }}
            style={styles.navBtn}
          >
            <WalletFeed isActive={activePage === "wallet"} />
          </TouchableOpacity>
        </View>
        <OutsidePressHandler
          disabled={isDisabled}
          onOutsidePress={() => {
            if (
              pathname.includes("/swipe") ||
              (pathname.includes("/explore") &&
                pathname.split("/").length !== 2) ||
              (pathname.includes("/collection") &&
                pathname.split("/").length === 4)
            ) {
              setModalState(ModalState.initial);
            }
            if (
              pathname === "/explore" ||
              pathname.includes("/wallet") ||
              (pathname.includes("/collection") &&
                pathname.split("/").length !== 4)
            ) {
              closeWallet(false);
            }
          }}
        >
          <GestureDetector gesture={moreBtnTap}>
            <View style={[styles.moreBtn]}>
              {modalState === ModalState.large && (
                <LargeModalLinks
                  uri={`https://h3llcat.app/collection/${activeNft.contractAddress}/${activeNft.tokenId}`}
                />
              )}

              <Animated.View
                style={[
                  animatedStyles,
                  StyleSheet.absoluteFill,
                  styles.borderBox,
                ]}
              />
              <Animated.Text style={[textColorAnimated, styles.actionText]}>
                {resolveBtnText()}
              </Animated.Text>
              {((pathname.includes("/collection") &&
                pathname.split("/").length === 4) ||
                pathname.includes("/swipe") ||
                pathname.includes("/explore/")) && (
                <MoreBtn
                  color={modalState === ModalState.large ? "black" : "white"}
                />
              )}

              {pathname === "/explore" && (
                <ExploreSort color={isWalletOpen ? "black" : "white"} />
              )}
              {pathname.includes("/wallet") && (
                <WalletCoin color={isWalletOpen ? "black" : "white"} />
              )}
              {pathname.includes("/collection") &&
                pathname.split("/").length !== 4 && (
                  <CollectionInfo color={isWalletOpen ? "black" : "white"} />
                )}
            </View>
          </GestureDetector>

          {pathname.includes("/swipe") &&
            activeNft !== null &&
            largeModalVisible && (
              <DetailsModal
                activeNft={activeNft}
                modalState={modalState}
                viewWidth={viewDimentions.width}
                setLargeModalVisible={setLargeModalVisible}
              />
            )}
          {pathname.includes("/explore") &&
            largeModalVisible &&
            activeExploreNft !== null && (
              <DetailsModal
                setLargeModalVisible={setLargeModalVisible}
                activeNft={activeExploreNft}
                modalState={modalState}
                viewWidth={viewDimentions.width}
              />
            )}
          {pathname.includes("/collection") &&
            pathname.split("/").length === 4 &&
            largeModalVisible &&
            activeCollectionNft !== null && (
              <DetailsModal
                setLargeModalVisible={setLargeModalVisible}
                activeNft={activeCollectionNft}
                modalState={modalState}
                viewWidth={viewDimentions.width}
              />
            )}

          {pathname.includes("/explore") && smallModalVisible && (
            <SortingModal
              setLargeModalVisible={setSmallModalVisible}
              modalState={isWalletOpen}
              viewWidth={viewDimentions.width}
            />
          )}
          {pathname.includes("/collection") && smallModalVisible && (
            <CollectionModal
              setLargeModalVisible={setSmallModalVisible}
              modalState={isWalletOpen}
              viewWidth={viewDimentions.width}
            />
          )}
          {pathname.includes("/wallet") && smallModalVisible && (
            <WalletCardModal
              setLargeModalVisible={setSmallModalVisible}
              modalState={isWalletOpen}
              viewWidth={viewDimentions.width}
            />
          )}
        </OutsidePressHandler>
      </View>
    </Animated.View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  borderBox: {
    zIndex: 5,
    borderRadius: 13,
    borderCurve: "continuous",
  },
  innerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "rgba(242, 242, 247, 0.1)",
    flex: 1,
    alignItems: "center",
    borderRadius: 13,
    borderCurve: "continuous",
  },
  container: {
    flexDirection: "row",
    padding: 5,
    borderRadius: 17,
    borderCurve: "continuous",
    height: 70,
    flex: 1,
    gap: 5,
  },
  navigationBackground: {
    borderRadius: 13,
    flex: 1,
    borderCurve: "continuous",
    backgroundColor: "rgba(242, 242, 247, 0.2)",
    position: "absolute",
  },
  blurView: { borderRadius: 17, borderCurve: "continuous", overflow: "hidden" },
  actionText: {
    fontFamily: "SFPro-ExpandedSemibold",
    fontSize: 13,
    zIndex: 10,
  },
  moreBtn: {
    // marginLeft: 20,
    //  overflow: "hidden",
    zIndex: 10,
    position: "relative",
    height: 60,
    width: 90,
    // backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",

    justifyContent: "center",
    flexDirection: "row",
    //   justifyContent: "space-between",
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0, // Equivalent to the horizontal shadow offset in the Figma design
      height: 2, // Equivalent to the vertical shadow offset in the Figma design
    },
    shadowOpacity: 0.2, // Equivalent to the opacity of the shadow (rgba(0, 0, 0, 0.20))
    shadowRadius: 16, // Equivalent to the blur radius of the shadow
    elevation: 8,
  },
  tabBarContainer: {
    paddingHorizontal: 45,
    // backgroundColor: "blue",
    flexDirection: "row",
    // height: 92,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 40,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingVertical: 21,

    // backgroundColor: "red",
    // gap: 20,
  },
  navBtn: {
    // backgroundColor: "blue",
    // borderRadius: 15,
    height: "100%",
    flex: 1,
    // width: "auto",
    alignItems: "center",
    justifyContent: "center",
    // width: 64,
  },
});
