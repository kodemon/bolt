import * as Blockchain from "../Blockchain";

export type Transaction = {
  hash: string;
  block: {
    hash: string;
    height: number;
  };
  inputs: Blockchain.Transaction["vin"];
  outputs: Blockchain.Transaction["vout"];
};
