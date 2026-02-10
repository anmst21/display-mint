import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ isActive }: { isActive?: boolean }) => {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill={isActive ? "white" : "#8E8E93"}
        d="M4 5a1 1 0 000 2h16a1 1 0 100-2H4zM17.92 9.606a1 1 0 00-1.84 0l-1.342 3.132-3.132 1.343a1 1 0 000 1.838l3.132 1.343 1.343 3.132a1 1 0 001.838 0l1.343-3.132 3.132-1.343a1 1 0 000-1.838l-3.132-1.343-1.343-3.132zM4 11a1 1 0 100 2h5a1 1 0 100-2H4zM4 17a1 1 0 100 2h3a1 1 0 100-2H4z"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
