import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const BaseIcon = () => {
  return (
    <Svg width="44" height="44" fill="none" viewBox="0 0 44 44">
      <Rect width="44" height="44" fill="#2050F6" rx="22"></Rect>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M26.25 22H22v8.5h-4.25l-4.25-4.25L17.75 22H13.5v-8.5h4.25L22 17.75V13.5h4.25l4.25 4.25L26.25 22zM22 17.75V22h-4.25L22 17.75z"
        clipRule="evenodd"
      ></Path>
      <Path fill="#fff" d="M26.25 22h4.25v8.5h-4.25L22 26.25 26.25 22z"></Path>
    </Svg>
  );
};

export default BaseIcon;
