import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon({ isActive }: { isActive: boolean }) {
  return (
    <Svg width="25" height="24" fill="none" viewBox="0 0 25 24">
      <Path
        fill={isActive ? "#ffffff" : "#8E8E93"}
        fillRule="evenodd"
        d="M7 3a3.5 3.5 0 00-3.5 3.5v10.75A3.75 3.75 0 007.25 21h10.5a3.75 3.75 0 003.75-3.75v-5.5A3.75 3.75 0 0017.75 8h-.25V5.833A2.833 2.833 0 0014.667 3H7zm9 5V5.833c0-.736-.597-1.333-1.333-1.333H7a2 2 0 00-2 2A1.5 1.5 0 006.5 8H16zm0 7.5a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
