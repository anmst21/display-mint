import { useCallback } from "react";
import { usePrivy } from "@privy-io/expo";
import { storage } from "@/context/storage";
import { provider } from "@/app/_layout";
import { router } from "expo-router";

const useResetConnection = () => {
  const { logout } = usePrivy();

  const resetConnection = useCallback(async () => {
    await logout();

    storage.delete("address");
    storage.delete("accessToken");
    storage.delete("refreshToken");
    storage.delete("userId");

    provider.disconnect();

    router.replace("/login/connect-wallet");
  }, [logout]);

  return resetConnection;
};

export default useResetConnection;
