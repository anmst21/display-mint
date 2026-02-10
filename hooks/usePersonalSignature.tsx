import { useCallback, useContext, useState } from "react";
import {
  isNotCreated,
  useLoginWithSiwe,
  usePrivy,
  useEmbeddedWallet,
} from "@privy-io/expo";
import { provider } from "@/app/_layout";
import { storage } from "@/context/storage";
import { router, useFocusEffect } from "expo-router";
import { fromHex, toHex } from "viem";
import api from "@/context/api";

export function usePersonalSignature(address: string | undefined) {
  const { generateSiweMessage, loginWithSiwe } = useLoginWithSiwe();
  const { logout } = usePrivy();
  const wallet = useEmbeddedWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [showLogs, setShowLogs] = useState<any>(null);

  // useFocusEffect(removeLoading);

  const handleGenerate = useCallback(
    async (address: string) => {
      const message = await generateSiweMessage({
        from: {
          domain: "h3llcat.app",
          uri: "https://h3llcat.app",
        },
        wallet: {
          chainId: `eip155:8453`,
          address,
        },
      });
      return message;
    },
    [generateSiweMessage]
  );

  const personalSign = useCallback(
    async (message: string) => {
      try {
        const result = await provider.request({
          method: "personal_sign",
          params: [message, address],
        });
        return result;
      } catch (e) {
        console.error("Error signing message", e);
        setIsLoading(false);
      }
    },
    [address]
  );

  const signMessageHandler = useCallback(async () => {
    if (!address) {
      console.error("No address available");
      setShowLogs("No address available");
      return;
    }

    setIsLoading(true);
    const msg = await handleGenerate(address);
    try {
      if (msg) {
        const signature: any = await personalSign(toHex(msg));
        console.log({ msg, signature, address });
        if (signature) {
          const {
            data: { accessToken },
          } = await api.post("/auth/login/privy", {
            message: fromHex(toHex(msg), "string"),
            signature,
          });
          await loginWithSiwe({ signature });

          if (!accessToken || !address) {
            console.error(accessToken, address);
          }

          storage.set("accessToken", accessToken);
          //   storage.set("refreshToken", refreshToken);
          storage.set("userId", address);

          console.log("wallet.status", wallet.status);
          // if (isNotCreated(wallet)) {
          //   router.replace("/login/create-wallet");
          // } else {
          //   router.replace("/swipe");
          // }
        }
      }
    } catch (error: any) {
      console.error("error", error.message);
      setIsLoading(false);

      await logout();
      setShowLogs(error.message);
    }
  }, [address, handleGenerate, personalSign, loginWithSiwe]);

  return {
    signMessageHandler,
    isLoading,
    showLogs,
  };
}
