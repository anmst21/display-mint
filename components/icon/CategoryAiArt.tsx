import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#5E75A0" rx="6"></Rect>
      <Path
        fill="#fff"
        d="M9.52 9.875l4.605-4.604h4.604v4.604l-4.604 4.604V9.875H9.52zM14.125 14.479h4.604v4.604h-4.604v-4.604zM9.52 9.875l-4.603 4.604v4.604H9.52l4.604-4.604H9.52V9.875zM9.52 9.875H4.918V5.27H9.52v4.604z"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
