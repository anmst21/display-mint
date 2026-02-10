import React from "react";
import Svg, { Path, Defs, ClipPath, Rect, G } from "react-native-svg";

function Icon() {
  return (
    <Svg width="26" height="27" fill="none" viewBox="0 0 26 27">
      <Rect width="24" height="24" x="1" y="1.5" fill="#000" rx="12"></Rect>
      <Rect
        width="24"
        height="24"
        x="1"
        y="1.5"
        stroke="#1C1C1D"
        strokeWidth="2"
        rx="12"
      ></Rect>
      <Path
        fill="#fff"
        d="M13 9.403l-.053.18v5.2l.052.052 2.414-1.427L13 9.403z"
      ></Path>
      <Path
        fill="#fff"
        d="M13 9.403l-2.415 4.005L13 14.835V9.403zM13 15.621l-.03.036v1.853l.03.086 2.415-3.4-2.416 1.425z"
      ></Path>
      <Path
        fill="#fff"
        d="M13 17.596v-1.975l-2.415-1.426L13 17.596zM13 14.836l2.413-1.427L13 12.312v2.524zM10.585 13.409L13 14.836v-2.524l-2.414 1.097z"
      ></Path>
    </Svg>
  );
}

export default Icon;
