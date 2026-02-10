import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#FF3CD8" rx="6"></Rect>
      <Path
        fill="#fff"
        d="M12 4.917L19.083 12 12 19.084V4.917zM4.917 12V4.917H12L4.917 12zM4.917 12L12 19.084H4.917V12z"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
