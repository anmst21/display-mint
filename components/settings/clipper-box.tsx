import { TouchableOpacity, StyleSheet } from "react-native";
import { ReportClipper, ReportCross } from "../icon";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

interface ClipperBoxProps {
  image: string | null;
  setImage: (value: any) => void;
  index: number;
}

const ClipperBox: React.FC<ClipperBoxProps> = ({ image, setImage, index }) => {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  console.log("status", status);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //  allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    //  console.log(result.assets[0]);

    if (!result.canceled) {
      setImage((prevState: any) => [
        ...prevState,
        {
          image: result.assets[0].uri,
          fileName: result.assets[0].fileName,
          mimeType: result.assets[0].mimeType,
        },
      ]);
    }
  };
  return (
    <TouchableOpacity
      onPress={pickImage}
      disabled={image !== null}
      style={styles.clipperBox}
    >
      <ReportClipper />
      {image && (
        <Image
          //  animatedProps={animatedProps}
          style={[StyleSheet.absoluteFillObject, styles.image]}
          source={{ uri: image }}
          //  blurRadius={blurRadius}
          cachePolicy={"memory"}
          priority={"high"}
        />
      )}
      {image && (
        <TouchableOpacity
          onPress={() => {
            setImage((prevState: { image: string }[]) => {
              const updatedImages = prevState.filter((_, i) => i !== index);
              return updatedImages;
            });
          }}
          style={styles.clipperCross}
        >
          <ReportCross />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default ClipperBox;

const styles = StyleSheet.create({
  image: { borderRadius: 15, backgroundColor: "grey" },
  clipperCross: {
    //  backgroundColor: "blue",
    position: "absolute",
    top: -10,
    right: -10,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  clipperBox: {
    // overflow: "hidden",
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderCurve: "continuous",
    backgroundColor: "rgba(242, 242, 247, 0.1)",
  },
});
