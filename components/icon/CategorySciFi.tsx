import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#9747FF" rx="6"></Rect>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M15.541 4.917L12 8.459V4.917H8.458L4.916 8.459 8.459 12H4.916v3.542l3.542 3.542L12 15.542v3.542h3.541l3.542-3.542L15.542 12h3.541V8.46l-3.541-3.542zm0 7.083L12 15.542 8.458 12 12 8.46 15.54 12z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
