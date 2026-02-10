import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#3CB1FF" rx="6"></Rect>
      <Path
        fill="#fff"
        d="M19.438 9.52h-4.959L9.521 4.564h4.958l4.959 4.958z"
      ></Path>
      <Path
        fill="#fff"
        d="M14.48 19.438v-4.959l4.957-4.958v4.958l-4.958 4.959zM4.563 14.48V9.52L9.52 4.564V9.52l-4.959 4.958zM4.563 14.48l4.958 4.957h4.958L9.521 14.48H4.562z"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
