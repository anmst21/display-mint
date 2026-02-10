import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Rect width="24" height="24" fill="#828282" rx="6"></Rect>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M17.667 7.042l-2.48-2.48H8.813L7.042 6.333l-2.48 2.48V15.187l1.771 1.771 2.48 2.48H15.187l1.771-1.771 2.48-2.48V8.813l-1.771-1.771zm0 0l-1.771 1.77 3.541 3.542h-2.479v5.313l-1.77-1.771-3.542 3.541v-2.479H6.333l1.771-1.77-3.541-3.542h2.479V6.333l1.77 1.771 3.542-3.541v2.479h5.313z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default BaseIcon;
