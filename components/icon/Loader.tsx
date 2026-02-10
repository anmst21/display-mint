import React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

function Icon({ grey }: { grey?: boolean }) {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        fill={grey ? "#8E8E93" : "#fff"}
        fillRule="evenodd"
        d="M12 2a1 1 0 011 1v3a1 1 0 11-2 0V3a1 1 0 011-1zm7.071 2.929a1 1 0 010 1.414L16.95 8.464a1 1 0 11-1.414-1.414l2.121-2.121a1 1 0 011.414 0zm-14.142 0a1 1 0 011.414 0L8.465 7.05A1 1 0 117.05 8.464l-2.122-2.12a1 1 0 010-1.415zM2 12a1 1 0 011-1h3a1 1 0 110 2H3a1 1 0 01-1-1zm15 0a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm-8.535 3.535a1 1 0 010 1.414L6.343 19.07a1 1 0 01-1.414-1.414l2.122-2.121a1 1 0 011.414 0zm7.07 0a1 1 0 011.415 0l2.121 2.12a1 1 0 01-1.414 1.415l-2.121-2.121a1 1 0 010-1.414zM12 17a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
}

export default Icon;
