import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = () => {
  return (
    <Svg width="25" height="25" fill="none" viewBox="0 0 25 25">
      <Rect
        width="23.68"
        height="24"
        x="0.5"
        y="0.5"
        fill="#2050F6"
        rx="5"
      ></Rect>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M12.5 20.66a8.16 8.16 0 100-16.32 8.16 8.16 0 000 16.32zM10.78 9.78a1 1 0 00-1 1v3.12a1 1 0 001 1h3.44a1 1 0 001-1v-3.12a1 1 0 00-1-1h-3.44z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
