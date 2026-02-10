import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const ChevRight = ({ color }: { color: string }) => {
  return (
    <Svg
      style={{ zIndex: 10 }}
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m-2 9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-4a1 1 0 0 1-1-1m2-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default ChevRight;
