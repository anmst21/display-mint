import { useState, useEffect } from "react";
import { isCoinbaseWalletInstalled } from "@coinbase/wallet-mobile-sdk";
import { useFocusEffect } from "expo-router";
export function useIsWalletInstalled() {
  const [loading, setLoading] = useState(true);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  useFocusEffect(() => {
    async function checkWalletInstallation() {
      try {
        const installed = await isCoinbaseWalletInstalled();
        setIsWalletInstalled(installed);
      } catch (error) {
        console.error("Error checking wallet installation:", error);
      } finally {
        setLoading(false); // Set loading to false after the check
      }
    }

    checkWalletInstallation();
  });

  return {
    isWalletInstalled,
    loading,
  };
}
