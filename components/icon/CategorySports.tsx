import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#0127FF" rx="6"></Rect>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M15.541 8.459h3.542V4.917h-3.541L12 8.459V4.917H8.458L4.916 8.459V12h3.542v3.542H4.916v3.542h3.542L12 15.542v3.542h3.541l3.542-3.542V12h-3.541V8.46zM12 12V8.46H8.458V12H12zm0 0h3.541v3.542H12V12z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
