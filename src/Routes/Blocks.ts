import { Route } from "cmdo-http";

import { router } from "../Providers/Router";
import { blocks } from "../Services/Blocks";
import { transactions } from "../Services/Transactions";
import { isNumber } from "../Utils/Number";

router.register([
  Route.post("/api/blocks", [
    async function ({ body }) {
      try {
        for (const block of body) {
          await blocks.add(block);
        }
        return this.respond();
      } catch (error) {
        return this.reject(500, error.message);
      }
    }
  ]),
  Route.get("/api/blocks", [
    async function ({ query }) {
      try {
        return this.respond(await blocks.get(query));
      } catch (error) {
        return this.reject(500, error.message);
      }
    }
  ]),
  Route.get("/api/blocks/:hash", [
    async function ({ params: { hash } }) {
      try {
        const block = await blocks.getByHash(hash);
        if (!block) {
          return this.reject(404, "Block does not exist or has been removed");
        }
        return this.respond(block);
      } catch (error) {
        return this.reject(500, error.message);
      }
    }
  ]),
  Route.get("/api/blocks/:target/transactions", [
    async function ({ params: { target } }) {
      try {
        if (isNumber(target)) {
          return this.respond(await transactions.getByHeight(parseInt(target)));
        }
        return this.respond(await transactions.getByHash(target));
      } catch (error) {
        return this.reject(500, error.message);
      }
    }
  ]),
  Route.put("/api/blocks/:hash/invalidate", [
    async function ({ params: { hash } }) {
      try {
        return this.respond(await blocks.invalidate(hash));
      } catch (error) {
        return this.reject(500, error.message);
      }
    }
  ])
]);
