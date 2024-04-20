import { kv } from "@vercel/kv";

import dotenv from "dotenv";
dotenv.config();

const network = (process.env.NETWORK as any) || "mainnet";

import { getLiquidLinkDappScorePackageId } from "liquidlink";
import axios from "axios";
import { getSuiClientByIndex } from "./utils/getSuiClientByIndex";
import { sleep } from "./utils/sleep";

async function main() {
  const package_id = getLiquidLinkDappScorePackageId(network);
  console.log({ network, package_id });
  const kv_key = `liquidlink_event_puller_${network}_${package_id}`;
  let nextCursor = await kv.get(kv_key);
  let index = 0;
  while (true) {
    while (true) {
      let blocks;
      try {
        const suiClient = getSuiClientByIndex(network, index);
        blocks = await suiClient.queryTransactionBlocks({
          filter: {
            InputObject: package_id,
          },
          cursor: (nextCursor as any) || undefined,
          order: "ascending",
        });
      } catch (e) {
        index += 1;
        console.error(e);
        continue;
      }

      blocks.data.forEach(async (block) => {
        console.log("Process: ", block.digest);
        const result = await axios.post(
          "https://backend.liquidlink.io/api/process_tx",
          {
            tx_digest: block.digest,
            network,
          }
        );
        console.log(result.data);
      });

      nextCursor = blocks.nextCursor;
      await kv.set(kv_key, nextCursor);
      if (blocks.hasNextPage === false) {
        // push cursor to KV by event type
        break;
      }
    }
    console.log("sleep 3 second");
    console.log({ network, nextCursor });
    await sleep(3);
  }
}

main().catch(console.error);
