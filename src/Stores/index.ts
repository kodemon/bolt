/*
 |--------------------------------------------------------------------------------
 | Events
 |--------------------------------------------------------------------------------
 */

import { BlockAdded } from "./Block/Events/BlockAdded";

export type Event = BlockAdded;

export const events = {
  BlockAdded
};

export { BlockAdded };

/*
 |--------------------------------------------------------------------------------
 | Stores
 |--------------------------------------------------------------------------------
 */

import * as block from "./Block/Store";

export const stores = {
  block
};
