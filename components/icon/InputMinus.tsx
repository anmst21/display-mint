import Svg, { Path, Defs, ClipPath, Rect, G } from "react-native-svg";

const CopyIcon = () => {
  return (
    <Svg width="25" height="24" fill="none" viewBox="0 0 25 24">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M6.5 12a1 1 0 011-1h10a1 1 0 110 2h-10a1 1 0 01-1-1z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default CopyIcon;
