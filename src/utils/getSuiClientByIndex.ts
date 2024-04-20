import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";

function getSuiClient(
  network: "mainnet" | "testnet",
  type: "mysten" | "shinami" | "blastapi" = "mysten"
) {
  let url: string = getFullnodeUrl(network);
  if (type === "shinami") {
    if (network === "mainnet" && process.env.SHINAMI_NODE_SERVICE_KEY_MAINNET) {
      url = `https://api.shinami.com:443/node/v1/${process.env.SHINAMI_NODE_SERVICE_KEY_MAINNET}`;
    } else if (
      network === "testnet" &&
      process.env.SHINAMI_NODE_SERVICE_KEY_MAINNET
    ) {
      url = `https://api.shinami.com:443/node/v1/${process.env.SHINAMI_NODE_SERVICE_KEY_TESTNET}`;
    }
  } else if (type === "blastapi") {
    if (network === "mainnet" && process.env.BLASTAPI_SUI_ENDPOINT_MAINNET) {
      url = process.env.BLASTAPI_SUI_ENDPOINT_MAINNET;
    } else if (
      network === "testnet" &&
      process.env.BLASTAPI_SUI_ENDPOINT_TESTNET
    ) {
      url = process.env.BLASTAPI_SUI_ENDPOINT_TESTNET;
    }
  }
  return new SuiClient({ url });
}
export function getSuiClientByIndex(
  network: "mainnet" | "testnet",
  index: number
) {
  const type = ["mysten", "blastapi", "shinami"];
  const targetType: any = type[index % type.length];
  return getSuiClient(network, targetType);
}
