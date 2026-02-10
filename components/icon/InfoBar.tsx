import Svg, { Path, Defs, ClipPath, Rect, G } from "react-native-svg";

const CopyIcon = () => {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#8E8E93"
        fillRule="evenodd"
        d="M12 4a8 8 0 100 16 1 1 0 110 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10a5.5 5.5 0 11-11 0 1 1 0 112 0 3.5 3.5 0 107 0 8 8 0 00-8-8z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default CopyIcon;
