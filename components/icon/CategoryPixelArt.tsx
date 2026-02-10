import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#FFC13C" rx="6"></Rect>
      <Path fill="#fff" d="M14.48 4.563V9.52L9.52 4.562h4.96z"></Path>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M19.438 14.48V9.52H9.52v4.96L4.562 9.52l4.959-4.957H4.562v9.916h4.959v4.959h9.917v-4.959zm0 0l-4.959 4.957-4.958-4.958h4.958V9.521l4.959 4.958z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
