import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = () => {
  return (
    <Svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <Path
        fill="#2050F6"
        d="M0 8a8 8 0 018-8h15.573a8 8 0 018 8v16a8 8 0 01-8 8H8a8 8 0 01-8-8V8z"
      ></Path>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M16 26.88c6.009 0 10.88-4.871 10.88-10.88S22.009 5.12 16 5.12 5.12 9.991 5.12 16 9.991 26.88 16 26.88zm-1.627-14.507a2 2 0 00-2 2V17.2a2 2 0 002 2h3.254a2 2 0 002-2v-2.827a2 2 0 00-2-2h-3.254z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
