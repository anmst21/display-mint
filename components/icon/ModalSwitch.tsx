import React from "react";
import Svg, { Path } from "react-native-svg";
import { View, StyleSheet } from "react-native";

function Icon({ isActive }: { isActive: boolean }) {
  return (
    <View style={styles.container}>
      {isActive && <View style={styles.innerBox} />}
      <Svg width="25" height="24" fill="none" viewBox="0 0 25 24">
        <Path
          fill={isActive ? "#DF5555" : "#8E8E93"}
          fillRule="evenodd"
          d="M3.5 7a4 4 0 014-4h1a1 1 0 010 2h-1a2 2 0 00-2 2v1a1 1 0 01-2 0V7zm12-3a1 1 0 011-1h1a4 4 0 014 4v1a1 1 0 11-2 0V7a2 2 0 00-2-2h-1a1 1 0 01-1-1zm-11 11a1 1 0 011 1v1a2 2 0 002 2h1a1 1 0 110 2h-1a4 4 0 01-4-4v-1a1 1 0 011-1zm16 0a1 1 0 011 1v1a4 4 0 01-4 4h-1a1 1 0 110-2h1a2 2 0 002-2v-1a1 1 0 011-1z"
          clipRule="evenodd"
        ></Path>
      </Svg>
    </View>
  );
}

export default Icon;

const styles = StyleSheet.create({
  innerBox: {
    zIndex: 5,
    width: 8,
    height: 8,
    borderCurve: "continuous",
    backgroundColor: "#DF5555",
    borderRadius: 3,
    position: "absolute",
  },
  container: { alignItems: "center", justifyContent: "center" },
});
