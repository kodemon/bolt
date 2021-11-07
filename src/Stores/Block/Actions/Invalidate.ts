import { action } from "cmdo-events";

import { BlockInvalidated } from "../Events/BlockInvalidated";
import { reducer } from "../Reducer";

export const invalidate = action<string>(async function (hash, { store }) {
  const block = await store.reduce(reducer, { "event.data.hash": hash });
  if (!block || block.invalidated === true) {
    throw new Error("Block does not exist or has been removed");
  }
  await store.save([hash], new BlockInvalidated(block));
});
