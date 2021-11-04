import { Transaction } from "../Blockchain";

export type Address = {
  address: string;
  meta: {
    transactions: number;
    total: {
      received: number;
      sent: number;
      balance: number;
    };
  };
  transactions: {
    hash: string;
    inputs: Transaction["vin"];
    outputs: Transaction["vout"];
  }[];
};
