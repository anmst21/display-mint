export function truncateEthAddress(address: string): string {
  if (!address) return "";

  // // Ensure the address is valid before truncating
  // if (address.length !== 42 || !address.startsWith("0x")) {
  //   throw new Error("Invalid Ethereum address");
  // }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
