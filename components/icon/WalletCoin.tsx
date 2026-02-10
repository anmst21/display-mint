import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

const TestLogo = ({ color }: { color: string }) => {
  return (
    <Svg
      style={{ zIndex: 10 }}
      width="25"
      height="24"
      fill="none"
      viewBox="0 0 25 24"
    >
      <Path
        fill={color}
        fillRule="evenodd"
        d="M2.5 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm11-5a1 1 0 10-2 0v.612a4.502 4.502 0 000 8.777V17a1 1 0 102 0v-.612a4.496 4.496 0 002.214-1.239 1 1 0 10-1.428-1.4 2.5 2.5 0 110-3.5 1 1 0 101.428-1.398A4.496 4.496 0 0013.5 7.61V7z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default TestLogo;
