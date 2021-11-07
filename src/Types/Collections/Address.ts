import { Transaction } from "../Blockchain";

export type Address = {
  address: string;
  meta: {
    transactions: number;
  };
  transactions: {
    hash: string;
    block: {
      hash: string;
      height: number;
    };
    inputs: Transaction["vin"];
    outputs: Transaction["vout"];
  }[];
};
