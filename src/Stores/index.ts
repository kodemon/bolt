/*
 |--------------------------------------------------------------------------------
 | Events
 |--------------------------------------------------------------------------------
 */

import { BlockAdded } from "./Block/Events/BlockAdded";
import { BlockInvalidated } from "./Block/Events/BlockInvalidated";

export type Event = BlockAdded | BlockInvalidated;

export const events = {
  BlockAdded,
  BlockInvalidated
};

export { BlockAdded, BlockInvalidated };

/*
 |--------------------------------------------------------------------------------
 | Stores
 |--------------------------------------------------------------------------------
 */

import * as block from "./Block/Store";

export const stores = {
  block
};
