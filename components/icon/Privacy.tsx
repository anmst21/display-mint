import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="29" height="30" fill="none" viewBox="0 0 29 30">
      <Rect
        width="28"
        height="28"
        x="0.5"
        y="1"
        fill="#3C3C43"
        fillOpacity="0.6"
        rx="5.5"
      ></Rect>
      <Rect width="28" height="28" x="0.5" y="1" stroke="#000" rx="5.5"></Rect>
      <Path
        fill="#FF6E3C"
        fillRule="evenodd"
        d="M18.75 12.52l1.417-2.478-1.417-2.48h-2.833l-1.417 2.48-1.417-2.48H10.25l-1.417 2.48 1.417 2.479H7.417L6 15l1.417 2.48h2.833l-1.417 2.478 1.417 2.48h2.833l1.417-2.48 1.417 2.48h2.833l1.417-2.48-1.417-2.479h2.833L23 15l-1.417-2.48H18.75zM17.333 15l1.417 2.48h-2.833L17.333 15zm-1.416-2.48L17.333 15l1.417-2.48h-2.833zm-2.834 0h2.834L14.5 10.043l-1.417 2.479zM11.667 15l-1.417-2.48h2.833L11.667 15zm1.416 2.48H10.25L11.667 15l1.416 2.48zm0 0l1.417 2.478 1.417-2.479h-2.834z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
