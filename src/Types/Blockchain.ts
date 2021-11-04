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

export type Transaction = {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: VIN[];
  vout: VOUT[];
};

export type VIN = {
  coinbase: string;
  sequence: number;
};

export type VOUT = {
  value: number;
  n: number;
  scriptPubKey: ScriptPubKey;
};

export type ScriptPubKey = {
  asm: string;
  hex: string;
  reqSigs: number;
  type: string;
  addresses: string[];
};
