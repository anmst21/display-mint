import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#8E8E93"
        fillRule="evenodd"
        d="M9.124 3.008a1 1 0 01.868 1.116L9.632 7h5.985l.39-3.124a1 1 0 111.985.248L17.632 7H20a1 1 0 110 2h-2.617l-.75 6H20a1 1 0 110 2h-3.617l-.39 3.124a1 1 0 11-1.985-.248l.36-2.876H8.382l-.39 3.124a1 1 0 11-1.985-.248L6.368 17H4a1 1 0 110-2h2.617l.75-6H4a1 1 0 110-2h3.617l.39-3.124a1 1 0 011.117-.868zM9.383 9l-.75 6h5.984l.75-6H9.383z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
