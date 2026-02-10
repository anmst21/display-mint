import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = () => {
  return (
    <Svg width="15" height="24" fill="none" viewBox="0 0 15 24">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M9.293 7.293a1 1 0 011.414 0l2.94 2.94a2.5 2.5 0 010 3.535l-2.94 2.94a1 1 0 01-1.414-1.415l2.94-2.94a.5.5 0 000-.707l-2.94-2.939a1 1 0 010-1.414z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
