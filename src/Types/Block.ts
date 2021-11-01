import { Transaction } from "./Transaction";

export type Block = {
  hash: string;
  confirmations: number;
  strippedsize: number;
  size: number;
  weight: number;
  height: number;
  mintedBlocks: number;
  stakeModifier: string;
  version: number;
  merkleroot: string;
  nonutxo: NONUTXO[];
  tx: Transaction[];
};

export type NONUTXO = {
  AnchorReward: number;
  IncentiveFunding: number;
};

export type BlockQuery = {
  maxHeight?: string;
};
