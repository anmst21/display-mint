import { useState, useEffect } from "react";

interface UseDotCountOptions {
  recieve: undefined | boolean;
}

export const useDotCount = ({ recieve }: { recieve: undefined | boolean }) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    if (recieve) {
      const interval = setInterval(() => {
        setDotCount((prevCount) => (prevCount + 1) % 4);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [recieve]);

  return dotCount;
};
