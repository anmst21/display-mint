import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
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
} from "../icon";

interface CategoryBadgeProps {
  category: string;
  largeModal?: boolean;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  largeModal,
}) => {
  let data;
  switch (category) {
    case "generative art":
      data = {
        icon: <CategoryGenArt size={24} />,
        content: "Generative Art",
      };
      break;
    case "ai art":
      data = {
        icon: <CategoryAiArt size={24} />,
        content: "Ai Art",
      };
      break;
    case "photography":
      data = {
        icon: <CategoryPhotography size={24} />,
        content: "Photography",
      };
      break;
    case "illustration":
      data = {
        icon: <CategoryIllustration size={24} />,
        content: "Illustration",
      };
      break;
    case "glitch art":
      data = {
        icon: <CategoryGlitchArt size={24} />,
        content: "Glitch art",
      };
      break;
    case "3d":
      data = {
        icon: <Category3d size={24} />,
        content: "3D",
      };
      break;
    case "anime":
      data = {
        icon: <CategoryAnime size={24} />,
        content: "Anime",
      };
      break;
    case "pixel art":
      data = {
        icon: <CategoryPixelArt size={24} />,
        content: "Pixel art",
      };
      break;
    case "design":
      data = {
        icon: <CategoryDesign size={24} />,
        content: "Design",
      };
      break;
    case "dance":
      data = {
        icon: <CategoryDance size={24} />,
        content: "Dance",
      };
      break;
    case "music":
      data = {
        icon: <CategoryMusic size={24} />,
        content: "Music",
      };
      break;
    case "sports":
      data = {
        icon: <CategorySports size={24} />,
        content: "Sports",
      };
      break;
    case "memes":
      data = {
        icon: <CategoryMemes size={24} />,
        content: "Memes",
      };
      break;
    case "food":
      data = {
        icon: <CategoryFood size={24} />,
        content: "Food",
      };
      break;
    case "sci-fi":
      data = {
        icon: <CategorySciFi size={24} />,
        content: "Sci-Fi",
      };
      break;

    default:
      data = {
        icon: <CategoryArt size={24} />,
        content: "Art",
      };
      break;
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: largeModal ? 0 : 15,
          paddingVertical: largeModal ? 0 : 6,
          marginHorizontal: largeModal ? 0 : "auto",
          marginVertical: largeModal ? 0 : "auto",
        },
      ]}
    >
      {!largeModal && (
        <BlurView
          tint="systemThinMaterialDark"
          intensity={70}
          style={StyleSheet.absoluteFill}
        />
      )}
      {data.icon}
      <Text style={styles.content}>{data.content}</Text>
    </View>
  );
};

export default CategoryBadge;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexDirection: "row",
    borderCurve: "continuous",
    alignItems: "center",
    overflow: "hidden",
  },
  content: {
    fontFamily: "SFPro-ExpandedMedium",
    color: "white",
    fontWeight: 600,
    fontSize: 17,
  },
});
