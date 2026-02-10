import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#8E8E93"
        fillRule="evenodd"
        d="M11.998 2a1 1 0 011 1v7.268l6.294-3.634a1 1 0 011 1.732L13.998 12l6.294 3.634a1 1 0 11-1 1.732l-6.294-3.634V21a1 1 0 11-2 0v-7.268l-6.295 3.634a1 1 0 11-1-1.732L9.998 12 3.704 8.366a1 1 0 011-1.732l6.294 3.634V3a1 1 0 011-1z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
