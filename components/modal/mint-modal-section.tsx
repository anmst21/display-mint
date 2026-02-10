import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ChevModal, InputMinus, InputPlus, EthSmall } from "../icon";
import { useRef } from "react";
import * as Haptics from "expo-haptics";
import { truncateEthAddress } from "@/utils";
import { MintToOptions, PaymentMethod } from "./types";

const MintModalSection = ({
  embeddedWalletAddress,
  inputValue,
  setInputValue,
  callbackMintTo,
  callbackPayment,
  address,
  mintTo,
  paymentMethod,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  callbackMintTo: () => void;
  callbackPayment: () => void;
  address: string | undefined;
  mintTo: MintToOptions;
  paymentMethod: PaymentMethod;
  embeddedWalletAddress: string | undefined;
}) => {
  const toMintRef = useRef<TextInput>(null);

  const addToMint = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const number = Number(inputValue) + 1;
    setInputValue(number.toString());
  };
  const substractToMint = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const number = Number(inputValue) - 1;
    if (number <= 0) return;

    setInputValue(number.toString());
  };

  return (
    <View style={{ height: 200 }}>
      <View style={styles.quantity}>
        <View style={[styles.item, styles.greyBg]}>
          <Text style={styles.textGrey}>Quantity</Text>
        </View>
        <View style={styles.subDiv}>
          <TouchableOpacity style={styles.inputPlus} onPress={substractToMint}>
            <InputMinus />
          </TouchableOpacity>
          <TextInput
            ref={toMintRef}
            placeholder="1"
            placeholderTextColor="#8E8E93"
            style={styles.textInput}
            onChangeText={setInputValue}
            keyboardType="numeric"
            value={inputValue}
          />
          <TouchableOpacity style={styles.inputPlus} onPress={addToMint}>
            <InputPlus />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.item]}>
        <Text style={styles.textGrey}>Total</Text>
        <View style={styles.modalNavBtn}>
          <Text style={styles.textWhite}>
            {(0.0001 * Number(inputValue)).toFixed(5)}
          </Text>
          <EthSmall />
        </View>
      </View>

      <View style={[styles.item, styles.greyBg]}>
        <Text style={styles.textGrey}>Mint to</Text>
        <TouchableOpacity onPress={callbackMintTo} style={styles.modalNavBtn}>
          <Text style={styles.textWhite}>
            {mintTo === undefined && truncateEthAddress(address as string)}
            {mintTo === "embedded" &&
              truncateEthAddress(embeddedWalletAddress as string)}
            {mintTo !== "embedded" &&
              mintTo !== undefined &&
              truncateEthAddress(mintTo as string)}
          </Text>
          <ChevModal />
        </TouchableOpacity>
      </View>

      <View style={[styles.item]}>
        <Text style={styles.textGrey}>Payment Method</Text>
        <TouchableOpacity onPress={callbackPayment} style={styles.modalNavBtn}>
          <Text style={styles.textWhite}>
            {paymentMethod === undefined && "Embedded Wallet"}
            {paymentMethod === "coinbase" &&
              truncateEthAddress(address as string)}
          </Text>
          <ChevModal />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quantity: {
    height: 50,
    flexDirection: "row",
    gap: 10,
  },
  inputPlus: { height: "100%", justifyContent: "center" },
  textInput: {
    fontFamily: "SFPro-ExpandedMedium",
    fontSize: 13,
    color: "white",
    minWidth: 30,
    textAlign: "center",
  },
  greyBg: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  modalNavBtn: { height: 50, alignItems: "center", flexDirection: "row" },
  textGrey: {
    fontFamily: "SFPro-Medium",
    fontSize: 13,
    color: "#8E8E93",
  },
  textWhite: {
    fontFamily: "SFPro-Medium",
    fontSize: 13,
    color: "white",
  },
  subDiv: {
    backgroundColor: "rgba(242, 242, 247, 0.20)",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 13,
    borderCurve: "continuous",
  },
  item: {
    //  backgroundColor: "yellow",
    justifyContent: "space-between",
    flex: 1,
    flexGrow: 1,
    borderRadius: 13,
    borderCurve: "continuous",
    // padding: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
  },
});

export default MintModalSection;
