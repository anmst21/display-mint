import Svg, { Path, Defs, ClipPath, Rect, G } from "react-native-svg";

const CopyIcon = () => {
  return (
    <Svg width="22" height="22" fill="none" viewBox="0 0 22 22">
      <Rect
        width="10"
        height="14"
        x="4"
        y="2"
        stroke="#fff"
        strokeWidth="1.5"
        rx="3"
      ></Rect>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M16.5 6.401A2.999 2.999 0 0118 9v8a3 3 0 01-3 3h-4c-1.11 0-2.08-.603-2.599-1.5"
        opacity="0.3"
      ></Path>
    </Svg>
  );
};

export default CopyIcon;
