import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#FF3C3C" rx="6"></Rect>
      <Path
        fill="#fff"
        d="M13.416 15.541v-3.187l1.771-1.771.709-.708-2.48-2.48V4.209l3.188 3.188v4.958l-3.188 3.187z"
      ></Path>
      <Path
        fill="#fff"
        d="M10.229 8.812l-.708-.708-2.48 2.479H3.855l3.188-3.187H12l3.187 3.187H12l-1.771-1.77z"
      ></Path>
      <Path
        fill="#fff"
        d="M8.458 13.77l-.708.709 2.479 2.479v3.188l-3.187-3.188V12l3.187-3.188V12l-1.77 1.77z"
      ></Path>
      <Path
        fill="#fff"
        d="M11.646 13.77l1.77 1.771.709.709 2.479-2.48h3.188l-3.188 3.188h-4.958l-3.188-3.187h3.188z"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
