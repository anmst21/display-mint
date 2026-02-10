import { useState, useEffect } from "react";

interface RemainingTime {
  h: number;
  m: number;
  s: number;
}

export const useRemainingTime = (endDatetime: string): RemainingTime => {
  const [remainingTime, setRemainingTime] = useState<RemainingTime>({
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    const updateRemainingTime = () => {
      const currentTime = Date.now();
      const endTime = new Date(endDatetime).getTime(); // Convert the endDatetime to Unix timestamp in milliseconds
      const remainingMilliseconds = Math.max(endTime - currentTime, 0); // Remaining time in milliseconds

      const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
      const hoursRemaining = Math.floor(remainingSeconds / 3600);
      const minutesRemaining = Math.floor((remainingSeconds % 3600) / 60);
      const secondsRemaining = remainingSeconds % 60;

      setRemainingTime({
        h: hoursRemaining,
        m: minutesRemaining,
        s: secondsRemaining,
      });
    };

    // Initial update
    updateRemainingTime();

    // Set interval to update every second
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [endDatetime]);

  return remainingTime;
};
