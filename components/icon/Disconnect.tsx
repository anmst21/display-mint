import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M12 1a1 1 0 011 1v5a1 1 0 11-2 0V2a1 1 0 011-1zM7.856 3.946a1 1 0 01-.279 1.387 8 8 0 108.846 0 1 1 0 111.107-1.666A9.992 9.992 0 0122 12c0 5.523-4.477 10-10 10S2 17.523 2 12a9.992 9.992 0 014.47-8.333 1 1 0 011.386.28z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
