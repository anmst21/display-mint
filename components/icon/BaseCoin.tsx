import React from "react";
import Svg, { Path, Defs, ClipPath, Rect, G } from "react-native-svg";

function Icon() {
  return (
    <Svg width="43" height="26" fill="none" viewBox="0 0 43 26">
      <Rect width="43" height="26" fill="#1C1C1D" rx="13"></Rect>
      <Path
        fill="#fff"
        d="M12.833 14.584l-1.83-.458L13 16.873l1.998-2.747-1.831.458a.687.687 0 01-.334 0zM13 13.208l2.511-.628L13 9.127l-2.511 3.453 2.511.628z"
      ></Path>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M2 13C2 6.925 6.925 2 13 2s11 4.925 11 11-4.925 11-11 11S2 19.075 2 13zm11.667-6.535a.825.825 0 00-1.334 0l-4.4 6.05a.825.825 0 000 .97l4.4 6.05a.825.825 0 001.334 0l4.4-6.05a.825.825 0 000-.97l-4.4-6.05z"
        clipRule="evenodd"
      ></Path>
      <Rect width="22" height="22" x="19" y="2" fill="#000" rx="11"></Rect>
      <Rect width="16" height="16" x="22" y="5" fill="#0052FF" rx="8"></Rect>
      <Path
        fill="#fff"
        d="M35.605 13a5.61 5.61 0 01-5.615 5.605 5.611 5.611 0 01-5.595-5.134h7.422v-.942h-7.422a5.611 5.611 0 015.595-5.134A5.61 5.61 0 0135.605 13z"
      ></Path>
    </Svg>
  );
}

export default Icon;
