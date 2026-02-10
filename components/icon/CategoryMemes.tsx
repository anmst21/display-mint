import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#BCCF6D" rx="6"></Rect>
      <Path
        fill="#fff"
        d="M14.48 7.75L12 9.167 9.52 7.75 12 6.333V3.5l2.48 1.417V7.75z"
      ></Path>
      <Path
        fill="#fff"
        d="M16.958 12l-2.479-1.417V7.75l2.48 1.417 2.479-1.417v2.833L16.957 12zM14.48 16.25v-2.833L16.957 12v2.833l2.48 1.417-2.48 1.417-2.479-1.417z"
      ></Path>
      <Path
        fill="#fff"
        d="M9.52 16.25L12 14.833l2.48 1.417L12 17.667V20.5l-2.48-1.417V16.25z"
      ></Path>
      <Path
        fill="#fff"
        d="M7.042 12l2.479 1.417v2.833l-2.48-1.417-2.479 1.417v-2.833L7.043 12zM7.042 12l2.479-1.417V7.75L7.04 6.333 4.563 7.75l2.48 1.417V12z"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
