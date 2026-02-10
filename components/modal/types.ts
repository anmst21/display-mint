import { Address } from "viem";

export enum ScreenPosition {
  initial = "initial",
  payment = "payment",
  recieve = "recieve",
}

export type MintToOptions = undefined | "embedded" | Address;

export type PaymentMethod = undefined | "coinbase";
