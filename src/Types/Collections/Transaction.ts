import * as Blockchain from "../Blockchain";

export type Transaction = {
  hash: string;
  block: {
    hash: string;
    height: number;
  };
  addresses: string[];
  inputs: Blockchain.Transaction["vin"];
  outputs: Blockchain.Transaction["vout"];
};
