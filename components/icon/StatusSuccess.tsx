import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="25" height="24" fill="none" viewBox="0 0 25 24">
      <Path
        fill="#8E8E93"
        fillRule="evenodd"
        d="M18.159 7.247a1 1 0 01.094 1.412l-7 8a1 1 0 01-1.46.048l-3-3a1 1 0 111.414-1.414l2.244 2.244 6.296-7.195a1 1 0 011.412-.095z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
