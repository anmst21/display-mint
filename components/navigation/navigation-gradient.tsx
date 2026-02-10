import { StyleSheet } from "react-native";

import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";

const NavigationGradient = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(0, height)}
          colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
        />
      </Rect>
    </Canvas>
  );
};

export default NavigationGradient;
