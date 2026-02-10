import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon({ isGrey }: { isGrey?: boolean }) {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill={isGrey ? "rgba(255, 255, 255, 0.7)" : "#fff"}
        d="M17 2a4 4 0 00-3.891 4.929L8.954 9.303a4 4 0 100 5.394l4.155 2.374a4 4 0 10.937-1.768L9.891 12.93a4.008 4.008 0 000-1.858l4.155-2.374A4 4 0 1017 2z"
      ></Path>
    </Svg>
  );
}

export default Icon;
