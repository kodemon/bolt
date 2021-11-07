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
      inputs: transaction.vin,
      outputs: transaction.vout
    });
  }

  public async rollback({ hash }: Block) {
    return collection.transactions.deleteMany({ "block.hash": hash });
  }

  /*
   |--------------------------------------------------------------------------------
   | Read Operations
   |--------------------------------------------------------------------------------
   */

  public async getByHash(hash: string) {
    return collection.transactions.find({ "block.hash": hash }).toArray();
  }

  public async getByHeight(height: number) {
    return collection.transactions.find({ "block.height": height }).toArray();
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
