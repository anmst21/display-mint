import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { StyleSheet, Dimensions } from "react-native";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

interface GradientBgProps {
  colorValue: any;
}

const GradientBg: React.FC<GradientBgProps> = ({ colorValue }) => {
  return (
    <>
      <Canvas style={StyleSheet.absoluteFill}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(width, 0)}
            end={vec(0, height)}
            colors={colorValue}
          />
        </Rect>
      </Canvas>
      <BlurView
        tint="systemThinMaterialDark"
        intensity={100}
        style={StyleSheet.absoluteFill}
      />
    </>
  );
};

export default GradientBg;
