import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M2 9a6 6 0 016-6h8a6 6 0 016 6v6a6 6 0 01-6 6H3a1 1 0 01-1-1V9zm7 0a1 1 0 000 2h6a1 1 0 100-2H9zm0 4a1 1 0 100 2h3a1 1 0 100-2H9z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
