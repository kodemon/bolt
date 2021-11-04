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
        return this.respond(await blocks.getByHash(hash));
      } catch (error) {
        return this.reject(500, error.message);
      }
    }
  ]),
  Route.get("/api/blocks/:filter/transactions", [
    async function ({ params: { filter } }) {
      try {
        if (isNumber(filter)) {
          return this.respond(await transactions.getByHeight(parseInt(filter)));
        }
        return this.respond(await transactions.getByAddress(filter));
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
