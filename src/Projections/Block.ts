import { projection } from "cmdo-events";

import { addresses } from "../Services/Addresses";
import { blocks } from "../Services/Blocks";
import { transactions } from "../Services/Transactions";
import { BlockAdded } from "../Stores";
import { BlockInvalidated } from "../Stores/Block/Events/BlockInvalidated";

projection.on(BlockAdded, async ({ data }) => {
  blocks.index(data);
  for (const transaction of data.tx) {
    transactions.index(data, transaction);
    for (const address of transactions.getTransactionAddresses(transaction.vout)) {
      addresses.index(address, data, transaction);
    }
  }
});

projection.on(BlockInvalidated, async ({ data }) => {
  for (const transaction of data.tx) {
    for (const address of transactions.getTransactionAddresses(transaction.vout)) {
      addresses.rollback(address, transaction);
    }
  }
  transactions.rollback(data);
  blocks.rollback(data);
});
