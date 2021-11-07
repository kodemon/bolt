import { projection } from "cmdo-events";

import { addresses } from "../Services/Addresses";
import { blocks } from "../Services/Blocks";
import { transactions } from "../Services/Transactions";
import { BlockAdded } from "../Stores";
import { BlockInvalidated } from "../Stores/Block/Events/BlockInvalidated";

projection.on(BlockAdded, async ({ data }) => {
  console.log("Adding block", data.hash, data.height);
  await blocks.index(data);
  for (const transaction of data.tx) {
    await transactions.index(data, transaction);
    for (const address of transactions.getTransactionAddresses(transaction.vout)) {
      await addresses.index(address, data, transaction);
    }
  }
});

projection.on(BlockInvalidated, async ({ data }) => {
  console.log("Invalidating block", data.hash, data.height);
  for (const transaction of data.tx) {
    for (const address of transactions.getTransactionAddresses(transaction.vout)) {
      await addresses.rollback(address, transaction);
    }
  }
  await transactions.rollback(data);
  await blocks.rollback(data);
});
