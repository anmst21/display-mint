import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = () => {
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M1.333 8a6.667 6.667 0 1113.334 0A6.667 6.667 0 011.333 8zM8.5 5.172a.5.5 0 00-1 0v2.329H5.172a.5.5 0 100 1H7.5v2.328a.5.5 0 001 0V8.5h2.328a.5.5 0 100-1H8.5V5.172z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
