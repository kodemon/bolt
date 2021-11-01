import { collection } from "../Lib/Collections";

export const transactions = new (class Transactions {
  public async getByHeight(height: number) {
    return collection.transactions.find({ height }).toArray();
  }

  public async getByAddress(address: string) {
    return collection.transactions.find({ "vout.scriptPubKey.addresses": address }).toArray();
  }
})();
