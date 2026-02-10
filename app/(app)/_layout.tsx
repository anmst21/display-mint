import { Tabs, Stack, useRouter } from "expo-router";
import { View } from "react-native";
import * as Linking from "expo-linking";

import NavigationHeader from "@/components/navigation/header";
import { StyleSheet } from "react-native";
import { useEmbeddedWallet, isNotCreated, isConnected } from "@privy-io/expo";
import { useMemo, useState, useEffect, useContext, useCallback } from "react";
import { usePathname } from "expo-router";
import MintModal from "@/components/modal/mint-modal-wrapper";
import { createPublicClient, formatUnits, custom, http, Address } from "viem";
import { base, mainnet } from "viem/chains";
import { Context } from "@/context/FeedContext";
import Status from "@/components/status";
import StatusSuccess from "@/components/status/status-success";
import ErrorMint from "@/components/status/error-mint";
import ErrorFunds from "@/components/status/error-funds";
import DisconnectModal from "@/components/settings/disconnect-modal";
import { storage } from "@/context/storage";
import { normalize } from "viem/ens";
import ReportModal from "@/components/settings/report-modal";
import { ExploreContext } from "@/context/ExploreContext";
import { CollectionContext } from "@/context/CollectionContext";
import * as Haptics from "expo-haptics";
import { configure, handleResponse } from "@coinbase/wallet-mobile-sdk";

export default function AppLayout() {
  const wallet = useEmbeddedWallet();

  const pathname = usePathname();
  const {
    state: {
      activeNft: activeSwipeNft,
      isMintOpen,
      isReportOpen,
      isDisconnectOpen,
      mintingStatus,
    },
    setEmbeddedWalletBalance,
    setConnectedWalletBalance,
    setEnsName,
    setEnsAvatar,
    setMintOpen,
    getNtfFeed,
    setMintingStatus,
  } = useContext(Context);
  const {
    state: { isMintOpen: isExploreMintOpen, activeNft: activeExploreNft },

    setIsMintOpen: setIsExploreMintOpen,
  } = useContext(ExploreContext);

  const {
    state: { isCollectionMintOpen, nftItem: activeCollectionNft },
    setIsCollectionMintOpen,
  } = useContext(CollectionContext);

  const cachedAddress = storage.getString("address");

  const walletClient = useMemo(() => {
    if (!wallet || isNotCreated(wallet) || !isConnected(wallet))
      return undefined;
    // console.log(`Creating wallet client for chain: ${base.id}`);
    return createPublicClient({
      chain: base,
      transport: custom(wallet.provider),
    });
  }, [wallet]);

  const walletClientMainnet = useMemo(() => {
    return createPublicClient({
      chain: mainnet,
      transport: http(),
    });
  }, []);

  const getFeed = useCallback(() => {
    getNtfFeed();
  }, []);

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (walletClientMainnet) {
      const getEnsCredentials = async () => {
        try {
          const ensName = await walletClientMainnet.getEnsName({
            address: cachedAddress as Address,
          });
          let ensAvatar = null;
          if (ensName) {
            ensAvatar = await walletClientMainnet.getEnsAvatar({
              name: normalize(ensName),
            });
          }

          setEnsName(ensName);
          setEnsAvatar(ensAvatar);
        } catch (err: any) {
          console.error("error getting end", err);
        }
      };
      getEnsCredentials();
    }
  }, [walletClientMainnet]);

  const fetchWalletBalance = async (
    walletClient: any,
    address: any,
    connectedAddress: any
  ) => {
    try {
      const balance = await walletClient?.getBalance({
        address,
      });
      const connectedBalance = await walletClient?.getBalance({
        address: connectedAddress,
      });
      const formattedBalance = Number(formatUnits(balance, 18)).toFixed(5);
      const formattedConnectedBalance = Number(
        formatUnits(connectedBalance, 18)
      ).toFixed(5);
      setConnectedWalletBalance(formattedConnectedBalance);
      setEmbeddedWalletBalance(formattedBalance);
    } catch (err: any) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    let intervalId: any;

    if (walletClient && wallet.account?.address) {
      // Run the function immediately on component mount
      fetchWalletBalance(walletClient, wallet.account.address, cachedAddress);

      // Set up an interval to run the function every 20 seconds
      intervalId = setInterval(() => {
        fetchWalletBalance(
          walletClient,
          wallet.account?.address,
          cachedAddress
        );
      }, 20000); // 20 seconds interval
    }

    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [wallet, walletClient]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDisconnectVisible, setIsDisconnectVisible] = useState(false);

  useEffect(() => {
    if (isDisconnectOpen) {
      setIsDisconnectVisible(true);
    }
  }, [isDisconnectOpen]);
  useEffect(() => {
    if (
      isMintOpen ||
      isExploreMintOpen ||
      isCollectionMintOpen ||
      isReportOpen
    ) {
      setIsModalVisible(true);
    }
  }, [isMintOpen, isExploreMintOpen, isCollectionMintOpen, isReportOpen]);

  const router = useRouter();
  console.log("mintingStatus", mintingStatus);
  useEffect(() => {
    const handleDeepLink = (event: any) => {
      const { url } = event;
      handleResponse(url as any);

      const parsed = Linking.parse(url);
      console.log("ppppparsed", parsed);
      // If the deep link is trying to navigate to "login", abandon the event.
      if (parsed.path === "login") {
        router.dismiss();
        if (mintingStatus.status === "minting") {
          setMintingStatus("minted");
        }

        console.log(
          "Abandoning navigation to /login because user is on swipe layout."
        );
        return;
      }

      // Otherwise, let the default navigation occur
      // router.push(url);
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, [router]);

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          gestureDirection: "horizontal",
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="(main)"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="collection"
          options={{
            headerShown: false,
            animation: "ios",
          }}
        />
      </Stack>

      <Status />
      <StatusSuccess />
      <ErrorMint />
      <ErrorFunds />

      {pathname.includes("/collection") &&
        pathname.split("/").length === 4 &&
        activeCollectionNft !== null &&
        isModalVisible && (
          <MintModal
            activeNft={activeCollectionNft}
            setIsOpen={setIsCollectionMintOpen}
            isOpen={isCollectionMintOpen}
            setIsExploreFeedVisible={setIsModalVisible}
          />
        )}
      {pathname.includes("/swipe") &&
        activeSwipeNft !== null &&
        isModalVisible && (
          <MintModal
            activeNft={activeSwipeNft}
            setIsOpen={setMintOpen}
            isOpen={isMintOpen}
            setIsExploreFeedVisible={setIsModalVisible}
          />
        )}
      {pathname.includes("/explore") &&
        activeExploreNft !== null &&
        isModalVisible && (
          <MintModal
            setIsExploreFeedVisible={setIsModalVisible}
            activeNft={activeExploreNft}
            setIsOpen={setIsExploreMintOpen}
            isOpen={isExploreMintOpen}
          />
        )}
      {pathname.includes("/wallet") && isModalVisible && (
        <ReportModal setIsModalVisible={setIsModalVisible} />
      )}

      {pathname.includes("/wallet") && isDisconnectVisible && (
        <DisconnectModal setIsModalVisible={setIsDisconnectVisible} />
      )}

      <NavigationHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    zIndex: 5,
  },
});
