import { project } from "cmdo-events";

import { addresses } from "../Services/Address";
import { blocks } from "../Services/Blocks";
import { transactions } from "../Services/Transactions";
import { BlockAdded } from "../Stores";

project.on(BlockAdded, async ({ data }) => {
  const block = { ...data };
  await blocks.index(block);
  for (const transaction of block.tx) {
    await transactions.index(block, transaction);
    for (const address of transactions.getTransactionAddresses(transaction.vout)) {
      await addresses.index(address, transaction);
    }
  }
});
