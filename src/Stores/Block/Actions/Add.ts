import { action } from "cmdo-events";

import { Block } from "../Aggregate";
import { BlockAdded } from "../Events/BlockAdded";
import { reducer } from "../Reducer";

export const add = action<Block>(async function (data, { store }) {
  const block = await store.reduce(reducer, { "event.data.hash": data.hash });
  if (block && block.invalidated === false) {
    throw new Error("Block already exist");
  }
  await store.save([data.hash], new BlockAdded(data));
});
