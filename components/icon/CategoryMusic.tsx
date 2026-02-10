import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#000" rx="6"></Rect>
      <Path fill="#fff" d="M12 4.917h7.083V12L12 4.917z"></Path>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M12 12V4.917H8.458L4.916 8.459v10.625h10.625l3.542-3.542V12H12zm0 0v7.084L4.917 12H12z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
