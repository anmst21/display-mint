import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const ChevRight = ({ color }: { color: string }) => {
  return (
    <Svg width="22" height="22" fill="none" viewBox="0 0 22 22">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 17l6-6-6-6"
      ></Path>
    </Svg>
  );
};

export default ChevRight;
