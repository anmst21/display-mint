import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#8E8E93"
        fillRule="evenodd"
        d="M12 2a5 5 0 00-5 5v2a3 3 0 00-3 3v7a3 3 0 003 3h10a3 3 0 003-3v-7a3 3 0 00-3-3V7a5 5 0 00-5-5zm3 7V7a3 3 0 10-6 0v2h6zm-3 4a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
