import React from "react";
import Svg, { Path } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#93918E"
        d="M2.002 6.883A3 3 0 0 1 5 4h14a3 3 0 0 1 2.998 2.883l-9.55 4.775a1 1 0 0 1-.895 0z"
      ></Path>
      <Path
        fill="#93918E"
        d="M2 9.118V17a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9.118l-8.658 4.33a3 3 0 0 1-2.684 0z"
      ></Path>
    </Svg>
  );
}

export default Icon;
