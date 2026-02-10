import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect width="24" height="24" rx="6" fill="#DF5555" />
      <Path d="M19 9.2L16.2 12V7.8H12L14.8 5H19V9.2Z" fill="white" />
      <Path d="M7.8 12L12 7.8L16.2 12L12 16.2L7.8 12Z" fill="white" />
      <Path
        d="M7.8 12L5 14.8V19H9.2L12 16.2L14.8 19H19V14.8L16.2 12V16.2H12H7.8V12Z"
        fill="white"
      />
      <Path d="M7.8 12L5 9.2V5H9.2L12 7.8H7.8V12Z" fill="white" />
    </Svg>
  );
};

export default BaseIcon;
