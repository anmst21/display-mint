import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 25 24">
      <Rect width="24" height="24" x="0.5" fill="#FF6E3C" rx="6"></Rect>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M16.75 9.52l1.417-2.478-1.417-2.48h-2.833L12.5 7.043l-1.417-2.48H8.25l-1.417 2.48L8.25 9.52H5.417L4 12l1.417 2.48H8.25l-1.417 2.478 1.417 2.48h2.833l1.417-2.48 1.417 2.48h2.833l1.417-2.48-1.417-2.479h2.833L21 12l-1.417-2.48H16.75zM15.333 12l1.417 2.48h-2.833L15.333 12zm-1.416-2.48L15.333 12l1.417-2.48h-2.833zm-2.834 0h2.834L12.5 7.043 11.083 9.52zM9.667 12L8.25 9.52h2.833L9.667 12zm1.416 2.48H8.25L9.667 12l1.416 2.48zm0 0l1.417 2.478 1.417-2.479h-2.834z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
