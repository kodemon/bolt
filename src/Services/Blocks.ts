import { collection } from "../Lib/Collections";
import { stores } from "../Stores";
import { Block } from "../Stores/Block/Aggregate";

type QueryOptions = {
  maxHeight?: string;
};

export const blocks = new (class Blocks {
  /*
   |--------------------------------------------------------------------------------
   | Event Source Operations
   |--------------------------------------------------------------------------------
   */

  public async add(block: Block) {
    return stores.block.add(block);
  }

  /*
   |--------------------------------------------------------------------------------
   | Index Operations
   |--------------------------------------------------------------------------------
   */

  public async index(block: Block) {
    return collection.blocks.insertOne(block);
  }

  public async invalidate(hash: string) {
    const block = await collection.blocks.findOne({ hash });
    if (block) {
      console.log("Invalidate block", block);
    }
  }

  /*
   |--------------------------------------------------------------------------------
   | Read Operations
   |--------------------------------------------------------------------------------
   */

  public async get({ maxHeight }: QueryOptions) {
    if (maxHeight) {
      return this.getByMaxHeight(parseInt(maxHeight));
    }
    return collection.blocks.find().toArray();
  }

  public async getByMaxHeight(maxHeight: number) {
    return collection.blocks
      .find({
        height: {
          $lte: maxHeight
        }
      })
      .toArray();
  }

  public async getByHash(hash: string) {
    return collection.blocks.findOne({ hash });
  }
})();
