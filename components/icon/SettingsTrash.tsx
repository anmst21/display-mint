import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#ffffff"
        fillRule="evenodd"
        d="M7.416 5a5 5 0 019.168 0H21a1 1 0 110 2h-1.064l-.938 14.067A1 1 0 0118 22H6a1 1 0 01-.998-.933L4.064 7H3a1 1 0 010-2h4.416zm2.348 0c.55-.614 1.348-1 2.236-1 .888 0 1.687.386 2.236 1H9.764zM11 11a1 1 0 10-2 0v5a1 1 0 102 0v-5zm3-1a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
