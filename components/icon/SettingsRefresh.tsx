import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#fff"
        d="M7.043 17A7.15 7.15 0 0012 19a7 7 0 007-7 1 1 0 112 0 9 9 0 01-9 9 9.15 9.15 0 01-6-2.244V20a1 1 0 11-2 0v-3.25c0-.966.784-1.75 1.75-1.75h3a1 1 0 110 2H7.043zM5 12a1 1 0 11-2 0 9 9 0 019-9 9.15 9.15 0 016.012 2.254V4a1 1 0 112 0v3.25A1.75 1.75 0 0118.262 9h-3.25a1 1 0 110-2h1.945A7.151 7.151 0 0012 5a7 7 0 00-7 7z"
      ></Path>
    </Svg>
  );
}

export default Icon;
