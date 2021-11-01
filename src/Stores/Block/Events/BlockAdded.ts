import { Event } from "cmdo-events";

import { Block } from "../Aggregate";

export class BlockAdded extends Event<Block> {
  public static readonly type = "BlockAdded" as const;
}
