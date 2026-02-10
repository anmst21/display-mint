import Svg, { Path, Defs, ClipPath, Rect, G } from "react-native-svg";

const CopyIcon = () => {
  return (
    <Svg width="25" height="24" fill="none" viewBox="0 0 25 24">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M16.5 8V4.25A2.25 2.25 0 0014.25 2h-9.5A2.25 2.25 0 002.5 4.25v9.5A2.25 2.25 0 004.75 16H8.5v3.75A2.25 2.25 0 0010.75 22h9.5a2.25 2.25 0 002.25-2.25v-9.5A2.25 2.25 0 0020.25 8H16.5zm-2.25 8a2.25 2.25 0 002.25-2.25V10h3.75a.25.25 0 01.25.25v9.5a.25.25 0 01-.25.25h-9.5a.25.25 0 01-.25-.25V16h3.75z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default CopyIcon;
