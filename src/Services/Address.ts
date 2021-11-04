import { collection } from "../Lib/Collections";
import { Transaction } from "../Types/Blockchain";

export const addresses = new (class Addresses {
  /*
   |--------------------------------------------------------------------------------
   | Index Operations
   |--------------------------------------------------------------------------------
   */

  public async index(address: string, transaction: Transaction) {
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
        transactions: 1,
        total: {
          received: 0,
          sent: 0,
          balance: 0
        }
      },
      transactions: [
        {
          hash: transaction.hash,
          inputs: transaction.vin,
          outputs: transaction.vout
        }
      ]
    });
  }

  /*
   |--------------------------------------------------------------------------------
   | Read Operations
   |--------------------------------------------------------------------------------
   */

  public async getByAddress(address: string) {
    return collection.addresses.find({ address }).toArray();
  }
})();
