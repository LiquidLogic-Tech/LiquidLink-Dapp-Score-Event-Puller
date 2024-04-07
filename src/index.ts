import { kv } from "@vercel/kv";

import dotenv from "dotenv";
dotenv.config();
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

const suiClient = new SuiClient({
  url: getFullnodeUrl((process.env.NETWORK as any) || "mainnet"),
});

console.log("HI");
async function main() {
  const event_type = process.env.EVENT_TYPE as string;
  const kv_key = `liquiddlink_event_puller_${event_type}`;
  //   await kv.set("liqudidlink_event_puller", "Demo");
  //   const session = await kv.get("liqudidlink_event_puller");
  //   console.log({ session });
  let nextCursor = await kv.get(kv_key);
  while (true) {
    while (true) {
      const events = await suiClient.queryEvents({
        query: {
          MoveEventType:
            // "0xf145ee6d09aae034924f80672bc76db2415dfd1b1bed863ac289af9d94e2c4fc::single_oracle::ParsePriceEvent",
            event_type,
        },
        cursor: (nextCursor as any) || null,
      });
      events.data.forEach(async (event) => {
        console.log("Process", event.id.txDigest);
        // todo: push the txDigest to the backend.
      });
      // sleep 3 seconds  before next query

      nextCursor = events.nextCursor;
      await kv.set(kv_key, nextCursor);
      if (events.hasNextPage === false) {
        // push cursor to KV by event type
        break;
      }
    }
    console.log("Sleep 3 second...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

main().catch(console.error);
