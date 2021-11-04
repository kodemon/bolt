import { collection } from "../Lib/Collections";
import { Block, Transaction } from "../Types/Blockchain";

export const transactions = new (class Transactions {
  /*
   |--------------------------------------------------------------------------------
   | Index Operations
   |--------------------------------------------------------------------------------
   */

  public async index(block: Block, transaction: Transaction) {
    return collection.transactions.insertOne({
      hash: transaction.hash,
      block: {
        hash: block.hash,
        height: block.height
      },
      addresses: this.getTransactionAddresses(transaction.vout),
      inputs: transaction.vin,
      outputs: transaction.vout
    });
  }

  /*
   |--------------------------------------------------------------------------------
   | Read Operations
   |--------------------------------------------------------------------------------
   */

  public async getByHeight(height: number) {
    return collection.transactions.find({ "block.height": height }).toArray();
  }

  public async getByAddress(address: string) {
    return collection.transactions.find({ addresses: address }).toArray();
  }

  /*
   |--------------------------------------------------------------------------------
   | Utilities
   |--------------------------------------------------------------------------------
   */

  public getTransactionAddresses(outputs: Transaction["vout"]) {
    const addresses = new Set<string>();
    for (const output of outputs) {
      if (output.scriptPubKey.addresses) {
        for (const address of output.scriptPubKey.addresses) {
          addresses.add(address);
        }
      }
    }
    return Array.from(addresses);
  }
})();
