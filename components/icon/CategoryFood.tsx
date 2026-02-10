import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#479E9D" rx="6"></Rect>
      <Path
        fill="#fff"
        d="M14.833 7.042L13.417 9.52h-2.834L9.167 7.04l1.416-2.479h2.834l1.416 2.48z"
      ></Path>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M12 12l-1.417-2.48H7.75L6.333 12l1.417 2.48H4.917L3.5 16.957l1.417 2.48H7.75l1.417-2.48 1.416 2.48h2.834l1.416-2.48 1.417 2.48h2.833l1.417-2.48-1.417-2.479H16.25L17.667 12 16.25 9.52h-2.833L12 12zm1.417 2.48L12 12l-1.417 2.48H7.75l1.417 2.478 1.416-2.479h2.834zm0 0h2.833l-1.417 2.478-1.416-2.479z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
