import { collection } from "../Lib/Collections";
import { stores } from "../Stores";
import { Block } from "../Stores/Block/Aggregate";
import { BlockQuery } from "../Types/Block";

export const blocks = new (class Blocks {
  public async process(blocks: Block[]) {
    for (const block of blocks) {
      await stores.block.add(block);
    }
  }

  public async get({ maxHeight }: BlockQuery) {
    const filter: any = {};
    if (maxHeight !== undefined) {
      filter.height = {
        $lte: parseInt(maxHeight)
      };
    }
    return collection.blocks.find(filter).toArray();
  }

  public async getByHash(hash: string) {
    return collection.blocks.findOne({ hash });
  }
})();
