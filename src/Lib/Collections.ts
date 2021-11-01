import { Descriptor } from "cmdo-events";

import { Block } from "../Types/Block";
import { Transaction } from "../Types/Transaction";
import { mongo } from "./Mongo";

export const collection = {
  events: mongo.collection<Descriptor>("events"),
  blocks: mongo.collection<Block>("blocks"),
  transactions: mongo.collection<{ height: number } & Transaction>("transactions")
};

export async function setCollectionIndexes() {
  await setBlockIndexes();
  await setTransactionIndexes();
}

async function setBlockIndexes() {
  await collection.blocks.createIndexes([
    { key: { hash: 1 }, unique: true },
    { name: "height", key: { height: 1 } }
  ]);
}

async function setTransactionIndexes() {
  await collection.transactions.createIndexes([
    { key: { hash: 1 }, unique: true },
    { name: "height", key: { height: 1 } },
    { name: "address", key: { "vout.scriptPubKey.addresses": 1 } }
  ]);
}
