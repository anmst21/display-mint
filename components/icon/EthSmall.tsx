import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="25" height="24" fill="none" viewBox="0 0 25 24">
      <Path
        fill="#fff"
        d="M12.318 13.727l-1.997-.499 2.179 2.997 2.18-2.997-1.998.5a.749.749 0 01-.364 0zM12.5 12.227l2.74-.685-2.74-3.767-2.74 3.767 2.74.685z"
      ></Path>
      <Path
        fill="#1C1C1D"
        fillRule="evenodd"
        d="M2.5 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm10.607-5.941a.75.75 0 00-1.214 0l-4 5.5a.75.75 0 000 .882l4 5.5a.75.75 0 001.214 0l4-5.5a.75.75 0 000-.882l-4-5.5z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
