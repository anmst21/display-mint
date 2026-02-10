import { View, Text, StyleSheet } from "react-native";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Image } from "expo-image";
import MintBtn from "./modal-mint-btn";
import MintModalSection from "./mint-modal-section";
import ModalCloseBar from "./modal-close-bar";
import CommentInput from "./comment-input";
import { useContext } from "react";
import { Context } from "@/context/FeedContext";
import { truncateEthAddress } from "@/utils";
import { getClient, Execute } from "@reservoir0x/reservoir-sdk";
import { base, mainnet } from "viem/chains";
import { createWalletClient, custom } from "viem";
import { isNotCreated } from "@privy-io/expo";
import { useEmbeddedWallet, isConnected } from "@privy-io/expo";
import { storage } from "@/context/storage";
import { recordAction, ActionType, actionComment } from "@/context/actions";
import { ScreenPosition, MintToOptions, PaymentMethod } from "./types";
import TextTicker from "react-native-text-ticker";
import { provider } from "@/app/_layout";
import { splitContractAddress } from "@/constants/baseContract";

import { createPublicClient, http } from "viem";
import { useFocusEffect } from "expo-router";
const targetChainHex = "0x2105";

export const publicViemClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

interface MintModalProps {
  width: number;
  page: ScreenPosition;
  setPage: (value: ScreenPosition) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  activeNft: any;
  mintTo: MintToOptions;
  paymentMethod: PaymentMethod;
}

const MintModal: React.FC<MintModalProps> = ({
  width,
  setPage,
  isOpen,
  setIsOpen,
  activeNft,
  mintTo,
  paymentMethod,
}) => {
  const [commentText, setCommentText] = useState("");
  const [nftsToMint, setNftsToMint] = useState("1");
  const [activeCoinbaseChain, setActiveCoinbaseChain] = useState<string | null>(
    null
  );
  const wallet = useEmbeddedWallet();
  const cachedAddress = useMemo(() => storage.getString("address"), []);
  const [logMessage, setLogMessage] = useState<string>("input the params");

  const {
    fullUriSm: cacheUri,
    name,
    collection,
    contractAddress,
    tokenId,
    id,
    blurhash,
  } = activeNft;
  const {
    state: { embeddedWalletBalance, ensName },
    setMintingName,
    setMintingStatus,
  } = useContext(Context);

  const getChain = useCallback(async () => {
    const currentChainHex = await provider.request({
      method: "eth_chainId",
      params: [],
    });
    setActiveCoinbaseChain(currentChainHex as string);
  }, [setActiveCoinbaseChain]);

  useFocusEffect(() => {
    if (paymentMethod) {
      getChain();
    }
  });
  // useFocusEffect(getChain);

  console.log("paymentMethod", paymentMethod);
  const walletClient = useMemo(() => {
    if (!wallet || isNotCreated(wallet) || !isConnected(wallet))
      return undefined;
    return createWalletClient({
      chain: base,
      transport: custom(wallet.provider),
    });
  }, [wallet]);

  const coinbaseWalletClient = () => {
    if (!provider) return undefined;

    return createWalletClient({
      chain: base,
      transport: custom(provider),
    });
  };

  //console.log("coinbaseWalletClient", coinbaseWalletClient?.chain.id);

  const buyNFT = useCallback(
    async (
      tokenId: number,
      address: string,
      quantity: number,
      balance: number,
      mintTo: string
    ) => {
      console.log("mmmmmm", mintTo);
      if (balance < 0.0001 * quantity) {
        setLogMessage("Insuficient funds");
        setMintingStatus("funds");
        return;
      }
      if (wallet?.account?.address && cachedAddress && address && tokenId) {
        try {
          setMintingStatus("minting");
          setMintingName(name);

          const buy = await getClient()?.actions.mintToken({
            items: [
              {
                token: address + ":" + tokenId,
                quantity,
              },
            ],
            options: {
              referrer: splitContractAddress,
              relayer: !paymentMethod
                ? wallet?.account?.address
                : cachedAddress,
              taker: mintTo,
              skipBalanceCheck: true,
            },
            chainId: 8453,
            wallet: !paymentMethod
              ? walletClient
              : (coinbaseWalletClient() as any),
            onProgress: (steps) => {
              setLogMessage(JSON.stringify(steps));
            },
          });
          setMintingStatus("minted");
          await recordAction({
            actionType: ActionType.MintSuccess,
            postId: id,
          });
          await actionComment({
            message: commentText,
            postId: id,
          });
          setLogMessage(
            "Successfully purchased a token, check your wallet client to see the minted asset " +
              buy
          );
        } catch (error: any) {
          console.error("Error buying token:", error);
          setLogMessage("Error buying token: " + error.message);
          setMintingStatus("error");
        }
      } else {
        setLogMessage("Input the params to proceed");
      }
    },
    [
      wallet,
      cachedAddress,
      setLogMessage,
      setMintingStatus,
      setMintingName,
      name,
      getClient,
      splitContractAddress,
      paymentMethod,
      walletClient,
      coinbaseWalletClient,
      recordAction,
      id,
      actionComment,
      commentText,
    ]
  );
  useEffect(() => {
    if (!isOpen) {
      setCommentText("");
      setNftsToMint("1");
    }
  }, [isOpen]);
  console.log("mintTo", mintTo);

  const mintBtn = useCallback(() => {
    const resolveToAddress = () => {
      if (mintTo === "embedded") {
        return wallet.account?.address;
      } else if (mintTo === undefined) {
        return cachedAddress;
      } else {
        return mintTo;
      }
    };

    const mintToAddress = resolveToAddress();
    buyNFT(
      tokenId,
      contractAddress,
      Number(nftsToMint),
      //   0.0000001
      Number(embeddedWalletBalance),
      mintToAddress as string
    );
    setIsOpen(false);
  }, [buyNFT]);

  const openMintTo = useCallback(() => {
    setPage(ScreenPosition.recieve);
  }, []);
  const openPaymentMethod = useCallback(() => {
    setPage(ScreenPosition.payment);
  }, []);

  return (
    <View style={[styles.modalContainer, { width }]}>
      <ModalCloseBar />
      <View style={styles.headerContainer}>
        <Image
          contentFit="contain"
          style={styles.mintImg}
          //  placeholder={{ blurhash }}
          //  transition={400}
          source={{ uri: cacheUri }}
        />

        <View style={styles.textContainer}>
          {isOpen && (
            <TextTicker
              duration={10000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}
              style={styles.textTick}
            >
              {name}
            </TextTicker>
          )}

          <Text style={styles.address}>{truncateEthAddress(collection)}</Text>
        </View>
      </View>
      <CommentInput
        ensName={ensName || truncateEthAddress(cachedAddress as string)}
        commentText={commentText}
        setCommentText={setCommentText}
      />
      <MintModalSection
        embeddedWalletAddress={wallet.account?.address}
        mintTo={mintTo}
        paymentMethod={paymentMethod}
        callbackPayment={openPaymentMethod}
        callbackMintTo={openMintTo}
        inputValue={nftsToMint}
        setInputValue={setNftsToMint}
        address={cachedAddress}
      />
      {paymentMethod && activeCoinbaseChain !== targetChainHex ? (
        <MintBtn
          value="Switch Chain"
          callback={async () => {
            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: targetChainHex }],
            });
          }}
        />
      ) : (
        <MintBtn callback={mintBtn} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  address: {
    fontFamily: "SFPro-SemiboldItalic",
    fontSize: 13,
    color: "rgba(142, 142, 147, 1)",
  },
  textTick: {
    fontFamily: "SFPro-ExpandedBold",
    fontSize: 17,
    color: "white",
  },
  mintImg: {
    width: "100%",
    flex: 1,
    height: 150,
  },
  modalContainer: {
    // height: "100%",
    backgroundColor: "#1C1C1D",
    borderRadius: 25,
    borderCurve: "continuous",
    padding: 25,
    paddingTop: 0,
    gap: 20,
    flex: 1,
    flexGrow: 1,
  },
  pfpPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: "grey",
    borderRadius: 100,
  },
  commentContainer: {
    height: 50,
    alignItems: "center",
    padding: 10,
    gap: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 13,
    borderCurve: "continuous",
    flexDirection: "row",
  },
  textContainer: { gap: 5, alignItems: "center" },
  headerContainer: {
    paddingTop: 35,
    paddingBottom: 20,
    alignItems: "center",
    gap: 15,
  },
});

export default MintModal;
