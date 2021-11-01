import { project } from "cmdo-events";

import { collection } from "../Lib/Collections";
import { BlockAdded } from "../Stores";

project.on(BlockAdded, async ({ data }) => {
  await collection.blocks.insertOne({ ...data });
  for (const tx of data.tx) {
    await collection.transactions.insertOne({
      height: data.height,
      ...tx
    });
  }
});
