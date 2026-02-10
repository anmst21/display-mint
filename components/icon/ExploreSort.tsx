import React from "react";
import Svg, { Path, Defs, ClipPath, Rect, G } from "react-native-svg";

function Icon({ color }: { color: string }) {
  return (
    <Svg
      style={{ zIndex: 10 }}
      width="25"
      height="24"
      fill="none"
      viewBox="0 0 25 24"
    >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M7.5 3a1 1 0 011 1v13.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L6.5 17.586V4a1 1 0 011-1zM18 3c.811 0 1.527.53 1.764 1.306l1.189 3.89.496 1.488a1 1 0 01-1.897.632l-.273-.816h-2.558l-.272.816a1 1 0 01-1.897-.632l.496-1.488 1.188-3.89A1.844 1.844 0 0118 3zm0 2.377L17.352 7.5h1.297L18 5.377zM14.5 14a1 1 0 011-1h5a1 1 0 01.768 1.64L17.635 19H20.5a1 1 0 110 2h-5a1 1 0 01-.768-1.64L18.365 15H15.5a1 1 0 01-1-1z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
