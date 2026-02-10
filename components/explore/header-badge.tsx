import { View, ScrollView, Dimensions, StyleSheet, Text } from "react-native";
import { useState, memo, useContext } from "react";
import { ExploreContext } from "@/context/ExploreContext";
import NavigationGradient from "../navigation/navigation-gradient";
import {
  CategoryArt,
  CategorySciFi,
  CategoryFood,
  CategoryMemes,
  CategorySports,
  CategoryMusic,
  CategoryDance,
  CategoryDesign,
  CategoryPixelArt,
  CategoryAnime,
  Category3d,
  CategoryGlitchArt,
  CategoryIllustration,
  CategoryPhotography,
  CategoryAiArt,
  CategoryGenArt,
  ExploreHistory,
  ExploreMints,
  ExploreFeed,
} from "../icon";

import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { Skeleton } from "moti/skeleton";
import { useAnimatedHud } from "@/hooks/useAnimatedHud";

const HeaderBadge = ({
  category,
  isLoading,
  isHudOpen = true,
}: {
  isHudOpen?: boolean;
  isLoading?: boolean;
  category: string;
}) => {
  const [dimentions, setDimentions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const onLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setDimentions({ width, height }); // Save the width of the view
  };

  let data;
  switch (category) {
    case "explore":
      data = {
        icon: (
          <View style={styles.exploreIcon}>
            <ExploreFeed isActive />
          </View>
        ),
        content: "Explore",
      };
      break;
    case "collection":
      data = {
        icon: (
          <View style={styles.exploreIcon}>
            <ExploreMints />
          </View>
        ),
        content: "Collection",
      };
      break;
    case "history":
      data = {
        icon: (
          <View style={styles.exploreIcon}>
            <ExploreHistory />
          </View>
        ),
        content: "History",
      };
      break;
    case "generative art":
      data = {
        icon: <CategoryGenArt size={36} />,
        content: "Generative Art",
      };
      break;
    case "ai art":
      data = {
        icon: <CategoryAiArt size={36} />,
        content: "Ai Art",
      };
      break;
    case "photography":
      data = {
        icon: <CategoryPhotography size={36} />,
        content: "Photography",
      };
      break;
    case "illustration":
      data = {
        icon: <CategoryIllustration size={36} />,
        content: "Illustration",
      };
      break;
    case "glitch art":
      data = {
        icon: <CategoryGlitchArt size={36} />,
        content: "Glitch art",
      };
      break;
    case "3d":
      data = {
        icon: <Category3d size={36} />,
        content: "3D",
      };
      break;
    case "anime":
      data = {
        icon: <CategoryAnime size={36} />,
        content: "Anime",
      };
      break;
    case "pixel art":
      data = {
        icon: <CategoryPixelArt size={36} />,
        content: "Pixel art",
      };
      break;
    case "design":
      data = {
        icon: <CategoryDesign size={36} />,
        content: "Design",
      };
      break;
    case "dance":
      data = {
        icon: <CategoryDance size={36} />,
        content: "Dance",
      };
      break;
    case "music":
      data = {
        icon: <CategoryMusic size={36} />,
        content: "Music",
      };
      break;
    case "sports":
      data = {
        icon: <CategorySports size={36} />,
        content: "Sports",
      };
      break;
    case "memes":
      data = {
        icon: <CategoryMemes size={36} />,
        content: "Memes",
      };
      break;
    case "food":
      data = {
        icon: <CategoryFood size={36} />,
        content: "Food",
      };
      break;
    case "sci-fi":
      data = {
        icon: <CategorySciFi size={36} />,
        content: "Sci-Fi",
      };
      break;

    default:
      data = {
        icon: <CategoryArt size={36} />,
        content: "Art",
      };
      break;
  }

  const animatedHud = useAnimatedHud({ isHudOpen });

  return (
    <Animated.View
      onLayout={onLayout}
      pointerEvents="none"
      style={[animatedHud, styles.headerContainer]}
    >
      <View style={[StyleSheet.absoluteFill, styles.rotateGradient]}>
        <NavigationGradient
          width={dimentions.width}
          height={dimentions.height}
        />
      </View>
      <View style={styles.blurContainer}>
        <BlurView
          tint="systemThinMaterialDark"
          intensity={70}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.contentContainer}>
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
            width={"100%"}
            radius={6}
          >
            <Text style={styles.content}>{data.content}</Text>
          </Skeleton>
        </View>
        <View style={styles.iconBox}>
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
            width={36}
            height={36}
            radius={6}
          >
            {data.icon}
          </Skeleton>
        </View>
      </View>
    </Animated.View>
  );
};

export default memo(HeaderBadge);

const styles = StyleSheet.create({
  exploreIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    paddingHorizontal: 35,
    paddingTop: 75,
    paddingBottom: 21,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  rotateGradient: { transform: [{ rotate: "180deg" }] },
  blurContainer: {
    width: "100%",
    padding: 5,
    gap: 5,
    flexDirection: "row",
    borderRadius: 17,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "rgba(242, 242, 247, 0.2)",
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderCurve: "continuous",
    borderRadius: 11,
    paddingVertical: 6,
  },
  content: {
    fontFamily: "SFPro-ExpandedSemibold",
    fontSize: 27,
    color: "white",
  },
  iconBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "rgba(242, 242, 247, 0.2)",
    borderRadius: 11,
    borderCurve: "continuous",
  },
});
