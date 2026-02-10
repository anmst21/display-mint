import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#fff"
        d="M7.207 5.707a1 1 0 00-1.414-1.414L2.5 7.586a2 2 0 000 2.828l3.293 3.293a1 1 0 001.414-1.414L4.914 10H17a3 3 0 013 3v1a3 3 0 01-3 3h-5a1 1 0 100 2h5a5 5 0 005-5v-1a5 5 0 00-5-5H4.914l2.293-2.293z"
      ></Path>
    </Svg>
  );
}

export default Icon;
