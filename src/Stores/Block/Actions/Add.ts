import { action } from "cmdo-events";

import { Block } from "../Aggregate";
import { BlockAdded } from "../Events/BlockAdded";

export const add = action<Block>(async function (data, { store }) {
  await store.save([data.hash], new BlockAdded(data));
});
