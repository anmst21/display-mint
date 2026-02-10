import { View, Text, StyleSheet } from "react-native";
import { CardComments, CardMints } from "../icon";
import { Canvas, RoundedRect } from "@shopify/react-native-skia";
import { useState, useEffect } from "react";
import { useRemainingTime } from "@/hooks/useRemeiningTIme";
import { Skeleton } from "moti/skeleton";

interface CardStatsProps {
  timestamp: string;
  mints?: number;
  comments?: number;
  expandTime?: boolean;
  isLoading?: boolean;
}

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <View style={styles.loaderContainer}>
      <Skeleton
        show={isLoading}
        width={60}
        height={16}
        transition={{
          type: "spring",
          duration: 500,
        }}
        colors={[
          "rgba(142, 142, 147, 1)",
          "rgba(221, 221, 231, 1)",
          "rgba(142, 142, 147, 1)",
        ]}
        backgroundColor="rgba(142, 142, 147, 1)"
        backgroundSize={2}
        radius={3}
      />
    </View>
  );
};

const CardStats: React.FC<CardStatsProps> = ({
  mints,
  comments,
  timestamp,
  expandTime,

  isLoading,
}) => {
  const { h, s, m } = useRemainingTime(timestamp);

  const currentTime = Math.floor(Date.now() / 1000);
  const endTime = Math.floor(new Date(timestamp).getTime() / 1000);

  // console.log("endTime - currentTime", endTime - currentTime);
  const remainingSeconds = Math.max(endTime - currentTime, 0);

  const hoursRemaining = Math.floor(remainingSeconds / 3600);
  // const hoursPassed = Math.abs(hoursRemaining - 24);
  const filledSticks = Math.ceil(hoursRemaining / 4) - 1;

  const canvasWidth = 33;
  const canvasHeight = 12;
  const stickWidth = 3;

  const TimeText = ({
    time,
    prefix,
    seconds,
  }: {
    time?: number;
    prefix?: string;
    seconds?: boolean;
  }) => {
    return (
      <Text
        style={[
          styles.timeText,
          {
            width: seconds ? 25 : undefined,
          },
        ]}
      >
        {time}
        <Text style={styles.colorPrefix}>{prefix}</Text>
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {!expandTime && (
        <>
          {isLoading ? (
            <Loader isLoading={isLoading} />
          ) : (
            <View style={styles.boxContainer}>
              <CardMints />
              <Text style={styles.numText}>{mints}</Text>
            </View>
          )}
          {isLoading ? (
            <Loader isLoading={isLoading} />
          ) : (
            <View style={styles.boxContainer}>
              <CardComments />
              <Text style={styles.numText}>{comments}</Text>
            </View>
          )}
        </>
      )}

      <View style={styles.canvas}>
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : h === 0 && m === 0 && s === 0 ? (
          <Text style={styles.textExpired}>Expired</Text>
        ) : (
          <>
            <Canvas
              style={{
                width: canvasWidth,
                height: canvasHeight,
              }}
            >
              {[...Array(6)].map((_, i) => (
                <RoundedRect
                  key={i}
                  x={i * (stickWidth + stickWidth)}
                  y={0}
                  r={1}
                  width={stickWidth}
                  height={canvasHeight}
                  color={i < filledSticks ? "white" : "gray"}
                />
              ))}
            </Canvas>
            <View style={styles.timeTextWrapper}>
              {h !== 0 && <TimeText time={h} prefix="h" />}
              {h === 0 && m !== 0 && <TimeText time={m} prefix="m" />}
              {h === 0 && m === 0 && s !== 0 && (
                <TimeText time={m} prefix="m" />
              )}
              {expandTime && (
                <>
                  <TimeText time={m} prefix="m" />
                  <TimeText time={s} prefix="s" seconds />
                </>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default CardStats;

const styles = StyleSheet.create({
  timeTextWrapper: {
    flexDirection: "row",
    gap: 3,
  },
  textExpired: {
    fontSize: 13,
    color: "#93918E",
  },
  colorPrefix: {
    color: "rgba(142, 142, 147, 1)",
  },
  timeText: {
    fontFamily: "SFPro-Medium",
    color: "white",
    fontWeight: 500,
    fontSize: 13,
  },
  numText: {
    fontFamily: "SFPro-Medium",
    color: "#8E8E93",
    fontWeight: 500,
    fontSize: 13,
  },
  canvas: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  loaderContainer: {
    padding: 5,
    backgroundColor: "rgba(91, 91, 96, 0.5)",
    borderRadius: 5,
    borderCurve: "continuous",
  },
  container: {
    height: 26,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  boxContainer: {
    width: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  text: {
    color: "#8E8E93",
    fontWeight: 600,
    fontSize: 13,
  },
});
