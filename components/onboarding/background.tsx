import { useEffect, useRef, useState } from "react";
import { Video } from "expo-av";
import { StyleSheet, View, ActivityIndicator } from "react-native";

//const iphoneWallpaper = require("../../assets/images/onboarding-bg.jpg");
//const icon = require("../../assets/images/icon.png");

const OnboardingBackground = () => {
  const videoRef = useRef<Video | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef && videoRef.current?.loadAsync) {
      const preloadVideo = async () => {
        try {
          await videoRef.current?.loadAsync(
            require("../../assets/images/background.mp4"),
            { shouldPlay: true, isLooping: true, isMuted: true }
          );
          setIsLoaded(true);
        } catch (e) {
          console.error("Error loading video: ", e);
        }
      };

      preloadVideo();
    }
  }, []);
  return (
    <>
      <Video
        ref={videoRef}
        source={require("../../assets/images/background.mp4")}
        style={StyleSheet.absoluteFill}
        //   resizeMode="cover"
        isLooping
        shouldPlay
        isMuted
      />
      {/* <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} /> */}
    </>
  );
};

export default OnboardingBackground;
