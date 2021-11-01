import { Reducer } from "cmdo-events";

import { Block } from "./Aggregate";
import { BlockAdded } from "./Events/BlockAdded";

export const reducer = new Reducer<Block>().set(BlockAdded, (_, { data }) => {
  return data;
});
