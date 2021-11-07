import { collection } from "../Lib/Collections";
import { Block, Transaction } from "../Types/Blockchain";

export const addresses = new (class Addresses {
  /*
   |--------------------------------------------------------------------------------
   | Index Operations
   |--------------------------------------------------------------------------------
   */

  public async index(address: string, block: Block, transaction: Transaction) {
    const record = await collection.addresses.findOne({ address });
    if (record) {
      return collection.addresses.updateOne(
        { address },
        {
          $inc: {
            "meta.transactions": 1
          },
          $push: {
            transactions: {
              hash: transaction.hash,
              block: {
                hash: block.hash,
                height: block.height
              },
              inputs: transaction.vin,
              outputs: transaction.vout
            }
          }
        }
      );
    }
    return collection.addresses.insertOne({
      address,
      meta: {
        transactions: 1
      },
      transactions: [
        {
          hash: transaction.hash,
          block: {
            hash: block.hash,
            height: block.height
          },
          inputs: transaction.vin,
          outputs: transaction.vout
        }
      ]
    });
  }

  public async rollback(address: string, { hash }: Transaction) {
    return collection.addresses.updateOne(
      { address },
      {
        $inc: {
          "meta.transactions": -1
        },
        $pull: {
          transactions: {
            hash
          }
        }
      }
    );
  }

  /*
   |--------------------------------------------------------------------------------
   | Read Operations
   |--------------------------------------------------------------------------------
   */

  public async get(address: string) {
    return collection.addresses.findOne({ address });
  }
})();
