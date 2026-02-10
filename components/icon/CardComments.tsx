import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = () => {
  return (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M1.333 5.833A3.833 3.833 0 015.167 2h5.666a3.833 3.833 0 013.834 3.833v4.334A3.833 3.833 0 0110.833 14h-9a.5.5 0 01-.5-.5V5.833zm4.5.167a.5.5 0 000 1h4.334a.5.5 0 000-1H5.833zm0 3a.5.5 0 000 1h2.334a.5.5 0 000-1H5.833z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
