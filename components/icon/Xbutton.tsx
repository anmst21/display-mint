import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon() {
  return (
    <Svg width="11" height="11" fill="none" viewBox="0 0 11 11">
      <Path
        fill="#D2D2D7"
        fillOpacity="0.5"
        d="M.235 9.44a.859.859 0 00.006 1.187c.33.324.883.317 1.187.013l3.758-3.758 3.752 3.751a.853.853 0 001.186-.006.853.853 0 00.007-1.187L6.379 5.688l3.752-3.757a.847.847 0 00-.007-1.187.853.853 0 00-1.187-.007L5.187 4.49 1.428.737A.853.853 0 00.241.744c-.324.323-.317.882-.006 1.187l3.751 3.757L.235 9.44z"
      ></Path>
    </Svg>
  );
}

export default Icon;
