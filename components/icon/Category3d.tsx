import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#91DE32" rx="6"></Rect>
      <Path
        fill="#fff"
        d="M12 13.063l3.896-2.125V5.979L12 3.854 8.104 5.98 12 8.46v4.604z"
      ></Path>
      <Path
        fill="#fff"
        d="M12 13.063l-3.896-2.125-3.895 2.125v4.958l3.895 2.125v-4.604L12 13.062zM12 13.063l3.896 2.479 3.896-2.48v4.96l-3.896 2.124L12 18.021v-4.958z"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
