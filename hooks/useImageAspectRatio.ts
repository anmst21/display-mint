import { useState, useEffect } from "react";
import { Image as RNImage } from "react-native";

export const useImageAspectRatio = (uri: string | undefined) => {
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getImageRatio = async () => {
      setAspectRatio(1); // Reset aspect ratio while fetching
      if (uri) {
        await RNImage.getSize(
          uri,
          (width, height) => {
            setAspectRatio(width / height); // Calculate and set aspect ratio
          },
          (error) => {
            console.error("Error fetching image size:", error);
          }
        );
      }
    };

    getImageRatio();
  }, [uri]);

  return aspectRatio;
};
