import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon({ isGrey }: { isGrey?: boolean }) {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M4 6V5a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1h4a1 1 0 0 0 0-2H5.07a8 8 0 1 1-.615 6.667 1 1 0 1 0-1.886.666C3.942 19.216 7.644 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2a9.98 9.98 0 0 0-8 4m8 1a1 1 0 0 1 1 1v3.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
