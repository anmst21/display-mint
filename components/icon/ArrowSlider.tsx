import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = () => {
  return (
    <Svg width="24" height="12" fill="none" viewBox="0 0 24 12">
      <Path fill="#000" d="M24 6L14 .226v11.547L24 6zM0 7h15V5H0v2z"></Path>
    </Svg>
  );
};

export default BaseIcon;
