import { Reducer } from "cmdo-events";

import { Block } from "./Aggregate";
import { BlockAdded } from "./Events/BlockAdded";
import { BlockInvalidated } from "./Events/BlockInvalidated";

export const reducer = new Reducer<Block & { invalidated?: boolean }>()
  .set(BlockAdded, (state, { data }) => {
    return {
      ...state,
      ...data,
      invalidated: false
    };
  })
  .set(BlockInvalidated, (state) => {
    return {
      ...state,
      invalidated: true
    };
  });
