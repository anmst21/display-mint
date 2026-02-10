import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const ChevRight = () => {
  return (
    <Svg width="27" height="22" fill="none" viewBox="0 0 27 22">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M10.69 19H5.101v-.62c0-.284.228-.515.509-.515h.102v-.62c0-.285.227-.516.509-.516V7.542h-.56L5 5.27h2.952V3h11.096v2.271H22l-.662 2.27h-.56v9.188c.282 0 .51.231.51.516v.62h.101c.281 0 .51.23.51.516V19h-5.582v-.62c0-.284.228-.515.509-.515h.102v-.62c0-.279.218-.506.491-.516v-5.058c-.18-2.026-1.875-3.613-3.919-3.613s-3.74 1.587-3.92 3.613v5.058a.513.513 0 0 1 .499.516v.62h.101c.281 0 .51.23.51.516z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default ChevRight;
