import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#8E8E93"
        fillRule="evenodd"
        d="M12.379 3.207a3 3 0 014.242 0l4.172 4.172a3 3 0 010 4.242l-2.086 2.086a1 1 0 01-1.414-1.414l2.086-2.086a1 1 0 000-1.414l-4.172-4.171a1 1 0 00-1.414 0l-2.086 2.085a1 1 0 11-1.414-1.414l2.086-2.086zm3.328 5.086a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0zm-9 2a1 1 0 010 1.414l-2.086 2.086a1 1 0 000 1.414l4.172 4.172a1 1 0 001.414 0l2.086-2.086a1 1 0 011.414 1.414l-2.086 2.086a3 3 0 01-4.242 0l-4.172-4.171a3 3 0 010-4.243l2.086-2.086a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
