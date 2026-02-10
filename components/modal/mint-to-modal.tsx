import ModalCloseBar from "./modal-close-bar";
import { useState, useRef, useMemo, useCallback } from "react";
import MintBtn from "./modal-mint-btn";
import { ChevModal, ModalSwitch, BaseIconSm, WalletFeed } from "../icon";
import { ScreenPosition } from "./types";
import { useEmbeddedWallet } from "@privy-io/expo";
import {
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import { storage } from "@/context/storage";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import MintToItem from "./mint-to-item";
import { MintToOptions, PaymentMethod } from "./types";
import { publicViemClient } from "./mint-modal";
import { Address, isAddress } from "viem";
import { normalize } from "viem/ens";

import { truncateEthAddress } from "@/utils";
import { add } from "@shopify/react-native-skia";

interface MintToModalProps {
  animatedRef: any;
  page: ScreenPosition;
  setHeight: (value: number) => void;
  mintToOption: MintToOptions;
  setMintToOption: (value: MintToOptions) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (value: PaymentMethod) => void;
}

const MintToModal: React.FC<MintToModalProps> = ({
  animatedRef,
  page,
  setHeight,
  mintToOption,
  setMintToOption,
  paymentMethod,
  setPaymentMethod,
}) => {
  const [ensAddress, setEnsAddress] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const payWith = useMemo(() => storage.getString("payWith"), []);
  const [placeholderValue, setPlaceholderValue] =
    useState<string>("Address or ENS");

  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0) {
      setHeight(height);
    }
  }, []);
  console.log("MINT_TO_MODAL", mintToOption);

  const onChangeText = (text: string) => {
    setEnsAddress(text);
  };

  const onSubmitEditing = async () => {
    if (isAddress(ensAddress)) {
      setMintToOption(ensAddress as Address);

      setPlaceholderValue(truncateEthAddress(ensAddress));
      setEnsAddress("");
      if (isError) {
        setIsError(false);
      }
    } else {
      const getEnsAddress = async (ens: string) => {
        try {
          const ensAddress = await publicViemClient.getEnsAddress({
            name: normalize(ens.toLowerCase()),
          });
          return ensAddress;
        } catch (err) {
          console.warn(err);
          return null;
        }
      };
      const address = await getEnsAddress(ensAddress);
      if (isAddress(address as Address)) {
        setMintToOption(address as Address);

        setPlaceholderValue(ensAddress.toLowerCase());
        setEnsAddress("");
        setIsError(false);
      } else {
        setIsError(true);
        setEnsAddress("");
        setPlaceholderValue("Address or ENS");
        setMintToOption(undefined);
        storage.delete("mintTo");
      }
    }

    setIsSubmitted(true);
  };
  return (
    <>
      {page !== ScreenPosition.initial && (
        <TouchableWithoutFeedback>
          <View onLayout={handleLayout} style={styles.container}>
            <ModalCloseBar />
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => {
                  animatedRef.current?.scrollTo({
                    x: 0,
                    animated: true,
                  });
                }}
                style={styles.backBtn}
              >
                <ChevModal />
              </TouchableOpacity>
              <Text style={styles.modalHeader}>
                {page === ScreenPosition.payment ? "Payment method" : "Mint to"}
              </Text>
            </View>
            {page === ScreenPosition.recieve && (
              <>
                <TouchableOpacity
                  onPress={handlePress}
                  style={[
                    styles.box,
                    {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      marginVertical: 20,
                    },
                  ]}
                >
                  <View style={styles.pfpPlaceholder} />
                  <TextInput
                    ref={inputRef}
                    placeholder={placeholderValue}
                    placeholderTextColor="#8E8E93"
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={ensAddress}
                    onSubmitEditing={onSubmitEditing}
                  />
                  {isSubmitted && isError && (
                    <Text style={styles.errorText}>
                      Please enter a valid Address or Ens.
                    </Text>
                  )}
                  <ModalSwitch
                    isActive={
                      mintToOption !== undefined && mintToOption !== "embedded"
                    }
                  />
                </TouchableOpacity>
                <View style={styles.gap}>
                  <MintToItem
                    callback={() => {
                      setMintToOption(undefined);
                      //    storage.delete("mintTo");
                    }}
                    type="coinbase"
                    isActive={mintToOption === undefined}
                  />
                  <MintToItem
                    callback={() => {
                      setMintToOption("embedded");
                      //   storage.set("mintTo", "embedded");
                    }}
                    type="embedded"
                    isActive={mintToOption === "embedded"}
                  />
                </View>
              </>
            )}
            {page === ScreenPosition.payment && (
              <View style={styles.gap}>
                <MintToItem
                  callback={() => {
                    setPaymentMethod("coinbase");
                    //      storage.set("payWith", "coinbase");
                  }}
                  type="coinbase"
                  isActive={paymentMethod === "coinbase"}
                />
                <MintToItem
                  callback={() => {
                    setPaymentMethod(undefined);
                    //        storage.delete("payWith");
                  }}
                  type="embedded"
                  isActive={paymentMethod === undefined}
                />
              </View>
            )}
            <Text style={styles.textGrey}>
              If you do not save, this setting will affect only this mint.
            </Text>

            <MintBtn
              callback={() => {
                animatedRef.current?.scrollTo({
                  x: 0,
                  animated: true,
                });
                if (page === ScreenPosition.payment) {
                  if (!paymentMethod) {
                    storage.delete("payWith");
                  } else {
                    storage.set("payWith", "coinbase");
                  }
                }
                if (page === ScreenPosition.recieve) {
                  if (mintToOption === undefined) {
                    storage.delete("mintTo");
                  } else if (mintToOption === "embedded") {
                    storage.set("mintTo", "embedded");
                  } else {
                    storage.set("mintTo", mintToOption);
                  }
                }
              }}
              value="Save"
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};
//

const styles = StyleSheet.create({
  textGrey: {
    fontFamily: "SF-Pro",
    fontSize: 13,
    color: "#8E8E93",
    lineHeight: 16,
    bottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 20,
  },
  backBtn: {
    zIndex: 5,
    position: "absolute",
    left: 0,
    top: -2,
    transform: [{ rotate: "180deg" }],
    width: 24,
    alignItems: "flex-end",
  },
  modalHeader: {
    fontFamily: "SFPro-ExpandedBold",
    fontSize: 17,
    color: "white",
    textAlign: "center",
    width: "100%",
  },
  pfpPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: "grey",
    borderRadius: 1000,
  },
  input: {
    fontFamily: "SFPro-Medium",
    fontSize: 13,
    color: "white",
    flex: 1,
  },
  gap: { marginBottom: 20 },
  textWrapper: { gap: 5, flex: 1 },
  container: {
    width: screenWidth - 50,
    backgroundColor: "#1C1C1D",
    padding: 25,
    paddingTop: 0,
    borderRadius: 25,
    borderCurve: "continuous",
  },
  errorText: {
    position: "absolute",
    bottom: -20,
    color: "#DF5555",
    fontSize: 13,
    marginTop: 8,
    fontFamily: "SFPro-Medium",
  },
  boxAddress: {
    fontSize: 13,
    fontFamily: "SF-Pro",
    color: "rgba(142, 142, 147, 1)",
  },
  boxHeader: {
    fontFamily: "SFPro-BoldItalic",
    color: "white",
    fontSize: 13,
  },
  box: {
    height: 50,
    padding: 10,
    gap: 10,
    borderRadius: 13,
    borderCurve: "continuous",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default MintToModal;
