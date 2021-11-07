import { Event } from "cmdo-events";

import { Block } from "../Aggregate";

export class BlockInvalidated extends Event<Block> {
  public static readonly type = "BlockInvalidated" as const;
}
