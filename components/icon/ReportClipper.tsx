import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="25" fill="none" viewBox="0 0 24 25">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M11 6a3.5 3.5 0 117 0v10.5a6 6 0 01-12 0v-7a1 1 0 012 0v7a4 4 0 008 0V6a1.5 1.5 0 00-3 0v9.5a1 1 0 11-2 0V6z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
