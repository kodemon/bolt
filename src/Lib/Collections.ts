import { Descriptor } from "cmdo-events";

import { Address } from "../Types/Collections/Address";
import { Block } from "../Types/Collections/Block";
import { Transaction } from "../Types/Collections/Transaction";
import { mongo } from "./Mongo";

export const collection = {
  events: mongo.collection<Descriptor>("events"),
  blocks: mongo.collection<Block>("blocks"),
  transactions: mongo.collection<Transaction>("transactions"),
  addresses: mongo.collection<Address>("addresses")
};

export async function dropDatabase() {
  await Promise.all(Object.values(collection).map((collection) => collection.drop()));
  await setCollectionIndexes();
}

export async function setCollectionIndexes() {
  await setBlockIndexes();
  await setTransactionIndexes();
  await setAddressIndexes();
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
    { name: "blockHash", key: { "block.hash": 1 } },
    { name: "blockHeight", key: { "block.height": 1 } }
  ]);
}

async function setAddressIndexes() {
  await collection.addresses.createIndexes([{ key: { address: 1 }, unique: true }]);
}
