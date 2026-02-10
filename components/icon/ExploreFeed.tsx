import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon({ isActive }: { isActive: boolean }) {
  return (
    <Svg width="25" height="24" fill="none" viewBox="0 0 25 24">
      <Path
        fill={isActive ? "#ffffff" : "#8E8E93"}
        fillRule="evenodd"
        d="M18.696 3.021c1.697-.485 3.267 1.084 2.782 2.782l-2.8 9.8a3.75 3.75 0 01-2.576 2.576L6.3 20.98c-1.698.486-3.267-1.084-2.782-2.78l2.8-9.802A3.75 3.75 0 018.895 5.82l9.801-2.8zm-8.573 8.98a2.375 2.375 0 114.75 0 2.375 2.375 0 01-4.75 0z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
